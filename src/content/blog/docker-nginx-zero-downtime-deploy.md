---
title: Docker+Nginx实现零停机滚动部署
postSlug: docker-nginx-zero-downtime-deploy
featured: false
draft: false
tags:
  - docker
  - nginx
  - deploy
description: Docker容器+Nginx蓝绿部署，实现服务零停机更新
pubDatetime: 2026-04-13T16:23:47.381Z
updateTime: 2026-04-13T16:23:47.381Z
---

## nginx.conf

重点是 `upstream` 配置

```conf
server {
    listen 80;
    server_name my_service;

    location /.well-known/acme-challenge/ {
        root /var/www/acme;
        try_files $uri =404;
    }

    access_log /var/log/nginx/my_service/access.log main;
    error_log /var/log/nginx/my_service/error.log;
}

upstream my_service_api {
    server 127.0.0.1:3001;
    server 127.0.0.1:3002 down;
}

server {
    listen 443 ssl;
    listen [::]:443 ssl;
    http2 on;
    server_name my_service;

    location / {
        proxy_pass http://my_service_api/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        proxy_request_buffering off;
        proxy_buffering off;
    }

    access_log /var/log/nginx/my_service/access.log main;
    error_log /var/log/nginx/my_service/error.log;
}
```

## docker-compose.yml

```yml
services:
  api-blue:
    image: my_service-api:latest
    container_name: my_service-api-blue
    environment:
      - TZ=${TZ}
    ports:
      - '3001:3000'
    healthcheck:
      test: ['CMD', 'curl', '-f', 'http://localhost:3000/health']
      interval: 10s
      timeout: 5s
      retries: 5
    restart: unless-stopped

  api-green:
    image: my_service-api:latest
    container_name: my_service-api-green
    environment:
      - TZ=${TZ}
    healthcheck:
      test: ['CMD', 'curl', '-f', 'http://localhost:3000/health']
      interval: 10s
      timeout: 5s
      retries: 5
    restart: unless-stopped
```

## 部署脚本 `server-update.sh`

```shell
# nginx配置文件
NGINX_CONFIG_PATH=/root/nginx/conf.d/my_service.conf
CURRENT_COLOR="blue"
NEW_COLOR="green"
CURRENT_PORT=3001
NEW_PORT=3002

# 判断当前环境
UPSTREAM_BLOCK=$(sed -n "/upstream my_service_api {/,/}/p" "$NGINX_CONFIG_PATH")
if echo "$UPSTREAM_BLOCK" | grep -q "server 127.0.0.1:3001.*down"; then
    CURRENT_COLOR="green"
    NEW_COLOR="blue"
    CURRENT_PORT=3002
    NEW_PORT=3001
fi

# 启动新环境
docker compose up -d --no-build api-$NEW_COLOR

# 等待新环境健康检查通过...
while [ "$(docker inspect -f '{{.State.Health.Status}}' my_service-api-$NEW_COLOR)" != "healthy" ]; do
  sleep 5
done

# 修改nginx配置，切换流量
sed -i "s/server 127.0.0.1:$CURRENT_PORT;/server 127.0.0.1:$CURRENT_PORT down;/" ${NGINX_CONFIG_PATH}
sed -i "s/server 127.0.0.1:$NEW_PORT.*/server 127.0.0.1:$NEW_PORT;/" ${NGINX_CONFIG_PATH}

# 重载nginx
docker exec nginx nginx -s reload

# 停掉当前环境
sleep 10
docker compose stop api-$CURRENT_COLOR
```

## 部署步骤

```shell
# 本地打包镜像
docker build -t my_service-api .

# 本地镜像保存为tar文件
docker save -o my_service-api.tar my_service-api:latest

# 镜像tar文件通过scp上传到服务器
scp my_service-api.tar username@ip:/path/to/service/

# 服务器加载最新镜像
ssh -t username@ip "docker load -i /path/to/service/my_service-api.tar"

# 服务器执行部署脚本
ssh -t username@ip "docker load -i /path/to/service/server-update.sh"
```

## 原理

1. 首先 nginx 配置分流服务，因为更改分流后，执行 `nginx -s reload` 会等待当前正在连接的服务全部完成后才会完全切换到另一个分流服务。
1. docker compose 配置两个相同的服务，不同的服务名称以及容器名称。
1. 部署时，使用 `sed` 读取当前 nginx 正在使用的服务，然后确定要切换的服务名称。一共两个服务，blue 和 green 互相切换的。
1. 确定好新服务名称后，使用 docker compose 命令启动新服务。
1. 每隔 5s 检查一次，新服务运行健康是否 ok。
1. 新服务启动成功后，使用 `sed` 工具替换 nginx 配置文件，把分流服务对换一下。
1. 然后执行 `nginx -s reload` 命令刷新分流服务
1. 等待 10s 后，我们认为旧服务以及没有连接中的了，则可以停掉旧服务。
