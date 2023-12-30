---
pubDatetime: 2022-11-16T12:16:16.000Z
title: WSL2设置局域网访问
postSlug: setting-up-lan-access-for-wsl2
featured: false
draft: false
labels:
  - WSL
description: WSL2设置局域网访问
updateTime: 2023-12-30T17:48:17.270Z
---

1. **首先查询 WSL2 中的 IP**

   在 WSL2 中执行命令：

   ```shell
   ifconfig
   #eth0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
   #        inet 172.21.157.28  netmask 255.255.240.0  broadcast 172.21.159.255
   #        inet6 fe80::215:5dff:fe47:a330  prefixlen 64  scopeid 0x20<link>
   #        ether 00:15:5d:47:a3:30  txqueuelen 1000  (Ethernet)
   #        RX packets 30107  bytes 10107460 (10.1 MB)
   #        RX errors 0  dropped 0  overruns 0  frame 0
   #        TX packets 15296  bytes 3279967 (3.2 MB)
   #        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0

   #lo: flags=73<UP,LOOPBACK,RUNNING>  mtu 65536
   #        inet 127.0.0.1  netmask 255.0.0.0
   #        inet6 ::1  prefixlen 128  scopeid 0x10<host>
   #        loop  txqueuelen 1000  (Local Loopback)
   #        RX packets 1459238  bytes 3022790473 (3.0 GB)
   #        RX errors 0  dropped 0  overruns 0  frame 0
   #        TX packets 1459238  bytes 3022790473 (3.0 GB)
   #        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0
   ```

   获得 WSL2 中的 IP 地址为 `172.21.157.28`

1. **设置端口转发**

   在 Windows 中，管理员打开 `Power Shell`，执行以下命令：

   ```shell
   netsh interface portproxy add v4tov4 listenport=[宿主机windows平台监听端口] listenaddress=0.0.0.0 connectport=[wsl2平台监听端口] connectaddress=[wsl2平台ip] protocol=tcp

   # 比如 vite开发服务器端口5173，即把WSL2中的5173端口转发到windows下的5173端口
   netsh interface portproxy add v4tov4 listenport=5173 listenaddress=0.0.0.0 connectport=5173 connectaddress=172.21.157.28 protocol=tcp
   ```

   另外，其他两个命令

   ```shell
   # 查看端口转发状态
   netsh interface portproxy show all

   # 删除端口转发
   netsh interface portproxy delete v4tov4 listenport=[宿主机windows平台监听端口] listenaddress=0.0.0.0

   # 比如 删除刚刚建立的端口转发
   netsh interface portproxy delete v4tov4 listenport=5173 listenaddress=0.0.0.0
   ```

   > 上述命令中的 `listenaddress=0.0.0.0` 可以全部更改为 `listenaddress=*`

1. **Windows 设置防火墙**  
   在高级防火墙设置中 (找不到的话可以在开始菜单搜索 `防火墙`)，新建入站规则，选择 `端口-TCP,特定本机端口:5173-允许连接`，保存规则名称为 `vite本机开发服务器`。

1. **查看 Windows 主机在局域网中的 IP**  
   打开 PowerShell

   ```shell
   ipconfig
   # 一般为192.168开头的地址
   ```

1. **局域网访问**  
   上述设置好后，局域网的其他主机就可以通过 Windows 主机的 IP 以及监听的端口 listenaddress，访问 WSL2 中的项目了。
