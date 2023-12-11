---
author: wtto00
pubDatetime: 2021-08-16T04:23:39.000Z
title: Vite+Vue3中使用Eslint
postSlug: eslint-vue3-vite
featured: false
draft: false
tags:
  - Eslint
description: Vite+Vue3中使用Eslint
issue_number: 21
---

## Install

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

## Init

```bash
yarn eslint --init
```

> ✔ How would you like to use ESLint？ · style
> ✔ What type of modules does your project use？ · esm
> ✔ Which framework does your project use？ · vue
> ✔ Does your project use TypeScript？ · No / Yes
> ✔ Where does your code run？ · browser，node
> ✔ How would you like to define a style for your project？ · guide
> ✔ Which style guide do you want to follow？ · airbnb
> ✔ What format do you want your config file to be in？ · JavaScript
> Checking peerDependencies of eslint-config-airbnb-base@latest
> The config that you've selected requires the following dependencies：
>
> eslint-plugin-vue@latest eslint-config-airbnb-base@latest eslint@^5.16.0 || ^6.8.0 || ^7.2.0 eslint-plugin-import@^2.22.1
> ✔ Would you like to install them now with npm？ · No / Yes

```bash
rm -rf package-lock.json
```

## `.eslintrc.js`

根据腾讯代码规范，添加以下规则

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
    $ref: 'readonly',
    $computed: 'readonly',
    $fromRefs: 'readonly',
    $raw: 'readonly',
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
    'no-param-reassign': ['error', { props: true }],
    'arrow-parens': ['error', 'as-needed', { requireForBlockBody: true }],
    'import/no-extraneous-dependencies': ['error', { devDependencies: ['./vite.config.js'] }],
    'max-len': ['error', { code: 120, ignoreUrls: true }],
    'prefer-const': ['error', { ignoreReadBeforeAssign: true }],
    'no-return-assign': ['error', 'except-parens'],
    'newline-per-chained-call': ['error', { ignoreChainWithDepth: 2 }],
    'function-paren-newline': ['error', 'multiline'],
    'new-cap': ['error', { properties: false }],
    'no-mixed-operators': ['error', { allowSamePrecedence: true }],
    'prefer-destructuring': ['error', { array: true, object: true }, { enforceForRenamedProperties: false }],
    'vue/singleline-html-element-content-newline': ['off'],
    'vue/max-attributes-per-line': ['warn', { singleline: { max: 6, allowFirstLine: true } }],
    'vue/attributes-order': [
      'error',
      {
        order: [
          'DEFINITION',
          'LIST_RENDERING',
          'CONDITIONALS',
          'RENDER_MODIFIERS',
          'GLOBAL',
          'UNIQUE',
          'TWO_WAY_BINDING',
          'OTHER_DIRECTIVES',
          'OTHER_ATTR',
          'EVENTS',
          'CONTENT',
        ],
      },
    ],
  },
};
```

## `.prettierrc.js`

```json
{
  "printWidth": 120,
  "singleQuote": true,
  "trailingComma": "all",
  "arrowParens": "always"
}
```

## `.editorconfig`

```properties
[*.{js,jsx,ts,tsx,vue}]
indent_style = space
indent_size = 2
end_of_line = lf
trim_trailing_whitespace = true
insert_final_newline = true
max_line_length = 120
```

## `.prettierignore`

```plaintext
theme/**/*.css
```

## `.jsconfig.json`

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

## `package.json`

```json
{
  "scripts": {
    "lint": "eslint --ext .js,.vue --ignore-path .gitignore --fix src",
    "format": "prettier .  --write"
  }
}
```

## `vite.config.js`

```javascript
import vue from '@vitejs/plugin-vue';
import path from 'path';
import { defineConfig } from 'vite';
// import { visualizer } from 'rollup-plugin-visualizer';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue({ script: { refSugar: true } })],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '/src'),
    },
  },
  build: {
    rollupOptions: {
      // plugins: [visualizer()],
      output: {
        manualChunks: {
          element: ['element-plus'],
        },
      },
    },
  },
  server: {
    proxy: {
      '/api/': {
        target: 'https://xxx/',
        changeOrigin: true,
        rewrite: (_path) => _path.replace(/^\/api/, ''),
      },
    },
  },
});
```

> vscode 报错 `ecmaVersion` 版本不对，需要全局安装 `yarn global add eslint`
