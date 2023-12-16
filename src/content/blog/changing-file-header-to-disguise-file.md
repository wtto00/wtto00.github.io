---
author: wtto00
pubDatetime: 2022-06-28T18:08:15.000Z
title: 通过修改文件头来伪装文件
postSlug: changing-file-header-to-disguise-file
featured: false
draft: false
labels:
  - Javascript
description: 通过修改文件头来伪装文件
issue_number: 36
updateTime: 2023-12-16T15:25:39.912Z
---

## 获取文件真实类型

```javascript
import { fileTypeFromFile } from 'file-type';

console.log(await fileTypeFromFile('./source/0.ts'));

// { ext: 'mts', mime: 'video/mp2t' }
```

## 获取文件表面的类型

```javascript
import mime from 'mime';

console.log(mime.getType('./source/0.ts'));

// video/mp2t
```

## 获取文件的 Buffer

```javascript
import fs from 'fs';

const bytes = fs.readFileSync('./source/0.ts');

console.log(bytes);

// <Buffer 47 40 11 10 00 42 f0 25 00 01 c1 00 00 ff 01 ff 00 01 fc 80 14 48 12 01 06 46 46 6d 70 65 67 09 53 65 72 76 69 63 65 30 31 77 7c 43 ca ff ff ff ff ff ... 2931246 more bytes>
```

这里打印的 Buffer 可以看作是一个十六进制的数组

```javascript
console.log(bytes.at(0));
console.log(bytes[0]);
// 71
```

单个 Buffer 元素打印，看到的是十进制的值

## 修改文件头

这里把 ts 文件伪装成 png
[PNG 文件头格式解析](https://blog.csdn.net/u013943420/article/details/76855416)

```javascript
// png前缀
const prefix = [
  0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 0x00, 0x00, 0x00, 0x0d, 0x49, 0x48, 0x44, 0x52, 0x00, 0x00, 0x00,
  0x01, 0x00, 0x00, 0x00, 0x01, 0x08, 0x06, 0x00, 0x00, 0x00, 0x1f, 0x15, 0xc4, 0x89, 0x00, 0x00, 0x00, 0x01, 0x73,
  0x52, 0x47, 0x42, 0x00, 0xae, 0xce, 0x1c, 0xe9, 0x00, 0x00, 0x00, 0x04, 0x67, 0x41, 0x4d, 0x41, 0x00, 0x00, 0xb1,
  0x8f, 0x0b, 0xfc, 0x61, 0x05, 0x00, 0x00, 0x00, 0x09, 0x70, 0x48, 0x59, 0x73, 0x00, 0x00, 0x12, 0x74, 0x00, 0x00,
  0x12, 0x74, 0x01, 0xde, 0x66, 0x1f, 0x78, 0x00, 0x00, 0x00, 0x0d, 0x49, 0x44, 0x41, 0x54, 0x18, 0x57, 0x63, 0xf8,
  0xff, 0xff, 0xff, 0x7f, 0x00, 0x09, 0xfb, 0x03, 0xfd, 0x05, 0x43, 0x45, 0xca, 0x00, 0x00, 0x00, 0x00, 0x49, 0x45,
  0x4e, 0x44, 0xae, 0x42, 0x60, 0x82,
];
const prefixLen = prefix.length;
const buffer = Buffer.alloc(bytes.length + prefixLen);
prefix.forEach((b, i) => {
  buffer[i] = b;
});
bytes.forEach((b, i) => {
  buffer[prefixLen + i] = b;
});
```

## 保存 buffer 到新的伪装文件

```javascript
fs.writeFileSync('./target/0.png', buffer);

console.log(await fileTypeFromFile('./target/0.ts'));
// { ext: 'png', mime: 'image/png' }
console.log(mime.getType('./target/0.ts'));
// image/png
```

直接打开 `target/0.png`，可以作为图片打开，不报错。
直接更改后缀 `target/0.png` 为 `target/0.ts`，可以用视频播放器播放，不报错。

---

## 文件头

- image/png

  ```javascript
  const HEX = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];
  const DEC = [137, 80, 78, 71, 13, 10, 26, 10];
  ```

- video/mp2t

  ```javascript
  // Raw MPEG-2 transport stream (188-byte packets)
  const HEX = [0x47, ...[187], 0x47, ...[]];
  const DEC = [71, ...[187], 71, ...[]];

  // Blu-ray Disc Audio-Video (BDAV) MPEG-2 transport stream has 4-byte TP_extra_header before each 188-byte packet
  const HEX = [...[4], 0x47, ...[187], ...[4], 0x47, ...[]];
  const DEC = [..[4], 71, ...[187], ...[4], 71, ...[]];
  ```

> [利用文件头标志判断文件类型](https://blog.mythsman.com/post/5d301940976abc05b345469f/)
