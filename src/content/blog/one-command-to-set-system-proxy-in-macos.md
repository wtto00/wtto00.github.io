---
author: wtto00
pubDatetime: 2023-12-09T07:23:02.777Z
title: MacOS下，一条命令设置全局系统代理
postSlug: one-command-to-set-system-proxy-in-macos
featured: false
draft: false
labels:
  - Mac
description: >-
  设置系统 http 代理：networksetup -setwebproxy networkservices address port. 设置系统
  https 代理：networksetup -setsecurewebproxy networkservices address port. 设置系统
  socks 代理：networksetup -setsocksfirewallproxy networkservices address port.
issue_number: 51
updateTime: 2023-12-16T15:25:39.955Z
---

办公室里的一台电脑，运行了代理软件，连接同一个局域网的其他电脑想要使用这个代理来上网。

## 设置终端使用代理

在 `~` 目录下新建文件 `proxy`，内容如下：

```shell
export http_proxy="http://192.168.31.188:20171"
export https_proxy="http://192.168.31.188:20171"
export all_proxy="socks5://192.168.31.188:20170"
```

如果想要当前终端使用代理，执行一下 `source ~/proxy`。

## 设置系统使用代理

一般的做法是打开 `系统偏好设置 - 网络 - Wi-Fi - 高级... - 代理`，然后分别在 `网页代理(HTTP)`，`安全网页代理(HTTPS)`，`SOCKS代理` 中填入相应的地址以及端口。

但是这个步骤有点稍微繁琐了，那能不能和上面一样，一条命令来解决这个事情呢？当然可以。

在 `~` 目录下新建文件 `systemproxy`，内容如下：

```shell
networksetup -setwebproxy Wi-Fi 192.168.31.188 20171
networksetup -setsecurewebproxy Wi-Fi 192.168.31.188 20171
networksetup -setsocksfirewallproxy Wi-Fi 192.168.31.188 20170
```

如下想要设置系统全局使用代理，执行一下 `source ~/systemproxy`。

## 开启/关闭系统全局代理

如果想要临时短暂的开启，或者关闭系统全局代理，那应该怎么做呢？

在 `~` 目录下新建文件 `systemproxy-on`，内容如下：

```shell
networksetup -setwebproxystate Wi-Fi on
networksetup -setsecurewebproxystate Wi-Fi on
networksetup -setsocksfirewallproxystate Wi-Fi on
```

在 `~` 目录下新建文件 `systemproxy-off`，内容如下：

```shell
networksetup -setwebproxystate Wi-Fi off
networksetup -setsecurewebproxystate Wi-Fi off
networksetup -setsocksfirewallproxystate Wi-Fi off
```

如下想要关闭系统全局代理，执行一下 `source ~/systemproxy-off`。  
如下想要开启系统全局代理，执行一下 `source ~/systemproxy-on`。

## 使用 alias 快捷命令

在 `~/.zshrc` 或者 `~/.bash_profile` 中添加一下内容：

```shell
alias pset='networksetup -setwebproxy Wi-Fi 192.168.31.188 20171 && networksetup -setsecurewebproxy Wi-Fi 192.168.31.188 20171 && networksetup -setsocksfirewallproxy Wi-Fi 192.168.31.188 20170'
alias psystem='networksetup -setwebproxystate Wi-Fi on && networksetup -setsecurewebproxystate Wi-Fi on && networksetup -setsocksfirewallproxystate Wi-Fi on'
alias upsystem='networksetup -setwebproxystate Wi-Fi off && networksetup -setsecurewebproxystate Wi-Fi off && networksetup -setsocksfirewallproxystate Wi-Fi off'
```

立即更新当前 shell 环境：`source ~/.zshrc`。

设置完成后，执行 `pset` 设置代理地址，执行 `psystem` 打开系统代理，执行 `upsystem` 关闭系统代理。

## 更多系统网络命令

主要命令是 `networksetup`，可以执行 `networksetup --help` 查看。也可以点击[官方说明](https://www.unix.com/man-page/osx/8/networksetup/)查看详情。

几个示例：

```shell
# 查看设备可用的网络服务:
networksetup -listallnetworkservices

# 查看各个网络服务的端口名：
networksetup -listallhardwareports

# 查看某个网络服务的信息：
networksetup -getinfo Wi-Fi

# 查看系统记录的可连接的无线信号
networksetup -listpreferredwirelessnetworks en0

# 查看当前连接的无线接入点名称：
networksetup -getairportnetwork en0

# 关闭无线连接：
networksetup -setairportpower en0 off

# 打开无线连接：
networksetup -setairportpower en0 on

# 查询当前无线连接是否打开状态：
networksetup -getairportpower en0
```
