---
title: 学习JSX
date: 2022-06-16
category:
  - React
---

通过此文章将了解有关JSX相关的知识

<!-- more -->

## 什么是JSX？

JSX语法示例：
```js
const element = <h1>Hello, world!</h1>;
```

以上写法既不是字符串也不是HTML，而是被称之为JSX，它是JavaScript的语法扩展，具有JavaScript的全部功能。

React官方中也建议配合使用JSX语法，可以更好地描述UI应该呈现出它应有的交互的本质形式。

## 为什么使用JSX？

JSX 提供了一种**直观、声明式**的语法，使得构建用户界面更加简单和可读。它与 React 高度结合，**支持组件化开发**和**动态内容嵌入**，提供强类型检查和丰富的生态系统支持。

并且以下特性使得 JSX 成为构建现代 Web 应用程序的强大工具之一：
1. 声明式语法：JSX 提供了一种声明式的语法，使得构建用户界面更直观和易懂。它类似于编写 HTML，通过使用标签和属性，可以清晰地描述 UI 的结构和组件之间的关系。

2. 组件化开发：JSX 鼓励将 UI 划分为独立的可重用组件。通过编写具有自定义标签的 JSX 代码，可以创建可组合的、高度可重用的组件，并通过组件之间的嵌套和组合来构建复杂的界面。

3. 动态内容嵌入：JSX 允许在 JavaScript 代码中嵌入动态内容，包括变量、表达式和函数调用。这使得在界面中动态展示数据、执行条件渲染和循环等操作变得更加方便。

4. 强类型检查：使用 JSX 可以借助于工具和编译器的静态类型检查功能。通过类型检查，可以在编译阶段捕获潜在的错误，并提供更好的代码可读性和维护性。

5. 生态系统支持：JSX 是与 React 库密切结合的，React 高度依赖于 JSX 来定义组件和构建用户界面。因此，使用 JSX 可以更好地与 React 生态系统进行集成，获得丰富的开发工具、组件库和社区支持。


## JSX基本语法

三句话理解JSX解析步骤：
- 遇到`<>`按照HTML语法规则进行解析。
- 遇到`{}`按照JavaScript语法规则进行解析

**注意点**：`()`内如果存在标签结构，并且标签结构要换行，需要用()括起来


**元素渲染**

::: details 查看代码示例

```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>React</title>
    <script crossorigin src="https://unpkg.com/react@17/umd/react.development.js"></script>
    <script crossorigin src="https://unpkg.com/react-dom@17/umd/react-dom.development.js"></script>
    <script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>
  </head>

  <body>
    <div id="app">loading...</div>
  </body>
</html>
<script type="text/babel">
  function tick() {
    const element = (
      <div>
        <h1>Hello World !</h1>
        <h2>It is {new Date().toLocaleTimeString()}</h2>
      </div>
    );
    ReactDOM.render(element, document.getElementById("app"));
  }
  setInterval(tick, 1000);
</script>

```

:::


