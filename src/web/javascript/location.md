---
title: location 对象
date: 2022-06-16
category:
  - javascript
---

location是最有用的DOM对象之一，提供了当前窗口中加载文档的信息，以及通常的导航功能。
<!-- more -->
这个对象的独特的地方在于，它既是window的属性，也是document的属性，即`window.location`和`document.location`指向同一个对象。location对象不仅保存着当前加载文档的信息，也保存着把URL解析为离散片段后能够通过属性访问信息。

假设浏览器当前加载的 URL 是 http://foouser:barpassword@www.wrox.com:80/WileyCDA/?q=javascript#contents，location对象的内容如下表：
| 属性              | 值                                                       | 说明                                                         |
| :---------------- | :------------------------------------------------------- | :----------------------------------------------------------- |
| location.hash     | "#contents"                                              | URL 散列值（井号后跟零或多个字符），如果没有则为空字符串     |
| location.host     | "www.wrox.com:80"                                        | 服务器名及端口号                                             |
| location.hostname | "www.wrox.com"                                           | 服务器名                                                     |
| location.href     | "http://www.wrox.com:80/WileyCDA/?q=javascript#contents" | 当前加载页面的完整 URL。location 的 toString()方法返回这个值 |
| location.pathname | "/WileyCDA/"                                             | URL 中的路径和（或）文件名                                   |
| location.port     | "80"                                                     | 请求的端口。如果 URL中没有端口，则返回空字符串               |
| location.protocol | "http:"                                                  | 页面使用的协议。通常是"http:"或"https:"                      |
| location.search   | "?q=javascript"                                          | URL 的查询字符串。这个字符串以问号开头                       |
| location.username | "foouser"                                                | 域名前指定的用户名                                           |
| location.password | "barpassword"                                            | 域名前指定的密码                                             |
| location.origin   | "http://www.wrox.com"                                    | URL 的源地址。只读                                           |

## 查询字符串
location 的多数信息都可以通过上面的属性获取。但是 URL 中的查询字符串并不容易使用。虽然location.search 返回了从问号开始直到 URL 末尾的所有内容，但没有办法逐个访问每个查询参数。

下面代码示例解析查询的字符串，并返回一个以每个查询参数为属性的对象：
```js
let getQueryStringArgs = function () {
  // 取得没有开头问号的查询字符串
  let qs = location.search.length > 0 ? location.search.substring(1) : "",
    // 保存数据的对象
    args = {};
  // 把每个参数添加到 args 对象
  for (let item of qs.split("&").map(kv => kv.split("="))) {
    let name = decodeURIComponent(item[0]),
      value = decodeURIComponent(item[1]);
    if (name.length) {
      args[name] = value;
    }
  }
  return args;
};
console.log(getQueryStringArgs());
```

**URLSearchParams**
URLSearchParams 提供了一组标准 API 方法，通过它们可以检查和修改查询字符串。给URLSearchParams 构造函数传入一个查询字符串，就可以创建一个实例。这个实例上暴露了 get()、set()和 delete()等方法，可以对查询字符串执行相应操作。下面来看一个例子：
```js
let qs = "?q=javascript&num=10";

let searchParams = new URLSearchParams(qs);

alert(searchParams.toString()); // " q=javascript&num=10"
searchParams.has("num"); // true
searchParams.get("num"); // 10

searchParams.set("page", "3");
alert(searchParams.toString()); // " q=javascript&num=10&page=3"

searchParams.delete("q");
alert(searchParams.toString()); // " num=10&page=3"
```

大多数支持 URLSearchParams 的浏览器也支持将 URLSearchParams 的实例用作可迭代对象：
```js
let qs = "?q=javascript&num=10";

let searchParams = new URLSearchParams(qs);

for (let param of searchParams) {
 console.log(param);
}
// ["q", "javascript"]
// ["num", "10"] 
```

## 操作地址
可以通过修改 location 对象修改浏览器的地址。首先，最常见的是使用 assign()方法并传入一个 URL，如下所示：
```js
location.assign("http://www.wrox.com"); 
```
这行代码会立即启动导航到新 URL 的操作，同时在浏览器历史记录中增加一条记录。如果给location.href 或 window.location 设置一个 URL，也会以同一个 URL 值调用 assign()方法。比如，下面两行代码都会执行与显式调用 assign()一样的操作：
```js
window.location = "http://www.wrox.com";
location.href = "http://www.wrox.com";
```
在这 3 种修改浏览器地址的方法中，设置 location.href 是最常见的。  
修改 location 对象的属性也会修改当前加载的页面。其中，hash、search、hostname、pathname和 port 属性被设置为新值之后都会修改当前 URL，如下面的例子所示：
```js
// 假设当前 URL 为 http://www.wrox.com/WileyCDA/

// 把 URL 修改为 http://www.wrox.com/WileyCDA/#section1
location.hash = "#section1";

// 把 URL 修改为 http://www.wrox.com/WileyCDA/?q=javascript
location.search = "?q=javascript";

// 把 URL 修改为 http://www.somewhere.com/WileyCDA/
location.hostname = "www.somewhere.com";

// 把 URL 修改为 http://www.somewhere.com/mydir/
location.pathname = "mydir";

// 把 URL 修改为 http://www.somewhere.com:8080/WileyCDA/
location.port = 8080; 
```

除了 hash 之外，只要修改 location 的一个属性，就会导致页面重新加载新 URL。
:::warning 注意
修改 hash 的值会在浏览器历史中增加一条新记录。在早期的 IE 中，点击“后退”和“前进”按钮不会更新 hash 属性，只有点击包含散列的 URL 才会更新 hash 的值。
:::

在上面提到的方式修改URL之后，浏览器历史记录中会增加相应的记录。但当用户单击“后退”按钮时，会导航到前一个页面。如果不希望增加历史记录，可以使用replace()方法。这个方法同样接收一个url参数。但加载后不会增加历史记录。如下所示。当调用replace()之后，页面跳转到新页面，此时用户无法回到前一页，因为无历史记录：
```html
<!DOCTYPE html>
<html>
<head>
 <title>You won't be able to get back here</title>
</head>
<body>
 <p>Enjoy this page for a second, because you won't be coming back here.</p>
 <script>
 setTimeout(() => location.replace("http://www.wrox.com/"), 1000);
 </script>
</body>
</html>
```
最后一个修改地址方法是reload()，它能重新加载当前显示的页面。使用如下：
```js
location.reload(); // 重新加载，可能是从缓存加载
location.reload(true); // 重新加载，从服务器加载
```
脚本中位于 reload()调用之后的代码可能执行也可能不执行，这取决于网络延迟和系统资源等因素。为此，最好把 reload()作为最后一行代码。
