---
author: wtto00
pubDatetime: 2021-08-16T04:23:39.000Z
title: windows下vscode设置了eof=lf，但是git操作还是会自动把代码变为crlf
postSlug: crlf-to-lf-in-git-on-windows
featured: false
draft: false
tags:
  - Git
description: windows下vscode设置了eof=lf，但是git操作还是会自动把代码变为crlf。git config core.autocrlf false，git config core.eol lf
issue_number: 19
---

### 背景

- vscode 已设置 `files.eol="lf"`
- 项目文件 `.editorconfig` 已设置 `end_of_line = lf`

### 问题

当执行 `git checkout master` 切换分支时，编辑器中代码总是自动变为 `crlf` ，导致 `eslint` 报错所有文件

### 解决

`git`  配置以下

```shel
git config core.autocrlf false
git config core.eol lf
```
