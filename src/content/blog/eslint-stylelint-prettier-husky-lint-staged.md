---
pubDatetime: 2021-11-25T10:13:13.000Z
title: Eslint+Stylelint+Prettier+Husky+lint-staged项目规范
postSlug: eslint-stylelint-prettier-husky-lint-staged
featured: false
draft: false
labels:
  - Eslint
description: Eslint+Stylelint+Prettier+Husky+lint-staged项目规范
issue_number: 26
updateTime: 2023-12-21T16:14:55.687Z
---

## **Eslint**

[ESLint 官方文档](https://cn.eslint.org/docs/user-guide/configuring)

```bash
# 安装依赖
pnpm add eslint -D

# eslint 初始化
npx eslint --init

# 添加执行脚本 文件后缀名根据需要修改
npm pkg set scripts.lint="eslint --ignore-path .gitignore --fix --color ./**/*.{js,jsx,ts,tsx}"
# npm set-script lint "eslint --ignore-path .gitignore --fix --color ./**/*.{js,jsx,ts,tsx}"
```

## **Stylelint [可选]**

此规范一般不用，`prettier` 可格式化 style 文件
[stylelint 官方文档](https://stylelint.io/user-guide/get-started)

```shell
# 安装依赖
pnpm add stylelint stylelint-config-recommended -D

# 如果使用less
pnpm add stylelint-less stylelint-config-recommended-less -D
# 如果使用scss
pnpm add stylelint-config-recommended-scss -D

# 添加执行脚本 文件后缀名根据需要修改
npm pkg set scripts.style="stylelint --fix --color ./**/*.{css,less}"
# npm set-script style "stylelint --fix --color ./**/*.{css,less}"
```

配置 `stylelint.config.js`

```javascript
module.exports = {
  // stylelint-config-recommended | stylelint-config-recommended-less | stylelint-config-recommended-scss
  extends: ['stylelint-config-recommended-less'],
  // customSyntax: postcss-less | postcss-sass
  customSyntax: 'postcss-less',
  rules: {},
};
```

## **Prettier**

[Prettier 官方文档](https://prettier.io/docs/en/options.html)

```shell
# 安装依赖
pnpm add prettier -D

# 添加执行脚本
npm pkg set scripts.format="prettier . --write --ignore-unknown"
# npm set-script format "prettier . --write --ignore-unknown"
```

配置 `.prettierrc`

```json
{
  "printWidth": 120,
  "singleQuote": true,
  "trailingComma": "all",
  "arrowParens": "always"
}
```

## **lint-staged**

[lint-staged 官方文档](https://github.com/okonet/lint-staged)

```shell
# 安装依赖
pnpm add lint-staged -D
```

配置 `package.json`

```json
{
  "lint-staged": {
    "*": ["prettier --write --ignore-unknown"],
    "*.{js,mjs,jsx,ts,mts,tsx}": ["eslint --color --fix"],
    "*.{ts,mts,tsx}": ["tsc --noEmit --pretty"]
  }
}
```

关于 tsc 的校验，问题可参见 <https://github.yanhaixiang.com/linter-tutorial/practice/lint-staged_tsc.html>

```shell
npm pkg set scripts.tscheck="vue-tsc --noEmit --pretty -p ./tsconfig.json"

// .lintstagedrc.cjs
module.exports = {
  '*': ['prettier --write --ignore-unknown'],
  '*.{js,mjs,jsx,ts,mts,tsx,vue}': ['eslint --color --fix'],
  '*.{ts,mts,tsx,vue}': [() => 'npm run tscheck'],
};
```

> 使用 VS Code 的 Git GUI 进行 commit 操作，错误信息不管是在输出中查看还是在结果文件中查看，都会出现乱码。是因为 eslint 的--color 参数以及 tsc 的--pretty 参数，会使输出结果包含有 shell 的字体颜色，这些颜色在输出中以及结果文件中不被识别。可以去掉这里的这两个参数来解决这个问题。

## **Husky**

[Husky 官方文档](https://github.com/typicode/husky)

```shell
# 安装依赖
pnpm add husky -D

# 添加初始化脚本
npm pkg set scripts.prepare="husky install && husky set .husky/pre-commit \"npx lint-staged\""
# npm set-script prepare "husky install && husky set .husky/pre-commit \"npx lint-staged\""

# 初始化
pnpm prepare

# 执行Git
git add .
git commit -am 'init'
```
