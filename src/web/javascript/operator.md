---
title: 操作符
date: 2023-07-03
category:
  - javascript
---


<!-- more -->

## in

`in`操作符可以判断某个属性是否为指定对象的属性名，示例：

```js
const user = {
    name: "张三"
};

//属性 in 对象
console.log("name" in user);// true
console.log("age" in user);// false
```

## instanceof

`instanceof`操作符可以判断某个对象是否为另一个类的实例，示例：
```js
const d = new Date();

//实例对象 instanceof 类
console.log(d instanceof Date); //true
console.log(d instanceof Object); //true
console.log(d instanceof Array); //false

```

## typeof

`typeof`操作符返回一个任意值的结果，固定的九类结果：
| x              | typeof x    |
| :------------- | :---------- |
| undefined      | "undefined" |
| null           | "object"    |
| true或false    | "boolean"   |
| 任意数值或NaN  | "number"    |
| 任意BigInt     | "bigint"    |
| 任意字符串     | "string"    |
| 任意符号       | "symbol"    |
| 任意函数       | "function"  |
| 任意非函数对象 | "object"    |

语法：
```js
//typeof 任意值
console.log(typeof "");// string
console.log(typeof 3.14);// number
console.log(typeof {});// object
console.log(typeof []);// object
```

**in 和 instanceof**

相同点：
- 都会返回 boolean 的值

不同点：
- in：属性是否属于对象
- instanceof：对象是否属于某一类


**typeof**

返回string类型的结果

==注意：==针对`{}`和`[]`返回的结果都是object

## ? 条件式访问

```js
const user = null;

console.log(user.name);// TypeError

//如果不使用条件式访问操作符
const user = null;
if(user) {
    console.log(user.name);
}else{
    console.log(undefined);
}

//如果使用条件式访问
const user = null;
console.log(user?.name); //undefined
// 如果 ? 前的表达式为空值（null | undefined）则会返回undefined
```

## ?? 先定义操作符

弄清楚什么是先定义操作符，首先先了解什么是假值和逻辑或。

JS中有六个假值：undefined、null、0、""(''、``)、false、NaN

`逻辑或`：
```js
// || 逻辑或：假值 都会被认为假
console.log(0 || 1);// 1   当左侧假值判断为假的时候，那么会进入逻辑或，返回后面的结果。
```

`??`：
```js
// ?? 先定义操作符：只有undefined 和 null 会被认为为假
console.log(0 ?? 1);// 0
console.log(undefined ?? 1);// 1
console.log(null ?? 1);// 1
//只有undefined 和 null会被认定为假
```


## eval()

`eval()`本质是一个函数，可以接收一个参数，可以是表达式也可以是字符串：
```js
//得到结果
console.log(eval(2 + 3));// 5

//声明函数 fn
console.log(eval("function fn(){ console.log('Hello World !') }"))

fn();//Hello World !
```

## delete

`delete`操作符：删除指定对象属性或数组元素

```js
const user = {
    name: "张三"
};

// 从对象中删除 name 属性
delete user.name
console.log("name" in user); // false

const arr = ["张三", "李四", "王五"];
// 从数组中删除 0 下标元素
delete arr[0]
console.log(arr[0]);// undefined
```


