---
title: unplugin-auto-import
date: 2022-03-01
category:
  - 插件
tag:
  - 自动导入组件
  - vue自动导入组件
---

## 安装

```bash
npm install -D unplugin-vue-components unplugin-auto-import
```

## 基于vite项目

```typescript
//vite.config.js or vite.config.ts
import { defineConfig } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig({
  // ...
  plugins: [
    // ...
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
  ],
})
```

## 基于Vue-cli项目

```typescript
// webpack.config.js
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')
module.exports = {
  // ...
  plugins: [
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
  ],
}
```

## 个人推荐

自动引入组件不如直接用[unplugin-vue-components](unplugin-vue-components.md)
