---
title: npm run xxx 发生了什么
date: 2023-03-01
category:
  - 记八股文
---


例如输入`npm run serve`回车，这时候会在我们在`package.json`文件下执行`script`属性的
`vue-cli-service serve`这条指令，那为什么不能执行`vue-cli-service serve`这条指令呢？

当我们直接运行`vue-cli-service serve`这条指令时，就会提示报错信息：`zsh:command not found:vue-cli-service`。

此时问题：当我们执行`npm run serve`的时候实际执行的是`vue-cli-service serve`，但是直接执行 `vue-cli-service serve`就会报错。原因是当我们执行`npm install`的时候下载了。
`node_modules`文件夹下的`.bin`文件下，比如`vue-cli-service`右侧有个箭头，这实际就是此文件的软链接脚本文件。
当我们执行`npm run serve`的时候，真实执行的是`./node_moudes/.bin/vue-cli-service serve`或`node_moudes/.bin/vue-cli-service serve`这条指令。如果我们直接执行`vue-cli-service serve`这条执行，系统会默认从系统的环境变量从去查找，而不是在当前目录下去执行`node_modules`文件夹的`.bin`文件夹下的`vue-cli-service`去执行`serve`，也就是说为什么直接运行会报错的原因是：直接运行默认是从系统环境变量里去找的，而不是在当前项目的根目录下的`node_modules`的`.bin`文件夹去执行对应的软链接。
`npm run `的时候，会把`node_modules`下的`.bin`文件夹的子目录暂时加入到PATH变量，执行结束后，再将PATH变量恢复原样。

软链接脚本文件指向哪里？
`vue-cli-service`这条指令在`package-lock.json`可以找到对应关系`bin/vue-cli-service.js`，这个是对应模块下的`bin`文件夹，此文件夹下有js文件
因此串联起来关系就是，当我们执行`npm run xxx`的时候，首先是从`node_modules`文件夹下的`.bin`文件夹下查找对应的软链接，在`package-lock.json`的文件夹下可以找到这条指令实际执行的js文件（大多数是`bin`文件夹下）

### cmd窗口可执行命令的逻辑？

1. 它首先会判断这个文件名是否包含绝对路径，如果包含绝对路径，那它只会在绝对路径中寻找。此时如果没找到，会直接报错。
2. 如果不包含绝对路径，会在当前路径下寻找。
3. 如果没有找到，就会在操作系统的内置命令中找，如：`cd`、`dir`、`ls`、`cls`等
4. 如果还没找到，就会去环境变量Path中记载的目录中找到。如果没找到，cmd就会报错。

### 可在cmd内直接执行的文件类型有哪些？
`.exe`、`.cmd`

### 为什么直接输入npm执行不会报错？
因为node路径配置到系统环境变量中去的话，node路径下有`npm`和`npm.cmd`，所以在终端直接输入`npm`并不会报错。



### npm run serve发生了什么？

### 为什么直接执行vue-cli-service会报错？

### 什么是软链接？

### .bin文件夹下的软链接类型有哪些？
`vite`——unit平台、`vite.cmd`——cmd窗口、`vite.ps1`——powerShell



### vue-cli-service的软链接实际执行的是什么？为什么不能直接执行？

### 总结npm run xxx发生了什么？
