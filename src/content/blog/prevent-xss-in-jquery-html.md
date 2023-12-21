---
pubDatetime: 2021-02-04T06:01:00.000Z
title: jQuery html() 怎么阻止xss攻击
postSlug: prevent-xss-in-jquery-html
featured: false
draft: false
labels:
  - xss
description: >-
  jQuery html() 怎么阻止xss攻击。如果是单纯的字符串，最好是使用text()方法。如果必须要拼接html标签，使用 htmlEscape
  方法。
issue_number: 14
updateTime: 2023-12-21T16:14:55.701Z
---

- 如果是单纯的字符串，最好是使用 text() 方法

- 如果必须要拼接 html 标签

  ```javascript
  var say = 'a bird in hand > two in the bush';
  var html = htmlEscape`<div>I would just like to say : ${say}</div>`;

  function htmlEscape(literals, ...placeholders) {
    let result = '';
    for (let i = 0; i < placeholders.length; i += 1) {
      result += literals[i];
      result += placeholders[i]
        .replace(/&/g, '&amp;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/javascript/gi, '$&&rlm;');
    }

    result += literals[literals.length - 1];
    return result;
  }
  ```

---

`html` 不占位不显示的转义符

- `&rlm;`
- `&lrm;`
- `&zwj;`
- `&zwnj;`

> 关于 `string.replace` 正则，可参见 <https://segmentfault.com/a/1190000008787668>
