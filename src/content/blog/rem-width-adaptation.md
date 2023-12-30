---
pubDatetime: 2021-01-23T08:07:00.000Z
title: 使用rem实现宽度自适应
postSlug: rem-width-adaptation
featured: false
draft: false
labels:
  - css
description: 使用rem实现元素大小随宽度自适应，关键是根字体的大小。合理的设置根字体大小随宽度变化而变化，就可以轻易的实现这一点，
updateTime: 2023-12-30T17:48:17.267Z
---

rem单位是相对于根字体大小的。

元素大小跟随窗口宽度大小自适应，主要用于移动端的H5。

但是有个问题是如果自适应大小的H5页面在宽屏的PC端打开，就会让元素变得非常大，从而导致布局全乱了，无法正常查看。

我们可以设置一个最大窗口宽度，当窗口宽度大于这个宽度时，根字体大小就不再变化，然后应用在这个最大的宽度内渲染，可以让其左右居中，两边留白。实现在PC宽屏下展示窄屏H5的浏览效果。

浏览器默认字体大小是16px，一般移动端的我们的设计稿尺寸时按照屏幕宽度为375px，来设计的。所以我们先定个基准：当窗口宽度为375px时，根字体大小为16px。

#### 计算动态根字体大小

根据上述基准，我们可以得出:

```plaintext
根字体大小 = 窗口宽度 * 16px / 375px
```

即

```css
:root {
  font-size: calc(100vw * 16 / 375);
}
```

#### 设置最大窗口宽度

假设，我们设置最大窗口宽度为`768px`，即当窗口宽度大于`768px`时，根字体大小将不再变化

```css
@media screen and (min-width: 768px) {
  :root {
    /* calc(768px * 16 / 375) */
    font-size: 32.768px;
  }
}
```

#### 设置内容水平居中显示

设置内容在所规定的最大宽度内水平居中显示

```css
body {
  max-width: 768px;
  margin: 0 auto;
}
```

#### 设置定位元素的基准

当我们的内容在PC宽屏下，水平居中显示，两边保留空白的情况下，如果有一个固定定位的弹窗，样式为

```css
.modal {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
}
```

这样的话，就会导致弹窗的宽度是相对于整个窗口的宽度，这是不合适的。

根据[MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/position#fixed)中固定定位`fixed`的描述：

> 当元素祖先的 transform、perspective、filter 或 backdrop-filter 属性非 none 时，容器由视口改为该祖先。

所以我么可以设置`body`的样式为:

```css
body {
  perspective: 0;
}
```

使`body`内的所有元素，固定定位的基准为`body`的大小位置，而不是整个窗口。