---
title: 关于本站
date: 2023-04-15
icon: about-website
category:
  - 关于
---

## 关于本站初衷

&emsp;&emsp;本站搭建个人的博客包括了如前端、后端、运维、八股文笔记、算法、常用英语命名单词、bug记录、软件教程等方向的知识，若模块不全，请耐心等待站长更新。

&emsp;&emsp;积累本就是一个长久的过程，站长有时候也未能及时更新技术博客但并不是没有新技术的研究或者笔记，还请耐心等待站长更新。

&emsp;&emsp;本站持着简约至上，分享为主的想法，所以整个网站不会有太花里胡哨的动画和炫酷颜色。将主要维护重心放在内容质量上，通过增加更多干货学到更多知识才是重点。

&emsp;&emsp;若本站存在不完善地方或有错误的地方，还请多多指教，你可以下方评论区登录自己的GitHub账号留下你的评论，站长收到会一定会及时处理。



## 关于本站技术

&emsp;&emsp;本网站采用框架是vuepress的主题之一，更多有关vuepress，[点击此链接](https://vuepress.github.io/zh/)，初次之外，若默认主题不满足开发者需求，开发者可仔细查阅文档构建自己喜欢的主题。

&emsp;&emsp;除了vuepress外，还有vitepress，vitepress不管是构建速度还是打包速度都是比vuepress要快的，但是vuepress社区更强大一些，社区内有很多可开箱即用的主题，若想自己设计主题，或许vitepress更适合你。

## 关于本站部署

本网站部署成本接近0成本，部署拥有以下特点：
1. 采用GitHub Actions实现自动推送代码后打包，并推送分支到[此代码仓库](https://github.com/xinyang424/xinyang424.github.io)。
2. 推送到上述代码仓库后，会自动触发GitHub Action自动打包，打包后的代码会自动利用GitHub Pages重新部署，通过GitHub部署的可点击此链接访问[https://xinyang424.github.io/](https://xinyang424.github.io/)。
3. 除了GitHub Pages部署之外，Vercel也会监听此代码的推送记录，若main分支有推送记录，会自动触发重新部署，但是由于默认部署域名在国内用户若不科学上网则访问不了，这里我租用了国内域名填写对应DNS服务器即可实现访问Vercel部署的地址。即[https://blog.coder-new.cn/](https://blog.coder-new.cn/)。Vercel为个人用户提供了免费的构建流量和访问流量，搭建个人博客近乎零成本。
4. 除了Vercel和GitHub Pages，还有Netlify可以免费部署。
5. 本站用的默认文档搜索工具，当然还可以使用algolia提供的dosearch。




