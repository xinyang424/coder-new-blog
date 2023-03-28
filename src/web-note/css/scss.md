---
title: SASS/SCSS
date: 2022-03-01
category:
  - CSS
tag:
  - css预处理语言
head:
  - - meta
    - name: keywords
      content: sass/scss学习笔记 | coder-new
---

:::info
💡 基于vscode，需要安装插件Live Sass Compiler。

🚀 安装Ruby。参考官网安装方法：[https://www.sass.hk/install/](https://www.sass.hk/install/)

✨ 新建一个.scss文件的后缀名，再点击Watch Sass，保存就会自动生成后缀名为.css的相同文件名。

👁️‍🗨️ SASS官网：[https://www.sass.hk/](https://www.sass.hk/)
:::

Watch Sass(vscode右下角，如果安装好插件没显示可以尝试重启vscode)，
点击后显示Watching后，新建.scss文件名，保存后即可自动生成对应的css文件：
![](/assets/note/css/watch-sass.png)

![](/assets/note/css/watching-sass.png)

## 前言

### 何为sass

世界上最成熟、最稳定、最强大的专业级css扩展语言。
Sass 是一款强化 CSS 的辅助工具，它在 CSS 语法的基础上增加了变量、嵌套、混合、导入等高级功能，
使用 Sass 以及 Sass 的样式库（如 Compass）有助于更好地组织管理样式文件，以及更高效地开发项目。

### sass特点

1. 完全兼容css
2. 特性丰富
3. 成熟
4. 行业认可
5. 社区庞大
6. 在css基础上增加变量、嵌套、混合等功能
7. 通过函数进行颜色值与属性值的运算
8. 提供控制指令等高级功能
9. 自定义输出格式

## 变量

### 变量声明

```css
$highlight-color: #F90;
```

#### 变量可声明的类型

SassScript支持七种数据类型：

- 数字
- 带引号或不带引号的字符串
- 颜色
- 布尔值
- 空值
- list
- map

#### 变量声明和引用下划线或中划线的区别

变量声明和变量引用时候，下划线或者中划线都可以，无区别。
你可以再声明中使用下划线，在引用时候使用中划线一样可以。

### 变量引用

```css
.app{
  width: 100%;
  height: 500px;
  background-color: $highlight-color;
}
//或
$highlight-color: #F90;
$highlight-border: 1px solid $highlight-color;
.selected {
  border: $highlight-border;
}
```

### 变量作用域

还是跟Less一样，花括号内的作用域和比花括号内的影响大，花括号内外声明相同的变量名，花括号使用该变量名只是使用花括号内的变量名。

```css
$primary:red;
.link{
  $primary green;
  color:$primary;
  &:hover{
    color:$primary;
  }
}
p{
  color:$primary;
}
//以上代码编译结果为：
.link{
  color:green;
}
.link:hover{
  color:green;
}
p{
  color:red;
}
```

### 变量覆盖

相同作用域声明同一变量，后声明的起作用：

```css
$primary:red;
.link{
  color:$primary
}
$primary:green;
.other-link{
  color:$primary;
}
//以上代码编译结果为
.link{
  color:red;
}
.other-link{
  color:green;
}
```

### !global关键字

!global关键字用来提升局部变量的权限，将局部变量提升到全局。

```css
$primary:red;
.link{
    $primary:green !global;
    color:$primary;
}
.other-link{
    color: $primary;
}
//以上代码编译结果为：
.link {
  color: green; 
}

.other-link {
  color: green; 
}
```

相同的再对比以下代码，猜测会不会引起变量名覆盖：

```css
.link{
    $primary:green !global;
    color:$primary;
}
.other-link{
    color: $primary;
}
$primary:red;
//以上代码编译结果为：
.link {
  color: green;
}

.other-link {
  color: green;
}
```

但再对比以下代码：

```css
.link{
    $primary:green !global;
    color:$primary;
}
.other-link{
  $primary:blue;
  color: $primary;
}
$primary:red;
//以上代码编译结果为：
.link {
  color: green;
}

.other-link {
  color: blue;
}
```

再对比以下代码：

```css
.link{
    $primary:green !global;
    $primary:pink ;
    color:$primary;
}
.other-link{
  $primary:blue;
  color: $primary;
}
$primary:red;
//以上代码编译结果为：
.link {
  color: pink;
}

.other-link {
  color: blue;
}
```

由此可见，!global关键字只是将这个变量提到最外层的作用域去，且不会影响你在花括号内声明的变量，花括号内声明的变量还是比花括号外声明的变量优先级高。

### 变量插值

#### 选择器变量插值

```css
$name:class;
$direction:left;
$units:px;
.#{name}{
  margin-#{$direction}:20#{units};
}
//以上代码编译结果为：
.class {
  margin-left: 20px; 
}
```

---

## 嵌套

### css嵌套

```css
#content {
  article {
    h1 { color: #333 }
    p { margin-bottom: 1.4em }
  }
  aside { background-color: #EEE }
}
```

### 群组选择器的嵌套

#### 群组选择器

在CSS里边，选择器h1h2和h3会同时命中h1元素、h2元素和h3元素。

#### 群组选择器的使用

```css
.container h1, .container h2, .container h3 { margin-bottom: .8em }
//以上代码可以在scss里面这么写，如下：
.container {
  h1, h2, h3 {margin-bottom: .8em}
}
```

#### 群组选择器的利弊

虽然sass让你的样式表看上去很小，但实际生成的css却可能非常大，这会降低网站的速度。

### 子组合选择器(>)

```css
article > section { border: 1px solid #ccc }
```

### 同层相邻组合选择器(+)

选择header元素后紧跟的p元素：

```css
header + p { font-size: 1.1em }
```

### 同层全体组合选择器(~)

选择所有跟在article后的同层article元素，不管它们之间隔了多少其他元素

```css
article ~ article { border-top: 1px dashed #ccc }
```

### 属性嵌套

```css
nav {
  border-style: solid;
  border-width: 1px;
  border-color: #ccc;
}
//以上写法改为scss内的写法，见下：
nav {
  border: {
  style: solid;
  width: 1px;
  color: #ccc;
  }
}
//如果你想指定哪个边有边框，甚至可以这么写，见下：
nav {
  border: 1px solid #ccc {
  left: 0px;
  right: 0px;
  }
}
```

---

## 父选择器标识符(&)

### 使用父选择器标识符

```css
article a {
  color: blue;
  //这里的&一样指向的是父选择器 article
  &:hover { color: red }
}
```

输出结果为：

```css
article a { color: blue }
article a:hover { color: red }
```

### 编写特殊样式

当用户使用IE浏览器时，可以通过JavaScript在`<body>`标签上添加一个ie的类名，为这种情况编写特殊的样式：

```css
#content aside {
  color: red;
  body.ie & { color: green }
}
```

输出结果为：

```css
/*编译后*/
#content aside {color: red};
body.ie #content aside { color: green }//此时如果时ie浏览器的用户就会渲染为绿色
```

---

## SASS文件

### 导入SASS文件

css有一个特别不常用的特性，即@import规则，它允许在一个css文件中导入其他css文件。
然而，后果是只有执行到@import时，浏览器才会去下载其他css文件，这导致页面加载起来特别慢。

sass也有一个@import规则，但不同的是，sass的@import规则在生成css文件时就把相关文件导入进来。这意味着所有相关的样式被归纳到了同一个css文件中，而无需发起额外的下载请求。

当导入的是scss文件时，可以省略后缀名，只需写文件名：（不管是不是scss文件还是css文件，这里与less不同）

```css
@import './blue-theme';
```

### 原生css导入

前面的导入方法不会造成额外的下载，但是以下情况会造成浏览器解析css时进行额外的下载：

- 被导入文件的名字以.css结尾；
- 被导入文件的名字是一个URL地址（比如<http://www.sass.hk/css/css.css），由此可用谷歌字体API提供的相应服务；>
- 被导入文件的名字是CSS的url()值。

但是因为sass完成兼容原生的CSS，如果你想避免浏览器解析时进行额外的下载，可以把CSS文件修改为sass文件

### 使用SASS部分文件

局部文件：
专门为@import命令而编写的sass文件，并不需要生成对应的独立css文件，这样的sass文件被称为局部文件。

sass的局部文件有个约定，那就是文件名需要以下划线开头。这样sass就不会编译时单独编译这个文件输出css，而只把这个文件用作导入。

举例：
当你想@import一个局部文件时，可以省略下划线和后缀名，如：
导入themes这个文件夹下的_night-sky.scss文件里定义的变量：

```css
@import 'themes/_night-sky.scss';
//可以简写为
@import 'themes/night-sky';
```

### 默认变量值

当导入其它sass文件后，如果你不知道这个sass文件有没有定义此类的样式，你可以用!default，意思：
如果这个变量被声明赋值了，那就用它声明的值，否则就用这个默认值。

```css
$fancybox-width: 400px !default;
.fancybox {
 width: $fancybox-width;
 //假设导入其他人的sass文件声明了这个样式为500px，那就时500px，否则就是400px
}
```

### 嵌套导入

使用这类可以模拟场景，例如有sass文件已经声明了某类边框的样式，你只需导入即可。
就比如一个名为blue-theme的局部文件里声明了内容如下：

```css
aside {
  //声明背景颜色和文字颜色
  background: white;
  color: #333;
}
```

然后使用嵌套导入：

```css
.blue-theme {@import "blue-theme"}

//生成的结果跟你直接在.blue-theme选择器内写_blue-theme.scss文件的内容完全一样。

.blue-theme {
  aside {
    background: white;
    color: #333;
  }
}
```

注意：
被导入的局部文件中定义的所有变量和混合器，也会在这个规则范围内生效。
但这些变量和混合器不会全局有效，这样我们就可以通过嵌套导入只对站点中某一特定区域运用某种颜色主题或其他通过变量配置的样式。

## 静默注释

css原生的注释方式是/*...*/，但是这样方式并不是sass所提供的静默注释。
静默注释有以下几种类型：

```css
body {
  color: #333; // 这种注释内容不会出现在生成的css文件中
  padding: 0; /* 这种注释内容会出现在生成的css文件中 ，这种就是css原生提供注释的方式*/
}

//除了以上一种静默注释的方式，还有以下两个静默注释的方式
body {
  color /* 这块注释内容不会出现在生成的css中 */: #333;
  padding: 1 /* 这块注释内容也不会出现在生成的css中 */ ;
}
```

---

## 混合器

### 定义混合器

下边的这段sass代码，定义了一个非常简单的混合器，目的是添加跨浏览器的圆角边框：

```css
@mixin rounded-corners {
  -moz-border-radius: 5px;
  -webkit-border-radius: 5px;
  border-radius: 5px;
}
```

### 使用混合器

```css
notice {
  background-color: green;
  border: 2px solid #00aa00;
  @include rounded-corners;
}

//sass最终生成：

.notice {
  background-color: green;
  border: 2px solid #00aa00;
  -moz-border-radius: 5px;
  -webkit-border-radius: 5px;
  border-radius: 5px;
}
```

### 混合器利弊

混合器好用是好用，但是一不小心可能会过度使用。大量的重用可能会导致生成的样式表过大，导致加载缓慢。所以，首先使用混合器前，需要考虑其使用场景，避免滥用。

### 何时使用混合器

- 如果你发现自己在不停地重复一段样式，那就应该把这段样式构造成优良的混合器，尤其是这段样式本身就是一个逻辑单元，比如说是一组放在一起有意义的属性。
- 如果你能找到一个很好的短名字来描述这些属性修饰的样式，那么往往能够构造一个合适的混合器。如果你找不到，这时候构造一个混合器可能并不合适。
- 具有语义化含义和展示性描述（如：border-radio-style  边框-圆角-样式 或 top-left-right-border-radio-style 上左右圆角边框样式）

### 混合器中的css规则

简单理解就是，在混合器中也是可以写嵌套滴：

```css
@mixin no-bullets {
  list-style: none;
  li {
    list-style-image: none;
    list-style-type: none;
    margin-left: 0px;
  }
}
```

当一个包含css规则的混合器通过@include包含在一个父规则中时，在混合器中的规则最终会生成父规则中的嵌套规则。举个例子，看看下边的sass代码，这个例子中使用了no-bullets这个混合器：

```css
ul.plain {
  color: #444;
  @include no-bullets;
}
//编译结果如下：
ul.plain {
  color: #444;
  list-style: none;
}
ul.plain li {
  list-style-image: none;
  list-style-type: none;
  margin-left: 0px;
}
```

混合器的额外用法：
混合器中的规则甚至可以使用sass的父选择器标识符&。使用起来跟不用混合器时一样，sass解开嵌套规则时，用父规则中的选择器替代&。

### 混合器传参

#### 定义一个可以传参的混合器

```css
@mixin link-colors($normal, $hover, $visited) {
  color: $normal;
  &:hover { color: $hover; }
  &:visited { color: $visited; }
}
```

#### 调用可以传参的混合器

```css
a {
  @include link-colors(blue, red, green);
}

//Sass最终生成的是：

a { color: blue; }
a:hover { color: red; }
a:visited { color: green; }
```

#### 调用混合器可以只记参数不记顺序

```css
a {
  //这比js的Function，js中的Function无需传参只能是JSON
    @include link-colors(
      $normal: blue,
      $visited: green,
      $hover: red
  );
}
```

#### 混合器传参可以有默认值

```css
@mixin link-colors(
    $normal,
    $hover: $normal,
    $visited: $normal
  )
{
  color: $normal;
  &:hover { color: $hover; }
  &:visited { color: $visited; }
}
```

此时定义的混合器只可以只传一个参数，后面的参数默认则就是第一个参数的值，当然你也可以全部都传，如：
@include link-colors(red)或@include link-colors(red,blue,green)

---

## 选择器继承

### 选择继承器的使用

通过选择器继承继承样式：

```css
//通过选择器继承继承样式
.error {
  border: 1px solid red;
  background-color: #fdd;
}
.seriousError {
  @extend .error;
  border-width: 3px;
}
//最终的编译结果如下：
.error, .seriousError {
  border: 1px solid red;
  background-color: #fdd;
}

.seriousError {
  border-width: 3px;
}
```

以上代码效果就类似于".seriousError"有着".error"的样式，只不过".seriousError"的边框更粗一点。

.seriousError不仅会继承.error**自身的**所有样式，**任何**跟.error**有关的组合选择器样式**也会被.seriousError以组合选择器的形式继承，如下代码:

```css
.error a{  //应用到.seriousError a
  color: red;
  font-weight: 100;
}
.seriousError {
  @extend .error;
  border-width: 3px;
}
//以上代码块编译结果为：
.error a, .seriousError a {
  color: red;
  font-weight: 100;
}

.seriousError {
  border-width: 3px;
}
```

```css
h1.error { //应用到hl.seriousError
  font-size: 1.2rem;
}
.seriousError {
  @extend .error;
  border-width: 3px;
}
//以上代码块编译结果为：
h1.error, h1.seriousError {
  font-size: 1.2rem;
}

.seriousError {
  border-width: 3px;
}
```

### 何时使用选择器继承

- 两个分别写相同的样式，有大量重复的代码。
- 尽量选择样式都在一个地方，如果太分散表达起来就会有点困难了
- 可以较为方便地用一个混合器为两个类提供相同的样式

### 选择器继承的高级用法

### 使用选择继承器的工作细节

### 使用选择继承器的最佳实践
