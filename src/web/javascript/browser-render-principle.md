---
title: 浏览器渲染原理
date: 2022-12-15
category:
  - javascript
---


浏览器渲染原理与很多优化的知识是密不可分的，故学习浏览器的渲染原理是很有必要的。


<!-- more -->

## 什么是渲染

渲染的单词就是render，在浏览器中，所谓渲染就是将一个HTML字符串把它变成屏幕上的像素信息这个过程称之为渲染。

通过一个代码片段简单来理解什么是渲染：
```js
function render(html){
  //第一行，每个点的像素信息
  return pixels;//返回像素信息
}
```



## 浏览器是如何渲染页面的？

当浏览器的网络线程收到 HTML 文档后，会产生一个渲染任务，并将其传递给渲染主线程的消息队列。

在事件循环机制的作用下，渲染主线程取出消息队列中的渲染任务，开启渲染流程。


整个渲染流程分为多个阶段，分别是： HTML 字符串 -> HTML 解析 -> 样式计算 -> 布局 -> 分层 -> 绘制 -> 分块 -> 光栅化 -> 画 -> 像素信息

每个阶段都有明确的输入输出，上一个阶段的输出会成为下一个阶段的输入。

这样，整个渲染流程就形成了一套组织严密的生产流水线。



## 1 解析HTML

渲染的第一步是**解析 HTML**。

拿到HTML后进行paseHTML，此时会生成两个树，一个树事DOM树（document object model），另一个树是CSSOM树（CSS Object Model）。



- `console.dir()`——展开一个对象如：`console.dir(document)`
- 浏览器有几个样式表：内嵌样式表、外联样式表、内联（行内）样式表、浏览器默认样式表。
- 查看页面样式：`console.log(document.styleSheets)`

:::note 为什么要生成DOM树？
为什么要生成DOM树，而不是直接使用字符串呢？事实上，直接操作字符串是比较复杂的，这样无论是取还是读都会方便，层次也很清晰。
:::



解析过程中遇到 CSS 解析 CSS，遇到 JS 执行 JS。为了提高解析效率，浏览器在开始解析前，会启动一个预解析的线程，率先下载 HTML 中的外部 CSS 文件和 外部的 JS 文件。

如果主线程解析到`link`位置，此时外部的 CSS 文件还没有下载解析好，主线程不会等待，继续解析后续的 HTML。这是因为下载和解析 CSS 的工作是在预解析线程中进行的。这就是 CSS 不会阻塞 HTML 解析的根本原因。

如果主线程解析到`script`位置，会停止解析 HTML，转而等待 JS 文件下载好，并将全局代码解析执行完成后，才能继续解析 HTML。这是因为 JS 代码的执行过程可能会修改当前的 DOM 树，所以 DOM 树的生成必须暂停。这就是 JS 会阻塞 HTML 解析的根本原因。

为什么会阻塞，是因为JS可能会改变当前的DOM结构。

第一步完成后，会得到 DOM 树和 CSSOM 树，浏览器的默认样式、内部样式、外部样式、行内样式均会包含在 CSSOM 树中。

:::note 思考
Q：为什么解析HTML要生成DOM树，解析CSS要生成CSSOM树，而解析JS就不生成树？
A：因为JS会全局解析一次，解析一次完成后会把对应的方法或事件放在对应的队列，而主线程只需要拿对应的队列来执行即可，也就是执行一次全局JS，就已经把任务分配好了。这样后续的步骤也用不到JS了
:::


## 2 样式计算

渲染的下一步是**样式计算**。

:::tip
CSS里面有两个很重要的知识：  
1. CSS属性值的计算过程，也就是发生在渲染的样式计算当中
   这里面包括层叠、权重、选择器优先级、样式继承，但这些都不是很准确的叫法，准确的叫法是比较重要性、比较特殊性、比较原次序。
2. 视觉格式化模型
   盒模型、块、流式布局、浮动布局、BFC
:::



:::note 思考
Q：什么是最终样式？
A：严格来说叫计算后的样式（Computed Style）,计算得到所有的样式都有一个最终值且不会再修改，比如因为权重那些修改。
:::

主线程会遍历得到的 DOM 树，依次为树中的每个节点==计算出它最终的样式==，称之为 Computed Style。

在这一过程中，很多预设值会变成绝对值，比如`red`会变成`rgb(255,0,0)`；相对单位会变成绝对单位，比如`em`会变成`px`

这一步完成后，会得到一棵带有样式的 DOM 树。

## 3 布局

接下来是**布局**，布局完成后会得到布局树（layout树）。

这个过程也是很复杂的，因为页面元素之间的位置和尺寸是相互影响的，一个元素的位置和尺寸变了，它可能会导致整个布局就产生变化。还有浏览器的窗口大小也是会影响布局的变化，等等等等。

布局阶段会依次遍历 DOM 树的每一个节点，计算每个节点的几何信息。例如节点的宽高、相对包含块的位置。

大部分时候，DOM 树和布局树并非一一对应。

比如`display:none`的节点没有几何信息，因此不会生成到布局树；又比如使用了伪元素选择器，虽然 DOM 树中不存在这些伪元素节点，但它们拥有几何信息，所以会生成到布局树中。还有匿名行盒、匿名块盒等等都会导致 DOM 树和布局树无法一一对应。

