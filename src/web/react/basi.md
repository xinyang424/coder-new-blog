---
title: React 基础知识
date: 2022-06-16
category:
  - React
---


## 创建项目

### 基于webpack创建
```bash
npx create-react-app [projectName]
```

## React基础知识

### JSX语法介绍
JSX语法就是 JavaScript + XML语法  
解读JSX语法：  
1. 遇到`<>`按照HTML语法解析。
2. 遇到`{}`按照JavaScript执行。
3. `()`内如果存在标签结构，并且标签结构要换行，需要用()括起来
### 元素渲染
```jsx
function tick(){
    const element = (
        <div>
            <h1>Hello World !</h1>
            <h2>It is {new Date().toLocaleTimeString()}</h2>
        </div>
    )
    React.render(element,document.getElementById("root"));
}
setInterval(tick,1000);
```


### 组件
组件文件的后缀名可以是js，可以是jsx  
组件类型分为class组件和hook组件  
一个React项目，是由成千上万个组件组成
```jsx
// App组件
import React from "react";
import Home from './Home'

//用类组件形式创建组件，Hook形式

//类组件
class App extends React.Component{
  render(){
    return (
      <div>
        <h1>Hello React</h1>
        <h3>学习react</h3>
        <Home></Home>
      </div>
    )
  }
}

// home组件
import React from "react";

export default class Home extends React.Component{
    render(){
        return <h4>我是Home组件</h4>
    }
}
```

### props属性
组件的复用性很重要
```jsx
//父组件
import React from "react";
import Nav from "./Nav";
class App extends React.Component {
  render() {
    const nav1 = ["首页", "视频", "学习"];
    const nav2 = ["Web", "Java", "Python"];
    return (
      <div>
        <h1>Hello React</h1>
        <h3>学习react</h3>
        <Nav nav={nav1}></Nav>
        <Nav nav={nav2}></Nav>
      </div>
    );
  }
}

export default App;

//子组件
import React from "react";
export default class Nav extends React.Component {
  render() {
    return (
      <div>
        <ul>
          {
            this.props.nav.map((text, index) => {
              return <li key={index}>{text}</li>;
            })
          }
        </ul>
      </div>
    );
  }
}

```

**注意事项：**
1. props只读、不可修改

### state
组件中的状态：state  
以前我们操作页面的元素的变化，都是修改DOM，操作DOM  
但是有了React优秀的框架，我们不在推荐操作DOM，页面元素就推荐实用state进行处理

```jsx
import React from "react";

export default class State extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 10,
      flag: true,
    };
  }

  increment() {
    this.setState({
      count: (this.state.count += 1),
    });
  }
  decrement() {
    this.setState({
      count: (this.state.count -= 1),
    });
  }
  clickHandle = () => {};
  changeText = () => {
    this.setState({
      flag: !this.state.flag,
    });
  };
  render() {
    const showView = this.state.flag ? "真的" : "假的";
    return (
      <div>
        <h3>state组件</h3>
        <p>{this.state.count}</p>
        <button onClick={this.increment.bind(this)}>增加</button>
        <button onClick={this.decrement.bind(this)}>减少</button>
        <button onClick={this.clickHandle}>关于this</button>
        <p>{showView}</p>
        <button onClick={this.changeText}>改变文本</button>
      </div>
    );
  }
}
```

### react声明周期函数
随着我们对react理解和使用越来越多，声明周期的惨开价值越来越高  
生命周期钩子函数：
  1. componentWillMount:在组件渲染之前执行
  2. componentDidMount:在组件渲染之后执行
  3. shouldComponentUpdate：返回true代表允许改变，返回false代表不允许改变
      - 当shouldComponentUpdate返回true时执行：
      - componentWillUpdate：数据更新之前执行，(state,props)
      - componentDidUpdate：数据更新完成，(state,props)
  4. componentWillReveiceProps：props发生改变执行
  5. componentWillUnmount：组件卸载前执行

react18不可使用的生命周期钩子函数([官网说明](https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html))：  
1. componentWillMount  
2. componentWillUpdate  
3. componentWillReceiveProps  


