---
title: SVG
date: 2022-02-01
category:
  - HTML
---




## SVG基本属性
| 属性名 | 说明     |
| ------ | -------- |
| width  | 绘制宽度 |
| height | 绘制高度 |


## SVG预定义的形状元素
### 元素类型
| 属性名            | 说明   | 基本语法     |
| ----------------- | ------ | ------------ |
| rect（rectangle） | 矩形   | <rect />     |
| circle            | 圆形   | <circle />   |
| ellipse           | 椭圆   | <ellipse />  |
| line              | 线条   | <line />     |
| polyline          | 多线条 | <polyline /> |
| polygon           | 多边形 | <polygon />  |
| path              | 路径   | <path />     |


### rect基本属性
绘制矩形

| 属性名         | 说明                       | 接收值类型           |
| -------------- | -------------------------- | -------------------- |
| width          | 定义矩形的宽度             | number               |
| height         | 定义矩形的高度             | number               |
| fill           | 定义矩形的填充颜色         | word、hex、rgb、rgba |
| fill-opacity   | 定义填充颜色的不透明度     | 0~1                  |
| stroke-width   | 定义矩形的边款宽度         | number               |
| stroke         | 定义矩形的边框颜色         | word、hex、rgb、rgba |
| stroke-opacity | 定义矩形描边颜色的不透明度 | 0~1                  |
| x              | 定义矩形的左边位置         | number               |
| y              | 定义矩形的顶部位置         | number               |
| opacity        | 定义整个矩形的透明度       | 0~1                  |
| rx             | 定义圆角x轴方向的半径长度  | number               |
| ry             | 定义圆角y轴方向的半径长度  | number               |

注意：

1. css的透明度取值是0~1，值越小就越透明。
2. rx和ry两值相等就是圆形的角，两值不等就是椭圆形的角。

示例代码：
```html
 <svg width="400" height="100">
        <rect width="300" height="100" fill="#0000FF" stroke-width="3" stroke="#000000" />
    </svg>
    <br>

    <svg width="400" height="100">
        <rect width="300" height="100" fill="rgb(0,0,255)" stroke-width="3" stroke="rgb(0,0,0)" />
    </svg>
    <br>

    <svg width="400" height="100">
        <rect width="300" height="100" fill="rgba(0,0,255,0.2)" stroke-width="3" stroke="rgba(0,0,0,0.2)" />
    </svg>
    <br>

    <svg width="400" height="100">
        <rect width="300" height="100" fill="blue" stroke-width="3" stroke="black" />
    </svg>
    <br>

    <svg width="400" height="180">
        <rect x="50" y="20" width="150" height="150" fill="blue" stroke="tomato" stroke-width="5" fill-opacity="0.5"
            stroke-opacity="0.5" />
    </svg>
    <br>

    <svg width="400" height="180">
        <rect x="50" y="20" width="150" height="150" fill="blue" stroke="tomato" stroke-width="5" opacity="0.5" />
    </svg>
    <br>

    <svg width="400" height="180">
        <rect x="50" y="20" width="150" height="150" fill="red" stroke="black" stroke-width="5" opacity="0.5" rx="20"
            ry="20" />
    </svg>
    <br>

    <svg width="400" height="180">
        <rect x="50" y="20" width="150" height="150" fill="red" stroke="black" stroke-width="5" opacity="0.5" rx="20"
            ry="50" />
    </svg>
    <br>
```

### circle基本属性
绘制圆形

| 属性名         | 说明                       | 接收值类型           |
| -------------- | -------------------------- | -------------------- |
| cx             | 定义圆形中心的x轴坐标      | number               |
| cy             | 定义圆形中心的y轴坐标      | number               |
| r              | 定义圆形的半径             | number               |
| fill           | 定义矩形的填充颜色         | word、hex、rgb、rgba |
| stroke-width   | 定义矩形的边款宽度         | number               |
| stroke         | 定义矩形的边框颜色         | word、hex、rgb、rgba |
| stroke-opacity | 定义矩形描边颜色的不透明度 | 0~1                  |

注意：

1. 若cx和cy省略，则会默认都为0

示例代码;
```html
<svg width="400" height="100">
        <circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="red" />
</svg>
```

### ellipse基本属性
绘制椭圆

| 属性名 | 说明                  | 接收值类型 |
| ------ | --------------------- | ---------- |
| cx     | 定义椭圆中心的x轴坐标 | number     |
| cy     | 定义椭圆中心的y轴坐标 | number     |
| rx     | 定义水平半径          | number     |
| ry     | 定义垂直半径          | number     |

注意：

1. 椭圆堆叠的顺序并不是html书写的顺序，这是因为它们的位置由cx、cy、rx、ry来决定的。

示例代码：
```html
<svg width="400" height="200">
   <ellipse cx="200" cy="80" rx="100" ry="50" stroke="purple" stroke-width="3" fill="yellow" />
</svg>

<!-- 三个堆叠的椭圆 -->
<svg width="500" height="200">
    <ellipse cx="240" cy="100" rx="220" ry="30" fill="purple" />
    <ellipse cx="220" cy="70" rx="190" ry="20" fill="green" />
    <ellipse cx="210" cy="45" rx="170" ry="15" fill="yellow" />
</svg>
      
<!-- 绘制空心的椭圆 -->
<svg width="500" height="200">
    <ellipse cx="240" cy="50" rx="220" ry="30" fill="yellow" />
    <ellipse cx="220" cy="50" rx="190" ry="20" fill="white" />
</svg>
```

### line基本属性
绘制直线

| 属性名 | 说明                    | 接收值类型 |
| ------ | ----------------------- | ---------- |
| x1     | 定义x轴上直线的起点坐标 | number     |
| y1     | 定义y轴上直线的起点坐标 | number     |
| x2     | 定义x轴上直线的末端坐标 | number     |
| y2     | 定义y轴上直线的末端坐标 | number     |

注意：

1. SVG所有绘制的图形，坐标的起点都是在画布的左上角。
2. 向右看作x轴，向下看作y轴。

示例代码：
```html
<!-- 绘制直线 -->
<svg width="400" height="100">
    <line x1="0" y1="0" x2="200" y2="200" stroke="red" stroke-width="2" />
</svg>
```

### polygon基本属性
绘制多边形

| 属性名 | 说明                           | 接收值类型 |
| ------ | ------------------------------ | ---------- |
| points | 定义了多边形每个角x和y轴的坐标 | number     |
| y1     | 定义y轴上直线的起点坐标        | number     |
| x2     | 定义x轴上直线的末端坐标        | number     |
| y2     | 定义y轴上直线的末端坐标        | number     |


注意：

1. points的值至少需要三对坐标，每一对坐标的x和y轴用逗号隔开，每一对坐标之间用空格隔开。
2. 

### polyline基本属性

### path基本属性

