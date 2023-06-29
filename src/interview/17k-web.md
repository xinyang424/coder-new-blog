---
title: 17K Web
date: 2023-06-28
category:
  - 记八股文
---


<!-- more -->

**div浮动之后宽度改变了多少？**

div未浮动之前，宽度相当于父元素的100%，如果未设置高度则高度由内容撑开，如果设置高度则为定高。

div浮动之后，如果设置了宽度就为定宽，如果未设置了宽度，则宽度有内容撑开。

---

**CSS如何实现一条0.5像素的线？**

1. 利用`transform`的`scaleY`
:::normal-demo  代码示例
```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      .line {
        position: relative;
        height: 1px;
      }

      .line::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 1px;
        background-color: black;
        transform-origin: center;
        transform: scaleY(0.5);
      }
    </style>
  </head>
  <body>
    <div class="line"></div>
  </body>
</html>

```
:::
在上述代码中，我们通过在 `.line` 元素上创建一个伪元素 `::before`，并将其高度设置为 `1px`。然后使用 `transform` 属性进行垂直缩放，将线条的高度缩放为原来的一半（0.5px）。
2. `border-width`和伪元素
:::normal-demo  代码示例
```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      .line {
        position: relative;
        height: 1px;
        overflow: hidden;
      }

      .line::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 1px;
        background-color: black;
        border-top-width: 0.5px;
        border-top-style: solid;
      }
    </style>
  </head>
  <body>
    <div class="line"></div>
  </body>
</html>

```
:::
在这种方法中，我们通过设置 `border-top-width` 为 0.5px，同时将 `.line` 元素的 `overflow` 属性设置为 `hidden`，来实现近似于 0.5px 的线条效果。

需要注意的是，这些方法实际上是通过视觉效果来近似显示 0.5px 的线条，并不是真正的物理像素。在高分辨率的屏幕上可能会有不同的表现。此外，某些浏览器可能对小于 1px 的线条效果进行了取舍或处理，因此在不同浏览器上可能会有差异。

---

**background-size有哪些属性？重点说说cover和container区别**

- `auto`：以背景图片的比例缩放背景图片。
- `cover`：缩放背景图片以完全覆盖背景区，可能背景图片部分看不见。和 `contain` 值相反，`cover` 值尽可能大的缩放背景图像并保持图像的宽高比例（图像不会被压扁）。该背景图以它的全部宽或者高覆盖所在容器。当容器和背景图大小不同时，背景图的 左/右 或者 上/下 部分会被裁剪。  
- `contain`：缩放背景图片以完全装入背景区，可能背景区部分空白。`contain` 尽可能的缩放背景并保持图像的宽高比例（图像不会被压缩）。该背景图会填充所在的容器。当背景图和容器的大小的不同时，容器的空白区域（上/下或者左/右）会显示由 background-color 设置的背景颜色。
- `contain`或`cover`：保留固有比例，最大的包含或覆盖背景区。如果图像没有固有比例，则按背景区大小。
- `auto`或`auto auto`：图像如果有两个长度，则按这个尺寸。如果没有固有尺寸与固有比例，则按背景区的大小。如果没有固有尺寸但是有固有比例，效果同 `contain`。如果有一个长度与比例，则由此长度与比例计算大小。如果有一个长度但是没有比例，则使用此长度与背景区相应的长度。
- 一个为 `auto` 另一个不是 `auto`：如果图像有固有比例，则指定的长度使用指定值，未指定的长度由指定值与固有比例计算。如果图像没有固有比例，则指定的长度使用指定值，未指定的长度使用图像相应的固有长度，若没有固有长度，则使用背景区相应的长度。                              

---

**为什么闭包可以延长作用域链？**

闭包可以延长作用域链，是因为在 JavaScript 中，每当创建一个函数时，函数会同时创建一个闭包。闭包是由函数以及函数内部能够访问的变量组成的组合体。

在 JavaScript 中，函数内部的变量在函数执行完毕后通常会被销毁，但是当函数形成闭包时，它的内部变量将被保存在闭包中，并且可以在函数执行完毕后仍然被访问和使用。

当一个函数内部定义了另一个函数，并且内部函数引用了外部函数的变量时，就形成了闭包。内部函数可以访问外部函数的变量，即使外部函数已经执行完毕，这是因为闭包将外部函数的作用域链保存在内部函数的内部，使得内部函数能够继续访问外部函数的变量。

