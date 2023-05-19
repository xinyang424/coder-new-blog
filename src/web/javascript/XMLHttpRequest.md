---
title: XMLHttpRequest
date: 2022-06-15
category:
  - javascript
---

IE5 是第一个引入 XHR 对象的浏览器。这个对象是通过 ActiveX 对象实现并包含在 MSXML 库中的。为此，XHR 对象的3 个版本在浏览器中分别被暴露为MSXML2.XMLHttp、MSXML2.XMLHttp.3.0和MXSML2.XMLHttp.6.0。

所有现代浏览器都通过XMLHttpRequest 构造函数原生支持XHR 对象：
`let xhr = new XMLHttpRequest();`

<!-- more -->

## 使用 XHR 
使用XHR对象首先要调用 open() 方法，这个方法接收三个参数：请求类型（"get"、"post"等）、请求URL，以及表示请求是否异步的布尔值。示例：
```js
xhr.open("get", "example.php", false);
```
这行代码，首先，这里的URL是相对于代码所在页面的，当然也可以使用绝对URL。其次，调用open()不会时间发生请求，只是为发送请求做好准备。
:::warning 注意
 只能访问同源URL，也就是域名相同、端口相同、协议相同。如果请求的URL与发送请求的页面在任何方面有所不同，则会抛出安全错误。
:::

发送定义好的请求，必须像下面这样调用send()方法：
```js
xhr.open("get", "example.txt", false)
xhr.send(null);
```
send()方法接收一个参数，是作为请求体发送的数据。如果不需要发送请求体，则必须传null，因为这个参数在某些浏览器中是必需的。调用send()之后，请求就会发送到服务器。

因为这个请求是同步的，所以JavaScript 代码会等待服务器响应之后再继续执行。收到响应后，XHR对象的以下属性会被填充上数据。
- `responseText`：作为响应体返回的文本。
- `responseXML`：如果响应的内容类型是"text/xml"或"application/xml"，那就是包含响应数据的XML DOM文档。
- `status`：响应的HTTP状态。
- `statusText`：响应的HTTP状态描述。

收到响应后，第一步要检查status 属性以确保响应成功返回。一般来说，HTTP 状态码为2xx 表示成功。此时，responseText 或responseXML（如果内容类型正确）属性中会有内容。如果HTTP状态码是304，则表示资源未修改过，是从浏览器缓存中直接拿取的。当然这也意味着响应有效。为确保收到正确的响应，应该检查这些状态，如下所示：
```js
xhr.open("get", "example.txt", false);
xhr.send(null);
if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
alert(xhr.responseText);
} else {
alert("Request was unsuccessful: " + xhr.status);
}
```

虽然可以像前面的例子一样发送同步请求，但多数情况下最好使用异步请求，这样可以不阻塞JavaScript 代码继续执行。XHR 对象有一个readyState 属性，表示当前处在请求/响应过程的哪个阶段。这个属性有如下可能的值。
- 0：未初始化。尚未调用open()方法
- 1：已打开。已调用open()方法，尚未调用send()方法
- 2：已发送。已调用send()方法，尚未收到响应。
- 3：接收中。已经收到部分响应。
- 4：完成。已经收到所有响应，可以使用了

每次readyState 从一个值变成另一个值，都会触发readystatechange 事件。可以借此机会检查readyState 的值。一般来说，我们唯一关心的readyState 值是4，表示数据已就绪。为保证跨浏览器兼容，onreadystatechange 事件处理程序应该在调用open()之前赋值。示例：
```js
let xhr = new XMLHttpRequest();
xhr.onreadystatechange = function() {
  if (xhr.readyState == 4) {
    if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
      alert(xhr.responseText);
    } else {
      alert("Request was unsuccessful: " + xhr.status);
    }
  }
};
xhr.open("get", "example.txt", true);
xhr.send(null);
```
与其他事件处理程序不同，onreadystatechange 事件处理程序不会收到event对象。（onreadystatechange没有event对象）

:::warning 注意
由于onreadystatechange 事件处理程序的作用域问题，这个例子在onreadystatechange事件处理程序中使用了xhr 对象而不是this 对象。使用this 可能导致功能失败或导致错误，取决于用户使用的是什么浏览器。因此还是使用保存XHR 对象的变量更保险一些。
:::

