---
pubDatetime: 2023-03-25T16:28:00.000Z
title: 前端跨平台打包工具整理
postSlug: front-end-cross-platform-packaging-tool
featured: false
draft: false
tags:
  - javascript
description: 前端跨平台打包工具整理：Electron、Tauri、Wails、React Native、Cordova、uniapp
updateTime: 2024-01-01T16:14:23.743Z
---

前端构建桌面端应用程序，首先想到的是 `Electron`，但是 `Electron` 构建的桌面端应用程序有一些缺点无法避免：

- 包太大，因为 `electron` 会自动塞入 `Chromium` 和 `nodejs`，一个什么也不做的 `electron` 项目压缩后也大概要 50m。
- 内存消耗过大，因为 `Chromium` 本身就很吃内存，再加上提供操作系统访问能力的 `nodejs`，很可观的内存消耗，对小工具类的项目不友好。

那么有什么框架可以代替 `Electron` 吗？

## 桌面端打包框架

| 框架                                                              | 前端实现                                                           | 后端实现 | 热度                                                                                      | 备注             |
| ----------------------------------------------------------------- | ------------------------------------------------------------------ | -------- | ----------------------------------------------------------------------------------------- | ---------------- |
| [Tauri](https://tauri.app/zh-cn/v1/guides/getting-started/setup/) | WebView2 (Windows)<br />WebKit (macOS, iOS, & Linux)               | Rust     | ![stars](https://img.shields.io/github/stars/tauri-apps/tauri?style=flat-square)          | 文档齐全，有中文 |
| [Wails](https://wails.io/zh-Hans/docs/introduction)               | WebView2 (Windows)<br />WKWebView (macOS)                          | Go       | ![stars](https://img.shields.io/github/stars/wailsapp/wails?style=flat-square)            | 中文文档齐全     |
| [Neutralinojs](https://neutralino.js.org/docs/)                   | WebView2 (Windows)<br />WKWebView (macOS)<br />gtk-webkit2 (Linux) | C++      | ![stars](https://img.shields.io/github/stars/neutralinojs/neutralinojs?style=flat-square) | 没有中文文档     |
| [electrino](https://github.com/pojala/electrino)                  | WebView2 (Windows)<br />WebKit (macOS)                             | .Net     | ![stars](https://img.shields.io/github/stars/pojala/electrino?style=flat-square)          | 不支持 Linux     |
| [go-astilectron](https://github.com/asticode/go-astilectron)      | Electron                                                           | Go       | ![stars](https://img.shields.io/github/stars/asticode/go-astilectron?style=flat-square)   |                  |
| [Chromely](https://github.com/chromelyapps/Chromely)              | Chromium ([CEF](https://bitbucket.org/chromiumembedded/cef/src))   | .Net     | ![stars](https://img.shields.io/github/stars/chromelyapps/Chromely?style=flat-square)     | 不维护了         |

以上的这些框架，基本都是轻量级的 `Electron`。打包体积大幅减小，但是对于**系统级的 API** 支持程度没有 `Electron` 完备。

## 移动端打包框架

前面说的是一些打包到桌面端的框架，那么打包到移动端的框架有哪些呢？
|框架|热度|备注|
|---|----|----|
|[React Native](https://reactnative.dev/docs/getting-started)|![stars](https://img.shields.io/github/stars/facebook/react-native?style=flat-square)|Facebook 维护，react|
|[Apache Cordova](https://cordova.apache.org/)|![stars](https://img.shields.io/github/stars/apache/cordova?style=flat-square)|Apache 开源组织下的，年代比较久远了|
|[Capacitor](https://capacitorjs.com/)|![stars](https://img.shields.io/github/stars/ionic-team/capacitor?style=flat-square)|Ionic Framework 维护，旨在替代 Cordova|
|[uniapp](https://uniapp.dcloud.net.cn/#)|![stars](https://img.shields.io/github/stars/dcloudio/uni-app?style=flat-square) |小程序首选。Native 使用的基于 weex 改进原生渲染引擎|
|[Taro](https://taro.jd.com/)|![stars](https://img.shields.io/github/stars/NervJS/taro?style=flat-square)|支持小程序。Native 使用的 RN|

## Flutter

另外还有一个要说的就是 [Flutter](https://docs.flutter.dev/) ![stars](https://img.shields.io/github/stars/flutter/flutter?style=flat-square)，但是他不是 JavaScript 技术栈了。

- 生态社区繁荣
- 文档齐备
- 性能良好
- 几乎所有平台都支持

有条件的话，推荐首选这个吧。
