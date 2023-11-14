---
author: wtto00
pubDatetime: 2021-11-18T03:09:48.000Z
title: JS 产生服从均匀分布随机数
postSlug: uniformly-distributed-random-numbers
featured: false
draft: false
tags:
  - Javascript
description: JS 产生服从均匀分布随机数
issue_number: 23
---

- 如果想获得 `[min, max]`, 可以使用 `Math.floor(Math.random() * (max - min + 1)) + min`;
- 如果想获得 `[min, max）`, 可以使用 `Math.floor(Math.random() * (max - min )) + min`;
- 如果想获得 `(min, max]`, 可以使用 `Math.ceil(Math.random() * (max - min )) + min`;

> 摘自：<https://www.cnblogs.com/zztt/p/4024906.html>
