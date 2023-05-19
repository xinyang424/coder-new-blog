---
title: Beacon API
date: 2023-05-16
category:
  - javascript
---

为了把尽量多的页面信息传到服务器，很多分析工具需要在页面生命周期中尽量晚的时候向服务器发送遥测或分析数据。因此，理想情况下是通过浏览器的unload事件发送网络请求。这个事件表示用户要离开当前页面，不会再生成别的有用信息。  
<!-- more -->
在unload事件触发时，分析工具要停止收集信息并把收集到的数据发给服务器。这时候有一个问题，因为unload事件对浏览器意味着没有理由再发送任何结果的未知网络请求（因为页面将被销毁）。例如：在unload事件处理程序中创建的任何异步请求都会被浏览器取消。为此，异步XMLHttpRequest或fetch不适合这个任务。分析工具可以使用同步XMLHttpRequest强制发送请求，但这样做会导致用户体验问题。浏览器会因为要等待unload事件处理程序完成而延迟导航到下一个页面。

为解决这个问题，W3C 引入了补充性的 Beacon API。这个 API 给 navigator 对象增加了一个sendBeacon()方法。这个简单的方法接收一个 URL 和一个数据有效载荷参数，并会发送一个 POST 请求。可选的数据有效载荷参数有 ArrayBufferView、Blob、DOMString、FormData 实例。如果请求成功进入了最终要发送的任务队列，则这个方法返回 true，否则返回 false。示例：

::: normal-demo 请求示例
```html
<p></p>
```

```js
// 发送 POST 请求
// URL: 'https://example.com/analytics-reporting-url'
// 请求负载：'{foo: "bar"}'

const p = document.querySelector("p");
const res = navigator.sendBeacon("https://example.comanalytics-reporting-url", '{foo: "bar"}');
console.log(res);
if (res) {
  p.innerText = "接收到请求了";
} else {
  p.innerText = "未接收到请求";
}
```
:::
这个方法虽然看起来只不过是POST请求的一个语法糖，但它有几个重要的特性：
- sendBeacon()并不是只能在页面生命周期末尾使用，而是任何时候都可以使用。
- 调用 sendBeacon()后，浏览器会把请求添加到一个内部的请求队列。浏览器会主动地发送队列中的请求。
- 浏览器保证在原始页面已经关闭的情况下也会发送请求。
- 状态码、超时和其他网络原因造成的失败完全是不透明的，不能通过编程方式处理。
- 信标（beacon）请求会携带调用 sendBeacon()时所有相关的 cookie。