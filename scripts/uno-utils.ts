import type { Theme } from '@unocss/preset-uno';

type Colors = Exclude<Theme['colors'], undefined>;

/**
 * 给颜色变量组成的rgb添加透明度
 * @param color rgb(var(--uno-color-base))
 * @param opacity 20
 */
export function colorAddOpacity(color?: Colors[string], opacity: number = 1) {
  if (typeof color !== 'string') return '';
  return color.slice(0, -1) + ` / ${opacity}${opacity > 1 ? '%' : ''}` + color.slice(-1);
}
