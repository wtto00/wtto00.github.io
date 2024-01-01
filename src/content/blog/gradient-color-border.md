---
pubDatetime: 2021-11-18T03:09:48.000Z
title: 利用CSS怎么创建渐变色边框？
postSlug: gradient-color-border
featured: false
draft: false
tags:
  - css
description: 利用CSS怎么创建渐变色边框？这里介绍5种方法创建渐变色边框
updateTime: 2024-01-01T16:14:23.744Z
---

利用 CSS 怎么创建渐变色边框？下面本篇文章给大家分享 CSS 实现渐变色边框的 5 种方法，希望对大家有所帮助！
![gradient-color-border](../../assets/images/gradient-color-border.png)
给 border 设置渐变色是很常见的效果，实现这个效果有很多思路，今天把我所知道的方法罗列于此供大家参考。(学习视频分享：[css 视频教程](https://www.php.cn/course/list/12.html))

## 使用 `border-image`

CSS 提供了 [border-image](https://developer.mozilla.org/en-US/docs/Web/CSS/border-image) 属性用于给 border 绘制复杂图样，与 [background-image](https://developer.mozilla.org/en-US/docs/Web/CSS/background-image) 类似，我们可以在 border 中展示 `image` 和 `linear-gradient`。

通过 `border-image` 设置渐变色 border 是最简单的方法，只需要两行代码：

```css
/* CSS */
div {
  border: 4px solid;
  border-image: linear-gradient(to right, #8f41e9, #578aef) 1;
}
/* 或者 */
div {
  border: 4px solid;
  border-image-source: linear-gradient(to right, #8f41e9, #578aef);
  border-image-slice: 1;
}
```

> [Codepen demo](https://codepen.io/mudontire/pen/xxLxeZw)

这种方式虽然简单但有个明显的缺陷，不支持设置 `border-radius`。接下来会介绍几种支持 `border-radius` 的方法。

## 使用 `background-image`

使用 `background-image` 绘制渐变色背景，并且把中间用纯色遮住应该是最容易想到的一种方法，思路是：使用两个盒子叠加，给下层的盒子设置渐变色背景和 padding，给上层盒子设置纯色背景。

```html
<!-- html -->
<div class="border-box border-bg">
  <div class="content">
    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iste ratione necessitatibus numquam sunt nihil quos saepe
    sit facere. Alias accusamus voluptate accusantium facere fugiat animi temporibus adipisci! Corporis, accusamus
    tempora.
  </div>
</div>
```

```css
/* css */
.border-box {
  width: 300px;
  height: 200px;
  margin: 25px 0;
}
.border-bg {
  padding: 4px;
  background: linear-gradient(to right, #8f41e9, #578aef);
  border-radius: 16px;
}
.content {
  height: 100%;
  background: #222;
  border-radius: 13px; /*trciky part*/
}
```

> [Codepen demo](https://codepen.io/mudontire/pen/ZEJEZoY)

这种方式的优点是容易理解，兼容性好，缺点是设置 content 的 border-radius 会比较 tricky，且不准确。

## 两层元素、`background-image`、`background-clip`

为了解决方法 2 中 `border-radius` 不准确的问题，可以使用一个单独的元素作为渐变色背景放在最下层，上层设置一个透明的 border 和纯色的背景 (需要设置 `background-clip: padding-box` 以避免盖住下层元素的 border)，上下两层设置相同的 `border-radius`。

```html
<!-- html -->
<div class="border-box">
  <div class="border-bg"></div>
  <div class="content">
    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iste ratione necessitatibus numquam sunt nihil quos saepe
    sit facere. Alias accusamus voluptate accusantium facere fugiat animi temporibus adipisci! Corporis, accusamus
    tempora.
  </div>
</div>
```

```css
/* css */
.border-box {
  border: 4px solid transparent;
  border-radius: 16px;
  position: relative;
  background-color: #222;
  background-clip: padding-box; /*important*/
}
.border-bg {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: -1;
  margin: -4px;
  border-radius: inherit; /*important*/
  background: linear-gradient(to right, #8f41e9, #578aef);
}
```

> [Codepen demo](https://codepen.io/mudontire/pen/yLoLrxL)

## 伪元素、方法 3 的简化

我们可以使用伪元素替换 `div.border-bg` 以简化 HTML 结构。

```html
<!-- html -->
<div class="border-box">
  <div class="content">
    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iste ratione necessitatibus numquam sunt nihil quos saepe
    sit facere. Alias accusamus voluptate accusantium facere fugiat animi temporibus adipisci! Corporis, accusamus
    tempora.
  </div>
</div>
```

```css
/* css */
.border-box {
  border: 4px solid transparent;
  border-radius: 16px;
  position: relative;
  background-color: #222;
  background-clip: padding-box; /*important*/
}
.border-box::before {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: -1;
  margin: -4px;
  border-radius: inherit; /*important*/
  background: linear-gradient(to right, #8f41e9, #578aef);
}
```

> [Codepen demo](https://codepen.io/mudontire/pen/JjyjVwN)

## 单层元素、`background-clip`、`background-origin`、`background-image`

最后是我觉得最优雅的一种方法，只需要用到单层元素，为其分别设置 `background-clip`、`background-origin`、`background-image` 这三个属性，每个属性设置两组值，第一组用于设置 border 内的单色背景，第二组用于设置 border 上的渐变色。

```html
<!-- html -->
<div class="border-box">
  <div class="content">
    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iste ratione necessitatibus numquam sunt nihil quos saepe
    sit facere. Alias accusamus voluptate accusantium facere fugiat animi temporibus adipisci! Corporis, accusamus
    tempora.
  </div>
</div>
```

```css
/* css */
.border-box {
  border: 4px solid transparent;
  border-radius: 16px;
  background-clip: padding-box, border-box;
  background-origin: padding-box, border-box;
  background-image: linear-gradient(to right, #222, #222), linear-gradient(90deg, #8f41e9, #578aef);
}
```

> [Codepen demo](https://codepen.io/mudontire/pen/wvqvZZO)

## 总结

目前就能想到这 5 种方法，个人推荐优先使用 4 和 5，如果有其他更好的方法，欢迎大家补充。

> 摘自：<https://segmentfault.com/a/1190000040794056>
