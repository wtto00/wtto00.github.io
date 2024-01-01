---
pubDatetime: 2022-04-07T03:15:28.000Z
title: 利用CSS制作手机充电动画
postSlug: mobile-charging-animation
featured: false
draft: false
labels:
  - css
description: 仅使用CSS仿制华为手机的充电动画。
updateTime: 2024-01-01T11:50:27.434Z
---

![CSS充电动画](../../assets/images/mobile-charging-animation.gif)

## html

```html
<div class="mask">
  <div class="circle"></div>
</div>
```

## css

```css
.mask {
  width: 300px;
  height: 400px;
  overflow: hidden;
  background-color: #000;
  filter: contrast(15) hue-rotate(0);
  animation: hueRotate 10s infinite linear;
}
.circle {
  position: relative;
  width: 300px;
  height: 300px;
  filter: blur(8px);
  box-sizing: border-box;
}
.circle:before {
  position: absolute;
  top: 40%;
  left: 50%;
  z-index: 10;
  width: 176px;
  height: 176px;
  background-color: #000;
  border-radius: 50%;
  content: '';
  transform: translate(-50%, -50%);
}
.circle:after {
  position: absolute;
  top: 40%;
  left: 50%;
  width: 200px;
  height: 200px;
  background-color: #00ff6f;
  border-radius: 42% 38% 62% 49%/45%;
  content: '';
  transform: translate(-50%, -50%) rotate(0);
  animation: rotate 10s infinite linear;
}
@keyframes rotate {
  50% {
    border-radius: 45%/42% 38% 58% 49%;
  }
  to {
    transform: translate(-50%, -50%) rotate(720deg);
  }
}
@keyframes hueRotate {
  to {
    filter: contrast(15) hue-rotate(360deg);
  }
}
```

## 完整示例

[CodePen 示例](https://codepen.io/wtto00/pen/wvpmdqW?editors=1100)
