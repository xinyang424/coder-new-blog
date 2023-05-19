---
title: requestAnimationFrame
date: 2022-02-15
category:
  - javascript
---

虽然CSS过渡和动画方便了Web开发者实现某些动画，但JavaScript动画领域多年来进展甚微。Firefox 4率先在浏览器中为JavaScript动画增加了一个名为mozRequestAnimationFrame()方法的 API。
<!-- more -->

mozRequestAnimationFrame()==这个方法 API会告诉浏览器要执行动画了，于是浏览器可以通过最优方式确定重绘的时序==。

## 早期定时动画

以前，在JavaScript中创建动画基本上就是使用setInterval()来控制动画的执行，见下例：
```js
(function() {
 function updateAnimations() {
 doAnimation1();
 doAnimation2();
 // 其他任务
 }
 setInterval(updateAnimations, 100);
})(); 
```

这种定时动画的问题在于无法准确知晓循环之间的延时。定时间隔必须足够短，这样才能让不同的动画类型都能平滑顺畅，但又要足够长，以便产生浏览器可以渲染出来的变化。一般计算机显示器的屏幕刷新率都是 60Hz，基本上意味着每秒需要重绘 60 次。大多数浏览器会限制重绘频率，使其不超出屏幕的刷新率，这是因为超过刷新率，用户也感知不到。

因此，实现平滑动画最佳的重绘间隔为 1000 毫秒/60，大约 17 毫秒。以这个速度重绘可以实现最平滑的动画，因为这已经是浏览器的极限了。如果同时运行多个动画，可能需要加以限流，以免 17 毫秒的重绘间隔过快，导致动画过早运行完。

## requestAnimationFrame诞生
浏览器知道 CSS过渡和动画应该什么时候开始，并据此计算出正确的时间间隔，到时间就去刷新用户界面。但对于 JavaScript动画，浏览器不知道动画什么时候开始。因此出现了造一个名为 mozRequestAnimationFrame() 的新方法，用以通知浏览器某些 JavaScript 代码要执行动画了。这样浏览器就可以在运行某些代码后进行适当的优化。目前所有浏览器都支持这个方法不带前缀的版本，即 requestAnimationFrame()。


- requestAnimationFrame()方法接收一个参数，此参数是一个要在重绘屏幕前调用的函数。这个函数就是修改 DOM 样式以反映下一次重绘有什么变化的地方。

为了实现动画循环，可以把多个
requestAnimationFrame()调用串联起来，就像以前使用 setTimeout()时一样：
```js
function updateProgress() {
 var div = document.getElementById("status");
 div.style.width = (parseInt(div.style.width, 10) + 5) + "%";
 if (div.style.left != "100%") {
 requestAnimationFrame(updateProgress);
 }
}
requestAnimationFrame(updateProgress);
```

因为 requestAnimationFrame()只会调用一次传入的函数，所以每次更新用户界面时需要再手动调用它一次。同样，也需要控制动画何时停止。结果就会得到非常平滑的动画。


## cancelAnimationFrame
与 setTimeout()类似，requestAnimationFrame()也返回一个请求 ID，可以用于通过另一个方法 cancelAnimationFrame()来取消重绘任务。下面的例子展示了刚把一个任务加入队列又立即将其取消：

```js
let requestID = window.requestAnimationFrame(() => {
 console.log('Repaint!');
});
window.cancelAnimationFrame(requestID); 
```

## 通过 requestAnimationFrame 节流

**钩子（hook）：**
所谓钩子（hook），就是浏览器在执行下一次重绘之前的一个点。

**回调队列：**
支持requestAnimationFrame这个方法的浏览器实际上会暴露出作为钩子的回调队列。这个回调队列是一个可修改的函数列表，包含应该在重绘之前调用的函数。每次调用requestAnimationFrame()都会在队列上推入一个回调函数，队列的长度没有限制。

这个回调队列的行为不一定跟动画有关。不过，通过 requestAnimationFrame()递归地向队列中加入回调函数，可以保证每次重绘最多只调用一次回调函数。这是一个非常好的节流工具。

**通过 requestAnimationFrame 节流应用场景：**
在频繁执行影响页面外观的代码时（比如滚动事件监听器），可以利用这个回调队列进行节流。如果想把事件处理程序的调用限制在每次重绘前发生，那么可以像这样下面把它封装到 requestAnimationFrame()调用中：

```js
function expensiveOperation() {
 console.log('Invoked at', Date.now());
}
window.addEventListener('scroll', () => {
 window.requestAnimationFrame(expensiveOperation);
}); 

```

这样会把所有回调的执行集中在重绘钩子，但不会过滤掉每次重绘的多余调用。此时，定义一个标志变量，由回调设置其开关状态，就可以将多余的调用屏蔽：
```js
let enqueued = false;

function expensiveOperation() {
 console.log('Invoked at', Date.now());
 enqueued = false;
}

window.addEventListener('scroll', () => {
 if (!enqueued) {
 enqueued = true;
 window.requestAnimationFrame(expensiveOperation);
 }
});
```

因为重绘是非常频繁的操作，所以这还算不上真正的节流。更好的办法是配合使用一个计时器来限制操作执行的频率。这样，计时器可以限制实际的操作执行间隔，而 requestAnimationFrame 控制在浏览器的哪个渲染周期中执行。下面的例子可以将回调限制为不超过 50 毫秒执行一次：

```js
let enabled = true;
function expensiveOperation() {
 console.log('Invoked at', Date.now());
}
window.addEventListener('scroll', () => {
 if (enabled) {
 enabled = false;
 window.requestAnimationFrame(expensiveOperation);
 window.setTimeout(() => enabled = true, 50);
 }
});
```
