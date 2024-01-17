---
title: 配置Git SSH代理
postSlug: git-ssh-proxy
featured: false
draft: false
tags:
  - proxy
description: >-
  通常我们配置代理，都是配置的https_proxy,http_proxy,all_proxy，这在使用git拉取http或者https协议的代码时很有用。但是在拉取ssh协议的仓库地址时，并不能走这个代理。怎么配置git在使用ssh协议仓库的时候使用代理配置呢？
pubDatetime: 2024-01-17T11:16:31.982Z
updateTime: 2024-01-17T13:04:30.752Z
---

通常我们配置代理，都是配置的 `https_proxy`，`http_proxy`，`all_proxy`，这在使用 `git` 拉取 `http` 或者 `https` 协议的代码时很有用。
但是在拉取 `ssh` 协议的仓库地址时，并不能走这个代理。怎么配置 `git` 在使用 `ssh` 协议仓库的时候使用代理配置呢？

## MacOS/Linux

配置文件 `~/.ssh/config` 内容为：

```plaintext
Host github.com
  Hostname ssh.github.com
  Port 443
  User git
  ProxyCommand nc -x 192.168.31.188:20170 %h %p
```

更多关于 `nc` 命令，可参见 [nc/netcat](https://ss64.com/bash/nc.html)

上面是配置的 `scoks5` 代理，如果要走 `http` 代理，可以配置 `ProxyCommand socat - PROXY:192.168.31.188:%h:%p,proxyport=20171`，需要先安装 `socat`。

更多关于 `socat` 命令，可参见 [socat](https://linux.die.net/man/1/socat)

## Windows

在 `Windows` 上，上述配置会提示 `nc: not found`。

修改配置内容为：

```plaintext
Host github.com
  Hostname ssh.github.com
  Port 443
  User git
  ProxyCommand connect -S 127.0.0.1:10808 -a none %h %p
```

`connect` 命令来自于 [mingw-w64-x86_64-connect](https://packages.msys2.org/package/mingw-w64-x86_64-connect?repo=mingw64)，详情可参见 [ssh-connect](https://github.com/gotoh/ssh-connect?tab=readme-ov-file#more-detail)。

如果要走 `http` 代理，可以配置 `ProxyCommand connect -H 127.0.0.1:10809 -a none %h %p`。

---

如果私钥文件不在默认的 `~/.ssh/` 位置下，可以配置 `IdentityFile "C:\Users\One\.ssh\id_rsa"`，注意这里是绝对路径。
