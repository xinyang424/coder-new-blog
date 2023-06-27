---
title: Emotion(CSS-IN-JS)
date: 2023-06-26
category:
  - 实用技巧
---


<!-- more -->

## 为什么会有 CSS-IN-JS

在我们的现有认知中，我们都是提倡将结构化样式和行为进行分离的，即html、css、js代码三者都分离编写。而CSS-IN-JS这种解决方案，它提倡我们把CSS代码写在JavaScript代码当中，这与我们传统认知是背道而驰的。

1. 第一个原因是因为开发方式上发生变化；以前我们开发前端项目的时候，都是以页面为单位的，这个时候，css文件都是通过link标签引入到html文件当中，由于css中并没有作用域的概念，所以整个css文件中的代码都会被应用到html文件当中，这在当时是没有问题的。但是现在在开发前端项目中，都是以组件为单位的，既然是以组件为单位的，我们就希望这个css代码只应用于某一个组件，使得css代码只在这个组件范围内生效，这样做的好处是，组件与组件当中的css代码它不会产生冲突，但是要实现这样的功能，需要css本身具有作用域的概念，但是css当中是没有这样的功能的。如果采用CSS-IN-JS这种解决方案，我们就可以模拟JavaScript的作用域去模拟css的作用域，这样css的代码就可以只作用域组件内部。
2. 第二个原因是因为采用CSS-IN-JS解决方案，可以增加组件的独立性以及可移植性。如果说我们把css代码都写在不同的css文件当中，当我们想把这个组件移到其它地方的同时，我们还要多考虑这个组件的依赖性问题。如果采用CSS-IN-JS，这样这个组件就是一个单独的文件，也无需考虑是否少复制或移动某个css文件。
3. 第三个原因是因为css本身是缺乏动态功能的，它无法通过条件来决定给某一个元素去添加什么样的样式，但把css写在js中，就可以利用js的动态功能，为元素动态添加样式了。

总结来说，CSS-IN-JS这种解决方案解决了css没有作用域的问题、增加组件的独立性和可移植性、增加css的动态功能。

## CSS-IN-JS 介绍

优点：
1. 让css代码拥有独立的作用域，阻止css代码泄露到组件外部，防止样式冲突。
2. 让组件更具有可移植性，实现开箱即用，轻松创建松耦合的应用程序。
3. 让组件更具有重用性，只需编写一次即可，可以在任何地方运行，不仅可以在同一应用程序中重用组件，而且可以在使用相同框架构建的其它应用程序中重用组件。
4. 让样式具有动态功能，可以将复杂的逻辑应用于样式规则，如果要创建需要动态功能的复杂UI，它是理想的解决方案。

缺点：
1. 为项目增加了额外的复杂性。
2. 自动生成的选择器大大降低了代码的可读性。

CSS-IN-JS更值得在react项目中进行推广。

## Emotion 库
CSS-IN-JS只是一个解决方案，它并不是一个具体的库，而Emotion 库就是这个解决方案的具体实现，通过学习Emotion 库，可以知道CSS-IN-JS具体是怎么实施的。

