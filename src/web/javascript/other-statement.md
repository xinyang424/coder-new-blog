---
title: 其它语句
date: 2022-02-15
category:
  - javascript
---


<!-- more -->

## with

`with`混淆指定代码块的作用域指向。

```js
const user = {
    name: "张三"
};

with (user) {
    //使用 user 混淆作用域，这里的 name 会被理解为 user.name
    console.log(name);
}
```

## debugger

## use strict

