---
title: 学习props
date: 2022-06-25
category:
  - React
---


<!-- more -->

:::warning 注意
props是只读的，不可修改props的数据。props相当于只是作为父子之间参数的媒介：`父组件 -> props -> 子组件`，这个过程直接传递。`子组件 -> props -> 父组件`，这个过程需要子组件点击事件通知父组件改变数据。
整个过程，props只是充当传递数据的作用，不可对props直接进行修改。
:::

## 父子之间传参

::: details 查看Class组件父子之间传参示例代码

::: code-tabs#shell

@tab 父组件
```js
import React from "react";
import ChildClass from "./components/Child-class";
export default class App extends React.Component {
  state = {
    arr: ["Web", "Java", "C++", "C#"],
    childData: "",
  };

  getData(data) {
    this.setState({
      childData: data,
    });
  }
  sendData2Child() {
    this.setState({
      arr: ["喜羊羊", "美羊羊", "沸羊羊", "慢羊羊"],
    });
  }
  render() {
    return (
      <>
        <h2>父组件</h2>
        <p>来自子组件的数据：{this.state.childData}</p>
        <button onClick={this.sendData2Child.bind(this)}>改变发送子组件的数据</button>
        <hr />
        <ChildClass data={this.state.arr} getData={this.getData.bind(this)}></ChildClass>
      </>
    );
  }
}

```

@tab 子组件

```js
import React from "react";

export default class ChildClassDemo extends React.Component {
  sendData2Dad(str) {
    this.props.getData(str);
  }
  render() {
    return (
      <>
        <h2>子组件</h2>
        <div>
          来自父组件的数据：
          <ol>
            {this.props.data.map((element, index) => (
              <li key={index}>{element}</li>
            ))}
          </ol>
        </div>
        <button onClick={() => this.sendData2Dad("我是子组件的数据")}>向父组件传递数据</button>
      </>
    );
  }
}

```

:::



::: details 查看Hook组件父子之间传参示例代码

::: code-tabs#shell

@tab 父组件
```js
import { useState } from "react";
import ChildHook from "./components/Child-hook";

const App = () => {
  const [arr, setArr] = useState(["Web", "Java", "C++", "C#"]);
  const [str, setStr] = useState("");
  const changeChildData = () => {
    setArr(["喜羊羊", "美羊羊", "沸羊羊", "慢羊羊"]);
  };
  return (
    <>
      <h2>父组件Hook组件</h2>
      <button onClick={changeChildData}>该变子组件的数据</button>
      <p>来自子组件的数据：{str}</p>
      <ChildHook data={arr} getChildData={data => setStr(data)}></ChildHook>
    </>
  );
};

export default App;
```

@tab 子组件
```js
const ChildHookDemo = props => {
  const sendData2Dad = () => {
    props.getChildData("我是子组件的数据");
  };
  return (
    <>
      <h2>子组件Hook组件</h2>
      <div>
        来自父组件的数据：
        <ol>
          {props.data.map((element, index) => (
            <li key={index}>{element}</li>
          ))}
        </ol>
      </div>
      <button onClick={sendData2Dad}>向父组件发送数据</button>
    </>
  );
};

export default ChildHookDemo;
```
:::


## 通过props实现组件复用

::: details 查看Class组件父子之间传参示例代码

::: code-tabs#shell

@tab 父组件
```js
import React from "react";
import ChildClass from "./components/Child-class";
export default class App extends React.Component {
  state = {
    arr: ["Web", "Java", "C++", "C#"],
  };

  render() {
    return (
      <>
        <h2>父组件</h2>
        项目一：
        <ChildClass data={this.state.arr}></ChildClass>
        项目二：
        <ChildClass data={this.state.arr}></ChildClass>
      </>
    );
  }
}

```

@tab 子组件
```js
import React from "react";

export default class ChildClassDemo extends React.Component {
  render() {
    return (
      <>
        <ol>
          {this.props.data.map((element, index) => (
            <li key={index}>{element}</li>
          ))}
        </ol>
      </>
    );
  }
}

```
:::



::: details 查看Hook组件父子之间传参示例代码

::: code-tabs#shell

