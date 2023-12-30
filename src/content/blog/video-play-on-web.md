---
pubDatetime: 2022-06-07T09:50:27.000Z
title: 浏览器视频播放方案
postSlug: video-play-on-web
featured: false
draft: false
labels:
  - Javascript
  - Video
description: '浏览器视频播放方案: m3u8/mp4/flv/http-flv/webrtc'
updateTime: 2023-12-30T17:48:17.374Z
---

## 解决方案

**各视频类型的协议：**
| 视频类型 | 视频协议 |
| :------: | :-------------------: |
| 点播 | m3u8/mp4/flv |
| 直播 | m3u8/http-flv/webrtc |
| 双向 | webrtc |

**各浏览器平台方案：**
| 浏览器 | 技术方案 | 协议 |
| :-------------------: | :-----------------------------: | :--------------------------: |
| IE11 及以上版本 | HTML5 Video + MSE<sup>[1]</sup> | http-mp4/http-flv |
| Chrome/Safari/Firefox | HTML5 Video + MSE | hls/http-flv/http-mp4/webrtc |
| IE11 以下版本 | Flash Player | rtmp/http-flv/hls |

**各协议优缺点：**
| 协议 | 传输方式 | 视频封装格式 | 延迟 | 数据分段 | h5 播放 |
| :------: | :------: | :----------: | :-----------: | :------: | :----------------------------------------------------: |
| http-flv | http 流 | flv | 低 (4-10 秒) | 连续流 | [flv.js](https://github.com/Bilibili/flv.js)(bilibili) |
| rtmp | tcp 流 | flv | 低 (1~5 秒) | 连续流 | [video.js](https://videojs.com/)<sup>[2]</sup> |
| hls | http 流 | m3u8+Ts 文件 | 高 (15-30 秒) | 切片文件 | [hls.js](https://github.com/video-dev/hls.js) |
|Dash|http|mp4,3gp,webm|高|切片文件|mp4 和 webm 可通过 video 标签直接播放|

**针对流媒体服务的方案：**
|平台|协议|
|:--:|:--:|
|Web 浏览器|HTTP-FLV、HLS|
|移动浏览器|HLS、FLV (需要考虑兼容性)|
|移动 Native or 小程序|RTMP、HTTP-FLV、HLS|

> [1] MSE(Media Source Extensions)
>
> 我们可以把 `<video>` 标签看做拥有解封装和解码功能的浏览器自带播放器。随着视频点播、直播等视频业务的发展，视频通过流媒体传输协议 (目前常用的有两种，MPEG-DASH 和 Apple 的 HLS) 从服务器端分发给客户端，媒体内容进一步包含在一层传输协议中，这样 `<video>` 就无法识别了。以 HLS 为例，将源文件内容分散地封装到了一个个 TS 文件中。
>
> 仅靠 `<video>` 标签无法识别这样的 TS 文件，那么就引入了 MSE 拓展来帮助浏览器识别并处理 TS 文件，将其变回原来可识别的媒体容器格式，这样 `<video>` 就可以识别并播放原来的文件了。那么支持 HTML5 的浏览器就相当于内置了一个能够解析流协议的播放器。

> [2] video.js
> video.js 播放 hls，需要用 [videojs-http-streaming](https://github.com/videojs/http-streaming) 拓展
> video.js 播放 http-flv，需要用 [videojs-flvjs](https://github.com/mister-ben/videojs-flvjs) 拓展
> video.js version&lt;6 的版本，自带 flash 拓展，可以播放 rtmp。
> video.js version>=6 的版本，需要用 [videojs-flash](github.com/videojs/videojs-flash)。
> 浏览器播放 rtmp 的前提是浏览器支持 flash 播放。
> 由于现在几乎所有浏览器都不在支持 flash，所以即使使用上述拓展，rtmp 已不再支持播放。可以单独下载安装 [Adobe Flash Player](https://www.flash.cn/)，可实现 rtmp 的播放。

> For FLV live stream playback，please consider [mpegts.js](https://github.com/xqq/mpegts.js) which is under active development。
> flv.js project will become rarely maintained
> 未来可以从 flv.js 转移到 mpegts.js，但是现在后者还未完善。

---

## 播放器

播放器只是外观皮肤以及功能的封装，播放相应的协议，还需要加载相应的库

- video.js
  [官网](https://videojs.com/)，开源，web 端
  自定义皮肤插件扩展字幕组件多语言
- 腾讯云 TCPlayer
  [文档](https://cloud.tencent.com/document/product/881/20205)，Web 端，iOS 端，Android 端，Flutter 端
- 阿里云 Aliplayer
  [文档](https://help.aliyun.com/document_detail/125548.htm)，Web 端，iOS 端，Android 端，Flutter 端
  移动端不支持 http-flv，PC 段支持

[其他开源播放器](https://juejin.cn/post/6844903438657028109)

---

## 视频转码

点播视频可以通过 [ffmpeg](http://ffmpeg.org/download.html) 转成 hls 或者其他类型
