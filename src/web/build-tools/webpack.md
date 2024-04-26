---
title: Webpack
date: 2024-03-15
category:
  - 构建工具
tag:
  - webpack
  - 构建工具
---


### 构建基础
```shell
# 必须安装
npm i webpack -D
# 必须安装
npm i webpack-cli -D
# 选择安装，安装后可以热更新html文件。
npm i webpack-dev-server
```

#### webpack-dev-server

`webpack-dev-server`配置：
```js
// 在webpack.config.js内
const HtmlWebpackPlugin = require("html-webpack-plugin");

const webpackConfig = {
    plugins:[
        new HtmlWebpackPlugin({
          template: "./index.html",
        }),
    ]
}
module.exports = webpackConfig;
```

### 常用webpack插件

#### cross-dev

`cross-env`可用于判断生产环境还是开发环境，安装命令：
```shell
npm i cross-env -D
```
在`package.json`文件中进行配置：
```json
"scripts": {
  "dev": "cross-env NODE_ENV=development webpack-dev-server",
  "build": "cross-env NODE_ENV=production webpack"
},
```

#### clean-webpack-plugin

`clean-webpack-plugin`可用于每次打包都清空输出目录，安装命令：
```shell
npm i clean-webpack-plugin -D
```

#### terser-webpack-plugin

`terser-webpack-plugin`用于优化打包后的代码、结构、大小等。安装命令：
```shell
npm i terser-webpack-plugin -D
```

常用配置：
```js
const TerserPlugin = require("terser-webpack-plugin");
const isProd = process.env.NODE_ENV === "production";
const webpackConfig = {
  plugins:[],
  optimization:{}
}
// 如果是生产环境，则添加使用MiniCssExtractPlugin插件
if(isProd){
    // 阻止打包生成 xxx.LICENSE.txt
    new TerserPlugin({
      extractComments: false,
    }),
    webpackConfig.optimization.minimizer.push(
    new TerserPlugin({
      terserOptions: {
        compress: {
          drop_console: true,// 删除代码中带有console.log语句
          pure_funcs: ["console.debug"], // 保留 console.debug
        },
        mangle: {
          safari10: true, // 解决ie，safari10.1不支持ES6语句
        },
      },
    }),
);
}
module.exports = webpackConfig;
```

#### progress-bar-webpack-plugin

`progress-bar-webpack-plugin`插件可以在编译或打包的时候在终端显示进度条，安装命令：
```shell
npm i progress-bar-webpack-plugin -D
```

配置：
```js
const ProgressBarPlugin = require("progress-bar-webpack-plugin");
const webpackConfig = {
  plugins:[
    new ProgressBarPlugin()
  ]
}
```


### 各种loader

#### CSS有关loader
- `css-loader`：处理css
- `style-loader`：处理样式
- `sass-loader`：处理sass或scss语法。注意在webpack中除了安装`sass-loader`还要安装`sass`
- `less-loader`：处理less语法。还需要安装`less`
- `mini-css-extract-plugin`可以压缩css代码。

打包含sass语法webpack.config.js使用示例：
```js
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const isProd = process.env.NODE_ENV === "production";
const webpackConfig = {
  module: {
    rules: [
      {
        test: /\.(s[ac]ss|css)$/,
        use: [isProd ? MiniCssExtractPlugin.loader : "style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
  plugins:[]
}
// 如果是生产环境，则添加使用MiniCssExtractPlugin插件
isProd && webpackConfig.plugins.push(
    new MiniCssExtractPlugin({
      // filename: "css/index.css",//将入口css文件打包进css文件夹内
      filename: "index.css",//将入口css文件打包在根目录下
      chunkFilename: "css/[name].[hash:7].css",//其它css文件打包进css文件内
    }),
)
module.exports = webpackConfig;
```

#### 文件有关的loader

`file-loader`

`url-loader`

#### js有关的loader

`babel-loader`：



### 开发Vue组件库

开发vue组件库需要安装的依赖：
```shell
npm i vue -D
npm i vue-loader@15 -D
npm i vue-template-compiler -D

# 简写
npm i vue vue-loader@15 vue-template-compiler -D

# 选装：如果你的页面涉及到路由跳转可以安装，如果单纯只是组件库加上-D 如果想当一个vue开发的说明文档，需要去掉-D
npm i vue-router -D
```