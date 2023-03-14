---
title: unplugin-vue-components
date: 2023-03-01
---

:::info
💡 该插件仅适用于vue项目，无论是基于webpack构建的还是基于vite构建的，利用该插件可以实现自动到入，yyds！！！💞
:::

## 基于vite项目

```typescript
//vite.config.js or vite.config.ts
import vue from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from 'unplugin-vue-components/resolvers';

export default {
  plugins: [
    vue(),
    Components({
      resolvers: [VantResolver()],
    }),
  ],
};

```

## 基于Vue-cli项目

```typescript
//vue.config.js or vue.config.ts
const { VantResolver } = require('unplugin-vue-components/resolvers');
const ComponentsPlugin = require('unplugin-vue-components/webpack');

module.exports = {
  configureWebpack: {
    plugins: [
      ComponentsPlugin({
        resolvers: [VantResolver()],
      }),
    ],
  },
};

```

## 基于webpack项目

```typescript
// webpack.config.js
const { VantResolver } = require('unplugin-vue-components/resolvers');
const ComponentsPlugin = require('unplugin-vue-components/webpack');

module.exports = {
  plugins: [
    ComponentsPlugin({
      resolvers: [VantResolver()],
    }),
  ],
};

```

## 支持的库

### Ant Design Vue

[Ant Design Vue](https://antdv.com/components/overview)

解构名：AntDesignVueResolver

### Element Plus

[Element Plus](https://element-plus.org/zh-CN/)

解构名：ElementPlusResolver

### Element	UI

[Element UI](https://element.eleme.cn/#/zh-CN)

解构名：ElementUiResolver

### HeadlessUi

[HeadlessUi](https://github.com/tailwindlabs/headlessui)

解构名：HeadlessUiResolver

### Idux

[Idux](https://idux.site/)

解构名：IduxResolver

### Inkline

[Inkline](https://github.com/inkline/inkline)

解构名：InklineResolver

### Naive UI

[Naive UI](https://www.naiveui.com/zh-CN/os-theme) 

解构名：NaiveUiResolver

强烈推荐

### PrimeVue

[PrimeVue](https://github.com/primefaces/primevue)

解构名：PrimeVueResolver

### Vant

[Vant](https://github.com/youzan/vant)

解构名：VantResolver

### VarletUI

[VarletUI](https://github.com/varletjs/varlet)

注意：vue3语法用varlet，vue2语法用varlet-vue2
解构名：VarletUIResolver
比较推荐

### VEUI

[VEUI](https://github.com/ecomfe/veui)

解构名：VeuiResolver
一般推荐

### iView/View Design

[iView/View Design](https://www.iviewui.com/)

解构名：ViewUiResolver
比较推荐

### Vuetify

[Vuetify](https://github.com/vuetifyjs/vuetify)

解构名：VuetifyResolver
一般推荐

### Vuetify 3 Beta

[Vuetify 3 Beta](https://github.com/vuetifyjs/vuetify)

解构名：Vuetify3Resolver

### VueUse

[VueUse](https://github.com/vueuse/vueuse)

解构名：VueUseComponentsResolver  OR  VueUseDirectiveResolver

### Quasar

[Quasar](https://github.com/quasarframework/quasar)

解构名：QuasarResolver

### Arco Design

[Arco Design](https://arco.design/)

解构名：ArcoResolver
强烈推荐

### layui-vue

[layui-vue](http://www.layui-vue.com/zh-CN/index)

解构名：LayuiVueResolver
强烈推荐

### BootstrapVue

[BootstrapVue2](https://github.com/bootstrap-vue/bootstrap-vue)

[BootstrapVue3](https://github.com/cdmoro/bootstrap-vue-3)

解构名：BootstrapVueResolver  OR  BootstrapVue3Resolver

### TDesign

[TDesign](https://tdesign.tencent.com/)

解构名：TDesignResolver

### DevUI

[DevUI](https://devui.design/home)

解构名：DevUiResolver
强烈推荐(没有滚动条)
