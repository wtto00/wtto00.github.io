---
author: wtto00
pubDatetime: 2021-08-16T04:23:39.000Z
title: Yarn global 安装的命令无效
postSlug: yarn-global-not-working
featured: false
draft: false
labels:
  - NPM
description: 通过 `yarn global add xxx` 安装的模块，命令无法识别
issue_number: 2
updateTime: 2023-12-16T15:25:39.968Z
---

### 问题

通过 `yarn global add xxx` 安装的模块，命令无法识别

### 解决

1. 使用 `yarn global bin` 命令，获得命令所在目录
2. 将获得的目录路径加入到环境变量中

Linux：

```shell
echo export PATH="\"\$PATH:$(yarn global bin)\"" >> ~/.bashrc
source ~/.bashrc
```
