---
pubDatetime: 2021-08-03T04:26:00.000Z
title: js中canvas、base64、ArrayBuffer、Blob、Url、File互转
postSlug: canvas-base64-arraybuffer-blob-url-file-transform
featured: false
draft: false
tags:
  - javascript
description: js中canvas、base64、ArrayBuffer、Blob、Url、File之间的互相转换
updateTime: 2024-01-01T16:14:23.731Z
---

## canvas to base64

```javascript
const dataurl = canvas.toDataURL('image/png');
console.log(dataurl);
```

## canvas to Blob

```javascript
canvas.toBlob((blob) => {
  console.log(blob);
});
```

## base64 to canvas

```javascript
var img = new Image();
img.onload = function () {
  canvas.drawImage(img);
};
img.src = dataurl;
```

## base64 to ArrayBuffer

浏览器环境下

```javascript
const arr = base64.split(',');
const [, mime] = arr[0].match(/:(.*?);/);
const bstr = window.atob(arr[1]);
let n = bstr.length;
const u8arr = new Uint8Array(n);
while (n > 0) {
  n -= 1;
  u8arr[n] = bstr.charCodeAt(n);
}
console.log(u8arr);
```

Nodejs

```javascript
const arr = dataurl.split(',');
const buffer = Buffer.from(arr[1], 'base64');
console.log(buffer);
```

## ArrayBuffer to base64

```javascript
let binary = '';
const bytes = new Uint8Array(buffer);
const len = bytes.byteLength;
for (let i = 0; i < len; i++) {
  binary += String.fromCharCode(bytes[i]);
}
const base64 = window.btoa(binary);
console.log(`data:${mime};base64,${base64}`);
```

## ArrayBuffer to Blob

```javascript
const arr = base64.split(',');
const [, mime] = arr[0].match(/:(.*?);/);

const blob = new Blob([buffer], { type: mime });
console.log(blob);
```

## Blob to ArrayBuffer

```javascript
const blob = new Blob([1, 2, 3, 4]);
const reader = new FileReader();
reader.onload = function (result) {
  console.log(result);
};
reader.readAsArrayBuffer(blob);
```

## Blob to File

```javascript
// const file = new File([blob], `${fileName}`);
// 这种方法 File 属性只有 name，没有 size 等其他属性
// console.log(file);
const formData = new FormData();
formData.append(filename, blob, filename);
const file = formData.get(filename);
console.log(file);
```

## Blob to Url

```javascript
const url = URL.createObjectURL(blob);
console.log(url);
```

## Url to Blob

```javascript
const blob = await fetch(url).then((r) => r.blob());
```

## File to base64 / Blob to base64

```javascript
const reader = new FileReader();
reader.onload = function (result) {
  console.log(result);
};
reader.readAsDataURL(file);
// reader.readAsDataURL(blob);
```

## svg to Blob

```javascript
var data =
  '<svg xmlns="http://www.w3.org/2000/svg" width="300" height="200">' +
  '<foreignObject width="100%" height="100%">' +
  '<div xmlns="http://www.w3.org/1999/xhtml" style="font-size:50px">' +
  'Simply Easy ' +
  '<span style="color:blue;">' +
  'Learning</span>' +
  '</div>' +
  '</foreignObject>' +
  '</svg>';
var svg = new Blob([data], { type: 'image/svg+xml' });
```

注意：如果这里的 `svg` 使用了外部样式的话，那么这些样式都将无效