```jsx
// 父组件
import React from "react";
import Life from "./life-cycle";
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      title: "父组件提示这是生命周期钩子函数",
    };
  }
  changeTitle = data => {
    this.setState({
      title: data,
    });
  };
  render() {
    return (
      <div>
        <h1>Hello React</h1>
        <h3>学习react</h3>
        <Life title={title} changedad={this.changeTitle}></Life>
        <button onClick={this.changeTitle.bind(this, "啊对对对")}>修改生命周期组件title</button>
      </div>
    );
  }
}
export default App;

// 子组件
import React from "react";
export default class lifeCycle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 10,
    };
  }

  componentDidMount() {
    console.log("组件渲染后执行");
  }

  shouldComponentUpdate() {
    console.log("shouldComponentUpdate");
    return true;
  }
  componentWillUpdate() {
    console.log("数据更新之前执行");
  }

  componentDidUpdate() {
    console.log("数据更新之后执行");
  }

  componentWillUnmount() {
    console.log("组件卸载执行");
  }
  componentWillReceiveProps() {
    console.log("props发生改变执行");
  }
  increment = () => {
    this.setState({
      count: (this.state.count += 1),
    });
  };
  clickChange = () => {
    this.props.changedad("我是儿子的数据");
  };
  render() {
    const { count } = this.state;
    return (
      <div>
        <h3>生命周期函数 - {this.props.title}</h3>
        <p>count数量：{count}</p>
        <button onClick={this.increment}>增加</button>
        <button onClick={this.clickChange}>子修改父组件数据</button>
      </div>
    );
  }
}

```

子传父，父传子


### setState更新时同步还是异步

1. setState会引起视图重绘
2. 在可控的情况下时异步，在非可控的情况下是同步
   1. 更新state -> 创建新的window节点 -> 经过diff对比差异 -> 决定要渲染哪一部分 -> 真正的渲染 -> 形成新的UI

```jsx
import React from "react";

export default class SetState extends React.Component {
  constructor() {
    super();
    this.state = {
      count: 0,
    };
  }
  async increment() {
    // this.setState(
    //   {
    //     count: (this.state.count += 1),
    //   },
    //   () => {
    //     //实时获取this.state.count的值
    //     console.log(this.state.count);
    //   }
    // );
    //之前版本是异步，也有人说同步和异步是自动判断
    // console.log(this.state.count);

    //自己封装的实时打印
    await this.setStateAsync({ count: (this.state.count += 1) });
    console.log(this.state.count);
  }

  setStateAsync(state) {
    return new Promise(resolve => {
      this.setState(state, resolve);
    });
  }

  render() {
    return (
      <div>
        <h1>setState是同步还是异步</h1>
        <p>{this.state.count}</p>
        <button onClick={this.increment.bind(this)}>添加</button>
      </div>
    );
  }
}

```

### 条件渲染
常用的应用场景：
1. 对视图条件进行切换
2. 做缺省值

```jsx
import React from "react";
export default class If extends React.Component {
  constructor() {
    super();
    this.state = {
      islogin: false,
      names: [],
    };
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({
        names: ["coder", "new"],
      });
    }, 3000);
  }
  changeView = () => {
    this.setState({
      islogin: !this.state.islogin,
    });
  };
  render() {
    const { names } = this.state;
    let showView = this.state.islogin ? <div>请登录</div> : <div>注册</div>;
    return (
      <div>
        <h3>条件渲染</h3>
        {showView}
        <button onClick={this.changeView}>切换页面</button>
        {names.length ? (
          <div>
            {names.map((item, index) => {
              return <p key={index}>{item}</p>;
            })}
          </div>
        ) : (
          <div>请等待数据，正在请求....</div>
        )}
      </div>
    );
  }
}

```

### 列表渲染 & key

主要的问题是key，key的作用：
1. 提高性能，避免重新渲染  
2. 索引无变化就无渲染

```jsx
import React from "react";
export default class KeyDemo extends React.Component {
  constructor() {
    super();
    this.state = {
      userInfo: [
        {
          name: "coder",
          age: 20,
          sex: "男",
        },
        {
          name: "new",
          age: 22,
          sex: "女",
        },
        {
          name: "hahha",
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
          name: "lalalala",
          age: 20,
          sex: "不男不女",
        },
      ]),
    });
  };
  render() {
    return (
      <div>
        <p>列表渲染</p>
        <div>
          {this.state.userInfo.map((item, index) => {
            return (
              <div key={index}>
                <p>姓名：{item.name}</p>
                <p>年龄：{item.age}</p>
                <p>性别：{item.sex}</p>
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


### 表单
1. 受控组件——value值通过state值来管理
```jsx
import React from "react";

