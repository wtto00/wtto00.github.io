---
issue_number: 31
title: vue-router 不创建页面，简写 rouer-view
---

vue-router 不创建页面，简写 rouer-view

```javascript
{
  path: '',
  name: '',
  component: { render: () => h(resolveComponent('router-view')) },
}
```
