---
pubDatetime: 2021-02-04T06:01:00.000Z
title: 安全的使用 innerHTML 插入 DOM
postSlug: safely-insert--dom-using-innerhtml
featured: false
draft: false
tags:
  - xss
description: >-
  使用innerHTML插入DOM元素时，如果HTML字符串中包含一些不确定的内容，比如js的代码，就会造成xss攻击。如果是单纯的字符串，最好是使用innerText赋值。如果必须要拼接html标签，使用
  htmlEscape 方法拼接字符串，或使用DOMPurify库处理。
updateTime: 2024-02-05T15:59:21.298Z
---

前端项目一般应该尽量避免直接插入 `html` 字符串，因为这样很容易造成 [xss](https://developer.mozilla.org/zh-CN/docs/Glossary/Cross-site_scripting) 攻击。

但是有时候是无法避免的，应该怎么保证我们要插入的 html 字符串是安全的呢？

## 使用 innerText

如果是单纯的字符串，最好是使用 `innerText` 赋值。

## 拼接 html 时，进行 Escape 处理

```javascript
var say = 'a bird in hand > two in the bush'
var html = htmlEscape`<div>I would just like to say : ${say}</div>`

function htmlEscape(literals, ...placeholders) {
  let result = ''
  for (let i = 0; i < placeholders.length; i += 1) {
    result += literals[i]
    result += placeholders[i]
      .replace(/&/g, '&amp;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/javascript/gi, '$&&rlm;')
  }

  result += literals[literals.length - 1]
  return result
}
```

其中 `javascript` 替换为 `javascript&rlm;`

`html` 不占位不显示的转义符

- `&rlm;`
- `&lrm;`
- `&zwj;`
- `&zwnj;`

## 拼接好的 html 字符串，使用 DOMPurify 库处理

对于已经拼接好的 `html` 字符串，不知道是否安全的情况下，在插入 `DOM` 之前，可以使用 [DOMPurify](https://github.com/cure53/DOMPurify) 处理下。
