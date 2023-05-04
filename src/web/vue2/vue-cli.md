---
title: Vue Cli
date: 2021-03-16
category:
  - vue2
tag:
  - vue-router
---

<!-- more -->

### baseUrl

从Vue CLI3.3起已弃用，请使用`publicPath`

### publicPath
- Type:`string`
- Default:`'/'`
- 使用示例：
<!-- ```js
module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/production-sub-path/'
    : '/'
}
``` -->

### outputDir
- Type:`string`
- Default:`'dist'`
- tip:
  - 当运行`vue-cli-service build`时生成的生产环境构建文件的目录。注意目标目录的内容在构建之前会被清除 (构建时传入 `--no-clean` 可关闭该行为)。

### assetsDir
- Type:`string`
- Default:`''`
  放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。

### indexPath
- Type:`string`
- Default:`'index.html'`
  指定生成的 index.html 的输出路径 (相对于 outputDir)。也可以是一个绝对路径。

### productionSourceMap
- Type:`boolean`
- Default:`true`
  如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。  
  可以在打包上线的时候不生成map文件

### css.sourceMap
- Type:`boolean`
- Default:`false`
  是否为 CSS 开启 source map。设置为 `true` 之后可能会影响构建的性能。  
  打包上线的时候可以压缩css文件

### devServe
- Type:`Object`

#### devServe.proxy
```js
module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: '<url>',
        ws: true,
        changeOrigin: true
      },
      '/foo': {
        target: '<other_url>'
      }
    }
  }
}
```
[更多proxy配置参数](https://github.com/chimurai/http-proxy-middleware#proxycontext-config)

[更多devServer配置参数](https://webpack.docschina.org/configuration/dev-server/)



