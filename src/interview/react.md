---
title: React
date: 2024-04-28
---

## 类组件

在 React 中，类组件就是基于ES6语法，通过继承`React.Component`得到的组件 。

:::details 类组件示例代码
```js
class Demo extends React.Component {
  // 初始化类组件的 state
  state = {
    text: "111"
  };
  // 编写生命周期方法 didMount
  componentDidMount() {
    // 省略业务逻辑
  }
  // 编写自定义的实例方法
  changeText = (newText) => {
    // 更新 state
    this.setState({
      text: newText
    });
  };
  // 编写生命周期方法 render
  render() {
    return (
      <div className="demoClass">
        <p>{this.state.text}</p>
        <button onClick={() => this.changeText(222)}>点我修改</button>
      </div>
    );
  }
}
```
:::


## 函数组件

在函数组件也称为**无状态组件**，顾名思义就是以函数形式存在的React组件。

> 在hooks出现之前，react 中的函数组件通常只考虑负责UI的渲染，没有自身的状态，没有业务逻辑代码，是一个纯函数。

下面这个函数组件就是一个纯函数，它的输出只由参数props决定，不受其它任何因素影响。

:::details 函数组件示例代码
```js
function DemoFunction(props) {
  const { text } = props
  return (
    <div className="demoFunction">
      <p>{`function 组件所接收到的来自外界的文本内容是：[${text}]`}</p>
    </div>
  );
}

```
:::

但是这种函数组件一旦我们需要给组件加状态，那就只能将组件重写为类组件，因为**函数组件没有实例，没有生命周期**。所以我们说在hook之前的函数组件和类组件最大的区别就是**状态的有无**。

## Hook

React Hooks 是从 React 16.8 版本推出的新特性，目的是解决React的状态共享组件以及组件生命周期管理混乱的问题。React Hooks的出现标志着，React不会再存在无状态组件的情况，React将只有类组件和函数组件的概念。

`Hooks`为函数组件提供了状态，也支持在函数组件中进行数据获取、订阅事件、解绑事件等。

### useState
```js
const [count, setCount] = useState(0);
```

通过 useState 为组件提供状态。useState的参数是state的初始值，他只有组件第一次渲染的时候会生效，他的返回值是一个数组，第一个是 state，第二个是设置state的函数。

### useRef
```js
const ref = useRef(initialValue);
```
- 用于在函数组件之间保存可变的引用。类似于组件中的 ref。改变 ref 不会触发重新渲染。
- 使用ref操作DOM
```js
import { useRef } from 'react';
export default function Form() {
  const inputRef = useRef(null);
  function handleClick() {
    inputRef.current.focus();
  }
  return (
    <>
      <input ref={inputRef} />
      <MyInput ref={inputRef} />;// 无法获取自定义组件的 ref 
      <button onClick={handleClick}>
        聚焦输入框
      </button>
    </>
  );
}
```
- 无法获取自定义组件的ref
默认情况下，自定义组件不会暴露它们内部的DOM节点的ref。  
像这样将自定义子组件包装在`forwardRef`里，父组件就可以得到它的ref。  
假设你不想暴露出整个 <input> DOM 节点，可以采用useImperativeHandle向父组件暴露一个自定义的 ref。

```js
import { forwardRef } from 'react';
const MyInput = forwardRef(({ value, onChange }, ref) => {
 useImperativeHandle(ref, () => ({
    // 只暴露 focus、scrollIntoView，没有别的
	    focus() {
	      realInputRef.current.focus();
	    },
	    scrollIntoView() {
          inputRef.current.scrollIntoView();
        },
  }),[]);
  return (
    <input
      value={value}
      onChange={onChange}
      ref={ref}
    />
  );
});
export default MyInput;
```

### useEffect
```js
//1. 不设置依赖项数组，那么在组件挂载时和每次渲染时，都会执行一次副作用
useEffect(() => {
    console.log("useEffect副作用执行");
    //用setTimeout模拟ajax请求
    setTimeout(() => {
      setList(result);
    }, 3000);
  });
//2. 设置依赖项为空数组，那么只有在组件挂载和卸载时执行副作用
useEffect(() => {
    console.log("useEffect副作用执行");
    setTimeout(() => {
      setList(result);
    }, 3000);
    return ()=>{
		// 组件卸载前的操作
	}
  },[]);// 空的依赖数组确保只在组件挂载和卸载时执行一次
//3. 如果设置依赖项且不为空，那么在组件挂载时和数组中的依赖项发生变化时，副作用就会重新执行。
 useEffect(() => {
    console.log("useEffect副作用执行");
    setTimeout(() => {
      setList(result);
    }, 3000);
    return ()=>{
		//在下一次 useEffect 执行前执行
	}
  }, [list]);
```
useEffect用于处理组件的副作用：
- 第一个参数是一个回调函数，在里面进行业务逻辑代码的书写（副作用操作）
  - 通常在副作用中进行ajax请求，事件的绑定与解绑，设置定时器与清除等等。
- 第二个参数是依赖项数组，指定副作用的触发条件。
  - 如果不设置第二个参数，那么当该组件挂载和组件每渲染一次，副作用就会执行一次
  - 如果数组中的依赖项设置为空，那么只会在组件挂载和卸载时执行一次副作用。在useEffect的回调函数中，可以执行组件挂载时的操作，并在return返回的清理函数中执行组件卸载前的操作（例如：清除定时器、取消订阅等）
  - 如果数组中存在依赖项，当组件挂载时和依赖项数组中的依赖发生变化，那么该副作用就会重新执行，在useEffect的回调函数中，return返回的清理函数在下一次useEffect执行前执行。
  