待学知识：==包含块、匿名行盒、匿名块盒==，行盒和块盒不能相邻，这是CSS决定的，HTML只提供语义化的标签。会有很多情况导致DOM树和布局树不会一一对应的，在布局树可能就会产生一些匿名行盒或者匿名块盒。



:::note 思考
Q：head元素为什么是隐藏的？
A：因为浏览器的默认样式表让他隐藏了的，这类是没有几何信息的，不会生成在布局树里。
:::


## 4 分层

下一步是**分层**

主线程会使用一套复杂的策略对整个布局树中进行分层。


:::note 思考
Q：为什么浏览器要对布局树进行分层？
A：分层的好处在于，将来某一个层改变后，仅会对该层进行后续处理，从而提升效率。
:::



滚动条、堆叠上下文、transform、opacity 等样式都会或多或少的影响分层结果，也可以通过`will-change`属性更大程度的影响分层结果。

:::note 思考
Q：什么情况下使用will-change进行分层？
A：will-change这个属性不要进行滥用，一定要是效率出了问题，渲染变得卡了，调来调去发现就是分层造成的，某个地方经常变动，不希望重绘过多，所以希望这一块单独行成一个层，这个时候再去使用这个will-change，切忌滥用，因为分层过多也不一定是一件好事。
:::

## 5 绘制

再下一步是**绘制**

主线程会为每个层单独产生绘制指令集，用于描述这一层的内容该如何画出来。


:::note思考
Q：什么是指令集？
A：不止一条指令，但是这些指令都为完成一件事的所有指令，就是指令集，比如分层，这一层根据几何信息该怎么画。
:::

:::note 思考
Q：什么是绘制的指令？
A：有点像canvas，相当于操控一个画笔移动到某个像素点，然后画一个长宽各多少的矩形，最后用什么颜色填充等等步骤，事实上，canvas也就是利用率浏览器内的绘制指令。
:::

## 6 分块

渲染主线程产生绘制指令后，会交给合成线程去专门进行分块，在此线程又会开启多个线程来进行分块，这样可以最大效率提高分块的过程（Compositor——合成线程，CompositorTileWorker——分块线程）。分块线程会根据不同的机器配置，根据实际的内存占用情况，它可能会不一样。

完成绘制后，主线程将每个图层的绘制信息提交给合成线程，剩余工作将由合成线程完成。

合成线程首先对每个图层进行分块，将其划分为更多的小区域。

它会从线程池中拿取多个线程来完成分块工作。

:::note 思考
Q：什么是分块？为什么要进行分块？
A：分块的操作是对每一层图层进行分块，将其划分为更多的小区域。如果不分层，页面可能很大，每一层的东西就很多，那在画的时候就会存在一个优先级的问题，就可以先画靠近浏览器窗口视图的区域，让用户可以优先看到页面，而离浏览器窗口视图的区域可以选择后画，而不必等页面全部渲染完成再显示出来
:::

## 7 光栅化

分块完成后，进入**光栅化**阶段。

合成线程会将块信息交给 GPU 进程，以极高的速度完成光栅化。

GPU 进程会开启多个线程来完成光栅化，并且优先处理靠近视口区域的块。

光栅化是将每个块变成位图，优先处理靠近视口的块，光栅化的结果，就是一块一块的位图。

:::note 思考
Q：什么是位图？
A：位图就是每个像素点的信息。
:::

## 8 画

最后一个阶段就是**画**了

合成线程拿到每个层、每个块的位图后，生成一个个「指引（quad）」信息。

指引会标识出每个位图应该画到屏幕的哪个位置，以及会考虑到旋转、缩放等变形。

变形发生在合成线程，与渲染主线程无关，这就是`transform`效率高的本质原因。

合成线程会把 quad 提交给 GPU 进程，由 GPU 进程产生系统调用，提交给 GPU 硬件，完成最终的屏幕成像。

渲染主线程、合成线程都会在渲染进程里面。渲染进程是放在沙盒里面的，沙盒会跟外界隔离开的，它跟操作系统的硬件是隔离的。这样的好处在于安全。原因是如果你中了一些恶意病毒，安装了一些恶意的插件，破坏里面的数据，但是由于进程是在沙盒里面的，它无法对整个计算机造成影响。所以现在的浏览器很安全，就算遭到攻击了，即在渲染进程里面遭到攻击了，它顶多在浏览器里边给你弹出窗口，它影响不了你的操作系统，也影响不了你的硬件，不会导致你计算机中病毒。由于是在沙盒里面隔离的硬件，所以他没有办法去找这个GPU，因为找GPU的这个过程，又叫系统调用，其实就是调用操作系统的接口，渲染进程是没有这个能力的。它在沙盒里面，它不能直接操作硬件，所以说它必须要中转一下把这个信息交给GPU。