@tab 父组件
```js
import { useState } from "react";
import ChildHook from "./components/Child-hook";

const App = () => {
  const [arr, setArr] = useState(["Web", "Java", "C++", "C#"]);
  return (
    <>
      <h2>父组件Hook组件</h2>
      项目一：
      <ChildHook data={arr}></ChildHook>
      项目二：
      <ChildHook data={arr}></ChildHook>
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
      <ol>
        {props.data.map((element, index) => (
          <li key={index}>{element}</li>
        ))}
      </ol>
    </>
  );
};

export default ChildHookDemo;

```
:::


## 通过props进行状态提升

状态提升简而言之就是将共同的数据，提升到共同的父组件去管理。

官方的话就是：`多个组件需要反映相同的变化数据，这时我们建议将共享状态提升到最近的共同父组件中去。`



::: details 查看Class组件父子之间传参示例代码

::: code-tabs#shell
@tab 父组件
```js
import React from "react";
import Child1Class from "./components/Child-class";
import Child2Class from "./components/Child2-class";
export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      count: 0,
      unit: "R",
    };
  }
  render() {
    return (
      <>
        <h2>父组件</h2>
        <Child1Class getMoney={money => this.setState({ count: money, unit: "R" })} money={this.state.unit == "R" ? this.state.count : this.state.count * 7}></Child1Class>
        <Child2Class getMoney={money => this.setState({ count: money, unit: "M" })} money={this.state.unit == "M" ? this.state.count : this.state.count / 7}></Child2Class>
      </>
    );
  }
}

```

@tab 子组件1
```js
import React from "react";

export default class Child1ClassDemo extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <>
        <h2>子组件Hook组件1</h2>
        <label htmlFor="yuan">
          人民币：
          <input type="text" id="yuan" onChange={e => this.props.getMoney(e.target.value)} value={this.props.money} />
        </label>
      </>
    );
  }
}

```

@tab 子组件2
```js
import React from "react";

export default class Child2Class extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <>
        <h2>子组件Hook组件2</h2>
        <label htmlFor="dollar">
          美刀：
          <input type="text" id="dollar" onChange={e => this.props.getMoney(e.target.value)} value={this.props.money} />
        </label>
      </>
    );
  }
}

```

:::



::: details 查看Hook组件父子之间传参示例代码

::: code-tabs#shell
@tab 父组件
```js
import { useState } from "react";
import Child1Hook from "./components/Child-hook";
import Child2Hook from "./components/Child2-hook";
const App = () => {
  const [money, setMoney] = useState({
    count: 0, //面值
    unit: "R", //R-人民币 or M-美元
  });

  return (
    <>
      <h2>父组件Hook组件</h2>
      <Child1Hook getMoney={money => setMoney({ count: money, unit: "R" })} money={money.unit == "R" ? money.count : money.count * 7}></Child1Hook>
      <Child2Hook getMoney={money => setMoney({ count: money, unit: "M" })} money={money.unit == "M" ? money.count : money.count / 7}></Child2Hook>
    </>
  );
};

export default App;
```
@tab 子组件1
```js
const ChildHookDemo = props => {
  return (
    <>
      <h2>子组件Hook组件1</h2>
      <label htmlFor="yuan">
        人民币：
        <input type="text" id="yuan" onChange={e => props.getMoney(e.target.value)} value={props.money} />
      </label>
    </>
  );
};

export default ChildHookDemo;
```

@tab 子组件2
```js
const Child2HookDemo = props => {
  return (
    <>
      <h2>子组件Hook组件2</h2>
      <label htmlFor="dollar">
        美刀：
        <input type="text" id="dollar" onChange={e => props.getMoney(e.target.value)} value={props.money} />
      </label>
    </>
  );
};

export default Child2HookDemo;

```
:::

## 使用PropTypes进行props类型检查

使用`PropTypes`进行类型检查可以增强代码的健壮性，避免不必要的报错。

