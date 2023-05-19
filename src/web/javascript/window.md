---
title: window 对象
date: 2022-07-16
category:
  - javascript
---


BOM的核心是window对象，表示浏览器的实例。window对象在浏览器中有两重身份，一个是ECMAScript中的Global对象，另一个就是浏览器窗口的JavaScript接口。这意味着网页中定义的所有对象、变量和函数都以window作为其Global对象，都可以访问其上定义parseInt()全局方法。

<!-- more -->

:::warning 注意
因为window对象的属性在全局作用域中有效，所以很多浏览器API及相关的构造函数都以window对象属性的形式暴露出来。另外，由于实现不同，某些window对象的属性在不同浏览器间可能差异不大。这里不对已废弃、非标准化特定于浏览器的window属性。
:::

## Global 作用域
因为window对象被复用为ECMAScript的Global对象，所以通过var声明的所有全局变量和函数都会变成window对象的属性和方法，如：
```js
var age = 29;
var sayAge = () => alert(this.age);
alert(window.age); // 29
sayAge(); // 29
window.sayAge(); // 29
```
这里，变量 age 和函数 sayAge()被定义在全局作用域中，它们自动成为了 window 对象的成员。  
因此，变量 age 可以通过 window.age 来访问，而函数 sayAge()也可以通过 window.sayAge()来访问。  
因为 sayAge()存在于全局作用域，this.age 映射到 window.age，所以就可以显示正确的结果了。

如果在这里使用let或const替代var，则不会把变量添加全局对象：
```js
let age = 29;
const sayAge = () => alert(this.age);

alert(window.age); // undefined
sayAge(); // undefined
window.sayAge(); // TypeError: window.sayAge is not a function
```
另外，访问未声明的变量会抛出错误，但是可以在window对象上查询是否存在可能未声明的变量。如：
```js
// 这会导致抛出错误，因为 oldValue 没有声明
var newValue = oldValue;
// 这不会抛出错误，因为这里是属性查询
// newValue 会被设置为 undefined
var newValue = window.oldValue;
```
JavaScript 中有很多对象都暴露在全局作用域中，比如 location 和 navigator，因而它们也是 window 对象的属性。

## 窗口关系
top 对象始终指向最上层（最外层）窗口，即浏览器窗口本身。而 parent 对象则始终指向当前窗口的父窗口。如果当前窗口是最上层窗口，则 parent 等于 top（都等于 window）。最上层的 window如果不是通过 window.open()打开的，那么其 name 属性就不会包含值。

还有一个 self 对象，它是终极 window 属性，始终会指向 window。实际上，self 和 window 就是同一个对象。之所以还要暴露 self，就是为了和 top、parent 保持一致。

这些属性都是 window 对象的属性，因此访问 window.parent、window.top 和 window.self都可以。这意味着可以把访问多个窗口的 window 对象串联起来，比如 window.parent.parent。

## 窗口位置与像素比

window对象的位置可以通过不同的属性和方法来确定。现代浏览器提供了 screenLeft 和 screenTop属性，用于表示窗口相对于屏幕左侧和顶部的位置。返回值的单位是css像素。

可以使用moveTo()和moveBy()方法移动窗口。这两个方法都接收两个参数，其中moveTo()接收要移动到的新位置的绝对坐标x和y；而moveBy()则接收相对当前位置在两个方向上移动的像素数，如：
```js
// 把窗口移动到左上角
window.moveTo(0,0);

// 把窗口向下移动 100 像素
window.moveBy(0, 100); 

// 把窗口移动到坐标位置(200, 300)
window.moveTo(200, 300);

// 把窗口向左移动 50 像素
window.moveBy(-50, 0); 
```

