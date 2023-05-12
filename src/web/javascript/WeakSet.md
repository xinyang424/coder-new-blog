---
title: WeakSet
date: 2022-02-15
category:
  - javascript
---


ECMAScript 6 新增的“弱集合”（WeakSet）是一种新的集合类型，为这门语言带来了集合数据结构。WeakSet 是 Set 的“兄弟”类型，其 API 也是 Set 的子集。WeakSet 中的“weak”（弱），描述的是 JavaScript 垃圾回收程序对待“弱集合”中值的方式。

<!-- more -->

## 基本API
使用 new 关键字实例化一个空的 WeakSet：
```js
const ws = new WeakSet();
```

==弱集合中的值只能是 Object 或者继承自 Object 的类型，尝试使用非对象设置值会抛出 TypeError。==

如果想在初始化时填充弱集合，则构造函数可以接收一个可迭代对象，其中需要包含有效的值。可迭代对象中的每个值都会按照迭代顺序插入到新实例中：

```js
const val1 = {id: 1},
 val2 = {id: 2},
 val3 = {id: 3};
// 使用数组初始化弱集合
const ws1 = new WeakSet([val1, val2, val3]);

console.log(ws1.has(val1)); // true
console.log(ws1.has(val2)); // true
console.log(ws1.has(val3)); // true


// 初始化是全有或全无的操作
// 只要有一个值无效就会抛出错误，导致整个初始化失败
const ws2 = new WeakSet([val1, "BADVAL", val3]);
// TypeError: Invalid value used in WeakSet
typeof ws2;
// ReferenceError: ws2 is not defined


// 原始值可以先包装成对象再用作值（利用构造函数进行创建）
const stringVal = new String("val1");
const ws3 = new WeakSet([stringVal]);
console.log(ws3.has(stringVal)); // true
```

- 与Set集合类型一样，WeakSet集合类型初始化后同样有add()新增值、delete()删除值、has()查询值。
- size返回undefined，相当于没有这个方法，只是不会报错，clear方法是直接报错
- 同样在初始化的时候，可以把多个操作连缀起来：
```js
const val1 = {id: 1},val2 = {id: 2},val3 = {id: 3};

const ws = new WeakSet().add(val1);
ws.add(val2).add(val3);

console.log(ws.has(val1)); // true
console.log(ws.has(val2)); // true
console.log(ws.has(val3)); // true 
```

## 弱值
WeakSet 中“weak”表示弱集合的值是“弱弱地拿着”的。意思就是，这些值不属于正式的引用，不会阻止垃圾回收。来看下面的例子：

```js
const ws = new WeakSet();
ws.add({});
```
add()方法初始化了一个新对象，并将它用作一个值。  
因为没有指向这个对象的其他引用，所以当这行代码执行完成后，这个对象值就会被当作垃圾回收。  
然后，这个值就从弱集合中消失了，使其成为一个空集合。

再看下例：
```js
const ws = new WeakSet();

const container = {
 val: {}
};

ws.add(container.val);

function removeReference() {
 container.val = null;
} 
```
- 这一次，container 对象维护着一个对弱集合值的引用，因此这个对象值不会成为垃圾回收的目标。
- 但如果调用了 removeReference()，就会摧毁值对象的最后一个引用，垃圾回收程序就可以把这个值清理掉。


## 不可迭代值

- 因为 WeakSet 中的值任何时候都可能被销毁，所以没必要提供迭代其值的能力。
- 也没有clear()方法
- 因为不可能迭代，所以也不可能在不知道对象引用的情况下从弱集合中取得值。即便代码可以访问 WeakSet 实例，也没办法看到其中的内容。
- WeakSet 之所以限制只能用对象作为值，是为了保证只有通过值对象的引用才能取得值。如果允许原始值，那就没办法区分初始化时使用的字符串字面量和初始化之后使用的一个相等的字符串了。

## 使用弱集合
相比于 WeakMap 实例，WeakSet 实例的用处没有那么大。不过，弱集合在给对象打标签时还是有价值的。
```js
const disabledElements = new Set();

const loginButton = document.querySelector('#login');

// 通过加入对应集合，给这个节点打上“禁用”标签
disabledElements.add(loginButton); 
```
在上例中，通过查询元素在不在 disabledElements 中，就可以知道它是不是被禁用了。不过，假如元素从 DOM 树中被删除了，它的引用却仍然保存在 Set 中，因此垃圾回收程序也不能回收它。

为了让垃圾回收程序回收元素的内存，可以在这里使用 WeakSet：

```js
const disabledElements = new WeakSet();

const loginButton = document.querySelector('#login');

// 通过加入对应集合，给这个节点打上“禁用”标签
disabledElements.add(loginButton); 
```

这样，只要 WeakSet 中任何元素从 DOM 树中被删除，垃圾回收程序就可以忽略其存在，而立即释放其内存（假设没有其他地方引用这个对象）。
