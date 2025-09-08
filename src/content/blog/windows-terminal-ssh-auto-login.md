---
title: Windows Terminal自动输入密码连接远程服务器
postSlug: windows-terminal-ssh-auto-login
featured: false
draft: false
tags:
  - windows
  - ssh
description: Windows Terminal自动输入密码连接远程服务器
pubDatetime: 2025-09-08T04:42:34.937Z
updateTime: 2025-09-08T10:55:34.046Z
---

使用 Windows Terminal 保存一个远程服务器的连接配置，来实现自动免输入密码登录。

使用密钥来实现免密码登录，这种方式网上有很多说明，这里不再赘述。

这篇文章讲述的是，如何自动输入密码来实现免密码登录。

## 新建配置

在 Windows Terminal 中 `添加新配置文件`，复制配置文件 `Windows PowerShell`。

在新添加的配置文件中，配置命令行有以下两种工具。

## sshpass (推荐)

从 Github 仓库中 [xhcoding/sshpass-win32](https://github.com/xhcoding/sshpass-win32) 下载 `sshpass` 工具到本地。

Windows Terminal 中的命令行配置为 `powershell.exe /C path\to\sshpass.exe -p'my_password' ssh username@ip`。

如果复制配置文件为 `Git-Bash`，则配置为 `bash.exe -l -i -c "path/to/sshpass -p'my_password' ssh username@ip"`。

## plink

从 [putty 官网](https://www.chiark.greenend.org.uk/~sgtatham/putty/latest.html)下载 `plink.exe` 到本地。

Windows Terminal 中的命令行配置为 `powershell.exe /C path\to\plink.exe ip -l username -pw 'my_password' -batch`

## powershell 中文显示乱码

命令行中的 `powershell.exe /C` 添加 `powershell.exe /C chcp 65001;`。

即 `powershell.exe /C path\to\sshpass.exe -p'my_password' ssh username@ip` 改为 `powershell.exe /C chcp 65001;path\to\sshpass.exe -p'my_password' ssh username@ip`。

## 按键命令不能传输

`Ctrl+C` 命令直接退出了 `sshpass`，`plink`，从而断开了远程连接，而不是退出当前输入。

相关连接：

- [microsoft/terminal#14126](https://github.com/microsoft/terminal/discussions/14126)
- <https://www.autoitscript.com/forum/topic/201947-plink-sending-break-without-ending-session/>
- <https://superuser.com/questions/1621783/putty-plink-how-to-execute-command-and-keep-shell-alive>
