---
title: Router Router
date: 2022-07-05
category:
  - React
---

路由的作用主要应用在单页面应用(SPA)来模拟路由跳转，之所以说是模拟路由跳转其实并不是真正的页面跳转，仅是进行视图块的切换。


<!-- more -->

## 路由的模式

路由模式有HashRouter和BrowserRouter：
- `HashRouter`：以锚点链接的形式。
- `BrowserRouter`：H5新特性，需要后台支持。

## 安装

```shell
npm install react-router-dom --save
# or
npm install react-router-dom -S 
```

## Routers

虽然正式的react项目里只可以使用一个路由，但是我们可以根据项目不同的运行环境，使用多个不同的路由。

在v6.4+版本中，有以下几种路由：
- `createBrowserRouter`
- `createMemoryRouter`
- `createHashRouter`
- `createStaticRouter`

## 路由组件

## Link

## NavLink

## Navigate

## Outlet

## Route

## Routes

## prompt

## withRouter

## 重定向

## 路由嵌套