:::note 思考
Q：什么是指引信息？
A：因为光栅化这一步骤已经形成了位图，它告诉你每一个块的像素信息，也是相对于屏幕的的位置在哪里，跟布局又不一样的，布局是相对于整个页面，这一块是相对于屏幕的位置在哪，该画哪个地方先画哪个位图再画哪个位图，依次把它画出来，它会根据分层结构要去计算一下。此过程速度是非常快的，然后会把生成的画的信息，交给GPU进程，GPU进程再交给真实的硬件显卡，最终显卡会把这些像素信息按照它的位置呈现出来
:::

:::note 思考
Q：为什么从分块开始，不把合成进程交给直接交给硬件去做，反而在GPU里中转一下？
A：这个GPU进程实际是浏览器的进程，它不是这个显卡的，最后由浏览器的进程交给显卡真实的硬件。
::: 

:::note 思考
Q：有些CSS属性用到了transform，为什么说transform效率高？
A：CSS的属性transform实际就是在这一步画就确定好了，无论你是旋转、放大、缩小、平移，这里需要一个数学运算，实质也是矩阵变换，在一步就会变化完成，然后把quad信息交给GPU就可以了。这样它的就不在主线程这里，这就是transform效率高的本质原因，所以说合成线程，会把quad交给GPU，进程GPU产生系统调用，提交给硬件，最终完成屏幕成像。
:::

## 什么是 reflow（重排）？

reflow 的本质就是重新计算 layout 树。

当进行了会影响布局树的操作后，需要重新计算布局树，会引发 layout。

为了避免连续的多次操作导致布局树反复计算，浏览器会合并这些操作，当 JS 代码全部完成后再进行统一计算。所以，改动属性造成的 reflow 是异步完成的。

也同样因为如此，当 JS 获取布局属性时，就可能造成无法获取到最新的布局信息。

浏览器在反复权衡下，最终决定获取属性立即 reflow。

## 什么是 repaint（重绘）？

repaint 的本质就是重新根据分层信息计算了绘制指令。

当改动了可见样式后，就需要重新计算，会引发 repaint。

由于元素的布局信息也属于可见样式，所以 reflow 一定会引起 repaint。

## 为什么 transform 的效率高？

因为 transform 既不会影响布局也不会影响绘制指令，它影响的只是渲染流程的最后一个「draw」阶段

由于 draw 阶段在合成线程中，所以 transform 的变化几乎不会影响渲染主线程。反之，渲染主线程无论如何忙碌，也不会影响 transform 的变化。

以一个举例：

:::normal-demo 示例代码

```css
.ball{
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background-color: pink;
  margin-top: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}
.ball1{
  animation: ball1Animation 2s linear infinite;
}
.ball2{
  position: absolute;
  left: 10px;
  animation: ball2Animation 2s linear infinite;
}
@keyframes ball1Animation {
  0%{
    transform: translateX(0);
  }
  50%{
    transform: translateX(500px);
  }
  100%{
    transform: translateX(0);
  }
}
@keyframes ball2Animation{
  0%{
    left: 0;
  }
  50%{
    left: 500px;
  }
  100%{
    left: 0;
  }
}
```

```html
<button id="btn">死循环</button>
<div class="ball ball1">ball1-transform</div>
<div class="ball ball2">ball2-left</div>
```

```js
function delay(duration){
  var start = Date.now()
  while(Date.now() - start < duration){}
}
btn.onclick=function(){
  delay(5000)
}
```

:::

效果：当点击按钮后，第一个小球动画不受影响，但是第二个小球会卡住，因为主线程此时在运行卡死5秒的方法。因此left变化了会引起reflow，这些过程需要在主线程上进行，而此时主线程卡死5秒，所以会暂停重绘，等到5秒过后，才会重新渲染。margin也会导致reflow

