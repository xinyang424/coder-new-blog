---
title: 学习State
date: 2022-06-16
category:
  - React
---

<!-- more -->

## class

::: details 查看示例代码

::: code-tabs#shell

@tab 写法一
```js
import React from "react";

export default class App extends React.Component {
  //定义数据
  constructor() {
    super();
    this.state = {
      total: 0,
    };
  }
  decrement() {
    if (this.state.total == 0) return;
    //更新数据
    this.setState({
      total: this.state.total - 1,
    });
  }
  increment() {
    if (this.state.total == 10) return;
    this.setState({
      total: this.state.total + 1,
    });
  }
  render() {
    const { total } = this.state;
    return (
      <>
        <h2>{total}</h2>
        <button onClick={this.decrement.bind(this)}>减少</button>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <button onClick={this.increment.bind(this)}>增加</button>
      </>
    );
  }
}

```


@tab 写法二
```js
import React from "react";

export default class App extends React.Component {
  //定义数据，相当于写法一少了constructor
  state = {
    total: 0,
  };
  decrement() {
    if (this.state.total == 0) return;
    this.setState({
      total: this.state.total - 1,
    });
  }
  increment() {
    if (this.state.total == 10) return;
    this.setState({
      total: this.state.total + 1,
    });
  }
  render() {
    const { total } = this.state;
    return (
      <>
        <h2>{total}</h2>
        <button onClick={this.decrement.bind(this)}>减少</button>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <button onClick={this.increment.bind(this)}>增加</button>
      </>
    );
  }
}

```



:::


## hook

::: details 查看示例代码

::: code-tabs#shell

@tab 写法一
```js
import React, { useState } from "react";
const App = () => {
  const [count, setCount] = useState(0);

  const decrement = () => {
    if (count == 0) return;
    setCount(count - 1);
  };

  const increment = () => {
    if (count == 10) return;
    setCount(count + 1);
  };

  return (
    <>
      <h2>{count}</h2>
      <button onClick={decrement.bind(this)}>减少</button>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <button onClick={increment.bind(this)}>增加</button>
    </>
  );
};

export default App;

```


@tab 写法二
```js
import React, { useState } from "react";

const App = () => {
  const [count, setCount] = useState(0);

  return (
    <>
      <h2>{count}</h2>
      <button onClick={() => (count == 0 ? null : setCount(count - 1))}>减少</button>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <button onClick={() => (count == 10 ? null : setCount(count + 1))}>增加</button>
    </>
  );
};

export default App;

```



:::


## setState更新是同步还是异步

setState更新数据会引起视图的重绘。

setState在可控的情况下是同步的，在非可控的情况下是同步的。

更新数据视图重绘的步骤：

更新state -> 创建新的window节点 -> 经过diff对比差异 -> 决定要渲染哪一部分 -> 真正的渲染 -> 形成新的UI

那我们该如何在修改数据后立即获得最新的数据呢？

::: details 查看示例代码
::: code-tabs#shell

@tab class组件通过回调函数
```js
import React from "react";

export default class App extends React.Component {
  state = {
    total: 0,
  };
  increment() {
    this.setState(
      {
        total: this.state.total + 1,
      },
      () => {
        console.log("回调函数里获取：", this.state.total);
      }
    );
    console.log("直接获取：", this.state.total);
  }
  render() {
    const { total } = this.state;
    return (
      <>
        <h2>{total}</h2>
        <button onClick={this.increment.bind(this)}>增加</button>
      </>
    );
  }
}

```


@tab class组件自己封装

```js
import React from "react";

export default class App extends React.Component {
  state = {
    total: 0,
  };
  async increment() {
    await this.setStateAsync({ count: (this.state.total += 1) });
    console.log("自己封装的方法去获取", this.state.total);
  }

  setStateAsync(state) {
    return new Promise(resolve => {
      this.setState(state, resolve);
    });
  }
  render() {
    const { total } = this.state;
    return (
      <>
        <h2>{total}</h2>
        <button onClick={this.increment.bind(this)}>增加</button>
      </>
    );
  }
}

```
:::

**推荐第一个方法获取，尽量不破坏原来的写法。**


::: details hook写法示例代码
```js
import React, { useState, useEffect } from "react";

const App = () => {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };

  useEffect(() => {
    //第二参数里的数组就是要监听的数据
    console.log(count);
  }, [count]);

  return (
    <>
      <h2>{count}</h2>
      <button onClick={increment.bind(this)}>增加</button>
    </>
  );
};

export default App;

```

:::