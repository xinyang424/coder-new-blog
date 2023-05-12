---
title: Array
date: 2022-02-01
category:
  - javascript
---



ECMAScript数组也是一组有序的数据，但跟其它语言不同的是，数组中每个槽位可以存储任意类型的数据。这意味着可以创建一个数组，它的第一个元素是字符串，第二个元素是数值，第三个是对象。ECMAScript数组也是动态大小的，会随着数据添加而自动增长。
<!-- more -->
## 创建数组

```js
//第一种：使用Array构造函数
let colors = new Array(); //创建一个空数组，此时数组长度为0

let colors = new Array(20); //创建一个长度为20的数组

let color = new Array("red","blue","green"); //创建包含red、blue、green元素的数组，长度为3

//第二种：数组字面量
let colors = ["red", "blue", "green"]; // 创建一个包含 3 个元素的数组，长度为3
let names = []; // 创建一个空数组，长度为0
let values = [1,2,]; // 创建一个包含 2 个元素的数组，长度为2
```

## from()和of()

from()用于讲类数组结构转换为数组实例，而of()用于将一组参数转换为数组实例。

Array.from()的第一个参数是一个类数组对象，即任何可迭代的结构，或者有一个length属性和可索引元素的结构。这种方式可用于很多场合：
```js
// 字符串会被拆分为单字符数组
console.log(Array.from("Matt")); // ["M", "a", "t", "t"]
// 可以使用 from()将集合和映射转换为一个新数组
const m = new Map().set(1, 2).set(3, 4);
const s = new Set().add(1).add(2).add(3).add(4);
console.log(Array.from(m)); // [[1, 2], [3, 4]]
console.log(Array.from(s)); // [1, 2, 3, 4] 


// Array.from()对现有数组执行浅复制
const a1 = [1, 2, 3, 4];
const a2 = Array.from(a1);
const a3 = a1;
console.log(a1); // [1, 2, 3, 4]
console.log(a3); // [1, 2, 3, 4]
console.log(a1 === a2); // false 
console.log(a1 === a3); // true 

// 可以使用任何可迭代对象
const iter = {
 *[Symbol.iterator]() {
 yield 1;
 yield 2;
 yield 3;
 yield 4;
 }
};
console.log(Array.from(iter)); // [1, 2, 3, 4] 

// arguments 对象可以被轻松地转换为数组
function getArgsArray() {
 return Array.from(arguments);
}
console.log(getArgsArray(1, 2, 3, 4)); // [1, 2, 3, 4]

// from()也能转换带有必要属性的自定义对象
const arrayLikeObject = {
 0: 1,
 1: 2,
 2: 3,
 3: 4,
 length: 4
};
console.log(Array.from(arrayLikeObject)); // [1, 2, 3, 4]
```

Array.from()还接收第二个可选的映射函数参数。这个函数可以直接增强新数组的值，而无须像调用Array.from().map()那样先创建一个中间数组。还可以接收第三个参数，用于指定映射函数种this的值。但这个重写的this值在箭头函数中不适用。

```js
const a1 = [1, 2, 3, 4];
const a2 = Array.from(a1, x => x**2);//每个数都平方
const a3 = Array.from(a1, function(x) {return x**this.exponent}, {exponent: 2});
console.log(a2); // [1, 4, 9, 16]
console.log(a3); // [1, 4, 9, 16] 
```

Array.of()则是可以把一组参数转换为数组。这个可用于替代在ES6之前常用的Array.prototype.slice.call(arguments)，一种异常笨拙的将arguments对象转换欸数组的写法：
```js
console.log(Array.of(1, 2, 3, 4));//[1, 2, 3, 4]
console.log(Array.of(undefined)); //[undefined]
```

Array.of()这种用法肯定相比Array.from()，是没有Array.from()那么强大的。


## 数组空位
使用数组字面量初始化数组时，可以使用一串逗号来创建空位（hole）。ECMAScript 会将逗号之间相应索引位置的值当成空位，ES6 规范重新定义了该如何处理这些空位。

```js
const options = [,,,,,]; // 创建包含 5 个元素的数组
console.log(options.length); // 5
console.log(options); // [,,,,,]
```

