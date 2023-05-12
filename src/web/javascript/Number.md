---
title: Number
date: 2022-02-15
category:
  - javascript
---

<!-- more -->

## 声明Number类型
```js
let numberObject = new Number(10);
let num = 10;

//两种声明方式的区别
console.log(numberObject instanceof Object); //true
console.log(num instanceof Object); //false

numberObject.message = "nice";
num.message = "nice";
console.log(numberObject.message, num.message); //nice  undefined

```



## xx.toString()

示例代码：
```js
let num = 10;
console.log(num.toString()); // "10"
console.log(num.toString(2)); // "1010"
console.log(num.toString(8)); // "12"
console.log(num.toString(10)); // "10"
console.log(num.toString(16)); // "a" 
```

## xx.toFixed()
```js
let num = 10;
console.log(num.toFixed(2)); // "10.00"

let num = 10.005;
console.log(num.toFixed(2)); // "10.01"
```

## xx.toExponential()
toExponential()，返回以科学记数法（也称为指数记数法）表示的数值字符串。与 toFixed()一样，toExponential()也接收一个参数，表示结果中小数的位数。
```js
let num = 99;
console.log(num.toPrecision(1)); // "1e+2"
console.log(num.toPrecision(2)); // "99"
console.log(num.toPrecision(3)); // "99.0"
```
在这个例子中，首先要用 1 位数字表示数值 99，得到"1e+2"，也就是 100。

因为 99 不能只用 1 位数字来精确表示，所以这个方法就将它舍入为 100，这样就可以只用 1 位数字（及其科学记数法形式）来表示了。

用 2 位数字表示 99 得到"99"，用 3 位数字则是"99.0"。本质上，toPrecision()方法会根据数值和精度来决定调用 toFixed()还是 toExponential()。

为了以正确的小数位精确表示数值，这 3 个方法都会向上或向下舍入。


## Number.isInteger(xx)
ES6 新增了 Number.isInteger()方法，用于辨别一个数值是否保存为整数。有时候，小数位的 0可能会让人误以为数值是一个浮点值：
```js
console.log(Number.isInteger(1)); // true
console.log(Number.isInteger(1.00)); // true
console.log(Number.isInteger(1.01)); // false
```

## Number.isSafeInteger(xx)
IEEE 754 数值格式有一个特殊的数值范围，在这个范围内二进制值可以表示一个整数值。这个数值范围从 Number.MIN_SAFE_INTEGER（253 + 1）到 Number.MAX_SAFE_INTEGER（253  1）。对超出这个范围的数值，即使尝试保存为整数，IEEE 754 编码格式也意味着二进制值可能会表示一个完全不同的数值。为了鉴别整数是否在这个范围内，可以使用 Number.isSafeInteger()方法：
```js
console.log(Number.isSafeInteger(-1 * (2 ** 53))); // false
console.log(Number.isSafeInteger(-1 * (2 ** 53) + 1)); // true
console.log(Number.isSafeInteger(2 ** 53)); // false
console.log(Number.isSafeInteger((2 ** 53) - 1)); // true 
```


## Number(xx)规则转换

```js
console.log(Number(1));             // 1
console.log(Number("1"));           // 1
console.log(Number("1a"));          // NaN
console.log(Number("a1"));          // NaN
console.log(Number("aa"));          // NaN
console.log(Number(null));          // 0
console.log(Number(undefined));     // NaN
console.log(Number(NaN));           // NaN
console.log(Number(true));          // 1
console.log(Number(false));         // 0
```


