---
title: Fragments
date: 2022-07-05
category:
  - React
---


如果一个组件返回多个元素，Fragments允许你将子列表分组，而无需向DOM添加额外节点。

<!-- more -->


如果是以下这种写法，会渲染多余的元素——`div`：

:::detaiils 查看示例代码
```js
import React from "react";

class Title extends React.Component {
  render() {
    return (
      <div>
        <h2>Fragments</h2>
        <h2>Fragments</h2>
        <h2>Fragments</h2>
        <h2>Fragments</h2>
      </div>
    );
  }
}

export default class App extends React.Component {
  render() {
    return <Title></Title>;
  }
}
```
:::


可以使用短语法，它看起来像空标签，且实际它并不会渲染为新的标签元素：
:::detaiils 查看示例代码
```js
import React from "react";

class Title extends React.Component {
  render() {
    return (
      <div>
        <h2>Fragments</h2>
        <h2>Fragments</h2>
        <h2>Fragments</h2>
        <h2>Fragments</h2>
      </div>
    );
  }
}

export default class App extends React.Component {
  render() {
    return <Title></Title>;
  }
}

```
:::

也可以使用Fragments，它实际也不会渲染为新的标签元素：

:::detaiils 查看示例代码
import React from "react";

class Title extends React.Component {
  render() {
    return (
      <React.Fragment>
        <h2>Fragments</h2>
        <h2>Fragments</h2>
        <h2>Fragments</h2>
        <h2>Fragments</h2>
      </React.Fragment>
    );
  }
}

export default class App extends React.Component {
  render() {
    return <Title></Title>;
  }
}

:::


但是Fragments是可以带key的：
:::detaiils 查看示例代码
```js
import React from "react";

class Title extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <>
        {this.props.data.map((item, index) => (
          <React.Fragment key={index + 1}>
            <h2>{item}</h2>
          </React.Fragment>
        ))}
      </>
    );
  }
}

export default class App extends React.Component {
  render() {
    return <Title data={["Lorem", "ipsum", "dolor", "consectetur"]}></Title>;
  }
}

```
:::

`key` 是唯一可以传递给 `Fragment` 的属性。未来我们可能会添加对其他属性的支持，例如事件。而空标签`<></>`是不能添加key的。