### useCallback

&emsp;&emsp;用于缓存函数，以避免无效的函数重新创建。第一个参数为要缓存的函数，第二个参数为依赖项数组，如果依赖发生了变化，那么就会生成一个新的函数，否则当组件重新渲染时，不会重新定义这个函数，而是会取缓存。

### useMemo


&emsp;&emsp;用于缓存计算结果，以避免无效的计算重复执行。 第一个参数为要缓存的函数（注意实际被缓存的是函数被执行过后的值），第二个参数为依赖项数组，如果依赖发生了变化，那么就会重新执行这个函数，得到新的返回值；否则当组件重新渲染时，不会重新执行这个函数，而是直接取被缓存的该函数的返回值。

`useCallback`、`useMemo`都是在函数式组件中用作优化性能的。

默认情况下，当一个组件重新渲染时，React将递归渲染它的所有子组件。组件中的函数就会被重新创建。因为它在JavaScript中，普通函数或箭头函数总是会生成不同的函数。

`useCallback`
- 避免在内部编写额外的嵌套函数
- 避免组件的重新渲染

:::info
&emsp;&emsp;比如说在父组件中接收的props有{ A,B,C }，函数handleSubmit()依赖于A和B，将这个函数作为子组件的props），如果C发生变化，会导致重新创建一个函数handleSumit()，也就导致子组件的props是不同，从而引起子组件重新渲染，但其实这是不必要，这时就可以采用useCallback，将函数handleSubmit传递给useCallback，并设置依赖项（[A，B]），保证只有依赖项（A,B)发生变化时，才会重新生成handleSubmit函数，子组件才会重新渲染，从而避免了组件内部重新创建函数，避免引起不必要的渲染。
:::

`useMemo`
- 避免无效的重新计算
- 跳过组件的重新渲染

:::info
&emsp;&emsp;同理，比如说父组件中接收的props有{A,B,C}，有一个对象count是依赖于A和B计算得出的，并将这个对象count作为子组件的props，正常情况当C发生变化，会导致重新创建对象count，导致传递给子组件的props不同，从而引起子组件的重新渲染，但这是不必要的重复渲染，这时就可以采用useMemo，将定义对象count的计算函数用useMemo包裹，并设置依赖项[A,B]，这样就可以保证只有在依赖项发生变化时，才会重新执行计算函数生成新的count对象，子组件才会重新渲染，从而避免了组件内部重新进行无效计算，避免引起不必要的渲染。
:::


### useContext

用于**跨组件通信**，以便共享数据和功能。它接收一个上下文对象（通过 React.createContext 创建）并返回当前上下文的值。这样，函数组件就可以消费上下文中的数据，而不必通过一层层的属性传递。


:::details 代码示例

```js
import { createContext, useContext } from 'react';
const ThemeContext = createContext(null);

export default function MyApp() {
  return (
    <ThemeContext.Provider value="dark">
      <Form />
    </ThemeContext.Provider>
  )
}

function Form() {
  return (
    <Panel title="Welcome">
      <Button>Sign up</Button>
      <Button>Log in</Button>
    </Panel>
  );
}

function Panel({ title, children }) {
  const theme = useContext(ThemeContext);
  const className = 'panel-' + theme;
  return (
    <section className={className}>
      <h1>{title}</h1>
      {children}
    </section>
  )
}

function Button({ children }) {
  const theme = useContext(ThemeContext);
  const className = 'button-' + theme;
  return (
    <button className={className}>
      {children}
    </button>
  );
}

```

:::

:::info 
useContext() 总是在调用它的组件 上面 寻找最近的 provider。它向上搜索， 不考虑 调用 useContext() 的组件中的 provider。
:::

### 函数组件与类组件的区别

**表面差异：**  
1. 类组件有生命周期，函数组件没有
2. 类组件需要继承class，函数组件不需要
3. 类组件可以获取实例化的this，并且基于this做各种操作，函数组件不行。
4. 类组件内部可以定义并维护state，函数组件为无状态组件（可以通过hooks实现）

函数组件相比类组件，优点是更轻量与灵活，便于逻辑的拆分与复用。


**最大不同：**   
类组件捕获最新的值，函数式组件捕获了渲染时所使用的值，这是两类组件最大的不同。

:::info
&emsp;&emsp;在React中，函数组件 每次渲染组件中的变量和事件处理函数就会重新被创建。每次渲染React都会提供给这次渲染的state快照，也就是说state 的值始终“固定”在一次渲染的各个事件处理函数内部。所以，过去创建的事件处理函数拥有的是创建它们的那次渲染中的 state 值。  

&emsp;&emsp;而在类组件中，事件处理函数是通过this获取最新的state值。
:::

在函数组件中，一个state变量的值永远不会在一次渲染的内部发生变化，即使其事件处理函数的代码是异步的。React会为每次特定的那一次渲染提供一个state快照。组件会将其jsx中返回一张包含一整套新的props和事件处理函数的UI快照，
其中所有的值都是根据那一次渲染中的state的值被计算出来的。

原因：
- 类组件：可以直接获取组件最新的值
    :::info
    原因：类组件捕获最新的值（永远保持一致），当实例的state或props属性发生修改时，类组件直接使用this（组件的实例），所以可以直接获取组件最新的值。
    :::
- 函数组件：函数式组件捕获了渲染时所用的值
    :::info
    原因：函数式组件捕获了渲染所使用的值。在函数组件中，之前的state或props值，已经因为javaScript闭包的特性，保存在内存之中，无法从外部进行修改(维护多个人的状态)。 所以在定时器执行callback时，打印的还是旧值。
    :::