ES6新增方法普遍将这些空位存在的元素，只不过值为undefined：
```js
const options = [1, , , , 5];
for (const option of options) {
  console.log(option === undefined);
}

//false
//true
//true
//true
//false

//options.entries() 生成迭代器?  index是索引位置，value是值
for (const [index, value] of options.entries()) {
 console.log(value);
}
// 1
// undefined
// undefined
// undefined
// 5 

const a = Array.from([,,,]); // 使用 ES6 的 Array.from()创建的包含 3 个空位的数组
//上面声明数组的方法，用Array.of()也是可以实现的，如Array.of(...[,,,])
for (const val of a) {
 console.log(val === undefined)
}
// true
// true
// true 

```

ES6之前的方法则会忽略这个空位，但具体的行为也会因方法而异：
```js
const options = [1,,,,5];

//map()会跳过这个位置
console.log(options.map(() => 6)); // [6,undefined,undefined,undefined,6]

//join()视空位置为字符串
console.log(options.join('-')); // "1----5"
```

:::warning 注意
由于行为不一致和存在性能隐患，因此实践中要避免使用数组空位。如果确实需要空位，则可以显式地用 undefined 值代替。
:::

## 数组索引
要取得或设置数组的值，需要使用中括号并提供相应值的数字索引，如下：
```js
let colors = ["red", "blue", "green"]; // 定义一个字符串数组
console.log(colors[0]); // 显示第一项
colors[2] = "black"; // 修改第三项
colors[3] = "brown"; // 添加第四项
```

数组中的元素的熟练保存在length属性中，这个属性始终返回0或大于0的值，如下例所示：
```js
let colors = ["red", "blue", "green"]; // 创建一个包含 3 个字符串的数组
let names = []; // 创建一个空数组
console.log(colors.length); // 3
console.log(names.length); // 0
```
数组length属性的独特之处在于，它不是只读的。通过修改length属性，可以从数组末尾删除或添加元素。来看下面示例：
```js
let colors = ["red", "blue", "green"]; // 创建一个包含 3 个字符串的数组
colors.length = 2;//修改数组的长度，由3变为2，相当于删除了数组的最后一项
console.log(colors[2]); // undefined
```

如果将 length 设置为大于数组元素数的值，则新添加的元素都将以undefined 填充，如下例所示：
```js
let colors = ["red", "blue", "green"]; // 创建一个包含 3 个字符串的数组
colors.length = 4;
console.log(colors[3]); // undefined
```

length 属性会更新为位置加上 1，如下例所示：
```js
let colors = ["red", "blue", "green"]; // 创建一个包含 3 个字符串的数组
colors[99] = "black"; // 添加一种颜色（位置 99）//此时数组长度就是 99 + 1（0~99），中间的3~98都为undefined
console.log(colors.length); // 100
```

:::warning 注意
数组最多可以包含 4 294 967 295 个元素，这对于大多数编程任务应该足够了。如果尝试添加更多项，则会导致抛出错误。以这个最大值作为初始值创建数组，可能导致脚本运行时间过长的错误。
:::

## 检测数组
通过instanceof操作符进行判断：
```js
if (myArray instanceof Array){
 // 操作数组
}
```
使用 instanceof 的问题是假定只有一个全局执行上下文。如果网页里有多个框架，则可能涉及两个不同的全局执行上下文，因此就会有两个不同版本的 Array 构造函数。如果要把数组从一个框架传给另一个框架，则这个数组的构造函数将有别于在第二个框架内本地创建的数组。

为解决这个问题，ECMAScript 提供了 Array.isArray()方法。这个方法的目的就是确定一个值是否为数组，而不用管它是在哪个全局执行上下文中创建的。来看下面的例子：
```js
if (Array.isArray(value)){
 // 操作数组
} 
```

## 迭代器方法
在 ES6 中，Array 的原型上暴露了 3 个用于检索数组内容的方法：keys()、values()和entries()。
- keys()返回数组索引的迭代器
- values()返回数组元素的迭代器
-  entries()返回索引/值对的迭代器：

