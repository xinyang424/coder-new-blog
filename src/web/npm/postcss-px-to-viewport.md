---
title: postcss-px-to-viewport
date: 2022-03-01
category:
  - 插件
tag:
  - 移动端适配
---


<!-- more -->

## 安装

```bash
npm install -D postcss-px-to-viewport
```

## 基于vite项目

```ts
//vite.config.js or vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import px2Viewport from "postcss-px-to-viewport";
export default ({ mode }: any) => {
  return defineConfig({
    plugins: [react()],
    css: {
      postcss: {
        plugins: [
          px2Viewport({
            unitToConvert: "px", // 要转化的单位
            viewportWidth: 375, // UI设计稿的宽度
            unitPrecision: 6, // 转换后的精度，即小数点位数
            propList: ["*"], // 指定转换的css属性的单位，*代表全部css属性的单位都进行转换
            viewportUnit: "vw", // 指定需要转换成的视窗单位，默认vw
            fontViewportUnit: "vw", // 指定字体需要转换成的视窗单位，默认vw
            selectorBlackList: ["ignore-"], // 指定不转换为视窗单位的类名，
            minPixelValue: 1, // 默认值1，小于或等于1px则不进行转换
            mediaQuery: true, // 是否在媒体查询的css代码中也进行转换，默认false
            replace: true, // 是否转换后直接更换属性值
            landscape: false, // 是否处理横屏情况
          }),
        ],
      },
    },
  });
};
```

## 注意事项

若将`postcss-px-to-viewport`在ts项目中使用，由于`postcss-px-to-viewport`没有声明文件，这里需要自己手动写一个声明文件

1. 在项目的根目录下，新建一个`postcss-px-to-viewport.d.ts`文件。
2. 内容参考如下，在根目录创建的声明文件，ts可以自动识别到。
```ts
declare module "postcss-px-to-viewport" {
  type Options = {
    unitToConvert: "px" | "rem" | "cm" | "em";
    viewportWidth: number;
    viewportHeight: number; // not now used; TODO: need for different units and math for different properties
    unitPrecision: number;
    viewportUnit: string;
    fontViewportUnit: string; // vmin is more suitable.
    selectorBlackList: string[];
    propList: string[];
    minPixelValue: number;
    mediaQuery: boolean;
    replace: boolean;
    landscape: boolean;
    landscapeUnit: string;
    landscapeWidth: number;
  };

  //Partial 可选参数
  export default function (options: Partial<Options>): any;
}

```

若想声明文件都在一个文件夹下，可参考[此文章](/note/practical-skills/ts-declare.md)。