---
pubDatetime: 2021-01-21T19:22:00.000Z
title: 移动端 H5 禁止缩放
postSlug: disable-zoom-on-mobile-h5
featured: false
draft: false
tags:
  - html
description: >-
  移动端 H5 禁止缩放。<meta name="viewport"
  content="width=device-width,initial-scale=1.0,minimum-scale=1.0,
  maximum-scale=1.0, user-scalable=no">
updateTime: 2024-01-01T16:14:23.738Z
---

## 在 `<head>` 头中添加 `meta` 标签

```html
<meta
  name="viewport"
  content="width=device-width,initial-scale=1.0,minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"
/>
```

## iOS 在某些情况下 `meta` 标签不生效

`<meta />` 标签不生效的话，可以尝试添加下边的 js 代码：

```javascript
// 缩放
try {
  // 禁用双击缩放
  document.addEventListener('touchstart', function (event) {
    if (event.touches.length > 1) {
      event.preventDefault();
    }
  });
  var lastTouchEnd = 0;
  document.addEventListener(
    'touchend',
    function (event) {
      var now = new Date().getTime();
      if (now - lastTouchEnd <= 300) {
        event.preventDefault();
      }
      lastTouchEnd = now;
    },
    false,
  );
  // 禁用双指手势操作
  document.addEventListener('gesturestart', function (event) {
    event.preventDefault();
  });
} catch (error) {}
```