```js
const a = ["foo", "bar", "baz", "qux"];
// 因为这些方法都返回迭代器，所以可以将它们的内容
// 通过 Array.from()直接转换为数组实例
const aKeys = Array.from(a.keys());
const aValues = Array.from(a.values());
const aEntries = Array.from(a.entries());
console.log(aKeys); // [0, 1, 2, 3]
console.log(aValues); // ["foo", "bar", "baz", "qux"]
console.log(aEntries); // [[0, "foo"], [1, "bar"], [2, "baz"], [3, "qux"]]
```

使用 ES6 的解构可以非常容易地在循环中拆分键/值对：
```js
const a = ["foo", "bar", "baz", "qux"];
for (const [idx, element] of a.entries()) {
 console.log(idx);
 console.log(element);
}
// 0
// foo
// 1
// bar
// 2
// baz
// 3
// qux 
```

## 复制和填充方法
- ES6 新增了两个方法：批量复制方法 copyWithin()，以及填充数组方法 fill()。
- 这两个方法的函数签名类似，都需要指定既有数组实例上的一个范围，包含开始索引，不包含结束索引。
- 使用这个方法不会改变数组的大小。

### fill()
- 使用 fill()方法可以向一个已有的数组中插入全部或部分相同的值。
- 开始索引用于指定开始填充的位置，它是可选的。
- 如果不提供结束索引，则一直填充到数组末尾。
- 负值索引从数组末尾开始计算。也可以将负索引想象成数组长度加上它得到的一个正索引

```js
const zeroes = [0, 0, 0, 0, 0];

// 用 5 填充整个数组
zeroes.fill(5);
console.log(zeroes); // [5, 5, 5, 5, 5]
zeroes.fill(0); // 重置（这里的重置是字面意思，并不是传入0就是重置数组，还是原数组都是0填充的）

// 用 6 填充索引大于等于 3 的元素
zeroes.fill(6, 3);
console.log(zeroes); // [0, 0, 0, 6, 6]
zeroes.fill(0); // 重置

// 用 7 填充索引大于等于 1 且小于 3 的元素
zeroes.fill(7, 1, 3);
console.log(zeroes); // [0, 7, 7, 0, 0];
zeroes.fill(0); // 重置

// 用 8 填充索引大于等于 1 且小于 4 的元素
// (-4 + zeroes.length = 1)
// (-1 + zeroes.length = 4)
zeroes.fill(8, -4, -1);
console.log(zeroes); // [0, 8, 8, 8, 0];
```

fill()静默忽略超出数组边界、零长度及方向相反的索引范围：
```js
const zeroes = [0, 0, 0, 0, 0];

// 索引过低，忽略
zeroes.fill(1, -10, -6);//加了数组长度还是小于0，忽略。zeroes.fill(1, -5, -1)
console.log(zeroes); // [0, 0, 0, 0, 0]

// 索引过高，忽略
zeroes.fill(1, 10, 15);//超过数组长度，忽略
console.log(zeroes); // [0, 0, 0, 0, 0]

// 索引反向，忽略
zeroes.fill(2, 4, 2);
console.log(zeroes); // [0, 0, 0, 0, 0]

// 索引部分可用，填充可用部分
zeroes.fill(4, 3, 10)
console.log(zeroes); // [0, 0, 0, 4, 4] 
```

### copyWithin()
与fill()不同，copyWithin()会按照指定范围浅复制数组中的部分内容，然后将它们插入到指定索引开始的位置：
```js
let ints,
 reset = () => ints = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
reset();

// 从 ints 中复制索引 0 开始的内容，插入到索引 5 开始的位置
// 在源索引或目标索引到达数组边界时停止
ints.copyWithin(5);
console.log(ints); // [0, 1, 2, 3, 4, 0, 1, 2, 3, 4]
reset();

// 从 ints 中复制索引 5 开始的内容，插入到索引 0 开始的位置
ints.copyWithin(0, 5);
console.log(ints); // [5, 6, 7, 8, 9, 5, 6, 7, 8, 9]
reset(); 

// 从 ints 中复制索引 0 开始到索引 3 结束的内容
// 插入到索引 4 开始的位置
ints.copyWithin(4, 0, 3);
console.log(ints); // [0, 1, 2, 3, 0, 1, 2, 7, 8, 9]
reset();

// JavaScript 引擎在插值前会完整复制范围内的值
// 因此复制期间不存在重写的风险
ints.copyWithin(2, 0, 6);
console.log(ints); // [0, 1, 0, 1, 2, 3, 4, 5, 8, 9]
reset();

// 支持负索引值，与 fill()相对于数组末尾计算正向索引的过程是一样的
ints.copyWithin(-4, -7, -3); //ints.copyWithin(6, 3, 7);
console.log(ints); // [0, 1, 2, 3, 4, 5, 3, 4, 5, 6]
```

