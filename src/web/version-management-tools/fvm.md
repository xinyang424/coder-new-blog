---
title: fvm
date: 2023-06-16
category:
  - 版本管理工具
tag:
  - flutter版本管理工具
---

FVM 通过引用每个项目使用的 Flutter SDK 版本来帮助满足一致的应用程序构建需求。它还允许您安装多个 Flutter 版本，以使用您的应用程序快速验证和测试即将发布的 Flutter 版本，而无需每次都等待 Flutter 安装。

<!-- more -->

:::tip fvm官网
[https://fvm.app/](https://fvm.app/)
:::

## flutter优点
- Multiple Flutter SDKs（多个 flutter SDK）：能够管理和缓存多个 Flutter SDK 版本。在频道（channels）和版本（releases）之间快速切换。查看可用的频道和版本。
- Project Versioning（项目版本控制）：为每个项目配置和使用 Flutter SDK 版本。用于 IDE 调试支持的动态 SDK 路径。允许跨团队和 CI 环境的一致性。
- Advanced Tooling：管理全局 Flutter SDK 版本。在任何 Flutter SDK 版本中生成进程。用于 CI 和开发工作流的 Docker 映像。从特定提交安装 Flutter。

## fvm下载

[下载地址](https://github.com/fluttertools/fvm/releases)，在此地址，自己根据自己操作系统选择下载对应的包。

下载好后移到合适的目录，并配好相应的系统环境变量。

配置好环境变量后，在命令行终端输入`fvm`即可查看环境变量是否配置好，若配置好就不会报错，否则就会报错fvm不是命令


## fvm基本命令

### version 查看版本号
```bash
# 查看安装fvm的版本号
fvm --version
```

### list 已安装的flutter版本
```bash
# 列出已安装的 Flutter SDK 版本。还将打印 FVM 使用的缓存目录
fvm list
```

### releases 查看可安装的flutter版本
```bash
# 查看所有可供安装的 Flutter SDK 版本
fvm releases
```

### use 使用指定flutter版本
```bash
# 使用指定版本的flutter版本
fvm use {version}
```


### install 安装flutter
```bash
# 将会根据项目配置的flutter版本进行安装
fvm install 

# 安装指定版本的flutter版本
fvm install {version}
```

### remove 移除flutter
```bash
# 移除指定版本的flutter
fvm remove {version}
```

### doctor 环境和项目配置
```bash
# 打印有关环境和项目配置的信息
fvm doctor
```