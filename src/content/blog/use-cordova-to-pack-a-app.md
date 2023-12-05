---
author: wtto00
pubDatetime: 2023-05-14T12:27:36.000Z
title: cordova准备工作
postSlug: use-cordova-to-pack-a-app
featured: false
draft: false
tags:
  - Javascript
description: cordova准备工作
issue_number: 44
---

如果已经有一个 H5 的前端项目，怎么使用 [cordova](https://cordova.apache.org/) 包装成移动端 APP 呢？

1. 安装 cordova

   ```shell
   npm i -g cordova@latest
   ```

   **注意**：使用 **npm** 命令，不要使用 `pnpm`，`yarn`，`cnpm` 等，下同。

1. 创建 config.xml 文件  
   已有此文件，忽略此步骤

   ```xml
   <?xml version='1.0' encoding='utf-8'?>
    <widget id="io.cordova.hello_cordova" version="1.0.0" xmlns="http://www.w3.org/ns/widgets" xmlns:cdv="http://cordova.apache.org/ns/1.0">
        <name>HelloCordova</name>
        <description>Sample Apache Cordova App</description>
        <author email="dev@cordova.apache.org" href="https://cordova.apache.org">
            Apache Cordova Team
        </author>
        <content src="index.html" />
        <allow-intent href="http://*/*" />
        <allow-intent href="https://*/*" />
    </widget>
   ```

   修改上面的内容
   |标识|解释|
   |---|----|
   |id|APP 包名 `io.cordova.hello_cordova`|
   |version|APP 版本号 `1.0.0`|
   |name|APP 名称 `HelloCordova`|
   |description|APP 描述信息简介 `Sample Apache Cordova App`|
   |author|APP 作者/开发者/所有者/公司等信息|

1. 创建 www 目录  
   已有此目录，忽略此步骤

   ```shell
   mkdir www
   ```

1. 安装 Android Studio

   已安装可忽略此步骤

   主要是为了使用 `Android Studio` 安装 `Android SDK` 等开发工具

   - [官方网站](https://developer.android.google.cn/studio/)下载并安装。
   - 安装完成后，打开设置，搜索 `sdk`
     - 安装至少一个 `SDK Platforms`，一般选择最新的安装版本即可。
     - 安装 `SDK Tools`，勾选 `Android SDK Build-Tools`，`Android SDK Command-line Tools`，`Android SDK Platform-Tools`
       > 一般这些是默认安装的，没有安装的话，请手动安装。

1. 设置环境变量

   ```shell
   # 更改为自己的 SDK 所在目录
   echo "export JAVA_HOME=\"/d/software/Android/jdk-16.0.2\"" >> ~/.bash_profile
   echo "export ANDROID_HOME=\"/d/software/Android/SDK\"" >> ~/.bash_profile
   echo "export ANDROID_SDK_ROOT=\"/d/software/Android/SDK\"" >> ~/.bash_profile
   echo "export PATH=\"\$PATH:\$ANDROID_SDK_ROOT/platform-tools\"" >> ~/.bash_profile
   echo "export PATH=\"\$PATH:\$ANDROID_SDK_ROOT/cmdline-tools/latest/bin\"" >> ~/.bash_profile
   echo "export PATH=\"\$PATH:\$ANDROID_SDK_ROOT/emulator\"" >> ~/.bash_profile

   # gradle的具体目录，需要自己手动进入 ~/.gradle/wrapper/dists 查看
   echo "export PATH=\"\$PATH:\$HOME/.gradle/wrapper/dists/gradle-7.5.1-bin/7jzzequgds1hbszbhq3npc5ng/gradle-7.5.1/bin\"" >> ~/.bash_profile
   ```

   此 `SDK` 的目录，可以在上一步中的 `SDK` 设置中，看到

1. 添加安卓平台

   ```shell
   cordova platform add android@latest --verbose
   ```

1. 查看问题

   ```shell
   cordova requirements android
   ```

   如果还有其他问题，按照要求修复环境即可

1. 生成缩略图

   ```shell
   npm i -g cordova-res

   # 查看命令参数
   cordova-res --help
   ```

   示例：

   ```shell
   cordova-res android --skip-config --android-project platforms/android --type icon
   ```

   事先在 `resources` 文件夹，准备文件 `icon.png` 图标文件，大小为 `1024x1024`。  
   如果要生成 `splashscreen`，准备文件 `splash.png` 文件，大小为 `2732x2732`。

1. 打包的前端文件，复制到 `www` 目录

   ```shell
   cp -r dist www
   ```

1. 启动 Android

   ```shell
   cordova run android --debug
   ```
