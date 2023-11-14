---
author: wtto00
pubDatetime: 2021-08-16T04:23:39.000Z
title: WSL2迁移方法
postSlug: moving-the-location-of-wsl2
featured: false
draft: false
tags:
  - WSL
description: 一直用WSL2作为开发环境，可是随着项目越来越多，越来越大，C盘空间所剩无几，所以迁移WSL2到其他分区成为必要
issue_number: 15
---

一直用WSL2作为开发环境，可是随着项目越来越多，越来越大，C盘空间所剩无几，所以迁移WSL2到其他分区成为必要

在Windows的PowerShell中输入:

```PowerShell
# 终止正在运行的分发或虚拟机：
wsl --shutdown

# 对需要迁移的分发或虚拟机导出（我安装的版本是Ubuntu-20.04）：
wsl --export Ubuntu-20.04 D:\wsl-Ubuntu-20.04

# 卸载分发版或虚拟机（如果是要重装系统或换机器安装，这一步可以省略，但是要将上一步导出的文件保存好）
wsl --unregister Ubuntu-20.04

# 导入新的分发版或虚拟机
wsl --import Ubuntu-20.04 D:\wsl\Ubuntu-20.04 D:\wsl-Ubuntu-20.04 --version 2

# 设置默认登陆用户为安装时用户名
ubuntu2004 config --default-user wtto

# 删除导出的文件
del D:\wsl-Ubuntu-20.04
```

注意：

- 导入新的分发版或虚拟机前，需要先建立想要安装位置的目录
