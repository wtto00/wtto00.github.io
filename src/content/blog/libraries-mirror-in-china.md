---
author: wtto00
pubDatetime: 2023-05-15T03:34:41.000Z
title: 一些常用库的国内镜像
postSlug: libraries-mirror-in-china
featured: false
draft: false
tags:
  - 镜像
description: '一些常用库的国内镜像: npm,cargo,maven,flutter,homebrew,dnf,ruby,pip'
issue_number: 45
---

## npm-JavaScript

使用[阿里云镜像](https://npmmirror.com/)

```shell
npm config set registry https://registry.npmmirror.com
```

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

使用[中科大镜像](https://mirrors.ustc.edu.cn/)

```shell
export HOMEBREW_BOTTLE_DOMAIN=https://mirrors.ustc.edu.cn/homebrew-bottles
```

## gradle

使用阿里云的镜像

`~/.gradle/init.gradle`

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

如果用了其他仓库，可以查看日志，然后到[阿里云云效 Maven 官网](https://developer.aliyun.com/mvn/guide)查看并替换

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

## python

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