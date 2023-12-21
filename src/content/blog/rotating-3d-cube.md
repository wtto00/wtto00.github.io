---
author: wtto00
pubDatetime: 2022-08-25T06:35:23.000Z
title: css实现3D立方体旋转
postSlug: rotating-3d-cube
featured: false
draft: false
labels:
  - CSS
description: css实现3D立方体旋转
issue_number: 37
updateTime: 2023-12-21T16:08:41.561Z
---

[codepen](https://codepen.io/wtto00/pen/LYdoPaQ?editors=1100)

```html
<p class="core">
  <i id="🍎"></i>
  <i id="😂"></i>
  <i id="🧸"></i>
  <i id="🐼"></i>
  <i id="👌"></i>
  <i id="👻"></i>
</p>
```

```css
.core {
  transform-style: PRESERVE-3D;
  text-shadow: none;
  width: 80px;
  height: 80px;
  position: relative;
  transform: rotateX(-35deg) rotateY(45deg) rotate(0);
  animation: cubespin 10s linear infinite;

  margin: 100px auto 0;
}
@keyframes cubespin {
  100% {
    transform: rotateX(-35deg) rotateY(-315deg) rotate(-360deg);
  }
}
.core > i {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  display: block;
  font-style: normal;
  font-size: 32px;
  line-height: 80px;
  border-radius: 0;
  text-align: center;
  background-color: #fff;
}
.core > i[id]::before {
  font-family: var(--font-emoji);
  content: attr(id);
  display: block;
  font-size: inherit;
  line-height: inherit;
  white-space: nowrap;
  letter-spacing: 10px;
}
.core > i:nth-child(1) {
  background: rgba(255, 94, 58, 0.9);
  transform: rotateX(180deg) translateZ(-40px);
}
.core > i:nth-child(2) {
  background: rgba(68, 133, 237, 0.9);
  transform: rotateX(180deg) translateZ(40px) rotate(180deg) rotateY(180deg);
}
.core > i:nth-child(3) {
  background: rgba(255, 153, 0, 0.9);
  transform: rotateY(90deg) translateZ(40px) rotate(-90deg) rotateX(180deg);
}
.core > i:nth-child(4) {
  background: rgba(247, 72, 129, 0.9);
  transform: rotateY(-90deg) translateZ(40px) rotatex(180deg) rotate(270deg);
}
.core > i:nth-child(5) {
  background: rgba(82, 64, 97, 0.9);
  transform: rotateX(90deg) translateZ(40px) rotate(-90deg) rotateY(180deg);
}
.core > i:nth-child(6) {
  background: rgba(156, 39, 176, 0.9);
  transform: rotateX(90deg) translateZ(-40px);
}
```
