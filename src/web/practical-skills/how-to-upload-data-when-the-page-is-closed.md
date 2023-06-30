---
title: 在页面关闭时如何上传数据
date: 2023-06-30
category:
  - 实用技巧
---

以“前端监控上传数据”业务场景，重点在页面关闭时，将监控数据上传到服务端的解决方案。

<!-- more -->

🌰：表单提交后，页面跳转时需要上报数据，主要涉及到4种方案：
- 同步XMLHttpRequest
- img.src
- navigator.sendBeason
- fetch keepalive


## 1. 同步XMLHttpRequest

```js
const data =JSON.stringify({
    time: performance.now()
})

var xhr = new XMLHttpRequest();

//第三个参数false，表示当前请求是同步
xhr.open("post", "https://api.coder-new.cn/test", false);
xhr.setRequestHeader("content-type", "application/json");   

xhr.onreadystatechange = function() {
    //发送成功后，页面已销毁，所以这里执行不了
}

xhr.send(data);
```

为什么同步XMLHttpRequest可以在页面关闭时上传数据？

同步请求阻止代码的执行，这会导致屏幕上出现“冻结”和无响应的用户体验。在新版的Chrome（版本号大于80）官方的公告已经不支持。

缺点：
- 用户体验差，会阻塞页面切换
- 只有旧版的浏览器支持
- 无法读取response的返回值



## 2. img.src
创建一个元素，并设置src，部分的浏览器，会延迟卸载当前页面，优先加载图像。
```js
var data = JSON.stringify({
    time: performance.now()
});

const img = new Image();
img.src = `https://api.coder-new.cn/test?${JSON.stringify(data)}`;
```
缺点：
- 数据传输不可靠，有可能浏览器卸载当前页面，直接杀掉图像请求。
- 只能发起Get请求。
- 数据大小请求限制。

## 3. navigator.sendBeacon
通过HTTP POST请求，将少量数据使用异步的方式，发送到服务器。

发送数据：浏览器自动判断合适的时机进行发送。

```js
function reportEvent() {
    const url = "https://api.coder-new.cn/test";
    const data = JSON.stringify({
        time: performance.now()
    });
    navigator.sendBeacon(url, data);
}

document.addEventListener("visibilitychange", function() {
    if(document.visiblityState === "hidden"){
        reportEvent();
    }
})
```
不会产生阻塞，影响当前页面的卸载。不影响下个新页面的加载，不存在性能问题。另外，数据传输可靠。

缺点：
- 只能发起POST请求
- 无法自定义请求头参数
- 数据大小有限制（Chrome限制大小为64KB）
- 只能在window事件visibilitychange和beforeunload中使用，其它事件中回调，会丢失数据。

## 4. fetch keepalive

:::note MDN web docs的描述如下
The keepalive option can be used to allow the request to outlive the page. Fetch with the keepalive flag is a replacement for the `Navigator.sendBeacon()` API.
:::

标记`keepalive`的fetch请求允许在页面卸载后执行：
```js
const url = "https://api.coder-cn.cn/test";
const data = JSON.stringify({
    time:performance.now()
});

fetch(url, {
    method: "POST",
    body: data,
    headers: {
        "Content-Type": "application/json"
    },
    keepalive: true,
});
```
