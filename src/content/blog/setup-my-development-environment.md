---
title: 从头开始搭建我的开发环境
postSlug: setup-my-development-environment
featured: false
draft: false
tags:
  - 电脑相关
description: 新买的电脑，或重新安装的系统，从头开始搭建我自己的开发环境。
pubDatetime: 2024-01-28T18:11:12.094Z
updateTime: 2024-01-31T16:22:29.610Z
---

新买的电脑，或重新安装的系统，从头开始搭建我自己的开发环境。

## Windows

### Git

1. 安装

   在[清华大学镜像站](https://mirrors.tuna.tsinghua.edu.cn/github-release/git-for-windows/git/)，下载安装包，并安装。

1. 设置 Git-Bash

   参见 [Windows 下使用 Git-Bash 日常开发](https://wtto00.github.io/posts/use-git-bash-on-windows/)。

1. ssh-key

   ```shell
   ssh-keygen.exe -t rsa -C "wtto00@outlook.com"
   ```

1. 配置 Git

   ```shell
   git config --global user.name wtto00
   git config --global user.email wtto00@outlook.com

   git config --global alias.co checkout
   ```

### Rust

按照 [rsproxy.cn](https://rsproxy.cn/) 中的步骤操作，其中有几点修改：

1. 设置安装的自定义位置

   ```shell
   export RUSTUP_HOME="/d/home/.rustup"
   export CARGO_HOME="/d/home/.cargo"
   ```

1. 期间安装 `Visual Studio` 时，不要忘记修改安装路径为 D 盘。

### fnm

1. 安装

   ```shell
   cargo install fnm
   ```

   如果没有安装 Rust 环境，到 [Github Release](https://github.com/Schniz/fnm/releases) 下载最新版本。

1. 配置

   ```shell
   # fnm-nodejs
   export FNM_DIR="/d/home/fnm"
   export FNM_COREPACK_ENABLED="true"
   export FNM_NODE_DIST_MIRROR="https://mirrors.bfsu.edu.cn/nodejs-release/" # 使用北京外国语大学的镜像
   eval "$(fnm env --use-on-cd)"
   ```

### nodejs

```shell
# 安装
fnm install --lts

# 配置镜像
npm config set registry https://registry.npmmirror.com
```

### gsudo

到 [Github Release](https://github.com/gerardog/gsudo/releases) 下载最新版本 msi 安装包，并安装到本机目录 `D:\Program Files\gsudo`。

```shell
# gsudo
export PATH="$PATH:/d/Program Files/gsudo/Current"
```

### VS Code

到 [VS Code 官网](https://code.visualstudio.com/Download)，下载最新安装包，并安装到本机目录 `D:\Software\Microsoft VS Code`。

```shell
# VS Code
alias code="/d/software/Microsoft\ VS\ Code/bin/code.cmd"
```

### Android

到 [Android Studio 官网](https://developer.android.com/studio?hl=zh-cn)，下载最新安装包，并安装到本机目录 `D:\Program Files\Android\Android Studio`。

安装过程中下载 Android SDK，选择自定义，而不是推荐，然后手动选择设置 SDK 目录为 `D:\home\Android\Sdk`。

1. 配置环境变量

   ```shell
   # Android
   export ANDROID_HOME="/d/home/Android/Sdk"
   export PATH="$PATH:$ANDROID_HOME/platform-tools:$ANDROID_HOME/cmdline-tools/latest/bin:$ANDROID_HOME/emulator:$ANDROID_HOME/build-tools/34.0.0"
   ```

1. 移动 `.android` 目录

   默认在 C 盘的 `~/.android` 目录中，储存的是模拟器的文件。如果创建了多个模拟器，该文件夹会占用很大空间。

   - 配置以下环境变量，更改命令行执行 avdmanager 创建的模拟器储存位置

     ```shell
     export ANDROID_SDK_HOME="/d/home"
     ```

   - Android Studio 创建的模拟器储存位置需要设置 Windows 中的环境变量

     打开 Windows 的环境变量设置，添加环境变量 `ANDROID_SDK_HOME="D:\home"`

1. 移动 `.gradle` 目录

   由 C 盘的 `~/.gradle` 移动到 `/d/home/.gradle`

   - 命令行执行的 gradle 命令，依赖包储存位置，需要配置以下环境变量

     ```shell
     # Android
     export GRADLE_USER_HOME="/d/home/.gradle"
     ```

   - Android Studio 执行的 gradle 命令，需要更改以下设置

     打开 `Android Studio` 的设置，搜索 `gradle`，修改设置项 `gradle-home` 为 `D:\home\.gradle`

1. gradle 命令添加到 PATH 中

   ```shell
   export PATH="$PATH:$GRADLE_USER_HOME/wrapper/dists/gradle-6.5-all/2oz4ud9k3tuxjg84bbf55q0tn/gradle-6.5/bin" # 根据实际情况修改路径地址：
   ```

1. 配置 Java

   到[清华大学镜像站](https://mirrors.tuna.tsinghua.edu.cn/Adoptium/)，下载对应版本 JDK。解压到目录 `/d/home/.jdks/` 中。

   - 配置 shell

     ```shell
     export JAVA_HOME="/d/home/.jdks/jdk8u402-b06" # 使用自己下载的Java版本
     # export JAVA_HOME="/d/Program Files/Android/Android Studio/jbr" # 使用Android Studio中自带的Java版本
     ```

   - Android Studio 使用的 Java 版本，在 Android Studio 的设置中，搜索 `gradle`，在 `Gradle JDK` 选项中设置。

1. 配置 [gradle 镜像](https://wtto00.github.io/posts/libraries-mirror-in-china/#gradle-java)

## MacOS

### Xcode

到 [App Store](https://apps.apple.com/cn/app/xcode/id497799835) 下载安装，或者到 [Apple 开发者网站](https://developer.apple.com/download/all/?q=xcode)下载。

### Terminal

1. oh-my-zsh

   按照[官网](https://ohmyz.sh/#install)上面的安装配置。

1. 配置 OMZ 主题

   修改 `~/.zshrc` 文件中的 `ZSH_THEME` 为 `ZSH_THEME="af-magic"`

1. 配置终端

   到 [Github](https://github.com/sindresorhus/terminal-snazzy) 下载 Snazzy 颜色配置。然后打开终端的设置，点击导入下载的颜色配置

### Homebrew

根据[官网](https://brew.sh/zh-cn/)说明，执行命令安装。

安装完成后，根据提示添加环境变量。

配置[中科大镜像](https://wtto00.github.io/posts/libraries-mirror-in-china/#homebrew)

### Ruby

系统自带的版本较老，某些包无法安装，安装并使用最新版本：

```shell
brew install ruby
```

安装完成后，根据提示添加环境变量。

配置[中科大镜像](https://wtto00.github.io/posts/libraries-mirror-in-china/#gem-ruby)

使用 `gem` 安装 `cocoapods`

```shell
sudo gem install cocoapods
```
