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


关于你昨天说的元组，今天我也来复习一下，元组属于数组的变种。

使用场景在已知数组的个数，且数组的每一位都知道是什么数据类型。
如const arr:[number,string,boolean] = [123,"123",true];

虽然数组第一次初始化时，我们已知数组的个数且每一位是什么数据类型，就只能这么初始化，但是在后面中我们任然可以通过数组方法添加元素，该元素被称为越界元素，对于越界元素，它的数据类型，是定义元组时候数据类型的联合类型，即：number | string | boolean。

说人话就是，以上面定义的arr举例，越界元素满足number或string或boolean类型即可，不能是其它类型。
示例：
arr.unshift("123"); // success
arr.splice(0,0,"abc","bbc"); //succsss
const s1: symbol = Symbol("s1");
arr.push(s1);//error symbol类型不属于number | string | boolean
