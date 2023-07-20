---
title: Portals
date: 2022-07-05
category:
  - React
---

Portal 的作用是可以将子节点渲染到父组件以外的地方。

<!-- more -->

Portal 用法示例：
```js
import { createPortal } from 'react-dom';

...
return createPortal(child,container);
...
```
Portal 接受的第一个参数是任何可渲染的React子元素，第二个元素是一个DOM元素。



一个 portal 的典型用例是当父组件有 `overflow: hidden` 或 `z-index` 样式时，但你需要子组件能够在视觉上“跳出”其容器。例如，对话框、悬浮卡以及提示框：

:::details 查看不使用Portal示例代码

::: code-tabs#shell

@tab 父组件
```js
import ChildHook from "./components/Child-hook";

const App = () => {
  return (
    <>
      <p>父组件hook</p>
      <ChildHook>
        <p>向子组件传递一个组件</p>
      </ChildHook>
    </>
  );
};

export default App;

```

@tab 子组件
```js
const ChildHookDemo = props => {
  return (
    <>
      <p>子组件hook</p>
      {props.children}
    </>
  );
};

export default ChildHookDemo;

```

:::


:::details 查看使用Portal示例代码
::: code-tabs#shell

@tab JS
```js
import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import "./App.css";

// hook
const Modal = props => {
  const model_el = document.createElement("div");
  const modal_container = document.querySelector(".modal-container");
  useEffect(() => {
    modal_container.appendChild(model_el);
    return function cleanUpComponent() {
      modal_container.removeChild(model_el);
    };
  });
  //
  return createPortal(props.children, model_el);
};

// class
// class Modal extends React.Component {
//   constructor(props) {
//     super(props);
//     this.modal_container = document.querySelector(".modal-container");
//     this.el = document.createElement("div");
//   }
//   componentDidMount() {
//     this.modal_container.appendChild(this.el);
//   }
//   componentWillUnmount() {
//     this.modal_container.removeChild(this.el);
//   }
//   render() {
//     return createPortal(this.props.children, this.el);
//   }
// }

const App = () => {
  const [isShow, setIsShow] = useState(false);
  let modal = isShow ? (
    <Modal>
      <div className="modal">
        <div>With a portal, we can render content into a different part of the DOM, as if it were any other React child.</div>
        This is being rendered inside the #modal-container div.
        <button onClick={() => setIsShow(false)}>Hide Modal</button>
      </div>
    </Modal>
  ) : null;
  return (
    <>
      <div className="modal-control">
        This div has overflow: hidden.
        <button onClick={() => setIsShow(true)}>Show Modal</button>
        {modal}
      </div>
      <div className="modal-container"></div>
    </>
  );
};

export default App;

```
@tab CSS
```css
.modal-control {
  width: 200px;
  height: 200px;
  overflow: hidden;
  color: #ffffff;
  background-color: purple;
}

.modal-container {
  position: relative;
  z-index: 999;
}

.modal {
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

```
:::


即使`portal`可以被放置在DOM树任何地方，哪怕挂载的节点不是由React进行托管，例如，`body`下有两个节点，分别是id为`app-root`和`modal-root`，React挂载的是`app-root`，但是可以通过`portal`将模态框渲染到`modal-root`上。但是由于portal存在React树中，与DOM树中的位置无关，那么包括context、事件绑定一样还是会起作用的，同时无论是否你是有portal进行渲染的。举例以下DOM结构：
```html
<html>
  <body>
    <div id="app-root"></div>
    <div id="modal-root"></div>
  </body>
</html>
```



一个Protal内部触发的事件会一直冒泡至包含React树的祖先。