---
title: Canvas
date: 2022-02-15
category:
  - javascript
---


<!-- more -->

:::tip 提示
学习canvas可以打开Axure画图软件，以便更容易理解canvas的坐标系统。不用计算，坐标一目了然。
:::

## 基本的画布功能

创建`<canvas>`元素时至少要设置其width和height属性，这样才能告诉浏览器在多大面积绘图。出现在开始和结束标签之间的内容是后备数据，会在浏览器不支持`<canvas>`元素时显示。比如：
```html
<canvas id="drawing" width="200" height="200">A drawing of something.</canvas> 
```

要在画布上绘制图形，首先要取得绘图上下文。使用 getContext()方法可以获取对绘图上下文的引用。对于平面图形，需要给这个方法传入参数"2d"，表示要获取 2D 上下文对象：

```js
let drawing = document.getElementById("drawing");

// 确保浏览器支持<canvas>
if (drawing.getContext) {
 let context = drawing.getContext("2d");
 // 其他代码
}
```

## toDataURL()
以使用 toDataURL()方法导出`<canvas>`元素上的图像。
这个方法接收一个参数：要生成图像的 MIME 类型（与用来创建图形的上下文无关）。
```js
let drawing = document.getElementById("drawing");

// 确保浏览器支持<canvas>
if (drawing.getContext) {

 // 取得图像的数据 URI
 let imgURI = drawing.toDataURL("image/png");

 // 显示图片
 let image = document.createElement("img");
 image.src = imgURI;
 document.body.appendChild(image);
} 
```

## 2D 绘图上下文
2D 绘图上下文提供了绘制 2D 图形的方法，包括矩形、弧形和路径。2D 上下文的坐标原点(0, 0)在`<canvas>`元素的左上角。所有坐标值都相对于该点计算，因此 x 坐标向右增长，y 坐标向下增长。默认情况下，width 和 height 表示两个方向上像素的最大值。

## 填充和描边
填充以指定样式（颜色、渐变或图像）自动填充形状，而描边只为图形边界着色。大多数 2D 上下文操作有填充和描边的变体，显示效果取决于两个属性：
`fillStyle` 和 `strokeStyle`。

- 两个属性可以是字符串、渐变对象或图案对象，默认值都为"#000000"。
- 可以是 CSS 支持的任意格式：名称、十六进制代码、rgb、rgba、hsl 或 hsla。
- 这两个属性也可以是渐变或图案。

```js
let drawing = document.getElementById("drawing");
// 确保浏览器支持<canvas>
if (drawing.getContext) {
 let context = drawing.getContext("2d");
 context.strokeStyle = "red";
 context.fillStyle = "#0000ff";
} 
```

## 绘制矩形
与绘制矩形相关的方法有 3 个：==fillRect()==、==strokeRect()==和 ==clearRect()==。

这些方法都接收 4 个参数：矩形 x 坐标、矩形 y 坐标、矩形宽度和矩形高度。这几个参数的单位都是像素。

fillRect()方法用于以指定颜色在画布上绘制并填充矩形。填充的颜色使用 fillStyle 属性指定。见下例：

::: normal-demo 绘制矩形

```html
<canvas id="drawing" width="400" height="200"></canvas>
```

```js
let drawing = document.getElementById("drawing");
// 确保浏览器支持<canvas>
if (drawing.getContext) {
  let context = drawing.getContext("2d");

  // 绘制红色矩形
  context.fillStyle = "#ff0000";
  context.fillRect(10, 10, 50, 50);
  // 绘制半透明蓝色矩形
  context.fillStyle = "rgba(0,0,255,0.5)";
  context.fillRect(30, 30, 50, 50);
}
```

:::

strokeRect()方法使用通过 strokeStyle 属性指定的颜色绘制矩形轮廓。下面是一个例子：
:::normal-demo 绘制矩形轮廓

```html
<canvas id="drawing" width="400" height="200"></canvas>
```
```js
let drawing = document.getElementById("drawing");
// 确保浏览器支持<canvas>
if (drawing.getContext) {
  let context = drawing.getContext("2d");
  // 绘制红色轮廓的矩形
  context.strokeStyle = "#ff0000";
  context.strokeRect(10, 10, 50, 50);
  // 绘制半透明蓝色轮廓的矩形
  context.strokeStyle = "rgba(0,0,255,0.5)";
  context.strokeRect(30, 30, 50, 50);
}
```
:::

