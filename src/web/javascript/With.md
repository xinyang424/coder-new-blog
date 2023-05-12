---
title: with
date: 2022-02-01
category:
  - javascript
---


相信大多数人都不常用到with语句，但是有些场景用出来，或许真能让你代码提升一个档次。

<!-- more -->

源代码：
```js
let qs = location.search.substring(1);
let hostName = location.hostname;
let url = location.href; 
```

上面代码中的每一行都用到了 location 对象。如果使用 with 语句，就可以少写一些代码：

```js
//示例地址 http://127.0.0.1:5500/demo.html?id=1
with (location) {
  let qs = search.substring(1);
  //search ?id=1
  let hostName = hostname;
  let url = href;
  console.log(qs, hostName, url);//id=1 127.0.0.1 http://127.0.0.1:5500/demo.html?id=1
}
```