这种延长作用域链的机制使得闭包具有特殊的能力，例如在函数外部访问函数内部的变量、创建私有变量和函数等。闭包的这种特性在某些场景下非常有用，例如在事件处理程序、回调函数和模块化开发等方面经常被应用。

需要注意的是，由于闭包会持有对外部变量的引用，如果闭包被长期保持，可能会导致内存泄漏的问题。因此，在使用闭包时需要注意对内存的管理和释放，避免不必要的资源消耗。


```js
function add(){
    var num = 0;
    return function(){
        console.log(num++);//num++ 先赋值num，再执行num+1。++num，先执行num+1，再赋值num
    }
}

var func1 = add();
var func2 = add();
func1();// 0
func1();// 1
func2();// 0
```

```js
function isA(){
    return
    true;
}
console.log(isA());//返回undefined
```

---

**flex-basis作用？**

`flex-basis` 是 CSS 中 Flexbox 布局模型中的一个属性，用于设置弹性元素在主轴上的初始大小。

具体作用如下：

1. 设置弹性元素的初始宽度（在主轴上）或高度（在侧轴上）。
2. 定义弹性元素在分配多余空间之前的大小。

`flex-basis` 的取值可以是一个长度值（如像素、百分比等），也可以是关键字 `auto`，表示使用元素的原始尺寸作为基准。

在 Flexbox 布局中，`flex-basis` 通常与其他属性一起使用，如 `flex-grow` 和 `flex-shrink`。它们共同决定了弹性元素在容器中的分布和调整规则。通过调整 `flex-basis` 的值，可以控制弹性元素在容器中的初始大小和伸缩行为。

举个例子，如果设置 `flex-basis: 200px;`，则表示弹性元素在主轴上的初始大小为 200 像素。当容器有多余空间时，弹性元素会根据 `flex-grow` 属性进行伸展。当容器空间不足时，弹性元素会根据 `flex-shrink` 属性进行收缩。

---

**什么是可迭代对象？**

在 JavaScript 中，可迭代对象（Iterable）是指实现了迭代器协议的对象，它可以被迭代（遍历）的对象。可迭代对象在语言层面上支持迭代操作，例如使用 `for...of` 循环或内置的迭代器方法。

在 JavaScript 中，可迭代对象具有以下特点：

1. 实现 Symbol.iterator 方法：可迭代对象必须实现名为 Symbol.iterator 的方法，该方法返回一个迭代器对象。迭代器对象应具有 `next()` 方法用于获取下一个值。
2. 迭代器对象：迭代器对象是可迭代对象返回的对象，它负责迭代操作。迭代器对象应具有 `next()` 方法，该方法在每次调用时返回一个包含 `value` 和 `done` 属性的对象，`value` 表示当前迭代的值，`done` 表示是否已经遍历完所有值。

可迭代对象可以是数组、字符串、Set、Map 等内置的数据结构，以及自定义的对象。通过实现迭代器协议，这些对象就可以被 `for...of` 循环、扩展运算符等语法或方法进行遍历。

举个例子，以下是一个自定义可迭代对象的示例：

```javascript
const myIterable = {
  data: ['A', 'B', 'C'],
  [Symbol.iterator]() {
    let index = 0;
    return {
      next: () => {
        if (index < this.data.length) {
          return { value: this.data[index++], done: false };
        } else {
          return { value: undefined, done: true };
        }
      }
    };
  }
};

for (const item of myIterable) {
  console.log(item);
}
// 输出：A
// 输出：B
// 输出：C
```

在上述示例中，`myIterable` 对象实现了 Symbol.iterator 方法，返回一个迭代器对象。迭代器对象在每次调用 `next()` 方法时返回一个包含当前值的对象，直到遍历完所有值。

总之，JavaScript 中的可迭代对象是指实现了迭代器协议的对象，可以通过 `for...of` 循环或其他迭代操作进行遍历。可迭代对象通过实现 Symbol.iterator 方法返回迭代器对象，该迭代器对象负责迭代操作并提供 `next()` 方法获取值。

---

**什么是Tree shaking？为什么要基于ESModule？**

Tree shaking是一种在JS中用于移除未使用代码的优化技术。它的目的是通过静态分析，识别并删除不会被执行的代码，从而减少最终打包文件的体积。

