---
title: 表单
date: 2022-06-16
category:
  - React
---

在HTML中，`input`、`textarea`、`select`这类标签都是会产生数据的。

## 受控组件

在HTML中，表单元素（如`<input>`、`<textarea>`和`<select>`）通常自己维护state，并根据用户输入进行更新。

而在React中，可变状态通常保存在组件的state属性中，并且只能通过使用`setState`进行更新。

把两者结合起来，使React的state成为“唯一的数据源”。渲染表单的React组件还控制着用户输入过程中表单发生的操作。被React以这种方式控制取值的表单输入元素就叫做“受控组件”。


### 处理单个输入

::: details 查看示例代码

::: code-tabs#shell

@tab class组件
```js
import React from "react";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
    };
  }
  submitForm(event) {
    event.preventDefault();
    console.log("提交的名字：" + this.state.name);
  }

  handleChange(event) {
    console.log(event.target.value);
    this.setState({ name: event.target.value });
  }

  render() {
    return (
      <form onSubmit={this.submitForm.bind(this)}>
        <label htmlFor="name">
          名字：
          <input type="text" id="name" value={this.state.value} onChange={this.handleChange.bind(this)} />
        </label>
        <input type="submit" value="提交" />
      </form>
    );
  }
}
```

@tab hook组件
```js
import { useState } from "react";

const App = () => {
  const [name, setName] = useState("");

  const submitForm = event => {
    event.preventDefault();
    console.log("提交的名字：" + name);
  };

  const handleChange = event => {
    console.log(event.target.value);
    setName(event.target.value);
  };

  return (
    <>
      <form onSubmit={submitForm}>
        <label htmlFor="name">
          名字：
          <input type="text" id="name" value={name} onChange={handleChange} />
        </label>
        <input type="submit" value="提交" />
      </form>
    </>
  );
};

export default App;

```

:::

### 处理多个输入

::: details 查看示例代码

::: code-tabs#shell

@tab class组件
```js
import React from "react";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      username: "", //这里定义的变量名，要与input标签里定义的name值一样
      password: "",
    };
  }
  submitForm(event) {
    event.preventDefault();
    console.log("提交的表单：" + JSON.stringify(this.state));
  }

  handleChange(event) {
    console.log(event.target.name, event.target.value);
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    return (
      <form onSubmit={this.submitForm.bind(this)}>
        <label htmlFor="name">
          用户名：
          <input type="text" id="name" name="username" value={this.state.value} onChange={this.handleChange.bind(this)} />
        </label>
        <br />
        <label htmlFor="pwd">
          密码：
          <input type="password" id="pwd" name="password" value={this.state.value} onChange={this.handleChange.bind(this)} />
        </label>
        <br />
        <input type="submit" value="提交" />
      </form>
    );
  }
}

```
@tab hook组件
```js
import { useState } from "react";

const App = () => {
  const [form, setForm] = useState({ username: "", password: "" });

  const submitForm = event => {
    event.preventDefault();
    console.log("提交的表单：" + JSON.stringify(form));
  };

  const handleChange = event => {
    console.log(event.target.name, event.target.value);
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <>
      <form onSubmit={submitForm}>
        <label htmlFor="name">
          名字：
          <input type="text" id="name" name="username" value={form.username} onChange={handleChange} />
        </label>
        <br />
        <label htmlFor="pwd">
          密码：
          <input type="password" id="pwd" name="password" value={form.password} onChange={handleChange} />
        </label>
        <br />
        <input type="submit" value="提交" />
      </form>
    </>
  );
};

export default App;

```

:::


## 非受控组件

在大多数情况下，Reacr推荐使用**受控组件**来处理表单数据。

在一个受控组件中，表单数据是由 React 组件来管理的。另一种替代方案是使用**非受控组件**，这时表单数据将交由 DOM 节点来处理。

要编写一个非受控组件，而不是为每个状态更新都编写数据处理函数，你可以 使用 **ref** 来从 DOM 节点中获取表单数据。



::: details 查看示例代码

::: code-tabs#shell

@tab class组件

