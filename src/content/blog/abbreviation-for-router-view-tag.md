---
author: wtto00
pubDatetime: 2022-03-29T12:46:32.000Z
title: vue-router 不创建页面，简写 rouer-view
postSlug: abbreviation-for-router-view-tag
featured: false
draft: false
labels:
  - Vue
description: >-
  vue-router 不创建页面，简写 rouer-view: render: () =>
  h(resolveComponent('router-view'))
issue_number: 31
updateTime: 2023-12-16T15:25:39.904Z
---

## vue-router 不创建页面，简写 rouer-view

```javascript
import { h, resolveComponent } from 'vue';

{
  path: 'some-path',
  name: 'routerName',
  component: { render: () => h(resolveComponent('router-view')) },
}
```
