---
title: pnpm
date: 2022-05-10
category:
  - 包管理工具
---

<!-- more -->

:::tip 前言
[pnpm](https://www.pnpm.cn/) - 速度快、节省磁盘空间的软件包管理器。
:::



## pnpm优点

1. 快速——npm是同类工具速度的将近两倍
2. 高效——node_modules 中的所有文件均克隆或硬链接自单一存储位置
3. 支持单仓库——pnpm 内置了对单个源码仓库中包含多个软件包的支持
4. 权限严格——pnpm 创建的 node_modules 默认并非扁平结构，因此代码无法对任意软件包进行访问
5. 集中存储
6. 依赖隔离
7. monorepo


pnpm 相比较于 yarn/npm 这两个常用的包管理工具在性能上也有了极大的提升，根据目前官方提供的 benchmark 数据可以看出在一些综合场景下比 npm/yarn 快了大概两倍。


## 常用命令

- 安装 pnpm：`npm i pnpm -g`
- 查看 pnpm 版本信息：`pnpm -v`
- 升级pnpm版本：`pnpm add -g pnpm to update`
- 设置pnpm镜像源：
  - 查看源：`pnpm config get registry`
  - 切换淘宝源：`pnpm config set registry https://registry.npmmirror.com`
- 安装包所有依赖：`pnpm install` or `pnpm i`
- 安装包：
  - `pnpm add <packageName> [-S]`
  - `pnpm add <packageName> -D`
  - `pnpm add <packageName> -g` 全局安装
- 移出包：
  - `pnpm remove <packageName>`
  - `pnpm remove <packageName> -g` 移除全局包
- 更新
  - `pnpm up` 更新项目中所有依赖
  - `pnpm update <packageName>` 更新项目中的依赖包
  - `pnpm upgrade <packageName> -g` 更新全局包
- 运行项目：`pnpm run xxx`

## 查看 pnpm 下载包的公共仓库

```shell
pnpm store path
```

## 修改 pnpm 下载包的公共仓库


### 添加环境变量方式

```bash
# 在mac上示例
export PNPM_STORE_PATH=/home/user/my-pnpm-store
```

### 命令行设置

```shell
# 语法格式
pnpm config set store-dir <new path> 

# 语法示例（在D盘上的.pnpm-store文件夹）
pnpm config set store-dir D:/.pnpm-store
```

## 常见报错

`The following dependencies are imported but could not be resolved`

解决办法：

**方法一**
1. 在根目录创建 .npmrc 文件：
2. 在根目录创建 .npmrc 文件，内容为：`shamefully-hoist = true`
3. 删除`node_modules`，再执行`pnpm install`

**方法二：**\
执行`pnpm i --shamefully-hoist`


