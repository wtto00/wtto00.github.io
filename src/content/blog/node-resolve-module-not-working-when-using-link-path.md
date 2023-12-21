---
pubDatetime: 2023-04-01T13:16:20.000Z
title: node resolve module not working when using link path
postSlug: node-resolve-module-not-working-when-using-link-path
featured: false
draft: false
labels:
  - Javascript
description: node resolve module not working when using link path
issue_number: 42
updateTime: 2023-12-21T16:14:55.696Z
---

## Failed to resolve module specifier “vue”

在 `Windows` 系统上开发一个 `vue` 项目，在启动时，碰到了问题，浏览器报错如下

```plaintext
Uncaught TypeError: Failed to resolve module specifier "vue". Relative references must start with either "/", "./", or "../".
```

看起来像是 import moudle 的时候，没有去 `node_modules` 目录下寻找对应的模块。

然后我去 Google 了好久，发现了一个 [issue](https://github.com/tleunen/babel-plugin-module-resolver/issues/281)，看起来问题一样，但是并没有解决我的问题。

然后我去调试 `node_modules` 目录下的 `vite` 模块，打断点，却发现在 vscode 的调试模式下，项目运行完全正常，浏览器没有报错。

然后我去掉断点，依然一样正常。

然后我就疑惑了，在 `Widnows Terminal` 中运行和在 `VS Code` 中有什么不同吗？

最终我发现了：

- 在 `Widnows Terminal` 中，我运行的目录是 `~/projects/demo/gitbash-node-module`
- 而在 `VS Code` 中，默认打开的 `Git Bash` 所在目录是 `/e/projects/demo/gitbash-node-module`

这是由于，我一开始想要在目录 home：`~` 中工作，然后又不想所有的项目文件全部保存在 `C盘`，所以在 Home 文件夹内建了个 `projects` 的目录软链接[符号链接](https://learn.microsoft.com/zh-cn/powershell/module/microsoft.powershell.management/new-item?view=powershell-7.4#7)，如下所示：

```shell
# PowerShell
New-Item -ItemType SymbolicLink -Path ~\projects -Target E:\projects
```

至此，该问题找到了，**是由于 `Nodejs` 在链接的路径中，无法找到对应的模块。我们更改一下项目路径，不要用链接的路径，就可以正常开发了。**
