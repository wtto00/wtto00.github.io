---
pubDatetime: 2021-01-23T06:29:00.000Z
title: vue使用问题汇总
postSlug: problems-with-vue
featured: false
draft: false
tags:
  - vue
description: '在使用vue的过程中遇到的一些记录。Conflicting order. Following module has been added:（加载顺序冲突）'
updateTime: 2024-01-01T16:14:23.766Z
---

该篇文章主要记录一些使用 `vue` 过程中遇到的一些问题，以及解决办法。

## Conflicting order。Following module has been added

关于 [mini-css-extract-plugin](https://www.npmjs.com/package/mini-css-extract-plugin) Conflicting order。Following module has been added：异常的参考资料：
<https://github.com/vuejs/vue-cli/issues/3771>

```js
// vue.config.js
css: {
  extract: process.env.NODE_ENV === 'production' ? {
     ignoreOrder: true,
  } : false,
}
```
