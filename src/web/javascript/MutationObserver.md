---
title: MutationObserver 接口
date: 2022-07-16
category:
  - javascript
article: false
index: false
---

DOM规范中的MutationObserver 接口，可以在DOM被修改时异步执行回调。使用MutationObserver可以观察整个文档、DOM树的一部分，或某个元素。此外还可以观察元素属性、子节点、文本，或者前三者任意组合的变化。
<!-- more -->
:::warning 注意
新引进 MutationObserver 接口是为了取代废弃的 MutationEvent。
:::

## 基本方法
MutationObserver 的实例要通过调用 MutationObserver 构造函数并传入一个回调函数来创建：
```js
let observer = new MutationObserver(() => console.log('DOM was mutated!')); 
```

**1. observe()方法**
新创建的 MutationObserver 实例不会关联 DOM 的任何部分。要把这个 observer 与 DOM 关联起来，需要使用 observe()方法。  
这个方法接收两个必需的参数：
- 观察其变化的DOM节点
- 一个 MutationObserverInit 对象

MutationObserverInit 对象用于控制观察哪些方面的变化，是一个键/值对形式配置选项的字典。如下面代码会创建一个观察者（observer）并配置它观察`<body>`元素上的属性变化：
```js
let observer = new MutationObserver(() => console.log('<body> attributes changed'));

observer.observe(document.body, { attributes: true });

document.body.className = 'foo';
console.log('Changed body class');
// Changed body class
// <body> attributes changed 
```
执行以上代码后，`<body>`元素上任何属性发生变化都会被这个 MutationObserver 实例发现，然后就会异步执行注册的回调函数。<body>元素后代的修改或其他非属性修改都不会触发回调进入任务队列。

:::warning 注意
回调中的 console.log()是后执行的。这表明回调并非与实际的 DOM 变化同步执行。
:::

**2. 回调与MutationRecord**
每个回调都会收到一个 MutationRecord 实例的数组。MutationRecord 实例包含的信息包括发生了什么变化，以及 DOM 的哪一部分受到了影响。因为回调执行之前可能同时发生多个满足观察条件的事件，所以每次执行回调都会传入一个包含按顺序入队的 MutationRecord 实例的数组。


