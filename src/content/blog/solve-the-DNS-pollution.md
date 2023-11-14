---
author: wtto00
pubDatetime: 2021-11-18T03:09:48.000Z
title: 怎么解决国内 DNS 污染导致的某些站点访问失败
postSlug: solve-the-DNS-pollution
featured: false
draft: false
tags:
  - 电脑相关
description:
  通过修改 Hosts 解决一些国外站点由于国内 DNS 污染导致的访问失败。
issue_number: 1
---

## 获取正确地 IP 地址

访问 <https://www.ipaddress.com/> 查询域名所解析正确的 `ip` ，如下图所示
![image](https://user-images.githubusercontent.com/30424139/104818580-5b5dbe00-5820-11eb-80a4-445fdc839fb8.png)

> `ping gist.github.com` 命令获得的是被污染的 `ip`  
> `nslookup` 同理，获得的 `ip` 也是不对的

## 修改 `host` 文件

`host` 文件所在位置：

- **Windows:** `C:\Windows\System32\drivers\etc\hosts`
- **Mac/Linux:** `/etc/hosts`

修改示例：

```txt
140.82.114.4 gist.github.com
199.232.96.133 camo.githubusercontent.com
199.232.96.133 user-images.githubusercontent.com
199.232.96.133 avatars2.githubusercontent.com
```

如果不生效的话，可以刷新下网络 `DNS` 缓存

- **Mac:** `sudo killall -HUP mDNSResponder`
- **Windows:** `ipconfig /flushdns`
- **Linux:** `sudo /etc/init.d/nscd restart` 或者重启网卡服务 `sudo /etc/init.d/networking restart`
  > 也可以在 Chrome 浏览器中访问 `chrome://net-internals/#dns` 刷新缓存
