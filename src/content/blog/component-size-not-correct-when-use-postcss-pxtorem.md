---
author: wtto00
pubDatetime: 2021-08-16T04:23:39.000Z
title: 使用postcss-pxtorem自适应后，vant组件大小样式不对
postSlug: component-size-not-correct-when-use-postcss-pxtorem
featured: false
draft: false
tags:
  - Vue
description: 使用postcss-pxtorem自适应后，vant组件大小样式不对
issue_number: 7
---

因为vant的设计稿高宽度是 **1500px** ，如果自己所使用的设计稿宽度不是相同的，那么`postcss-pxtorem`转换的rem大小就不会匹配

```less
// App.less
/* prettier-ignore */
html {
  // 设置根字体大小为 屏幕宽度 / 10
  font-size: calc(10vw);
  @media screen and (min-width: 768px) {
    font-size: (768 / 10)PX;
  }
}
/* prettier-ignore */
body {
  max-width: 768PX;
}
```

```js
// vue.config.js
const pxtorem = require('postcss-pxtorem');

module.exports = {
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          pxtorem({
            rootValue: ({ file }) => {
              if (file.indexOf('node_modules/vant') > -1) return [设计稿宽度 / 10 * (设计稿宽度 / 1500)];
              return [设计稿宽度 / 10];
            },
          })
        ]
      }
    }
  }
}

```

其中 `APP.less` 中的 *屏幕宽度 / 10* , *768 / 10* 和 `vue.config.js` 中的 *设计稿宽度 / 10* ，两个的倍数需要保持一致，不一定是10，也可以改成自己想要的倍数
