---
title: 自动打包
date: 2023-03-01
category:
  - GitHub
tag:
  - 推送代码自动打包
---


<!-- more -->

## 文件配置

此文件可以通过GitHub Actions添加文件。

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
          # / 的左边是你的GitHub用户名，右边是你仓库名，这里我是将打包好的文件，放在另外一个仓库的。 
          repo: your_github_name/your_repo_name
          target_branch: main
          build_dir: src/.vuepress/dist
        env:
          GH_PAT: ${{ secrets.ACCESS_TOKEN }}

```

## 创建 ACCESS_TOKEN

1. 进入GitHub，点击个人头像，选择`Settings`。
2. 下滑找到`Developer Settings`。
3. 依次选择`Personal access tokens`、`Tokens(classic)`。
4. 在页面右边找到`Generate new token`，下拉的两个选项中，选择`Generate new token(classic)`。
5. 在`Note`输入框中给你这个token命名，`Expiration`中设置token过期时间，可以选择`No expiration`永不过期。
6. 勾选`repo`即可，自动就选中了所有`repo`的子项，然后点击`Generate token`生成token，记得复制生成的token，这个生成后是不方便进行二次查看的，二次查看好像相当于重新生成了。
7. 然后刚刚上一节这个仓库里要用到这个token，就进入到这个仓库。
8. 进入仓库后，点击`Settings`。
9. 依次点击`Actions secrets and variables`、`Actions`，右边选择`New repository secret`按钮，`Name`就是为token取名，上一节我取名是`ACCESS_TOKEN`，这里我也取名为`ACCESS_TOKEN`，当然也可以是其它的，对应配置文件的`secrets.xxx`，xxx就是你的token名字，`Secret`就是刚刚复制的token，完事点击`Add secret`按钮。
10. 至此，当配置文件和token都配置好后，只要推送代码，就应该看到此仓库会自动打包，自动打包进程可以进入对应仓库，然后点击`Actions`，黄色圆圈是正在打包，绿色圆圈是打包完成，红色圆圈是打包失败，可以点进入查看日志信息。
11. 最后，如果打包后你要放在其它仓库，如上图配置文件注释，记得创建对应仓库哦，空仓库也行，一定要有，打包完成，会自动推送到这个仓库的。