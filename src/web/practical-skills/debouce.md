---
title: 防抖
date: 2022-03-01
category:
  - 实用技巧
---

## 防抖函数

```javascript
function debounce(func, delay) {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}
```

**解释：**

The code above is a JavaScript implementation of a debounce function. The debounce function takes in two parameters: `func`, which is the function to be debounced, and `delay`, which is the time in milliseconds to wait before invoking the function. 

The debounce function returns a new function that can be called instead of the original function. This new function will wait for the specified delay before invoking the original function. If the new function is called again before the delay has elapsed, the timer is reset and the delay starts over. 


This is useful for scenarios where you want to limit the number of times a function is called, such as when handling user input events like scrolling or typing.

## vue防抖自定义指令

```javascript
Vue.directive('debounce', {
  inserted: function (el, binding) {
    let timeoutId;
    const delay = parseInt(binding.arg);
    const handler = binding.value;
    el.addEventListener('input', function (...args) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        handler.apply(this, args);
      }, delay);
    });
  }
});
```