copyWithin()静默忽略超出数组边界、零长度及方向相反的索引范围：
```js
let ints,
 reset = () => ints = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
reset();

// 索引过低，忽略
ints.copyWithin(1, -15, -12);
console.log(ints); // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
reset()

// 索引过高，忽略
ints.copyWithin(1, 12, 15);
console.log(ints); // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
reset();

// 索引反向，忽略
ints.copyWithin(2, 4, 2);
console.log(ints); // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
reset();

// 索引部分可用，复制、填充可用部分
ints.copyWithin(4, 7, 10)
console.log(ints); // [0, 1, 2, 3, 7, 8, 9, 7, 8, 9]; 
```

总结：
1. copyWithin()只传一个参数，从索引0开始到索引参数-1复制，然后插入到参数开始的位置，不能超过数组的长度。
2. copyWithin()只传两个参数，第一位参数代表意思是插入索引开始的位置，第二位参数代表的意思是从第二位参数到数组长度-1复制一份，然后插入到第一位参数开始的位置。
3. copyWithin()只传三个参数，第一位参数代表意思是插入的位置，从这个位置插入；第二个参数第三个参数的意思是，从第二个参数到第三个参数-1复制，可以理解为调用第二三位参数调用了slice()去截取数组。截取完插入第一位参数插入的位置
4. copyWithin()索引过高、索引过低、反向索引都忽略

## 转换方法
所有对象都有有 toLocaleString()、toString()和 valueOf()方法。  
在数组中：
1. valueOf()返回的还是数组本身。
2. toString()返回由数组中每个值的等效字符串拼接而成的一个逗号分隔的字符串

```js
let colors = ["red", "blue", "green"]; // 创建一个包含 3 个字符串的数组
console.log(colors.toString(),colors.length); // red,blue,green  14   这里长度为11，可以理解为colors.join(",")
console.log(colors.valueOf(),colors.length); // ["red","blue","green"]  3
console.log(colors,colors.length); // ["red","blue","green"]  3

//如何证明toString()方法相当于调用了join(",")
console.log(colors instanceof Array); //false
console.log(typeof colors.toString());//string
console.log(colors.valueOf() instanceof Array); //true
console.log(colors instanceof Array); //true
```

toLocaleString()方法也可能返回跟 toString()和 valueOf()相同的结果，但有些情况也不一定。调用数组的 toLocaleString()方法时，也会得到一个逗号分隔的数组值的字符串。它与另外两个方法唯一的区别是，为了得到最终的字符串，会调用数组每个值的 toLocaleString()方法，而不是toString()方法。看下面的例子：

```js
let person1 = {
 toLocaleString() {
    return "Nikolaos";
 },
 toString() {
    return "Nicholas";
 }
};
let person2 = {
 toLocaleString() {
    return "Grigorios";
 },
 toString() {
    return "Greg";
 }
};
let people = [person1, person2];
alert(people); // Nicholas,Greg  //这里是隐式调用了数组的toString()，与下面显式调用数组的toString()方法返回结果一致
alert(people.toString()); // Nicholas,Greg  //显式调用了数组的toString()方法
alert(people.toLocaleString()); // Nikolaos,Grigorios   //显式调用了数组的toLocaleString()方法


```

补充：这里的alert接收的是字符串，传数组不满足要求，但是会隐式调用数组的toString()方法，如何证明：
```js
let person1 = {
  toString() {
    return ["Nicholas"];
  },
};
let person2 = {
  toString() {
    return ["Grigorios"];
  },
};
let people = [person1, person2];
alert(people);//Uncaught TypeError: Cannot convert object to primitive value.  两个数组是没法用join()的
```

