---
title: nrm
date: 2023-06-16
category:
  - 版本管理工具
tag:
  - npm镜像管理工具
---


一个帮助你管理npm镜像源的工具，助你省心切换镜像源。

<!-- more -->

## 安装

```bash
npm install nrm -g
```

## 基本命令

**nrm -V**
查看安装版本，也看查看是否安装成功
```bash
nrm -V
```
可能会报错
```bash
D:\nvm\v16.16.0\node_modules\nrm\cli.js:9
const open = require('open');
             ^

Error [ERR_REQUIRE_ESM]: require() of ES Module D:\nvm\v16.16.0\node_modules\nrm\node_modules\open\index.js from D:\nvm\v16.16.0\node_modules\nrm\cli.js not supported.
Instead change the require of index.js in D:\nvm\v16.16.0\node_modules\nrm\cli.js to a dynamic import() which is available in all CommonJS modules.
    at Object.<anonymous> (D:\nvm\v16.16.0\node_modules\nrm\cli.js:9:14) {
  code: 'ERR_REQUIRE_ESM'
}
```
解决办法：
命令行终端输入：`npm i nrm -g open@8.4.2 --save`，安装完成后再输入`nrm -V`就可显示版本号

---
**nrm ls**
列举可使用的镜像源
```bash
$ nrm ls

* npm ---------- https://registry.npmjs.org/
  yarn --------- https://registry.yarnpkg.com/
  tencent ------ https://mirrors.cloud.tencent.com/npm/
  cnpm --------- https://r.cnpmjs.org/
  taobao ------- https://registry.npmmirror.com/
  npmMirror ---- https://skimdb.npmjs.com/registry/

```

**nrm use**
使用某一镜像源
```bash
$ nrm use cnpm  //switch registry to cnpm

    Registry has been set to: http://r.cnpmjs.org/

```

**more command**
```bash
Usage: nrm [options] [command]

  Commands:

    ls                                    List all the registries
    current                               Show current registry name
    use <registry>                        Change registry to registry
    add <registry> <url> [home]           Add one custom registry
    login <registry> [value]              Set authorize information for a registry with a base64 encoded string or username and pasword
      -a  --always-auth                     Set is always auth
      -u  --username <username>             Your user name for this registry
      -p  --password <password>             Your password for this registry
      -e  --email <email>                   Your email for this registry
    set-hosted-repo <registry> <value>    Set hosted npm repository for a custom registry to publish packages
    set-scope <scopeName> <value>         Associating a scope with a registry
    del-scope <scopeName>                 Remove a scope
    set <registryName>                    Set custom registry attribute
      -a  --attr <attr>                    Set custorm registry attribute
      -v  --value <value>                  Set custorm registry value
    del <registry>                        Delete one custom registry
    rename <registryName> <newName>       Set custom registry name
    home <registry> [browser]             Open the homepage of registry with optional browser
    publish [<tarball>|<folder>]          Publish package to current registry if current registry is a custom registry. The field 'repository' of current custom registry is required running this command. If you're not using custom registry, this command will run npm publish directly
      -t  --tag [tag]                        Add tag
      -a  --access <public|restricted>       Set access
      -o  --otp [otpcode]                    Set otpcode
      -dr --dry-run                          Set is dry run
    test [registry]                       Show the response time for one or all registries
    help                                  Print this help

  Options:

    -h  --help     output usage information
    -V  --version  output the version number
```

## 补充
也有免安装一步到位的切换镜像源命令
```bash
# 使用淘宝镜像源
npx nrm use taobao

# 使用npm官方镜像源
npx nrm use npm

# 查看当前使用的镜像源
npm config get registry
```

可使用的镜像源：
- [npm](https://www.npmjs.org/)
- [yarn](https://yarnpkg.com/)
- [cnpm](http://cnpmjs.org/)
- [nodejitsu](https://www.nodejitsu.com/)
- [taobao](https://npmmirror.com/)