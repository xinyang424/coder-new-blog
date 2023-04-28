---
title: 杂记
date: 2023-03-01
category:
  - 记八股文
---


### <!DOCTYPE>

1. `<!DOCTYPE>`声明不是HTML标签，它是指示web浏览器关于页面使用哪个HTML版本进行编写的指令。
2. `<!DOCTYPE>`没有结束标签。
3. `<!DOCTYPE>`声明对大小写不敏感。

### window location
1. `location.host`返回的是web主机域名 + 端口号。
2. `location.hostname`返回的仅是web主机域名
3. `location.pathname`返回当前页面的路径和文件名
4. `location.port`返回web主机的端口，但注意的是，如果端口默认为80或443，则默认返回的为空。
5. `location.protocol`返回所使用高德web协议，如`http:`或`https:`

### << 和 >> 和 >>> 运算符
1. `<<`运算符执行左移位运算。
2. `>>`运算符执行右移位运算
3. [参考链接](http://c.biancheng.net/view/5471.html)

### lastIndexOf
1. `lastIndexOf`从尾部开始检索，从0开始

### js创建节点的方式
1. `createElement`——创建节点
2. `replaceChild`——替换节点
3. `cloneNode`——克隆节点

### HTML5新增特性
1. 语义化标签
2. 增强型表单包括属性以及元素
3. 新增视频`<video>`和音频`<audio>`标签
4. `canvas`图形
5. 地理定位
6. 拖放API
7. SVG绘图
8. Web Worker
9. Web Storage
10. Web Socket
    
### js中比较成熟的模块加载方案
1. CommonJS——简称cjs，主要是 Node.js 使用，通过 require 同步加载模块，exports 导出内容。在 CommonJS 规范下，每一个 JS 文件都是独立的模块，每个模块都有独立的作用域，模块里的本地变量都是私有的。 
2. AMD——即异步模块定义。AMD 定义了一套 JavaScript 模块依赖异步加载标准，用来解决浏览器端模块加载的问题。AMD 主要是浏览器端使用，通过 define 定义模块和依赖，require 异步加载模块，推崇依赖前置。 
3. CMD——即通用模块定义。CMD 定义了一套 JavaScript 模块依赖异步加载标准，用来解决浏览器端模块加载的问题。CMD 主要是浏览器端使用，通过 define 定义模块和依赖，require 异步加载模块，推崇依赖就近。 
4. UMD——即通用模块定义。UMD 主要为了解决 CommonJS 和 AMD 规范下的代码不通用的问题，是 AMD 和 CommonJS 的整合，同时还支持将模块挂载到全局，是跨平台的解决方案。 
5. SystemJS——可以通过各种插件，实现对 AMD、UMD 的加载，并且借助运行时编译器，可以实现对 ES Modules 和 CJS 模块的直接加载。
6. ESModule——简称es，即 ESModule、ECMAScript Module。官方模块化规范，现代浏览器原生支持，通过 import 加载模块，export 导出内容。 

### redux遵循的规则
1. 单一事实来源，整个应用的state被存储在一棵object tree中，并且这个object tree只存在于唯一一个store中； 
2. 状态是只读的，唯一改变state的方法就是触发action，action是一个用于描述发生事件的普通对象； 
3. 使用纯函数进行修改数据

### 符合数据结构-栈的特性
1. 线性存储
2. 后入先出

### 属于宏任务的有
1. `setTimeout`
2. `requestAnimationFrame`——请求动画帧
3. `setInterval`
   
### 属于微任务的有
1. `Promise`


### 正则表达式
[参考链接](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Regular_Expressions)

### 移动端动画
移动端要想动画性能流畅，可以使用3D硬件加速，因此最好给页面中的元素添加translate3d或者translateZ(0)来触发3D硬件加速。  
解决浏览器渲染问题，首要目标就是要避免重绘和重排

### 关于HTTP2描述
1. 所有http请求都是建立在一个TCP请求上，实现多路复用。
2. 可以给请求添加优先级
3. 服务器主动推送server push
4. HTTP2的头部会减小，从而减少流量传输

### 动态加载js资源
```js
var script = document.createElement("script");
var head = document.getElementsByTagName("head")[0];
script.type = "text/javascript";
script.src = "//i.alicdn.com/resource.js";

//绑定资源加载成功事件
script.onreadystatechange = function(){
    //判断资源加载状态是否位加载成功或加载完成
    if(/^(loaded|complete)$/.test(script.readyState)){
        script.onreadystatechange = null;
        ...
    }
    //绑定资源加载失败事件
    script.onerror = function(){
        ...
    }
    head.insertBefore(script,head.firstChild)
}
``