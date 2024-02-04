---
title: Apple开发者证书在多台设备上的复制
postSlug: copy-apple-developer-certificate
featured: false
draft: false
tags:
  - mac
description: Apple开发者证书在多台设备上的复制。怎么把本机的Apple开发证书复制到另一台用于开发的Mac电脑上。
pubDatetime: 2024-02-04T11:11:45.512Z
updateTime: 2024-02-04T11:11:45.512Z
---

怎么把本机的 Apple 开发证书复制到另一台用于开发的 Mac 电脑上？

## 把本机上的开发证书导出保存

打开本机上的 `钥匙串` (Keychain)，选中开发证书，右键导出为 p12 文件。

## 在另一台 Mac 电脑上导入 p12 证书

直接双击之前导出的 p12 证书文件，即可安装。

然后打开 `钥匙串` (Keychain)，可以看到安装的证书。

## 证书不受信任

如果在 `钥匙串` (Keychain) 应用中，显示证书不受信任。

这是因为没有安装中间证书导致的。

双击不受信任的证书，打开证书详情。查看证书链，然后根据看到的证书链到 [Apple WWDRCA](https://www.apple.com/certificateauthority/) 网站上下载安装对应的证书。
