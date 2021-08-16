---
issue_number: 21
title: Vite+Vue3中使用Eslint
---

### Install

```bash
yarn add -D @typescript-eslint/parser \
    @vue/eslint-config-prettier \
    eslint \
    eslint-config-airbnb-base \
    eslint-config-prettier \
    eslint-import-resolver-alias \
    eslint-plugin-import \
    eslint-plugin-prettier \
    eslint-plugin-vue \
    prettier \
    vue-eslint-parser
```

### Init

```bash
yarn eslint --init
```

> ✔ How would you like to use ESLint? · style
> ✔ What type of modules does your project use? · esm
> ✔ Which framework does your project use? · vue
> ✔ Does your project use TypeScript? · No / Yes
> ✔ Where does your code run? · browser, node
> ✔ How would you like to define a style for your project? · guide
> ✔ Which style guide do you want to follow? · airbnb
> ✔ What format do you want your config file to be in? · JavaScript
> Checking peerDependencies of eslint-config-airbnb-base@latest
> The config that you've selected requires the following dependencies:
>
> eslint-plugin-vue@latest eslint-config-airbnb-base@latest eslint@^5.16.0 || ^6.8.0 || ^7.2.0 eslint-plugin-import@^2.22.1
> ✔ Would you like to install them now with npm? · No / Yes

```bash
rm -rf package-lock.json
```

### .eslintrc.js

```javascript
module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  globals: {
    defineProps: 'readonly',
    defineEmits: 'readonly',
    defineExpose: 'readonly',
  },
  extends: ['plugin:vue/vue3-strongly-recommended', 'airbnb-base'],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: {
      js: 'espree',
      ts: '@typescript-eslint/parser',
      '<template>': 'espree',
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['vue'],
  settings: {
    'import/resolver': {
      alias: {
        map: [['@', './src']],
        extensions: ['.ts', '.js', '.jsx', '.json', '.vue'],
      },
    },
  },
  rules: {
    'no-param-reassign': ['error', { props: false }],
    'arrow-parens': ['error', 'as-needed'],
    'import/no-extraneous-dependencies': ['error', { devDependencies: ['./vite.config.js'] }],
    'vue/singleline-html-element-content-newline': ['off'],
    'vue/max-attributes-per-line': ['warn', { singleline: { max: 10, allowFirstLine: true } }],
    'max-len': ['error', { code: 130, ignoreUrls: true }],
  },
};
```

### .prettierrc.js

```json
{
  "printWidth": 130,
  "singleQuote": true,
  "trailingComma": "all",
  "arrowParens": "always"
}
```

### .editorconfig

```
[*.{js,jsx,ts,tsx,vue}]
indent_style = space
indent_size = 2
end_of_line = lf
trim_trailing_whitespace = true
insert_final_newline = true
max_line_length = 130
```

### .prettierignore

```
theme/**/*.css
```

### jsconfig.json

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    },
    "target": "ES6",
    "module": "commonjs",
    "allowSyntheticDefaultImports": true
  },
  "exclude": ["node_modules"]
}
```
