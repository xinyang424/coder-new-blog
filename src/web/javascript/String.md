---
title: String
date: 2022-02-15
category:
  - javascript
---


<!-- more -->

## 字符串声明

```js
const str1 = 'Hello';
const str2 = "Hello";
const str3 = `Hello`;
const str4 = new String("Hello");
```

- 声明字符串可用单引号、双引号或反引号。
- 用`new`关键字创建的字符串与直接创建的区别是：用`new`关键字创建的字符串可用`instanceof`检测`Object`为`true`
  即：
```js
const str1 = 'Hello';
const str2 = new String("Hello");

console.log(str1 instanceof Object); //false
console.log(str2 instanceof Object); //true
```

**注：**
- 字符串长度索引，从左开始是从0开始的，如`Hello`字符串，第0位是`H`，第1位是`e`，第三位是`l`.....  
  从右开始，就是从-1开始的，如`Hello`字符串，第-1位是`o`，第-2位是`l`，第-3位是`l`.....  
- 传两位参数都是前包括，后不包括，如：`xx.slice(0,5)`，就是只取第0到第4位，第5位不取。
- 这两个特性都是js的特性，无论是字符串操作，还是数组操作，后面不做单独介绍。

## xx.length

`xx.length`
- 返回字符串的长度。
- 不改变原字符串

```js
const message = "abcde";
console.log(message.length); //5
```


## xx.concat()

用于将一个或多个字符串拼接成一个新字符串。来看下面的例子：
```js
let stringValue = "hello ";
let result = stringValue.concat("world");
console.log(result); // "hello world"
console.log(stringValue); // "hello"

console.log(stringValue.concat("world ","!!!"));//"hello world !!!"
```

- 此方法不会改变原字符串
- 此方法返回新的字符串
- 此方法可以接收多个参数，因此可以一次性拼接多个覅穿

## xx.slice(number,number?)

- 此方法返回截取后新的字符串，且不会改变原字符串
- 只传第一位，不传第二位，第二位默认为字符串的长度
- 若两位参数相等，则返回空字符串
- 整数大于字符串长度，则是按照字符串最大长度计算。负数绝对值大于字符串长度，按0计算
- 第一位和第二位，若区域从左指向右，截取有效。若区域右指向左，截取无效，返回空字符串。因此第一位参数不一定要大于第二位
- 第一位正数，第二位负数，且都两个参数绝对值都小于字符串最大长度，可以两边开始截取

**Tip：**
上面为什么要说成“第一位和第二位，若区域从左指向右，截取有效。若区域右指向左，截取无效，返回空字符串。因此第一位参数不一定要大于第二位”，为什么不直接说成第一位参数一定要小于第二位参数，因为这个是不严谨的，因为在一些情况下，第一位参数为正数，第二位参数为负数，也可能会截取成功的。

```js
let stringValue = "hello world";

console.log(stringValue.length); // 字符串长度为11

//这是一条分界线

console.log(stringValue.slice(3)); // "lo world"  从左向右截取，字符串0-2位不要，剩下全要，等价于 stringValue.slice(3,stringValue.length)

console.log(stringValue.slice(-3)); // "rld"    从右向左截取，只截取-1到-2位，等价于 stringValue.slice(-3,stringValue.length)

//这是一条分界线
console.log(stringValue.slice(15));  // "" (empty string)   等价于 stringValue.slice(stringValue.length,stringValue.length)，若两位参数相等，则返回空字符串

console.log(stringValue.slice(1,1)); // "" (empty string)   若两位参数相等，则返回空字符串

//这是一条分界线

console.log(stringValue.slice(1,3)); // "el"

console.log(stringValue.slice(3,1)); // "" (empty string)   从右指向左，截取无效，返回空字符串

//这是一条分界线

console.log(stringValue.slice(-3,-1)); // "rl"

console.log(stringValue.slice(-1,-3)); // "" (empty string)  从右指向左，截取无效，返回空字符串

//这是一条分界线
console.log(stringValue.slice(1, 15)); // "ello world"  超过字符串长度按照字符串最大长度计算  等价于 stringValue.slice(1,stringValue.length)

console.log(stringValue.slice(-1, -15)); //"" (empty string)   从右指向左，截取无效，返回空字符串


//这是一条分界线
console.log(stringValue.slice(1, -3)); // "ello wo"   第一位正数，第二位负数，且都两个参数绝对值都小于字符串最大长度，可以两边开始截取
console.log(stringValue.slice(-1, 3)); //"" (empty string)   从右指向左，截取无效，返回空字符串

//这是一条分界线
console.log(stringValue.slice(1, -15)); // "" (empty string)  负数绝对值大于字符串长度，按0计算 等价于 stringValue.slice(1,0)  又因从右指向左，截取无效，返回空字符串
console.log(stringValue.slice(-15, 1)); // h  负数绝对值大于字符串长度，按0计算  等价于 stringValue.slice(0,1)
```

