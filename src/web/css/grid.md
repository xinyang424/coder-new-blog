---
title: Grid 布局
date: 2022-03-01
category:
  - CSS
---


CSS Grid布局是二维布局，该布局方式可以同时控制行和列的排布和对齐方式，Grid有水平线和垂直线构成，有行轨道和列轨道之分，开启grid布局仅需要：`display:grid`即可，容器的子元素就会自动成为grid布局的元素。


<!-- more -->


## gird-template-columns

控制容器的宽度，如何单位为px则为固定宽度，如何是fr，则会自适应。

## column-gap
`column-gap`控制容器之间每一列之间的距离。


## row-gap
`row-gap`控制容器之间每一行之间的距离。

## gap
`gap`即是同时设计`column-gap`和`row-gap`。

## grid-template-areas
```css
/* 父元素 */
.container{
    grid-template-areas:
        "header header header"
        "siderbar content content"
        "footer footer footer"; 
}

/* 子元素 */
header{
    grid-area:header;
}
main{
    grid-area:content;
}
aside{
    grid-area:siderbar;
}
footer{
    grid-area:footer;
}
```

## 更多
flex布局开启后有主轴和侧轴，而grid布局开启后有行轴和块轴，grid控制行轴和块轴排列方式的属性和值与flex布局控制主轴和侧轴排列方式类似。






