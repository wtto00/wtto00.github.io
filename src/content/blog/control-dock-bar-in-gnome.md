---
pubDatetime: 2023-05-29T02:25:11.000Z
title: 在gnome桌面上管理底部Dock bar
postSlug: control-dock-bar-in-gnome
featured: false
draft: false
labels:
  - linux
description: 在Linux上，怎么修改`gnome`桌面的底部Dock bar？比如图标的大小，以及是否自动隐藏等等相关功能。
updateTime: 2023-12-31T17:56:35.673Z
---

怎么修改 `gnome` 桌面的底部 Dock bar？比如图标的大小，以及是否自动隐藏等等相关功能。

## 安装 Dash-to-Dock 扩展

```shell
sudo dnf install gnome-shell-extension-dash-to-dock
```

## 安装 Gnome Extensions App

```shell
sudo dnf install gnome-extensions-app
```

如果是 `Ubuntu/Debian`，执行下边的命令安装 App：

```shell
sudo apt install gnome-shell-extension-prefs
```

## 打开 `扩展` App

刚安装的扩展 `gnome-shell-extension-dash-to-dock` 还不能显示在 App 中，需要重启系统，才可以设置 Dock bar 一直显示。

里面有很多相关的配置，包括透明效果，主题，任务栏分组，大小等等。
