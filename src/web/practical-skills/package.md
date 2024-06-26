---
title: package.json
date: 2023-06-28
category:
  - 记八股文
---

package.json 是一个用于描述和配置项目的重要文件，其中包含了许多字段和选项，可以影响项目的构建、依赖管理、脚本执行等方面。了解这些字段可以帮助开发者更好地理解和控制项目的行为。

package.json对于大部分前端开发者来说，知道dependencies与devDependencies就够了。但对于库开发者或有更高级需求的开发者来说，了解 package.json 的其他字段是非常有必要的。

本文介绍的字段分为官方字段与非官方字段。非官方字段是被主流打包工具（webpack，Rollup）所支持， 旨在提供更高级的配置和功能，以满足特定的构建需求，可能不具备通用性。


`package.json`文件其实就是对项目或者模块包的描述，里面包含许多元信息，比如名称、版本等等。

新项目可通过`npm init`初始化配置`package.json`文件信息，也可以通过`npm init -y`一键初始化默认`package.json`文件配置。
<!-- more -->

## 必须属性

### name

定义项目名称，注意不得包含大写字母、不能以`.`和`_`开头。

可以通过`npm view`命令查看模块名是否重复，如果不重复就会提示 404。

### version

定义项目的版本号，命名格式为`主版本号.次版本号.修订号`。

对于版本号的介绍[参考此文章](./version-desc.md)。`name`和`version`是最重要的字段，共同构成唯一标识符

## 描述信息

### description 和 keywords

