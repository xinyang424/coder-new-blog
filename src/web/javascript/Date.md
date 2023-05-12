---
title: Date
date: 2022-02-01
category:
  - javascript
---

<!-- more -->

## new Date()

要创建日期对象，就使用 new 操作符来调用 Date 构造函数：
```js
let now = new Date();
let birthday = new Date('December 17, 1995 03:24:00');
let birthday = new Date('1995-12-17T03:24:00');
let birthday = new Date(1995, 11, 17);
let birthday = new Date(1995, 11, 17, 3, 24, 0);

```

- 在不给 Date 构造函数传参数的情况下，创建的对象将保存当前日期和时间。
- 要基于其他日期和时间创建日期对象，必须传入其毫秒表示（UNIX 纪元 1970 年 1 月 1 日午夜之后的毫秒数）。
  ECMAScript为此提供了两个辅助方法：Date.parse()和 Date.UTC()。



## Date.parse()
Date.parse()方法接收一个表示日期的字符串参数，格式为：
- “月/日/年”，如"5/23/2019"；
- “月名 日, 年”，如"May 23, 2019"；
- “周几 月名 日 年 时:分:秒 时区”，如"Tue May 23 2019 00:00:00 GMT-0700"；
- ISO 8601 扩展格式“YYYY-MM-DDTHH:mm:ss.sssZ”，如 2019-05-23T00:00:00（只适用于兼容 ES5 的实现）。

:::tip 注意事项
不同的浏览器对 Date 类型的实现有很多问题。比如，很多浏览器会选择用当前日期替代越界的日期，因此有些浏览器会将"January 32, 2019"解释为"February 1,2019"。Opera 则会插入当前月的当前日，返回"January 当前日, 2019"。就是说，如果是在 9 月 21 日运行代码，会返回"January 21, 2019"。
::: 


## Date.UTC()
`Date.UTC()`方法也返回日期的毫秒表示，但使用的是跟 `Date.parse()`不同的信息来生成这个值。    
传给 Date.UTC()的参数是年、零起点月数（1 月是 0，2 月是 1，以此类推）、日（1~31）、时（0~23）、分、秒和毫秒。  
这些参数中，只有前两个（年和月）是必需的。如果不提供日，那么默认为 1 日。其他参数的默认值都是 0。

示例：
```js
// GMT 时间 2000 年 1 月 1 日零点
let y2k = new Date(Date.UTC(2000, 0));
// GMT 时间 2005 年 5 月 5 日下午 5 点 55 分 55 秒
let allFives = new Date(Date.UTC(2005, 4, 5, 17, 55, 55));
```

日期传参需要注意的是，月份是从0开始的，小时是24小时制。

## Date.now()
Date.now()方法返回表示方法执行时日期和时间的毫秒数。这个方法可以方便地用在代码分析中：
```js
// 起始时间
let start = Date.now();
// 调用函数
doSomething();
// 结束时间
let stop = Date.now(),
result = stop - start;
```

## toLocaleString()
Date 类型的 `toLocaleString()`方法返回与浏览器运行的本地环境一致的日期和时间。  
**这通常意味着格式中包含针对时间的 AM（上午）或 PM（下午），但不包含时区信息（具体格式可能因浏览器而不同）。**

## toString()
toString()方法通常返回带时区信息的日期和时间，而时间也是以 24 小时制（0~23）表示的。


## valueOf() - 可用于比较两日期前后
Date 类型的 valueOf()方法根本就不返回字符串，这个方法被重写后返回的是日期的毫秒表示。因此，操作符（如小于号和大于号）可以直接使用它返回的值。比如下面的例子：
```js
let date1 = new Date(2019, 0, 1); // 2019 年 1 月 1 日 Tue Jan 01 2019 00:00:00 GMT+0800 (中国标准时间)  1546272000000
let date2 = new Date(2019, 1, 1); // 2019 年 2 月 1 日 Fri Feb 01 2019 00:00:00 GMT+0800 (中国标准时间)  1548950400000
console.log(date1 < date2); // true
console.log(date1 > date2); // false
```

## 日期格式化方法

Date 类型有几个专门用于格式化日期的方法，它们都会返回字符串：
- `toDateString()`显示日期中的周几、月、日、年（格式特定于实现）；
- `toTimeString()`显示日期中的时、分、秒和时区（格式特定于实现）；
- `toLocaleDateString()`显示日期中的周几、月、日、年（格式特定于实现和地区）；
- `toLocaleTimeString()`显示日期中的时、分、秒（格式特定于实现和地区）；
- `toUTCString()`显示完整的 UTC 日期（格式特定于实现）。

