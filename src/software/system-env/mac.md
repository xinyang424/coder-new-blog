---
title: mac搭建
date: 2023-03-16
category:
  - 软件合集
---

## 安装 homebrew

&emsp;&emsp;利用 homebrew 可以在终端快速安装你想要的软件，它是一款Mac OS平台下的软件包管理工具，拥有下载、卸载、更新、查看、搜索等功能。通过简单的指令可以实现包管理。而不用关心各种依赖和文件路径情况。类似于前端的npm来管理依赖包。


&emsp;&emsp;在安装之前可以检查一下电脑上是否安装了 brew，在终端上输入`brew`后回车，若显示==command not found==字样则代表没有安装。

&emsp;&emsp;可以直接使用[Homebrew官方网站](https://brew.sh/zh-cn/)介绍的方法快速安装 Homebrew，但此方法需要使用到科学上网工具，否则无法成功安装。


&emsp;&emsp;若没有科学上网工具，可以按照以下步骤使用国内镜像源进行安装：

1. 复制`/bin/zsh -c "$(curl -fsSL https://gitee.com/cunkai/HomebrewCN/raw/master/Homebrew.sh)"`命令到终端回车运行，运行过程主要是中文提示。
2. 选择git克隆时随便选择都行，如选择阿里巴巴镜像源。提示是否开始执行脚本输入`y`后回车继续。此过程会提示你输入密码后继续。到最后一步选择`brew  install`的镜像源，同样选择阿里巴巴镜像源或者其它镜像源即可。
3. 第二步等待完成后，会提示还需要配置一下环境变量。


## 安装 nvm

nvm 可帮助前端开发者轻松切换 node 版本，通常可以让开发者轻松维护老项目或开发新项目。


使用 brew 进行安装：
```shell
# 检测是否安装brew，若已安装，则运行以下命令会打印出brew的版本号
brew -v
# 可以在安装之前卸载一遍，确保电脑上未安装nvm，使用nvm -v打印版本号也是可以的。
# 但是如果nvm没有配置环境变量而又没打印出版本号，那么可能代表只是没有配置好环境变量，不代表没有安装
brew uninstall nvm
```

使用 `brew install nvm`进行安装，等待命令运行完成还需要配置环境变量。

&emsp;&emsp;一般可以将环境变量配置进`~/.zshrc`里，这样每次电脑开机或者重新打开终端都可以自动加载环境变量，而排除某些时候需要手动运行`source xxx`。若有时候开机或打开终端都需要手动运行`source xxx`，可以尝试用这种方法来解决。

配置 nvm 环境变量：
1. `touch ~/.zshrc`，输入`i`进入编辑模式。
2. 将以下命令粘贴进去：
 ```shell
  # 设置nvm镜像源
  export NVM_NODEJS_ORG_MIRROR=https://npmmirror.com/mirrors/node/
  export NVM_IOJS_ORG_MIRROR=http://npm.taobao.org/mirrors/iojs

  # nvm 配置
  export NVM_DIR="$HOME/.nvm"
    [ -s "/opt/homebrew/opt/nvm/nvm.sh" ] && \. "/opt/homebrew/opt/nvm/nvm.sh"  # This loads nvm
    [ -s "/opt/homebrew/opt/nvm/etc/bash_completion.d/nvm" ] && \. "/opt/homebrew/opt/nvm/etc/bash_completion.d/nvm"  # This loads nvm bash_completion
 ```
3. 输入`:wq`保存并退出。 
4. 配置好后可以在终端输入`nvm -v`回车打印出nvm的版本号。若显示`command not found`，可以手动`source ~/.zshrc`一次，因为本次打开终端`.zshrc`里面是空的。


## 安装 node

使用 nvm 管理node版本，即可使用nvm来安装node，此教程需要确保电脑安装了`nvm`，并且配置好了环境变量，即输入`nvm -v`可以打印出nvm版本号

1. 输入`nvm remote-ls`查看可以安装的node版本
2. 输入`nvm install 18.18.0`运行安装版本号为`18.18.0`的node。
3. 输入`nvm list`查看自己电脑安装的node版本列表，mac上当前使用的node版本，版本号左边会有箭头指向，而window上是`*`符号。
4. 输入`nvm use 18.18.0`使用我们刚刚安装版本号为`18.18.0`的node。
5. 输入`nvm alias default 18.18.0`，表示我们默认使用版本为`18.18.0`的node，就不用在一些情况需要手动`nvm use xxx`。

## 安装 git


使用brew安装git：`brew install git`

