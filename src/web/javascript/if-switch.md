---
title: 条件语句
date: 2022-02-01
category:
  - javascript
---

more

## if语句
if 语句是使用最频繁的语句之一，语法如下：  

if (condition) statement1 else statement2

这里的条件（condition）可以是任何表达式，并且求值结果不一定是布尔值。ECMAScript 会自动调用`Boolean()`函数将这个表达式的值转换为布尔值。如果条件求值为 true，则执行语句statement1；如果条件求值为 false，则执行语句 statement2。这里的语句可能是一行代码，也可能是一个代码块（即包含在一对花括号中的多行代码）。

也可以像这样连续使用多个 if 语句：
if (condition1) statement1 else if (condition2) statement2 else statement3

## switch 语句
基本结构：
```js
switch (expression) {
 case value1:
 statement
 break;
 case value2:
 statement
 break;
 case value3:
 statement
 break;
 case value4:
 statement
 break;
 default:
 statement
}
```

使用示例：
```js
switch (i) {
 case 25:
 console.log("25");
 break;
 case 35:
 console.log("35");
 break;
 case 45:
 console.log("45");
 break;
 default:
 console.log("Other");
} 
```
等价于：
```js
if (i == 25) {
 console.log("25");
} else if (i == 35) {
 console.log("35");
} else if (i == 45) {
 console.log("45");
} else {
 console.log("Other");
} 
```

**注意：**
switch 语句在比较每个条件的值时会使用全等操作符，因此不会强制转换数据类型（比如，字符串"10"不等于数值 10）。