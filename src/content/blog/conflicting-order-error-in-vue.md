---
author: wtto00
pubDatetime: 2021-08-16T04:23:39.000Z
title: 'vue遇到Conflicting order. Following module has been added:（加载顺序冲突）'
postSlug: conflicting-order-error-in-vue
featured: false
draft: false
tags:
  - Vue
description: 'vue遇到Conflicting order. Following module has been added:（加载顺序冲突）'
issue_number: 6
---

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
