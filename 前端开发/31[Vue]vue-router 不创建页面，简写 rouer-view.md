---
issue_number: 31
title: vue-router 不创建页面，简写 rouer-view
labels:
  - Vue
---

vue-router 不创建页面，简写 rouer-view

```javascript
import { h, resolveComponent } from 'vue';

{
  path: 'some-path',
  name: 'routerName',
  component: { render: () => h(resolveComponent('router-view')) },
}
```
