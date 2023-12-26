---
postSlug: ios-open-app-store-in-wechat
title: H5在iOS微信上打开App Store
featured: false
draft: false
labels:
  - 微信
description: >-
  那么就`访问iOS App Store链接直接打开App
  Store`这一个功能，能不能做个判断，当用户从公众号菜单，以及二维码扫描进入的页面时，则直接访问iOS App
  Store链接，让微信提示用户是否前往App Store；当用户直接点击url链接进入的页面，则弹出遮罩，提示用户前往浏览器打开。
pubDatetime: 2023-12-26T07:06:58.781Z
updateTime: 2023-12-26T07:06:58.781Z
---

微信在2021年底更改了外部链接的策略，直接点击链接 url 进入的页面，不能调用微信提供的 API，例如：分享给朋友，分享到朋友圈，以及包括访问 iOS App Store 链接直接打开 App Store 的功能。但是从公众号菜单，以及二维码扫描进入的页面，上述功能都能正常使用。

那么就 `访问iOS App Store链接直接打开App Store` 这一个功能，能不能做个判断，当用户从公众号菜单，以及二维码扫描进入的页面时，则直接访问 iOS App Store 链接，让微信提示用户是否前往 App Store；当用户直接点击 url 链接进入的页面，则弹出遮罩，提示用户前往浏览器打开。

## 按钮元素上添加 tabindex，使其可聚焦

```html
<div id="ios-download-btn" class="dl-btn" tabindex="-1">立即下载</div>
```

## 绑定点击事件以及失焦事件

用户点击按钮的时候，会使按钮置为聚焦状态。
如果微信可以弹起 `是否打开App Store确认弹窗`，则会把按钮置为失焦状态，触发按钮的失焦 blur 事件。
如果微信不可以弹起 `是否打开App Store确认弹窗`，则不会触发按钮的失焦 blur 事件。

```js
const IOS_APP_STORE_URL = 'itms-apps://apps.apple.com/cn/app/xxx/idxxx';
const ua = navigator.userAgent.toLowerCase();
const isIos = /iPad|iPhone|iPod/gi.test(ua);
const isWeixin = /MicroMessenger/gi.test(ua);

if (isIos) {
  // ios
  /**
   * 0: 初始状态
   * 1: 临时标记已聚焦
   * -1: 确定可以弹出或打开App Store
   * -2: 确定不可以弹出或打开App Store
   */
  let canGoAppStore = 0;
  let clock = 0;

  const iosDownloadBtn = document.querySelector < HTMLDivElement > '#ios-download-btn';
  if (iosDownloadBtn) {
    // 务必确保元素挂载后执行
    iosDownloadBtn.addEventListener('click', () => {
      if (!isWeixin) {
        // 不是微信浏览器的话，直接前往App Store链接地址
        window.location.href = IOS_APP_STORE_URL;
        return;
      }
      switch (canGoAppStore) {
        case 0:
          canGoAppStore = 1;
          window.location.href = IOS_APP_STORE_URL;
          clock = window.setTimeout(() => {
            canGoAppStore = -2;
            showMaskTip();
          }, 100);
          break;
        case -1:
          window.location.href = IOS_APP_STORE_URL;
          break;
        case -2:
          showMaskTip();
          break;
        default:
          break;
      }
    });
    // 微信弹起是否打开App Store确认弹窗的时候，会致使按钮失焦
    iosDownloadBtn.addEventListener('blur', () => {
      if (canGoAppStore === 1) {
        canGoAppStore = -1;
        clearTimeout(clock);
      }
    });
  }
}

/**
 * 弹出遮罩提示用户前往浏览器打开
 */
function showMaskTip() {
  // ...
}
```
