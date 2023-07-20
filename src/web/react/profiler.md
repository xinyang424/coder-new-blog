---
title: Profiler
date: 2022-07-05
category:
  - React
---

Profiler 能添加在 React 树中的任何地方来测量树中这部分渲染所带来的开销。

<!-- more -->

Profiler 需要两个 prop：第一个是 id，另一个是当组件树中的组件“提交”更新的时候被 React 调用的回调函数`onRender`。

可以用于分析单个组件、同时分析多个组件、甚至嵌套检测：

:::details 查看单个组件检测示例代码

```js
import React from "react";
export default class App extends React.Component {
  render() {
    return (
      <App>
        <Profiler id="Navigation" onRender={callback}>
          <Navigation {...props} />
        </Profiler>
        <Main {...props} />
      </App>
    );
  }
}
```

:::

:::details 查看多个组件检测示例代码

```js
import React from "react";
export default class App extends React.Component {
  render() {
    return (
      <App>
        <Profiler id="Navigation" onRender={callback}>
        <Navigation {...props} />
        </Profiler>
        <Profiler id="Main" onRender={callback}>
        <Main {...props} />
        </Profiler>
      </App>
    );
  }
}
```

:::

:::details 查看嵌套检测检测示例代码

```js
import React from "react";
export default class App extends React.Component {
  render() {
    return (
      <App>
            <Profiler id="Panel" onRender={callback}>
            <Panel {...props}>
                <Profiler id="Content" onRender={callback}>
                <Content {...props} />
                </Profiler>
                <Profiler id="PreviewPane" onRender={callback}>
                <PreviewPane {...props} />
                </Profiler>
            </Panel>
            </Profiler>
        </App>
    );
  }
}
```

:::


## onRender回调

`Profiler` 需要一个 `onRender` 函数作为参数。 React 会在 profile 包含的组件树中任何组件 “提交” 一个更新的时候调用这个函数。 它的参数描述了渲染了什么和花费了多久。

```js
function onRenderCallback(
  id, // 发生提交的 Profiler 树的 “id”
  phase, // "mount" （如果组件树刚加载） 或者 "update" （如果它重渲染了）之一
  actualDuration, // 本次更新 committed 花费的渲染时间
  baseDuration, // 估计不使用 memoization 的情况下渲染整棵子树需要的时间
  startTime, // 本次更新中 React 开始渲染的时间
  commitTime, // 本次更新中 React committed 的时间
  interactions // 属于本次更新的 interactions 的集合
) {
  // 合计或记录渲染时间。。。
}
```

- id: string - 发生提交的 Profiler 树的 id。 如果有多个 profiler，它能用来分辨树的哪一部分发生了“提交”。
- phase: "mount" | "update" - 判断是组件树的第一次装载引起的重渲染，还是由 props、state 或是 hooks 改变引起的重渲染。
- actualDuration: number - 本次更新在渲染 Profiler 和它的子代上花费的时间。 这个数值表明使用 memoization 之后能表现得多好。（例如 React.memo，useMemo，shouldComponentUpdate）。 理想情况下，由于子代只会因特定的 prop 改变而重渲染，因此这个值应该在第一次装载之后显著下降。
- baseDuration: number - 在 Profiler 树中最近一次每一个组件 render 的持续时间。 这个值估计了最差的渲染时间。（例如当它是第一次加载或者组件树没有使用 memoization）。
- startTime: number - 本次更新中 React 开始渲染的时间戳。
- commitTime: number - 本次更新中 React commit 阶段结束的时间戳。 在一次 commit 中这个值在所有的 profiler 之间是共享的，可以将它们按需分组。
- interactions: Set - 当更新被制定时，“interactions” 的集合会被追踪。（例如当 render 或者 setState 被调用时）。