## 窗口大小
所有现代浏览器都支持4个属性：`innerWidth`、`innerHeight`、`outerWidth`和`outerHeight`。`outerWidth`和`outerHeight`返回浏览器窗口自身的大小（不管是在最外层window上使用，还是在窗格`<frame>`中使用）。innerWidth和innerHeight返回浏览器窗口中页面视口的大小（不包含浏览器边框和工具栏）。  
`document.documentElement.clientWidth` 和 `document.documentElement.clientHeight` 返回页面视口的宽度和高度。  
浏览器窗口自身的精确尺寸不好确定，但可以确定页面视口的大小，如下：
```js
let pageWidth = window.innerWidth,
 pageHeight = window.innerHeight;
if (typeof pageWidth != "number") {
 if (document.compatMode == "CSS1Compat"){
 pageWidth = document.documentElement.clientWidth;
 pageHeight = document.documentElement.clientHeight;
 } else {
 pageWidth = document.body.clientWidth;
 pageHeight = document.body.clientHeight;
 }
}
```
这里，先将pageWidth 和 pageHeight 的值分别设置为 `window.innerWidth` 和 `window.innerHeight`。然后，检查pageWidth是不是一个数值，如果不是则通过`document.compatMode`来检查页面是否处于标准模式。如果是，则使用`document.documentElement.clientWidth`和`document.documentElement.clientHeight`；否则，就使用`document.body.clientWidth`和`document.body.clientHeight`。  
在移动设备上，`window.innerWidth`和`window.innerHeight`返回视口大小，也就是屏幕上页面可视区域的大小。Mobile Internet Explorer 支持这些属性，但在 `document.documentElement.clientWidth` 和 `document.documentElement.clientHeight` 中提供了相同的信息。在放大或缩小页面时，这些值也会相应变化。  
在其它移动浏览器中，`document.documentElement.clientWidth`和`document.documentElement.clientHeight`返回的布局视口的大小，即渲染页面的实际大小。布局视口是相当于可见视口的概念，可见视口只能显示整个页面的一小部分。Mobile Internet Explorer 把布局视口的信息保存在`document.body.clientWidth` 和 `document.body.clientHeight` 中。在放大或缩小页面时，这些值也会相应变化。

因为桌面浏览器的差异，所以需要先确定用户是不是在使用移动设备，然后再确定使用哪个属性。

可以使用`resizeTo()`和`resizeBy()`方法调整窗口大小。这两个方法都接收两个参数，`resizeTo()`接收新的宽度和高度值，而`resizeBy()`接收宽度和高度各要缩放多少，示例：
```js
// 缩放到 100×100
window.resizeTo(100, 100);
// 缩放到 200×150
window.resizeBy(100, 50);
// 缩放到 300×300
window.resizeTo(300, 300);
```
与移动窗口方法一样，缩放窗口的方法可能会被浏览器禁用，而且再某些浏览器中默认是禁用的。同样，缩放窗口的方法只能应用到最上层的window对象。

## 视口位置
浏览器窗口尺寸通常无法满足完整显示整个页面，为此用户可以通过滚动在有限的视口中查看文档。  
度量文档相对于视口滚动距离的属性有两队，返回相等的值：`window.pageXoffset/window.scrollX`和`window.pageYoffset/window.scrollY`。

可以使用scroll()、scrollTo()和scrollBy()方法滚动页面。三个方法都接收表示相对视口距离的x和y坐标，这两个参数在前两个方法中表示要滚动到的坐标，在最后一个方法中表示滚动的距离。
```js
// 相对于当前视口向下滚动 100 像素
window.scrollBy(0, 100);

// 相对于当前视口向右滚动 40 像素
window.scrollBy(40, 0);

// 滚动到页面左上角
window.scrollTo(0, 0);

// 滚动到距离屏幕左边及顶边各 100 像素的位置
window.scrollTo(100, 100); 
```

这几个方法也都接收一个 ScrollToOptions 字典，除了提供偏移值，还可以通过 behavior 属性告诉浏览器是否平滑滚动。
```js
// 正常滚动
window.scrollTo({
 left: 100,
 top: 100,
 behavior: 'auto'
});

// 平滑滚动
window.scrollTo({
 left: 100,
 top: 100,
 behavior: 'smooth'
});
```

## 导航与打开新窗口

window.open()方法可以用于导航到指定 URL，也可以用于打开新浏览器窗口。这个方法接收4个参数：
- 要加载的URL
- 目标窗口
- 特性字符串
- 表示新窗口在浏览器历史记录中是否替代当前加载页面的布尔值。
通常，调用这个方法时只传前3个参数，最后一个参数只有在不打开新窗口时才会使用。