## xx.substring(number,number?)

- xx.substring()会返回新的字符串，不会修改原字符串
- 只传第一位，不传第二位，第二位默认为字符串的长度
- 若两位参数相等，则返回空字符串
- 整数大于字符串长度，则是按照字符串最大长度计算。负数绝对值大于字符串长度，按0计算
- substring()方法会将所有负参数值都转换为 0
- substring()方法第一位和第二位参数，无论从左到右还是从右到左都有效，因为两个参数无论是第一位大于第二位还是第二位大于第一位，内部都会排序为第一位小于第二位。


```js
const stringValue = "hello world";

console.log(stringValue.length); // 11 字符串长度为1


//这是一条分界线
console.log(stringValue.substring(3)); // "lo world"  只传第一位，不传第二位，第二位默认为字符串的长度，等价于stringValue.substring(3,stringValue.length)
console.log(stringValue.substring(-3)); // "hello world" substring()方法会将所有负参数值都转换为0，只传第一位，不传第二位，第二位默认为字符串的长度，等价于stringValue.substring(0,stringValue.length)

//这是一条分界线
console.log(stringValue.substring(1,3)); // "el" substring()方法第一位和第二位参数，无论从左到右还是从右到左都有效
consoloe.log(stringValue.substring(3,1));// "el" substring()方法第一位和第二位参数，无论从左到右还是从右到左都有效

//这是一条分界线
console.log(stringValue.substring(-3,-1)); // ""  (empty string)  
console.log(stringValue.substring(-1,-3)); // ""  (empty string)
//substring()方法会将所有负参数值都转换为 0，变为stringValue.substring(0,0),因为两参数一样，返回空字符串

//这是一条分界线
console.log(stringValue.slice(1, 15)); // "ello world"  整数大于字符串长度，则是按照字符串最大长度计算  等价于 stringValue.slice(1,stringValue.length)
console.log(stringValue.slice(15, 1)); // "ello world"  整数大于字符串长度，则是按照字符串最大长度计算 等价于 stringValue.slice(stringValue.length,1)
//两个传参顺序不同，但结果相同，因为 两个参数无论是第一位大于第二位还是第二位大于第一位，内部都会排序为第一位小于第二位。
```

## xx.substr(number,number?)

- xx.substr()会返回新的字符串，不会修改原字符串
- 只传第一位，不传第二位，第二位默认为 `字符串的长度 - 第一位参数`
- ==与前两个不同的是，substr()第二个参数并不是代表截取索引位置，而是代表截取个数！！！==，第二位参数代表意思是从哪里开始截取。
- 第二位参数为负数，则会将第二个负参数值转换为 0，此时返回空字符串
- 第一位参数整数大于字符串长度，则是按照字符串最大长度计算，返回为空字符串。第一位参数负数绝对值大于字符串长度，按0计算。
- 第一位参数负数绝对值小于等于字符串长度，则第一个负参数值当成字符串长度加上该值