```js
import React from "react";

export default class App extends React.Component {
  constructor() {
    super();
    this.username = React.createRef();
    this.password = React.createRef();
  }
  submitForm(event) {
    event.preventDefault();
    console.log("提交的用户名：" + this.username.current.value);
    console.log("提交的密码：" + this.password.current.value);
  }

  render() {
    return (
      <form onSubmit={this.submitForm.bind(this)}>
        <label htmlFor="name">
          用户名：
          <input type="text" id="name" ref={this.username} />
        </label>
        <br />
        <label htmlFor="pwd">
          密码：
          <input type="password" id="pwd" ref={this.password} />
        </label>
        <br />
        <input type="submit" value="提交" />
      </form>
    );
  }
}
```

@tab hook组件

```js
import React from "react";

const App = () => {
  const username = React.createRef();
  const password = React.createRef();
  const submitForm = event => {
    event.preventDefault();
    console.log("提交的用户名：" + username.current.value);
    console.log("提交的密码：" + password.current.value);
  };

  return (
    <>
      <form onSubmit={submitForm}>
        <label htmlFor="name">
          名字：
          <input type="text" id="name" ref={username} />
        </label>
        <br />
        <label htmlFor="pwd">
          密码：
          <input type="password" id="pwd" ref={password} />
        </label>
        <br />
        <input type="submit" value="提交" />
      </form>
    </>
  );
};

export default App;

```
:::


### 默认值

在 React 渲染生命周期时，表单元素上的 value 将会覆盖 DOM 节点中的值。

在非受控组件中，你如果希望 React 能赋予组件一个初始值，但是不去控制后续的更新。 在这种情况下, 你可以指定一个 defaultValue 属性，而不是 value。

在一个组件已经挂载之后去更新 defaultValue 属性的值，不会造成 DOM 上值的任何更新。

见下两种定义默认值的方法：
:::details 查看示例代码
```js
import React from "react";

const App = () => {
  const username = React.createRef();
  const password = React.createRef();
  const submitForm = event => {
    event.preventDefault();
    console.log("提交的用户名：" + username.current.value);
    console.log("提交的密码：" + password.current.value);
  };

  const defaultPassword = "123";

  return (
    <>
      <form onSubmit={submitForm}>
        <label htmlFor="name">
          名字：
          <input type="text" id="name" ref={username} defaultValue="admin" />
        </label>
        <br />
        <label htmlFor="pwd">
          密码：
          <input type="password" id="pwd" ref={password} defaultValue={defaultPassword} />
        </label>
        <br />
        <input type="submit" value="提交" />
      </form>
    </>
  );
};

export default App;

```
:::
同样，`<input type="checkbox">` 和 `<input type="radio">` 支持 ==defaultChecked==，`<select> `和 `<textarea>` 支持 ==defaultValue==。



### 文件输入

在 HTML 中，`<input type="file">` 可以让用户选择一个或多个文件上传到服务器，或者通过使用 [File API](https://developer.mozilla.org/zh-CN/docs/Web/API/File_API/Using_files_from_web_applications) 进行操作。


在 React 中，`<input type="file" />` ==始终是一个非受控组件==，因为它的值只能由用户设置，而不能通过代码控制。

下面的例子显示了如何创建一个 DOM 节点的 ref 从而在提交表单时获取文件的信息：

::: details 查看示例代码

::: code-tabs#shell

@tab class组件

```js
import React from "react";

export default class App extends React.Component {
  constructor() {
    super();
    this.fileInput = React.createRef();
  }
  handleSubmit(event) {
    event.preventDefault();
    console.log(this.fileInput.current.files[0]);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <label>
          上传文件：
          <input type="file" ref={this.fileInput} />
        </label>
        <br />
        <button type="submit">提交</button>
      </form>
    );
  }
}

```

@tab hook组件

```js
import React from "react";

const App = () => {
  const fileInput = React.createRef();
  const handleSubmit = event => {
    event.preventDefault();
    console.log(fileInput.current.files[0]);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          上传文件：
          <input type="file" ref={fileInput} />
        </label>
        <br />
        <button type="submit">提交</button>
      </form>
    </>
  );
};

export default App;

```

:::