**join()不传参数默认就是undefined，undefined用`,`拼接**

:::warning 注意
如果数组中某一项是 null 或 undefined，则在 join()、toLocaleString()、toString()和 valueOf()返回的结果中会以空字符串表示。
:::


## 栈方法
ECMAScript 给数组提供几个方法，让它看起来像是另外一种数据结构。数组对象可以像栈一样，也就是一种限制插入和删除项的数据结构。栈是一种后进先出（LIFO Last-In-First-Out）的结构，也就是最近添加的项先被删除。  
数据项的插入（称为推入，push）和删除（称为弹出，pop）只在栈的一个地方发生，即栈顶。    
ECMAScript 数组提供了 push()和 pop()方法，以实现类似栈的行为。

**push()：**
1. 此方法接收任意数量参数，并将它们添加至数组末尾。
2. 此方法改变原数组
3. 此方法返回数组数组的最新长度。
4. 此方法传空时，不对数组进行任何操作，返回原数组长度
**pop()：**
1. 此方法用于删除数组最后一项，同时减少数组的长度
2. 此方法改变原数组
3. 此方法返回删除的项。
```js
let colors = new Array(); // 创建一个数组
let count = colors.push("red", "green"); // 推入两项
console.log(count); // 2
count = colors.push("black"); // 再推入一项
console.log(count); // 3
let item = colors.pop(); // 取得最后一项
console.log(item); // black
console.log(colors.length); // 2 
```


## 队列方法
队列以先进先出（FIFO，First-In-First-Out）形式限制访问。队列在列表末尾添加数据，但从列表开头获取数据。

**shift()：**
1. 此方法不接收参数
2. 此方法改变原数组
3. 此方法删除数组第一项，并改变数组长度
4. 此方法返回删除的项
```js
const colors = ["red","blue","green"];
console.log(colors.shift(), colors); // "red"  ["blue","green"]
```

**unshift()：**
1. 此方法类似push()，可接收任意数量的参数
2. 此方法改变原数组
3. 此方法从数组开头添加数据，并修改数组长度
4. 此方法返回修改后的新的数组长度
5. 此方法传空时，不对数组进行任何操作，返回原数组长度
```js
const colors = ["red","blue","green"];
console.log(colors.unshift("black","pink"), colors); //4  ["black","pink","red","blue","green"]
```

## 排序方法
reverse()方法就是将数组元素反向排列。比如：
```js
let values = [1, 2, 3, 4, 5];
values.reverse();
console.log(values); // [5,4,3,2,1] 
```
**reverse()：**
1. 此方法改变原数组
2. 此方法返回改变后的数组

此方法仅是反转数组，不能做到对数组排序的效果，排序效果可借用sort，它接收一个比较函数：
```js
//升序
function compare(value1, value2) {
 if (value1 < value2) {
 return -1;
 } else if (value1 > value2) {
 return 1;
 } else {
 return 0;
 }
} 
let values = [0, 1, 5, 10, 15];
values.sort(compare);
console.log(values); // [0,1,5,10,15]

//降序
function compare(value1, value2) {
 if (value1 < value2) {
 return 1;
 } else if (value1 > value2) {
 return -1;
 } else {
 return 0;
 }
}
let values = [0, 1, 5, 10, 15];
values.sort(compare);
console.log(values); // [15,10,5,1,0]

//可简化为箭头函数
let values = [0, 1, 5, 10, 15];
values.sort((a, b) => a < b ? 1 : a > b ? -1 : 0);
console.log(values); // 15,10,5,1,0 
```

在这个修改版函数中，如果第一个值应该排在第二个值后面则返回 1，如果第一个值应该排在第二个值前面则返回-1。

如果数组的元素是数值，或者是其 valueOf()方法返回数值的对象（如 Date 对象），这个比较函数还可以写得更简单，因为这时可以直接用第二个值减去第一个值：
```js
function compare(value1, value2){
 return value1 - value2;//value1 - value2为递增，value1 - value2为递减。value2索引比value1索引大
}
```

