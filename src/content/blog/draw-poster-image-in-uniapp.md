---
pubDatetime: 2021-12-15T10:05:45.000Z
title: uniapp利用canvas在小程序上面生成图片
postSlug: draw-poster-image-in-uniapp
featured: false
draft: false
labels:
  - uniapp
  - canvas
description: uniapp利用canvas在小程序上面生成图片
updateTime: 2023-12-31T17:56:35.716Z
---

## 画布准备

```js
/**
 * 开始画图
 * @param {object} canvas 画布对象
 * @param {object} data 渲染需要用的的数据
 * @param {function} callback 完成后的回调
 */
function startDraw(canvas, data, callback) {
  // 定义画布大小
  canvas.width = 1080;
  canvas.height = 1826;

  const ctx = canvas.getContext('2d');
  // 清空画布
  ctx.clearRect(0, 0, 1080, 1826);

  // 根据数据 `data` 开始画图
}
```

## 画图片

```js
/**
 * 画图片
 * @param {object} canvas 画布对象
 * @param {string} src 图片地址
 * @param {number} x 画图开始位置x
 * @param {number} y 画图开始位置y
 * @param {number} width 画图宽度
 * @param {number} height 画图高度
 * @param {number} radius 矩形圆角弧度
 * @param {string} fit 图片自适应
 * @param {funciton} callback 回调函数
 */
function drawImage(canvas, src, x, y, width, height, radius, fit, callback) {
  const ctx = canvas.getContext('2d');
  ctx.save();
  ctx.globalCompositeOperation = 'source-over';
  if (radius > 0) {
    ctx.beginPath();
    drawRoundedRect(ctx, x, y, width, height, radius);
    ctx.clip();
    ctx.closePath();
  }
  const image = canvas.createImage();
  image.onload = (res) => {
    const imgWidth = image.width;
    const imgHeight = image.height;
    let startX = 0;
    let startY = 0;
    let imgW = imgWidth;
    let imgH = imgHeight;
    if (fit === 'cover') {
      // 实现object-fit:cover图片裁切效果
      if (imgHeight / imgWidth > height / width) {
        imgH = (height * imgWidth) / width;
        startY = (imgHeight - imgH) / 2;
      } else {
        imgW = (width * imgHeight) / height;
        startX = (imgWidth - imgW) / 2;
      }
    } else if (fit === 'contain') {
      if (imgHeight / imgWidth > height / width) {
        imgH = (height * imgWidth) / width;
      }
    }
    ctx.drawImage(image, startX, startY, imgW, imgH, x, y, width, height);
    ctx.restore();
    if (callback) callback(image);
  };
  image.onerror = (err) => {
    showError(err.message || '加载图片失败: ' + src);
  };
  image.src = src || '';
}
```

## 画圆角矩形

```js
/**
 * 画圆角矩形
 * @param {object} ctx 画笔
 * @param {number} x 画图开始位置x
 * @param {number} y 画图开始位置y
 * @param {number} width 画图宽度
 * @param {number} height 画图高度
 * @param {number|array} _radius 矩形圆角弧度
 */
function drawRoundedRect(ctx, x, y, width, height, _radius = 0) {
  let radius = [];
  if (Array.isArray(radius)) {
    radius = _radius;
  } else {
    radius = [_radius, _radius, _radius, _radius];
  }
  const [lt, rt, rb, lb] = radius;
  ctx.moveTo(x + lt, y);
  ctx.lineTo(x + width - lt, y);
  // 右上角圆角
  ctx.arc(x + width - rt, y + rt, rt, 1.5 * Math.PI, 2 * Math.PI);
  ctx.lineTo(x + width, y + height - rb);
  // 右下角圆角
  ctx.arc(x + width - rb, y + height - rb, rb, 0, 0.5 * Math.PI);
  ctx.lineTo(x + lb, y + height);
  // 左下角圆角
  ctx.arc(x + lb, y + height - lb, lb, 0.5 * Math.PI, 1 * Math.PI);
  ctx.lineTo(x, y + radius);
  // 左上角圆角
  ctx.arc(x + lt, y + lt, lt, 1 * Math.PI, 1.5 * Math.PI);
}
```

## 画文本

需要支持超出最大宽度后，显示省略号。

### 根据显示宽度拆分文本