[npm仓库](https://www.npmjs.com/package/prop-types)

[GitHub仓库](https://github.com/facebook/prop-types)

**前提条件：**
```bash
npm i prop-types
```


::: details 查看Class组件父子之间传参示例代码

::: code-tabs#shell

@tab 父组件
```js
import React from "react";

import ChildClass from "./components/Child-class";
export default class App extends React.Component {
  state = {
    title: "总数",
    total: 10,
  };

  render() {
    return (
      <>
        <h2>父组件</h2>
        {/* 子组件约束了total的数据类型为number */}
        <ChildClass title={this.state.title} total={this.state.total}></ChildClass>
        {/* 可以不传total，将默认为0 */}
        <ChildClass title={this.state.title}></ChildClass>
        {/* 子组件约束了必须要传title，不然会报错 */}
        {/* <ChildClass></ChildClass> */}
      </>
    );
  }
}

```

@tab 子组件
```js
import React from "react";
import PropTypes from "prop-types";
export default class ChildClassDemo extends React.Component {
  render() {
    return (
      <>
        <p>
          {this.props.title}：{this.props.total}
        </p>
      </>
    );
  }
}

//规定  total 值为number，且是必传的
ChildClassDemo.propTypes = {
  title: PropTypes.string.isRequired,
  total: PropTypes.number,
};
//默认值
ChildClassDemo.defaultProps = {
  total: 0,
};

```
:::



::: details 查看Hook组件父子之间传参示例代码

::: code-tabs#shell

@tab 父组件
```js
import { useState } from "react";
import ChildHook from "./components/Child-hook";

const App = () => {
  const [obj, setObj] = useState({ title: "总数", total: 10 });
  return (
    <>
      <h2>父组件Hook组件</h2>
      {/* 子组件约束了total的数据类型为number */}
      <ChildHook title={obj.title} total={obj.total}></ChildHook>
      {/* 可以不传total，将默认为0 */}
      <ChildHook title={obj.title}></ChildHook>
      {/* 子组件约束了必须要传title，不然会报错 */}
      {/* <ChildHook></ChildHook> */}
    </>
  );
};

export default App;

```

@tab 子组件
```js
import PropTypes from "prop-types";
const ChildHookDemo = props => {
  return (
    <>
      <p>
        {props.title}：{props.total}
      </p>
    </>
  );
};
//规定  total 值为number，且是必传的
ChildHookDemo.propTypes = {
  title: PropTypes.string.isRequired,
  total: PropTypes.number,
};
//默认值
ChildHookDemo.defaultProps = {
  total: 0,
};
export default ChildHookDemo;

```
:::



## 组合 VS 继承

在React中，并没有发现需要使用继承来构成组件层次的情况。

Props 和组合为你提供了清晰而安全地定制组件外观和行为的灵活方式。

注意：组件可以接受任意 props，包括基本数据类型，React 元素以及函数。

**React中的组合类似于Vue中插槽的概念。**


**那么React中的组合是怎么样的？**

::: details 查看Class组件父子之间传参示例代码

::: code-tabs#shell

@tab 父组件
```js
import React from "react";

import ChildClass from "./components/Child-class";
export default class App extends React.Component {
  render() {
    return (
      <>
        <h2>父组件</h2>
        <ChildClass>我被包裹了</ChildClass>
      </>
    );
  }
}

```

@tab 子组件
```js
import React from "react";

export default class ChildClassDemo extends React.Component {
  render() {
    return <>{this.props.children}</>;
  }
}

```
:::



::: details 查看Hook组件父子之间传参示例代码

::: code-tabs#shell

@tab 父组件
```js
import ChildHook from "./components/Child-hook";

const App = () => {
  return (
    <>
      <h2>父组件Hook组件</h2>
      <ChildHook>
        <p>我被包裹了</p>
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
      <h2>子组件Hook</h2>
      {props.children}
    </>
  );
};

export default ChildHookDemo;
```
:::

::: warning 注意点
注意标签不能重复，就上面例子：如果`ChildHook`组件里包裹的有标签，那么`{props.children}`外不能有标签包裹，否则是会报错的。见下错误例子。
:::

::: details 查看错误的示例

::: code-tabs#shell

@tab 父组件

```js
import ChildHook from "./components/Child-hook";

const App = () => {
  return (
    <>
      <h2>父组件Hook组件</h2>
      <ChildHook>
        <p>我被包裹了</p>
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
      <h2>子组件Hook</h2>
      <p>{props.children}</p>
    </>
  );
};

export default ChildHookDemo;
```

:::





**总结错误：**上面错误示例就会报错，实际会被渲染为`<p><p>我被包裹了</p></p>`，它会认为第一个`<p>`是开始标签，第二个`<p>`是结尾标签。
如果父组件使用子组件时，子组件内没有标签包裹，那么`{props.children}`**可以用**标签包裹。但是如果子组件内有标签包裹，那么`{props.children}`**不可以用**标签包裹。