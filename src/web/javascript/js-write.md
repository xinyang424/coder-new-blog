---
title: JS书写
date: 2022-02-01
category:
  - javascript
---
<!-- more -->
## 区分大小写
变量test和变量Test是两个变量

## 变量声明不能用到关键字或保留字

| 变量名     |
| :--------- |
| break      |
| do         |
| in         |
| typeof     |
| case       |
| else       |
| instanceof |
| var        |
| catch      |
| export     |
| new        |
| void       |
| class      |
| extends    |
| return     |
| while      |
| const      |
| finally    |
| super      |
| with       |
| continue   |
| for        |
| switch     |
| yield      |
| debugger   |
| function   |
| this       |
| default    |
| if         |
| throw      |
| delete     |
| import     |
| try        |

以下是 ECMA-262 第 6 版为将来保留的所有词汇：  
| 变量名 |
| :----- |
| enum   |

严格模式下保留:
| 变量名     |
| :--------- |
| implements |
| package    |
| public     |
| interface  |
| protected  |
| static     |
| let        |
| private    |

模块代码中保留: 
| 变量名 |
| :----- |
| await  |

## 标识符
- 第一个字符必须是一个字母、下划线（_）或美元符号（$）
- 剩下的其他字符可以是字母、下划线、美元符号或数字。
- 按照惯例，ECMAScript 标识符使用驼峰大小写形式，即第一个单词的首字母小写，后面每个单词的首字母大写，如：
  `firstSecond`、`myCar`、`doSomethingImportant`

## 注释
```js
//单行注释
/*
    多行
    注释
*/
```

## 严格模式
1. 全局开启，就在文件头加入`"use strict";`
2. 局部开启，如在函数内开启：
```js
function doSomething() { 
 "use strict"; 
 // 函数体 
} 
```