```js
const stringValue = "hello world";

console.log(stringValue.length); // 11 字符串长度为11


console.log(stringValue.substr(3));//"lo world" 只传第一位，第二位默认为字符串的长度。等价于stringValue.substr(3,11 - 3) => stringValue.substr(3,8)

console.log(stringValue.substr(-3)); // "rld"  第一位为负数，则第一个负参数值当成字符串长度加上该值，等价于stringValue.substr(11 - 3); 即stringValue.substr(8)，只传第一位，第二位默认为"字符串的长度 - 第一位参数"。等价于stringValue.substr(8,11 - 8) =>stringValue.substr(8,3)


console.log(stringValue.substr(3,2));// "lo"  第一位代表意思是从第三位截取，第二位代表意思是两取两位，即"lo"

conosle.log(stringValue.substr(3,-2)); //"" (empty string) ，第二位为负数为转化为0，等价于 stringValue.substr(3,0)，返回空字符串

console.log(stringValue.substr(-3,2)); //"rl" 若第一位为负数，则要加上字符串的长度，即等价于stringValue.substr(-3 + 11,2) => stringValue.substr(8,2)

console.log(stringValue.substr(-3,-2));//"" (empty string) 由上知，第一位变化等价于stringValue.substr(8,-2)，第二位为负数为转化为0，即等价于stringValue.substr(-3,0)

console.log(stringValue.substr(-15,2));// "he" ，第一位负数绝对值大于字符串长度，按0计算，即等价于stringValue.substr(0,2)

console.log(stringValue.substr(15,2)); //"" (empty string)，第一位正数大于字符串长度，返回空字符串。

```



## xx.indexof(string) 和 xx.lastIndexof(string)

```js
let stringValue = "hello world";
console.log(stringValue.indexOf("o")); // 4
console.log(stringValue.lastIndexOf("o")); // 7 
```

- `stringValue.indexOf("o")`返回的是第一个字母`o`的索引（所以从0开始，从左向右）。
- `stringValue.lastIndexOf("o")`返回的是最后一个字母`o`的索引。
- 若`indexOf`和`lastIndexOf`的参数是字母`z`，实际它并不存在，则返回结果为-1。可用于判断某一个字符是否存在改字符串内。
- 若`hello world`只有一个字母`o`，则`stringValue.indexOf("o")`和`stringValue.lastIndexOf("o")`返回的值一样。

`indexof`和`lastIndexof`和接收第二个参数：
- `indexof`接收的第二个参数代表意思是会从这个参数指定的位置开始向字符串末尾搜索，忽略该位置之前的字符。
- `lastIndexof`接收第二个参数代表意思与`indexof`相反，会从这个参数指定的位置开始向字符串开头搜索，忽略该位置之后直到字符串末尾的字符。
- 两个不传第二参数默认都为0

```js
let stringValue = "hello world";
console.log(stringValue.indexOf("o", 6)); // 7
console.log(stringValue.lastIndexOf("o", 6)); // 4 
```

像这样使用第二个参数并循环调用indexOf()或 lastIndexOf()，就可以在字符串中找到所有的目标子字符串，如下所示：
```js
let stringValue = "Lorem ipsum dolor sit amet, consectetur adipisicing elit";
let positions = new Array();
let pos = stringValue.indexOf("e");
while(pos > -1) {
 positions.push(pos);
 pos = stringValue.indexOf("e", pos + 1);
}
console.log(positions); // [3,24,32,35,52]
```

**indexof和lastIndexof两者区别：**
相同：
1. 都能接收两个参数，第一个参数为string类型，第二个类型为number类型。
2. 当都检索不到值都返回-1。
3. 传入第二个值代表的意思都是开始检索的位置
4. 传入第二个值(负数)，会被当为0处理。（没有官方说明，自己理解的），证明理由：
```js
const stringValue = "hello world";

console.log(stringValue.indexof("e",-3)); // 1 根据前面的规律，如果为负数，会加上字符串的长度，等价于 stringValue.indexof("e",-3 + 11)再看下面的
console.log(stringValue.indexof("e",8)); // -1  -1代表的就是找不到，能理解为indexof把负数处理为0

console.log(stringValue.lastIndexof("e",-3)); // -1 等价于stringValue.lastIndexof("e",0)，此时再从右向左已经不用检索了
console.log(stringValue.lastIndexof("e",8)); // 1
```
不同：
1. indexof是从0开始检索，lastIndexof是从String.length - 1开始检索。（简单来讲就是一个从头，一个从尾）
2. indexof只传第一个数，第二个数默认为0，lastIndexof不传第二个数，默认为String.length - 1
3. 传入第二个值(正数)，indexof代表忽略这个值之前的，lastIndexof代表忽略这个值之后的。(indexof是从左向右，lastIndexof是从右向左)


