---
issue_number: 20
title: js中canvas、base64、ArrayBuffer、Blob、File互转
---

### canvas to base64

```javascript
const dataurl = canvas.toDataURL('image/png');
console.log(dataurl);
```

### base64 to canvas

```javascript
var img = new Image();
img.onload = function () {
  canvas.drawImage(img);
};
img.src = dataurl;
```

### base64 to ArrayBuffer

```javascript
const arr = dataurl.split(',');
const buffer = Buffer.from(arr[1], 'base64');
console.log(buffer);
```

### ArrayBuffer to Blob

```javascript
const arr = dataurl.split(',');
const buffer = Buffer.from(arr[1], 'base64');
const blob = new Blob([buffer], { type: arr[0] });
console.log(blob);
```

### Blob to ArrayBuffer

```javascript
const blob = new Blob([1, 2, 3, 4]);
const reader = new FileReader();
reader.onload = function (result) {
  console.log(result);
};
reader.readAsArrayBuffer(blob);
```

### Blob to File

```javascript
const file = new File([blob], `${fileName}`);
console.log(file);
```

### File to base64 / Blob to base64

```javascript
const reader = new FileReader();
reader.onload = function (result) {
  console.log(result);
};
reader.readAsDataURL(file);
// reader.readAsDataURL(blob);
```
