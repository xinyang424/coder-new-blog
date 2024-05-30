---
title: 搭建环境
date: 2022-09-06
category:
  - 移动开发
  - react native 搭建开发环境
order: 1 
---


## 前言
&emsp;&emsp;新开发 react native 项目得开发环境是相对简单的，一般根据[官方网站](https://www.reactnative.cn/docs/environment-setup)的介绍，选择你要搭建的对应版本跟着教程一步步来即可。

&emsp;&emsp;难点在于当你接收一个老的react native项目，并且交接文档不全的时候，你便很难将这个项目成功运行起来，更别说进行打包了。因为开发react native所需软件会很多，因此到此运行失败的原因就得需要一个一个进行排查。你通过[本文csdn上的文章](https://blog.csdn.net/qq_45152044/article/details/125216627)学习如何搭建 react native 版本号为`0.55.4`的开发环境，此文也是笔者之前写好的。

&emsp;&emsp;在搭建`0.55.x`开发环境可以一边参考[本文csdn上的文章](https://blog.csdn.net/qq_45152044/article/details/125216627)，一般看老版本的官方文档：<https://github.com/reactnativecn/react-native-website/tree/production/archived_docs/version-0.55>

:::tip
&emsp;&emsp;一般影响运行失败的原因可能就有node版本、jdk版本、react native版本，这些原因相对来说很容易解决。比较难的就是 Android Studio 上的问题就相对难排查，可能原因是镜像源没有改，导致下载sdk时候非常慢(不改可以使用科学上网工具)，还有就是一些sdk和编译运行的工具并没有下载，也会导致react native项目时候长时间卡住觉得无进展(因为在下载、解压、编译那些运行资源)。最后如果打包 ios 应用的时候，xcode版本过新也会导致打包失败等等。

&emsp;&emsp;简而言之，当你遇到老项目运行失败并且交接资料并不齐全的时候，首要原因肯定是看 react native 版本是多少，根据[最新的官方网站](https://www.reactnative.cn/docs/environment-setup)或[找到对应老版本文档](https://github.com/reactnativecn/react-native-website/tree/production/archived_docs)先排查出 node 版本和 jdk 版本，最后再排查 Android studio上的问题并且能够运行打包后再解决在 xcode 打包的问题。
:::



## 所需软件


1. [vscode](https://code.visualstudio.com/)：vscode 版本任意都可以。
2. [Android Studio](https://developer.android.google.cn/studio?hl=zh-cn)：Android Studio 版本任意都可以。
3. [node](https://nodejs.org/en/download)：node 版本号为多少需要你参考官方文档的建议
4. [jdk](https://www.oracle.com/cn/java/technologies/downloads/)：jdk 版本号为多少同样需要你参考官方文档的建议

