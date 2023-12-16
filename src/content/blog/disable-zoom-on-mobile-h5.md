---
author: wtto00
pubDatetime: 2021-01-21T19:22:00.000Z
title: 移动端 H5 禁止缩放
postSlug: disable-zoom-on-mobile-h5
featured: false
draft: false
labels:
  - H5
description: >-
  移动端 H5 禁止缩放。<meta name="viewport"
  content="width=device-width,initial-scale=1.0,minimum-scale=1.0,
  maximum-scale=1.0, user-scalable=no">
issue_number: 4
updateTime: 2023-12-16T15:45:49.477Z
---

## 安卓一般加个 `meta` 标签即可

```html
<meta
  name="viewport"
  content="width=device-width,initial-scale=1.0,minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"
/>
```

## ios 可以引入下面的 js

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
