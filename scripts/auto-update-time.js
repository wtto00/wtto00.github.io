/**
 * 修改文章时，commit提交的时候，自动更改文章的updateTime字段
 */

import { writeFileSync } from 'node:fs';
import { extname } from 'node:path';
import matter from 'gray-matter';

const { read, stringify } = matter;

const file = process.argv.slice(2)[0];

if (!file) {
  console.error('未知的文件参数');
  process.exit(-1);
}

if (extname(file).toLocaleLowerCase() !== '.md') {
  console.warn('文件参数非markdown文件');
  process.exit(0);
}

const { content, data } = read(file);

if (data.title && data.pubDatetime) {
  data.updateTime = new Date().toISOString();

  writeFileSync(file, stringify({ content }, data));
}
