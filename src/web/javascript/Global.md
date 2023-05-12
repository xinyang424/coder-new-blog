---
title: Global
date: 2021-03-20
category:
  - javascript
---



Global 对象是 ECMAScript 中最特别的对象，因为代码不会显式地访问它。ECMA-262 规定 Global对象为一种兜底对象，它所针对的是不属于任何对象的属性和方法。

<!-- more -->

事实上，不存在全局变量或全局函数这种东西。在全局作用域中定义的变量和函数都会变成 Global 对象的属性 。

类似Global对象方法还有isNaN()、、isFinite()、parseInt()和 parseFloat()。

## URL编码
encodeURI()和 encodeURIComponent()方法用于编码统一资源标识符（URI），以便传给浏览器。有效的 URI 不能包含某些字符，比如空格。使用 URI 编码方法来编码 URI 可以让浏览器能够理解它们，同时又以特殊的 UTF-8 编码替换掉所有无效字符。

两者区别：  
encodeURI()不会编码属于 URL 组件的特殊字符，比如冒号、斜杠、问号、井号，而 encodeURIComponent()会编码它发现的所有非标准字符。来看下面的例子：
```js
let uri = "http://www.wrox.com/illegal value.js#start";
// "http://www.wrox.com/illegal%20value.js#start"
console.log(encodeURI(uri));
// "http%3A%2F%2Fwww.wrox.com%2Fillegal%20value.js%23start"
console.log(encodeURIComponent(uri)); 
```

与 encodeURI()和 encodeURIComponent()相对的是 decodeURI()和 decodeURIComponent()。decodeURI()只对使用 encodeURI()编码过的字符解码。
decodeURIComponent()解码所有被 encodeURIComponent()编码的字符，基本上就是解码所有特殊值。来看下面的例子：
```js
let uri = "http%3A%2F%2Fwww.wrox.com%2Fillegal%20value.js%23start";
// http%3A%2F%2Fwww.wrox.com%2Fillegal value.js%23start
console.log(decodeURI(uri));
// http:// www.wrox.com/illegal value.js#start
console.log(decodeURIComponent(uri)); 
```

##  eval()
eval()是整个 ECMAScript 语言中最强大的了，它就是 eval()。这个方法就是一个完整的 ECMAScript 解释器，它接收一个参数，即一个要执行的 ECMAScrip（JavaScript）字符串。来看一个例子：
```js
eval("console.log('hi')");
//等价于
console.log("hi");
```

通过 eval()执行的代码属于该调用所在上下文，被执行的代码与该上下文拥有相同的作用域链。这意味着定义在包含上下文中的变量可以在 eval()调用内部被引用：

```js
let msg = "hello world";
eval("console.log(msg)"); // "hello world"  //这行代码会被替换成一行真正的函数调用代码。
```

书上说：==通过 eval()定义的任何变量和函数都不会被提升，这是因为在解析代码的时候，它们是被包含在一个字符串中的。它们只是在 eval()执行的时候才会被创建==。但我觉得这句话并不太正确，见下代码：

```js
eval("const sayHi = ()=> { console.log('hi'); }");
sayHi(); // Uncaught ReferenceError: sayHi is not defined

eval("function sayHi() { console.log('hi'); }");
sayHi(); // hi

eval("let msg = 'hello world';");
console.log(msg);// Uncaught ReferenceError: msg is not defined

eval("var msg = 'hello world';");
console.log(msg);// hello world
```

如果不存在变量提升，我想解释不了：为什么let声明方式和var声明方式，let声明会报错，而var报错声明不会报错（==待求证==）。

在严格模式下，在 eval()内部创建的变量和函数无法被外部访问。

:::warning 注意
解释代码字符串的能力是非常强大的，但也非常危险。在使用 eval()的时候必须极为慎重，特别是在解释用户输入的内容时。因为这个方法会对 XSS 利用暴露出很大的攻击面。恶意用户可能插入会导致你网站或应用崩溃的代码。
:::
