---
pubDatetime: 2021-01-23T06:29:00.000Z
title: 'vue遇到Conflicting order. Following module has been added:（加载顺序冲突）'
postSlug: conflicting-order-error-in-vue
featured: false
draft: false
labels:
  - Vue
description: 'vue遇到Conflicting order. Following module has been added:（加载顺序冲突）'
updateTime: 2023-12-30T17:48:17.265Z
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
