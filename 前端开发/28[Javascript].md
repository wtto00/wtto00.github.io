---
issue_number: 28
title: js 匹配 url 路径参数，并替换变量
---

```javascript
/**
 * 匹配替换url中的变量
 * @param {string} url
 * @param {object} params
 */
function replaceUrl(url, params = {}) {
  const matches = url.matchAll(/\{((?!\/).)+\}/g);

  let res = '';
  let startIndex = 0;

  for (const item of matches) {
    const beforeStr = url.substring(startIndex, item.index);
    res += beforeStr;

    const matchedStr = item[0];

    startIndex += beforeStr.length + matchedStr.length;

    const key = matchedStr.substring(1, matchedStr.length - 1);

    res += params[key] || '';
  }

  res += url.substring(startIndex);

  return res;
}

let url = replaceUrl('/yearpost/settop/{1}/{num}/1', { 1: 222, num: 444 });
console.log(url);
// /yearpost/settop/222/444/1
```
