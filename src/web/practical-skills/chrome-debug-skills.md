---
title: Chrome高级调试技巧
date: 2022-12-16
category:
  - 实用技巧
---

Chrome高级调试技巧总结

##  一键重新发起请求
该方式仅适用于XMLHttpRequest请求方式，不适用于fetch：
1. 在network找到对应的请求
2. 右击鼠标选择“Replay XHR”

## 在控制台重新发送请求

使用场景：需要修改下参数重新发送请求，具体操作步骤：
1. 打开network
2. 找到需要修改参数的请求
3. 右击选择“Copy as fetch”
4. 粘贴到console，修改请求参数，按回车
5. 在network中查看响应结果


## 拷贝对象


## 截取一张全屏网页

1. 打开需要截图网页
2. mac下运行按cmd + shift + p，window下运行按ctrl + shift + p
3. 输入Capture full size screenshot按下回车

## Add conditional breakpoint 条件断点的妙用

