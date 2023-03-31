---
title: 节流
date: 2022-03-01
category:
  - 实用技巧
---

## 节流函数

```javascript
function throttle(func, delay) {
  let timeoutId;
  let lastExecTime = 0;
  return function(...args) {
    const currentTime = new Date().getTime();
    const timeSinceLastExec = currentTime - lastExecTime;
    if (timeSinceLastExec > delay) {
      lastExecTime = currentTime;
      func.apply(this, args);
    } else {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        lastExecTime = currentTime;
        func.apply(this, args);
      }, delay - timeSinceLastExec);
    }
  };
}
```

**解释：**
 The code above is a JavaScript implementation of a throttle function. The throttle function takes in two parameters: `func`, which is the function to be throttled, and `delay`, which is the time in milliseconds to wait before invoking the function again. 

 The throttle function returns a new function that can be called instead of the original function. This new function will only invoke the original function once every `delay` milliseconds. If the new function is called again before the delay has elapsed, the function will not be invoked and the timer is reset. 

 This is useful for scenarios where you want to limit the rate at which a function is called, such as when handling user input events like scrolling or resizing the window.