Tree shaking主要针对ES2015模块系统（即import/export）进行优化，通过对模块之间的依赖关系进行分析，webpack可以确定哪些代码被实际使用，而哪些代码是多余的。在打包过程中，未被引用的模块会被标记为无效代码，并从最终的输出的文件删除。

Tree shaking的优点是可以大幅度减小代码体积，提升应用程序的加载速度。它使得开发者可以更加自由地引入第三方库或模块，而无需担心打包文件过大的问题。

要实现 Tree shaking，需要满足以下条件：
1. 使用 ES2015 模块语法进行模块导入和导出。
2. 代码必须经过静态分析，使得依赖关系可以被确定。
3. 使用一个能够进行 Tree shaking 的打包工具，如 Webpack。

需要注意的是，Tree shaking 的效果依赖于代码的结构和工具的配置。一些因素，如动态导入、依赖关系的复杂性或代码的副作用等，都可能影响 Tree shaking 的结果。因此，在使用 Tree shaking 技术时，开发者需要注意代码的编写方式，并进行适当的配置和优化，以确保只有真正需要的代码被保留在最终的打包文件中。

**Tree shaking为什么要基于ESModule？**

Tree shaking 基于 ES6 模块语法（ESModule）的主要原因是 ES6 模块在设计上具有静态特性，使得编译器可以在编译时对模块之间的依赖关系进行静态分析和优化。

ES6 模块语法在设计时采用了静态导入和导出的方式，这意味着模块的导入和导出关系在编译时就能够确定下来，而不是在运行时动态解析。这种静态特性使得编译器能够更好地理解模块之间的依赖关系，找出未被使用的代码并将其剔除，从而实现 Tree shaking 的效果。

相比之下，CommonJS 的 `require` 语法是动态的，它允许在运行时根据条件导入不同的模块，导致模块的依赖关系无法在编译时完全确定。因此，对于 CommonJS 的模块系统来说，静态分析和优化变得更加困难，使得 Tree shaking 的实现变得复杂或无法完全实现。

ES6 模块语法的静态特性为编译器提供了更多的优化机会，使得 Tree shaking 可以更加可靠和有效地剔除未使用的代码。因此，大多数现代的 JavaScript 构建工具和打包工具，如 Webpack 和 Rollup，都支持基于 ES6 模块的 Tree shaking，以提供更好的性能和文件大小优化。

**Tree shaking原理**
Tree shaking 的原理基于 JavaScript 代码的静态分析。在打包过程中，打包工具（如 Webpack）会遍历所有模块的导入和导出语句，并构建一个模块之间的依赖图。
1. 首先，打包工具会找到入口文件，然后逐步遍历所有的模块。在遍历过程中，它会识别哪些模块被直接或间接地引入，以及哪些模块被使用了。
2. 当打包工具发现一个未使用的模块时，它会将其标记为无效代码（dead code）。这意味着该模块不会被包含在最终的输出文件中。
3. 对于被引用的模块，打包工具会进一步分析其内部的导入和导出关系。如果发现某个导出的成员未被使用，那么该成员也会被标记为无效代码。
4. 在标记完所有无效代码后，打包工具会进行优化，将这些无效代码从最终的输出文件中删除。这样可以减小打包文件的体积，并提升应用程序的加载速度。

Tree shaking 的成功与否取决于代码的结构和工具的配置。一些因素，如动态导入、代码的副作用、条件语句等，都可能影响 Tree shaking 的结果。因此，开发者需要编写符合要求的代码，并进行适当的配置，以确保只有真正需要的代码被保留下来。


**Tree shaking必须要import吗？require行不行？**
Tree shaking 在 JavaScript 中通常与 ES6 的模块语法（import/export）结合使用，因为 ES6 模块语法是静态的，可以在编译时进行静态分析。

在大多数情况下，Tree shaking 只能用于处理 ES6 模块导入。它依赖于静态分析，能够确定模块之间的依赖关系和代码是否被使用。因此，使用 ES6 模块语法进行导入和导出是最常见的方式，以便 Tree shaking 能够有效地工作。

对于 CommonJS 的 `require` 语法，由于它的特性是动态的，无法在编译时进行静态分析，因此在大多数情况下无法进行 Tree shaking。`require` 语法通常在 Node.js 环境中使用，而 Node.js 目前还不支持直接进行 Tree shaking。

