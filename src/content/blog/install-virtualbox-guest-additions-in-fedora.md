---
pubDatetime: 2023-12-05T14:05:54.230Z
title: 在 Fedora 中安装VirtualBox Guest Additions服务
postSlug: install-virtualbox-guest-additions-in-fedora
featured: false
draft: false
labels:
  - linux
description: >-
  首先安装依赖，再确保开发包与系统内核版本一致，最后安装Guest Additions CD的脚本。错误处理：ValueError: File context
  for /opt/VBoxGuestAdditions-6.0.18/other/mount.vboxsf already
  defined。共享文件夹的权限无法访问的解决办法。
updateTime: 2024-01-01T16:05:24.332Z
---

在 `VirtualBox` 种安装 `Fedora` 操作系统，`VirtualBox Guest Additions` 服务一直安装不成功，导致剪切板以及文件夹不能同步。网上搜索了好久，最终在这里记录下来成功的步骤。

## 首先安装依赖

```shell
sudo dnf install dkms kernel-devel gcc bzip2 make curl
```

## 确保版本一致

### 先查看系统内核版本

```shell
uname -r
# or
hostnamectl | grep -i kernel
```

得到结果类似这样：`Linux 5.3.7-301.fc31.x86_64`

### 再查看内核开发工具 `kernel-devel` 的版本

```shell
sudo rpm -qa kernel-devel
```

得到结果类似这样：`kernel-devel-5.5.15-200.fc31.x86_64`

如果 `kernel-devel` 的版本和系统内核版本不一致，那么删掉不一致的版本包，然后安装与系统内核版本一致的版本包：

```shell
sudo dnf remove kernel-devel-5.5.15-200.fc31.x86_64
sudo dnf install kernel-devel-5.3.7-301.fc31.x86_64
```

## 在 VirtualBox 中插入 Guest Additions CD

在菜单栏中的 `Devices` –> `Insert Guest Additions CD`

## 安装 VirtualBox Guest Additions 服务

```shell
cd /run/media/username/VBox_GAs_6.0.18
sudo ./VBoxLinuxAdditions.run
```

## 错误处理

### 安装时出现：ValueError：File context for /opt/VBoxGuestAdditions-6.0.18/other/mount.vboxsf already defined

```shell
sudo semanage fcontext -d /opt/VBoxGuestAdditions-6.0.18/other/mount.vboxsf
sudo restorecon /opt/VBoxGuestAdditions-6.0.18/other/mount.vboxsf
```

执行完上述命令后，再重新执行安装，就不会报错了。

在 VirtualBox 中的文件传输界面还是会出现红色错误提示 `File manager cannot work since no guest additions were detected.`，但是在共享的文件夹中，已经可以成功看到共享的文件了。

### 共享文件夹的权限无法访问

```shell
sudo usermod -a -G vboxsf your_account_name
```
