---
title: IIFE CJS AMD UMD ESM
date: 2023-02-16
category:
  - javascript
---

<!-- more -->

## IIFE

自执行函数，英文全称：`immediately invoked function expressions`。

符合下面格式的代码其实都算是 IIFE：

```js
(function(){
    //....
})()


(()=>{
    //...
}){}


(async ()=>{
    //...
})()
```

**适用场景**
浏览器中带有`<script>`标签包裹的代码块，简单来说就是普通的业务应用都可，没啥兼容问题。

**优点**
函数作用域避免了全局变量的污染

iife 也算是比较早期的模块化方案了，只需对外暴露一个全局变量，最知名的就是[jQuery](http://hemin.cn/jq/)

## CJS

真正的模块化解决方案，最早从 Node 应用开始，英文全称：`CommonJS`。

```js
var EventEmitter = require("events").EventEmitter;
module.exports = new EventEmitter();
```

**关键词**：==module==、==exports==、==global==、==require==。

**特点**
- 模块加载require就是代码执行
- 所有代码运行在模块作用域中，不污染全局
- 模块可以多次加载，但是只在第一次加载运行，后面是缓存

**使用场景**
- Nodejs，浏览器端需要用其他打包工具支持
- 如果在你的package.json下定义一个main的字段，值是文件的路径，那么require就会按这个优先加载，不然就是根目录下的index.js或index.node
```json
//package.json
{
    "name":"lib",
    "main":"./lib/index.js"
}
```

**使用注意点**
`export.xxx`不能和`module.exports`一起使用（推荐只用`module.exports`，不用`export.xxx`）

```js
exports.showTips = function() {
    return "123";
};

module.exports = "TinssonTai"
```
上述代码的showTips是无法引入的，因为在每个模块里，exports就是module.exports的引用，类似头部有这样的代码：
```js
var exports = module.exports;
```

## AMD

异步模块声明，英文全称：`Asynchronous module definition`。

amd可以理解是CommonJs在浏览器端的解决方案，cjs在服务端是同步加载依赖代码的，因为服务端都是本地磁盘读取文件，没有网络开销，速度很快，浏览器端要是也这么干，很有可能因为依赖在远程，因网络时间开销而导致出现“假死”，所以浏览器端采用异步加载模块的方式。

```js
//定义模块
define([moduleDeps], moduleFunc);

//引用模块
require([module], callback);
```

**关键词**：`require`、`define`

require的第一个参数是需要异步加载的依赖列表，第二个是模块异步加载后的执行代码，define第一个参数是模块的依赖模块，第二个是模块代码。

**优点**：
- 体积更小，代码按需加载
- 不堵塞js线程运行

## UMD
联合模块定义，英文全称：`Universal Module Definition`。

准确来说并不是一个独立的模块标准，而是集合了cjs，amd，iife等一体的打包模式，会自动判断当前可用环境。

优点：
- 一套代码，多端使用，模块化兼容性好。
- 一般会在webpack中成为备用模块

## ESM
ES6标准中的模块规则，一统浏览器和服务端标准的解决方案。英文全称：`ES6 Module`。

**关键字**：`import`、`export`

**适用场景**：
结合其它打包工具（webpack）使用或浏览器`<script type="module">`标签包裹。

**特点**：
- 浏览器端会异步加载，延续AMD的优势，但利用了浏览器原生的解析能力，代码体积更小。
- 模块内自动采用严格模式。
- 模块中的this指向并不是window或global，而是undefined

上文有提到`cjs`一般会优先放`package.json`的`main`字段里，而这里的`esm`入口文件会优先放在`module`字段里。

```js
{
    "main":"./lib/index.js",//cjs
    "module":"./lib/index.mjs"//esm
}
```
esm和cjs的差异：
- cjs 模块输出的是一个值的拷贝（浅拷贝），esm输出的是值的引用。
- cjs 模块是运行时加载，esm是编译时输出接口。
- cjs同步加载模块，esm异步加载，有一个独立的模块依赖的解析阶段。


