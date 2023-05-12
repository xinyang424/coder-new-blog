---
title: Set
date: 2022-02-15
category:
  - javascript
---



ECMAScript 6 新增的 Set 是一种新集合类型，为这门语言带来集合数据结构。Set 在很多方面都像是加强的 Map，这是因为它们的大多数 API 和行为都是共有的。


<!-- more -->
## 基本的API

使用new关键字和Set构造函数可以创建一个空集合：
```js
const s = new Set();
```
与Map一样，可以在想创建的时候同时初始化实例，也可以给Set构造函数传入一个可迭代对象，其中需要包含插入到新集合实例种的元素：
```js
//使用数组初始化集合
const s1 = new Set(["val1","val2","val3"]);

console.log(s1.size); //3

// 使用自定义迭代器初始化集合
const s2 = new Set({
    [Symbol.iterator]:function*(){
        yield "val1";
        yield "val2";
        yield "val3";
    }
})
console.log(s2.size)
```

初始化后有以下操作方法：
1. xx.size：获取元素数量
2. xx.add(xx)：添加值，返回后的新集合
3. xx.has(xx)：查询值，返回boolean
4. xx.delete(xx)：删除元素，返回boolean
5. xx.clear()：清空元素，返回undefined

示例代码：
```js
const s = new Set();

console.log(s.has("Matt")); // false
console.log(s.size); // 0

s.add("Matt")
 .add("Frisbie");

console.log(s.has("Matt")); // true
console.log(s.size); // 2

s.delete("Matt");

console.log(s.has("Matt")); // false
console.log(s.has("Frisbie")); // true
console.log(s.size); // 1

s.clear(); // 销毁集合实例中的所有值

console.log(s.has("Matt")); // false
console.log(s.has("Frisbie")); // false
console.log(s.size); // 0
```
其中，add()返回集合的实例，所以还可以将多个添加操作连缀起来，包括初始化：
```js
const s = new Set().add("val1");

s.add("val2").add("val3");

console.log(s.size);// 3
```

与Map类似，Set可以包含任何JavaScript数据类型作为值。集合也使用 SameValueZero 操作（ECMAScript内部定义，无法在语言中使用），基本上相当于使用严格对象相等的标准来检查值得匹配性：
```js
const s = new Set();

const functionVal = function() {};
const symbolVal = Symbol();
const objectVal = new Object();

s.add(functionVal);
s.add(symbolVal);
s.add(objectVal);

console.log(s.has(functionVal)); // true
console.log(s.has(symbolVal)); // true
console.log(s.has(objectVal)); // true

// SameValueZero 检查意味着独立的实例不会冲突
console.log(s.has(function() {})); // false 
```
与严格相等一样，用作值的对象和其他“集合”类型在自己的内容或属性被修改时也不会改变：
```js
const s = new Set();
const objVal = {},arrVal = [];

s.add(objVal);
s.add(arrVal);

objVal.bar = "bar";
arrVal.push("bar");

console.log(s.has(objVal)); // true
console.log(s.has(arrVal)); // true 
```

## 顺序与迭代
Set 会维护值插入时的顺序，因此支持按顺序迭代。  
集合实例可以提供一个迭代器，能以插入顺序生成集合内容。可以通过values()方法以及别名方法 keys() （或者Symbol.iterator属性，他引用values()）取得这个迭代器：
```js
const s = new Set(["val1", "val2", "val3"]);

console.log(s.values === s[Symbol.iterator]); // true
console.log(s.keys === s[Symbol.iterator]); // true

for (let value of s.values()) {
 console.log(value);
}
// val1
// val2
// val3

for (let value of s[Symbol.iterator]()) {
 console.log(value);
}
// val1
// val2
// val3 
```

因为values()时默认迭代器，所以可以直接对集合实例使用扩展属性，把集合转换为数组：
```js
const s = new Set(["val1", "val2", "val3"]);

console.log([...s]); // ["val1", "val2", "val3"]
```

集合的 entries() 方法返回一个迭代器，可以按照插入顺序产生包含两个元素的数组，这两个元素时集合中每个值得重复出现：
```js
const s = new Set(["val1", "val2", "val3"]);

for (let pair of s.entries()) {
 console.log(pair);
}

// ["val1", "val1"]
// ["val2", "val2"]
// ["val3", "val3"] 
```
因此，entires()并不是Set集合默认的迭代器，但是是Map集合的默认迭代器，Set集合的默认迭代器是value()。

- 如果不使用迭代器，而是用回调方式，则可以调用集合的 forEach() 方法并传入回调，依次迭代每个键/值对。
- 传入的回调接收可选的第二个参数，这个参数用于重写回调内部this的值：
```js
const s = new Set(["val1","val2","val3"])

s.forEach((val, dupVal) => console.log(`${val} -> ${dupVal}`));
// val1 -> val1
// val2 -> val2
// val3 -> val3 

```

与Map集合类型一样，值不管是原始类型还是对象，在遍历的时候是无法修改Set集合类型的键/值的：
```js
const s1 = new Set(["val1"]);

// 字符串原始值作为值不会被修改
for (let value of s1.values()) {
  value = "newVal";
  console.log(value); // newVal
  console.log(s1.has("val1")); // true
}

//分界线

const valObj = { id: 1 };
const s2 = new Set([valObj]);
// 修改值对象的属性，但对象仍然存在于集合中
for (let value of s2.values()) {
  value.id = "newVal";
  console.log(value); // {id: "newVal"}
  console.log(s2.has(valObj)); // true
}
console.log(valObj); // {id: "newVal"}
```

## 补充
Set()集合类型，是不允许值重复的，因此可以用来数组去重。
```js
const arr = [1, 1, 5, 3, 5, 6, 3, 6];
let newArr = Array.from(new Set(arr));
console.log(newArr);//[1,5,3,6]
console.log(newArr.sort((a, b) => a - b));// [1,3,5,6]
```

