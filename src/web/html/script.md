---
title: <script>元素
date: 2022-02-01
category:
  - HTML
---

## script标签属性

- `async`：可选。表示应该立即开始下载脚本，但不能阻止其它页面动作，比如下载资源或等到其它脚本加载，只对外部脚本文件有效。
- `defer`：可选。表示脚本可以延迟到文档完全被解析和显示之后再执行。只对外部脚本文件有效。简单说，浏览器会立即下载但延迟执行
- `charset`：可选。使用src属性指定的代码字符集。这个属性很少使用，因为大多数浏览器不在乎它的值。
- `crossorigin`：可选。配置相关请求的CORS（跨域资源共享）设置。默认不设置CORS。`crossorigin="anonymous"`配置文件请求不必设置凭据标志。  
`crossorigin="use-credentials"`设置凭据标志，意味着出战请求会包含凭据。
- `integrity`：可选，允许比对接收到的资源和指定的加密签名以验证子资源完整性。如果接收到的资源的签名与这个属性指定的签名不匹配，则页面会报错，脚本不会执行。这个属性可以用于CDN不会提供而已内容。这个属性并不是所有浏览器都支持
- `language`：废弃
- `src`：可选。表示包含要执行的代码的外部文件。
- `type`：可选。代替`language`，表示代码块钟脚本语言的内容类型（也称MIME类型）。按照管理，这个值始终都是`text/javascript`，尽管`text/application`和`text/ecmascript`都已经废弃。js文件的MIME类型通常是`application/x-javascript`。如果这个值为module，则代码会被当成ES6模块，而且只有这时候代码中才能出现import和export关键字。

**注意**
1. script标签的src属性与行类代码，若两者都提供，则浏览器只会下载并执行脚本文件，从而忽略行内代码。
2. 为什么推荐外联js文件？
   - 可维护性
   - 可以缓存
   - 适应未来

## 标签位置
### head里
`<script>`标签放在`head`里，意味着必须把所有js都下载、解析和解释完成后，才能开始渲染页面

### defer
在`script`元素上设置defer属性，相当于告诉浏览器立即下载，但延迟执行。
```html
<!DOCTYPE html> 
<html> 
 <head> 
 <title>Example HTML Page</title> 
 <script defer src="example1.js"></script> 
 <script defer src="example2.js"></script> 
 </head> 
 <body> 
 <!-- 这里是页面内容 --> 
 </body> 
</html>
```
虽然这个例子中的`<script>`元素包含在页面的`<head>`中，但它们会在浏览器解析到结束的`</html>`标签后才会执行。HTML5 规范要求脚本应该按照它们出现的顺序执行，因此第一个推迟的脚本会在第二个推迟的脚本之前执行，而且两者都会在 DOMContentLoaded 事件之前执行。不过在实际当中，推迟执行的脚本不一定总会按顺序执行或者在 DOMContentLoaded事件之前执行，因此最好只包含一个这样的脚本。

如前所述，defer 属性只对外部脚本文件才有效。这是 HTML5 中明确规定的，因此支持 HTML5的浏览器会忽略行内脚本的 defer 属性。IE4~7 展示出的都是旧的行为，IE8 及更高版本则支持 HTML5定义的行为。

对 defer 属性的支持是从 IE4、Firefox 3.5、Safari 5 和 Chrome 7 开始的。其他所有浏览器则会忽略这
个属性，按照通常的做法来处理脚本。考虑到这一点，还是把要推迟执行的脚本放在页面底部比较好。

### async
在`script`元素上设置async属性，告诉浏览器立即下载。不过，与defer不同的是，标记为async的脚本并不保证能按照他们出现的次序执行，比如：
```html
<!DOCTYPE html> 
<html> 
 <head> 
 <title>Example HTML Page</title> 
 <script async src="example1.js"></script> 
 <script async src="example2.js"></script> 
 </head> 
 <body> 
 <!-- 这里是页面内容 --> 
 </body> 
</html> 
```
在这个例子中，第二个脚本可能先于第一个脚本执行。因此，重点在于它们之间没有依赖关系。给脚本添加 async 属性的目的是告诉浏览器，不必等脚本下载和执行完后再加载页面，同样也不必等到该异步脚本下载和执行后再加载其他脚本。正因为如此，异步脚本不应该在加载期间修改 DOM。
异步脚本保证会在页面的 load 事件前执行，但可能会在 DOMContentLoaded之前或之后。

Firefox 3.6、Safari 5 和 Chrome 7 支持异步脚本。使用 async 也会告诉页面你不会使用document.write，不过好的 Web 开发实践根本就不推荐使用这个方法。



## 动态加载脚本
1. 第一种
```js
let script = document.createElement('script'); 
script.src = 'gibberish.js'; 
document.head.appendChild(script); 
```
默认情况下，以这种方式创建的`<script>`元素是以异步方式加载的，相当于添加了 `async` 属性。不过这样做可能会有问题，因为所有浏览器都支持 `createElement()`方法，但不是所有浏览器都支持 `async` 属性。因此，如果要统一动态脚本的加载行为，可以明确将其设置为同步加载：
```js
let script = document.createElement('script'); 
script.src = 'gibberish.js'; 
script.async = false; 
document.head.appendChild(script);
```
2. 第二种
```html
<link rel="preload" href="gibberish.js">
```

## noscript元素

使用场景：
1. 浏览器不支持脚本
2. 浏览器对脚本的支持关闭

使用示例：
```js
<!DOCTYPE html> 
<html> 
 <head> 
 <title>Example HTML Page</title> 
 <script defer="defer" src="example1.js"></script> 
 <script defer="defer" src="example2.js"></script> 
 </head> 
 <body> 
 <noscript> 
 <p>This page requires a JavaScript-enabled browser.</p> 
 </noscript> 
 </body> 
</html>
```

## 总结
- 要包含外部 JavaScript 文件，必须将 src 属性设置为要包含文件的 URL。文件可以跟网页在同一台服务器上，也可以位于完全不同的域。
- 所有`<script>`元素会依照它们在网页中出现的次序被解释。在不使用 defer 和 async 属性的情况下，包含在`<script>`元素中的代码必须严格按次序解释。
- 对不推迟执行的脚本，浏览器必须解释完位于`<script>`元素中的代码，然后才能继续渲染页面的剩余部分。为此，通常应该把`<script>`元素放到页面末尾，介于主内容之后及`</body>`标签之前。
- 可以使用 defer 属性把脚本推迟到文档渲染完毕后再执行。推迟的脚本原则上按照它们被列出的次序执行。
- 可以使用 async 属性表示脚本不需要等待其他脚本，同时也不阻塞文档渲染，即异步加载。异步脚本不能保证按照它们在页面中出现的次序执行。
- 通过使用`<noscript>`元素，可以指定在浏览器不支持脚本时显示的内容。如果浏览器支持并启用脚本，则`<noscript>`元素中的任何内容都不会被渲染