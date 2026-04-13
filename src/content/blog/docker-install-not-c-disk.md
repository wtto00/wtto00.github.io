---
title: Docker不要安装到C盘
postSlug: docker-install-not-c-disk
featured: false
draft: false
tags:
  - docker
  - disk
description: 在Windows上安装Docker，默认安装到C盘，且不可自定义选择。这里使用目录软链接的方式，把Docker转移到其他盘。
pubDatetime: 2026-04-13T15:27:55.074Z
updateTime: 2026-04-13T16:22:49.915Z
---

由于我的旧电脑 C 盘还是容量 256GB 的 SSD，所以平时开发安装软件以及依赖都会研究怎么把 C 盘的数据转移到其他盘。

这里讲述怎么把 Docker Desktop 以及下载的 Docker 镜像，还有 Docker 打包时的中间虚拟磁盘等等全都转移到其他盘。

## 安装 Docker Desktop

首先去 Docker 官网或者其他镜像站，下载 Docker Desktop 安装程序，并安装到电脑上。安装过程中并没有让我们选择其他盘，我们暂时先安装到 C 盘。

## 打开 Docker Desktop

打开安装好的 Docker Desktop，初始化一些文件目录。

## 退出 Docker Desktop

Docker 引擎启动成功后，就可以完全退出 Docker Desktop 了。因为转移 Docker 的文件，防止运行中的程序占用。

## 转移程序文件以及创建软链接

假设我们把 Docker 相关数据，全都转移到 `D:\Docker` 目录下

```shell
mv C:\Users\wtto\.docker D:\Docker\.docker
mklink /D C:\Users\wtto\.docker D:\Docker\.docker

sudo mv "C:\Program Files\Docker" D:\Docker\Docker
sudo mklink /D "C:\Program Files\Docker" D:\Docker\Docker

mv C:\Users\wtto\AppData\Local\Docker D:\Docker\AppDataLocalDocker
mklink /D C:\Users\wtto\AppData\Local\Docker D:\Docker\AppDataLocalDocker

mv C:\Users\wtto\AppData\Roaming\Docker D:\Docker\AppDataRoamingDocker
mklink /D C:\Users\wtto\AppData\Roaming\Docker D:\Docker\AppDataRoamingDocker

mv "C:\Users\wtto\AppData\Roaming\Docker Desktop" D:\Docker\AppDataRoamingDockerDesktop
mklink /D "C:\Users\wtto\AppData\Roaming\Docker Desktop" D:\Docker\AppDataRoamingDockerDesktop
```
