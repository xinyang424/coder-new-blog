---
title: Web Socket
date: 2023-03-18
category:
  - javascript
---


Web Socket（套接字）的目标是通过一个长时连接实现与服务器全双工、双向的通信。在js中创建Web Socket时，一个HTTP请求会发送到服务器以初始化连接。服务器响应后，连接使用HTTP的Upgrade头部从HTTP协议切换到Web Socket协议。这意味着Web Socket不能通过标准HTTP服务器实现，而必须使用支持该协议的专有服务器。

<!-- more -->

Web Socket使用自定义协议，所以URL方案稍有变化：即不再使用http://或https://，而是使用ws://或wss://。ws和wss区别是，ws是不安全连接，wss是安全连接。在指定Web Socket URL时，必须包含URL方案，因为将来有可能再自持其它方法。

**为什么使用自定义协议还不使用HTTP协议？**  
客户端与服务器之间可以发送非常少的数据，不会对HTTP造成任何负担。使用更小的数据包让Web Socket非常适合带宽和延迟问题比较明显的移动应用。使用自定义协议的缺点是，定义协议事件比定义js api要长。

web socket得到了所有主流浏览器的支持。

## API
```js
let socket = new WebSocket("ws://www.example.com/server.php"); 
```
:::warning 注意
必须给websocket构造函数传入一个绝对URL。同源策略不适用于Web Socket，因此可以打开到任意站点的连接。至于是否来自特定源的页面通信，完全取决于服务器（在握手阶段就可以确定请求来自哪里）
:::

浏览器会在初始化websocket对象后立即创建连接。与XHR类似，websocket也有一个readyState属性表示当前状态。但是这个值与XHR中响应值不一样。
- WebSocket.OPENING(0)：连接正在建立
- WebSocket.OPEN(1)：连接已经建立
- WebSocket.CLOSING(2)：连接正在关闭
- WebSocket.CLOSE(3)：连接已经关闭

WebSocket对象没有readystatechange事件，而是有状态值确定对应的事件，从0开始。  
任何适合都可以调用close()方法关闭Web Socket连接：
```js
socket.close();
```
调用close()之后，readyState立即变为2（连接正在关闭），并在关闭后变为3（连接已关闭）。

## 发送和接收数据
打开Web Socket之后，可以通过连接发送和接收数据。要向服务器发送数据，使用send()方法并传入一个字符串、ArrayBuffer或Blob，如下：
```js
let socket = new WebSocket("ws://www.example.com/server.php");
let stringData = "Hello world!";
let arrayBufferData = Uint8Array.from(['f', 'o', 'o']);
let blobData = new Blob(['f', 'o', 'o']);
socket.send(stringData);
socket.send(arrayBufferData.buffer);
socket.send(blobData); 
```

服务器向客户端发送消息时，WebSocket 对象上会触发 message 事件。这个 message 事件与其他消息协议类似，可以通过 event.data 属性访问到有效载荷：
```js
socket.onmessage = function(event) {
 let data = event.data;
 // 对数据执行某些操作
}; 
```
与通过 send()方法发送的数据类似，event.data 返回的数据也可能是 ArrayBuffer 或 Blob。这由 WebSocket 对象的 binaryType 属性决定，该属性可能是"blob"或"arraybuffer"。


## 其它事件
WebSocket对象在连接生命周期中有可能触发3个其它事件：
- open：在连接成功建立时触发
- error：在发送错误时触发。连接无法存续。
- close：在连接关闭时触发
WebSocket 对象不支持 DOM Level 2 事件监听器，因此需要使用 DOM Level 0 风格的事件处理程序来监听这些事件：
```js
let socket = new WebSocket("ws://www.example.com/server.php");
socket.onopen = function() {
 alert("Connection established.");
};
socket.onerror = function() {
 alert("Connection error.");
};
socket.onclose = function() {
 alert("Connection closed.");
}; 
```
在这些事件中，只有 close 事件的 event 对象上有额外信息。这个对象上有 3 个额外属性：
- wasClean：布尔类型，表示连接是否干净关闭
- code：是一个来自服务器的数值状态码
- reason：一个字符串，包含服务器发来的消息。可以将这些信息显示给用户或记录到日志：
```js
socket.onclose = function(event) {
  console.log(`as clean? ${event.wasClean} Code=${event.code} Reason=${event.reason}`);
}; 
```

## 安全
在未经授权系统可以访问某个资源时，可以将其视为跨站点请求伪造（CSRF，cross-site request forgery）攻击。未授权系统会按照处理请求的服务器的要求伪装自己，Ajax应用程序，无论大小，都会受到CSRF攻击影响，包括无害的漏洞验证攻击和恶意的数据盗窃或数据破坏攻击。

关于安全防护Ajax相关URL的一般理论认为，需要验证请求发送者拥有对资源的访问权限。可以通过如下方式实现：
- 要求通过SSL访问能够被Ajax访问的资源。
- 要求每个请求都发送一个按约定算法计算好的令牌
以下手段对防护CSRF攻击是无效的：
- 要求POST而非GET请求（很容易修改请求方法）
- 使用来源URL验证来源（来源URL很容易伪造）
- 基于cookie验证（同样很容易伪造）



