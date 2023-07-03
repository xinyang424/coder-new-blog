---
title: Chrome高级调试技巧
date: 2022-12-16
category:
  - 实用技巧
---

Chrome高级调试技巧总结

##  一键重新发起请求
该方式仅适用于`XMLHttpRequest`请求方式，不适用于`fetch`：
1. 在`network`找到对应的请求
2. 右击鼠标选择`Replay XHR`，就会重新发送XHR请求。

## 在控制台重新发送请求

使用场景：需要修改下参数重新发送请求，具体操作步骤：
1. 打开`network`
2. 找到需要修改参数的请求
3. 右击选择`Copy as fetch`
4. 粘贴到`console`，修改请求参数，按回车
5. 在`network`中查看响应结果


## 拷贝对象
控制台选中对象后右键，选择`Copy as Object`

## 控制台获取Elements面板选中的元素
1. 在`Elements`面板里选中需要访问的元素
2. 在`Console`面板里输入`$0`
## 截取一张全屏网页

1. 打开需要截图网页
2. mac下运行按cmd + shift + p，window下运行按ctrl + shift + p
3. 输入Capture full size screenshot按下回车

## 控制台引用上一次执行的结果

关键词：`$_`

## $和$$选择器

在控制台使用`document.querySelector`和`document.querySelectorAll`选择当前页面的元素是最常见的需求了，不过着实有点太长了，咱们可以使用`$`和`$$`替代。