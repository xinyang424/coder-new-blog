---
title: 打包与发布
date: 2022-07-06
category:
  - 移动开发
  - react native
---



## 打包为 APK

andoird 打包需要 android studio

**从项目根目录进入到android目录**：
```shell
cd android
```


**清空andorid目录下的运行缓存**：
::: code-tabs#shell

@tab:active windows
```shell
gradlew clean
```

@tab mac
```shell
./gradlew clean
```
:::


:::tip 注意
mac电脑如果此时无法使用`./gradlew`命令 ，在当前命令行输入`chmod +x gradlew`后，重新 输入`./gradlew clean`即可。
:::

**开始打包**：
::: code-tabs#shell

@tab:active windows
```shell
gradlew assembleRelease
```

@tab mac
```shell
./gradlew assembleRelease
```
:::

&emsp;&emsp;按以上步骤操作完后，此时在 android 目录下找到打包完成后的 apk 文件，将这个文件拿出来进行**加密加固**。通过 keystore 进行加固，目的是为了防止上线的 app 是同一个类型，以至于热更新的时候不会提示签名错误。将加固完成后的 apk 包上传至 app 上传平台，按照步骤上传审核即可。

## 打包为 IPA

&emsp;&emsp;打包 ios 发布 APP Store 的步骤相对复杂一点，需要使用 mac 电脑上的 xcode 软件进行打包上传，没有 mac 电脑的可以在 windows 电脑上直接装黑苹果或者装一个虚拟机，然后装一个 mac，这过程需要 windows 电脑性能足够强大，否则不建议操作。

**首先在 package.json 里设置 bundle-ios 命令**
```json
{
    "script":{
        "bundle-ios": ""bundle-ios": "node node_modules/react-native/local-cli/cli.js bundle --entry-file index.js --platform ios --dev false --bundle-output ./ios/bundle/index.jsbundle --assets-dest ./ios/bundle""
    }
}
```

**在 ios 文件目录下创建 bundle 文件夹**

**创建完成后运行以下命令：**
```shell
npm run bundle-ios
```

**等待过程完成后，可以在 bundle 目录下会生成 assets 文件文件**

**选择项目中 ios 文件夹，选中该文件夹下的 xxx.xcodeproj，通过 xcode 打开该文件**