## 操作方法
concat()方法可以在现有数组全部元素基础上创建一个新数组。它首先会创建一个当前数组的副本，然后再把它的参数添加到副本末尾，最后返回这个新构建的数组。
1. 此方法不改变原数组
2. 此方法返回新数组
3. 此方法可接收多个参数，参数可以是任意类型。

```js
let colors = ["red", "green", "blue"];
let colors2 = colors.concat("yellow", ["black", "brown"]);
console.log(colors); // ["red", "green","blue"]
console.log(colors2); // ["red", "green", "blue", "yellow", "black", "brown"]
```

:::warning 注意
concat()返回的默认是一维数组，但我们可以通过Symbol.isConcatSpreadable这个符号能够阻止 concat()打平参数数组，值为true是强制打平类数组对象。
:::

```js
let colors = ["red", "green", "blue"];
let newColors = ["black", "brown"];
let moreNewColors = {
 [Symbol.isConcatSpreadable]: true,
 length: 2,
 0: "pink",
 1: "cyan"
};
newColors[Symbol.isConcatSpreadable] = false;

// 强制不打平数组
let colors2 = colors.concat("yellow", newColors);
// 强制打平类数组对象
let colors3 = colors.concat(moreNewColors);

console.log(colors); // ["red", "green", "blue"]
console.log(colors2); // ["red", "green", "blue", "yellow", ["black", "brown"]]
console.log(colors3); // ["red", "green", "blue", "pink", "cyan"] 
```

方法 slice()用于创建一个包含原有数组中一个或多个元素的新数组。
1. slice()方法可以接收一个或两个参数：返回元素的开始索引和结束索引其中不包含结束索引对应的元素。
2. 如果只有一个参数，则 slice()会返回该索引到数组末尾的所有元素。
3. 此方法不改变原数组。
4. 此方法返回截取后的数组。

```js
let colors = ["red", "green", "blue", "yellow", "purple"];
let colors2 = colors.slice(1);
let colors3 = colors.slice(1, 4);
console.log(colors2); //    [green,blue,yellow,purple]
console.log(colors3); //    [green,blue,yellow ]
```

:::warning 注意
如果 slice() 的参数有负值，那么就以数值长度加上这个负值的结果来确定索引。比如，在包含 5 个元素的数组上调用 slice(-2,-1)，就相当于调用 slice(3,4)。如果结束位置小于开始位置，则返回空数组。
:::

最强大的数组方法就属 splice()了，使用它的方式可以有很多种。splice()的主要目的是在数组中间插入元素，但有 3 种不同的方式使用这个方法。
- **删除**。需要给 splice()传 2 个参数：要删除的第一个元素的位置和要删除的元素数量。可以从数组中删除任意多个元素，比如 splice(0, 2)会删除前两个元素。
- **插入**。需要给 splice()传 3 个参数：开始位置、0（要删除的元素数量）和要插入的元素，可以在数组中指定的位置插入元素。第三个参数之后还可以传第四个、第五个参数，乃至任意多个要插入的元素。比如，splice(2, 0, "red", "green")会从数组位置 2 开始插入字符串"red"和"green"。
- **替换**。splice()在删除元素的同时可以在指定位置插入新元素，同样要传入 3 个参数：开始位置、要删除元素的数量和要插入的任意多个元素。要插入的元素数量不一定跟删除的元素数量一致。比如，splice(2, 1, "red", "green")会在位置 2 删除一个元素，然后从该位置开始向数组中插入"red"和"green"。

- 此方法改变原数组
- 此方法在插入时候返回空数组，删除和替换返回删除的项组成的数组

```js
let colors = ["red", "green", "blue"];
let removed = colors.splice(0,1); // 删除第一项
console.log(colors); // green,blue
console.log(removed); // red，只有一个元素的数组

removed = colors.splice(1, 0, "yellow", "orange"); // 在位置 1 插入两个元素
console.log(colors); // green,yellow,orange,blue
console.log(removed); // 空数组

removed = colors.splice(1, 1, "red", "purple"); // 插入两个值，删除一个元素
console.log(colors); // green,red,purple,orange,blue
console.log(removed); // yellow，只有一个元素的数组
```