:::warning 注意
描边宽度由 lineWidth 属性控制，它可以是任意整数值。类似地，lineCap 属性控制线条端点的形状［"butt"（平头）、"round"（出圆头）或"square"（出方头）］，而 lineJoin属性控制线条交点的形状［"round"（圆转）、"bevel"（取平）或"miter"（出尖）］。
:::

使用 clearRect()方法可以擦除画布中某个区域。该方法用于把绘图上下文中的某个区域变透明。通过先绘制形状再擦除指定区域，可以创建出有趣的效果，比如从已有矩形中开个孔。来看下面的例子：

:::normal-demo clearRect()方法使用示例

```html
<canvas id="drawing" width="400" height="200"></canvas>
```
```js
let drawing = document.getElementById("drawing");
// 确保浏览器支持<canvas>
if (drawing.getContext) {
  let context = drawing.getContext("2d");
  // 绘制红色矩形
  context.fillStyle = "#ff0000";
  context.fillRect(10, 10, 50, 50);
  // 绘制半透明蓝色矩形
  context.fillStyle = "rgba(0,0,255,0.5)";
  context.fillRect(30, 30, 50, 50);
  // 在前两个矩形重叠的区域擦除一个矩形区域
  context.clearRect(30, 30, 30, 30);
}
```
:::

## 绘制路径

要绘制路径，必须==首先调用 beginPath()方法==以表示要开始绘制新路径。然后，再调用下列方法来绘制路径。

- arc(x, y, radius, startAngle, endAngle, counterclockwise)：以坐标(x, y)为圆心，以 radius 为半径绘制一条弧线，起始角度为 startAngle，结束角度为 endAngle（都是弧度）。最后一个参数 counterclockwise 表示是否逆时针计算起始角度和结束角度（默认为顺时针）。
- arcTo(x1, y1, x2, y2, radius)：以给定半径 radius，经由(x1, y1)绘制一条从上一点到(x2, y2)的弧线。
- bezierCurveTo(c1x, c1y, c2x, c2y, x, y)：以(c1x, c1y)和(c2x, c2y)为控制点，绘制一条从上一点到(x, y)的弧线（三次贝塞尔曲线）。
- lineTo(x, y)：绘制一条从上一点到(x, y)的直线。
- moveTo(x, y)：不绘制线条，只把绘制光标移动到(x, y)。
- quadraticCurveTo(cx, cy, x, y)：以(cx, cy)为控制点，绘制一条从上一点到(x, y)的弧线（二次贝塞尔曲线）。
- rect(x, y, width, height)：以给定宽度和高度在坐标点(x, y)绘制一个矩形。
  - 这个方法与 strokeRect()和 fillRect()的区别在于，它创建的是一条路径，而不是独立的图形。

创建路径之后，可以使用 closePath()方法绘制一条返回起点的线。如果路径已经完成，则既可以指定 fillStyle 属性并调用 fill()方法来填充路径，也可以指定 strokeStyle 属性并调用stroke()方法来描画路径，还可以调用 clip()方法基于已有路径创建一个新剪切区域。

下面这个例子使用前面提到的方法绘制了一个不带数字的表盘：
:::normal-demo 绘画不带数字的时钟

```html
<canvas id="drawing" width="400" height="200"></canvas>
```
```js
let drawing = document.getElementById("drawing");
// 确保浏览器支持<canvas>
if (drawing.getContext) {
  let context = drawing.getContext("2d");
  // 创建路径
  context.beginPath();
  // 绘制外圆
  context.arc(100, 100, 99, 0, 2 * Math.PI, false);
  // 绘制内圆
  context.moveTo(194, 100);
  context.arc(100, 100, 94, 0, 2 * Math.PI, false);
  // 绘制分针
  context.moveTo(100, 100);
  context.lineTo(100, 15);
  // 绘制时针
  context.moveTo(100, 100);
  context.lineTo(35, 100);
  // 描画路径
  context.stroke();
}
```
:::


