---
title: HTML
date: 2023-06-28
---

## 无样式内容闪烁（FOUC）Flash of Unstyle Content

&emsp;&emsp;出现FOUC的原因是CSS文件中使用了`@import`关键字，在CSS文件中使用`@import`关键字会等到文档加载后再加载CSS样式表。因此，在页面DOM加载完成到CSS导入完成之间会有一段时间页面上内容是没有样式的。

&emsp;&emsp;解决办法：使用link标签加载CSS样式文件，因为link是顺序加载的，这样页面会等到CSS下载完后再下载HTML文件，这样先布局好，就不会出现FOUC问题。


## title 和 h1 的区别

&emsp;&emsp;title 属性没有明确意义只表示是个标题，h1 则表示层次明确的标题，对页面信息的抓取也有很大的影响。

## cookies sessionStorage localStorage 的区别

&emsp;&emsp;SessionStorage， LocalStorage， Cookie 这三者都可以被用来在浏览器端存储数据，而且都是字符串类型的键值对。区别在于前两者属于 HTML5 WebStorage，创建它们的目的便于客户端存储数据。而 cookie 是网站为了标示用户身份而储存在用户本地终端上的数据（通常经过加密）。cookie 数据始终在同源（协议、主机、端口相同）的 http 请求中携带（即使不需要），会在浏览器和服务器间来回传递。

**存储大小：**\
1. cookie 数据大小不超过 4k。
2. sessionStorage 和 localStorage 虽然也有存储大小的限制，但比 cookie 大得多，可以达到 5M 或更大。

**有效时间：**\
1. localStorage 存储持久数据，浏览器关闭后数据不丢失除非主动删除数据。
2. sessionStorage 数据再页面会话结束时会被请求。页面会话在浏览器打开期间一直保持，并且重新加载或恢复页面仍会保持原来的页面会话。在新标签或窗口打开一个页面时会在顶级浏览上下文中初始化一个新的会话。
3. cookie 设置的 cookie 过期时间之前一直有效，即时浏览器关闭

**作用域：**\
1. sessionStorage 只在同源的同窗口（或标签页）中共享数据，也就是只在当前会话中共享。
2. localStorage 在所有同源窗口中都是共享的。
3. cookie 在所有同源窗口中都是共享的。

## 选择器的优先级



!important > 行内样式 > id选择器 > class选择器 > 标签选择器 > 通配符 > 继承

在选择器相同的情况下，如同为id选择器，越靠下写的样式越比靠上写的样式权重大。


## 如何进行网站优化

`content` 方面：
1. 减少http请求：合并文件、css精灵、inline Image
2. 减少DNS查询：DNS缓存、将资源分布到恰当数量的主机名
3. 减少DOM元素数量

`Server`方面：
1. 使用CDN加速
2. 配置ETag
3. 对组件使用Gzip压缩

`Cookie`方面：
1. 减少cookie大小

`css`方面

1、 将样式表放到页面顶部

2、 不使用CSS表达式

3、 使用<link>不使用@import

`Javascript`方面

1、 将脚本放到页面底部

2、 将`javascript`和`css`从外部引入

3、 压缩`javascript`和`css`

4、 删除不需要的脚本

5、 减少`DOM`访问

图片方面

1、 优化图片：根据实际颜色需要选择色深、压缩

2、 优化`css`精灵

3、 不要在`HTML`中拉伸图片