## 搜索和位置方法
ECMAScript 提供两类搜索数组的方法：按严格相等搜索和按断言函数搜索。

**1. 严格相等**
ECMAScript 提供了 3 个严格相等的搜索方法：indexOf()、lastIndexOf()和 includes()。

其中，前两个方法在所有版本中都可用，而第三个方法是 ECMAScript 7 新增的。
- 这些方法都接收两个参数：要查找的元素和一个可选的起始搜索位置。   
- indexOf()和 includes()方法从数组前头（第一项）开始向后搜索，而 lastIndexOf()从数组末尾（最后一项）开始向前搜索。  
- indexOf()和 lastIndexOf()都返回要查找的元素在数组中的位置，如果没找到则返回-1。
- includes()返回布尔值，表示是否至少找到一个与指定元素匹配的项。
- 在比较第一个参数跟数组每一项时，会使用全等（===）比较，也就是说两项必须严格相等。

```js
let numbers = [1, 2, 3, 4, 5, 4, 3, 2, 1];

console.log(numbers.indexOf(4)); // 3
console.log(numbers.lastIndexOf(4)); // 5
console.log(numbers.includes(4)); // true

console.log(numbers.indexOf(4, 4)); // 5
console.log(numbers.lastIndexOf(4, 4)); // 3
console.log(numbers.includes(4, 7)); // false

let person = { name: "Nicholas" };
let people = [{ name: "Nicholas" }];
let morePeople = [person];

console.log(people.indexOf(person)); // -1
console.log(morePeople.indexOf(person)); // 0
console.log(people.includes(person)); // false
console.log(morePeople.includes(person)); // true 
```

**2. 断言函数**
find()和 findIndex()方法使用了断言函数。这两个方法都从数组的最小索引开始。find()返回第一个匹配的元素，findIndex()返回第一个匹配元素的索引。这ECMAScript 也允许按照定义的断言函数搜索数组，每个索引都会调用这个函数。断言函数的返回值决定了相应索引的元素是否被认为匹配。

1. 断言函数接收 3 个参数：元素、索引和数组本身。其中元素是数组中当前搜索的元素，索引是当前元素的索引，而数组就是正在搜索的数组。
2. 断言函数返回真值，表示是否匹配。
3. 这两个方法也都接收第二个可选的参数，用于指定断言函数内部 this 的值。
4. 找到满足条件后，不会再检查后面的元素是否满足条件。

```js
const people = [
  {
    name: "Matt",
    age: 27,
  },
  {
    name: "Nicholas",
    age: 29,
  },
];

console.log(people.find((element, index, array) => element.age < 28)); // {name: "Matt", age: 27}

console.log(people.findIndex((element, index, array) => element.age < 28)); // 0

console.log(
  people.find(
    function (element, index, array) {
      return element.age > this.condition;
    },
    { condition: 28 }
  )
); //{name: 'Nicholas', age: 29}   接收第二参数，指名this的值
```

```js
const evens = [2, 4, 6];

// 找到匹配后，永远不会检查数组的最后一个元素
evens.find((element, index, array) => {
 console.log(element);
 console.log(index);
 console.log(array);
 return element === 4;
});

// 2
// 0
// [2, 4, 6]
// 4
// 1
// [2, 4, 6]
```

## 迭代方法
ECMAScript 为数组定义了 5 个迭代方法：every()、filter()、forEach()、map()、some()。

- 每个方法接收两个参数：以每一项为参数运行的函数，以及可选的作为函数运行上下文的作用域对象（影响函数中 this 的值）。
- 传给每个方法的函数接收 3个参数：数组元素、元素索引和数组本身。
- 因具体方法而异，这个函数的执行结果可能会也可能不会影响方法的返回值。

数组的 5 个迭代方法如下：
- `every()`：对数组每一项都运行传入的函数，如果对每一项函数都返回 true，则这个方法返回 true。
- `filter()`：对数组每一项都运行传入的函数，函数返回 true 的项会组成数组之后返回。
- `forEach()`：对数组每一项都运行传入的函数，没有返回值。
- `map()`：对数组每一项都运行传入的函数，返回由每次函数调用的结果构成的数组。
- `some()`：对数组每一项都运行传入的函数，如果有一项函数返回 true，则这个方法返回 true。

