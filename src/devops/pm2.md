---
title: pm2
date: 2022-03-01
icon: pm2
category:
  - 运维
tag:
  - node在服务器稳定运行
head:
  - - meta
    - name: keywords
      content: pm2使用  | coder-new
---


## 何为PM2

pm2是node进程管理工具，可以利用它来简化很多node应用管理的繁琐任务，如性能监控、自动重启、负载均衡等，因为在工作中遇到服务器重启后，需要一个个去重新启动每个服务，这样不仅繁琐、效率低，而且容易遗忘开启一些服务。

## PM2的主要特性

- 内建负载均衡（使用Node cluster集群模块）
- 后台运行
- 0秒停机重载
- 具有Ubuntu和Centos启动脚本
- 停止不稳定的进程（避免无限循环）
- 控制台检测
- 提供HTTP API
- 原创控制和实时的接口API（Nodejs模块，允许和PM2进程管理器交互）

## 安装PM2

1. `npm i pm2 -g`

## PM2常用命令

1. pm2 -v ——查看版本号
2. pm2 start xxx.js ——启动命令
3. pm2 log ——查看日志
4. pm2 list —— 查看服务列表
5. pm2 stop id —— 停止服务
6. pm2 restart id ——重启服务
7. pm2 delete id —— 删除服务
8. pm2 start xxx.js --watch ——实时监听文件进行重启
9. pm2 start xxx.js -i count/max —— 分配负载均衡，根据电脑的线程进行
10. pm2 start xxx.js -n 自定义名
11. pm2 monit ——查看打印日志
