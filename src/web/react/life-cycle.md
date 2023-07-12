---
title: 生命周期
date: 2022-06-28
category:
  - React
---


React组件分为Class组件和函数式组件的，Class组件本身就有生命周期钩子函数的，而函数式组件本身式没有生命周期钩子函数，但函数式组件配合Hook，使得其可以使用生命周期钩子函数。

<!-- more -->

## Class组件生命周期钩子函数

https://blog.csdn.net/M0li0809/article/details/104482154/

生命周期钩子函数：
1. `componentWillMount`：在组件渲染之前执行
2. `componentDidMount`：在组件渲染之后执行
3. `shouldComponentUpdate`：返回true代表允许改变，返回false代表不允许改变。

仅当shouldComponentUpdate返回true时执行：
- `componentWillUpdate`：数据更新之前执行，(state,props)
- `componentDidUpdate`：数据更新之前执行，(state,props)

4. `componentWillReveiceProps`：props发生改变执行
5. `componentWillUnmount`：组件卸载前执行

react18不可使用的生命周期钩子函数([官网说明](https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html))：  
1. componentWillMount  
2. componentWillUpdate  
3. componentWillReceiveProps  

但是加上`UNSAFE_`前缀后，控制台就不会再抛出警告。如：`UNSAFE_componentWillMount`、`UNSAFE_componentWillUpdate`、`UNSAFE_componentWillReceiveProps`

:::details 查看示例代码

::: code-tabs#shell

@tab 父组件

```js
import React from "react";
import ChildClass from "./components/Child-class";
export default class App extends React.Component {
  state = {
    isShow: true,
    courses: ["Web", "Java", "Python"],
  };

  componentDidMount() {
    console.log("父组件渲染已完成");
  }

  shouldComponentUpdate() {
    console.log(`判断父组件数据是否可以更新`);
    return true; // true可以更新 false不可更新
  }
  UNSAFE_componentWillUpdate() {
    console.log("父组件数据更新前");
  }

  componentDidUpdate() {
    console.log("父组件数据更新完成");
  }

  componentWillUnmount() {
    console.log("父组件组件卸载前执行");
  }
  UNSAFE_componentWillReceiveProps() {
    console.log("父组件props发生改变");
  }
  render() {
    return (
      <>
        <h2>父组件</h2>
        <button onClick={() => this.setState({ courses: ["前端", "后端", "运维"] })}>更新数据</button>
        <button onClick={() => this.setState({ isShow: !this.state.isShow })}>控制子组件是否显示</button>
        {this.state.isShow ? <ChildClass course={this.state.courses}></ChildClass> : null}
      </>
    );
  }
}
```

@tab 子组件

```js
import React from "react";

export default class Child1ClassDemo extends React.Component {
  componentDidMount() {
    console.log("子组件渲染已完成");
  }

  shouldComponentUpdate() {
    console.log("判断子组件数据是否可以更新");
    return false; // true可以更新 false不可更新
  }
  UNSAFE_componentWillUpdate() {
    console.log("子组件数据更新前");
  }

  componentDidUpdate() {
    console.log("子组件数据更新完成后");
  }

  componentWillUnmount() {
    console.log("子组件组件卸载前执行");
  }
  UNSAFE_componentWillReceiveProps() {
    console.log("子组件props发生改变");
  }
  render() {
    return (
      <>
        <h2>子组件Hook组件</h2>
        <ol>
          {this.props.course.map((element, index) => (
            <li key={index}>{element}</li>
          ))}
        </ol>
      </>
    );
  }
}

```
:::

**总结：**

`constructor`在初始化时会调用

`render`函数里面每次页面数据变化都会执行这个函数

**渲染顺序：**父组件渲染前 -> 子组件渲染前-> 子组件渲染完成 -> 父组件渲染完成

**数据更新顺序：**

数据更新需要注意的点，数据每次变化都会执行`shouldComponentUpdate`来判断是否进行数据更新，返回`true`时会进行数据更新，返回`false`时不进行数据更新。

父子组件之间数据更新顺序(`shouldComponentUpdate`都返回`true`)：判断父组件数据是否可以更新 -> 父组件数据更新前 -> 子组件props发生改变 -> 子组件判断数据是否可以更新 -> 子组件数据更新前 -> 子组件数据更新完成后 -> 父组件数据更新完成后

父子组件之间数据更新顺序(父组件`shouldComponentUpdate`返回`false`，父组件`shouldComponentUpdate`返回`true`)：判断父组件数据是否可以更新 -> 结束

父子组件之间数据更新顺序(父组件`shouldComponentUpdate`返回`true`，父组件`shouldComponentUpdate`返回`false`)：判断父组件数据是否可以更新 -> 父组件数据更新前 -> 子组件props发生改变 -> 判断子组件数据是否可以更新 -> 父组件数据更新完成

**卸载顺序：**

子组件卸载前 -> 父组件卸载前

## 函数式 + Hook钩子函数

**useState、useEffect、useRef、**

https://blog.csdn.net/weixin_45024453/article/details/129366825?spm=1001.2101.3001.6650.2&utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7EYuanLiJiHua%7EPosition-2-129366825-blog-104482154.235%5Ev38%5Epc_relevant_sort_base2&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7EYuanLiJiHua%7EPosition-2-129366825-blog-104482154.235%5Ev38%5Epc_relevant_sort_base2&utm_relevant_index=3


https://zhuanlan.zhihu.com/p/496092335/

:::details 查看示例代码

:::