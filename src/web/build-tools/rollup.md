---
title: rollup
date: 2022-03-01
category:
  - 构建工具
tag:
  - rollup
  - 构建工具
---


:::info 前言
[rollup](https://cn.rollupjs.org/)是一个 JavaScript 打包工具。  
它使用JavaScript的ES6版本中包含的新标准化代码模块格式，而不是以前的CommonJS的AMD等特殊解决方案。
:::

## rollup优点
1. rollup支持许多输出格式：ES模块、CommonJS、UMD、SystemJS等，不仅可以为web打包，还可以为许多其它平台打包。
2. 使用了Tree-shaking。
3. 虽然使用到了ES6新标准化代码的模块格式，但是也支持之前的CommonJS使用。
4. 根据不同的入口点和动态导入将代码拆分，只需适合用输出格式的导入机制，无需使用自定义加载器代码。
5. 强大的插件机制
6. vite打包也是使用的rollup

## 安装
```shell
npm install --global rollup
```

## 配置文件rollup.config.js

### 基本使用

```javascript
export default {
	input: 'src/main.js',
	output: {
		file: 'bundle.js',
		format: 'cjs'
	}
};

```

通常配置文件以`rollup.config.js`或`rollup.config.mjs`命名，它位于项目的根目录中。  
除非使用`--configPlugin`或`--bundleConfigAsCjs`选项，否则rollup将直接使用Node导入该文件。  
因为rollup遵循Node ESM语义，若想使用`require`导入模块或`module.exports`导出模块，使用这类的CommonJS模块的配置文件，需要将文件的扩展名/后缀名改为`.cjs`。

如果想支持ts语法，可以安装插件`@rollup/plugin-typescript`


### 配置项
:::details 查看详情
```javascript
// rollup.config.js

// 可以是数组（即多个输入源）
export default {
	// 核心输入选项
	external,
	input, // 有条件地需要
	plugins,

	// 进阶输入选项
	cache,
	onwarn,
	preserveEntrySignatures,
	strictDeprecations,

	// 危险区域
	acorn,
	acornInjectPlugins,
	context,
	moduleContext,
	preserveSymlinks,
	shimMissingExports,
	treeshake,

	// 实验性
	experimentalCacheExpiry,
	experimentalLogSideEffects,
	perf,

	// 必需（可以是数组，用于描述多个输出）
	output: {
		// 核心输出选项
		dir,
		file,
		format,
		globals,
		name,
		plugins,

		// 进阶输出选项
		assetFileNames,
		banner,
		chunkFileNames,
		compact,
		entryFileNames,
		extend,
		footer,
		hoistTransitiveImports,
		inlineDynamicImports,
		interop,
		intro,
		manualChunks,
		minifyInternalExports,
		outro,
		paths,
		preserveModules,
		preserveModulesRoot,
		sourcemap,
		sourcemapBaseUrl,
		sourcemapExcludeSources,
		sourcemapFile,
		sourcemapIgnoreList,
		sourcemapPathTransform,
		validate,

		// 危险区域
		amd,
		esModule,
		exports,
		externalLiveBindings,
		freeze,
		indent,
		namespaceToStringTag,
		noConflict,
		preferConst,
		sanitizeFileName,
		strict,
		systemNullSetters,

		// 实验性
		experimentalMinChunkSize
	},

	watch: {
		buildDelay,
		chokidar,
		clearScreen,
		skipWrite,
		exclude,
		include
	}
};

```
:::

## 配置rollup时有智能提示

**方法一**
由于rollup随附ts类型定义，因此可以使用JSDoc类型提示来利用IDE智能感知功能：
```javascript
// rollup.config.js
/**
 * @type {import('rollup').RollupOptions}
 */
const config = {
	/* 你的配置 */
};
export default config;

```

**方法二**
依靠`defineConfig`辅助函数，无需JSDoc注释即可使用智能感知功能：
```javascript
// rollup.config.js
import { defineConfig } from 'rollup';

export default defineConfig({
	/* 你的配置 */
});
```

**方法三**
依靠导入ts类型声明
```javascript
import type { RollupOptions } from 'rollup';

const config: RollupOptions = {
	/* 你的配置 */
};
export default config;

```


## 使用原生Node ES模块时得注意事项
### 获取当前目录
对于CommonJS文件，以前经常使用`__dirname`访问当前目录并将相对路径解析为绝对路径。
这在原生ES模块中不被支持，所以建议以下方法:
```javascript
// rollup.config.js
import { fileURLToPath } from 'node:url'

export default {
  ...,
  // 为 <currentdir>/src/some-file.js 生成绝对路径
  external: [fileURLToPath(new URL('src/some-file.js', import.meta.url))]
};

```

### 导入package.json文件
- node 17.5+，可以使用导入断言
```javascript
import pkg from './package.json' assert { type: 'json' };

export default {
	// Mark package dependencies as "external". Rest of configuration
	// omitted.
	external: Object.keys(pkg.dependencies)
};

```
- 对于旧一些得Node版本，可以使用createRequire
```javascript
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const pkg = require('./package.json');

// ...

```
- 直接从磁盘中读取并解析内容
```javascript
// rollup.config.mjs
import { readFileSync } from 'node:fs';

// 使用 import.meta.url 可以使路径相对于当前源文件而不是 process.cwd()。
// 更多信息参见：
// https://nodejs.org/docs/latest-v16.x/api/esm.html#importmetaurl
const packageJson = JSON.parse(
	readFileSync(new URL('./package.json', import.meta.url))
);

// ...

```

## 命令行标志

:::details 查看详情
```javascript
-c, --config <filename>     使用此配置文件
														（如果使用参数但未指定值，则默认为 rollup.config.js）
-d, --dir <dirname>         用于块的目录（如果不存在，则打印到 stdout）
-e, --external <ids>        排除模块 ID 的逗号分隔列表
-f, --format <format>       输出类型（amd、cjs、es、iife、umd、system）
-g, --globals <pairs>       `moduleID:Global` 对的逗号分隔列表
-h, --help                  显示此帮助消息
-i, --input <filename>      输入（替代 <entry file>）
-m, --sourcemap             生成源映射（`-m inline` 为内联映射）
-n, --name <name>           UMD 导出的名称
-o, --file <output>         单个输出文件（如果不存在，则打印到 stdout）
-p, --plugin <plugin>       使用指定的插件（可重复）
-v, --version               显示版本号
-w, --watch                 监视产物文件并在更改时重新构建
--amd.autoId                基于块名称生成 AMD ID
--amd.basePath <prefix>     要预先添加到自动生成的 AMD ID 的路径
--amd.define <name>         在 `define` 位置使用的函数
--amd.forceJsExtensionForImports 在 AMD 导入中使用 `.js` 扩展名
--amd.id <id>               AMD 模块的 ID（默认为匿名）
--assetFileNames <pattern>  发布资源的名称模式
--banner <text>             在产物顶部插入的代码（位于包装器之外）
--chunkFileNames <pattern>  发布次要块的名称模式
--compact                   缩小包装器代码
--context <variable>        指定顶级 `this` 值
--no-dynamicImportInCjs     将外部动态 CommonJS 导入编写为 require
--entryFileNames <pattern>  发布入口块的名称模式
--environment <values>      传递给配置文件的设置（请参阅示例）
--no-esModule               不添加 __esModule 属性
--exports <mode>            指定导出模式（auto、default、named、none）
--extend                    扩展由 --name 定义的全局变量
--no-externalImportAssertions 在 "es" 输出中省略导入断言
--no-externalLiveBindings   不生成支持实时绑定的代码
--failAfterWarnings         如果生成的构建产生警告，则退出并显示错误
--footer <text>             在产物底部插入的代码（位于包装器之外）
--no-freeze                 不冻结命名空间对象
--generatedCode <preset>    使用哪些代码特性（es5/es2015）
--generatedCode.arrowFunctions 在生成的代码中使用箭头函数
--generatedCode.constBindings 在生成的代码中使用 "const"
--generatedCode.objectShorthand 在生成的代码中使用简写属性
--no-generatedCode.reservedNamesAsProps 始终引用保留名称作为 props
--generatedCode.symbols     在生成的代码中使用符号
--no-hoistTransitiveImports 不将中转导入提升到入口块中
--no-indent                 不缩进结果
--inlineDynamicImports      使用动态导入时创建单次打包
--no-interop                不包括交互操作块
--intro <text>              在产物顶部插入的代码（位于包装器内部）
--no-makeAbsoluteExternalsRelative 不规范化外部导入
--maxParallelFileOps <value> 并行读取的文件数
--minifyInternalExports     强制或禁用内部导出的缩小
--noConflict                为 UMD 全局生成 noConflict 方法
--outro <text>              在产物底部插入的代码（位于包装器内部）
--perf                      显示性能计时
--no-preserveEntrySignatures 避免入口点的门面块
--preserveModules           保留模块结构
--preserveModulesRoot       将保留的模块放置在根路径下的此路径下
--preserveSymlinks          解析文件时不要跟随符号链接
--no-sanitizeFileName       不要替换文件名中的无效字符
--shimMissingExports        为丢失的导出创建卡扣变量
--silent                    不打印警告
--sourcemapBaseUrl <url>    使用给定的基本 URL 发出绝对源映射 URL
--sourcemapExcludeSources   在源映射中不包括源代码
--sourcemapFile <file>      指定源映射的包位置
--stdin=ext                 指定用于标准输入的文件扩展名
--no-stdin                  不要从 stdin 读取 "-"
--no-strict                 不在生成的模块中发出 `"use strict";`
--strictDeprecations        抛出有关不推荐使用的功能的错误
--no-systemNullSetters      不要将空的 SystemJS setter 替换为 `null`
--no-treeshake              禁用除屑优化
--no-treeshake.annotations 忽略纯调用注释
--treeshake.correctVarValueBeforeDeclaration 在声明之前将变量取消优化
--treeshake.manualPureFunctions <names> 手动将函数声明为纯函数
--no-treeshake.moduleSideEffects 假设模块没有副作用
--no-treeshake.propertyReadSideEffects 忽略属性访问副作用
--no-treeshake.tryCatchDeoptimization 不要关闭 try-catch-tree-shaking
--no-treeshake.unknownGlobalSideEffects 假设未知的全局变量不会抛出异常
--validate                  验证输出
--waitForBundleInput        等待打包输入文件
--watch.buildDelay <number> 节流观察重建
--no-watch.clearScreen      重建时不要清除屏幕
--watch.exclude <files>     排除要观察的文件
--watch.include <files>     限制观察到指定文件
--watch.onBundleEnd <cmd>   在 "BUNDLE_END" 事件上运行的 Shell 命令
--watch.onBundleStart <cmd> 在 "BUNDLE_START" 事件上运行的 Shell 命令
--watch.onEnd <cmd>         在 "END" 事件上运行的 Shell 命令
--watch.onError <cmd>       在 "ERROR" 事件上运行的 Shell 命令
--watch.onStart <cmd>       在 "START" 事件上运行的 Shell 命令
--watch.skipWrite           在监视时不要将文件写入磁盘

```
:::


## rollup常用到的插件
1. `@rollup/plugin-typescript`：识别ts文件
2. ` @rollup/plugin-json`：允许导入json文件
```javascript
// src/main.js
import { version } from '../package.json';

export default function () {
	console.log('version ' + version);
}

// rollup.config.js
import json from '@rollup/plugin-json';

export default {
	input: 'src/main.js',
	output: {
		file: 'bundle.js',
		format: 'cjs'
	},
	plugins: [json()]
};

```
3. `@rollup/plugin-terser`：压缩配置插件
```javascript
// rollup.config.js
import json from '@rollup/plugin-json';
import terser from '@rollup/plugin-terser';

export default {
	input: 'src/main.js',
	output: [
		{
			file: 'bundle.js',
			format: 'cjs'
		},
		{
			file: 'bundle.min.js',
			format: 'iife',
			name: 'version',
			plugins: [terser()]
		}
	],
	plugins: [json()]
};

```
4. `@rollup/plugin-node-resolve`：让rollup在打包过程中处理第三方插件
```javascript
// rollup.config.js
import resolve from '@rollup/plugin-node-resolve';

export default {
	input: 'src/main.js',
	output: {
		file: 'bundle.js',
		format: 'cjs'
	},
	plugins: [resolve()]
};
```
5. `@rollup/plugin-commonjs`：让rollup处理依赖中使用到commonjs的模块。
6. `@rollup/plugin-replace`：可以用于区分生产环境还是开发环境，此插件搭配`cross-env`进行使用
```javascript
import replace from '@rollup/plugin-replace';
export default {
  plugins: [
    replace({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    })
  ]
};
```
7. `cross-env`：设置环境变量
```json
{
  "scripts": {
    "serve": "cross-env NODE_ENV=development rollup -c -w",
    "build": "cross-env NODE_ENV=production  rollup -c"
  },
}
```
8. `rollup-plugin-node-externals`：自动排除`package.json`中一些模块为外部模块
```javascript
import externals from "rollup-plugin-node-externals";
export default {
  plugins: [
    externals({
      devDeps: false,//自动将dependencies下的依赖设为外部模块
    }),
  ],
};

```


## ES 模块语法
### 具名导入
使用源模块中的原始名进行导入：
```javascript
import { something } from './module.js';
```
从源模块导入特定项目，并在导入时分配自定义名称：
```javascript
import { something as somethingElse } from './module.js';
```

### 名称空间导入
将源模块中的所有内容作为一个对象导入，该对象将所有源模块的named exports公开为属性和方法。
```javascript
import * as module from './module.js';
```
### 默认导入
源模块以`export default`导出
```javascript
import something from './module.js';
```

### 无命名导入
加载模块代码，但不要使任何新对象可用：
```javascript
import './module.js';
```
这对于polyfill很有用，或者当导入代码的主要目的是处理prototypes时

### 动态导入
```javascript
import('./modules.js').then(({ default: DefaultExport, NamedExport }) => {
	// 用这个模块做点什么...
});
```

## 导出
### 具名导出
导出前先声明值
```javascript
const something = true;
export { something };
```
导出时重命名：
```javascript
export { something as somethingElse };
```
声明后立即导出值：
```javacript
// `var`, `let`, `const`, `class`, 和 `function` 都是有效的
export const something = true;
```

### 默认导出
```javascript
export default something;
```
