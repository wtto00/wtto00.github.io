[示例 CodePen](https://codepen.io/wtto00/pen/XWydaZx)

实现功能：

1. `暗色模式`、`亮色模式`、`跟随系统`，三种主题设置正常工作
2. 主题设置后永久保存在本地，下次进入后，读取保存的设置
3. 切换主题时，加载扩散渐变动画，如下图所示：

   ![动画](https://github.com/wtto00/Blog/assets/30424139/234facf8-8657-4424-81fa-9ed29a96afbc)

```ts
/** 三种主题设置 */
type ColorScheme = "OS" | "Dark" | "Light";
/**
 * document.startViewTransition 新特性，ts暂不包括
 * @link https://developer.mozilla.org/en-US/docs/Web/API/Document/startViewTransition
 */
interface ViewTransition {
  ready: Promise<void>;
}
interface Document {
  startViewTransition: (callback: () => void) => ViewTransition;
}

let mediaQueryList: MediaQueryList;

/**
 * 判断主题设置是否合法
 */
function isColorScheme(color: string): color is ColorScheme {
  return color === "OS" || color === "Dark" || color === "Light";
}

/**
 * 初始化
 */
function initTheme() {
  const localColorScheme = localStorage.getItem("colorScheme") ?? "";
  const colorScheme = isColorScheme(localColorScheme) ? localColorScheme : "OS";
  mediaQueryList = window.matchMedia("(prefers-color-scheme: dark)");
  setColorScheme(colorScheme);
}

/**
 * 设置主题模式
 * 界面的点击事件执行此方法
 */
function setColorScheme(scheme: ColorScheme, event?: MouseEvent) {
  localStorage.setItem("colorScheme", scheme);
  const currentDark = isDark();
  switch (scheme) {
    case "OS":
      // 跟随系统
      const systemDark = systemIsDark();
      // 当前主题色与系统主题色不一致时，切换主题
      if (currentDark !== systemDark) {
        toggleTheme(event);
      }
      // 监听系统主题色
      listenSystemTheme();
      break;
    case "Dark":
      // 暗色模式
      if (!currentDark) {
        toggleTheme(event);
      }
      unListenSystemTheme();
      break;
    case "Light":
      // 亮色模式
      if (currentDark) {
        toggleTheme(event);
      }
      unListenSystemTheme();
      break;
  }
}

/**
 * 切换主题色，扩散渐变动画
 *
 * @param event 点击事件
 */
function toggleTheme(event?: MouseEvent) {
  const willDark = !isDark();
  // 浏览器新特性不支持 或者 开启了动画减弱
  if (!document.startViewTransition || isReducedMotion()) {
    toggleDark();
    return;
  }

  const transition = document.startViewTransition(() => {
    toggleDark();
  });

  // 传入点击事件，从点击处开始扩散。否则，从右上角开始扩散
  const x = event?.clientX ?? window.innerWidth;
  const y = event?.clientY ?? 0;

  const endRadius = Math.hypot(
    Math.max(x, innerWidth - x),
    Math.max(y, innerHeight - y)
  );
  void transition.ready.then(() => {
    const clipPath = [
      `circle(0px at ${x}px ${y}px)`,
      `circle(${endRadius}px at ${x}px ${y}px)`,
    ];
    document.documentElement.animate(
      {
        clipPath: willDark ? clipPath : [...clipPath].reverse(),
      },
      {
        duration: 500,
        easing: "ease-in",
        pseudoElement: willDark
          ? "::view-transition-new(root)"
          : "::view-transition-old(root)",
      }
    );
  });
}

/**
 * 切换主题色，html标签切换dark类
 */
function toggleDark() {
  document.documentElement.classList.toggle("dark");
}

/**
 * 检测用户的系统是否被开启了动画减弱功能
 * @link https://developer.mozilla.org/zh-CN/docs/Web/CSS/@media/prefers-reduced-motion
 */
function isReducedMotion() {
  return window.matchMedia(`(prefers-reduced-motion: reduce)`).matches === true;
}

/**
 * 当前主题色是否是暗色
 */
function isDark() {
  return document.documentElement.classList.contains("dark");
}

/**
 * 当前系统的主题色是否是暗色/深色/夜间
 */
function systemIsDark() {
  return mediaQueryList.matches;
}

/**
 * 监听系统主题色的改变
 */
function listenSystemTheme() {
  if (mediaQueryList.addListener) {
    // 兼容旧版浏览器，将来会被废弃
    mediaQueryList.addListener(toggleTheme);
  } else {
    // 新版浏览器
    mediaQueryList.addEventListener("change", toggleTheme);
  }
}

/**
 * 取消监听系统主题色的改变
 */
function unListenSystemTheme() {
  if (mediaQueryList.removeListener) {
    // 兼容旧版浏览器，将来会被废弃
    mediaQueryList.removeListener(toggleTheme);
  } else {
    // 新版浏览器
    mediaQueryList.removeEventListener("change", toggleTheme);
  }
}
```

别忘记了还有 CSS

```css
/**
 Animated Theme Toggle
 */
::view-transition-old(root),
::view-transition-new(root) {
  animation: none;
  mix-blend-mode: normal;
}

.dark::view-transition-old(root) {
  z-index: 1;
}
.dark::view-transition-new(root) {
  z-index: 999;
}

::view-transition-old(root) {
  z-index: 999;
}
::view-transition-new(root) {
  z-index: 1;
}
```