另外浏览器页面滚动只会触发paint 画，所以当主线卡死5秒，浏览器页面也是能够正常滚动的，见下：
:::normal-demo 示例代码
```html
    <button id="btn">死循环</button>
    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab reprehenderit, veritatis eligendi accusantium autem velit odit repudiandae illo? Tempore cum laborum maxime minima nemo, dicta quis. Eius, explicabo! Facilis, corporis.</p>
    <p>Enim, cumque rem! Omnis natus necessitatibus architecto nesciunt consectetur voluptas a itaque, explicabo esse fugit unde quaerat quos dignissimos libero doloribus repellat voluptatibus, ex rerum facere blanditiis eius! Provident, eveniet!</p>
    <p>Ea, officia. Voluptas fugiat magnam a officia quia libero ex non similique deleniti assumenda corporis tempora cupiditate repellat ea, inventore quo fuga maxime ipsum! Sint facere ea dolores illo dicta?</p>
    <p>Non fugiat assumenda natus ipsum velit quas voluptas aut a unde minima, blanditiis laudantium maiores pariatur totam nihil magni eaque excepturi quia eum dolorem laborum consectetur dicta modi expedita. Commodi!</p>
    <p>Sapiente ab consequuntur odit corrupti ratione optio. Cupiditate fuga cum, corporis quam deserunt magnam non tenetur voluptates voluptatum doloremque dolorem quibusdam quo, asperiores reiciendis corrupti qui labore tempora accusantium vel?</p>
    <p>Velit natus voluptatibus reprehenderit laboriosam qui quam facere. Assumenda maiores nostrum magnam molestiae ipsam perferendis, laboriosam incidunt officia similique! Velit quaerat quas vero temporibus fuga, ullam aspernatur ipsum? Ab, dolorem.</p>
    <p>Nobis, molestias? Esse inventore doloribus nesciunt sunt pariatur cumque doloremque numquam tempore quaerat? Similique, dolores modi, rem dolorum ipsa doloremque suscipit repellat excepturi autem dicta ratione cupiditate! Minima, nisi nesciunt!</p>
    <p>Dolores, eaque sint. Labore eaque inventore veniam explicabo neque unde magnam itaque. Ipsa porro vel illum odio, consectetur, sit similique, sunt non ipsum itaque quas ex voluptate sint eligendi culpa?</p>
    <p>Unde assumenda error perspiciatis doloremque harum corporis laboriosam, nemo facilis alias numquam amet maxime quia! In recusandae fugiat neque laudantium, ex rerum id qui cumque, nisi quasi esse! Soluta, doloremque?</p>
    <p>Laudantium accusamus magni ab fuga? Ut ipsam aliquam ullam maiores eius odit debitis incidunt nemo possimus molestias, voluptate delectus expedita. Vero consequatur molestiae temporibus voluptate beatae at dolores autem atque?</p>
    <p>Odio, iste. Labore rem quam laboriosam repellendus consequuntur ullam doloribus sapiente voluptatum perspiciatis quia nisi, hic voluptatem fugiat, dolores voluptate vero molestiae culpa consectetur magni ipsum unde. Similique, eaque et?</p>
    <p>Nostrum perferendis quae hic omnis ratione perspiciatis quibusdam quod ullam optio delectus ipsa, quas a non id quos harum, incidunt vero atque. Explicabo nostrum culpa labore pariatur quia ea consequuntur.</p>
    <p>Nemo recusandae temporibus earum modi fugit doloribus quibusdam corporis maxime optio hic! Alias ea pariatur rerum, nisi minus voluptatum eveniet nobis eos odit eligendi voluptatem temporibus! Ratione vitae reprehenderit sint.</p>
    <p>Molestiae praesentium hic itaque nam, accusantium cupiditate minus? Natus explicabo magni placeat, itaque dolores perspiciatis sequi sit optio ex fugiat tempora doloremque ducimus magnam error voluptatibus corporis repellat vero. Sunt!</p>
    <p>Quisquam, voluptatibus exercitationem minima officia soluta illo non. Delectus explicabo quae error porro ab maxime mollitia laudantium praesentium eum tenetur et incidunt id, numquam assumenda dolorem sint. Voluptates, rerum nesciunt.</p>
    <p>Architecto iure id, illum incidunt quibusdam dolor commodi, cumque assumenda laudantium quo in molestias deserunt, accusantium enim similique qui suscipit atque temporibus? Quam, repellendus cumque itaque reprehenderit delectus aliquid atque.</p>
    <p>Hic consectetur veniam quidem incidunt aliquam iusto, molestiae natus officiis possimus modi inventore nam, non accusantium illo corporis dolorum error itaque ipsum omnis. Et suscipit similique repellendus fuga dolore assumenda?</p>
    <p>Ullam sint mollitia, assumenda, ducimus enim ab odit neque culpa officia doloremque, ex nesciunt officiis sequi ea delectus deleniti. Sapiente minima beatae ab amet perferendis voluptatibus quia ex similique eveniet?</p>
    <p>Facilis voluptas aliquid voluptates quis, quos architecto voluptatibus libero modi veritatis ut sunt omnis ea? Mollitia fugiat, quas maxime ipsum fuga excepturi ut eaque, aut repellendus id exercitationem, minus magnam.</p>
    <p>Sed voluptas minus enim cumque, blanditiis vitae inventore! Architecto labore quibusdam eveniet quidem voluptas reprehenderit aspernatur ad maxime similique vel error dolor numquam nihil, accusamus officia quaerat dolorum incidunt quos!</p>
    <p>Magnam tempora, sint assumenda ut adipisci dolorum reprehenderit iure cum impedit? Aspernatur tenetur magni eaque, sapiente ipsam quas architecto officiis maiores non, exercitationem quidem atque, nostrum perferendis fuga dolores delectus.</p>
    <p>Illo incidunt consequuntur nesciunt similique itaque quam excepturi facilis molestiae blanditiis voluptatem dolore nemo id, laboriosam officia soluta libero qui earum dolorem voluptates error! Consequatur eveniet accusamus iste molestias iure.</p>
    <p>Vero ut quae a. Cum iusto exercitationem quia, facilis dolores iure repudiandae quidem maiores aspernatur corporis facere impedit perspiciatis maxime officia consectetur dicta porro voluptas blanditiis repellat iste eaque beatae.</p>
    <p>Natus tempora cumque neque quod, alias nisi harum accusantium, ipsa, deleniti voluptate deserunt aperiam numquam maiores quae magnam inventore expedita! Quidem quasi pariatur recusandae magnam vitae inventore possimus dolore quae.</p>
    <p>Minima reiciendis aperiam odit, ex quae doloremque error. Ab, dignissimos facilis rerum dolore cupiditate explicabo exercitationem perspiciatis quia voluptas at, eius, quisquam veniam natus fuga dicta dolorem voluptatem ut ducimus.</p>
    <p>Deleniti delectus et aut cum nam deserunt magni omnis exercitationem repellendus unde facilis sit, aliquam cumque, explicabo error vero dolores aperiam corrupti possimus consequuntur alias. Sapiente enim veniam dolores ipsa.</p>
    <p>Fuga quae maiores odio perspiciatis iure, quos recusandae laudantium, voluptatum nihil quibusdam commodi velit quisquam! Sunt earum saepe atque vero at placeat consectetur porro, iusto dolorem blanditiis odio ut quasi!</p>
    <p>Debitis delectus architecto molestiae recusandae dolor. Molestiae qui quae ea, nesciunt sunt iure! Tempora dolore dolorum, quasi quidem pariatur itaque debitis quia cupiditate fuga molestias! Accusamus ex minima veniam sint.</p>
    <p>Blanditiis doloremque nisi maiores modi recusandae harum corporis illum optio impedit quidem ipsa nobis nostrum at veniam quasi, labore, praesentium ex reiciendis velit. Architecto eum ad exercitationem officiis cum fuga!</p>
    <p>A quasi dignissimos aperiam eaque iste voluptatum quibusdam voluptas, quos ea voluptatibus neque, quas sed tempora adipisci veniam. At aut neque, reiciendis corrupti ratione dolor quam delectus adipisci eos illum!</p>
    <p>Recusandae neque expedita officiis impedit suscipit ullam ipsum non laboriosam numquam, reiciendis ea dolorum, veritatis eum? Sit aspernatur obcaecati fugiat at odit in nulla aperiam, ducimus laborum provident quia odio!</p>
    <p>Similique suscipit eius corrupti exercitationem minus sed aliquid excepturi unde molestias? Quidem debitis non recusandae consequuntur cum quibusdam quisquam voluptatum quis provident, esse, voluptatem error natus sequi vitae iure vero!</p>
    <p>Impedit reprehenderit soluta aperiam quae veritatis at iusto nisi repellendus, laudantium quibusdam id excepturi? Repellat veniam odio earum, illum soluta eaque? Pariatur, recusandae vel? Reprehenderit consequuntur dicta temporibus harum recusandae.</p>
    <p>Id nostrum ea accusantium nesciunt doloremque dolor aliquam magni, odio veniam ad deserunt et nobis, itaque molestiae unde neque corporis praesentium? Facilis veritatis explicabo harum velit excepturi quisquam sunt molestiae.</p>
    <p>Reprehenderit nesciunt minus ipsum quidem corporis, excepturi magni tempora accusamus itaque eveniet alias, harum ut, aspernatur modi autem id? Illum eius libero beatae dolore numquam, deserunt harum debitis reprehenderit nulla.</p>
    <p>Fugiat incidunt eius modi vel doloremque voluptatem aliquid quaerat officia aperiam ab aliquam excepturi nostrum assumenda dolore placeat atque eos obcaecati exercitationem dolorum repudiandae, est tempore autem unde. Praesentium, impedit.</p>
    <p>Quas, quia doloribus explicabo sapiente veritatis adipisci quidem esse nostrum? Animi voluptatibus unde repellat magni deleniti! Amet nesciunt modi non quasi, ipsam autem! Minus iure cupiditate velit, non quos perspiciatis?</p>
    <p>Labore dolor expedita exercitationem esse excepturi totam quos necessitatibus voluptas explicabo, possimus voluptates maiores neque facilis accusamus fugit reprehenderit rem facere earum inventore. Modi repellendus quo sapiente, porro distinctio incidunt.</p>
    <p>Quod ex quos, commodi cum mollitia nisi! Quod nisi ex, excepturi quae repellendus veniam neque laborum aliquid natus quo laudantium voluptatum unde quis nostrum pariatur id, inventore iure. Provident, temporibus.</p>
    <p>Excepturi id dolore architecto numquam quod consectetur delectus placeat perspiciatis quia enim harum, quibusdam fugiat aut minus nesciunt adipisci assumenda natus eveniet temporibus totam unde. Nisi at a facere quia!</p>
    <p>Quas quam explicabo maxime expedita consequatur suscipit quae consectetur, aliquam unde eum repellat animi nostrum molestiae eveniet ipsum nesciunt doloribus incidunt illum quaerat cupiditate tempora atque? Eos earum veniam numquam?</p>
    <p>Sint sunt, ratione sequi ad unde vero incidunt inventore nobis quod repellendus! Totam consequatur officia facere! Laborum, culpa numquam neque dolorum aperiam illo, nihil ab quos sapiente blanditiis, aliquam adipisci.</p>
    <p>Mollitia atque distinctio eligendi facere, maxime quaerat enim sunt minus totam dolorum asperiores iure temporibus in laudantium? Ut, maxime? Incidunt optio in odit a cumque commodi deleniti temporibus quod recusandae!</p>
    <p>Autem ut vel dignissimos laborum fugiat obcaecati provident nulla, possimus tempore saepe eum asperiores rerum, quibusdam minus! Id soluta enim, consectetur eum at cumque quae expedita aspernatur aut alias quia?</p>
    <p>Autem, quod facilis reprehenderit ducimus temporibus nobis. Magnam tempore dolor, voluptatem minima recusandae voluptatibus ipsam repudiandae dolorum, repellat molestiae quisquam porro eligendi unde? Mollitia, provident nesciunt dolores tempore ad ipsum.</p>
    <p>Corrupti eum harum repudiandae ipsa architecto rerum dolorum pariatur illo magnam. Error similique eum quia, saepe deleniti aspernatur! Ducimus asperiores maxime maiores et quis atque quaerat, dolorum eveniet error earum.</p>
    <p>Iste molestiae cum consectetur aut rerum, excepturi distinctio. Officiis tempore, autem inventore non vitae beatae et quos vel sunt assumenda facere expedita ut perferendis adipisci nesciunt nihil corporis dolorum neque.</p>
    <p>Expedita nihil numquam beatae consequuntur mollitia maiores ipsam nisi deleniti iste sit? Amet porro enim dolor dicta placeat repellendus obcaecati sed voluptas mollitia culpa similique quia, aspernatur excepturi consequatur ea!</p>
    <p>Tempora ipsum excepturi alias quisquam aperiam voluptates ea laboriosam quia illum vitae, numquam dicta illo cum eum quod totam. Magnam labore necessitatibus nobis dignissimos expedita. Dolorem, tempora at. Eos, recusandae?</p>
    <p>Reiciendis ab sit accusamus officia repudiandae inventore dolor autem architecto odio voluptatum. Ipsam delectus quas, mollitia, odio quaerat velit et iusto nam aut cum, vel ipsum itaque accusantium? Sequi, hic.</p>
    <p>Fugiat maiores, cum, sunt harum perferendis quam dolorem repellat repudiandae nemo magnam, officia inventore commodi modi suscipit consequuntur voluptatibus perspiciatis itaque minus aliquam molestiae praesentium. Beatae laboriosam numquam aspernatur perferendis?</p>
    <p>Repudiandae, voluptate tenetur! Modi ipsam officia magnam rerum exercitationem alias quae itaque at fuga consequatur reiciendis quia, repellat sapiente molestiae nemo illo! Error aspernatur quaerat voluptate repellendus neque, provident alias.</p>
    <p>Saepe neque, quae magnam est eaque illo sapiente dolorum nam dolores voluptatem repellendus odio praesentium vero fugit tempora rem. Reiciendis ea impedit laboriosam quis, dolorem ad? Quidem magnam dolore dolor?</p>
    <p>Quibusdam nam quidem alias aut quasi fugiat, dolorum voluptatem, deserunt perferendis vitae iure assumenda ab? Quidem aspernatur architecto iste possimus exercitationem nostrum id voluptates quae molestias quasi! Nihil, voluptatem corporis?</p>
    <p>Labore odio dolor nostrum totam accusamus! Ratione, ab numquam asperiores eum impedit placeat! Dolorum delectus nam consequuntur aliquam optio ratione rem temporibus veritatis, ad aperiam? Error molestias dolor debitis minus?</p>
    <p>Ipsam totam nulla dolore! Quaerat, distinctio. Possimus quidem eveniet debitis fuga laborum pariatur voluptatibus nesciunt corporis blanditiis, quo rem at maxime maiores facilis quam minima quia hic suscipit. Incidunt, laboriosam.</p>
    <p>Aut voluptates debitis ipsa amet molestiae adipisci omnis illum repellat dignissimos hic, obcaecati, non libero aliquid dicta sequi odio illo nesciunt tenetur. Itaque unde corporis, eveniet nostrum voluptas inventore labore!</p>
    <p>Iste officiis culpa corrupti pariatur, quidem fuga enim facilis voluptatem dignissimos eaque ipsa aliquid odit nemo, at eum quasi animi repellendus in nisi nesciunt non accusamus magnam obcaecati. Expedita, ipsam.</p>
    <p>Consectetur impedit ratione, ipsum in accusamus dolor voluptas dignissimos. Nulla voluptatum, minus nobis magnam et ratione excepturi, perferendis deserunt nihil ab temporibus consectetur inventore molestiae est praesentium totam natus debitis.</p>
    <p>Impedit qui et praesentium, quaerat earum neque cumque autem eum enim nam commodi fugit, sapiente temporibus sed mollitia repudiandae quia? Quo aut consequatur perferendis nostrum aliquid iure natus, maxime recusandae.</p>
    <p>Inventore quae enim iste assumenda necessitatibus perspiciatis dolore facere. In aperiam, dolorem soluta asperiores sunt quibusdam animi consectetur adipisci sit rem illum cum, beatae corporis, voluptatum magni laborum exercitationem. Nisi?</p>
    <p>Inventore ex veritatis hic magnam rem incidunt libero qui dolore ad aut ullam commodi, ducimus doloribus, at ratione ipsa iste harum nulla iure doloremque sapiente delectus tenetur. Quibusdam, eveniet! Nam!</p>
    <p>Dolor distinctio quis sapiente eum veritatis, omnis harum libero explicabo voluptatem ut quidem commodi in doloremque corporis expedita reiciendis, qui quas hic quam, ipsum vel. Laudantium, quisquam? Laborum, quia quam.</p>
    <p>Enim, iste consequuntur nulla mollitia inventore beatae aliquam reiciendis, eius earum minima dolor, assumenda dolore autem nisi repudiandae commodi harum temporibus culpa. Molestiae in nobis velit alias sapiente ipsa recusandae!</p>
    <p>Atque a itaque id, laborum suscipit cum, quas quae corporis, optio aut accusantium deleniti. Aut facere itaque magni voluptates debitis sed. Iure, maiores aspernatur explicabo quasi harum impedit libero quae.</p>
    <p>Vitae ducimus maxime velit veniam necessitatibus quam, unde quis deleniti. Fugiat iste nobis aliquam! Neque dolor fuga fugit? Ad commodi quidem possimus ex hic veritatis autem inventore explicabo libero officia?</p>
    <p>Assumenda nulla corporis dolorum cumque inventore, ipsa dolore deleniti ipsam id quasi, tempore consequatur aliquam dolorem! Laudantium quas omnis modi iure. Alias id magni a perspiciatis recusandae odio quia? Ullam?</p>
    <p>Iusto ea perferendis, mollitia tempore excepturi eligendi, at quo fugit eos, ipsa illum molestias quaerat. Nihil repellat, similique voluptates, laborum nisi quisquam expedita id exercitationem, eligendi corporis soluta natus nulla!</p>
    <p>Nesciunt animi laudantium autem sapiente fuga aspernatur, voluptates repellendus voluptatum ipsam dolorum odit incidunt cupiditate labore enim ad quis. Cum distinctio optio porro esse rerum voluptatibus ullam impedit totam molestiae!</p>
    <p>Voluptate porro earum laboriosam laborum voluptates, nemo fugiat molestiae deserunt ad dignissimos at blanditiis eveniet quam libero exercitationem cupiditate recusandae odio dolor consequatur sequi neque veritatis minus nam! Dolores, veritatis.</p>
    <p>Magni tenetur, id, possimus nisi nam vel sed eveniet non voluptatibus laborum esse. Porro itaque a esse blanditiis incidunt ex, assumenda error! Quo doloremque magnam molestias voluptate dolores culpa quod?</p>
    <p>Ab odit rem animi est incidunt quasi numquam iste repudiandae natus ipsam! Dolor molestiae quia facere doloribus, perferendis delectus consectetur sint laborum, quidem blanditiis temporibus pariatur earum. Ex, qui molestias!</p>
    <p>Aliquid fugiat inventore iure, nihil fuga a odit facilis. Quis deleniti excepturi corporis aliquam velit autem, eveniet aut sunt praesentium nulla sequi. Delectus vitae itaque perferendis eum dolorem exercitationem ratione.</p>
    <p>Nam autem totam cum, voluptate commodi accusantium ullam nesciunt natus ducimus, iusto magnam omnis error, tenetur et vel quo ipsum voluptatibus dicta debitis ipsa quia pariatur. Saepe debitis sapiente excepturi!</p>
    <p>Culpa ut itaque nesciunt vero in magnam tempora hic reprehenderit, voluptatem autem reiciendis provident minus magni nisi commodi et quis at, iure pariatur? Eius omnis nobis autem eligendi et. Temporibus.</p>
    <p>Doloremque debitis dolore odit inventore labore qui sint nesciunt cumque, temporibus necessitatibus impedit amet totam, rem ab illo, quae soluta perspiciatis libero ipsam. Debitis ullam eos iste aliquid illo architecto?</p>
    <p>Quaerat eveniet temporibus pariatur qui corporis? Quidem aut eaque vitae, quo laudantium velit laborum nulla libero, nam molestiae commodi dolores deserunt illum blanditiis enim debitis pariatur quae est molestias architecto.</p>
    <p>Voluptas exercitationem recusandae eaque nam facilis consectetur assumenda cupiditate repellendus, laboriosam dolorem saepe voluptate aliquid quaerat quasi fugiat quisquam sunt? Quas hic blanditiis beatae ipsam ea commodi, earum cum placeat?</p>
    <p>Tempore neque cupiditate exercitationem nulla, ad ipsa magni eum. Hic nihil, sunt quae expedita temporibus id numquam esse corrupti ipsa eum qui voluptatibus sapiente maxime iure aliquid saepe? Provident, illum.</p>
    <p>Aut, ex sit obcaecati ut itaque mollitia, dolor quae culpa temporibus deleniti necessitatibus at pariatur similique facere blanditiis neque totam autem dolorum asperiores. Commodi sapiente quaerat dicta, eveniet nostrum voluptate.</p>
    <p>Eos ut dignissimos maxime harum non aspernatur a, rerum delectus officia, cumque sit asperiores obcaecati totam minus exercitationem facilis voluptates distinctio quod aliquid quia et, impedit in perferendis. Eveniet, consequuntur?</p>
    <p>Officia, sunt exercitationem. Dolorem cumque architecto eligendi quas voluptatum deleniti voluptatibus modi provident vitae sint consequuntur natus fugit, optio, sapiente asperiores doloremque odio, quam magnam molestiae vero reprehenderit deserunt ex!</p>
    <p>Sed reiciendis ipsam quae, perferendis ipsum repellendus nihil recusandae laboriosam, ab voluptatem facilis voluptate magnam eaque vero, necessitatibus tenetur nulla. Ipsa molestiae cumque, delectus similique tenetur velit consequuntur distinctio ipsam.</p>
    <p>Dolores, odit sit? Eius, voluptatum. Dolorem minima, sit aliquam iusto quaerat qui nam neque, exercitationem sunt quam eligendi animi? Error minima est voluptatem, doloribus ducimus quidem aliquid ad repellat neque!</p>
    <p>Ex, quam illo iure deleniti ut delectus ad adipisci fuga. Pariatur velit eum accusantium, cupiditate itaque animi in dolorem blanditiis aut natus nobis, sit repellendus consectetur exercitationem esse impedit harum.</p>
    <p>Distinctio reprehenderit ipsa accusamus illum, nisi incidunt sint, suscipit ex consequatur, vero magnam rerum temporibus! Quis, aperiam doloribus suscipit ipsam quaerat incidunt quam ad, alias a quas dolore mollitia quae?</p>
    <p>Nemo ratione repellendus recusandae dolorem consectetur repellat qui assumenda ipsum hic reprehenderit non doloremque incidunt ex, velit, repudiandae vero necessitatibus. Officia, deleniti nostrum eum soluta deserunt vitae eligendi hic unde.</p>
    <p>Excepturi sed nihil nemo, rerum temporibus dolor architecto dolore voluptatem nam quos blanditiis culpa? Esse a facilis quidem ut odio voluptates quam, culpa itaque! Debitis quos tenetur cum sed animi.</p>
    <p>Ipsa recusandae illum vel eaque consequatur ipsam et reiciendis eveniet numquam totam officia quae voluptatum rerum consectetur accusamus eum in harum, itaque possimus corporis iure magni animi provident. Impedit, aut?</p>
    <p>Neque, enim ut doloribus accusamus laboriosam iste possimus ullam! Consequatur nemo veritatis sapiente. Eius, possimus expedita delectus cum, repellendus rem commodi libero provident, optio sed nesciunt architecto neque inventore dolore.</p>
    <p>Sunt quas dolores velit accusamus assumenda molestias, ipsam repellat incidunt saepe. Dolorum error accusantium quod excepturi. Esse maiores excepturi placeat, error suscipit rem modi maxime tempora ad quam! Incidunt, modi.</p>
    <p>Consequuntur tenetur dignissimos earum! Rem impedit asperiores magni expedita voluptate dolores optio deserunt adipisci minus voluptas quia omnis, deleniti nobis eaque velit suscipit possimus nihil saepe dignissimos nesciunt! Ad, fugiat!</p>
    <p>Deleniti debitis nihil id esse quaerat veritatis sunt voluptate magni vel eligendi ipsum aspernatur dolores odit, cum atque temporibus laudantium qui, inventore doloremque, laboriosam natus. Labore, deleniti doloremque. Maxime, error.</p>
    <p>Suscipit repudiandae non adipisci recusandae reiciendis consectetur alias quaerat quam tenetur iure architecto provident dolorum aut quae beatae asperiores harum doloremque accusantium, quidem quibusdam eveniet repellendus? Temporibus distinctio doloremque vero!</p>
    <p>Modi cum distinctio consequuntur, similique libero iusto corporis dignissimos unde voluptatibus nihil impedit repudiandae blanditiis ea illo. Tempora repudiandae eos natus, illo nobis quia alias neque repellendus totam nostrum quaerat.</p>
    <p>Adipisci, error cumque temporibus est optio, dolorem earum, illo vitae repudiandae sapiente velit expedita. Vitae, doloribus nulla? Corporis fugiat, eveniet quasi facilis, quas necessitatibus obcaecati similique rem sapiente, exercitationem iste!</p>
    <p>Ipsum praesentium voluptatum molestias reprehenderit quia, voluptates fugit tenetur magni harum deleniti omnis. Laudantium molestiae maxime alias dicta, minima recusandae nam debitis quis ipsa doloribus quae! Repellat libero magnam maiores!</p>
    <p>Earum, atque! Natus nihil magni voluptatibus illo blanditiis id beatae adipisci, explicabo dolore repudiandae possimus accusamus pariatur debitis. Suscipit commodi laboriosam iste sed. Maiores quasi illo voluptatum ab enim fuga?</p>
    <p>Nesciunt, esse quas placeat voluptates quibusdam quo facere unde omnis reprehenderit similique laudantium, maxime numquam, at natus dolorem hic quod rerum ipsa tempora vitae aut aliquid ea. Nemo, fugit quos.</p>
    <p>Alias laborum quisquam accusamus illo nobis quod est iste. Tenetur adipisci dolorem sint, fugit repellat, minus saepe sunt error dolores totam, aspernatur nam porro consectetur qui maxime libero ipsam. Debitis!</p>
```


```js
    function delay(duration) {
      var start = Date.now();
      while (Date.now() - start < duration) {}
    }
    btn.onclick = function () {
      delay(5000);
    };
```
:::