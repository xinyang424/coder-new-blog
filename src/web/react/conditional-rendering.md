---
title: 条件渲染
date: 2022-06-16
category:
  - React
---

了解React中的了解渲染


<!-- more -->

## 通过值返回不同的组件

::: details 查看示例代码

::: code-tabs#shell

@tab class

```js
import React from "react";
export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isShow: true, //可以手动更改这个值来改变return返回的组件
    };
  }
  render() {
    const { isShow } = this.state;
    if (isShow) {
      return <div style={{ background: "pink", color: "#fff" }}>为true时显示这个组件</div>;
    } else {
      return <div style={{ background: "purple", color: "#fff" }}>为false时显示这个组件</div>;
    }
  }
}

```

@tab hook
```js
import { useState } from "react";

const App = () => {
  const [isShow, setisShow] = useState(true); //可以手动更改这个值来改变return返回的组件
  if (isShow) {
    return <div style={{ background: "pink", color: "#fff" }}>为true时显示这个组件</div>;
  } else {
    return <div style={{ background: "purple", color: "#fff" }}>为false时显示这个组件</div>;
  }
};

export default App;


```


:::

## 通过变量的值显示不同的组件


::: details 查看示例代码

::: code-tabs#shell


@tab class
```js
import React from "react";

class LogoutBtn extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <button onClick={this.props.onClick}>退出</button>;
  }
}

class LoginBtn extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <button onClick={this.props.onClick}>登录</button>;
  }
}

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isLogin: false,
    };
  }
  handleLogout() {
    this.setState({
      isLogin: false,
    });
  }
  handleLogin() {
    this.setState({
      isLogin: true,
    });
  }
  render() {
    const { isLogin } = this.state;
    let showBtn;
    if (isLogin) {
      showBtn = <LogoutBtn onClick={this.handleLogout.bind(this)}></LogoutBtn>;
    } else {
      showBtn = <LoginBtn onClick={this.handleLogin.bind(this)}></LoginBtn>;
    }
    return (
      <div>
        <p>{isLogin ? "已登录" : "请登录"}</p>
        {showBtn}
      </div>
    );
  }
}

```

@tab hook
```js
import { useState } from "react";

const LoginBtn = props => {
  return <button onClick={props.onClick}>登录</button>;
};
const LogoutBtn = props => {
  return <button onClick={props.onClick}>退出</button>;
};

const App = () => {
  const [isLogin, setisLogin] = useState(false);
  let showBtn;
  if (isLogin) {
    showBtn = <LogoutBtn onClick={() => setisLogin(false)}></LogoutBtn>;
  } else {
    showBtn = <LoginBtn onClick={() => setisLogin(true)}></LoginBtn>;
  }
  return (
    <>
      <p>{isLogin ? "已登录" : "未登录"}</p>
      {showBtn}
    </>
  );
};

export default App;

```

:::




## 通过三目运算符显示不同的组件

::: details 查看示例代码

::: code-tabs#shell


@tab class

```js
import React from "react";

class LogoutBtn extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <button onClick={this.props.onClick}>退出</button>;
  }
}

class LoginBtn extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <button onClick={this.props.onClick}>登录</button>;
  }
}

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isLogin: false,
    };
  }
  handleLogout() {
    this.setState({
      isLogin: false,
    });
  }
  handleLogin() {
    this.setState({
      isLogin: true,
    });
  }
  render() {
    const { isLogin } = this.state;
    return (
      <div>
        <p>{isLogin ? "已登录" : "请登录"}</p>
        {isLogin ? <LogoutBtn onClick={this.handleLogout.bind(this)}></LogoutBtn> : <LoginBtn onClick={this.handleLogin.bind(this)}></LoginBtn>}
      </div>
    );
  }
}

```
@tab hook
```js
import { useState } from "react";

const LoginBtn = props => {
  return <button onClick={props.onClick}>登录</button>;
};
const LogoutBtn = props => {
  return <button onClick={props.onClick}>退出</button>;
};

const App = () => {
  const [isLogin, setisLogin] = useState(false);

  return (
    <>
      <p>{isLogin ? "已登录" : "未登录"}</p>
      {isLogin ? <LogoutBtn onClick={() => setisLogin(false)}></LogoutBtn> : <LoginBtn onClick={() => setisLogin(true)}></LoginBtn>}
    </>
  );
};

export default App;

```
:::


同时，也常用三目运算符控制是否显示组件，下面时一个简单示例代码：
```js
const App = () => {
  const [isShow, setisShow] = useState(false);

  return (
    <>
      <p>{isShow ? <h2>出来啦</h2> : null}</h2>
    </>
  );
};
```

## 阻止组件渲染


::: details 查看示例代码

::: code-tabs#shell


@tab class

```js
import React from "react";

class WarningBanner extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (!this.props.warn) {
      return null;
    }
    return <div style={{ backgroundColor: "red", color: "#fff" }}>！！！Warning</div>;
  }
}

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      showWarning: false,
    };
  }
  render() {
    const { showWarning } = this.state;
    return (
      <div>
        <WarningBanner warn={showWarning}></WarningBanner>
        <button onClick={() => this.setState({ showWarning: !showWarning })}>{showWarning ? "隐藏" : "显示"}</button>
      </div>
    );
  }
}

```

@tab hook

```js
import { useState } from "react";

const WarningBanner = props => {
  if (!props.warn) return null;
  return <div style={{ backgroundColor: "red", color: "#fff" }}>！！！Warning</div>;
};

const App = () => {
  const [showWarning, setShowWarning] = useState(false);

  return (
    <>
      <WarningBanner warn={showWarning}></WarningBanner>
      <button onClick={() => setShowWarning(!showWarning)}>{showWarning ? "隐藏" : "显示"}</button>
    </>
  );
};

export default App;

```

:::



## 通过与运算符 && 判断是否显示组件


::: details 查看示例代码

::: code-tabs#shell


@tab class

```js
import React from "react";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      message: ["消息1", "消息2", "消息3"],
    };
  }
  render() {
    const { message } = this.state;

    return <div>{message.length && <p>你有{message.length}未读消息</p>}</div>;
  }
}

```

@tab hook

```js
import { useState } from "react";

const App = () => {
  const [message, setMessage] = useState(["消息1", "消息2", "消息3"]);
  return (
    <>
      <div>{message.length && <p>你有{message.length}未读消息</p>}</div>
    </>
  );
};

export default App;

```

:::



