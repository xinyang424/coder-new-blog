---
title: WeakMap
date: 2022-02-15
category:
  - javascript
---

ECMAScript 6 新增的“弱映射”（WeakMap）是一种新的集合类型，为这门语言带来了增强的键/值对存储机制。WeakMap 是 Map 的“兄弟”类型，其 API 也是 Map 的子集。WeakMap 中的“weak”（弱），描述的是 JavaScript 垃圾回收程序对待“弱映射”中键的方式。

<!-- more -->

## 基本API
可以使用new关键字实例化一个空WeakMap：
```js
const wm = new WeakMap(); 
```
==弱映射中的键只能是 Object 或者继承自 Object 的类型==，尝试使用非对象设置键会抛出TypeError。值的类型没有限制。

使用示例：
```js
const key1 = {id: 1},key2 = {id: 2}, key3 = {id: 3}; 
// 使用嵌套数组初始化弱映射
const wm1 = new WeakMap([
 [key1, "val1"],
 [key2, "val2"],
 [key3, "val3"]
]);
console.log(wm1.get(key1)); // val1
console.log(wm1.get(key2)); // val2
console.log(wm1.get(key3)); // val3

// 初始化是全有或全无的操作
// 只要有一个键无效就会抛出错误，导致整个初始化失败
const wm2 = new WeakMap([
 [key1, "val1"],
 ["BADKEY", "val2"],
 [key3, "val3"]
]);
// TypeError: Invalid value used as WeakMap key
typeof wm2;
// ReferenceError: wm2 is not defined 

// 原始值可以先包装成对象再用作键
const stringKey = new String("key1");
const wm3 = new WeakMap([
 stringKey, "val1"
]);
console.log(wm3.get(stringKey)); // "val1"
```

初始化，同样有set()、get()、delete()，没有clear()方法，size返回也是undefined，相当于没有。


## 弱键
WeakMap 中“weak”表示弱映射的键是“弱弱地拿着”的。意思就是，这些键不属于正式的引用，不会阻止垃圾回收。  
但要注意的是，弱映射中值的引用可不是“弱弱地拿着”的。  
只要键存在，键/值对就会存在于映射中，并被当作对值的引用，因此就不会被当作垃圾回收。

```js
const wm = new WeakMap();

const container = {
 key: {}
};

wm.set(container.key, "val");

function removeReference() {
 container.key = null;
}
```
在上例代码中，container 对象维护着一个对弱映射键的引用，因此这个对象键不会成为垃圾回收的目标。不过，如果调用了 removeReference()，就会摧毁键对象的最后一个引用，垃圾回收程序就可以把这个键/值对清理掉。

## 不可迭代键
- 因为 WeakMap 中的键/值对任何时候都可能被销毁，所以没必要提供迭代其键/值对的能力。
- 没有clear()方法。
- 因为不可能迭代，所以也不可能在不知道对象引用的情况下从弱映射中取得值。即便代码可以访问 WeakMap 实例，也没办法看到其中的内容。
- WeakMap 实例之所以限制只能用对象作为键，是为了保证只有通过键对象的引用才能取得值。如果允许原始值，那就没办法区分初始化时使用的字符串字面量和初始化之后使用的一个相等的字符串了。

## 使用弱映射

**1. 私有变量**
弱映射造就了在 JavaScript 中实现真正私有变量的一种新方式。前提很明确：私有变量会存储在弱映射中，以对象实例为键，以私有成员的字典为值。

```js
const wm = new WeakMap(); //键：{idProperty: Symbol(id)} 值：{Symbol(id): 123}
class User {
  constructor(id) {
    this.idProperty = Symbol("id");
    this.setId(id);
  }
  setPrivate(property, value) {
    //this就是{idProperty: Symbol(id)}
    const privateMembers = wm.get(this) || {};
    privateMembers[property] = value;
    wm.set(this, privateMembers);
  }
  getPrivate(property) {
    return wm.get(this)[property];
  }
  setId(id) {
    this.setPrivate(this.idProperty, id);
  }
  getId() {
    return this.getPrivate(this.idProperty);
  }
}
const user = new User(123);
console.log(user.getId()); // 123
user.setId(456);
console.log(user.getId()); // 456
// 并不是真正私有的（不通过实例化的user也能访问）
console.log(user); // {idProperty: Symbol(id)}
console.log(wm.get(user)); //{Symbol(id): 456}
console.log(wm.get(user)[user.idProperty]); // 456

/*
  const wm = new WeakMap([
    [{idProperty: Symbol(id)},{Symbol(id): 123}]
  ])
*/
```
对于上面的实现，外部代码只需要拿到对象实例的引用和弱映射，就可以取得“私有”变量了。为了避免这种访问，可以用一个闭包把 WeakMap 包装起来，这样就可以把弱映射与外界完全隔离开了：

```js
const User = (() => {
  const wm = new WeakMap();
  class User {
    constructor(id) {
      this.idProperty = Symbol("id");
      this.setId(id);
    }
    setPrivate(property, value) {
      const privateMembers = wm.get(this) || {};
      privateMembers[property] = value;
      wm.set(this, privateMembers);
    }
    getPrivate(property) {
      return wm.get(this)[property];
    }
    setId(id) {
      this.setPrivate(this.idProperty, id);
    }
    getId(id) {
      return this.getPrivate(this.idProperty);
    }
  }
  return User;
})();
const user = new User(123);
console.log(user.getId()); // 123
user.setId(456);
console.log(user.getId()); // 456
```

这样，拿不到弱映射中的健，也就无法取得弱映射中对应的值。虽然这防止了前面提到的访问，但整个代码也完全陷入了 ES6 之前的闭包私有变量模式。

**2. DOM节点元数据**
因为 WeakMap 实例不会妨碍垃圾回收，所以非常适合保存关联元数据。来看下面这个例子，其中使用了常规的 Map：

```js
const m = new Map();

const loginButton = document.querySelector('#login');

// 给这个节点关联一些元数据
m.set(loginButton, {disabled: true});
```
假设在上面的代码执行后，页面被 JavaScript 改变了，原来的登录按钮从 DOM 树中被删掉了。但由于映射中还保存着按钮的引用，所以对应的 DOM 节点仍然会逗留在内存中，除非明确将其从映射中删除或者等到映射本身被销毁。


如果这里使用的是弱映射，如以下代码所示，那么当节点从 DOM 树中被删除后，垃圾回收程序就可以立即释放其内存（假设没有其他地方引用这个对象）：
```js
const wm = new WeakMap();

const loginButton = document.querySelector('#login');

// 给这个节点关联一些元数据
wm.set(loginButton, {disabled: true}); 
```
