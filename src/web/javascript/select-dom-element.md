---
title: 选取文档元素
date: 2022-06-22
category:
  - javascript
---


大多数客户端JavaScript程序运行时总是在操作一个或多个文档元素。当这些程序启动时，可以使用全局变量document来引用Document对象。但是，为了操作文档中的元素，必须通过某种方式获得或选取这些引用文档元素的Element对象。
<!-- more -->

DOM定义许多方式来选取元素，查询文档的一个或多个元素有如下方法:
- 用指定的id属性
- 用指定的name属性用指定的标签名字;
- 用指定的CSS类
- 匹配指定的CSS选择器。


## 通过ID获取元素

任何HTML元素可以有一个id属性，在文档中该值必须唯一，即同一个文档中的两个元素不能有相同的ID。可以用Document对象的getElementById()方法选取一个基于唯一ID的元素。
```js
var section1 = document.getElementById("section1");
```
也可以稍作封装以支持通过ID查找多个元素：
```js
/**
 * 函数接受任意多的字符串参数
 * 每个参数将当做元素的id传给documentgetElementById()
 * 返回一个对象，它把这些id映射到对应Element对象
 * 如任何一个id对应的元素未定义，则抛出一个Error对象
*/
function getElements(/*ids...*/) {
  var elements = {};                                      //开始是一个空map映射对象
  for(var i = 0; i < arguments.length; i++) {             //循环每个参数
      var id = arguments[i];                              //参数是元素的id
      var elt = document.getElementById(id);              //查找元素
      if (elt == null) {                                 // 如果未定义
        throw new Error("No element with id: " + id);    // 抛出异常
      }
      elements[id] = elt;                                //id和元素之间映射
  }
  return elements;                                      // 对于元素映射返回id
}
```
:::warning 注意
在低于IE 8版本的浏览器，getElementById()对于匹配元素的ID不区分大小写，而且也返回匹配name属性的元素。
:::

## 通过名字选取元素

HTML的name属性最初打算为表单元素分配名字，在表单数据提交到服务器时使用该属性的值。类似id属性，name是给元素分配名字，但是区别于id，name属性的值不是必须唯一:多个元素可能有同样的名字，在表单中，单选和复选按钮通常是这种情况而且，和id不一样的是name属性只在少数HTML元素中有效，包括表单、表单元素`<iframe>`和`<img>`元素。


```js
var radiobuttons = document.getElementsByName("favorite color");
```


getElementsByName()定义在HTMLDocument类中，而不在Document类中，所以它只针对HTML文档可用，在XML文档中不可用。

它返回一个NodeList对象，后者的行为类似一个包含若干Element对象的只读数组。在IE中，getElementsByName()也返回id属性匹配指定值的元素。

为了兼容，应该小心谨慎，不要将同样的字符串同时用做名字和ID。

## 通过标签名选取元素

```js
var spans = document.getElementByTagName("span");
```

类似于`getElementsByName()`、`getElementsByTagName()`返回一个NodeList对象，在NodeList中返回的元素按照在文档中的顺序排序的，所以可用如下代码选取文档中的第一个`<p>`元素：
```js
var fistpara = document.getElementsByTagName("p")[0];
```

HTML标签是不区分大小写的，当在HTML文档中使用`getElementsByTagName()`时，它进行不区分大小写的标签名比较。

若`getElementsByTagName()`传递通配符参数“*”将获得一个代表文档中所有元素的NodeList对象。

## 通过CSS类选取元素

```js
//查找其class属性值中包含“warning”的所有元素
var warnings = documentgetElementsByClassName("warning");

//查找以"1og”命名并且有”error“和"fatal"类的元素的所有后代
var log = document.getElementById("log");
var fatal = log.getElementsByClassName("fatal error");
```

## document.querySelectorAll()

## document.querySelector()

## document.all()

## parentNode

该节点的父节点，或者针对类似Document对象应该是null，因为它没有父节点。

## childNodes

只读的类数组对象（NodeList对象），它是该节点的子节点的实时表示。

## firstChild、lastChild

该节点的子节点的第一个和最后一个，如果该节点没有子节点则为null。

## nextSibling、previoursSibling

该节点的兄弟节点中的前一个和下一个。具有相同父节点的两个节点为兄弟节点。节点的顺序反映了它们在文档中的出现顺序。这两个属性将节点之间的双向链表的形式连接起来。

## nodeType

该节点的类型，9代表Document节点，1代表Element节点，3代表Text节点，8代表Comment节点，11代表DocumentFragment节点。

## nodeValue

Text节点或Comment节点的文本内容

## nodeName

元素的标签名，以大写形式表示。

## firstElementChild、lastElementChild

类似于fistChild、lastChild，但只代表子Element。


## nextElementSibling、previousElementSibling

类似于nextSibling和previousSibling，但只代表兄弟Element。

## childElementCount

子元素的数量，返回的值和children.length值相等。
