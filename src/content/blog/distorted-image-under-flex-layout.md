---
author: wtto00
pubDatetime: 2021-05-18T09:44:00.000Z
title: flex布局下img图片变形的解决方法
postSlug: distorted-image-under-flex-layout
featured: false
draft: false
labels:
  - CSS
description: >-
  flex布局下img图片变形的解决方法。给 img 设置 flex-shrink。在父元素没有设置高度的情况下，给图片设置
  height。用div标签包裹图片。
issue_number: 18
updateTime: 2023-12-16T15:45:49.478Z
---

## flex-shrink：0

给 img 设置 flex-shrink：0；
flex-shrink 的默认值为 1，如果没有显示定义该属性，将会自动按照默认值 1 在所有因子相加之后计算比率来进行空间收缩。设置为 0 表示不收缩。
flex 元素仅在默认宽度之和大于容器的时候才会发生收缩，其收缩的大小是依据 flex-shrink 的值。注意：如果元素不是弹性盒对象的元素，则 flex-shrink 属性不起作用。
缺点：仅兼容 IE11

## height：100%

在父元素没有设置高度的情况下，给图片设置 height：100%;

## 外层 div 标签包裹

用 div 标签包裹图片，这种方案比较通用，缺点：产生无用标签。

> 转自：<https://www.shuzhiduo.com/A/o75NEqvMJW/>
