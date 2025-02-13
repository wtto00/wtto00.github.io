---
pubDatetime: 2023-05-15T03:34:41.000Z
title: 一些常用库的国内镜像
postSlug: libraries-mirror-in-china
featured: false
draft: false
tags:
  - 镜像
description: '一些常用库的国内镜像: npm,cargo,maven,flutter,homebrew,dnf,ruby,pip'
updateTime: 2025-02-13T09:29:58.967Z
---

## npm-JavaScript

使用[阿里云镜像](https://npmmirror.com/)

```shell
npm config set registry https://registry.npmmirror.com
```

## nodejs

使用[北京外国语大学](https://mirrors.bfsu.edu.cn/help/nodejs-release/)的镜像

```shell
# 使用fnm下载nodejs
export FNM_NODE_DIST_MIRROR="https://mirrors.bfsu.edu.cn/nodejs-release/"
```

corepack

```shell
export COREPACK_NPM_REGISTRY="https://registry.npmmirror.com"
# Windows
[Environment]::SetEnvironmentVariable("COREPACK_NPM_REGISTRY","https://registry.npmmirror.com")
```

如果遇到网络 302 错误，那么可以使用 `npm i -g corepack` 更新最新版本。

## git-for-windows

前往[清华大学镜像站](https://mirrors.tuna.tsinghua.edu.cn/github-release/git-for-windows/git/)下载。

## JDK

前往[清华大学镜像站](https://mirrors.tuna.tsinghua.edu.cn/Adoptium/)下载。

## cargo-Rust

使用[字节跳动](http://rsproxy.cn/)的镜像

`~/.cargo/config`

```shell
[source.crates-io]
# To use sparse index, change 'rsproxy' to 'rsproxy-sparse'
replace-with = 'rsproxy'

[source.rsproxy]
registry = "https://rsproxy.cn/crates.io-index"
[source.rsproxy-sparse]
registry = "sparse+https://rsproxy.cn/index/"

[registries.rsproxy]
index = "https://rsproxy.cn/crates.io-index"

[net]
git-fetch-with-cli = true
```

`rustup`

```shell
export RUSTUP_DIST_SERVER="https://rsproxy.cn"
export RUSTUP_UPDATE_ROOT="https://rsproxy.cn/rustup"
```

## flutter

使用 [flutter-io](https://flutter-io.cn/) 镜像

```shell
# flutter 本身的地址
export FLUTTER_STORAGE_BASE_URL=https://storage.flutter-io.cn
# flutter 依赖包的地址
export PUB_HOSTED_URL=https://pub.flutter-io.cn
```

## homebrew

使用[中科大镜像](https://mirrors.ustc.edu.cn/help/brew.git.html)

```shell
echo 'export HOMEBREW_BREW_GIT_REMOTE="https://mirrors.ustc.edu.cn/brew.git"' >> ~/.zprofile # Homebrew
echo 'export HOMEBREW_CORE_GIT_REMOTE="https://mirrors.ustc.edu.cn/homebrew-core.git"' >> ~/.zprofile # Homebrew Core

source ~/.zprofile
brew update

echo 'export HOMEBREW_BOTTLE_DOMAIN="https://mirrors.ustc.edu.cn/homebrew-bottles"' >> ~/.zprofile # Homebrew Bottles
echo 'export HOMEBREW_API_DOMAIN="https://mirrors.ustc.edu.cn/homebrew-bottles/api"' >> ~/.zprofile # Homebrew Bottles

# brew tap --custom-remote --force-auto-update homebrew/cask https://mirrors.ustc.edu.cn/homebrew-cask.git # Homebrew Cask
brew tap --custom-remote --force-auto-update homebrew/services https://mirrors.ustc.edu.cn/homebrew-services.git # Homebrew Services
```

## gradle-java

使用阿里云的镜像

`~/.gradle/init.gradle`

```java
allprojects {
    repositories {
        def ALIYUN_REPOSITORY_URL = 'https://maven.aliyun.com/repository/public'
        def ALIYUN_GOOGLE_URL = 'https://maven.aliyun.com/repository/google'
        def HUAWEIYUN_MAVEN_URL = 'https://mirrors.huaweicloud.com/repository/maven'
        def SCIJAVA_URL = 'https://maven.scijava.org/content/repositories/public'
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
        maven { url HUAWEIYUN_MAVEN_URL }
        maven { url SCIJAVA_URL }
    }
}
```

如果用了其他仓库，可以查看日志，然后到[阿里云云效 Maven 官网](https://developer.aliyun.com/mvn/guide)查看并替换

由于阿里云的镜像无法下载微信 openSDK6.8.26 (<https://maven.aliyun.com/repository/public/com/tencent/mm/opensdk/wechat-sdk-android/6.8.26/wechat-sdk-android-6.8.26.pom>) 版本，所以后面加个[华为云 maven 镜像](https://mirrors.huaweicloud.com/mirrorDetail/5ea0025f2ab89b484a4dd5ce)。

由于阿里云以及华为云的镜像某些时候更新不及时，延时性比较大，对于比较急用的依赖包，加上 [scijava](https://maven.scijava.org/content/repositories/public)

**gradle wrapper config**

```properties
#distributionUrl=https\://services.gradle.org/distributions/gradle-6.4.1-all.zip
distributionUrl=https\://mirrors.cloud.tencent.com/gradle/gradle-6.4.1-all.zip
```

根据实际情况修改版本号

## dnf-fedora

使用[清华大学镜像](https://mirrors.tuna.tsinghua.edu.cn/)

```shell
sudo sed -e 's|^metalink=|#metalink=|g' \
         -e 's|^#baseurl=http://download.example/pub/fedora/linux|baseurl=https://mirrors.tuna.tsinghua.edu.cn/fedora|g' \
         -i.bak \
         /etc/yum.repos.d/fedora.repo \
         /etc/yum.repos.d/fedora-modular.repo \
         /etc/yum.repos.d/fedora-updates.repo \
         /etc/yum.repos.d/fedora-updates-modular.repo
```

更新请以[官方文档](https://mirrors.tuna.tsinghua.edu.cn/help/fedora/)为准。

经过测试，Fedora38 不可用，38 以后的版本可用。因为 Fedora 官方已把 38 版本的源归档。

## Ubuntu

使用[中科大镜像](https://mirrors.ustc.edu.cn/help/ubuntu.html)

```shell
sudo sed -i 's@//.*archive.ubuntu.com@//mirrors.ustc.edu.cn@g' /etc/apt/sources.list
# sudo sed -i 's/security.ubuntu.com/mirrors.ustc.edu.cn/g' /etc/apt/sources.list
```

## pip-python

- `python` 安装包下载

  使用阿里云镜像：<https://registry.npmmirror.com/binary.html?path=python/>

- `pip` 镜像源

  ```shell
  pip config --global set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple
  pip config --global set install.trusted-host 'https://pypi.tuna.tsinghua.edu.cn'
  ```

## gem-Ruby

使用[清华大学镜像](https://mirrors.tuna.tsinghua.edu.cn/help/rubygems/)

```bash
# 添加镜像源并移除默认源
gem sources --add https://mirrors.tuna.tsinghua.edu.cn/rubygems/ --remove https://rubygems.org/
# 列出已有源
gem sources -l
# 应该只有镜像源一个
```
