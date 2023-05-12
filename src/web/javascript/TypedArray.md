---
title: 定型数组
date: 2022-02-15
category:
  - javascript
---

定型数组（typed array）是 ECMAScript 新增的结构，目的是提升向原生库传输数据的效率。实际上，JavaScript 并没有“TypedArray”类型，它所指的其实是一种特殊的包含数值类型的数组。为理解如何使用定型数组，有必要先了解一下它的用途。

<!-- more -->

## ArrayBuffer
Float32Array 实际上是一种“视图”，可以允许 JavaScript 运行时访问一块名为 ArrayBuffer 的预分配内存。ArrayBuffer 是所有定型数组及视图引用的基本单位。

:::warning 注意
SharedArrayBuffer 是 ArrayBuffer 的一个变体，可以无须复制就在执行上下文间传递它。
:::

ArrayBuffer()是一个普通的 JavaScript 构造函数，可用于在内存中分配特定数量的字节空间。
```js
const buf = new ArrayBuffer(16); // 在内存中分配 16 字节
console.log(buf.byteLength); // 16 
```

ArrayBuffer 一经创建就不能再调整大小。不过，可以使用 slice()复制其全部或部分到一个新实例中：
```js
const buf1 = new ArrayBuffer(16);
// 数组操作方法，如pop、push、shift、unshift、splice在这里都是不可用的

// 但是可以使用slice
const buf2 = buf1.slice(4, 12);
console.log(buf2.byteLength);
```

ArrayBuffer 某种程度上类似于 C++的 malloc()，但也有几个明显的区别：
- malloc()在分配失败时会返回一个 null 指针。ArrayBuffer 在分配失败时会抛出错误。
- malloc()可以利用虚拟内存，因此最大可分配尺寸只受可寻址系统内存限制。ArrayBuffer分配的内存不能超过 Number.MAX_SAFE_INTEGER（253  1）字节。
- malloc()调用成功不会初始化实际的地址。声明 ArrayBuffer 则会将所有二进制位初始化为 0。
- 通过 malloc()分配的堆内存除非调用 free()或程序退出，否则系统不能再使用。而通过声明ArrayBuffer 分配的堆内存可以被当成垃圾回收，不用手动释放。

不能仅通过对 ArrayBuffer 的引用就读取或写入其内容。要读取或写入 ArrayBuffer，就必须通过视图。视图有不同的类型，但引用的都是 ArrayBuffer 中存储的二进制数据。


## DataView

==待后续补充==

**ElementType**
ECMAScript 6 支持 8 种不同的 ElementType：
| ElementType | 字 节 | 说 明                 | 等价的 C 类型  | 值的范围                     |
| :---------- | :---- | :-------------------- | :------------- | :--------------------------- |
| Int8        | 1     | 8 位有符号整数        | signed char    | -128~127                     |
| Uint8       | 1     | 8 位无符号整数        | unsigned char  | 0~255                        |
| Int16       | 2     | 16 位有符号整数       | short          | -32 768~32 767               |
| Uint16      | 2     | 16 位无符号整数       | unsigned short | 0~65 535                     |
| Int32       | 4     | 32 位有符号整数       | int            | -2 147 483 648~2 147 483 647 |
| Uint32      | 4     | 32 位无符号整数       | unsigned int   | 0~4 294 967 295              |
| Float32     | 4     | 32 位 IEEE-754 浮点数 | float          | -3.4e+38~+3.4e+38            |
| Float64     | 8     | 64 位 IEEE-754 浮点数 | double         | -1.7e+308~+1.7e+308          |

突如其来写一个生成随机rgb色值
```js
const uint8Array = new Uint8Array(3);
window.crypto.getRandomValues(uint8Array);
const randomColor = Array.from(uint8Array);
console.log(randomColor);
```