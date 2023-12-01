---
author: wtto00
pubDatetime: 2022-01-27T13:31:33.000Z
title: 调用微信JSSDK上传图片
postSlug: upload-image-by-wechat-jssdk
featured: false
draft: false
tags:
  - 微信
description: 调用微信JSSDK上传图片
issue_number: 29
---

```javascript
window.wx.chooseImage({
  count: props.max - images.length, // 默认9
  sizeType: ['original', 'compressed'],
  sourceType: ['album', 'camera'],
  success: (res) => {
    const { localIds } = res;
    showLoading('读取文件...');
    localIds.forEach((localId) => {
      window.wx.getLocalImgData({
        localId: localId.toString(),
        success: (ImgDataRes) => {
          const { localData } = ImgDataRes;
          let imageBase64 = '';
          if (localData.indexOf('data:image') === 0) {
            // 苹果的直接赋值，默认生成'data:image/jpeg;base64,'的头部拼接
            imageBase64 = localData;
          } else {
            // 此处是安卓中的唯一得坑！在拼接前需要对localData进行换行符的全局替换
            // 此时一个正常的base64图片路径就完美生成赋值到img的src中了
            imageBase64 = `data:image/jpeg;base64,${localData.replace(/\n/g, '')}`;
          }
          const arr = imageBase64.split(',');
          const [, mime] = arr[0].match(/:(.*?);/);
          const bstr = atob(arr[1]);
          let n = bstr.length;
          const u8arr = new Uint8Array(n);
          while (n > 0) {
            n -= 1;
            u8arr[n] = bstr.charCodeAt(n);
          }
          const blob = new Blob([u8arr], { type: mime });
          // Blob to File
          const file = new File([blob], `${new Date().getTime()}.jpg`);
          // 上传
          upload({ file });
        },
      });
    });
  },
  fail: () => {
    toast('选择图片失败');
  },
});
```
