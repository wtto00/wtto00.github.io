---
issue_number: 26
title: Eslint+Stylelint+Prettier+Husky+lint-staged项目规范
---

## **Eslint**

[ESLint 官方文档](https://cn.eslint.org/docs/user-guide/configuring)

```bash
# 安装依赖
pnpm add eslint -D

# eslint 初始化
npx eslint --init

# 添加执行脚本 文件后缀名根据需要修改
npm set-script lint "eslint --ignore-path .gitignore --fix --color ./**/*.{js,jsx,ts,tsx}"
```

## **Stylelint**

[stylelint 官方文档](https://stylelint.io/user-guide/get-started)

```shell
# 安装依赖
pnpm add stylelint stylelint-config-recommended -D

# 如果使用less
pnpm add stylelint-less stylelint-config-recommended-less -D
# 如果使用scss
pnpm add stylelint-config-recommended-scss -D

# 添加执行脚本 文件后缀名根据需要修改
npm set-script style "stylelint --fix --color ./**/*.{css,less}"
```

配置`stylelint.config.js`

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
npm set-script format "prettier . --write --ignore-unknown"
```

配置`.prettierrc`

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

配置`package.json`

```json
{
  "lint-staged": {
    "*": ["prettier --write --ignore-unknown"],
    "*.{js,mjs,jsx,ts,tsx}": ["eslint --color --fix"]
  }
}
```

## **Husky**

[Husky 官方文档](https://github.com/typicode/husky)

```shell
# 安装依赖
pnpm add husky -D

# 添加初始化脚本
npm set-script prepare "husky install && husky set .husky/pre-commit \"npx lint-staged\""

# 初始化
pnpm prepare

# 执行Git
git add .
git commit -am 'init'
```
