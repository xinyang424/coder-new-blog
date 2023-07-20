---
title: monorepo
date: 2022-06-11
category:
  - 包管理工具
---

## monorepo好处
1. 解决重复代码的维护
2. 解决需要私服发布和管理npm
3. 越来越受到前端的欢迎

## monorepo使用常用示例


一个文件夹内有是个不同的业务网站，不同的业务网站可能需要同一个组件，而以前的思想就是每个业务网站建一个项目，每个项目单独写依赖。
1. monorepo就可以让不同的项目都使用一个依赖。
2. 当某个组件打成一个类似npmjs上的依赖的时候，我们又不想公开在npmjs.com上是，此时pnpm就能发挥出极大的作用。


## 如何使用monorepo

### 通过pnpm

[配置参考](https://www.pnpm.cn/pnpm-workspace_yaml)

### 通过lerna

Lerna 是一个快速、现代的构建系统，用于管理和发布同一存储库中的多个 JavaScript或TypeScript 包。

[Lerna官网](https://lerna.js.org/)

用lerna初始化一个monorepo项目：
```shell
npx lerna init
```


