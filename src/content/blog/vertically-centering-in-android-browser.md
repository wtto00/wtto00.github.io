---
pubDatetime: 2022-04-07T03:15:14.000Z
title: Android 浏览器下 垂直居中偏上
postSlug: vertically-centering-in-android-browser
featured: false
draft: false
tags:
  - css
description: '在某些情况下，安卓浏览器上，使用flex的垂直居中，实际显示有偏移，并不是垂直居中。添加line-height: normal;即可解决。'
updateTime: 2024-01-01T16:14:23.705Z
---

在某些情况下，安卓浏览器上，使用 flex 的垂直居中，实际显示有偏移，并不是垂直居中。

```css
display: flex;
align-items: center;
line-height: normal;
```

重点是 `line-height: normal;`

<https://segmentfault.com/a/1190000017088168>

<https://github.com/o2team/H5Skills/issues/4>
