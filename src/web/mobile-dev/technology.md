---
title: 移动开发技术篇
date: 2022-03-01
category:
  - 移动开发
---

## 手机app的技术栈

1. 原生App技术栈（native technology stack）
   原生技术栈指的是，只能用于特定手机平台的开发技术。比如，安卓平台的Java技术栈，ios平台的Obejct-C技术栈和Swifs技术栈。 这种技术栈只能用在一个平台，不能跨平台。
2. 很合App技术栈（bybrid technology stack）
   混合技术栈指的是开发混合app的技术，也就是web网页放到特定特定的容器中，然后再打包成各个平台的原生app。所以，混合技术栈其实是web技术栈 + 容器技术栈，典型代表是phoneGap、Cordova、Ionic等框架。
   如果已经掌握了web技术，这个技术栈就主要学习容器提供的API Bridge，网页通过它们去调用底层硬件的API。
3. 跨平台技术栈（cross-platform technology stack）
   跨平台技术栈指的是使用一种技术，同时支持多个手机平台。它与混合技术栈的区别是，不使用web技术，即它的页面不是HTML5页面，而是使用自己的语法写UI层，然后编译成各平台的原生App。
   这个技术栈就是纯粹的容器技术栈，React Native、Xamarin、Flutter都属于这一类。学习时，除了学习容器的API Bridge，还要学习容器提供的UI层，即怎么写页面。
4. 小结
   H5开发主要用在混合技术栈。但是跨平台技术栈的某些也会用到（比如react native），因为它们的UI层借鉴了web模型。  
   另外，混合技术栈和跨平台技术栈的基础，都是原生技术栈，因为最终都要编译成原生App。所以，不管使用哪一种技术栈，多多少少要了解一些个平台的原生技术。

## WebView控件
通常情况下，App内部会使用WebView控件作为网页引擎。这是系统自带的控件，专门用来显示网页。应用程序的界面，只要放在WebView，就好像内嵌了浏览器窗口，可以显示网页。  
不同的App技术栈要显示网页，区别仅仅在于怎么处理WebView这个原生控件
- 原生技术栈：需要开发者自己把WebView控件放在页面上。
- 混合技术栈：页面本身就是网页，默认在WebView中显示。
- 跨平台技术栈：提供一个WebView的语法，编译的时候将其它换成原生的WebView。

注意：不同系统的webView控件名称不一样，安卓系统就叫WebView，ios系统有较老的UIWebView，也有较新的WKWebView，作用都是一样的，差异在于功能的强弱。

## 原生技术栈

### xcode

### Android Studio

## 混合技术栈

### Adobe PhoneGap

### Apache Cordova

### Ionic


## 跨平台技术栈

### React Native
使用 JavaScipt 语言编写页面

### Xamarin
使用 C# 语言编写页面

### Flutter
使用 Dart 语言编写页面

## 总结
1. 原生技术栈的性能和体验最好，对于复杂的大型App，如果条件允许，应该采用这种方式开发。
2. 混合技术栈的成本低，灵活性好，对性能要求不高的简单App，尤其是纯展示性的页面，可以采用这种方式开发。
3. 跨平台技术栈适用于存在外部或内部条件的限制，只有一个团队开发跨平台app的情况。
