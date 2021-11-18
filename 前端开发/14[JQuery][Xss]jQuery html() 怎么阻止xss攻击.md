---
issue_number: 14
title: jQuery html() 怎么阻止xss攻击
---

- 如果是单纯的字符串，最好是使用 text()方法

- 如果必须要拼接 html 标签，那么引入
  ```html
  <script src="https://cdn.staticfile.org/underscore.js/1.12.0/underscore-min.min.js"></script>
  ```
  然后在拼接 html 字符串的时候，变量统统使用 `_.escape(var)` 处理一下
  > [underscore.js 官方文档](http://underscorejs.org/#escape)

---

也可以根据 `underscore.js` 的源码，编写 `escape` 函数

```javascript
var _escape = function (string) {
  var escapeMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '`': '&#x60;',
  };
  var escaper = function (match) {
    return escapeMap[match];
  };
  var source = '(?:' + keys(escapeMap).join('|') + ')';
  var testRegexp = RegExp(source);
  var replaceRegexp = RegExp(source, 'g');

  string = string == null ? '' : '' + string;
  return testRegexp.test(string) ? string.replace(replaceRegexp, escaper) : string;
};
```

---

另一种转义 html 字符串变量的方法

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
      .replace(/>/g, '&gt;');
  }

  result += literals[literals.length - 1];
  return result;
}
```
