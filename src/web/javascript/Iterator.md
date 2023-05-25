---
title: iterator 迭代器与生成器
date: 2022-08-18
category:
  - javascript
---


循环是迭代机制的基础，这是因为它可以指定迭代的次数，以及每次迭代要执行什么操作。每次循环都会在下一次迭代开始之前完成，而每次迭代的顺序都是事先定义好的。  
迭代会在一个有序集合上进行.（“有序”可以理解为集合中所有项都可以按照既定的顺序被遍历到，特别是开始和结束项有明确定义。）数组是JavaScript中有序集合的最典型例子。

<!-- more -->

## 迭代器

因为数组有已知的长度，并且数组每一项都可以通过索引获取，也因此整个数组可以通过递增索引来遍历。由于如下原因，通过这种循环来执行例程效果并不理想：
- 迭代之前需要知道如何使用数据结构。数组中的每一项都只能先通过引用取得数组对象，然后再通过[]操作符取得特定索引位置上的项。这种情况并不适用于所有数据结构。
- 遍历顺序并不是数据结构固有的。通过递增索引来访问数据是特定于数组类型的方式，并不适用于其它具有隐式顺序的结构数据。

ES5新增的`forEach()`方法解决了单独记录索引和通过数组对象取得值得问题。不过，并没有办法标识迭代何时终止。因此这个方法只是适用于数组，而且回调结构也比较笨拙。

### 迭代器模式

可迭代对象不一定是集合对象，也可以是仅仅具有类似数组行为的其它数据结构。任何实现Iterable接口的数据结构都可以被实现Iterator接口的结构“消费”。迭代器是按需创建的一次性对象。每个迭代器都会关联一个可迭代对象，而迭代器会暴露迭代其关联可迭代对象的API。迭代器无须了解与其关联的可迭代对象的结构，只需要知道如何取得连续的值。这种概念上的分离正是Iterable 和 Iterator 的强大之处。

### 可迭代协议
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

这些原生语言结构会在后台调用提供的可迭代对象的这个工厂函数，从而创建一个迭代器：
```js
let arr = ['foo', 'bar', 'baz'];

// for-of 循环
for (let el of arr) {
 console.log(el);
}
// foo
// bar
// baz

// 数组解构
let [a, b, c] = arr;
console.log(a, b, c); // foo, bar, baz

// 扩展操作符
let arr2 = [...arr];
console.log(arr2); // ['foo', 'bar', 'baz']

// Array.from()
let arr3 = Array.from(arr);
console.log(arr3); // ['foo', 'bar', 'baz']

// Set 构造函数
let set = new Set(arr);
console.log(set); // Set(3) {'foo', 'bar', 'baz'}

// Map 构造函数
let pairs = arr.map((x, i) => [x, i]);
console.log(pairs); // [['foo', 0], ['bar', 1], ['baz', 2]]
let map = new Map(pairs);
console.log(map); // Map(3) { 'foo'=>0, 'bar'=>1, 'baz'=>2 } 
```
如果对象原型链上的父类实现了 Iterable 接口，那这个对象也就实现了这个接口：
```js
class FooArray extends Array {}
let fooArr = new FooArray('foo', 'bar', 'baz');

for (let el of fooArr) {
 console.log(el);
}
// foo
// bar
// baz 
```

### 迭代器协议
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


### 自定义迭代器
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

为了让一个可迭代对象能够创建多个迭代器，必须每创建一个迭代器就对应一个新计数器。为此，可以把计数器变量放到闭包里，然后通过闭包返回迭代器：
```js
class Counter {
 constructor(limit) {
  this.limit = limit;
 }
 [Symbol.iterator]() {
  let count = 1,
  limit = this.limit;
  return {
    next() {
      if (count <= limit) {
        return { done: false, value: count++ };
      } else {
        return { done: true, value: undefined };
      }
    }
  };
 }
}
let counter = new Counter(3);

for (let i of counter) { console.log(i); }
// 1
// 2
// 3

for (let i of counter) { console.log(i); }
// 1
// 2
// 3 
```
每个以这种方式创建的迭代器也实现了 Iterable 接口。Symbol.iterator 属性引用的工厂函数会返回相同的迭代器：
```js
let arr = ['foo', 'bar', 'baz'];
let iter1 = arr[Symbol.iterator]();

console.log(iter1[Symbol.iterator]); // f values() { [native code] }

let iter2 = iter1[Symbol.iterator]();

console.log(iter1 === iter2); // true
```

### 提前终止迭代器
执行迭代的结构在想让迭代器知道它不想遍历到可迭代对象耗尽时，就可以“关闭”迭代器，可能的情况包括：
- for-of 循环通过break、continue、return或throw提前退出；
- 解构操作并未消费所有值；