然而，一些工具和库，如 Webpack 和 Rollup，提供了对 CommonJS 的 `require` 语法的一定程度的静态分析和优化，以实现部分的 Tree shaking 效果。但这些工具的能力和结果可能会有所不同，并且通常需要特定的配置和插件支持。

总之，虽然在特定的情况下部分工具可能支持对 CommonJS 的 `require` 进行 Tree shaking，但在大多数情况下，使用 ES6 模块语法进行导入是更可靠和有效的方式来实现 Tree shaking。

---

**ARP广播属于网络分层中的哪一层？**

ARP（Address Resolution Protocol）广播属于网络分层模型中的第二层，即数据链路层（Data Link Layer）。数据链路层负责在物理网络中的节点之间传输数据帧，并提供了节点间的直接通信。ARP广播用于将IP地址解析为对应的物理（MAC）地址，以便在数据链路层上正确地交付数据包。当一个节点需要发送数据包到目标节点时，它会发送一个ARP广播请求以获取目标节点的MAC地址，然后将数据包封装成数据帧发送到目标节点的MAC地址。因此，ARP广播是在数据链路层上进行的。

---

**git创建分支，git branch -r和-a区别**

在 Git 中，创建分支的命令是 `git branch`。具体而言，`git branch <branch-name>` 可用于创建一个新的分支，分支名称为 `<branch-name>`。

而 `-r` 和 `-a` 是用于查看分支的选项，不是创建分支的命令。
- `git branch -r` 用于查看远程分支（Remote Branches），即远程仓库上存在的分支。这个命令会列出所有远程分支的列表。
- `git branch -a` 用于查看所有分支（包括本地分支和远程分支）。这个命令会列出本地分支和远程分支的列表。
所以，`git branch -r` 只显示远程分支，`git branch -a` 显示所有分支（包括本地和远程）。

**http为什么会有队头阻塞？**

HTTP/1.1 的队头阻塞（Head-of-Line Blocking）是由于该协议的特性导致的。下面简单解释一下队头阻塞的原因：

1. 单一连接：在 HTTP/1.1 中，每个客户端与服务器之间通常只建立一个连接。这意味着同一时间只能发送一个请求。当一个请求还未完成时，后续的请求需要等待前面的请求完成后才能发送，形成了队列。
2. 串行处理：HTTP/1.1 使用有序的请求/响应模型，即在同一连接上的请求和响应必须按照发送的顺序进行处理。如果前面的请求耗时较长，后续的请求必须等待前面的请求完成后才能获得响应。这样就造成了队头阻塞，即后续的请求被阻塞在队列的队头，无法并发处理。

队头阻塞对网页性能有负面影响，特别是在加载大量资源或请求的情况下，会导致页面加载时间延长。

为了解决队头阻塞问题，出现了一些技术和协议的改进，如：
1. HTTP/2：引入了多路复用的机制，通过单一的连接并发处理多个请求和响应，减少了队头阻塞的影响。
2. HTTP/3：基于 UDP 协议，进一步减少了队头阻塞，并提供更好的性能和安全性。

这些协议的改进都旨在提高并发性能和降低延迟，减少队头阻塞对网页性能的影响。

---

**ref和reactive区别**

**watch和watchEffect区别**

**webpack loader加载顺序**

在 Webpack 中，Loader 是用于处理源代码文件的转换器，它们按照一定的顺序被串行调用以对源代码进行转换和处理。当多个 Loader 配置在同一个模块规则（Rule）中时，它们的加载顺序是从右往左、从下往上的。

具体加载顺序如下：
1. 首先，Webpack 会根据配置文件中的模块规则（Rule）匹配对应的文件。
2. 对于匹配到的文件，Webpack 会按照规则的顺序依次调用对应的 Loader。
3. Loader 会对文件进行转换处理，将源代码转换为模块可识别的形式。
4. 转换完成后，Webpack 将处理后的模块交给下一个 Loader 进行处理，直到所有的 Loader 处理完毕。
5. 最后，Webpack 将最终的处理结果输出为打包后的文件。

需要注意的是，Loader 的加载顺序是从右往左、从下往上的，这意味着在配置文件中靠近右边和底部的 Loader 先执行，靠近左边和顶部的 Loader 后执行。这种加载顺序可以用于构建一系列转换操作，以便逐步对源代码进行处理和优化。