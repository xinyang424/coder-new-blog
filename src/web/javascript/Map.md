---
title: Map
date: 2022-02-01
category:
  - javascript
---



作为 ECMAScript 6 的新增特性，Map 是一种新的集合类型，为这门语言带来了真正的键/值存储机制。Map 的大多数特性都可以通过 Object 类型实现，但二者之间还是存在一些细微的差异。具体实践中使用哪一个，还是值得细细甄别。

<!-- more -->
## 基本API
使用new关键字和Map构建函数可以创建一个空映射：
```js
const m = new Map();
```
如果想在创建的同时初始化实例，可以给 Map 构造函数传入一个可迭代对象，需要包含键/值对数组。可迭代对象中的每个键/值对都会按照迭代顺序插入到新映射实例中：
```js
// 使用嵌套数组初始化映射
const m1 = new Map([
 ["key1", "val1"],
 ["key2", "val2"],
 ["key3", "val3"]
]);
console.log(m1.size); // 3

// 使用自定义迭代器初始化映射
const m2 = new Map({
 [Symbol.iterator]: function*() {
 yield ["key1", "val1"];
 yield ["key2", "val2"];
 yield ["key3", "val3"];
 }
});
console.log(m2.size); // 3

// 映射期待的键/值对，无论是否提供
const m3 = new Map([[]]);
console.log(m3.has(undefined)); // true
console.log(m3.get(undefined)); // undefined 
```

初始化之后，可以使用 以下方法：
- x.size：获取映射中的键/值对的数量
- has(xx)：可传入参数，判断是否存在该键，返回值为boolean
- get(xx)：可传入参数，读取该键的值。
- delete(xx)：可传入参数，删除该键的值，返回值为boolean
- clear()：清除这个映射实例中的所有键/值对

```js
const m = new Map();

console.log(m.has("firstName")); // false
console.log(m.get("firstName")); // undefined
console.log(m.size); // 0

m.set("firstName", "Matt")
 .set("lastName", "Frisbie");

console.log(m.has("firstName")); // true
console.log(m.get("firstName")); // Matt
console.log(m.size); // 2

m.delete("firstName"); // 只删除这一个键/值对
console.log(m.has("firstName")); // false
console.log(m.has("lastName")); // true
console.log(m.size); // 1

m.clear(); // 清除这个映射实例中的所有键/值对
console.log(m.has("firstName")); // false
console.log(m.has("lastName")); // false
console.log(m.size); // 0 
```

与 Object 只能使用数值、字符串或符号作为键不同，Map 可以使用任何 JavaScript 数据类型作为键。Map 内部使用 SameValueZero 比较操作（ECMAScript 规范内部定义，语言中不能使用），基本上相当于使用严格对象相等的标准来检查键的匹配性。

```js
const m = new Map();

const functionKey = function() {};
const symbolKey = Symbol();
const objectKey = new Object();

m.set(functionKey, "functionValue");
m.set(symbolKey, "symbolValue");
m.set(objectKey, "objectValue");

console.log(m.get(functionKey)); // functionValue
console.log(m.get(symbolKey)); // symbolValue
console.log(m.get(objectKey)); // objectValue

// SameValueZero 比较意味着独立实例不冲突
console.log(m.get(function() {})); // undefined
```

与严格相等一样，在映射中用作键和值的对象及其他“集合”类型，在自己的内容或属性被修改时仍然保持不变：
```js
const m = new Map();

const objKey = {},
 objVal = {},
 arrKey = [],
 arrVal = [];

m.set(objKey, objVal);
m.set(arrKey, arrVal);

objKey.foo = "foo";
objVal.bar = "bar";
arrKey.push("foo");
arrVal.push("bar");

console.log(m.get(objKey)); // {bar: "bar"}
console.log(m.get(arrKey)); // ["bar"] 
```
SameValueZero 比较也可能导致意想不到的冲突：
```js
const m = new Map();
const a = 0/"", // NaN
      b = 0/"", // NaN
      pz = +0,
      nz = -0;
console.log(a === b); // false
console.log(pz === nz); // true

m.set(a, "foo");
m.set(pz, "bar");

console.log(m.get(b)); // foo  这里应该是undefined，但却访问到了a的值，而变量a和b并不相等
console.log(m.get(nz)); // bar
```

## 顺序与迭代
与 Object 类型的一个主要差异是，Map 实例会维护键值对的插入顺序，因此可以根据插入顺序执行迭代操作。  
映射实例可以提供一个迭代器（Iterator），能以插入顺序生成[key, value]形式的数组。可以通过 entries()方法（或者 Symbol.iterator 属性，它引用 entries()）取得这个迭代器：

```js
const m = new Map([
 ["key1", "val1"],
 ["key2", "val2"],
 ["key3", "val3"]
]);

console.log(m.entries === m[Symbol.iterator]); // true

for (let pair of m.entries()) {
 console.log(pair);
} 
// [key1,val1]
// [key2,val2]
// [key3,val3]

for (let pair of m[Symbol.iterator]()) {
 console.log(pair);
}
// [key1,val1]
// [key2,val2]
// [key3,val3]
```

