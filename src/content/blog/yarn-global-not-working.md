---
pubDatetime: 2021-01-16T18:26:00.000Z
title: Yarn global 安装的命令无效
postSlug: yarn-global-not-working
featured: false
draft: false
tags:
  - npm
description: 通过 `yarn global add xxx` 安装的模块，命令无法识别
updateTime: 2024-01-01T16:14:23.709Z
---

通过 `yarn global add xxx` 安装的模块，命令无法识别

## 获得 yarn 命令所在目录

```shell
yarn global bin
```

## 将获得的目录路径加入到环境变量中

```shell
echo export PATH="\"\$PATH:$(yarn global bin)\"" >> ~/.bashrc
source ~/.bashrc
```
