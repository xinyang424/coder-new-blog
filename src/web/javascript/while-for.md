---
title: 循环
date: 2022-02-01
category:
  - javascript
---

<!-- more -->

## do-while语句

使用示例：
```js
let i = 0;
do {
    i += 2;
}while (i < 10);
```
在这个例子中，只要i小于10，循环就会重复执行。i从0开始，每次循环递增2。

**因此，do-while语句是确保至少要执行一次的场景下使用。**


## while语句
while 语句是一种先测试循环语句，即先检测退出条件，再执行循环体内的代码。因此，while 循环体内的代码有可能不会执行。

使用示例：
```js
let i = 0;
while (i < 10) {
 i += 2;
} 
```
在这个例子中，变量 i 从 0 开始，每次循环递增 2。只要 i 小于 10，循环就会继续。

## for语句
使用示例：
```js
let count = 10;
for (let i = 0; i < count; i++) {
 console.log(i);
} 
```

上面的代码等价于下面使用while的代码：
```js
let count = 10;
let i = 0;
while (i < count) {
 console.log(i);
 i++;
}
```

### 无穷循环
```js
for (;;) { // 无穷循环
 doSomething();
} 
```
无初始化、条件表达式和循环后表达式就会创建一个无穷循环。

### for循环 -> while循环
若只包含条件表达式，那么for循环实际上就变成了while循环：
```js
let count = 10;
let i = 0;
for (; i < count; ) {
 console.log(i);
 i++;
}
```

### 标签语句
标签语句用于给语句加标签，可以在后面通过 break 或 continue 语句引用。标签语句的典型应用场景是嵌套循环。

```js
start: for (let i = 0; i < count; i++) {
 console.log(i);
}
```

### break语句
单层for循环可直接通过break跳出循环，使用示例：
```js
let num = 0;
for (let i = 1; i < 10; i++) {
  if (i % 5 == 0) {
    break;
  }
  num++;
}
console.log(num);//4
```

### continue语句
跳过本次循环，但可以继续执行下一次循环，这也是与break语句的区别，break是中断所有循环，continue是跳过本次循环，但可以继续执行下一循环。
```js
let num = 0;
for (let i = 1; i < 10; i++) {
 if (i % 5 == 0) {
 continue;
 }
 num++;
}
console.log(num); // 8 
```

### 跳出双层for循环
与标签语句一起使用，使用示例：
```js
let num = 0;
outermost: for (let i = 0; i < 10; i++) {
  for (let j = 0; j < 10; j++) {
    if (i == 5 && j == 5) {
      break outermost; // 50 + 5
    }
    num++;
  }
}
console.log(num); // 55
```

continue也可用在双层for循环里：
```js
let num = 0;
outermost: for (let i = 0; i < 10; i++) {
  for (let j = 0; j < 10; j++) {
    if (i == 5 && j == 5) {
      continue outermost; // 100 - 5 ，原本循环100次，因为j=5是跳过了，所以当i=5时，j=5~9都是没有进行循环的，少了5次
    }
    num++;
  }
}
console.log(num); // 95
```


## for-in循环
for-in 语句是一种严格的迭代语句，用于枚举对象中的非符号键属性。

使用示例：
```js
for (const propName in window) {
 document.write(propName);
}
```

**注意：**
1. ECMAScript 中对象的属性是无序的，因此 for-in 语句不能保证返回对象属性的顺序。换句话说，所有可枚举的属性都会返回一次，但返回的顺序可能会因浏览器而异。
2. 如果 for-in 循环要迭代的变量是 null 或 undefined，则不执行循环体。

## for-of循环
for-of 语句是一种严格的迭代语句，用于遍历可迭代对象的元素。  
使用示例：
```js
for (const el of [2,4,6,8]) {
 document.write(el);
} 
```
在这个例子中，我们使用 for-of 语句显示了一个包含 4 个元素的数组中的所有元素。循环会一直持续到将所有元素都迭代完。与 for 循环一样，这里控制语句中的 const 也不是必需的。为了确保这个局部变量不被修改，推荐使用 const。

for-of 循环会按照可迭代对象的 next()方法产生值的顺序迭代元素。