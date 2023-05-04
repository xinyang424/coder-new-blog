---
title: Puppeteer
date: 2023-04-28
category:
  - 实用技巧
---

## 什么是Puppeteer

Puppeteer是一个Node库，它提供了一个高级API来通过DevTools Protocol控制无头的Chrome或Chromium。它还可以配置为使用完整（非无头）Chrome或Chromium。[官网链接](https://pptr.dev/)

## Puppeteer能做什么
- 生成页面的屏幕截图和 PDF。
- 抓取 SPA（单页应用程序）并生成预渲染内容（“SSR”（服务器端渲染））。
- 自动执行表单提交、UI 测试、键盘输入等操作。
- 创建最新的自动化测试环境。使用最新的 JavaScript 和浏览器功能直接在最新版本的 Chrome 中运行测试。
- 捕获站点的时间线跟踪以帮助诊断性能问题。
- 测试 Chrome 扩展。

## 安装Puppeteer

在项目中使用Puppeteer

:::tip
在 v1.18.1 之前，Puppeteer 至少需要 Node v6.4.0。从 v1.18.1 到 v2.1.0 的版本依赖于 Node 8.9.0+。从 v3.0.0 开始，Puppeteer 开始依赖 Node 10.18.1+。下面的所有示例都使用仅在 Node v7.6.0 或更高版本中受支持的 async/await。
:::

```bash
npm i puppeteer
# or "yarn add puppeteer"
```

:::tip
当您安装 Puppeteer 时，它会下载最新版本的 Chromium（~170MB Mac，~282MB Linux，~280MB Win）保证与 API 一起工作。要跳过下载、下载到另一个路径或下载不同的浏览器，请参阅环境变量。
:::




## puppeteer-core

从 1.7.0 版本开始，我们发布了 puppeteer-core 包，这是一个默认不下载任何浏览器的 Puppeteer 版本。

```bash
npm i puppeteer-core
# or "yarn add puppeteer-core"
```

`puppeteer-core` 旨在成为 Puppeteer 的轻量级版本，用于启动现有浏览器安装或连接到远程浏览器。

确保您安装的 `puppeteer-core` 版本与您打算连接的浏览器兼容。


## 指定页面截图

下面所有示例都建议直接搭建node项目运行：
1. 创建文件夹
2. `npm init`
3. `npm i puppeteer`
4. 新建`screenShot.js`文件
5. 编写以下代码
```js
const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  //Puppeteer 将初始页面大小设置为 800×600px，它定义了屏幕截图大小。可以使用 Page.setViewport() 自定义页面大小。
  await page.setViewport({
    width: 1280, //页面宽度
    height: 720, //页面高度
    deviceScaleFactor: 1, //指定设备比例因子（可以认为是 DPR）。默认为 1 。
    // isMobile: false,//是否考虑元视口标签，默认为false
    // hasTouch: false, //指定视口是否支持触摸事件。默认为 false
    // isLandScape: false, //指定视口是否处于横向模式。默认为false。
  });
  await page.goto("https://baidu.com");
  await page.screenshot({ path: "baidu_screenShoot.png" });

  await browser.close();
})();
```
6. 运行js文件，`node screenShot.js`
7. 根目录下就可看到名为`baidu_screenShoot.png`截图


## 指定页面生成pdf
1. 新建`pdf.js`
2. 在该文件编写以下代码
```js
const puppeteer = require("puppeteer");
//生成pdf更多配置参数https://pptr.dev/api/puppeteer.pdfoptions
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://news.ycombinator.com", {
    waitUntil: "networkidle2",
  });
  await page.pdf({ path: "website.pdf", format: "a4" });
  await browser.close();
})();
```
3. 运行js文件，`node pdf.js`
4. 根目录下就可看到名为`website.pdf`pdf
   

## 在页面上下文中评估脚本
1. 新建`evalScript.js`文件
2. 在该文件编写以下代码
```js
const puppeteer = require("puppeteer");
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://baidu.com");

  const dimensions = await page.evaluate(() => {
    return {
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight,
      deviceScaleFactor: window.devicePixelRatio,
    };
  });

  console.log("Dimensions:", dimensions);

  await browser.close();
})();

```
3. 执行该文件，`node evalScript.js`
4. 打印结果为：
```text
deviceScaleFactor 指的是指定设备比例因子（可以认为是 DPR）
Dimensions: { width: 800, height: 600, deviceScaleFactor: 1 }
```