路径是 2D 上下文的主要绘制机制，为绘制结果提供了很多控制。因为路径经常被使用，所以也有一个 isPointInPath()方法，接收 x 轴和 y 轴坐标作为参数。这个方法用于确定指定的点是否在路径上，可以在关闭路径前随时调用，比如：

:::normal-demo isPointInPath()方法使用示例

```html
<canvas id="drawing" width="400" height="200"></canvas>
<p id="canvasP"></p>
```
```js
let drawing = document.getElementById("drawing");
let p = document.getElementById("canvasP");
// 确保浏览器支持<canvas>
if (drawing.getContext) {
  let context = drawing.getContext("2d");
  // 创建路径
  context.beginPath();
  context.moveTo(100, 100);
  context.lineTo(100, 15);

  if (context.isPointInPath(100, 100)) {
    p.innerText = "Point (100, 100) is in the path.";
    context.stroke();
    context.closePath();
  } else {
    p.innerText = "Point (100, 100) is not in the path.";
  }
}
```
:::

## 绘制文本

文本和图像混合也是常见的绘制需求，因此2D绘图上下文还提供了绘制文本的方法，即 ==fillText()== 和 ==strokeText()==。

- 这两个方法都接收 4 个参数：要绘制的字符串、x 坐标、y 坐标和可选的最大像素宽度。
- 这两个方法最终绘制的结果都取决于以下 3 个属性：
  - font：以 CSS 语法指定的字体样式、大小、字体族等，比如"10px Arial"。
  - textAlign：指定文本的对齐方式，可能的值包括"start"、"end"、"left"、"right"和"center"。推荐使用"start"和"end"，不使用"left"和"right"，因为前者无论在从左到右书写的语言还是从右到左书写的语言中含义都更明确。
  - textBaseLine ：指定文本的基线，可能的值包括 "top" 、 "hanging" 、 "middle" 、"alphabetic"、"ideographic"和"bottom"。

这些属性都有相应的默认值，因此没必要每次绘制文本时都设置它们。fillText()方法使用fillStyle 属性绘制文本，而 strokeText()方法使用 strokeStyle 属性。通常，fillText()方法是使用最多的，因为它模拟了在网页中渲染文本。

由于绘制文本很复杂，特别是想把文本绘制到特定区域的时候，因此 2D 上下文提供了用于辅助确定文本大小的 measureText()方法。
- 这个方法接收一个参数，即要绘制的文本，然后返回一个 TextMetrics 对象。
- 这个返回的对象目前只有一个属性 width，不过将来应该会增加更多度量指标。
- measureText()方法使用 font、textAlign 和 textBaseline 属性当前的值计算绘制指定文本后的大小。
- fillText()和 strokeText()方法还有第四个参数，即文本的最大宽度。这个参数是可选的（Firefox 4 是第一个实现它的浏览器），如果调用 fillText()和 strokeText()时提供了此参数，但要绘制的字符串超出了最大宽度限制，则文本会以正确的字符高度绘制，这时字符会被水平压缩，以达到限定宽度。


## 变换

上下文变换可以操作绘制在画布上的图像。2D 绘图上下文支持所有常见的绘制变换。在创建绘制上下文时，会以默认值初始化变换矩阵，从而让绘制操作如实应用到绘制结果上。对绘制上下文应用变换，可以导致以不同的变换矩阵应用绘制操作，从而产生不同的结果。
- rotate(angle)：围绕原点把图像旋转 angle 弧度。
- scale(scaleX, scaleY)：通过在 x 轴乘以 scaleX、在 y 轴乘以 scaleY 来缩放图像。scaleX 和 scaleY 的默认值都是 1.0。
- translate(x, y)：把原点移动到(x, y)。执行这个操作后，坐标(0, 0)就会变成(x, y)。
- transform(m1_1, m1_2, m2_1, m2_2, dx, dy)：像下面这样通过矩阵乘法直接修改矩阵。
- setTransform(m1_1, m1_2, m2_1, m2_2, dx, dy)：把矩阵重置为默认值，再以传入的参数调用 transform()。

