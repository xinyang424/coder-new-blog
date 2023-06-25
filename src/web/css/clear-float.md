---
title: 清除浮动
date: 2022-03-01
category:
  - CSS
tag:
  - CSS清除浮动的方式
  - CSS清除浮动方式的优缺点
---

## 使用空标签清除浮动clear:both

原理：添加一个空div，利用css属性的clear:both来清除浮动，让父级div能自动获取高度。

优点：通俗易懂，容易掌握

缺点：会添加很多无意义的空标签，有违结构与表现的分离，在后期维护较为麻烦

建议：不推荐使用，但此方法是以前主要使用的一种清除浮动的方法

## 父级div定义overflow:hidden
原理：必须定义width或zoom:1，同时不能定义height，使用overflow:hidden时，浏览器会自动检查浮动区域的高度

优点：简单，代码少，浏览器支持好

缺点：不能和position配合使用，因为超出的尺寸的会被隐藏，不能给父元素设置高度

建议：只推荐没有使用position或对overflow:hidden理解比较深的可以使用

## 父级div定义overflow:auto
原理：触发BFC进行布局，必须定义width不能定义height，使用overflow:auto时，浏览器会自动检查浮动区域的高度。

优点：简单，代码少，浏览器支持好

缺点：内部宽高超过父级div时，会出现滚动条

建议：不推荐使用，如果需要出现滚动条或确保不会出现滚动条可以使用

## 父级div定义伪类::after和zoom(用于非IE浏览器)
原理：IE8以上和非IE浏览器才支持::after，原理和方法一类似，zoom（IE转有属性）可解决IE6、IE7浮动问题。

优点：浏览器支持好，不容易出现怪问题(目前：大型网站都有使用，如：腾讯，网易，等)

```css
.clear::after{
  content:"";
  display:block;
  clear:both;
  height:0;
  visibility:hidden;
}
```
代码解释：

- content:&quot;&quot;生成内容作为最后一个元素，可以是一个点，也可以是其它，但是不推荐为空，因为火狐7.0为空会产生额外的空隙。
- display:block 使生成的元素以块级元素显示，并占满剩余的空间。
- visibility:hidden使生成内容不可见，并允许可能被生成的内容盖住的内容可以进行点击和交互。
- height:0避免生成内容破坏原有布局的高度
- clear:both清除浮动
- zoom:1，触发IE的hasLayout

## 父级div定义height
原理：父级div手动定义height，就解决了父级div无法自动获取到高度的问题

优点：简单，代码少，容易掌握

缺点：只适合高度固定的布局，要给出精确的高度，如果高度和父级div不一样时，会产生问题