注：这些方法的输出与 toLocaleString()和 toString()一样，会因浏览器而异。因此不能用于在用户界面上一致地显示日期。

## 日期/时间组件方法
Date 类型剩下的方法（见下表）直接涉及取得或设置日期值的特定部分。注意表中“UTC 日期”，指的是没有时区偏移（将日期转换为 GMT）时的日期。

| 方法                             | 说明                                                                                                         |
| :------------------------------- | :----------------------------------------------------------------------------------------------------------- |
| getTime()                        | 返回日期的毫秒表示；与 valueOf()相同                                                                         |
| setTime(milliseconds)            | 设置日期的毫秒表示，从而修改整个日期                                                                         |
| getFullYear()                    | 返回 4 位数年（即 2019 而不是 19）                                                                           |
| getUTCFullYear()                 | 返回 UTC 日期的 4 位数年                                                                                     |
| setFullYear(year)                | 设置日期的年（year 必须是 4 位数）                                                                           |
| setUTCFullYear(year)             | 设置 UTC 日期的年（year 必须是 4 位数）                                                                      |
| getMonth()                       | 返回日期的月（0 表示 1 月，11 表示 12 月）                                                                   |
| getUTCMonth()                    | 返回 UTC 日期的月（0 表示 1 月，11 表示 12 月）                                                              |
| setMonth(month)                  | 设置日期的月（month 为大于 0 的数值，大于 11 加年）                                                          |
| setUTCMonth(month)               | 设置 UTC 日期的月（month 为大于 0 的数值，大于 11 加年）                                                     |
| getDate()                        | 返回日期中的日（1~31）                                                                                       |
| getUTCDate()                     | 返回 UTC 日期中的日（1~31）                                                                                  |
| setDate(date)                    | 设置日期中的日（如果 date 大于该月天数，则加月）                                                             |
| setUTCDate(date)                 | 设置 UTC 日期中的日（如果 date 大于该月天数，则加月）                                                        |
| getDay()                         | 返回日期中表示周几的数值（0 表示周日，6 表示周六）                                                           |
| getUTCDay()                      | 返回 UTC 日期中表示周几的数值（0 表示周日，6 表示周六）                                                      |
| getHours()                       | 返回日期中的时（0~23）                                                                                       |
| getUTCHours()                    | 返回 UTC 日期中的时（0~23）                                                                                  |
| setHours(hours)                  | 设置日期中的时（如果 hours 大于 23，则加日）                                                                 |
| setUTCHours(hours)               | 设置 UTC 日期中的时（如果 hours 大于 23，则加日）                                                            |
| getMinutes()                     | 返回日期中的分（0~59）                                                                                       |
| getUTCMinutes()                  | 返回 UTC 日期中的分（0~59）                                                                                  |
| setMinutes(minutes)              | 设置日期中的分（如果 minutes 大于 59，则加时）                                                               |
| setUTCMinutes(minutes)           | 设置 UTC 日期中的分（如果 minutes 大于 59，则加时）                                                          |
| getSeconds()                     | 返回日期中的秒（0~59）                                                                                       |
| getUTCSeconds()                  | 返回 UTC 日期中的秒（0~59）                                                                                  |
| setSeconds(seconds)              | 设置日期中的秒（如果 seconds 大于 59，则加分）                                                               |
| setUTCSeconds(seconds)           | 设置 UTC 日期中的秒（如果 seconds 大于 59，则加分）                                                          |
| getMilliseconds()                | 返回日期中的毫秒                                                                                             |
| getUTCMilliseconds()             | 返回 UTC 日期中的毫秒                                                                                        |
| setMilliseconds(milliseconds)    | 设置日期中的毫秒                                                                                             |
| setUTCMilliseconds(milliseconds) | 设置 UTC 日期中的毫秒                                                                                        |
| getTimezoneOffset()              | 返回以分钟计的 UTC 与本地时区的偏移量（如美国 EST 即“东部标准时间”  返回 300，进入夏令时的地区可能有所差异） |



## UTC和GMT
区分UTC格式和GMT格式的日期

`Tue Feb 01 2022 00:00:00 GMT+0800 (中国标准时间)`——GMT格式时间  

UTC格式日期比较好理解，月份从0开始，小时是二十四小时制，如`new Date(2005, 4, 5, 17, 55, 55)`，2005年，5月5日，17点55分55秒



