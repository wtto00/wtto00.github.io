---
pubDatetime: 2021-01-26T07:32:00.000Z
title: 系统查看端口占用情况
postSlug: view-port-occupancy
featured: false
draft: false
tags:
  - linux
  - windows
description: Linux 查看端口占用情况可以使用 lsof 和 netstat 命令。 Windows 下使用netstat查看端口进程。
updateTime: 2024-01-01T16:14:23.708Z
---

`Linux` 查看端口占用情况可以使用 `lsof` 和 `netstat` 命令。

## lsof

lsof(list open files) 是一个列出当前系统打开文件的工具。

`lsof` 查看端口占用语法格式：

```bash
lsof -i:端口号
```

**示例：**查看服务器 8000 端口的占用情况：

```plaintext
# lsof -i:8000
COMMAND   PID USER   FD   TYPE   DEVICE SIZE/OFF NODE NAME
nodejs  26993 root   10u  IPv4 37999514      0t0  TCP *:8000 (LISTEN)
```

可以看到 8000 端口已经被轻 `nodejs` 服务占用。
lsof -i 需要 root 用户的权限来执行，如下图：
![lsof](../../assets/images/view-port-occupancy-on-linux.png)
更多 lsof 的命令如下：

```shell
lsof -i:8080 # 查看8080端口占用
lsof abc.txt # 显示开启文件abc.txt的进程
lsof -c abc # 显示abc进程现在打开的文件
lsof -c -p 1234 # 列出进程号为1234的进程所打开的文件
lsof -g gid # 显示归属gid的进程情况
lsof +d /usr/local/ # 显示目录下被进程开启的文件
lsof +D /usr/local/ # 同上，但是会搜索目录下的目录，时间较长
lsof -d 4 # 显示使用fd为4的进程
lsof -i -U # 显示所有打开的端口和UNIX domain文件
```

## netstat

**`netstat -tunlp`** 用于显示 tcp，udp 的端口和进程等相关情况。
netstat 查看端口占用语法格式：

```shell
netstat -tunlp | grep 端口号
```

- -t (tcp) 仅显示 tcp 相关选项
- -u (udp) 仅显示 udp 相关选项
- -n 拒绝显示别名，能显示数字的全部转化为数字
- -l 仅列出在 Listen (监听) 的服务状态
- -p 显示建立相关链接的程序名
  **示例：**查看服务器 8000 端口的占用情况：

```plaintext
# netstat -tunlp | grep 8000
tcp        0      0 0.0.0.0:8000            0.0.0.0:*               LISTEN      26993/nodejs
```

更多命令：

```bash
netstat -ntlp   # 查看当前所有tcp端口
netstat -ntulp | grep 80   # 查看所有80端口使用情况
netstat -ntulp | grep 3306   # 查看所有3306端口使用情况
```

> 在查到端口占用的进程后，如果你要杀掉对应的进程可以使用 kill 命令：  
> kill -9 PID

---

## Windows 下查看端口进程

### 打开 shell 终端

在终端 `CMD` 或者 `PowerShell` 或者 `Git Bash` 中输入

```shell
# 列出所有端口占用情况
netstat -ano
# 精确找到被占用的端口对应的PID
netstat -ano | findstr "port"
# 示例
netstat -ano | findstr "5173"
```

输出结果为：

```plaintext
Proto  Local Address          Foreign   Address        State           PID
TCP    0.0.0.0:5173           0.0.0.  0:0              LISTENING       1032
```

### 查看是哪个进程或程序占用了端口

```shell
tasklist | findstr "PID"
# 示例
tasklist | findstr "1032"
```

输出结果为：

```plaintext
Image Name                     PID Session Name        Session#    Mem Usage
========================= ======== ================ =========== ============
svchost.exe                   1032 Services                   0     11,440 K
```

### 杀掉占用端口的程序

```shell
taskkill /f /t /pid xxxPID
taskkill /f /t /im xx进程
# 示例
taskkill /f /t /pid 1032
taskkill /f /t /im System
```

或者也可以打开任务管理器，通过进程/程序名称或者 PID 找到，并手动关闭进程。