**注意事项：**
1. `<script>`标签上必须用`type='text/babel'`，在框架里面不需要管。
2. 多个标签需要有一个根标签来包裹。
3. 可以随便缩进，也可以给外面加括号，建议使用[Prettier](https://blog.coder-new.cn/software/prettier.html)格式化插件，会自动加上括号和调整缩进。
4. 单标签必须闭合
5. jsx里面可以使用`{}`包裹变量、函数调用、简单运算、三目运算。
6. 属性如果是变量，必须把引号去掉，避免与Vue语法混淆。
7. 加类名是不是`class`，而是`className`。`z-index`要写成`zIndex`。
8. `style`接收的是一个对象，所以看起来是两个花括号
9. 添加事件是需要写成驼峰命名，如`onClick`、`onMouseOver`
10. `{}`里面能放的数据类型有哪些？

| 数据类型  | 说明                                                                                               |
| :-------- | :------------------------------------------------------------------------------------------------- |
| number    | ✔                                                                                                  |
| string    | ✔                                                                                                  |
| boolean   | ❌不渲染出来，但是可以通过`JSON.stringify`显示出来                                                  |
| undefined | ❌不渲染出来，`JSON.stringify`也显示不出来                                                          |
| NaN       | ✔渲染为NaN                                                                                         |
| null      | ❌不渲染出来，`JSON.stringify`也显示不出来                                                          |
| Array     | ✔默认通过`Array.join("")`显示，也可以通过map函数一项一项渲染出来，通过`JSON.stringify`显示数组本身 |
| object    | ❌会报错，但是可以通过`JSON.stringify`显示出来                                                      |

::: details 多个标签需要有一个根标签来包裹
```js
// error
import React from "react";
export default class App extends React.Component {
  render() {
    return (
        <h2>多个标签要有一个根标签包裹</h2>
        <h2>多个标签要有一个根标签包裹</h2>
    );
  }
}

// correct
import React from "react";
export default class App extends React.Component {
  render() {
    return (
      <>
        <h2>多个标签要有一个根标签包裹</h2>
        <h2>多个标签要有一个根标签包裹</h2>
      </>
    );
  }
}

// or
import React from "react";
export default class App extends React.Component {
  render() {
    return (
      <div>
        <h2>多个标签要有一个根标签包裹</h2>
        <h2>多个标签要有一个根标签包裹</h2>
      </div>
    );
  }
}
```
:::

::: details 单标签必须闭合
```js
import React from "react";
export default class App extends React.Component {
  render() {
    return (
      <>
        {/* error: */}
        {/* <input type="text" > */}
        {/* correct: */}
        <input type="text" />
      </>
    );
  }
}
```
:::

::: details jsx里面可以使用`{}`包裹变量、函数调用、简单运算、三目运算
```js
import React from "react";

export default class App extends React.Component {
  state = {
    variable: "This is a variable.",
    array: ["Section A", "Section B", "Section C"],
    truthy: true, //truthy falsy
  };
  changeValue() {
    this.setState({
      truthy: !this.state.truthy,
    });
  }
  render() {
    return (
      <>
        {/* 变量 */}
        <p>{this.state.variable}</p>
        {/* 简单运算 */}
        <ul>
          {this.state.array.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
        {/* 三目运算 */}
        <p>真真假假：{this.state.truthy ? "真的" : "假的"}</p>
        {/* 函数调用 */}
        <button onClick={this.changeValue.bind(this)}>改变真假</button>
      </>
    );
  }
}

```
:::

::: details 使用className和style
```js
import React from "react";
import "./App.css";
export default class App extends React.Component {
  render() {
    return (
      <>
        <h2 className="title">我是标题</h2>
        {/* 使用class虽然也能出来，但是控制台会抛出警告 */}
        {/* <h2 class="title">我是标题</h2> */}
        {/* 使用style，并且原来样式中有kebab case写法的要用camel case */}
        <p style={{ color: "red", fontSize: "30px" }}>我是p标签</p>
      </>
    );
  }
}
```
:::

::: details {}里面支持什么示例代码
```js
import React from "react";

export default class App extends React.Component {
  state = {
    num: 123,
    str: "Hello React",
    bol: true,
    undef: undefined,
    notNum: NaN,
    nullObj: null,
    arr: ["a", "b", "c"],
    obj: {
      a: 1,
      b: 2,
    },
  };
  render() {
    return (
      <>
        <h2>花括号里面支持什么？</h2>
        <p>number：{this.state.num}</p>
        <p>string：{this.state.str}</p>
        <p>boolean：{JSON.stringify(this.state.bol)}</p>
        <p>undefined：{JSON.stringify(this.state.undef)}</p>
        <p>NaN：{this.state.notNum}</p>
        <p>nullObj：{JSON.stringify(this.state.null)}</p>
        <p>array：{JSON.stringify(this.state.arr)}</p>
        <p>object：{JSON.stringify(this.state.obj)}</p>
      </>
    );
  }
}

```
:::

::: details 绑定事件的几种方式

::: code-tabs#shell

@tab class

```js
import React from "react";
export default class App extends React.Component {
  commonClickFn() {
    alert("常规绑定方式，但是无法传参");
  }
  moreUseClickFn(data) {
    alert("常用绑定方式，参数：" + data);
  }
  bindClickFn = data => {
    alert("bind绑定方式，参数：" + data);
  };
  render() {
    return (
      <>
        <h2>绑定事件的集中方式</h2>
        <button onClick={this.commonClickFn}>常规绑定方式</button>
        <button
          onClick={() => {
            this.moreUseClickFn("more use");
          }}>
          常用绑定方式
        </button>
        <button onClick={this.bindClickFn.bind(this, "bind")}>bind绑定方式</button>
      </>
    );
  }
}

```

@tab hook

```js
import React from "react";
const App = () => {
  function commonClickFn() {
    alert("常规绑定方式，但是无法传参");
  }
  function moreUseClickFn(data) {
    alert("常用绑定方式，参数：" + data);
  }
  const bindClickFn = data => {
    alert("bind绑定方式，参数：" + data);
  };
  return (
    <>
      <h2>绑定事件的集中方式</h2>
      <button onClick={commonClickFn}>常规绑定方式</button>
      <button
        onClick={() => {
          moreUseClickFn("more use");
        }}>
        常用绑定方式
      </button>
      <button onClick={bindClickFn.bind(this, "bind")}>bind绑定方式</button>
    </>
  );
};

export default App;
```


:::


**JSX中class和className加类名都行，为什么不统一为class？**

因为JSX在React中使用className原因是为了避免与JavaScript在的关键字`class`冲突，同时JSX也是JavaScript语法的扩展，这样可以避免潜在的命名冲突，采用了一些命名约定。

更具体的原因见下：
1. JavaScript 语法冲突：在 JavaScript 中，关键字 "class" 用于定义类。为了避免将 HTML 的 "class" 属性与 JavaScript 的 "class" 关键字混淆，所以在 JSX 中使用了 "className" 作为替代。
2. JSX 的设计约定：JSX 是一种将 HTML 标记嵌入到 JavaScript 中的语法扩展。为了保持 JSX 代码的一致性和可读性，采用了 "className" 这个约定来表示 HTML 元素的类名属性。
3. 符合 HTML 规范：在 HTML 规范中，用于定义元素的类名属性是 "class"。为了遵循 HTML 的规范，使用 "className" 来表示类名属性可以更加符合直觉和一致性。

