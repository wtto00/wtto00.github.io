---
author: wtto00
pubDatetime: 2022-01-21T07:45:32.000Z
title: js 匹配 url 路径参数，并替换变量
postSlug: replace-url-path-parameters
featured: false
draft: false
labels:
  - Javascript
description: js 使用正则匹配 url 路径参数，并替换变量
issue_number: 28
updateTime: 2023-12-16T15:25:39.957Z
---

> <https://node.green/#ES2020-features-String-prototype-matchAll>
> matchAll 在 nodejs，v12 版本才支持

### Node.js v12+

Node.js：version >= 12

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

### Node.js v12-

Node.js：version < 12

```javascript
/**
 * 匹配替换url中的变量
 * @param {string} url
 * @param {object} params
 */
function replaceUrl(url, params = {}) {
  const matches = url.match(/\{((?!\/).)+\}/g);
  if (!matches) return url;

  let res = '';
  let originUrl = url;

  for (let i = 0; i < matches.length; i++) {
    const item = matches[i];
    const index = originUrl.indexOf(item);
    const beforeStr = originUrl.substring(0, index);
    res += beforeStr;

    const key = item.substring(1, item.length - 1);
    res += params[key] || '';

    originUrl = originUrl.substring(index + item.length);
  }

  res += originUrl;

  return res;
}
```
