---
title: --force与 --legacy-peer-deps
date: 2022-11-28
category:
  - 实用技巧
---


<!-- more -->


## 简介
`npm i -f`或`npm i --force`：将强制 npm 获取远程资源，即使磁盘上存在本地副本也是如此。

`npm i --legacy-peer-deps`：在安装时忽略所有 peerDependencies，采用 npm 版本 4 到版本 6 的样式。

出现这个的直接原因是node版本对应的npm版本问题，根本原因是7.x的版本比6.x的版本更加严格。

所以这里`npm i –legacy-peer-deps`方式更好。

如果这不能立即起作用，也许可以先删除node_modules和package-lock.json。它们将被重新创建。最后不行就是降node版本（可使用node版本管理工具）。

最初遇到这个问题是利用命令行创建uni-app项目遇到的。

## node版本约定

根目录下创建.nvmrc文件，配合nvm进行约定node版本。
nvmrc文件介绍：[https://github.com/nvm-sh/nvm#nvmrc](https://github.com/nvm-sh/nvm#nvmrc)