如果 window.open()的第二个参数是一个已经存在的窗口或窗格（frame）的名字，则会在对应的窗口或窗格中打开 URL。示例：
```js
// 与<a href="http://www.wrox.com" target="topFrame"/>相同

window.open("http://www.wrox.com/", "topFrame");
```
执行这行代码的结果就如同用户点击了一个 href 属性为"http://www.wrox.com"，target 属性为"topFrame"的链接。如果有一个窗口名叫"topFrame"，则这个窗口就会打开这个 URL；否则就会打开一个新窗口并将其命名为"topFrame"。

第二个参数也可以是一个特殊的窗口名，比如_self、_parent、_top 或_blank。

**1. 弹出窗口**
如果window.open()的第二个参数不是已有窗口，则会打开一个新窗口或标签页。第三个参数即特性字符串，用于指定新窗口的配置。如果没有传第三个参数，则新窗口（或标签页）会带有所有默认的浏览器特性（工具栏、地址栏、状态栏等都是默认配置）。如果打开的不是新窗口，则忽略第三个参数。

特性字符串是一个逗号分隔的设置字符串，用于指定新窗口包含的特性。下表列出了一些选项：
| 设置       | 值          | 说明                                                                                                 |
| :--------- | :---------- | :--------------------------------------------------------------------------------------------------- |
| fullscreen | "yes"或"no" | 表示新窗口是否最大化。仅限 IE 支持                                                                   |
| height     | 数值        | 新窗口高度。这个值不能小于 100                                                                       |
| left       | 数值        | 新窗口的 x 轴坐标。这个值不能是负值                                                                  |
| location   | "yes"或"no" | 表示是否显示地址栏。不同浏览器的默认值也不一样。在设置为"no"时，地址栏可能隐藏或禁用（取决于浏览器） |
| Menubar    | "yes"或"no" | 表示是否显示菜单栏。默认为"no"                                                                       |
| resizable  | "yes"或"no" | 表示是否可以拖动改变新窗口大小。默认为"no"                                                           |
| scrollbars | "yes"或"no" | 表示是否可以在内容过长时滚动。默认为"no"                                                             |
| status     | "yes"或"no" | 表示是否显示状态栏。不同浏览器的默认值也不一样                                                       |
| toolbar    | "yes"或"no" | 表示是否显示工具栏。默认为"no"                                                                       |
| top        | 数值        | 新窗口的 y 轴坐标。这个值不能是负值                                                                  |
| width      | 数值        | 新窗口的宽度。这个值不能小于 100                                                                     |

使用示例：
```js
window.open("http://www.wrox.com/","wroxWindow","height=400,width=400,top=10,left=10,resizable=yes");
```
这行代码会打开一个可缩放的新窗口，大小为 400 像素×400 像素，位于离屏幕左边及顶边各 10 像素的位置。

window.open()方法返回一个对新建窗口的引用。这个对象与普通 window 对象没有区别，只是为控制新窗口提供了方便。例如，某些浏览器默认不允许缩放或移动主窗口，但可能允许缩放或移动通过window.open()创建的窗口。跟使用任何 window 对象一样，可以使用这个对象操纵新打开的窗口。
```js
let wroxWin = window.open("http://www.wrox.com/","wroxWindow","height=400,width=400,top=10,left=10,resizable=yes");

// 缩放
wroxWin.resizeTo(500, 500);

// 移动
wroxWin.moveTo(100, 100); 

//还可以使用 close()方法像这样关闭新打开的窗口
wroxWin.close();
```
`wroxWin.close()`这个方法只能用于 window.open()创建的弹出窗口。虽然不可能不经用户确认就关闭主窗口，但弹出窗口可以调用 top.close()来关闭自己。关闭窗口以后，窗口的引用虽然还在，但只能用于检查其 closed 属性了：
```js
wroxWin.close();
alert(wroxWin.closed); // true
```

新创建窗口的 window 对象有一个属性 opener，指向打开它的窗口。这个属性只在弹出窗口的最上层 window 对象（top）有定义，是指向调用 window.open()打开它的窗口或窗格的指针。例如：
```js
let wroxWin = window.open("http://www.wrox.com/","wroxWindow","height=400,width=400,top=10,left=10,resizable=yes");
alert(wroxWin.opener === window); // true
```




