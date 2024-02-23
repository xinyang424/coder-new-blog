---
title: uni-app模板
date: 2024-02-21
category:
  - 移动开发
---

本文介绍一般创建uniapp项目开发app时所配置的一些配置项

<!-- more -->

1. 忽略版本兼容检查提示。这个提示常会出现在打包完运行时候弹出来的提示信息，然后点击弹框上的“查看详情”，就会跳转到DCloud的网页上，可以设置以下来进行关闭，这样打包完运行时候就不会出现弹框提示了。
```json
{
    "app-plus": {
        "compatible":{
            "ignoreVersion": true
        }
    }
}
```

2. 代码分包。代码分包可以减少app首次加载启动时所耗费的时间，需要在`manifest.json`和`pages.json`两个文件同时配置才会生效：
   - [manifest.json参考配置](https://uniapp.dcloud.net.cn/collocation/manifest.html#app-vue-optimization)
   - [pages.json参考配置](https://uniapp.dcloud.net.cn/collocation/pages.html#subpackages)，注意`pages.json`是需要配置`subPackages`和`preloadRule`的。
   - 代码分包不止可以运用在app上，小程序上也是可以的，具体看官方的介绍

3. 开发app竖屏锁定，不运行app页面跟随页面旋转而进行旋转。这个需要在`pages.json`下的`globalstyle/pageOrientation`下进行配置，[pageOrientation配置参考](https://uniapp.dcloud.net.cn/collocation/pages.html#globalstyle)

4. `rpxCalcBaseDeviceWidth`、`rpxCalcBaseDeviceWidth`、`rpxCalcIncludeWidth`。[三个值的介绍](https://uniapp.dcloud.net.cn/collocation/pages.html#globalstyle)，一般默认即可，或者可能设计师给的稿纸宽度不是375，此时可以设置一下`rpxCalcBaseDeviceWidth`，这三个值方便我们进行响应式的布局，另外`dynamicRpx`根据实际情况是否设置为true，为true会根据屏幕大小变化进而重新进行页面布局

5. `transformPx`,[transformPx配置参考](https://uniapp.dcloud.net.cn/collocation/manifest.html#%E9%85%8D%E7%BD%AE%E9%A1%B9%E5%88%97%E8%A1%A8)设为true时，方便我们将px转化为rpx，从而方便我们进行响应式的布局，当然，也可以部根据第四五点所介绍的uniapp内置的响应式布局配置，你还可以使用第三方的插件，如`postcss-px-to-viewport`，仅在开发环境使用即可，它可以将你所指定的单位和稿纸宽度全部转换成你所期待的单位。如果你的项目是ts声明，需要手动书写声明文件，也可以参考以下声明文件:
```ts
declare module "postcss-px-to-viewport" {
  type Unit = "px" | "rem" | "cm" | "em" | "rpx";
  interface Options {
    /**
     * 需要转换的单位
     */
    unitToConvert: Unit;
    /**
     * 设计稿的视口宽度
     */
    viewportWidth: number;
    /**
     * 单位转换后保留的精度
     */
    unitPrecision: number;
    /**
     * 能转化为vw的属性列表
     */
    propList: Array<string>;
    /**
     *  希望使用的视口单位
     */
    viewportUnit: string;
    /**
     * 字体使用的视口单位
     */
    fontViewportUnit: string;
    /**
     * 需要忽略的CSS选择器，不会转为视口单位，使用原有的px等单位。
     */
    selectorBlackList: Array<string>;
    /**
     * 设置最小的转换数值，如果为1的话，只有大于1的值会被转换
     */
    minPixelValue: number;
    /**
     * 媒体查询里的单位是否需要转换单位
     */
    mediaQuery: boolean;
    /**
     *  是否直接更换属性值，而不添加备用属性
     */
    replace: boolean;
    /**
     * 忽略某些文件夹下的文件或特定文件，例如 'node_modules' 下的文件
     */
    exclude: Array<Regexp> | Regexp;
    /**
     *  如果设置了include，那将只有匹配到的文件才会被转换
     */
    include: Array<Regexp> | Regexp;
    /**
     *  是否添加根据 landscapeWidth 生成的媒体查询条件 @media (orientation: landscape)
     */
    landscape: boolean;
    /**
     * 横屏时使用的单位
     */
    landscapeUnit: string;
    /**
     * 横屏时使用的视口宽度
     */
    landscapeWidth: number;
  }

  export default (options: Partial<Options>): void => {};
}
```
但是一般看情况决定是否用这个插件，因为有些uniapp的组件，是使用到了rpx作为单位的，而rpx在uniapp里会自动转换成`px`

6. [minSdkVersion配置](https://uniapp.dcloud.net.cn/tutorial/app-android-minsdkversion.html#%E8%AE%BE%E7%BD%AEminsdkversion)
7. [condition启动模式配置](https://uniapp.dcloud.net.cn/collocation/pages.html#condition)
8. [配置app打包后的cpu类型](https://uniapp.dcloud.net.cn/tutorial/app-android-abifilters.html#cpu%E7%B1%BB%E5%9E%8B)，需要注意的是从`HBuilder2.7.0+`开始，云打包不再将`x86`打包进去。[cpu配置注意事项](https://uniapp.dcloud.net.cn/tutorial/app-android-abifilters.html#nox86)
9. [设置UrlSchemes](https://uniapp.dcloud.net.cn/tutorial/app-android-schemes.html#%E8%AE%BE%E7%BD%AEurlschemes)，配置此项可以从H5或其它app唤起我们开发的app


