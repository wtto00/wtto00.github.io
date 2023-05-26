# clip-path 和 drop-shadow 生成自定义图形、阴影

当使用 `clip-path` 时，会导致 `box-shadow` 无效

[CodePen](https://codepen.io/wtto00/pen/NWOJVbe?editors=1100)

```html
<style>
  .btn-wrap {
    margin: auto;
    filter: drop-shadow(2px 4px 3px rgba(50, 50, 0, 0.5));
  }

  .btn {
    content: "";
    width: 200px;
    height: 64px;
    line-height: 64px;
    text-align: center;
    background: linear-gradient(#f5e5bf, #fbe8c8, #f5e5bf);
    color: #be9451;
    font-size: 24px;
    clip-path: polygon(10% 0%, 90% 0%, 100% 50%, 90% 100%, 10% 100%, 0 50%);
    // box-shadow: inset 0px 0px 1px 1px #fff;
  }
</style>

<div class="btn-wrap">
  <div class="btn">领取红包</div>
</div>
```

```html
<style>
  .content-wrap {
    margin-top: 12px;
    filter: drop-shadow(0px 10px 16px rgb(222, 141, 141));
  }

  .content {
    width: 400px;
    height: 100px;
    background-color: red;
    border-radius: 16px 16px 0 0;
    clip-path: ellipse(820px 820px at 50% calc(100% - 820px));
    padding: 12px 0 16px;
  }
</style>

<div class="content-wrap">
  <div class="content">clip-path</div>
</div>
```
