---
title: 自动打包
date: 2023-03-01
category:
  - GitHub
tag:
  - 推送代码自动打包
---


```yaml
# 名字
name: auto-build

on:
  push:
    branches:
      # 当main分支有推送记录时触发以下操作
      - main

jobs:
  docs:
    # 运行在ubuntu上
    runs-on: ubuntu-latest
    env:
      # 修改node内存大小，避免打包时候内存溢出
      NODE_OPTIONS: "--max_old_space_size=40960"
    steps:
        # 拉去代码到工作区
      - name: Checkout code
        uses: actions/checkout@v2
        with:
          persist-credentials: false

        # 准备node环境，版本为16.16.0
      - name: Setup Node.js environment
        uses: actions/setup-node@v2
        with:
          node-version: "16.16.0"

        # 安装并打包
      - name: Install & Build
        run: npm install && npm run build

      # 该操作是将打包后的文件放在当前仓库的分支下，分支名为production
      # - name: Deploy
      #   uses: JamesIves/github-pages-deploy-action@releases/v3
      #   with:
      #     ACCESS_TOKEN: ${{ secrets.ACCESS_TOKEN }}
      #     BRANCH: production
      #     FOLDER: src/.vuepress/dist

      # 该操作是将打包后的文件放在另外一个仓库里，仓库名为cdmcs.github.io，分支为main
      - name: Deploy to GitHub Pages
        uses: crazy-max/ghaction-github-pages@v2.2.0
        with:
          repo: cdmcs/cdmcs.github.io
          target_branch: main
          build_dir: src/.vuepress/dist
        env:
          GH_PAT: ${{ secrets.ACCESS_TOKEN }}

```