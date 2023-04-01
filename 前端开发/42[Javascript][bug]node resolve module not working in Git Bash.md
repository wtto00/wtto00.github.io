---
issue_number: 42
title: node resolve module not working when using link path
---

打算在 `Windows` 平台上使用 `Git Bash` 作为默认的 `Shell` 环境。

首先根据知乎上面的文章配置 [Windows 下的 Git Bash 配置，提升你的终端操作体验](https://zhuanlan.zhihu.com/p/418321777)。

然后，在启动一个 vue 项目时，碰到了问题，浏览器报错如下

```
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

这是由于，我一开始想要在目录 home: `~` 中工作，然后又不想所有的项目文件全部保存在 `C盘`，所以在 Home 文件夹内建了个 `projects` 的目录软链接[符号链接]，如下所示：

```shell
# PowerShell
New-Item -ItemType SymbolicLink -Path ~\projects -Target E:\projects
```

至此，该问题找到了，**是由于 `Nodejs` 在链接的路径中，无法找到对应的模块。我们更改一下项目路径，不要用链接的路径，就可以正常开发了。**
