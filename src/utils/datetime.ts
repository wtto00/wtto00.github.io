import { LOCALE } from '@/config';

/**
 * 获取格式化的日期
 * @param datetime markdown上的日期字段
 * @returns 2023年12月26日
 */
export function getLocalDate(datetime: string | Date) {
  return (typeof datetime === 'string' ? new Date(datetime) : datetime).toLocaleDateString(LOCALE, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * 获取格式化的时间
 * @param datetime markdown上的日期字段
 * @returns 15:06
 */
export function getLocalTime(datetime: string | Date) {
  return (typeof datetime === 'string' ? new Date(datetime) : datetime).toLocaleTimeString(LOCALE, {
    hour: '2-digit',
    minute: '2-digit',
  });
}
