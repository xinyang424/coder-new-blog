---
title: TS声明文件
date: 2022-03-01
category:
  - 实用技巧
tag:
  - TS声明文件实用技巧
---

## 如何将TS的声明文件都归纳到一个文件夹里面

1. 在项目的根目录下新建一个`types`文件夹。
2. 在`tsconfig.config.json`文件里或者`tsconfig.node.json`文件里：
```json
{
  "extends": "@vue/tsconfig/tsconfig.node.json",
  "include": [
    "vite.config.*",
    "vitest.config.*",
    "cypress.config.*",
    "playwright.config.*",
    "types/*"  //在这里加上types/*，types就是在根目录下新建的文件夹，types/*代表的意思是types文件夹下的所有文件。
  ],
  "compilerOptions": {
    "composite": true,
    "types": [
      "node"
    ]
  }
}
```