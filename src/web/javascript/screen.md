---
title: screen 对象
date: 2022-06-18
category:
  - javascript
---

window 的另一个属性 screen 对象，是为数不多的几个在编程中很少用的 JavaScript 对象。这个对象中保存的纯粹是客户端能力信息，也就是浏览器窗口外面的客户端显示器的信息，比如像素宽度和像素高度。每个浏览器都会在 screen 对象上暴露不同的属性。
<!-- more -->
下表总结了这些属性：
| 属性        | 说明                                         |
| :---------- | :------------------------------------------- |
| availHeight | 屏幕像素高度减去系统组件高度（只读）         |
| availLeft   | 没有被系统组件占用的屏幕的最左侧像素（只读） |
| availTop    | 没有被系统组件占用的屏幕的最顶端像素（只读） |
| availWidth  | 屏幕像素宽度减去系统组件宽度（只读）         |
| colorDepth  | 表示屏幕颜色的位数；多数系统是 32（只读）    |
| height      | 屏幕像素高度                                 |
| left        | 当前屏幕左边的像素距离                       |
| pixelDepth  | 屏幕的位深（只读）                           |
| top         | 当前屏幕顶端的像素距离                       |
| width       | 屏幕像素宽度                                 |
| orientation | 返回 Screen Orientation API 中屏幕的朝向     |
