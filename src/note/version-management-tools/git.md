---
title: git
date: 2022-03-01
category:
  - 版本管理工具
tag:
  - 代码版本管理工具
---


## git基本命令

### 克隆项目
   ```bash
    git clone https://github.com/xxxx/xxxx 
   ```
### 关联远程仓库
   ```bash
    git clone https://github.com/xxxx/xxxx 
   ```
### 添加文件
  ```bash
    # 添加全部文件
    git add .
    # 添加单个文件
    git add xxx
    # 添加一些文件
    git add xxx xxx
  ```
### 添加描述
  ```bash
    git commit -m "这里是描述内容"
   ```
### 推送代码
  ```bash
   git push
  ```
### 拉取代码
   ```bash
    git pull
   ```
### 查看分支
  ```bash
    git branch
  ```
### 切换分支
    ```bash
      git checkout <branchname>
      # or
      git switch <branchname>
    ```
### 创建分支
   ```bash
      #创建某一分支并切换到这一分支
      git checkout -b <branchname>
      # or
      git switch -c <branchname>
   ```
###  删除本地分支
    ```bash
      git branch -d <branchname>
      git checkout -d <branchname>
    ```
###  合并分支
    ```bash
      #切换你想合并的某个分支
      git checkout master 
      #合并你输入的分支名到当前分支
      git merge <branchname> 
    ```

## git配置

### 查看git配置信息
    ```bash
        git config --list
    ```
### 查看git用户名、密码、邮箱的配置
    ```bash
      git config user.name
      git config user.password
      git config user.email
    ```
### 设置git用户名、密码、邮箱的配置
    ```bash
        # 局部
        git config user.name "new-name"
        git config user.password "123456"
        git config user.email "xxxxxx@qq.com"
        # 全局
        git config --global user.name "new-name"
        git config --global user.password "123456"
        git config --global user.email "xxxxxx@qq.com"
    ```
 

## 参考链接

- [git 本地仓库关联到远程仓库](https://blog.csdn.net/sinat_39049092/article/details/113417142)
- [git将本地代码推送到远程分支](https://blog.csdn.net/qq_26884501/article/details/108142928)
- [git将本地代码推送到远程分支](https://blog.csdn.net/qq_26884501/article/details/108142928)