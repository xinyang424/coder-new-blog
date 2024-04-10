---
title: JavaScript事件绑定
date: 2024-02-12
category:
  - javascript
---


<!-- more -->

## 事件类型

JavaScript事件类型有以下几种：
1. 鼠标事件（Mouse Events）：包括点击、双击、鼠标移入移出、鼠标按下释放等。
2. 键盘事件（Keyboard Events）：包括按键按下、按键释放、按键组合等。
3. 表单事件（Form Events）：包括表单提交、表单重置等。
4. 焦点事件（Focus Events）：包括元素获得焦点、元素失去焦点等。
5. 触摸事件（Touch Events）：包括触摸开始、触摸移动、触摸结束等。
6. 窗口事件（Window Events）：包括窗口打开、窗口关闭、窗口刷新等。

### 鼠标事件

鼠标单击左键-`click`、鼠标单击右键、鼠标双击-`dbclick`  
鼠标移入-`mouseover`、鼠标悬停-`mouseover`、鼠标移出-`mouseleave`


### 键盘事件

键盘按下-`keydown`、键盘松开-`keyup`、`keypress`

### 表单事件

`input`、`change`、`submit`、`blur`、`focus`、`reset`

### 触摸事件
开始触摸-`touchstart`、触摸移动-`touchmove`、触摸结束-`touchend`、触摸打算-`touchcancel`

轻按-`tap`、长按-`longtap`

columnchange: 'columnchange',
linechange: 'linechange',
error: 'error',
scrolltoupper: 'scrolltoupper',
scrolltolower: 'scrolltolower',
scroll: 'scroll'


## 事件委托

### 什么是事件委托

JavaScript事件委托(Event delegation)又叫事件代理，是一种在父元素上监听事件，然后通过事件冒泡机制来处理子元素的事件的技术。通过事件委托，可以避免为每个子元素都绑定事件处理程序，提高性能并简化代码。

### 事件委托基本原理

事件委托的基本原理是将事件处理程序绑定在父元素上，然后通过事件冒泡捕获到子元素的事件触发。这样，无论子元素是现有的还是动态生成的，它们的事件都会被父元素捕获并处理。

