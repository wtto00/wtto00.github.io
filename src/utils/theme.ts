export type ColorScheme = 'Dark' | 'Light';

export function setGiscusTheme() {
  const iframe = document.querySelector<HTMLIFrameElement>('iframe.giscus-frame');
  if (!iframe) return;
  if (iframe.classList.contains('giscus-frame--loading')) return;
  iframe.contentWindow?.postMessage(
    { giscus: { setConfig: { theme: isDark() ? 'dark' : 'light' } } },
    'https://giscus.app',
  );
}

/**
 * 获取当前主题设置
 * 默认 Dark
 */
export function getLocalTheme(): ColorScheme {
  const localColorScheme = localStorage.getItem('colorScheme');
  if (localColorScheme !== 'Light') return 'Dark';
  return 'Light';
}

/**
 * Layout中使用
 */
export function initTheme() {
  if (getLocalTheme() === 'Dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
    setGiscusTheme();
  }
  document
    .querySelector("meta[name='theme-color']")
    ?.setAttribute('content', getComputedStyle(document.body).backgroundColor);
}

/**
 * 切换主题色，扩散渐变动画
 *
 * @param event 点击事件
 */
export function toggleTheme(event?: MouseEvent) {
  const willDark = !isDark();
  localStorage.setItem('colorScheme', willDark ? 'Dark' : 'Light');
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

  const endRadius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
  void transition.ready.then(() => {
    const clipPath = [`circle(0px at ${x}px ${y}px)`, `circle(${endRadius}px at ${x}px ${y}px)`];
    document.documentElement.animate(
      {
        clipPath: willDark ? clipPath : [...clipPath].reverse(),
      },
      {
        duration: 500,
        easing: 'ease-in',
        pseudoElement: willDark ? '::view-transition-new(root)' : '::view-transition-old(root)',
      },
    );
  });
}

/**
 * 切换主题色，html标签切换dark类
 */
function toggleDark() {
  document.documentElement.classList.toggle('dark');
  setGiscusTheme();
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
  return document.documentElement.classList.contains('dark');
}