如下代码所示，内置语言结构在发现还有更多值可以迭代，但不会消费这些值，会自动调用return()方法：
```js
class Counter {
  constructor(limit) {
    this.limit = limit;
  }
  [Symbol.iterator]() {
    let count = 1,
    limit = this.limit;
    return {
      next() {
        if (count <= limit) {
          return { done: false, value: count++ };
        } else {
          return { done: true };
        }
      },
      return() {
        console.log('Exiting early');
        return { done: true };
      }
    };
  }
} 

let counter1 = new Counter(5);
for (let i of counter1) {
 if (i > 2) {
  break;
 }
 console.log(i);
}
// 1
// 2
// Exiting early 

let counter2 = new Counter(5); 
try {
 for (let i of counter2) {
  if (i > 2) {
    throw 'err';
  }
  console.log(i);
 }
} catch(e) {}
// 1
// 2
// Exiting early

let counter3 = new Counter(5); 
let [a, b] = counter3;
// Exiting early
```
由上代码可以知道，提前终止迭代器会自动调用return()方法，演示的触发条件是break、throw和数组解构。

如果迭代器没有关闭，那么还可以从上次离开的地方继续迭代。比如，数组的迭代器就是不能关闭的：
```js
let a = [1, 2, 3, 4, 5];
let iter = a[Symbol.iterator]();

for (let i of iter) {
 console.log(i);
 if (i > 2) {
 break
 }
}
// 1
// 2
// 3

for (let i of iter) {
 console.log(i);
}
// 4
// 5 
```
反言之，如果迭代器是关闭的，就要重新迭代值。

因为return()方法是可选的，所以并非所有迭代器都是可关闭的。要知道某个迭代器是否可关闭，可以测试这个迭代器实例的return属性是不是函数对象。不过，仅仅给一个不可关闭的迭代器增加这个方法并不能让它变成真正的关闭。这是因为调用return()不会强制迭代器进入关闭状态。即便如此，return()方法还是会被调用。
```js
let a = [1, 2, 3, 4, 5];
let iter = a[Symbol.iterator]();
iter.return = function() {
 console.log('Exiting early');
 return { done: true }; 
}
//由上面示例的代码块可以看出，数组的迭代器是不可关闭的，这里代码我们重写了return方法让它变成可关闭的

for (let i of iter) {
 console.log(i);
 if (i > 2) {
  break
 }
}
// 1
// 2
// 3
// 提前退出

for (let i of iter) {
 console.log(i);
}
// 4
// 5 

//经过测试，哪怕重写了可关闭的return()方法，数组迭代依旧是不可关闭的。即时调用了return方法，也不会让迭代器进入关闭状态
```

## 生成器
生成器是ECMAScript6新增的一个极为灵活的结构，拥有在一个函数块内暂停和恢复代码执行的能力。这种新能力具有深远的影响，比如，使用生成器可以自定义迭代器和实现协程。

### 生成器基础
生成器的形式是一个函数，函数名称前面加一个星号（*）表示它是一个生成器。只要是可以定义函数的地方，就可以定义生成器。
```js
// 生成器函数声明
function* generatorFn() {}

// 生成器函数表达式
let generatorFn = function* () {}

// 作为对象字面量方法的生成器函数
let foo = {
 * generatorFn() {}
}

// 作为类实例方法的生成器函数
class Foo {
 * generatorFn() {}
}

// 作为类静态方法的生成器函数
class Bar {
 static * generatorFn() {}
}
```
:::warning 注意
箭头函数不能用来定义生成器函数。
:::

标识生成器函数的星号不受两侧空格的影响：
```js
// 等价的生成器函数：
function* generatorFnA() {}
function *generatorFnB() {}
function * generatorFnC() {}
//由上看出，哪怕*号前后都有空格都不影响


// 等价的生成器方法：
class Foo {
 *generatorFnD() {}
 * generatorFnE() {}
} 
```
调用生成器函数会产生一个生成器对象。生成器对象一开始处于暂停执行（suspended）的状态。与迭代器相似，生成器对象也实现了Iterator接口，因此具有next()方法，调用此方法会让生成器开始或恢复执行。此外，next()方法的返回值类似于迭代器，有一个 done 属性和一个 value 属性。函数体为空的生成器函数中间不会停留，调用一次 next()就会让生成器到达 done: true 状态。
```js
function* generatorFn() {}

const g = generatorFn();

console.log(g); // generatorFn {<suspended>}
console.log(g.next); // f next() { [native code] } 
console.log(generatorObject.next()); // { done: true, value: undefined }  调用一次next()方法就让生成器到达done:true
```

value 属性是生成器函数的返回值，默认值为 undefined，可以通过生成器函数的返回值指定：
```js
function* generatorFn() {
 return 'foo';
}

let generatorObject = generatorFn();

console.log(generatorObject); // generatorFn {<suspended>}
console.log(generatorObject.next()); // { done: true, value: 'foo' }
```

生成器函数只会在初次调用next()方法后开始执行，如下所示：
```js
function* generatorFn() {
 console.log('foobar');
}

// 初次调用生成器函数并不会打印日志
let generatorObject = generatorFn();

generatorObject.next(); // foobar 
```


生成器对象实现了 Iterable 接口，它们默认的迭代器是自引用的：
```js
function* generatorFn() {}
console.log(generatorFn); //ƒ* generatorFn() {}
console.log(generatorFn()); //{<suspended>}
console.log(generatorFn()[Symbol.iterator]()); //{<suspended>}
console.log(generatorFn()[Symbol.iterator]); //ƒ [Symbol.iterator]() { [native code] }

const g = generatorFn();
console.log(g === g[Symbol.iterator]()); //true
```

## 通过yield中断执行