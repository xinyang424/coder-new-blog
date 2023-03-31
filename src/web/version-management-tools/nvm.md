---
title: NVM
date: 2022-03-01
category:
  - 版本管理工具
tag:
  - node版本管理工具
  - windows&mac
head:
  - - meta
    - name: keywords
      content: nvm学习笔记  | coder-new
---


## nvm是什么

简单来说，nvm就是node的版本管理工具，通过nvm可以帮助用户在电脑上安装多版本的node。

## nvm下载与安装

1. 安装之前需要先删除已经安装好的node
2. windows下载地址：[https://github.com/coreybutler/nvm-windows/releases](https://github.com/coreybutler/nvm-windows/releases)
3. 选择如下如下载的即可：

![nvm-release](./images/nvm-release.png)

1. 安装过程没有太大难度，也可以选择nvm的安装路径，可以不用安装在C盘。

## nvm配置

nvm安装好后并不代表你电脑已经有node了，需要什么版本的node就对应安装相应版本的。
不过在下载node之前要配置基本nvm的镜像源地址，否则会下载不了、出现网络错误。

### 配置镜像源

1. 键盘上同时按下win + r，然后输入cmd后，再按下enter回车。
2. 在打开的cmd窗口分别输入以下一行的命令后回车。

```bash
nvm node_mirror https://npmmirror.com/mirrors/node/
nvm npm_mirror https://npmmirror.com/mirrors/npm/
```

## nvm常用命令合集

以下命令还是在cmd窗口命令中运行，具体怎么打开看上面。

```bash
nvm list                   //查看当前本机已安装的node版本
nvm arch                   //查看当前本机是32位还是64位
nvm install xx.xx.xx       //安装指定版本的node
nvm install latest         //安装最新版的node
nvm uninstall xx.xx.xx     //卸载指定版本的node
nvm use xx.xx.xx          //指定当前使用node的版本，这一步要以管理员身份运行cmd，否则会报错
nvm root                  //查看本机安装nvm的路径
nvm list available        //windows查看可安装node版本命令
nvm ls-remote             //mac查看可安装node版本命令
```


## 如何以管理员身份运行cmd

1. 点击搜索按钮（桌面底部任务栏）
2. 输入cmd，选择上面的命令提示符，右键选择点击以以管理员身份运行，如下图

![](./images/how-to-use-admin.png)

## 修改npm镜像源

之所以修改npm镜像源，本质上是为了加快下载速度，下载node中的npm默认镜像源是国外的，我们可以修改为国内的镜像源以加快访问速度

### 设置淘宝镜像源

```bash
//设置淘宝镜像源
npx nrm use taobao
//or
npm config set registry https://registry.npmmirror.com/
```

### 重置为官方镜像源

```bash
//重置为官方源
npx nrm use npm   
//or   
npm config set registry https://registry.npmjs.org/
```

### 查看当前镜像源地址

```bash
//查看当前镜像源地址
npm config get registry
```

### 可选镜像源

```bash
// 腾讯镜像
npm config set registry http://mirrors.cloud.tencent.com/npm/

// 淘宝镜像 (官网 https://npmmirror.com/)
npm config set registry https://registry.npmmirror.com/

// 华为镜像
npm config set registry  https://mirrors.huaweicloud.com/repository/npm/
```

## 在mac可能遇到的问题

mac电脑在终端切换node版本后，关闭终端再次打开终端发现还原回去之前的版本了

解决办法：修改默认启用的版本号

```bash
nvm alias default 16.16.0
```
