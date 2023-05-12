---
title: Math
date: 2021-03-20
category:
  - javascript
---



ECMAScript 提供了 Math 对象作为保存数学公式、信息和计算的地方。Math 对象提供了一些辅助计算的属性和方法。

<!-- more -->
:::warning 注意
Math 对象上提供的计算要比直接在 JavaScript 实现的快得多，因为 Math 对象上的计算使用了 JavaScript 引擎中更高效的实现和处理器指令。但使用 Math 计算的问题是精度会因浏览器、操作系统、指令集和硬件而异。
:::

## Math对象属性

Math对象右一些属性，主要用于保存数学中的一些特殊值。见下表：
| 属 性        | 说 明                 | 示例               |
| :----------- | :-------------------- | :----------------- |
| Math.E       | 自然对数的基数 e 的值 | 2.718281828459045  |
| Math.LN10    | 10 为底的自然对数     | 2.302585092994046  |
| Math.LN2     | 2 为底的自然对数      | 0.6931471805599453 |
| Math.LOG2E   | 以 2 为底 e 的对数    | 1.4426950408889634 |
| Math.LOG10E  | 以 10 为底 e 的对数   | 0.4342944819032518 |
| Math.PI      | π 的值                | 3.141592653589793  |
| Math.SQRT1_2 | 1/2 的平方根          | 0.7071067811865476 |
| Math.SQRT2   | 2 的平方根            | 1.4142135623730951 |

## min()和max()方法
min()和 max()方法用于确定一组数值中的最小值和最大值。这两个方法都接收任意多个参数。

```js
let max = Math.max(3, 54, 32, 16);
console.log(max); // 54
let min = Math.min(3, 54, 32, 16);
console.log(min); // 3

//我觉得下面方法更好
let values = [1, 2, 3, 4, 5, 6, 7, 8];
let max = Math.max(...val); 
```

## 舍入方法
- Math.ceil()方法始终向上舍入为最接近的整数。
- Math.floor()方法始终向下舍入为最接近的整数。
- Math.round()方法执行四舍五入。
- Math.fround()方法返回数值最接近的单精度（32 位）浮点值表示。

```js
console.log(Math.ceil(25.9)); // 26
console.log(Math.ceil(25.5)); // 26
console.log(Math.ceil(25.1)); // 26

console.log(Math.floor(25.9)); // 25
console.log(Math.floor(25.5)); // 25
console.log(Math.floor(25.1)); // 25 

console.log(Math.round(25.9)); // 26
console.log(Math.round(25.5)); // 26
console.log(Math.round(25.1)); // 25

console.log(Math.fround(0.4)); // 0.4000000059604645
console.log(Math.fround(0.5)); // 0.5
console.log(Math.fround(25.9)); // 25.899999618530273
```

## random()
Math.random()方法返回一个 0~1 范围内的随机数，其中包含 0 但不包含 1。

示例：
```js
function selectFrom(lowerValue, upperValue) {
 let choices = upperValue - lowerValue + 1;
 return Math.floor(Math.random() * choices + lowerValue);
}
let num = selectFrom(2,10);
console.log(num); // 2~10 范围内的值，其中包含 2 和 10 
```

:::warning 注意
Math.random()方法在这里出于演示目的是没有问题的。如果是为了加密而需要生成随机数（传给生成器的输入需要较高的不确定性），那么建议使用 window.crypto.getRandomValues()。
:::

window.crypto.getRandomValues()语法：
```js
cryptoObj.getRandomValues(typedArray);
```
typedArray:是一个基于整数的 TypedArray，它可以是 Int8Array、Uint8Array、Int16Array、 Uint16Array、 Int32Array 或者 Uint32Array。在数组中的所有的元素会被随机数重写。（注释：生成的随机数储存在 typedArray 数组上。）

示例：
```js
/* 假设 window.crypto.getRandomValues 可用 */

var array = new Uint32Array(10);
window.crypto.getRandomValues(array);

console.log("Your lucky numbers:");
for (var i = 0; i < array.length; i++) {
    console.log(array[i]);
}

```

==待了解：==Int8Array、Uint8Array、Int16Array、 Uint16Array、 Int32Array 或者 Uint32Array含义以及区别


## 其它方法
| 方 法               | 说 明                            |
| :------------------ | :------------------------------- |
| Math.abs(x)         | 返回 x 的绝对值                  |
| Math.exp(x)         | 返回 Math.E 的 x 次幂            |
| Math.expm1(x)       | 等于 Math.exp(x) - 1             |
| Math.log(x)         | 返回 x 的自然对数                |
| Math.log1p(x)       | 等于 1 + Math.log(x)             |
| Math.pow(x, power)  | 返回 x 的 power 次幂             |
| Math.hypot(...nums) | 返回 nums 中每个数平方和的平方根 |
| Math.clz32(x)       | 返回 32 位整数 x 的前置零的数量  |
| Math.sign(x)        | 返回表示 x 符号的 1、0、-0 或-1  |
| Math.trunc(x)       | 返回 x 的整数部分，删除所有小数  |
| Math.sqrt(x)        | 返回 x 的平方根                  |
| Math.cbrt(x)        | 返回 x 的立方根                  |
| Math.acos(x)        | 返回 x 的反余弦                  |
| Math.acosh(x)       | 返回 x 的反双曲余弦              |
| Math.asin(x)        | 返回 x 的反正弦                  |
| Math.asinh(x)       | 返回 x 的反双曲正弦              |
| Math.atan(x)        | 返回 x 的反正切                  |
| Math.atanh(x)       | 返回 x 的反双曲正切              |
| Math.atan2(y, x)    | 返回 y/x 的反正切                |
| Math.cos(x)         | 返回 x 的余弦                    |
| Math.sin(x)         | 返回 x 的正弦                    |
| Math.tan(x)         | 返回 x 的正切                    |



:::warning
即便这些方法都是由 ECMA-262 定义的，对正弦、余弦、正切等计算的实现仍然取决于浏览器，因为计算这些值的方式有很多种。结果，这些方法的精度可能因实现而异。
:::
