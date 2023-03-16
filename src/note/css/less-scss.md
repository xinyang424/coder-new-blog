---
title: Sass和Less的区别
date: 2022-03-01
category:
  - CSS
tag:
  - Sass和Less的区别
head:
  - - meta
    - name: keywords
      content: sass和less的区别  | coder-new
---


## Sass和Less的共同点

- 都属于CSS预处理器，是一种专门的编程语言对Web页面样式进行布局
- 通过编译器转化为正常的css文件供浏览器编译解析
- 可以进行参数混入
- 嵌套规则相同

## Sass和Less的不同点

- 编译环境不同，Less基于JavaScript，是在客户端处理的。Sass基于Ruby，在服务器端处理。
- 声明变量方式不同：Less是@，而Scss是$
- 输出设置不同，Less没有输出设置，Sass提供四种输出设置：nested、compressed和expanded。
- Sass支持条件语句，可以使用if{}else{}，for{}循环等等。而Less不支持。
- Sass会以下划线开头的文件视为局部文件，在编译过程不会将局部文件编译为普通的CSS同名文件，可以提供给用户选择。而Less不提供选择是否把Less文件编译为Sass文件。[Sass局部文件见下]
- Sass和Less的工具库不同，Sass有工具库Compass，Less有UI组件库BootStrap
