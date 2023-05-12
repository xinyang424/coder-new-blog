---
title: JS数据类型
date: 2022-02-01
category:
  - javascript
index: false
article: false
---


ECMAScript有六种简单的数据类型（也称为原始类型）：Undefined、Null、Boolean、Number、String和Symbol。一种复杂的数据类型：Object（对象）

<!-- more -->
## Undefined类型

```js
let message;
console.log(message == undefined);//true

let message2 = undefined;
console.log(message2 == undefined);//true
```

变量 message 在声明的时候并未初始化。而在比较它和 undefined 的字面值时，两者是相等的。

## Null类型


## Boolean类型

不同类型与布尔之间的转换规则：

| 数据类型  | 转换为true的值         | 转换为false的值 |
| :-------- | :--------------------- | :-------------- |
| Boolean   | true                   | false           |
| String    | 非空字符串             | ""（空字符串）  |
| Number    | 非零数值（包括无穷值） | 0、NaN          |
| Object    | 任意对象               | null            |
| Undefined | N/A不存在              | undefined       |

## Number类型

:::tip
使用 Number.NEGATIVE_INFINITY 和 Number.POSITIVE_INFINITY 也可以获取正、负 Infinity。没错，这两个属性包含的值分别就是-Infinity 和 Infinity。
:::

Number()函数基于如下规则执行转换：
- 布尔值，true 转换为 1，false 转换为 0。
- 数值，直接返回。
- null，返回 0。
- undefined，返回 NaN。
- 字符串，应用以下规则。
  - 如果字符串包含数值字符，包括数值字符前面带加、减号的情况，则转换为一个十进制数值。因此，Number("1")返回 1，Number("123")返回 123，Number("011")返回 11（忽略前面的零）。
  - 如果字符串包含有效的浮点值格式如"1.1"，则会转换为相应的浮点值（同样，忽略前面的零）。
  - 如果字符串包含有效的十六进制格式如"0xf"，则会转换为与该十六进制值对应的十进制整数值。
  - 如果是空字符串（不包含字符），则返回 0。
  - 如果字符串包含除上述情况之外的其他字符，则返回 NaN。
- 对象，调用 valueOf()方法，并按照上述规则转换返回的值。如果转换结果是 NaN，则调用
toString()方法，再按照转换字符串的规则转换。

## String类型
String数据类型表示零或多个16位Unicode字符序列。可以用双引号（" "）、单引号（' '）或反引号（` `）表示。

**字符字面量**
字符串数据类型包含一些字符字面量，用于表示非打印字符或其它用途的字符，如下表所示。
| 字面量 | 含义                                                                                             |
| :----- | :----------------------------------------------------------------------------------------------- |
| \n     | 换行                                                                                             |
| \t     | 制表                                                                                             |
| \b     | 退格                                                                                             |
| \r     | 回车                                                                                             |
| \f     | 换页                                                                                             |
| \\     | 反斜杠（\）                                                                                      |
| \'     | 单引号（'），在字符串以单引号标示时使用，例如'He said, \'hey.\''                                 |
| \"     | 双引号（"），在字符串以双引号标示时使用，例如"He said, \"hey.\""                                 |
| \`     | 反引号（`），在字符串以反引号标示时使用，例如`He said, \`hey.\``                                 |
| \xnn   | 以十六进制编码 nn 表示的字符（其中 n 是十六进制数字 0~F），例如\x41 等于"A"                      |
| \unnnn | 以十六进制编码 nnnn 表示的 Unicode 字符（其中 n 是十六进制数字 0~F），例如\u03a3 等于希腊字符"Σ" |

**转换为字符串**
toString()方法可见于数值、布尔值、对象和字符串值。null 和 undefined 值没有 toString()方法。  

多数情况下，toString()不接收任何参数。不过，在对数值调用这个方法时，toString()可以接收一个底数参数，即以什么底数来输出数值的字符串表示。默认情况下，toString()返回数值的十进制字符串表示。而通过传入参数，可以得到数值的二进制、八进制、十六进制，或者其他任何有效基数的字符串表示，比如：
```js
let num = 10;
console.log(num.toString()); // "10"
console.log(num.toString(2)); // "1010"
console.log(num.toString(8)); // "12"
console.log(num.toString(10)); // "10"
console.log(num.toString(16)); // "a" 
```

如果你不确定一个值是不是 null 或 undefined，可以使用 String()转型函数，它始终会返回表示相应类型值的字符串。String()函数遵循如下规则：
- 如果值有 toString()方法，则调用该方法（不传参数）并返回结果。
- 如果值是 null，返回"null"。
- 如果值是 undefined，返回"undefined"。
示例：
```js
let value1 = 10;
let value2 = true;
let value3 = null;
let value4;
console.log(String(value1)); // "10"
console.log(String(value2)); // "true"
console.log(String(value3)); // "null"
console.log(String(value4)); // "undefined"
```

