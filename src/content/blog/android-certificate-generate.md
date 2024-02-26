---
title: 安卓证书的生成与管理
postSlug: android-certificate-generate
featured: false
draft: true
tags:
  - android
description: 生成安卓证书
---

签名证书常规有两种格式 `jks` 和 `keystore`，前者可以通过 `Android Studio` 生成，后者可通过 `keytool` 命令生成。两个证书也是可以互相转换的。

## 生成 kyestore 证书

```shell
keytool -genkey -alias testalias -keyalg RSA -keysize 2048 -validity 36500 -keystore test.keystore
```

`keytool`命令乱码的话，输入 `chcp 936`，之后重试即可。`Git-Bash`需要输入`chcp.com 936`。

JKS 密钥库使用专用格式。建议使用 "keytool -importkeystore -srckeystore test.keystore -destkeystore test.keystore -deststoretype pkcs12" 迁移到行业标准格式 PKCS12。

## 查看证书签名

```shell
keytool -list -v -keystore test.keystore
```