## startsWith()、endsWith()和 includes()

**共同点**
1. 不改变原字符串
2. 返回值为Boolean
**不同点**
startsWith()检查开始于索引 0 的匹配项，endsWith()检查开始于索引(string.length - substring.length)的匹配项，而 includes()检查整个字符串。  
通俗点讲：startsWith()检测是以什么开头，endsWith()检测是以什么结尾，includes()检测的是包含即可，不管你是中间、结尾还是开头。

```js
let message = "foobarbaz";
console.log(message.startsWith("foo")); // true
console.log(message.startsWith("bar")); // false
console.log(message.endsWith("baz")); // true
console.log(message.endsWith("bar")); // false
console.log(message.includes("bar")); // true
console.log(message.includes("qux")); // false 
```

除此之外，startsWith()和 includes()方法接收可选的第二个参数，表示开始搜索的位置。如果传入第二个参数，则意味着这两个方法会从指定位置向着字符串末尾搜索，忽略该位置之前的所有字符。下面是一个例子：
```js
let message = "foobarbaz";
console.log(message.startsWith("foo")); // true
console.log(message.startsWith("foo", 1)); // false
console.log(message.includes("bar")); // true
console.log(message.includes("bar", 4)); // false
```
endsWith()方法接收可选的第二个参数，表示应该当作字符串末尾的位置。如果不提供这个参数，那么默认就是字符串长度。如果提供这个参数，==那么就好像字符串只有那么多字符一样==：

```js
let message = "foobarbaz";
console.log(message.endsWith("bar")); // false
console.log(message.endsWith("bar", 6)); // true
```

上面“那么就好像字符串只有那么多字符一样”，可以理解为本来长度9位的字符串，指定为6位的字符串长度，即：
这里的描述并不是笔者的描述，而是出自《JavaScript高级程序设计（第4版》
```js
console.log("foobar".endsWith("bar", 6)); // true
```

## trim()

- 不改变原字符串
- 返回新的字符串

```js
let stringValue = " hello world ";
let trimmedStringValue = stringValue.trim();
console.log(stringValue); // " hello world "
console.log(trimmedStringValue); // "hello world" 
```

## repeat()
ECMAScript 在所有字符串上都提供了 repeat()方法。这个方法接收一个整数参数，表示要将字符串复制多少次，然后返回拼接所有副本后的结果。
```js
let stringValue = "na ";
console.log(stringValue.repeat(16) + "batman");// na na na na na na na na na na na na na na na na batman
```

## padStart()和 padEnd()
padStart()和 padEnd()方法会复制字符串，如果小于指定长度，则在相应一边填充字符，直至满足长度条件。这两个方法的第一个参数是长度，第二个参数是可选的填充字符串，默认为空格。
```js
let stringValue = "foo";
console.log(stringValue.padStart(6)); // " foo"
console.log(stringValue.padStart(9, ".")); // "......foo"
console.log(stringValue.padEnd(6)); // "foo "
console.log(stringValue.padEnd(9, ".")); // "foo......"
```

可选的第二参数：
1. 若提供了多个字符的字符串，则会将其拼接并截断以匹配指定长度。
2. 若果长度小于或等于字符串长度，则会返回原始字符串。
```js
let stringValue = "foo";
console.log(stringValue.padStart(8, "bar")); // "barbafoo"
console.log(stringValue.padStart(2)); // "foo"
console.log(stringValue.padEnd(8, "bar")); // "foobarba"
console.log(stringValue.padEnd(2)); // "foo" 
```

## next() 字符串的迭代与结构
字符串的原型上暴露了一个@@iterator 方法，表示可以迭代字符串的每个字符。见下：
```js
let message = "abc";
let stringIterator = message[Symbol.iterator]();
console.log(stringIterator.next()); // {value: "a", done: false}
console.log(stringIterator.next()); // {value: "b", done: false}
console.log(stringIterator.next()); // {value: "c", done: false}
console.log(stringIterator.next()); // {value: undefined, done: true}
```
在 for-of 循环中可以通过这个迭代器按序访问每个字符：
```js
for (const c of "abcde") {
 console.log(c);
}
// a
// b
// c
// d
// e 
```

