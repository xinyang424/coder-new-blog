---
title: 列表渲染
date: 2022-06-16
category:
  - React
---

列表渲染主要是了解key的作用：key 帮助 React 识别哪些元素改变了，比如被添加或删除。因此你应当给数组中的每一个元素赋予一个确定的标识。


<!-- more -->




## key

1. 一个元素的 key 最好是这个元素在列表中拥有的一个独一无二的字符串。通常，我们使用数据中的 id 来作为元素的 key。
2. 当元素没有确定 id 的时候，万不得已你可以使用元素索引 index 作为 key。
3. 如果列表项目的顺序可能会变化，我们不建议使用索引来用作 key 值，因为这样做会导致性能变差，还可能引起组件状态的问题。
4. 如果你选择不指定显式的 key 值，那么 React 将默认使用索引用作为列表项目的 key 值。

:::details 查看示例代码

::: code-tabs#shell

@tab class组件
```js
import React from "react";
export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      userInfo: [
        {
          name: "Web",
          age: 20,
          sex: "男",
        },
        {
          name: "Java",
          age: 22,
          sex: "女",
        },
        {
          name: "Python",
          age: 20,
          sex: "不男不女",
        },
      ],
    };
  }
  handleAdd = () => {
    // push的结果返回的是数组的长度
    this.setState({
      userInfo: this.state.userInfo.concat([
        {
          name: "C#",
          age: 20,
          sex: "不男不女",
        },
      ]),
    });
  };
  render() {
    return (
      <div>
        <div>
          {this.state.userInfo.map((item, index) => {
            return (
              <div key={index}>
                <p>姓名：{item.name}</p>
                <p>年龄：{item.age}</p>
                <p>性别：{item.sex}</p>
                <hr />
              </div>
            );
          })}
        </div>
        <button onClick={this.handleAdd}>添加数据</button>
      </div>
    );
  }
}

```

@tab hook组件
```js
import { useState } from "react";

const App = () => {
  const [userInfo, setUserInfo] = useState([
    {
      name: "Web",
      age: 20,
      sex: "男",
    },
    {
      name: "Java",
      age: 22,
      sex: "女",
    },
    {
      name: "Python",
      age: 20,
      sex: "不男不女",
    },
  ]);
  const handleAdd = () => {
    // push的结果返回的是数组的长度
    setUserInfo(
      userInfo.concat([
        {
          name: "C#",
          age: 20,
          sex: "不男不女",
        },
      ])
    );
  };
  return (
    <>
      <div>
        {userInfo.map((item, index) => (
          <div key={index}>
            <p>姓名：{item.name}</p>
            <p>年龄：{item.age}</p>
            <p>性别：{item.sex}</p>
            <hr />
          </div>
        ))}
      </div>
      <button onClick={handleAdd}>添加数据</button>
    </>
  );
};

export default App;

```
:::


### 用key提取组件

元素的 key 只有放在就近的数组上下文中才有意义。


:::details 查看示例代码

::: code-tabs#shell

@tab 错误例子
```js
const Listitem = props => {
  return <li key={props.data.id}>{props.data.title}</li>;
};

const App = () => {
  const project = [
    {
      id: "1",
      title: "Web",
    },
    {
      id: "2",
      title: "Java",
    },
    {
      id: "3",
      title: "Python",
    },
  ];

  return (
    <>
      {project.map(item => (
        <Listitem data={item} />
      ))}
    </>
  );
};

export default App;

```

@tab 正确例子
```js
const Listitem = props => {
  return <li>{props.data}</li>;
};

const App = () => {
  const project = [
    {
      id: "1",
      title: "Web",
    },
    {
      id: "2",
      title: "Java",
    },
    {
      id: "3",
      title: "Python",
    },
  ];

  return (
    <>
      {project.map(item => (
        <Listitem key={item.id} data={item.title} />
      ))}
    </>
  );
};

export default App;

```
:::

### key值在兄弟节点之间必须唯一

数组元素中使用的 key 在其兄弟节点之间应该是独一无二的。然而，它们不需要是全局唯一的。当我们生成两个不同的数组时，我们可以使用相同的 key 值：

:::details 查看示例代码
```js
const App = () => {
  const posts = [
    { id: 1, title: "Hello World", content: "Welcome to learning React!" },
    { id: 2, title: "Installation", content: "You can install React from npm." },
  ];
  const sidebar = (
    <ul>
      {posts.map(post => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
  const content = posts.map(post => (
    <div key={post.id}>
      <h3>{post.title}</h3>
      <p>{post.content}</p>
    </div>
  ));

  return (
    <>
      {sidebar}
      <hr />
      {content}
    </>
  );
};

export default App;

```
:::

通俗的讲就是：如果渲染的时候使用的是数组里面的id，那么数组里面的每一项id都必须是唯一的。两个不同组件渲染的是同一个数组，只要数组内的id唯一，那么这个是不影响的。比如：组件1渲染的key是1、2，组件2渲染的key是1、2，组件1和组件2渲染的数据源都是同一个，那么这个是不影响性能的。