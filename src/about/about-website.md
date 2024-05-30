---
title: 关于本站
date: 2023-04-15
icon: about-website
category:
  - 关于
order: 2
---

:::note
&emsp;&emsp;本站将会在服务器到期后停止运行，后续站长将会在语雀里构建我的数字花园，本站内容可能后续更新不积极。
:::

## 关于本站初衷



&emsp;&emsp;积累本就是一个长久的过程，站长有时候也未能及时更新技术博客但并不是没有新技术的研究或者笔记，还请耐心等待站长更新。

&emsp;&emsp;本站持着简约至上，分享为主的想法，所以整个网站不会有太花里胡哨的动画和炫酷颜色。将主要维护重心放在内容质量上，通过增加更多干货学到更多知识才是重点。

&emsp;&emsp;若本站存在不完善地方或有错误的地方，还请多多指教，你可以下方评论区登录自己的 GitHub 账号留下你的评论，站长收到会一定会及时处理。



## 关于本站技术

&emsp;&emsp;本网站采用框架是 Vuepress 的主题之一，更多有关 Vuepress，[点击此链接](https://vuepress.github.io/zh/)，初次之外，若默认主题不满足开发者需求，开发者可仔细查阅文档构建自己喜欢的主题。

&emsp;&emsp;除了 Vuepress 外，还有 Vitepress，Vitepress 基于 Vite 不管是构建速度还是打包速度都是比 Vuepress 要快的，但是 Vuepress 社区更强大一些，社区内有很多可开箱即用的主题，若想自己设计主题，或许 Vitepress更适合你。

## 关于本站部署

&emsp;&emsp;本网站部署成本接近 0 成本，主要方式如下：  
1. 采用 GitHub Actions 和 Github Pages 实现自动推送代码后打包。
   推送代码后触发 GitHub Actions 自动打包构建，打包后的代码将推送到[此代码仓库](https://github.com/xinyang424/xinyang424.github.io)，然后 Github Pages 会将此放库代码进行部署，改部署方式可通过 <https://xinyang424.github.io/> 进行访问。
2. 采用 Vercel 进行自动化打包部署。首先 Vercel 监听到你的代码推送记录后，可以自动进行打包和构建，默认打包后可以通过 <https://blog-git-main-xinyang424s-projects.vercel.app/> 这个链接进行访问，但是由于此链接如果不使用科学上网工具是无法访问的。这里我利用了一个国内域名通过配置 DNS 就可以进行访问了。通过 Vercel 部署方式并使用自定义域名访问链接是：<https://blog.coder-new.cn/>。

&emsp;&emsp;以上两种方案，虽然 0 成本，但是由于服务器并不在国内，就会导致访问很慢或者访问不了，而现在如果你通过 <https://xinyang424.com> 访问本站的话，就是使用了在成都的服务器，通过配置 Nginx + Centos 进行实现的。

该技术实现特点如下：
1. 利用 OpenSSH 连接 Centos 服务器，通过 Git 克隆或拉取 <https://github.com/xinyang424/xinyang424.github.io> 此仓库代码的静态资源。
2. Nginx 实现了 https访问，并支持 http 重定向至 https，即你访问 <http://xinyang424.com> 是会重定向到 <https://xinyang424.com> 的。
3. Nginx 还实现了虚拟主机，你可以通过 <https://static.xinyang424.com/%E6%9D%A8%E6%96%B0-Web%E5%89%8D%E7%AB%AF%E5%BC%80%E5%8F%91-3%E5%B9%B4.pdf> 访问到站长的简历。



&emsp;&emsp;除了 Vercel 和 GitHub Pages 可以实现 0 成本部署外，你还可以利用 Gitee 或 Netlify 来实现免费部署。

本站支持文档搜索，当然也可以使用 algolia 的 dosearch，但是没有使用 dosearch。

本站也支持评论功能，现配置的是 Github 的 Giscus，当然也还有 Waline 可以选择。





