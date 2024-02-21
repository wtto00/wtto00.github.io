---
title: vmware-tools安装
postSlug: install-vmware-tools
featured: false
draft: false
tags:
  - linux
  - vmware
description: 在vmware虚拟机中安装好系统后，怎么在虚拟系统中安装VMWare-tools工具呢？
pubDatetime: 2024-02-21T13:50:29.664Z
updateTime: 2024-02-21T13:50:29.664Z
---

在 vmware 虚拟机中安装好系统后，打开系统的时候，点击菜单栏的 `虚拟机-安装VMWare Tools`，则系统中会加载一个光盘镜像。

Windows 直接点击运行光盘镜像即可。

Linux 会有一些问题：

1. 加载光盘镜像后，不能运行

   解压缩光盘根目录中的一个压缩包到 home 目录中，然后执行压缩包中的 `vmware-install.pl` 文件，一路 `yes` 下去。有几个选项默认是 `[no]`，也要改为 `yes`。安装完成后，重启。共享目录在 `/mnt/hgfs/` 文件夹内。

1. 不能插入光盘镜像，是灰色不可点击的

   ```bash
   # 手动安装：
   sudo apt install open-vm-tools-desktop open-vm-tools

   # 查看共享文件夹
   vmware-hgfsclient
   ```

   设置开机自动挂载：

   新建 `/etc/rc.local` 文件，内容如下：

   ```sh
   #!/bin/sh -e

   sudo vmhgfs-fuse .host:/ /mnt/hgfs -o allow_other #挂载共享文件夹到/mnt/hgfs
   ```

   最后给可执行权限：`chmod +x /etc/rc.local`
