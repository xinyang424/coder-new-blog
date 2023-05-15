---
title: vue.config.js
date: 2022-03-16
category:
  - vue2
tag:
  - vue.config.js配置
---


## 基本示例
```js
module.exports = {
    productionSourceMap: false,
    publicPath: './',
    outputDir: 'dist',
    assetsDir: 'assets',
    devServer: {
        port: 8090,
        host: '0.0.0.0',
        https: false,
        open: true
    },
    proxy:{
        '/api':{
          target:'http://localhost:8081/', //代理的目标地址
          changeOrigin:true,// 开启代理，在本地创建一个虚拟服务端
        // ws: true, // 是否启用websockets
           pathRewrite: {
            '^/api': '' //将/api替换为空
          }
        }
    },
    chainWebpack: config => {
        config.plugin('html').tap(args => {
            args[0].title = 'xxxx'
            return args
        })
    }
}
```

- `productionSourceMap`：生产环境是否生成`sourceMap`
- `publicPath`：部署应用包时的基本URL，用法和`webpack`本身的`output.publicPath`一致。
    - 可以通过三元运算去配置 `dev` 和 `prod` 环境, `publicPath: process.env.NODE_ENV === 'production' ? '/prod/' : './'`
- `outputDir`：`build`时输出的目录
- `assetsDir`:放置静态文件夹目录
- `devServe`：`dev`环境下，`webpack-dev-serve`相关配置
  - `port`：开发运行时的端口
  - `host`：开发运行时域名，设置成`0.0.0.0`，在同一个局域网下，如果你的项目运行，同时可以通过你的`http://ip:port/...`访问你的项目。
  - `https`: 是否启用 `https`
  - `open`: `npm run serve` 时是否直接打开浏览器
- `chainWebpack`：
  - `config.plugin('html')`的`args[0].title = 'xxxx'`，修改页面标题，通常是第一次加载时候的标题，最好进行配置，否则显示的是项目的名称。
