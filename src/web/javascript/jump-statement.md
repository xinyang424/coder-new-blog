---
title: 跳转语句
date: 2022-02-01
category:
  - javascript
---


<!-- more -->

## break

## continue

## return

## yield

## throw

`throw`作用是抛出一个异常：
```js
function fn(n) {
    if (n < 0) {
        throw new Error("n 的值不能小于 0")
    }
}

fn(-1)
```

## try/catch/finally

`try/catch`的作用是捕获异常：
```js
function fn() {
    try {
        //try 中的代码出现异常会被捕获
        JSON.parse("张三");
    } catch (err) {
        console.log(err); // SyntaxError: Unexpected token '张', '张三' is not valid JSON
    } finally {
        //无论是否捕获了异常，finally 总会被执行
        console.log("finally");
    }
};

fn()
```








