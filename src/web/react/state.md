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

## useState仅修改对象内某一个值

在使用Hook的函数式组件中，比如我们用useState定义了某一个对象，这个对象的键值不止一个，而我们修改的时候，只想修改某一个键值的数据，我们可以这么做：

**定义初始对象：**
```js
const [form,setForm] = useState({
	name:"王萌萌",
	age:18,
	sex:'女'
})


```

**方法一：**

拿到旧的数据，ES6 结构赋值，附上新的属性，后面的数据覆盖前面的数据（推荐）

```js
setForm((olddata)=>{
	return{
	...olddata,
	age:20
	}
})

```

**方法二：**

ES6 解构赋值，后面的数据覆盖前面的数据

```js
setForm({
	...form,
	age:20
})

```
**方法三：**
```js
const fn = () => {
    let _form = JSON.parse(JSON.stringify(form))
    _form.age = 20
    setState(_form)
}
```