在收到响应之前如果想取消异步请求，可以调用abort()方法：
`xhr.abort();`

:::warning 注意
调用这个方法后，XHR 对象会停止触发事件，并阻止访问这个对象上任何与响应相关的属性。中断请求后，应该取消对XHR 对象的引用。由于内存问题，不推荐重用XHR 对象。
:::

## HTTP头部

每个HTTP请求和响应都会携带一些头部字段，XHR对象会通过一些方法暴露与请求和响应相关的头部字段。

- Accept：浏览器可以处理的内容类型。
- Accept-Charset：浏览器可以显示的字符集。
- Accept-Encoding：浏览器可以处理的压缩编码类型。
- Accept-Language：浏览器使用的语言。
- Connection：浏览器与服务器的连接类型。
- Cookie：页面中设置的Cookie。
- Host：发送请求的页面所在的域。
- Referer：发送请求的页面的URI。注意，这个字段在HTTP 规范中就拼错了，所以考虑到兼容性也必须将错就错。（正确的拼写应该是Referrer。）
- User-Agent：浏览器的用户代理字符串。

虽然不同浏览器发送的确切头部字段可能各不相同，但这些通常都是会发送的。如果需要发送额外的请求头部，可以使用setRequestHeader()方法。这个方法接收两个参数：头部字段的名称和值。为保证请求头部被发送，必须在open()之后、send()之前调用setRequestHeader()，如下面的例子所示：
```js
let xhr = new XMLHttpRequest();
xhr.onreadystatechange = function() {
  if (xhr.readyState == 4) {
    if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
      alert(xhr.responseText);
    } else {
      alert("Request was unsuccessful: " + xhr.status);
    }
  }
};
xhr.open("get", "example.php", true);
xhr.setRequestHeader("MyHeader", "MyValue");
xhr.send(null);
```

可以使用`getResponseHeader()`方法从XHR 对象获取响应头部，只要传入要获取头部的名称即可。如果想取得所有响应头部，可以使用`getAllResponseHeaders()`方法，这个方法会返回包含所有响应头部的字符串。下面是调用这两个方法的例子：
```js
let myHeader = xhr.getResponseHeader("MyHeader");
let allHeaders xhr.getAllResponseHeaders();
```

服务器可以使用头部向浏览器传递额外的结构化数据。getAllResponseHeaders()方法通常返回
类似如下的字符串：
```text
Date: Sun, 14 Nov 2004 18:04:03 GMT
Server: Apache/1.3.29 (Unix)
Vary: Accept
X-Powered-By: PHP/4.3.8
Connection: close
Content-Type: text/html; charset=iso-8859-1
```

## GET 请求
最常用的请求方法是GET请求，用于向服务器查询某些信息。必要时，需要在GET请求的URL后面添加查询字符串参数。对XHR而言，查询字符串必须正确编码后添加到URL后面，然后再传给open()方法。  
查询字符串中每个名和值都必须使用`encodeURIComponent()`编码，所有名/值对必须以和号（&）分隔，如下示例：  
`xhr.open("get", "example.php?name1=value1", true);`  
可以使用以下函数将查询字符串参数添加到现有的URL末尾：
```js
function addURLParam(url, name, value) {
 url += (url.indexOf("?") == -1 ? "?" : "&");
 url += encodeURIComponent(name) + "=" + encodeURIComponent(value);
 return url;
} 

let url = "example.php";
// 添加参数
url = addURLParam(url, "name", "Nicholas");
url = addURLParam(url, "book", "Professional JavaScript");
// 初始化请求
xhr.open("get", url, false);
```

这里使用 addURLParam()函数可以保证通过 XHR 发送请求的 URL 格式正确。

## POST请求
第二个常用请求方式是POST请求，用于向服务器发送应该保存的数据。每个POST请求都应该在请求体中携带提交的数据，而GET请求则不然。POST请求的请求体可以包含非常多的数据，而且数据可以是任意格式。要初始化POST请求，open()方法的第一个参数要传“post”，如：
```js
xhr.open("post", "example.php", true); 
```
接下来就是给send()方法传入需要发送的数据。