---
pubDatetime: 2021-03-03T08:16:00.000Z
title: WSL2迁移方法
postSlug: moving-the-location-of-wsl2
featured: false
draft: false
labels:
  - wsl
description: 一直用WSL2作为开发环境，可是随着项目越来越多，越来越大，C盘空间所剩无几，所以迁移WSL2到其他分区成为必要。
updateTime: 2024-01-01T11:50:27.435Z
---

一直用 WSL2 作为开发环境，可是随着项目越来越多，越来越大，C 盘空间所剩无几，所以迁移 WSL2 到其他分区成为必要。

在 Windows 的 PowerShell 中输入：

## 关闭正在运行的分发或虚拟机

```shell
wsl --shutdown
```

## 导出子系统实例到一个文件中

根据自己所安装的系统输入子系统的镜像名称，以及自定义导出文件的储存位置

```shell
wsl --export Ubuntu-20.04 D:\wsl-Ubuntu-20.04
```

## 卸载分发版或虚拟机

如果是要重装系统或换机器安装，这一步可以省略，但是要将上一步导出的文件保存好

```shell
wsl --unregister Ubuntu-20.04
```

## 导入新的分发版或虚拟机

这里的 `D:\wsl\Ubuntu-20.04` 是子系统迁移到的目的地。需要提前创建好目录，该条命令不会自动创建目录。

```shell
wsl --import Ubuntu-20.04 D:\wsl\Ubuntu-20.04 D:\wsl-Ubuntu-20.04 --version 2
```

## 设置默认登陆用户为安装时用户名

这里的 `ubuntu2004` 命令根据自己所安装的子系统镜像名称来确定。

用户名是之前的子系统所使用的用户名。

```shell
ubuntu2004 config --default-user wtto
```

## 删除导出的文件

最后删除调导出的文件即可。

```shell
del D:\wsl-Ubuntu-20.04
``
```
