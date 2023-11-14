---
author: wtto00
pubDatetime: 2023-05-29T02:25:11.000Z
title: Linux的gnome桌面管理底部Dock bar
postSlug: control-gnome-dock-bar-on-linux
featured: false
draft: false
tags:
  - Linux
description: "Linux的gnome桌面管理底部Dock bar: gnome-shell-extension-dash-to-dock gnome-extensions-app gnome-shell-extension-prefs"
issue_number: 47
---

## 安装 Dash-to-Dock 扩展

```shell
sudo dnf install gnome-shell-extension-dash-to-dock
```

## 安装 Gnome Extensions App

```shell
sudo dnf install gnome-extensions-app
```

如果是 `Ubuntu/Debian`，执行下边的命令安装App:

```shell
sudo apt install gnome-shell-extension-prefs
```

## 打开 `扩展` App

刚安装的扩展 `gnome-shell-extension-dash-to-dock` 还不能显示在 App 中，需要重启系统，才可以设置Dock bar一直显示。

里面有很多相关的配置，包括透明效果，主题，任务栏分组，大小等等。
