---
title: iterator 迭代器
date: 2022-08-18
category:
  - javascript
---


循环是迭代机制的基础，这是因为它可以指定迭代的次数，以及每次迭代要执行什么操作。每次循环都会在下一次迭代开始之前完成，而每次迭代的顺序都是事先定义好的。  
迭代会在一个有序集合上进行.（“有序”可以理解为集合中所有项都可以按照既定的顺序被遍历到，特别是开始和结束项有明确定义。）数组是JavaScript中有序集合的最典型例子。

<!-- more -->

因为数组有已知的长度，并且数组每一项都可以通过索引获取，也因此整个数组可以通过递增索引来遍历。由于如下原因，通过这种循环来执行例程效果并不理想：
- 迭代之前需要知道如何使用数据结构。数组中的每一项都只能先通过引用取得数组对象，然后再通过[]操作符取得特定索引位置上的项。这种情况并不适用于所有数据结构。
- 遍历顺序并不是数据结构固有的。通过递增索引来访问数据是特定于数组类型的方式，并不适用于其它具有隐式顺序的结构数据。

ES5新增的`forEach()`方法解决了单独记录索引和通过数组对象取得值得问题。不过，并没有办法标识迭代何时终止。因此这个方法只是适用于数组，而且回调结构也比较笨拙。

## 迭代器模式

可迭代对象不一定是集合对象，也可以是仅仅具有类似数组行为的其它数据结构。任何实现Iterable接口的数据结构都可以被实现Iterator接口的结构“消费”。迭代器是按需创建的一次性对象。每个迭代器都会关联一个可迭代对象，而迭代器会暴露迭代其关联可迭代对象的API。迭代器无须了解与其关联的可迭代对象的结构，只需要知道如何取得连续的值。这种概念上的分离正是Iterable 和 Iterator 的强大之处。

## 可迭代协议
实现 Iterable 接口（可迭代协议）要求同时具备两种能力：支持迭代的自我识别能力和创建实现Iterator 接口的对象的能力。在 ECMAScript 中，这意味着必须暴露一个属性作为“默认迭代器”，而且这个属性必须使用特殊的 Symbol.iterator 作为键。这个默认迭代器属性必须引用一个迭代器工厂函数，调用这个工厂函数必须返回一个新迭代器。

很多内置类型都实现了Iterable接口：
- 字符串
- 数组
- 映射
- 集合
- arguments对象
- NodeList等DOM集合类型

检查是否存在默认迭代器熟属性：
```js
let num = 1;
let obj = {};

// 这两种类型没有实现迭代器工厂函数
console.log(num[Symbol.iterator]); // undefined
console.log(obj[Symbol.iterator]); // undefined

let str = 'abc';
let arr = ['a', 'b', 'c'];
let map = new Map().set('a', 1).set('b', 2).set('c', 3);
let set = new Set().add('a').add('b').add('c');
let els = document.querySelectorAll('div');

// 这些类型都实现了迭代器工厂函数
console.log(str[Symbol.iterator]); // f values() { [native code] }
console.log(arr[Symbol.iterator]); // f values() { [native code] }
console.log(map[Symbol.iterator]); // f values() { [native code] }
console.log(set[Symbol.iterator]); // f values() { [native code] }
console.log(els[Symbol.iterator]); // f values() { [native code] }

// 调用这个工厂函数会生成一个迭代器
console.log(str[Symbol.iterator]()); // StringIterator {}
console.log(arr[Symbol.iterator]()); // ArrayIterator {}
console.log(map[Symbol.iterator]()); // MapIterator {}
console.log(set[Symbol.iterator]()); // SetIterator {}
console.log(els[Symbol.iterator]()); // ArrayIterator {} 
```

实际写代码过程中，不需要显式调用这个工厂函数来生成迭代器。实现可迭代协议的所有类型都会自动兼容接收可迭代对象的任何语言特性。接收可迭代对象的原生语言特性包括：
- for-of循环
- 数组解构
- 扩展操作符
- Array.from()
- 创建集合
- 创建映射
- Promise.all()接收由期约组成的可迭代对象
- Promise.race()接收由期约组成的可迭代对象
- yield*操作符，在生成器中使用


## 迭代器协议
迭代器是一种一次性使用对象，用于迭代与其关联的可迭代对象。迭代器API使用next()方法在可迭代对象中遍历数据。每次成功调用next()，都会返回一个IteratorResult对象，其中包含迭代器返回的下一个值。若不调用next()，则无法知道迭代器的当前位置。  
next()方法返回的迭代器对象IteratorResult包含两个属性：done和value：
- done是一个布尔值，表示是否还可以再次调用next()取得下一个值；
- value包含可迭代对象的下一个值（此时done为false），若done为true，则value值为undefined

示例：
```js
// 可迭代对象
let arr = ['foo', 'bar'];

// 迭代器工厂函数
console.log(arr[Symbol.iterator]); // f values() { [native code] }

// 迭代器
let iter = arr[Symbol.iterator]();
console.log(iter); // ArrayIterator {}

// 执行迭代
console.log(iter.next()); // { done: false, value: 'foo' }
console.log(iter.next()); // { done: false, value: 'bar' }
console.log(iter.next()); // { done: true, value: undefined }
```
迭代器并不知道怎么从可迭代对象中取得下一个值，也不知道可迭代对象有多大。只要迭代器到达 done: true 状态，后续调用 next()，value值都是一样的，即value值为undefined：
```js
let arr = ['foo'];
let iter = arr[Symbol.iterator]();
console.log(iter.next()); // { done: false, value: 'foo' }
console.log(iter.next()); // { done: true, value: undefined }
console.log(iter.next()); // { done: true, value: undefined }
console.log(iter.next()); // { done: true, value: undefined } 
```
每个迭代器都表示对可迭代对象的一次性有序遍历。不同迭代器的实例相互之间没有联系，只会独立地遍历可迭代对象：
```js
let arr = ['foo', 'bar'];
let iter1 = arr[Symbol.iterator]();
let iter2 = arr[Symbol.iterator]();

console.log(iter1.next()); // { done: false, value: 'foo' }
console.log(iter2.next()); // { done: false, value: 'foo' }
console.log(iter2.next()); // { done: false, value: 'bar' }
console.log(iter1.next()); // { done: false, value: 'bar' } 
```

:::warning 注意
迭代器维护着一个指向可迭代对象的引用，因此迭代器会阻止垃圾回收程序回收可迭代对象。
:::


## 自定义迭代器
Iterable 接口类似，任何实现 Iterator 接口的对象都可以作为迭代器使用。下面这个例子中的 Counter 类只能被迭代一定的次数：
```js
class Counter {
 // Counter 的实例应该迭代 limit 次
 constructor(limit) {
 this.count = 1;
 this.limit = limit;
 }
 next() {
 if (this.count <= this.limit) {
 return { done: false, value: this.count++ };
 } else {
 return { done: true, value: undefined };
 }
 }
 [Symbol.iterator]() {
 return this;
 }
}
let counter = new Counter(3);
for (let i of counter) {
 console.log(i);
}
// 1
// 2
// 3
```