有了这个迭代器之后，字符串就可以通过解构操作符来解构了。比如，可以更方便地把字符串分割为字符数组：
```js
let message = "abcde";
console.log([...message]); // ["a", "b", "c", "d", "e"]
```

## toLowerCase()、toUpperCase() 字符串大小写转换

`toLowerCase()`、`toLocaleLowerCase()`、`toUpperCase()`、`toLocaleUpperCase()`。

toLocaleLowerCase()和 toLocaleUpperCase()方法旨在基于特定地区实现。在很多地区，地区特定的方法与通用的方法是一样的。但在少数语言中（如土耳其语），Unicode 大小写转换需应用特殊规则，要使用地区特定的方法才能实现正确转换。下面是几个例子：
```js
let stringValue = "hello world";
console.log(stringValue.toLocaleUpperCase()); // "HELLO WORLD"
console.log(stringValue.toUpperCase()); // "HELLO WORLD"
console.log(stringValue.toLocaleLowerCase()); // "hello world"
console.log(stringValue.toLowerCase()); // "hello world" 
```
通常，如果不知道代码涉及什么语言，则最好使用地区特定的转换方法。

**扩展**
1. 如何判断单词是否全量大写或全量小写
```js
const message = 'HELLO WORLD';
if(message.toLocaleUpperCase() == message){
  //全量大写
}else{
  //全量小写
}
```
2. 如何判断单词首字母是否大写
```js
const message = "Hello world";
const firstLetter = message.charAt(0);
if (firstLetter.toLocaleUpperCase() == firstLetter) {
  console.log("首字母大写");
} else {
  console.log("首字母小写");
}
```

## localeCompare()
- 如果按照字母表顺序，字符串应该排在字符串参数前头，则返回负值。（通常是-1，具体还要看与实际值相关的实现。）
- 如果字符串与字符串参数相等，则返回 0。
- 如果按照字母表顺序，字符串应该排在字符串参数后头，则返回正值。（通常是 1，具体还要看与实际值相关的实现。）
```js
let stringValue = "yellow";
console.log(stringValue.localeCompare("brick")); // 1
console.log(stringValue.localeCompare("yellow")); // 0
console.log(stringValue.localeCompare("zoo")); // -1
```

用处：根据字母表顺序进行单词排序，`localeCompare()`区分大小写，大写字母在小写字母的前面

## xx.charAt()
charAt()方法返回给定索引位置的字符，由传给方法的整数参数指定。
- 不传默认为0
- 不改变原字符串
- 此方法返回是读取出来的字符串
```js
const message = 'abcdef';
console.log(message.charAt(2)); //c
```




## xx.charCodeAt()

使用 charCodeAt()方法可以查看指定码元的字符编码。这个方法返回指定索引位置的码元值，索引以整数指定。比如：
```js
let message = "abcde";
// Unicode "Latin small letter C"的编码是 U+0063
console.log(message.charCodeAt(2)); // 99
// 十进制 99 等于十六进制 63
console.log(99 === 0x63); // true
```

## String.fromCharCode()

fromCharCode()方法用于根据给定的 UTF-16 码元创建字符串中的字符。这个方法可以接受任意多个数值，并返回将所有数值对应的字符拼接起来的字符串：
```js
// Unicode "Latin small letter A"的编码是 U+0061
// Unicode "Latin small letter B"的编码是 U+0062
// Unicode "Latin small letter C"的编码是 U+0063
// Unicode "Latin small letter D"的编码是 U+0064
// Unicode "Latin small letter E"的编码是 U+0065
console.log(String.fromCharCode(0x61, 0x62, 0x63, 0x64, 0x65)); // "abcde"
// 0x0061 === 97
// 0x0062 === 98
// 0x0063 === 99
// 0x0064 === 100
// 0x0065 === 101
console.log(String.fromCharCode(97, 98, 99, 100, 101)); // "abcde"
```



