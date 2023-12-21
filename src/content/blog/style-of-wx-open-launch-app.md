---
pubDatetime: 2021-01-22T03:47:00.000Z
title: 微信 H5 开放标签 <wx-open-launch-app> 打开 APP，打开小程序，样式问题
postSlug: style-of-wx-open-launch-app
featured: false
draft: false
labels:
  - 微信
description: 微信 H5 开放标签 <wx-open-launch-app> 打开 APP，打开小程序，样式问题
issue_number: 5
updateTime: 2023-12-21T16:14:55.705Z
---

官当文档 <https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/Wechat_Open_Tag.html>

样式的问题参考 <https://developers.weixin.qq.com/community/develop/article/doc/0006e4bdccc9d83f8fba292a45b813>

下面是使用 `Vue3` 封装的组件

```jsx
// WxOpenLaunchApp.jsx
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    id: { type: String, required: true },
    extinfo: { type: String, required: true },
    height: { type: Number, required: true },
  },
  mounted() {
    const launchAppBtn = document.getElementById(this.id);
    launchAppBtn.addEventListener('launch', (e) => {
      console.log('success', e);
    });
    launchAppBtn.addEventListener('error', (e) => {
      this.$emit('fail', e);
      console.log('fail', e);
    });
    launchAppBtn.addEventListener('ready', (e) => {
      console.log('ready', e);
    });
  },
  render() {
    return (
      <div style={{ position: 'relative' }}>
        {this.$slots.default()}
        <div
          onClick={(e) => {
            // 非微信浏览器触发
            this.$emit('fail', e);
            console.log('fail', e);
          }}
        >
          <wx-open-launch-app
            id={this.id}
            style="position:absolute;top:0;left:0;right:0;bottom:0;"
            extinfo={this.extinfo}
            appid="appid"
          >
            <script type="text/wxtag-template">
              <div style={{ width: '100%', height: `${this.height}px` }}></div>
            </script>
          </wx-open-launch-app>
        </div>
      </div>
    );
  },
});
```

```vue
// WxOpenLaunchApp.vue
<template>
  <div class="wx-open-wrap" style="position: relative;">
    <slot />
    <div @click="fail">
      <div v-is="'wx-open-launch-app'" class="wx-open-app-tag" :id="id" :extinfo="extinfo" :appid="toAppId">
        <div v-is="'script'" type="text/wxtag-template">
          <div :style="'width: 100%; height: ' + height + 'px;'"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineEmit, defineProps, onMounted } from 'vue';
import { toAppId } from '@/config';

const props = defineProps({
  id: { type: String, required: true },
  extinfo: { type: String, required: true },
  height: { type: Number, required: true },
});
const emits = defineEmit(['fail']);

onMounted(() => {
  const launchAppBtn = document.getElementById(props.id);
  launchAppBtn.addEventListener('launch', (e) => {
    console.log('success', e);
  });
  launchAppBtn.addEventListener('error', (e) => {
    emits('fail', e);
    console.log('fail', e);
  });
  launchAppBtn.addEventListener('ready', (e) => {
    console.log('ready', e);
  });
});

const fail = (e) => {
  // 非微信浏览器触发
  emits('fail', e);
  console.log('fail', e);
};
</script>

<style lang="less" scoped>
.wx-open-app-tag {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>
```
