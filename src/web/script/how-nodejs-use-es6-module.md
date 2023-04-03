---
title: Node.js如何处理ES6模块
date: 2022-03-01
category:
  - script系列
tag:
  - ES6模块
  - CommoonJS和ES6模块
---


:::tip 前言
学习JavaScript语言，你会发现它有两种格式的模块。  
一种是ES6模块，简称ESM；另一种是Node.js专用的CommonJS，简称CJS。这两种模块不兼容。  
很多人使用Node.js，只会用`require()`加载模块，遇到ES6模块就不知道该怎么办了。  
本文就谈谈，ES6模块在Node.js里面怎么使用。
:::