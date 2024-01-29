---
title: 从头开始搭建我的开发环境
postSlug: setup-my-development-environment
featured: false
draft: false
tags:
  - 电脑相关
description: 新买的电脑，或重新安装的系统，从头开始搭建我自己的开发环境。
pubDatetime: 2024-01-28T18:11:12.094Z
updateTime: 2024-01-29T17:29:15.067Z
---

新买的电脑，或重新安装的系统，从头开始搭建我自己的开发环境。

## Windows

Windows 下我使用 `Git-Bash` 来进行开发。

### Git

#### 安装

在[清华大学镜像站](https://mirrors.tuna.tsinghua.edu.cn/github-release/git-for-windows/git/)，下载安装包，并安装。

#### 设置 Git-Bash

添加以下内容到 `~/.bash_profile` 中：

```shell
# Git Bash终端前面的字符去掉
parse_git_branch() {
  git branch 2> /dev/null | sed -e '/^[^*]/d' -e 's/* \(.*\)/ (\1)/'
}
# 显示全路径
export PS1="\[\e[32;1m\]\w $\[\e[0m\]\[\033[32m\]\$(parse_git_branch)\[\033[00m\] "

# 不识别 bat 脚本
function command_not_found_handle {
  local cmd="${1##*/}" # 解析出命令名
  if [[ $cmd != *.* ]]; then
    shift # 将第一个参数弹出
    "${cmd}.bat" "$@"
  else
    printf "%s: command not found\n" "$1" >&2
    return 127
  fi
}
export -f command_not_found_handle

# 设置终端标题为当前路径
PROMPT_COMMAND='echo -ne "\033]0;${PWD}\007"'
```

更多可参见 [Windows 下使用 Git-Bash 日常开发](https://wtto00.github.io/posts/use-git-bash-on-windows/)。

#### ssh-key

```shell
ssh-keygen.exe -t rsa -C "wtto00@outlook.com"
```

然后把生成的公钥 `~/.ssh/id_rsa.pub` 配置到服务器中。

#### 配置 Git

```shell
git config --global user.name=wtto00
git config --global user.email=wtto00@outlook.com

git config --global alias.co=checkout
```

### Rust

#### 设置 Rustup 镜像

添加以下内容到 `~/.bash_profile` 中：

```shell
# Rustup
export RUSTUP_DIST_SERVER="https://rsproxy.cn"
export RUSTUP_UPDATE_ROOT="https://rsproxy.cn/rustup"
```

添加完成后执行 `source ~/.bash_profile`

#### 设置安装的自定义位置

添加以下内容到 `~/.bash_profile` 中：

```shell
export RUSTUP_HOME="/d/home/.rustup"
export CARGO_HOME="/d/home/.cargo"
export PATH="$PATH:$CARGO_HOME/bin"
```

添加完成后执行 `source ~/.bash_profile`

#### 安装 Rust

```shell
curl --proto '=https' --tlsv1.2 -sSf https://rsproxy.cn/rustup-init.sh | sh
```

期间安装 `Visual Studio` 时，不要忘记修改安装路径为 D 盘。

#### 设置 Cargo 镜像

添加以下内容到 `$CARGO_HOME/config` 文件中，即 `/d/home/.cargo/config`

```toml
[source.crates-io]
replace-with = 'rsproxy-sparse'
[source.rsproxy]
registry = "https://rsproxy.cn/crates.io-index"
[source.rsproxy-sparse]
registry = "sparse+https://rsproxy.cn/index/"
[registries.rsproxy]
index = "https://rsproxy.cn/crates.io-index"
[net]
git-fetch-with-cli = true
```

### fnm

#### 安装

```shell
cargo install fnm
```

如果没有安装 Rust 环境，到 [Github Release](https://github.com/Schniz/fnm/releases) 下载最新版本。

#### 配置

添加以下内容到 `~/.bash_profile` 中：

```shell
# fnm-nodejs
export FNM_DIR="/d/home/fnm"
export FNM_COREPACK_ENABLED="true"
export FNM_NODE_DIST_MIRROR="https://mirrors.bfsu.edu.cn/nodejs-release/" # 使用北京外国语大学的镜像
eval "$(fnm env --use-on-cd)"
```

添加完成后执行 `source ~/.bash_profile`

### nodejs

#### 安装

```shell
fnm install --lts
```

#### 配置镜像

```shell
npm config set registry https://registry.npmmirror.com
```

### gsudo

#### 安装

到 [Github Release](https://github.com/gerardog/gsudo/releases) 下载最新版本 msi 安装包，并安装到本机目录 `D:\Program Files\gsudo`。

#### 配置 shell 命令

添加以下内容到 `~/.bash_profile` 中：

```shell
# gsudo
export PATH="$PATH:/d/Program Files/gsudo/Current"
```

添加完成后执行 `source ~/.bash_profile`

### VS Code

#### 安装

到 [VS Code 官网](https://code.visualstudio.com/Download)，下载最新安装包，并安装到本机目录 `D:\Software\Microsoft VS Code`。

#### 配置 shell 命令

添加以下内容到 `~/.bash_profile` 中：

```shell
# VS Code
alias code="/d/software/Microsoft\ VS\ Code/bin/code.cmd"
```

添加完成后执行 `source ~/.bash_profile`

### Android

#### 下载安装 Android Studio

到 [Android Studio 官网](https://developer.android.com/studio?hl=zh-cn)，下载最新安装包，并安装到本机目录 `D:\Program Files\Android\Android Studio`。

安装过程中下载 Android SDK，选择自定义，而不是推荐，然后手动选择设置 SDK 目录为 `D:\home\Android\Sdk`。

#### 设置 shell

添加以下内容到 `~/.bash_profile` 中：

```shell
# Android
export ANDROID_HOME="/d/home/Android/Sdk"
export PATH="$PATH:$ANDROID_HOME/platform-tools:$ANDROID_HOME/cmdline-tools/latest/bin:$ANDROID_HOME/emulator:$ANDROID_HOME/build-tools/34.0.0"
```

添加完成后执行 `source ~/.bash_profile`

#### 移动 `.android` 目录

默认在 C 盘的 `~/.android` 目录中，储存的是模拟器的文件。如果创建了多个模拟器，该文件夹会占用很大空间。

- 命令行执行 avdmanager 创建的模拟器

  添加以下内容到 `~/.bash_profile` 中：

  ```shell
  export ANDROID_SDK_HOME="/d/home"
  ```

  添加完成后执行 `source ~/.bash_profile`

- Android Studio 创建的模拟器

  打开 Windows 的环境变量设置，添加环境变量 `ANDROID_SDK_HOME="D:\home"`

#### 移动 `.gradle` 目录

由 C 盘的 `~/.gradle` 移动到 `/d/home/.gradle`

- 命令行执行的 gradle 命令

  添加以下内容到 `~/.bash_profile` 中：

  ```shell
  # Android
  export GRADLE_USER_HOME="/d/home/.gradle"
  ```

  添加完成后执行 `source ~/.bash_profile`

- Android Studio 执行的 gradle 命令

  打开 `Android Studio` 的设置，搜索 `gradle`，修改设置项 `gradle-home` 为 `D:\home\.gradle`

#### gradle 命令添加到 PATH 中

添加以下内容到 `~/.bash_profile` 中：

```shell
export PATH="$PATH:$GRADLE_USER_HOME/wrapper/dists/gradle-6.5-all/2oz4ud9k3tuxjg84bbf55q0tn/gradle-6.5/bin" # 根据实际情况修改路径地址：
```

添加完成后执行 `source ~/.bash_profile`

#### 配置 Java

- 下载

  到[清华大学镜像站](https://mirrors.tuna.tsinghua.edu.cn/Adoptium/)，下载对应版本 JDK。解压到目录 `/d/home/.jdks/` 中。

- 配置 shell

  添加以下内容到 `~/.bash_profile` 中：

  ```shell
  export JAVA_HOME="/d/home/.jdks/jdk8u402-b06" # 使用自己下载的Java版本
  # export JAVA_HOME="/d/Program Files/Android/Android Studio/jbr" # 使用Android Studio中自带的Java版本
  ```

  添加完成后执行 `source ~/.bash_profile`

- Android Studio 使用的 Java 版本，在 Android Studio 的设置中，搜索 `gradle`，在 `Gradle JDK` 选项中设置。

#### 配置镜像

添加以下内容到 `$GRADLE_USER_HOME/init.gradle` 中，即 `/d/home/.gradle/init.gradle`：

```java
allprojects {
    repositories {
        def ALIYUN_REPOSITORY_URL = 'https://maven.aliyun.com/repository/public'
        def ALIYUN_GOOGLE_URL = 'https://maven.aliyun.com/repository/google'
        all { ArtifactRepository repo ->
            if(repo instanceof MavenArtifactRepository){
                def url = repo.url.toString()
                if (url.startsWith('https://repo1.maven.org/maven2') || url.startsWith('https://jcenter.bintray.com') || url.startsWith('https://repo.maven.apache.org/maven2/')) {
                    project.logger.lifecycle "Repository ${repo.url} replaced by $ALIYUN_REPOSITORY_URL."
                    remove repo
                } else if (url.startsWith('https://dl.google.com/dl/android/maven2') || url.startsWith('https://maven.google.com')) {
                    project.logger.lifecycle "Repository ${repo.url} replaced by $ALIYUN_GOOGLE_URL."
                    remove repo
                } else {
                    project.logger.lifecycle "Repository ${repo.url} replaced by None."
                }
            }
        }
        maven { url ALIYUN_REPOSITORY_URL }
        maven { url ALIYUN_GOOGLE_URL }
    }
}
```
