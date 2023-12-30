---
pubDatetime: 2022-03-29T12:46:32.000Z
title: vue-router 不创建页面，简写 rouer-view
postSlug: abbreviation-for-router-view-tag
featured: false
draft: false
labels:
  - vue
description: >-
  vue-router 不创建页面，简写 rouer-view: render: () =>
  h(resolveComponent('router-view'))
updateTime: 2023-12-30T17:51:48.417Z
---

项目中有太多嵌套的路由，其实只是为了分级作用，父级路由并不处理任何逻辑。

如果每个父级组件都要重复性的建组件：

```html
<template>
  <router-view />
</template>
```

这样就显得有点繁琐，所以有没有办法，可以不新建组件，直接在路由中一笔带过呢？

[stackblitz 示例](https://stackblitz.com/edit/vitejs-vite-dtkyky?file=package.json,src%2Froutes%2Findex.ts&terminal=dev)

## vue-router 不创建页面，简写 rouer-view

```javascript
import { h, resolveComponent } from 'vue';

{
  path: 'some-path',
  name: 'routerName',
  component: { render: () => h(resolveComponent('router-view')) },
}
```

## 添加 transition 组件

```javascript
import { h, resolveComponent, Transition } from 'vue';
import { RouterView } from 'vue-router';

{
  path: 'some-path',
  name: 'routerName',
  component: {
    render: () =>
      h(RouterView, ({ Component, route }) =>
        h(Transition, { name: 'fade' }, h(Component, { key: route.path }))
      ),
  },
}
```

注意这里不能用 `resolveComponent('transition')`，而是 `import { Transition } from 'vue'`。

这是因为 `vue` 的内置组件，诸如：`<KeepAlive>`、`<Transition>`、`<TransitionGroup>`、`<Teleport>` 和 `<Suspense>` 这些并没有注册为全局组件，是为了打包工具的 `tree-shake`。

所以上面的 `resolveComponent('router-view')`，可以直接改写为引入的 `RouterView`。

## 总结

如果只是单个 `<router-view />`，可以使用上述简写的方式。

如果还要加上 `<keep-alive>` 或者 `<transition>` 的话，最好是单独写个组件来解决。因为稍微复杂一点的嵌套，使用渲染函数 `h` 并没有起到简写的目的，反而让其变得更复杂。