```js
/**
 * 根据宽度计算要显示文字
 * @param {object} ctx 画笔
 * @param {string} text 原始文字
 * @param {number} fontSize 字体大小
 * @param {boolean} bold 是否加粗
 * @param {number} width 文字的容器宽度
 * @param {number} maxLines 文字最多显示几行
 */
function splitText(ctx, text = '', fontSize, bold, width, maxLines) {
  const textArr = [];
  let remainText = text;
  ctx.font = `normal ${bold ? 'bold' : 'normal'} ${fontSize}px sans-serif`;

  while (textArr.length < maxLines && remainText) {
    // while (textArr.length < maxLines && ctx.measureText(remainText).width > width) {
    // 估算一行能容纳多少文字
    let assumTextNum = Math.floor(width / fontSize);
    // 计算假定文字的宽度
    let { width: assumTextWidth } = ctx.measureText(remainText.substr(0, assumTextNum));

    if (assumTextWidth > width) {
      while (assumTextWidth > width) {
        assumTextWidth = ctx.measureText(remainText.substr(0, --assumTextNum)).width;
      }
    } else {
      while (assumTextWidth <= width && assumTextNum <= remainText.length) {
        assumTextWidth = ctx.measureText(remainText.substr(0, ++assumTextNum)).width;
      }
      assumTextWidth = ctx.measureText(remainText.substr(0, --assumTextNum)).width;
    }
    let thisText = remainText.substr(0, assumTextNum);
    remainText = remainText.substr(assumTextNum);
    if (textArr.length === maxLines - 1 && remainText.length > 0) {
      thisText = thisText.substring(0, thisText.length - 2) + '...';
    }
    textArr.push({
      text: thisText,
      width: assumTextWidth,
    });
  }
  return textArr;
}
```

### 渲染文本

```js
/**
 * 渲染显示文字
 * @param {object} ctx 画笔
 * @param {number} x 画图开始位置x
 * @param {number} y 画图开始位置y
 * @param {number} width 文字容器宽度
 * @param {string} text 原始文字
 * @param {object} style 文字样式
 * @param {number} maxLines 文字最多显示几行
 */
function renderText(ctx, x, y, width, text, style, maxLines) {
  if (!text) return;
  const { fontSize, lineHeight, color, bold } = style;
  const textArr = splitText(ctx, text, fontSize, bold, width, maxLines);
  textArr.forEach((item, index) => {
    ctx.fillStyle = color;
    ctx.textBaseline = 'top';
    ctx.fillText(item.text, x, y + index * lineHeight + (lineHeight - fontSize) / 2);
  });
}
```

## 导出画布

```js
/**
 * 导出画布到本地临时文件
 * @param {object} canvas 画布
 */
function saveCanvas(canvas, callback) {
  uni.canvasToTempFilePath({
    canvas,
    success: (res) => {
      if (res.errMsg === 'canvasToTempFilePath:ok') {
        if (callback) callback(res.tempFilePath);
      } else {
        showError(res.errMsg);
      }
    },
  });
}
```

## 保存临时文件到相册

```js
/**
 * 保存文件到相册
 * @param {string} tempImgPath 临时文件路径
 */
function savePosterFile(tempImgPath) {
  if (!tempImgPath) return;

  uni.saveImageToPhotosAlbum({
    filePath: tempImgPath,
    success: (res) => {
      uni.showToast({
        title: '保存成功',
        icon: 'success',
      });
    },
    fail: (res) => {
      if (res.errMsg === 'saveImageToPhotosAlbum:fail auth deny') {
        uni.showModal({
          title: '提示',
          content: '需要您授权保存相册',
          confirmText: '去授权',
          success: (res) => {
            if (res.cancel) return;
            uni.openSetting({
              success: (auth) => {
                if (auth.authSetting['scope.writePhotosAlbum']) {
                  uni.showModal({
                    title: '提示',
                    content: '获取权限成功,再次点击图片即可保存',
                    showCancel: false,
                  });
                } else {
                  uni.showModal({
                    title: '提示',
                    content: '获取权限失败，将无法保存到相册哦~',
                    showCancel: false,
                  });
                }
              },
            });
          },
        });
      } else if (res.errMsg === 'saveImageToPhotosAlbum:fail cancel') {
        uni.showToast({
          title: '已取消',
          icon: 'none',
        });
      } else {
        uni.showToast({
          title: '保存相册失败',
        });
      }
    },
  });
}
```

## 可能遇到的问题

### 提示 `Tainted canvases may not be exported.`

原因是画布跨域加载了非本域名的图片，导致画布被污染，无法导出为图片。解决办法添加 `crossOrigin` 属性

```javascript
image.crossOrigin = 'anonymous';
```

### 图片加载的时候报错 `CORS` 跨域错误

如果服务端没有设置防盗链的话以及其他限制的话，这种情况很可能是浏览器缓存导致的，可以在图片链接后面加上随机数。

```javascript
image.src = `${url}?${Math.random()}`;
```

> 参考 <https://segmentfault.com/q/1010000008648867>