`description`描述和`keywords`关键字有助于我们在[npm](https://www.npmjs.com/)上发现包。会在`npm search xxx`中列出。

### author

定义项目的作者

### contributors

定义项目的贡献者

```json
  "contributors": [
    "name <b@rubble.com> (http://barnyrubble.tumblr.com/)"
  ]
```

### homepage

定义项目的主页地址

### repository

定义项目的仓库地址

### bugs

定义项目提交问题的地址

```json
//提交问题的地址和反馈的邮箱,url通常是Github中的issues页面
"bugs": { 
  "url" : "https://github.com/facebook/react/issues", 
  "email" : "xxxxx@xx.com"
}
```

### funding

指定项目的资金支持方式和链接
```json
"funding": {
  "type": "patreon",
  "url": "https://www.patreon.com/my-module"
}
```

## 依赖配置

### dependencies

定义生成环境的依赖包

- 安装包的版本号如果前面不带符号，代表只安装这个指定版本。
- `~`代表表示安装最近的小版本，`^`代表安装最近的大版本。如`~1.0.5`代表安装安装`1.0.x`，`^1.0.5`代表安装`1.x.x`。

简而言之，`~`只能安装主版本号和次版本号固定的版本，修订号随意，而`^`只能安装主版本号固定的版本，次版本号和修订号随意。

### devDependencies

定义开发环境的依赖包，例如webpack、vite、babel、ESLint等。这些包将不会在生成环境中使用

- 使用`npm install xxx --save`或`npm install xxx -S`代表安装在生产环境中。
- 使用`npm install xxx --save-dev`或者`npm install xxx -D`代表安装在开发环境中。关于环境的相关解释，见下一章节。

### peerDependencies

对等依赖的作用：
- 减小打包体积：例如使用react开发的组件库，安装react是必不可少的，而使用组件库的开发者，本地项目肯定安装了react，因此开发的组件库中不必把react打包进去（期望项目的使用者来提供这些模块的实现）。
- 版本一致性：使用你的组件库的开发者需要确保他们项目中安装了与你声明的对等依赖版本兼容的包，以确保组件库正常运行。

示例：声明要使用组件库，需在项目中安装大于17.0.1版本的react

```json
"peerDependencies": {
  "react": ">17.0.1"
}
```

### peerDependenciesMeta

将对等依赖标记为可选，如果用户没有安装对等依赖，npm不会发出警告

```json
"peerDependenciesMeta": {
  "react": {
    "optional": true //标记为可选
  }
}
```

### bundledDependencies

声明捆绑依赖项（使用情景较少）

### optionalDependencies

声明可选依赖项（使用情景较少）

### engines

声明对npm或node的版本要求

```json
"engines": {
  "node": ">=8.10.3 <12.13.0",
  "npm": ">=6.9.0"
}
```

engines只是起一个说明的作用，即使用户安装的版本不符合要求，也不影响依赖包的安装。

### workspaces

单个代码库中统一管理多个包（monorepo），在workspaces声明目录下的package会软链到根目录的node_modules中。

## 脚本配置

### scripts

定义脚本入口，代表包在包生命周期中不同的时间运行的脚本命令。执行命令`npm run xxx`，其中 xxx 代表的就是`scripts`对象里的键值，然后执行对应键值的值。

如：
```json
"scripts":{
    "dev":"vite"
}
```

上面代表可执行的命令是`npm run dev`，当你在终端中输入`npm run dev`是，相当于直接执行`vite`，但是又不可以在终端中直接输入`vite`，原因可见[此文章](https://blog.coder-new.cn/interview/npm-run-xxx.html)。

### config

用于定义项目的配置项，例如设置环境变量
```js
//在`package.json`文件中
"config":{
    "port":8080
}
//在js文件中
console.log(process.env.npm_package_config_port);
```






## 文件&目录

### module

指定 ES 模块入口文件

示例：当其他开发者在他们的项目中导入你的包时，会加载并执行包中的dist/index.esm.js

```json
{
  "main": "dist/index.esm.js"
}
```

### main

指定 CommonJS 模块或 ES 模块入口文件。如果不指定该字段，默认是根目录下的index.js

提示：从 Node.js 12.20.0 版本开始，"main" 字段也可以指定 ES 模块的入口文件

### browser
指定浏览器使用的入口文件，例如umd模块。

### types（非官方字段）

指定 TypeScript 类型声明文件（.d.ts 文件）的路径

指定模块系统的使用方式，"commonjs"，"module"，"umd"，"json"

示例：指定模块系统为ES module模式，使用CommonJS文件时，需显式的定义为 .cjs 文件扩展名，来明确指定这些文件为 CommonJS 模块

```json
{
  "type":"module"
}
```

### exports（非官方字段）

当打包工具支持exports字段时（webpack、Rollup 等），以上main，browser，module，types四个字段都被忽略

- `.` 表示默认导出
- `import`: 指定了 ES module (ESM) 规范下的导出文件路径
- `require`: 指定了 CommonJS 规范下的导出文件路径
- `browser`: 指定了用于浏览器环境的导出文件路径
- `types`: 指定了类型声明文件的路径

```json
"exports": {
  ".": {
    "import": "./dist/index.esm.js",
    "require": "./dist/index.cjs.js",
    "browser": "./dist/index.umd.js",
    "types": "./dist/index.d.ts"
  }
}
```



### files

指定哪些包被推送到npm服务器中

示例：只推送index.js和dist包到npm服务器

```json
"files": [
  "index.js",
  "dist"
],
```

可以在项目根目录新建一个.npmignore文件，说明不需要提交到npm服务器的文件，类似.gitignore。写在这个文件中的文件即便被写在files属性里也会被排除在外

### bin

定义在全局安装时可执行的命令（使用情景较少）

### man

Linux 中的帮助指令（使用情景较少）

### directories

定义项目目录结构的字段（使用情景较少）

## 发布配置

### private

防止私有包发布到npm服务器，要发布到npm上设为false

### preferGlobal（非官方字段）

当设置 "preferGlobal" 字段为 true 时，它表示你的包更适合以全局方式安装，而不是作为项目的依赖项进行本地安装。

这个字段的设置是为了向用户传达关于你的包的最佳使用方式的建议。它并不会直接影响包的安装方式或包管理器的行为。

### publishConfig

在发布包时指定特定的配置

示例：指定包发布的注册表 URL，指定所有用户都可以访问（私有的会收费）

```json
"publishConfig": {
  "registry": "https://registry.npmjs.org/",
  "access": "public"
}
```

### os

指定你的包适用的操作系统

示例：包只适用于darwin（macOS）和 linux

```json
{
  "os": ["darwin", "linux"]
}
```

示例：禁用win32

```json
{
  "os" ["!win32"] //禁用的操作系统
}
```

### cpu

该配置和OS配置类似，用CPU可以更准确的限制用户的安装环境

### license

定义指定许可，默认为`MIT`，允许你任意使用、复制、修改代码库

ISC：在所有副本中保留版权声明和许可证声明，使用者就可以拿你的代码做任何想做的事情，你也无需承担任何责任

MIT：在所有副本或主要部分中保留版权声明和许可证声明，使用者就可以拿你的代码做任何想做的事情，你也无需承担任何责任

开源协议查询地址：[opensource.org/licenses/](https://opensource.org/licenses/)

## 第三方配置（非官方字段）

###  eslintConfig

eslint的配置，更推荐新建 .eslintrc 进行配置

使用参考：[新建 .eslintrc](https://juejin.cn/post/7228978346502946874#heading-16)

### babel

babel的配置，更推荐新建 .babelrc 进行配置

### unpkg
unpkg 是一个基于 CDN 的前端包托管服务，用于在浏览器中直接引用和加载 npm 上发布的包。

无需下载，直接通过 `<script>` 标签引用

```js
<script src="https://unpkg.com/package-name@version"></script>
```

### lint-staged

lint-staged是一个在Git暂存文件上运行linters的工具，通常配合gitHooks一起使用。

使用参考：[配置 husky、lint-staged、@commitlint/cli](https://juejin.cn/post/7228978346502946874#heading-22)

### browserslist

告知支持哪些浏览器及版本，Autoprefixer常用到它

```json
  "browserslist": [
    "defaults",
    "not ie < 8",
    "last 2 versions",
    "> 1%",
    "iOS 7",
    "last 3 iOS versions"
  ]
```

### sideEffects

指示包是否具有副作用，协助Webpack，Rollup等进行tree shaking

多数情况下可以直接设置为false，这样打包工具就会自动删除未被import的代码

但是有些情况例外：
- 有一些特定的模块文件，它们执行一些副作用操作，如注册全局事件监听器、修改全局状态等。
- 告诉构建工具不要将样式文件排除在无用代码消除的优化范围之外

```json
"sideEffects": ["./path/to/module.js", "*.css"]
```


## 环境

### 生产环境

定义：开发环境是用于开发和调试软件的环境。它是开发人员进行编码、测试和调试的工作区域。

特点：

- 实时调试：开发环境通常提供实时的代码调试功能，方便开发人员在开发过程中检查代码逻辑和解决问题。
- 灵活性：开发环境提供了丰富的工具和库，供开发人员使用和测试新功能和技术。
- 模拟数据：开发环境通常支持模拟数据和模拟服务器的功能，以便开发人员在不依赖实际后端服务的情况下进行开发和测试。
- 实时更新：开发环境允许开发人员对代码进行实时修改，并立即查看更改后的效果，提高开发效率。

示例：开发人员可以使用本地开发服务器、集成开发环境（IDE）和浏览器开发者工具等工具来创建、编辑和调试代码。

### 演示环境

定义：演示环境是用于展示软件功能和特性的环境，供项目相关人员和客户预览和评估。

特点：

- 类似生产环境：演示环境应与生产环境尽可能接近，以确保演示效果与实际环境一致。
- 数据隔离：演示环境的数据应与生产环境的数据隔离，以防止敏感信息泄露。
- 模拟用户体验：演示环境应提供与实际用户体验类似的功能和界面。
- 可重置性：演示环境应具备重置或恢复初始状态的能力，以便反复进行演示和评估。

示例：演示环境可以是专门的演示服务器或虚拟主机，用于展示软件的功能、界面和性能。

### 测试环境

定义： 测试环境是用于进行软件测试的环境，旨在验证软件的功能、性能和稳定性。

特点：

- 模拟生产环境：测试环境应尽可能接近生产环境，以便准确地模拟用户在真实环境中的行为。
- 隔离性：测试环境应与开发环境和生产环境相互隔离，以避免测试活动对其他环境造成影响。
- 测试数据：测试环境应具备合适的测试数据，以确保覆盖各种测试用例和场景。
- 自动化测试：测试环境通常配置自动化测试框架和工具，以提高测试效率和准确性。

示例：测试环境可以是专门的测试服务器或虚拟机，用于进行单元测试、集成测试、系统测试和性能测试等。

### 预发布环境

定义：预发布环境是在软件发布之前的一个环境，用于进行最后的功能测试、性能测试和验证。

特点：

- 验证发布准备：预发布环境用于验证软件是否已经准备好进行正式发布，包括功能的完整性、性能的稳定性以及兼容性等。
- 类似生产环境：预发布环境应该尽量与生产环境相似，以确保测试结果能够准确反映实际发布后的表现。
- 隔离性：预发布环境与生产环境应该相互隔离，以防止预发布期间的测试活动对生产环境产生影响。
- 回滚能力：预发布环境应该具备回滚的能力，以便在测试期间发现问题时能够快速还原到之前的可靠状态。

示例：预发布环境可以是专门的服务器或虚拟机，用于进行最后的集成测试、用户验收测试和性能测试。

### 持续集成/交付环境

定义：持续集成/交付环境是一种自动化的开发流程，将代码的集成、构建和部署自动化进行，以实现快速、频繁的软件交付。

特点：

- 自动化集成：持续集成/交付环境会自动将开发团队的代码集成到共享代码库，并执行自动化构建和测试。
- 频繁交付：持续集成/交付环境旨在实现频繁的软件交付，以便快速响应需求和反馈。
- 部署自动化：持续集成/交付环境会自动化地将软件部署到测试环境、预发布环境或生产环境中。
- 持续监控：持续集成/交付环境会监控软件的运行情况，包括错误日志、性能指标等。

示例：持续集成/交付环境通常会使用工具和平台，如 Jenkins、Travis CI 等，以自动化执行集成、构建和部署任务。

### 生产环境

定义：生产环境是软件最终部署和运行的环境，用于向最终用户提供服务。

特点：

- 高性能：生产环境需要具备高性能和稳定性，以处理大量的用户访问和并发请求。
- 安全性：生产环境需要采取安全措施来保护用户数据和防止潜在的攻击。
- 优化和压缩：在生产环境中，代码会经过优化和压缩，以减少加载时间和带宽消耗。
- 监控和日志：生产环境通常配备监控和日志系统，以便实时追踪系统状态、性能和错误。

示例：生产环境可以是云服务器、虚拟主机、CDN（内容分发网络）等用于部署和运行网站或应用程序的环境。

### 环境顺序

根据上面介绍到的环境，进行排序：

生产环境 -> 演示环境 -> 测试环境 -> 预发布环境 -> 持续集成/交付环境 -> 生产环境。

但这个顺序可能因为组织、项目和开发流程不同的而有所变化。有些环境可能会并存存在，而不是按照上面的顺序进行的，开发人员需要根据具体情况灵活调整和组织各个环境。

企业常使用的开发流程：

开发环境 -> 测试环境 -> 预发布环境 -> 生产环境

## 代码环境

我们都知道安装库的时候，可以选择安装开发环境代码还是生产环境代码，这两者环境代码有什么区别？

- 开发版本（Development Version）：开发版本的主要目的是方便开发人员进行调试和开发工作。它通常包含了更多的调试信息、详细的错误提示和更易读的代码结构。开发版本可能包含未经优化的代码、调试工具和日志记录功能，以帮助开发人员更好地理解和调试代码。这些额外的功能和信息可以帮助开发人员快速定位和解决问题，但也会增加文件大小和加载时间。
- 生产版本（Production Version）：生产版本的主要目的是在实际生产环境中使用，以提供更高的性能和更小的文件大小。生产版本通常会经过代码压缩、文件合并和其他优化处理，以减少文件大小并提高执行效率。不再包含调试信息、日志记录和其他开发时需要的辅助功能，从而使代码更紧凑、更高效。生产版本通常被用于部署到生产服务器、发布给最终用户或在生产环境中进行性能测试。

通过提供开发版本和生产版本，开发人员可以在开发过程中使用开发版本进行调试和开发，而在部署到生产环境时使用生产版本以提供更好的性能和用户体验。开发版本可以帮助开发人员更容易地追踪和修复问题，而生产版本则专注于最终产品的性能和可靠性。

`npm install xxx`中后缀在`-S`和`-D`究竟区别在哪里？

通常情况下，通过`-S`安装的会在`dependencies`中，这里面的库或插件都会最终打包进最终部署的产品中去。这些库是项目在生产环境中必要的，并且会被打包和部署到最终产品中。

而通过`-D`安装的会在`devDependencies`中，这里面的库通常不会打包进最终部署产品中去。这些库在最终产品中不会被包含，它们主要用于开发、测试和构建过程中的辅助功能。

下面是一个参考的`package.json`安装信息：

```json
"dependencies": {
  "@element-plus/icons-vue": "^2.1.0",
  "animate.css": "^4.1.1",
  "element-plus": "^2.3.4",
  "pinia": "^2.0.35",
  "sass": "^1.62.1",
  "vue": "^3.2.47",
  "vue-router": "^4.1.6"
},
"devDependencies": {
  "@types/node": "^18.16.3",
  "@vitejs/plugin-vue": "^4.2.1",
  "@vitejs/plugin-vue-jsx": "^3.0.1",
  "@vue/tsconfig": "^0.1.3",
  "typescript": "~4.8.4",
  "unplugin-vue-components": "^0.24.1",
  "vite": "^4.3.4",
  "vue-tsc": "^1.6.4"
}
```