export default class FormDemo extends React.Component {
  constructor() {
    super();
    this.state = {
      value: "",
    };
  }
  handleSubmit = e => {
    e.preventDefault();
    console.log(this.state.value);
  };
  onChangeHandle = e => {
    this.setState({
      value: e.target.value,
    });
  };
  render() {
    return (
      <div>
        <h2>表单组件</h2>
        <h3>受控组件</h3>

        <form onSubmit={this.handleSubmit}>
          <input type="text" value={this.state.value} onChange={this.onChangeHandle} />
          <button type="submit">提交</button>
        </form>
        <p>input:{this.state.value}</p>
        <h3>非受控组件</h3>
      </div>
    );
  }
}

```

2. 非受控组件——自己操作value的值
```jsx
import React from "react";

export default class RefsForm extends React.Component {
  constructor() {
    super();
    this.username = React.createRef();
    this.password = React.createRef();
  }
  clickHandle = e => {
    //当有多个表单产生数据的数据，无需重新定义函数进行重新处理，仅需像下面这样
    console.log(this.username.current.value);
    console.log(this.password.current.value);
  };
  render() {
    return (
      <div>
        <h2>表单组件</h2>
        <h3>非受控组件</h3>
        <input type="text" ref={this.username} />
        <input type="password" ref={this.password} />
        <button onClick={this.clickHandle}>提交</button>
      </div>
    );
  }
}

```

### refs && DOM
```jsx
import React from "react";

export default class RefsAndDOM extends React.Component {
  constructor() {
    super();
    this.myRef = React.createRef();
  }
  componentDidMount() {
    console.log(this.myRef.current);
    this.myRef.current.style.color = "red";
    /*
        A string ref, "myref2", has been found within a strict mode tree. 
        String refs are a source of potential bugs and should be avoided. 
        We recommend using useRef() or createRef() instead.
    */
    // console.log(this.refs.myref2);
  }
  render() {
    return (
      <div>
        <h2>Refs And DOM</h2>
        <div ref={this.myRef}>Hello</div>
        {/* <div ref="myref2"></div> */}
      </div>
    );
  }
}

```

### 状态提升
组件之间的数据交互
将统一状态提升到父级，然后通过父级分发到两个子组件中

```jsx
// parent
import React from "react";
import Child1 from "./child1";
import Child2 from "./child2";

export default class Parent extends React.Component {
  constructor() {
    super();
    this.state = {
      money: 1,
    };
  }
  changeHandle = e => {
    this.setState({
      money: e.target.value,
    });
  };
  render() {
    return (
      <div>
        <h2>Parent</h2>
        <input type="text" value={this.state.money} onChange={this.changeHandle} />
        <br></br>
        人民币：<Child1 money={this.state.money}></Child1>
        美元：<Child2 money={this.state.money}></Child2>
      </div>
    );
  }
}
//child1
import React from "react";

export default class Child1 extends React.Component {
  constructor() {
    super();
    this.state = {
      value: 0,
    };
  }
  render() {
    return (
      <div>
        <h2>Child1</h2>
        <p>{this.props.money}</p>
      </div>
    );
  }
}

//child2
import React from "react";

export default class Child2 extends React.Component {
  constructor() {
    super();
    this.state = {
      value: 0,
    };
  }
  render() {
    return (
      <div>
        <h2>Child2</h2>
        <p>{this.props.money * 7}</p>
      </div>
    );
  }
}

```


### 组合 vs 继承

组合——`this.props.children`
```jsx
// app.jsx
<Compose>
  <div>我是组合效果--哈哈哈哈</div>
</Compose>

//compose.jsx
import React from "react";
export default class Compose extends React.Component {
  render() {
    return (
      <div>
        <h2>组合 vs 继承</h2>
        {this.props.children}
      </div>
    );
  }
}

```

### 使用PropTypes进行类型检查
增加程序的健壮性

下载
```bash
npm i prop-types
```
使用
```jsx
import React from "react";
import PropTypes from "prop-types";

export default class PropsTypeDemo extends React.Component {
  render() {
    return (
      <div>
        <h2>使用PropTypes进行类型检查</h2>
        {this.props.title} -- {this.props.name}
      </div>
    );
  }
}

PropsTypeDemo.propTypes = {
  title: PropTypes.string.isRequired, //约束数据类型为string，且必填，设置isRequired为必选项
};

//默认值
PropsTypeDemo.defaultProps = {
  name: "你好",
};
```