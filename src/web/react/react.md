---
title: 学习React
date: 2022-06-16
category:
  - React
---

前提必备：学习JSX，如果没有学习JSX，建议先了解下[JSX](./jsx.md)

学习路线：React基础 -> React Hooks -> React路由 -> Redux -> 组件库 -> immutable -> Mobx -> React + TS -> 单元测试 -> dva + umi



<!-- more -->

## 什么是React

React 是一个用于构建用户界面的 JavaScript 库。

## 为什么学习React开发

- 声明式设计——React采用声明范式，可以轻松描述应用。
- 高效——React通过对DOM的模拟（虚拟DOM），最大限度低减少与DOM的交互。
- 灵活——React可以与已知的库或框架很好地配合
- JSX——JSX是JavaScript语法的扩展
- 组件化——通过React构建组件，使得代码更加容易得到复用，能够很好的应用在大项目的开发中。
- 单向数据流——React实现了单向响应的数据流，从而减少了重复代码，这也是它为什么比传统数据绑定更简单。
- 虚拟DOM
  - 传统DOM更新：真实页面对应一个DOM树。在传统页面的开发模式中，每次需要更新页面时，都要手动操作DOM来进行更新
  - 虚拟DOM：DOM操作非常昂贵，我们都指导在前端开发中，性能消耗最大的就是DOM操作，而且这部分代码会让整体项目的代码变得难以维护。React把真实DOM树转换成JavaScript对象树，也就是Virtual DOM


## 什么是MVC

MVC 是一种软件设计模式，代表模型-视图-控制器（Model-View-Controller）的缩写。它是一种将应用程序的逻辑和用户界面进行分离的架构模式，旨在提高代码的可维护性、可扩展性和重用性。

MVC 模式将应用程序分为三个核心组件：

1. 模型（Model）：模型表示应用程序的数据和业务逻辑。它负责管理数据的状态、操作和持久化。模型通常包含数据的定义、访问和修改方法。
2. 视图（View）：视图负责呈现模型的数据和状态给用户界面。它是用户界面的可视化部分，负责展示数据、接收用户输入和显示操作结果。
3. 控制器（Controller）：控制器是模型和视图之间的中间层，负责协调模型和视图之间的通信。它接收用户的输入，根据输入调用适当的模型方法进行处理，并将结果反映到视图中。

MVC 模式的优势在于它能够将应用程序的不同部分进行解耦，使其易于维护和扩展。通过将业务逻辑和用户界面分离，开发人员可以更好地组织代码、实现单一责任原则，并且可以独立地修改和测试每个组件。此外，MVC 模式还促进了团队的协作，因为开发人员可以同时处理模型、视图和控制器的不同方面。

## React与传统MVC的关系

React 并不是一个传统意义上的 MVC（模型-视图-控制器）框架，而是一个用于构建用户界面的 JavaScript 库。它采用了一种称为组件化的方式来构建用户界面，使开发人员能够将界面拆分为独立的可重用组件，并管理这些组件的状态和交互。

在传统的 MVC 模式中，控制器负责处理用户输入和业务逻辑，视图负责呈现数据，模型负责管理数据和状态。而在 React 中，没有明确的控制器角色。相反，React 使用组件作为构建块，并通过组件的状态、属性和生命周期方法来管理数据和逻辑。React 的核心思想是构建可组合、可重用的 UI 组件，而不是严格遵循 MVC 的分层架构。

然而，虽然 React 不是传统的 MVC 框架，但它可以与其他框架或库结合使用，以构建符合 MVC 架构的应用程序。例如，结合使用 React 和 Redux 可以实现状态管理，并将数据的获取和处理逻辑从组件中分离出来，使其更接近传统的 MVC 模式。

总而言之，React 是一个用于构建用户界面的库，它采用了组件化的方式来管理界面的状态和交互，而不是一个严格遵循传统 MVC 模式的框架。

## 创建项目

### 基于webpack创建
```bash
npx create-react-app [projectName]

# or

npm install create-react-app -g

create-react-app [projectName]
```


### 基于vite创建

```bash
# npm 6.x
npm init vite@latest [projectName] --template vue

# npm 7+, extra double-dash is needed:
npm init vite@latest [projectName] -- --template react
```