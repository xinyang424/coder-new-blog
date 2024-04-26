---
title: CSS3
date: 2024-04-25
category:
  - CSS
tag:
  - CSS3
---


###  什么是 CSS3

CSS3 是最新的 CSS 标准，它引入了许多特性。



### 为什么要引入 CSS3



### CSS3 与 CSS 的区别在哪里



### CSS3 新增了哪些特性

#### CSS3 文字效果

- hanging-punctuation：规定标点字符是否位于线框之外。
- punctuation-trim：规定是否对标字符进行修剪。
- text-align-last：设置如何对齐最后一行或紧凑着强制换行符之前的行。

- text-emphasis：向元素的文本应用重点标记以及重点标记前景色。

- text-justify：规定当 text-align 设置为 “justify” 时所使用的对齐方法。

- text-outline：规定文本的轮廓

- text-overflow：规定当文本移出包含元素时发生的事情。

- text-shadow：向文本添加阴影。

- text-wrap：规定文本的换行规则。

- word-break：规定非中日韩的换行规则。

- word-wrap：允许对长的不可分割的单词进行分割并换行到下一行。

#### CSS3 边框

- border-radius：CSS3圆角边框。

- box-shadow：用于向方框添加阴影。

- border-image：CSS3 边框图片，可以使用图片来创建边框。

#### CSS3 背景

- background-size：属性规定背景图片的尺寸。
- background-origin：属性规定背景图片的定位区域。
- background-clip：规定背景的绘制区域。

#### CSS3 过渡

当元素从一种样式变化为另一种样式时为元素添加效果。

- transition：简写属性，用于在一个属性中设置四个过渡属性。
- transition-property：规定应用过渡的 CSS 属性的名称。
- transition-duration：定义过渡效果花费的时间。默认是 0。
- transition-timing-function：规定过渡效果的时间曲线。默认是 “ease”。
- transition-delay：规定过渡效果何时开始。默认是 0

#### CSS3 动画

通过 CSS3，我们能够创建动画，这可以在许多网页中取代动画图片、Flash动画以及JavaScript。

- @keyframes：规定动画。

- animation：所有动画属性的简写属性，除了 animation-play-state 属性。

- animation-name：规定 @keyframes 动画的名称。

- animation-duration：规定动画完成一个周期所花费的秒或毫秒。默认是 0。

- animation-timing-function：规定动画的速度曲线。默认是 “ease”。

- animation-delay：规定动画何时开始。默认是 0。

- animation-direction：规定动画是否在下一周期逆向地播放。默认是 “normal”。

- animation-play-state：规定动画是否正在运行或暂停、默认是 “running”。

- animation-fill-mode：规定对象动画时间之外的状态。

#### CSS多列

- column-count：指定元素应该被分割的列数。
- column-fill：指定如何填充列。
- column-gap：指定列与列之间的间隙。
- column-rule：所有 column-rule-*属性的简写
- column-rule-color：指定两列间边框的颜色
- column-rule-style：指定两列间边框的样式
- column-rule-width：指定两列间边框的厚度
- column-span：指定元素要跨越多少列
- column-width：指定列的宽度
- columns：设置 column-width 和 column-count 的简写。

#### CSS3 布局

- Flexbox布局：弹性盒子布局，使得网页布局更加灵活方便。
- Grid布局：网格布局模式，用户创建复杂的网格结构，提供更高级的网页布局控制。

#### CSS3 用户界面

- resize：属性规定是否可由用户调整元素尺寸。
- box-sizing：属性允许您以确切的方式定义适应某个区域的具体内容。
- outline-offset：属性对轮廓进行偏移，并在超出边框边缘的位置绘制轮廓。
- appearance：允许您使一个元素的外观像一个标准的用户界面元素。
- icon：为创作者提供了将元素设置为图标等价物的能力。
- nav-down：指定在何处使用箭头向下导航键时进行导航。
- nav-index：指定一个元素的 tab 顺序。
- nav-left：指定在何处使用左侧的箭头导航键进行导航。
- nav-right：指定在何处使用右侧的箭头导航键进行导航。
- nav-up：指定在何处使用箭头向上导航键进行导航

#### CSS3 媒体查询

@media：根据设备属性和屏幕大小应用不同的样式，实现响应式设计。

#### CSS3 变形
transforms：通过旋转、缩放、倾斜、平移等变换操作改变元素的外观。

#### CSS3 过滤器

fliters：应用图像效果，例如模糊、灰度、色彩反转等。

#### CSS3 伪元素伪类的扩展

新增一些伪类和伪元素，如::before、::after 等。

#### CSS3 自定义字体

使用 @font-face 可以让开发者引入自定义字体文件，以便在网页中使用

#### CSS3 颜色

新增 RGBA 和 HSLA 颜色值，引入透明度和色彩饱和度的标识方式，使颜色控制更加灵活。

