---
pubDatetime: 2022-05-18T15:32:41.000Z
title: 下载页面上的canvas
postSlug: download-canvas-from-any-website
featured: false
draft: false
labels:
  - javascript
  - canvas
description: 在控制台输入代码快速下载页面上的canvas
updateTime: 2024-01-01T16:05:24.326Z
---

## JS 脚本下载 canvas 为本地图片

许多文档类网站，文档的预览用的是 `canvas`，但是下载是收费的。  
我们可以通过在控制台执行下述代码，保存预览的图片到本地。

> 浏览器最好是设置下载保存无需询问，提前设置好下载的目录

```javascript
function getFileUrls(canvas) {
  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      const url = URL.createObjectURL(blob);
      resolve(url);
    });
  });
}

function delay() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(0);
    }, 1000);
  });
}

async function download() {
  // 这里的.inner_page是所有文档页的canvas元素选择，根据实际更改
  let canvas = document.querySelectorAll('.inner_page');
  for (let i = 0; i < canvas.length; i++) {
    const url = await getFileUrls(canvas[i]);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${i}.png`;
    a.click();
    await delay();
  }
}

download();
```

## 本地图片转 PDF 文档

下载保存所有文档页到本地图片后，可以使用 [https://www.67tool.com/pdf/imgToPdf](https://www.67tool.com/pdf/imgToPdf) 把图片转为 pdf。

如果页面特别多，不好一下子全部转成 pdf，可以分段转成多个 pdf 文件，然后使用 [https://www.67tool.com/pdf/merge](https://www.67tool.com/pdf/merge) 把多个 pdf 合并为一个。
