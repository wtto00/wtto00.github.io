---
pubDatetime: 2021-11-18T03:09:48.000Z
title: JS 产生服从均匀分布随机数
postSlug: uniformly-distributed-random-numbers
featured: false
draft: false
tags:
  - javascript
description: JS 产生服从均匀分布随机数
updateTime: 2024-01-01T16:14:23.702Z
---

## `[min, max]`

```js
Math.floor(Math.random() * (max - min + 1)) + min;
```

## `[min, max)`

```js
Math.floor(Math.random() * (max - min)) + min;
```

## `(min, max]`

```js
Math.ceil(Math.random() * (max - min)) + min;
```

---

> 摘自：<https://www.cnblogs.com/zztt/p/4024906.html>
