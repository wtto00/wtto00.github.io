---
pubDatetime: 2021-11-25T10:13:13.000Z
title: Eslint+Stylelint+Prettier+Husky+lint-staged项目规范
postSlug: eslint-stylelint-prettier-husky-lint-staged
featured: false
draft: false
labels:
  - eslint
description: 'EditorConfig,Eslint,Stylelint,Prettier,Husky,lint-staged,'
updateTime: 2023-12-31T17:56:35.723Z
---

## EditorConfig

[EditorConfig 官方文档](https://editorconfig.org/)

配置 `.editorconfig`

```yml
[*]
indent_style = space
indent_size = 2
end_of_line = lf
trim_trailing_whitespace = true
insert_final_newline = true
max_line_length = 120
```

## Eslint

[ESLint 官方文档](https://cn.eslint.org/docs/user-guide/configuring)

```bash
# 安装依赖
pnpm add eslint -D

# eslint 初始化
npx eslint --init

# 添加执行脚本 文件后缀名根据需要修改
npm pkg set scripts.lint="eslint --cache --fix --color --ext .js,.jsx,.ts,.tsx ."
```

如果使用了其他框架，可参见框架推荐的 `eslint` 插件包。

比如：

- [eslint-plugin-vue](https://eslint.vuejs.org/)
- [@typescript-eslint/eslint-plugin](https://typescript-eslint.io/getting-started/)
  必须添加 `@typescript-eslint/parser`
- [@unocss/eslint-config](https://unocss.dev/integrations/eslint)
- [eslint-plugin-astro](https://github.com/ota-meshi/eslint-plugin-astro)
- [eslint-plugin-simple-import-sort](https://github.com/lydell/eslint-plugin-simple-import-sort)
- [eslint-plugin-solid](https://github.com/solidjs-community/eslint-plugin-solid#readme)
- ...

## Stylelint (可选)

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

## Prettier

[Prettier 官方文档](https://prettier.io/docs/en/options.html)

```shell
# 安装依赖
pnpm add prettier -D

# 添加执行脚本
npm pkg set scripts.format="prettier . --write --ignore-unknown"
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

## lint-staged

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
    "*.{js,mjs,jsx,ts,mts,tsx}": ["eslint --cache --fix"],
    "*.{ts,mts,tsx}": ["tsc --noEmit --pretty"]
  }
}
```

关于 tsc 的校验，问题可参见 <https://github.yanhaixiang.com/linter-tutorial/practice/lint-staged_tsc.html>

```shell
npm pkg set scripts.tscheck="vue-tsc --noEmit --pretty -p ./tsconfig.json"
```

```js
// .lintstagedrc.cjs
module.exports = {
  '*': ['prettier --write --ignore-unknown'],
  '*.{js,mjs,jsx,ts,mts,tsx,vue}': ['eslint --cache --fix'],
  '*.{ts,mts,tsx,vue}': [() => 'vue-tsc --noEmit -p ./tsconfig.json'],
};
```

> 使用 VS Code 的 Git GUI 进行 commit 操作，错误信息不管是在输出中查看还是在结果文件中查看，都会出现乱码。是因为 eslint 的--color 参数以及 tsc 的--pretty 参数，会使输出结果包含有 shell 的字体颜色，这些颜色在输出中以及结果文件中不被识别。可以去掉这里的这两个参数来解决这个问题。

## zhlint (可选)

[zhlint 官方文档](https://github.com/zhlint-project/zhlint#readme)

主要是格式化中文的，比如 `markdown` 文件中的英文和中文之间添加空格等规则。

```shell
# 安装依赖
pnpm add zhlint -D

# 添加执行脚本
npm pkg set scripts['zhlint:all']="zhlint \"./src/content/blog/*.md\" --fix"
```

`lint-staged` 中可配置

```js
{
  "*.md": ["pnpm zhlint:all"]
}
```

由于 `zhlint` 不接受多个文件路径的参数，如果传入多个文件路径，`zhlint` 指挥处理第一个文件。所以这里 `lint-staged` 是全量检查，而不是差量检查。

## commitlint (可选)

[commitlint 官方文档](https://commitlint.js.org/#/guides-local-setup)

```shell
# 安装依赖
pnpm add @commitlint/config-conventional @commitlint/cli -D

# 添加执行脚本
npm pkg set scripts.commitlint="commitlint --edit"
```

配置 `.commitlintrc`，或在 `package.json` 中添加 `commitlint` 字段：

```json
{
  "extends": ["@commitlint/config-conventional"]
}
```

## Husky

[Husky 官方文档](https://github.com/typicode/husky)

```shell
# 安装依赖
pnpm add husky -D

# 添加初始化脚本
npm pkg set scripts.prepare="husky install && husky set .husky/pre-commit \"npx lint-staged\""

# 如果需要添加上commitlint
npm pkg set scripts.prepare="husky install && husky set .husky/pre-commit \"npx lint-staged\" && husky set .husky/commit-msg \"npx --no -- commitlint --edit ${1}\""

# 初始化
pnpm prepare
```
