---
title: cookie
date: 2022-08-15
category:
  - javascript
---

HTTP cookie 通常也叫作cookie，最初用于在客户端存储会话信息。这个规范要求服务器在响应 HTTP 请求时，通过发送Set-Cookie HTTP 头部包含会话信息。

<!-- more -->

下面是包含这个头部的一个HTTP响应：
```text
HTTP/1.1 200 OK
Content-type: text/html
Set-Cookie: name=value
Other-header: other-header-value
```

这个HTTP 响应会设置一个名为"name"，值为"value"的cookie。名和值在发送时都会经过URL编码。浏览器会存储这些会话信息，并在之后的每个请求中都会通过HTTP 头部cookie 再将它们发回服务器，比如：
```text
GET /index.jsl HTTP/1.1
Cookie: name=value
Other-header: other-header-value
```
这些发送回服务器的额外信息可用于唯一标识发送请求的客户端。

## 限制
cookie 是与特定域绑定的。设置cookie后，它会与请求一起发送到创建它的域。这个限制能保证cookie中存储的信息只被认可的接收者开放，不被其它域访问。

因为cookie存储在客户端机器上，所以未保证它不会被恶意利用，浏览器会施加限制。同时，cookie也不会占用太多磁盘空间。
通常，只要遵循以下大致的限制，就不会在任何浏览器中碰到问题：
- 不超过300个cookie
- 每个cookie不超过4096字节
- 每个域不超过20个cookie
- 每个域不超过81920字节。
  
每个域能设置的cookie总数也是受限的，但不同浏览器的限制不同。例如：
- 最新版IE和Edge限制每个域不超过50个cookie；
- 最新版Firefox限制每个域不超过150个cookie；
- 最新版Opera限制每个域不超过180个cookie；
- Safari和chrome对每个域的cookie数没有硬性限制。


如果cookie 总数超过了单个域的上限，浏览器就会删除之前设置的cookie：
- IE 和Opera 会按照最近最少使用（LRU，Least Recently Used）原则删除之前的cookie，以便为新设置的cookie 腾出空间。
- Firefox好像会随机删除之前的cookie


==大多数浏览器对cookie 的限制是不超过4096 字节，上下可以有一个字节的误差。为跨浏览器兼容，最好保证cookie 的大小不超过4095 字节。这个大小限制适用于一个域的所有cookie，而不是单个cookie。==

## cookie构成
- 名称：唯一标识cookie的名称，cookie名不区分大小写，因此`myCookie`和`MyCookie`是同一个名称。不过，实践中最好将cookie名当成区分大小写来对待，因为一些服务器软件可能这样对待它们。cookie名必须经过URL编码。
- 值：存储在cookie里的字符串值。这个值必须经过URL编码。
- 域
- 路径
- 过期时间
- 安全标志