在这些方法中，every()和 some()是最相似的，都是从数组中搜索符合某个条件的元素。

对 every()来说，传入的函数必须对每一项都返回 true，它才会返回 true；否则，它就返回 false。
而对 some()来说，只要有一项让传入的函数返回 true，它就会返回 true。下面是一个例子：
```js
let numbers = [1, 2, 3, 4, 5, 4, 3, 2, 1];

let everyResult = numbers.every((item, index, array) => item > 2);
console.log(everyResult); // false  一项不满足则就返回不满足

let someResult = numbers.some((item, index, array) => item > 2);
console.log(someResult); // true  满足一项即可
```

filter()这个方法基于给定的函数来决定某一项是否应该包含在它返回的数组中，会返回一个新数组。比如，要返回一个所有数值都大于 2 的数组，可以使用如下代码：
```js
let numbers = [1, 2, 3, 4, 5, 4, 3, 2, 1];

let filterResult = numbers.filter((item, index, array) => item > 2);
console.log(filterResult); // 3,4,5,4,3
```
这里，调用 filter()返回的数组包含 3、4、5、4、3，因为只有对这些项传入的函数才返回 true。这个方法非常适合从数组中筛选满足给定条件的元素。

map()方法也会返回一个数组，但不会改变原数组。这个数组的每一项都是对原始数组中同样位置的元素运行传入函数而返回的结果。
```js
let numbers = [1, 2, 3, 4, 5, 4, 3, 2, 1];

let mapResult = numbers.map((item, index, array) => item * 2);

console.log(mapResult); // 2,4,6,8,10,8,6,4,2
```
forEach()方法。这个方法只会对每一项运行传入的函数，没有返回值。本质上，forEach()方法相当于使用 for 循环遍历数组。比如：
```js
let numbers = [1, 2, 3, 4, 5, 4, 3, 2, 1];
numbers.forEach((item, index, array) => {
 // 执行某些操作
});
```

## 归并方法
ECMAScript 为数组提供了两个归并方法：reduce()和 reduceRight()。这两个方法都会迭代数组的所有项，并在此基础上构建一个最终返回值。

- reduce()方法从数组第一项开始遍历到最后一项，而 reduceRight()从最后一项开始遍历至第一项。
- 这两个方法都接收两个参数：对每一项都会运行的归并函数，以及可选的以之为归并起点的初始值。
- 传给 reduce()和 reduceRight()的函数接收 4 个参数：上一个归并值、当前项、当前项的索引和数组本身。这个函数返回的任何值都会作为下一次调用同一个函数的第一个参数。如果没有给这两个方法传入可选的第二个参数（作为归并起点值），则第一次迭代将从数组的第二项开始，因此传给归并函数的第一个参数是数组的第一项，第二个参数是数组的第二项。==(通俗讲第二参数只是作为相加的初始值，不填默认从数组第一项作为初始值，依次往后加)==

```js
let values = [1, 2, 3, 4, 5];
let sum = values.reduce((prev, cur, index, array) => prev + cur);
console.log(sum); // 15 

let values = [1, 2, 3, 4, 5];
let sum = values.reduceRight(function(prev, cur, index, array){
 return prev + cur;
});
console.log(sum); // 15

//reduceRight()方法与之类似，只是方向相反。
let sum = values.reduce((prev, cur, index, array) => prev + cur);
console.log(sum); // 15 
```
究竟是使用 reduce()还是 reduceRight()，只取决于遍历数组元素的方向。除此之外，这两个方法没什么区别。

上面的reduce都是求和，也可以求积数和求最大值，最小值
```js
const numbers = [1, 2, 3, 4, 5];
const sum = numbers.reduce((x, y) => x + y, 0); //数组求和
console.log(sum);
const product = numbers.reduce((x, y) => x * y, 1); //数组求积
console.log(product);
const max = numbers.reduce((x, y) => (x > y ? x : y)); //数组求最大值
console.log(max);
const min = numbers.reduce((x, y) => (x > y ? y : x)); //数组求最小值
console.log(min);
```