:::tip 
[Emotion 官方文档](https://emotion.sh/docs/introduction)
[Emotion GitHub](https://github.com/emotion-js/emotion)
:::

Emotion诣在使用JavaScript编写css样式的库。
```bash
npm install @emotion/react @emotion/styled
```

两种方式，但是这里推荐最值得的一种方式。  
注意react项目是用`npx create-react-app xxx`创建的
1. 终端分别运行：`npm run eject`和`npm i @emotion/babel-preset-css-prop -D`
2. 在`package.json`文件中，，在`package.json`修改配置：
```json
"babel": {
  "presets": [
    "react-app",
    "@emotion/babel-preset-css-prop"
  ]
}
```
1. 在app.js中修改为以下代码
```js
//app.js
import React from "react";

function App() {
  return (
    <div>
      <p css={{ color: "pink", "background-color": "blue" }}>Hello React!</p>
    </div>
  );
}
export default App;
```
4. 此时就可以看到p标签字体颜色为粉色，背景颜色为蓝色。



::: code-tabs#shell
@tab String Styles写法
```js
// app.js
import React from "react";
import { css } from "@emotion/react";
const style = css`
  width: 100px;
  height: 100px;
  background: skyblue;
`;
function App() {
  return <div css={style}>Hello React!</div>;
}

export default App;
```
@tab Object Styles写法
```js
// app.js
import React from "react";
import { css } from "@emotion/react";
const style = css({
  width: "100px",
  height: "100px",
  background: "pink",
});

function App() {
  return <div css={style}>Hello React!</div>;
}

export default App;

```

:::



### css 属性优先级

props 对象中的css属性优先级高于组件内部的css属性，在调用组件时可以在覆盖组件默认样式。

代码示例：
::: code-tabs#shell
@tab 父组件
```js
import React from "react";
import { css } from "@emotion/react";
import Css from "./Css";
const style = css({
  width: "100px",
  height: "100px",
  background: "pink",
});
function App() {
  return (
    <div>
      <Css css={style}></Css>
    </div>
  );
}

export default App;
```

@tab 子组件
```js
import { css } from "@emotion/react";
const CssStyle = css`
  width: 200px;
  height: 500px;
  background: green;
`;
const Css = props => {
  return (
    <p css={CssStyle} {...props}>
      我是CSS组件
    </p>
  );
};
export default Css;
```
:::

最终呈现的样式为：宽高各100像素，背景色为粉色。


### Styled Components样式化组件
样式化组件就是用来构成用户界面的，是emotion库提供的另一种为元素添加样式的方式。

**创建样式化组件**

```js
import React from "react";
import styled from "@emotion/styled";

// String Styles写法
const Button = styled.button`
  border: none;
  padding: 10px 20px;
  background: blue;
  color: #fff;
  cursor: pointer;
`;
// Object Styles写法
const Container = styled.div({
  width: "1000px",
  height: "300px",
  background: "pink",
  margin: "0 auto",
});

function App() {
  return (
    <div>
      <Container>
        Hello React!
        <br></br>
        <Button>click me</Button>
      </Container>
    </div>
  );
}

export default App;

```

### 根据props属性覆盖样式

```js
import React from "react";
import styled from "@emotion/styled";

// String Styles
const Button = styled.button`
  border: none;
  padding: 10px 20px;
  background: ${props => props.bgColor || "blue"};
  color: #fff;
  cursor: pointer;
`;

// Object Styles
const Container = styled.div(props => ({
  //w传的是字符串的话，要写像素单位，传对象的话，就不用写像素单位
  width: props.w || "1000px",
  height: "300px",
  background: "pink",
  margin: "0 auto",
}));

// 另外一种写法
const Container2 = styled.div(
  {
    height: "200px",
    background: "pink",
  },
  props => ({
    color: props.color,
  })
);

function App() {
  return (
    <div>
      <Container w="200px">
        Hello React!
        <br></br>
        <Button bgColor="purple">click me</Button>
      </Container>
      <Container2></Container2>
    </div>
  );
}

export default App;

```



### 为任何组件添加样式

```js
import React from "react";
import styled from "@emotion/styled";

// String Styles
const Demo = ({ className }) => <div className={className}>Demo</div>;
const Fancy = styled(Demo)`
  color: red;
`;

// Object Styles
const Fancy2 = styled(Demo)({
  background: "tomato",
  color: "red",
});

function App() {
  return (
    <>
      <Fancy></Fancy>
      <Fancy2></Fancy2>
    </>
  );
}

export default App;

```


### 通过父组件设置子组件的样式

```js
import React from "react";
import styled from "@emotion/styled";

// String Styles
const Child = styled.div`
  color: red;
`;
const Parent = styled.div`
  ${Child} {
    color: green;
  }
`;

// Object Styles
const Child1 = styled.div({
  color: "tomato",
});
const Parent1 = styled.div({
  [Child1]: {
    color: "purple",
  },
});

function App() {
  return (
    <>
      {/* 此字体为红色 */}
      <Child>Child</Child>
      <Parent>
        {/* 此字体会变成绿色 */}
        <Child>Child Parent</Child>
      </Parent>

      {/* 此字体为番茄色 */}
      <Child1>Child1</Child1>
      <Parent1>
        {/* 此字体为紫色 */}
        <Child1>Child1 Parent1</Child1>
      </Parent1>
    </>
  );
}

export default App;

```

### 嵌套选择器 & 
`&`表示组件本身
```js
import React from "react";
import styled from "@emotion/styled";

// String Styles
const Container = styled.div`
  color: red;
  & > a {
    color: purple;
  }
  & > a:hover {
    color: pink;
  }
`;

// Object Styles

function App() {
  return (
    <>
      <Container>
        <a href="javascript:;">我是一个a标签</a>
      </Container>
    </>
  );
}

export default App;

```


### as 属性

要使用组件中的样式，但要更改呈现的元素，可以使用as属性。


```js
import React from "react";
import styled from "@emotion/styled";
// String Styles
const Button = styled.button`
  color: red;
`;

function App() {
  return (
    <>
      <Button>This is a button</Button>
      <Button as="a" href="//www.baidu.com" target="__blank">
        This is a link button
      </Button>
    </>
  );
}
export default App;
```

### 样式组合

在样式组合后，后调用的样式优先级高于先调用的样式

```js
import React from "react";
import { css } from "@emotion/react";

const base = css`
  color: yellow;
`;

const danger = css`
  color: red;
`;

function App() {
  return (
    <>
      {/* 最终按钮的文字颜色为红色 */}
      <button css={[base, danger]}>This is a button</button>
    </>
  );
}

export default App;

```

### 全局样式

```js
import React from "react";
import { css, Global } from "@emotion/react";

const styles = css`
  body {
    margin: 0;
  }
  a {
    text-decoration: none;
    color: red;
  }
`;

function App() {
  return (
    <>
      <Global styles={styles} />
      <a href="javascript:;">link</a>
    </>
  );
}

export default App;

```

### 使用keyframes方法定义关键帧动画

```js
import React from "react";
import { css, keyframes } from "@emotion/react";

const move = keyframes({
  "0%": {
    left: 0,
    top: 0,
    background: "pink",
  },
  "100%": {
    left: "600px",
    top: "300px",
    background: "skyblue",
  },
});

const box = css`
  width: 100px;
  height: 100px;
  position: absolute;
  animation: ${move} 2s ease infinite alternate;
`;
//infinite——无限循环 alternate——从终点运动回起点

function App() {
  return (
    <>
      <div css={box}></div>
    </>
  );
}

export default App;

```
### 下载主题模块



::: code-tabs#shell
@tab index.js
```js
import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "@emotion/react";
import App from "./App";
//添加主题对象
const theme = {
  colors: {
    primary: "hotpink",
  },
};
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);

```
@tab App.js
```js
import React from "react";
import { css, useTheme } from "@emotion/react";

//获取主题内容——方法一
const getPrimaryColor = props => css`
  color: ${props.colors.primary};
`;

function App() {
  //获取主题内容——方法二
  const getTheme = useTheme();
  console.log(getTheme);
  return (
    <>
      <div css={getPrimaryColor}>Hello React!</div>
    </>
  );
}

export default App;

```


:::