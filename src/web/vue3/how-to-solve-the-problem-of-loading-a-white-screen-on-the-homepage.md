---
title: 如何解决vue首页加载白屏问题
date: 2020-01-10
category:
  - vue3
tag:
  - 首页加载白屏
---


## 预渲染

## 同构

## SSR

服务端渲染也可以解决首屏加载慢这个问题，因为服务端会把所有数据全部渲染完成再返回给客户端

ssr =>请求->node->解析 ->吐回给客户端(带请求数据)

但是有一个大问题，重要的是node层，高并发的解决

## 路由懒加载

```js
{
  path: '/about',
  name: 'about',
  component: () => import('../views/AboutView.vue')
}
```

## quicklink

quicklink就是在浏览器空闲的时候去指定需要加载的数据,这个是谷歌开源的，

## 使用Gzip压缩

减少文件体积，加快首屏页面打开速度

前提是服务器那边得开启gzip

前端需要做的事：

```bash
npm i compression-webpack-plugin -D
```

vue.config.js
```js
const CompressionPlugin = require("compression-webpack-plugin")

module.exports = {
  configureWebpack: () => {
    if (process.env.NODE_ENV === 'production') {
      return {
        plugins: [
          new CompressionPlugin({
            test: /\.js$|\.html$|\.css$|\.jpg$|\.jpeg$|\.png/, // 需要压缩的文件类型
            threshold: 10240, // 归档需要进行压缩的文件大小最小值，我这个是10K以上的进行压缩
            deleteOriginalAssets: false, // 是否删除原文件
            minRatio: 0.8
          })
        ]
      }
    }
  }
}

```

## sourcemap

打包的时候不生成sourcemap文件，进而减小包体积

## 外链css、js文件

很多时候我们在main.js中直接import一些ui库或者css文件啥的，以后可以在index.html，通过script外链引入，这样就不会通过我们的webpack打包。



## webpack entry

这个就是将单页改成多页应用,比如一些组件中，vue.js vue-router等插件已经在某个页面使用了，然后给它缓存起来，下次就无需加载。


## 使用cdn加速

## 打包文件分包，提取公共文件包

## 骨架屏

骨架屏就是在进入项目的FP阶段，给它来一个类似轮廓的东西，当我们的页面加载完成之后就消失。

## loading

首页加一个loading，在index.html里加一个loadingcss效果，当页面加载完成消失


