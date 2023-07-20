---
title: 严格模式
date: 2022-07-05
category:
  - React
---

StrictMode是一个用来突出显示应用程序中潜在问题的工具。与Fragment一样，StrictMode也不会渲染任何可见的UI。它的作用是可以为后代元素触发额外的检查和警告。


:::warning 注意
严格模式检查仅在开发模式下运行，它们并不会影响生产构建。
:::

通常直接在根组件下启用严格模式：
:::details 查看示例代码
```js
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

```
:::

当然，你也可以在应用程序的任何部分启用严格模式：
:::details 查看示例代码
```js
import React from 'react';

function ExampleApplication() {
  return (
    <div>
      <Header />
      <React.StrictMode>
        <div>
          <ComponentOne />
          <ComponentTwo />
        </div>
      </React.StrictMode>
      <Footer />
    </div>
  );
}
```
:::
在上述示例中，不会对`Header`和`Footer`组件运行严格模式检查。但是`ComponentOne`和`ComponentTwo`以及它们所有的后代元素都将进行检查。


StrictMode具体的作用有：
- 识别不安全的生命周期
- 关于使用过时字符串ref API的警告
- 关于使用废弃的 findDOMNode 方法的警告
- 检测意外的副作用
- 检测过时的 context API
- 确保可复用的 state

[关于作用的示例可点此查看](https://zh-hans.legacy.reactjs.org/docs/strict-mode.html)


