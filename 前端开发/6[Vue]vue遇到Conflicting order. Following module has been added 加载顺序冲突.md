---
issue_number: 6
title: 'vue遇到Conflicting order. Following module has been added:（加载顺序冲突）'
labels:
  - Vue
---

关于 [mini-css-extract-plugin] Conflicting order. Following module has been added: 异常的参考资料 ：
https://github.com/vuejs/vue-cli/issues/3771

```js
// vue.config.js
css: {
  extract: process.env.NODE_ENV === 'production' ? {
     ignoreOrder: true,
  } : false,
}
```