因为entries是静默迭代器，所以可以直接对映射实例使用扩展操作，把映射转换为数组：
```js
const m = new Map([
 ["key1", "val1"],
 ["key2", "val2"],
 ["key3", "val3"]
]);
console.log([...m]); // [[key1,val1],[key2,val2],[key3,val3]]
```

- 如果不使用迭代器，而是使用回调方式，则可以调用映射的 forEach(callback, opt_thisArg)方法并传入回调，依次迭代每个键/值对。
- 传入的回调接收可选的第二个参数，这个参数用于重写回调内部 this 的值
```js
const m = new Map([
 ["key1", "val1"],
 ["key2", "val2"],
 ["key3", "val3"]
]);
m.forEach((val, key) => console.log(`${key} -> ${val}`));
// key1 -> val1
// key2 -> val2
// key3 -> val3 
```
keys()和 values()分别返回以插入顺序生成键和值的迭代器：
```js
const m = new Map([
 ["key1", "val1"],
 ["key2", "val2"],
 ["key3", "val3"]
]);

for (let key of m.keys()) {
 console.log(key);
}
// key1
// key2
// key3

for (let key of m.values()) {
 console.log(key);
}
// value1
// value2
// value3 
```

键和值在迭代器遍历时是可以修改的，但作为键的字符串原始值是不能修改的，如果作为键的是对象，虽然遍历时候修改键中对象的值，映射内是改变不了的，这个键对应的值是不会变的，但这个键作为Map键之前的值变了：
```js
const m1 = new Map([["key1", "val1"]]);
// 作为键的字符串原始值是不能修改的
for (let key of m1.keys()) {
  key = "newKey";//直接重新修改键为新的值
  console.log(key); // newKey 虽然打印看修改成功了
  console.log(m1.get("key1")); // val1 但访问之间的key值还是可以读取到值得
  console.log(m1.get("key")); // undefined 而访问新修改键名是访问不到得
}
console.log([...m1]); //[["key1","val1"]] 循环完再查看也是没有修改的

//分界线
const keyObj = { id: 1 };
const m = new Map([[keyObj, "val1"]]); //以keyObj值对象作为Map的键

for (let key of m.keys()) {
  key.id = "newKey"; //这里修改键值对象的值
  console.log(key); // {id: "newKey"}  打印看是修改成功了
  console.log(m.get(keyObj)); // val1  但使用keyObj读取键值还是可以读取出来，讲道理keyObj由{ id: 1 }修改成了{ id: "newKey" }，应该读取不了才对
}
console.log(keyObj); //{id: 'newKey'}
console.log([...m]); // [[{id:"newKey"},"val1"] ]  修改的是Map里键，但Map键映射关系没修改成，反而之前的映射关系修改成功了

//取个比较形象的例子，有种自己派特工去黑敌方的电脑，结果这个特工把自己这边计算机黑了，敌方电脑没黑成。
```

## 选择Object还是Map

对于多数 Web 开发任务来说，选择 Object 还是 Map 只是个人偏好问题，影响不大。不过，对于在乎内存和性能的开发者来说，对象和映射之间确实存在显著的差别。

共同点:
1. Object 和 Map 的工程级实现在不同浏览器间存在明显差异，但存储单个键/值对所占用的内存数量都会随键的数量线性增加。
2. 批量添加或删除键/值对则取决于各浏览器对该类型内存分配的工程实现，不同浏览器的情况不同。

不同点：
1. **内存占用**：在给定固定大小的内存，Map 大约可以比 Object 多存储 50%的键/值对，也就是==相同空间，Map存的东西更多==，但是有些浏览器偏心给Object，给它分的多，那有时候确实比不过。
2. **插入性能**：向 Object 和 Map 中插入新键/值对的消耗大致相当，不过插入 Map 在所有浏览器中一般会稍微快一点儿。对这两个类型来说，插入速度并不会随着键/值对数量而线性增加。==如果代码涉及大量插入操作，那么显然 Map 的性能更佳==。
3. **查找速度**：在大型 Object 和 Map 中查找键/值对的性能差异极小，但如果只包含少量键/值对，则 Object 有时候速度更快。在把 Object 当成数组使用的情况下（比如使用连续整数作为属性），浏览器引擎可以进行优化，在内存中使用更高效的布局。这对 Map 来说是不可能的。对这两个类型而言，查找速度不会随着键/值对数量增加而线性增加。==如果代码涉及大量查找操作，那么某些情况下可能选择 Object 更好一些==。
4. **删除性能**：而对大多数浏览器引擎来说，Map 的 delete()操作都比插入和查找更快。==如果代码涉及大量删除操作，那么毫无疑问应该选择 Map==。



