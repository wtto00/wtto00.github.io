/**
 * 修改文章时，commit提交的时候，自动更改文章的updateTime字段
 */

import { writeFileSync, existsSync } from 'node:fs';
import { extname } from 'node:path';
import matter from 'gray-matter';

const { read, stringify } = matter;

const files = process.argv.slice(2);

for (const file of files) {
  if (!file) {
    console.error(`未知的文件 ${file}`);
    continue;
  }

  if (extname(file).toLocaleLowerCase() !== '.md') {
    console.warn(`文件 ${file} 非markdown文件`);
    continue;
  }

  if (!existsSync(file)) {
    console.error(`文件 ${file} 不存在`);
    continue;
  }

  const { content, data } = read(file);

  if (data.title && data.pubDatetime) {
    data.updateTime = new Date();

    writeFileSync(file, stringify({ content }, data));
  }
}
