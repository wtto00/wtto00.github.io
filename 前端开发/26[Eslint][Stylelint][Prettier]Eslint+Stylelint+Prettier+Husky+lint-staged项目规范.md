---
issue_number: 26
title: Eslint+Stylelint+Prettier+Husky+lint-staged项目规范
---

### **1. 创建项目**

[Vite 官方文档](https://cn.vitejs.dev/guide/#scaffolding-your-first-vite-project)

```shell
yarn create vite
```

### **2. Eslint**

[ESLint 官方文档](https://cn.eslint.org/docs/user-guide/configuring)

```bash
# 安装依赖
yarn add eslint -D

# eslint 初始化
npx eslint --init

# 添加执行脚本 文件后缀名根据需要修改
npm set-script lint "eslint --fix --color src/**/*.{js,jsx}"
```

### **3. Stylelint**

[stylelint 官方文档](https://stylelint.io/user-guide/get-started)

```shell
# 安装依赖
yarn add stylelint stylelint-config-recommended -D

# 如果使用less
yarn add stylelint-less stylelint-config-recommended-less -D
# 如果使用scss
yarn add stylelint-config-recommended-scss -D

# 添加执行脚本 文件后缀名根据需要修改
npm set-script style "stylelint --fix --color src/**/*.{css,less}"
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

### **4. Prettier**

[Prettier 官方文档](https://prettier.io/docs/en/options.html)

```shell
# 安装依赖
yarn add prettier -D

# 添加执行脚本
npm set-script format "prettier --write ."
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

### **5. lint-staged**

[lint-staged 官方文档](https://github.com/okonet/lint-staged)

```shell
# 安装依赖
yarn add lint-staged -D
```

配置`package.json`

```json
{
  "lint-staged": {
    "*.{js,jsx}": ["yarn format", "yarn lint", "git add"],
    "*.{css,less}": ["yarn format", "yarn style", "git add"]
  }
}
```

### **6.Husky**

[Husky 官方文档](https://github.com/typicode/husky)

```shell
# 安装依赖
yarn add husky -D

# 添加初始化脚本
npm set-script prepare "husky install"

# 初始化
yarn prepare

# 添加Hook
npx husky set .husky/pre-commit "npx lint-staged"

# 执行Git
git add .
git commit -am 'init'
```
