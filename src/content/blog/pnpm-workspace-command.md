---
title: 记录一些pnpm的workspace用法
postSlug: pnpm-workspace-command
featured: false
draft: false
tags:
  - pnpm
description: 使用pnpm自带的workspace管理多包仓库，以下是我使用过程中的一些经验。这里记录下来，以供以后查找。
pubDatetime: 2024-02-23T15:59:22.972Z
updateTime: 2024-03-02T15:49:07.195Z
---

使用 pnpm 自带的 workspace 管理多包仓库，以下是我使用过程中的一些经验。这里记录下来，以供以后查找。

```plaintext
|-- packages
|   |-- a
|   |   |-- src
|   |   |-- package.json
|   |-- b
|   |   |-- src
|   |   |-- package.json
|   |-- c
|       |-- src
|       |-- package.json
|-- package.json
|-- pnpm-workspace.yaml
```

### 文件说明

#### package.json

```json
{
  "name": "p"
}
```

#### pnpm-workspace.yaml

```yml
packages:
  - 'packages/*'
```

#### packages/a/package.json

```json
{
  "name": "@p/a"
}
```

#### packages/b/package.json

```json
{
  "name": "@p/b"
}
```

#### packages/c/package.json

```json
{
  "name": "c"
}
```

### pnpm 的一些命令

#### -C，--dir

在相对路径中执行命令。[详细说明](https://pnpm.io/zh/pnpm-cli#-c-path---dir-path)

```shell
# 执行a包的a包的build命令
pnpm -C packages/a build
```

#### -w，--workspace-root

在工作空间根目录中执行命令。[详细说明](https://pnpm.io/zh/pnpm-cli#-w---workspace-root)

#### -r

每个包都执行命令。[详细说明](https://pnpm.io/zh/cli/recursive#--filter-package_selector)

```shell
# a,b,c三个包分别执行publish命令
pnpm publish -r
```

#### --filter，-F

筛选特定的包名。[详细说明](https://pnpm.io/zh/filtering)

```shell
# 在c包中安装lodash作为依赖
pnpm add lodash --filter c
```

#### --workspace

仅在工作区内执行相关命令。

```shell
# 在@p/b的包中，安装工作空间中的@p/a包作为依赖
pnpm add @p/a -F @p/b --workspace
```
