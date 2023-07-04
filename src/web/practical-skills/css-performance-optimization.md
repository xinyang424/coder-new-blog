---
title: CSS性能优化
date: 2023-03-20
category:
  - 实用技巧
---


<!-- more -->


1. 代码简写：减少代码量，减小代码体积，既提升了下载速度，也避免浪费浏览器渲染引擎的性能
2. 减少选择器嵌套不超过三层：超过三层在渲染的时候，对建成cssom树的建成增加难度，减少选择器的嵌套，也降低了代码的复杂度
3. 提取公共样式：反复书写公共样式易造成代码冗余，提取公共样式有利于降低文件体积。
4. 减少通配符*使用
5. 巧妙运用css的继承机制
6. 删除无用的css代码
7. 减少使用昂贵的属性（如：position、float）


尽管在强大的强大的浏览器渲染引擎性能面前，可能这些改善无足轻重，但是这些拖慢加载性能的帮凶能少则少，正是我们应该更加精益求精，才能有优秀产出的的同时提升自身的开发水平。

除此之外，还有其它方式可以提升加载性能：
1. css文件压缩减小文件体积。如去掉注释、空格、换行等等
2. 减少使用`@import`，建议使用`link`。`@import`是在页面加载完成之后再进行加载的，而link引入可以异步加载
3. 根据实际情况拆分出公共css文件或者合并多个css文件