---
title: vscode 插件合集
date: 2022-03-01
category:
  - 软件合集
index: false
---


## 通用类插件

### Chinese


`Chinese (Simplified) (简体中文) Language Pack for Visual Studio Code`是vscode中最常用的常见，相当于vscode的汉化包，当然习惯英文的可以不装该插件。

注意：安装完成后可能需要关闭 vscode 后重新打开。

### Cute Pink Light Theme

用了多年的亮色粉色主题：`Cute Pink Light Theme`

### CodeSnap

### Live Server

当编写非框架类的 html 页面时，可以使用`Live Server`插件实现修改 HTML 热更新。

方法：`Live Server`插件打开需要 html 的文件，它需要在一个文件夹内。换句话说你并不能直接打开 html 文件右键选择`Live Server`，而是要用vscode打开该 html 文件所在的文件夹再打开 html 文件右键选择`live on server`

### Prettier - Code formatter




<!-- HTML 类插件 👇 -->

## HTML 类插件

### html-comment

使用`html-comment`可以支持html多级嵌套注释。

在windows上使用`html-comment`进行html多级嵌套注释：`Ctrl+Shift+/`。

在mac上使用`html-comment`进行html多级嵌套注释：`Control+Shift+/`。

### Auto Close Tag

### Auto Complete Tag

### Auto Rename Tag

### Image preview

页面 img 标签引入正确的路径后，左边显示行数位置会有一个引入图片的缩略图，代表引入图片引入正确。

需要注意的是，这个并不适合所有框架内，比如uniapp你也可以直接使用`/static/xxx`，此时`Image preview`插件并不一定能够提供给你对应的图片缩略图，但是一般你以相对路径引入的图片并不会太大的问题。



<!-- JS 类插件 👇 -->

## JS 类插件


### Code Runner

可直接在打开的文件中右键选择`Run Code`，支持javascript、typescript等众多编程语言。

### Better Comments

<!-- TS 类插件 👇 -->

## TS 类插件


### json2ts

### Type Challengs

### 


<!-- CSS 类插件 👇 -->

## CSS 类插件

### CSS Peek

悬停在 html 绑定的类名上，会悬浮一个弹框，可以查看该类名上有哪些样式，但是可能在scss、less等预处理的css语言不起作用。

### Color Highlight

编写正确的颜色值，Color Highlight会帮你高亮出对应的颜色。




<!-- Vue类插件 👇 -->

## Vue 类插件

### Vetur

`Vuetur`插件适应于 vue2 项目项目中使用，注意在 vue3 项目中需要禁用该插件，该插件也具备一定的代码格式化功能，可以在其“扩展设置”中进行设置，但是一般建议可以直接使用 Prettier


### vue-helper



<!-- git类插件 👇 -->

## Git 类插件


### git-commit-lint-vscode

使用`git-commit-lint-vscode`可以统一规范提交git代码时填写的内容，[git-commit-lint-vscode中文使用描述](https://github.com/UvDream/git-commit-lint-vscode/blob/HEAD/README.zh-CN.md)。

可以使用其内设的规则进行提交代码，也可以自定义提交代码规则。内设的规则如下：
|   类型   | emji  |           描述            |
| :------: | :---: | :-----------------------: |
|   feat   |   ✨   |        引入新功能         |
|   fix    |   🐛   |         修复 bug          |
|  style   |   💄   |    更新 UI 样式文按键     |
|  format  |   🥚   |        格式化代码         |
|   docs   |   📝   |       添加/更新文档       |
|   perf   |   👌   |       提高性能/优化       |
|   init   |   🎉   |    初次提交/初始化项目    |
|   test   |   ✅   |       增加测试代码        |
| refactor |   🎨   |   改进代码结构/代码格式   |
|  patch   |   🚑   |       添加重要补丁        |
|   file   |   📦   |        添加新文件         |
| publish  |   🚀   |        发布新版本         |
|   tag    |   📌   |        发布新标签         |
|  config  |   🔧   |       修改配置文件        |
|   git    |   🙈   | 添加或修改.gitignore 文件 |


### Git History


<!-- markdown类插件 👇 -->

## Markdown 类插件


### Markdown All in one

### Markdown PDF

### Markdown Preview

### Markdown Table