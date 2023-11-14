---
author: wtto00
pubDatetime: 2021-08-16T04:23:39.000Z
title: IOS 浏览器适配
postSlug: safari-compatibility-adaptation
featured: false
draft: false
tags:
  - H5
description: IOS 浏览器适配。css 适配 iPhone 全面屏底部安全区域。低版本 safari 提示 globalThis 不存在。input 聚焦时页面自动放大。
issue_number: 8
---

## **overflow：scroll:auto 元素无法滑动**

参考 <https://blog.csdn.net/qq_30114149/article/details/80844346>

元素添加 `-webkit-overflow-scrolling: touch`
子元素添加 `min-height`。(添加`height`无效，必须是`min-hegiht`)

## **border-radius 圆弧无效**

```css
body {
  * {
    -webkit-appearance: caret;
  }
}
```

## **关于 ios 上嵌入 h5 导致 input 聚焦时页面自动放大问题**

> 导致页面自动缩放的问题来源于，ios 在小屏设备（如 iphone 5s/6/6s/7/8...）上点击输入框的时候，如果 input 字体小于 16px 的时候会自动放大页面，提升阅读性。

解决：把 input 的字体大小设置为 16px 或大于 16px
参考：<https://www.cnblogs.com/fe-linjin/p/11877099.html>

## css 适配 iPhone 全面屏底部安全区域

```css
.element {
  padding-bottom: constant(safe-area-inset-bottom); /* 兼容 iOS < 11.2 */
  padding-bottom: env(safe-area-inset-bottom); /* 兼容 iOS >= 11.2 */
}
```

## ios 低版本 safari 提示 globalThis 不存在

ios 低端版本，在 vue-cli 打包的时候，部分代码打出来生成了 globalThis 这个对象，但是 ios 低端版本不能识别，控制台报错，造成白屏。

```html
<script src="https://unpkg.com/@ungap/global-this@0.4.4/min.js"></script>
```

## safari中input输入框弹出键盘回车键的显示文本

在安卓中，`<input type="search" />`，弹出键盘的回车键显示文本为 **搜索**，但是在 safari 中却无效。

在 safari 中，可以这样设置软键盘回车键的显示文本 `<input type="search" enterkeyhint="搜索" />`

[MDN: enterkeyhint](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/enterkeyhint)
