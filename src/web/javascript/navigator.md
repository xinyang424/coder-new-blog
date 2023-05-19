---
title: navigator 对象
date: 2022-06-18
category:
  - javascript
---

navigator 是由 Netscape Navigator 2 最早引入浏览器的，现在已经成为客户端标识浏览器的标准。只要浏览器启用 JavaScript，navigator 对象就一定存在。但是与其他 BOM 对象一样，每个浏览器都支持自己的属性。

<!-- more -->

navigator 对象实现了 NavigatorID 、 NavigatorLanguage 、 NavigatorOnLine 、NavigatorContentUtils 、 NavigatorStorage 、 NavigatorStorageUtils 、 NavigatorConcurrentHardware、NavigatorPlugins 和 NavigatorUserMedia 接口定义的属性和方法。  
这些接口定义的属性和方法：
| 属性/方法                     | 说明                                                                  |
| :---------------------------- | :-------------------------------------------------------------------- |
| activeVrDisplays              | 返回数组，包含 ispresenting 属性为 true 的 VRDisplay 实例             |
| appCodeName                   | 即使在非 Mozilla 浏览器中也会返回"Mozilla"                            |
| appName                       | 浏览器全名                                                            |
| appVersion                    | 浏览器版本。通常与实际的浏览器版本不一致                              |
| battery                       | 返回暴露 Battery Status API 的 BatteryManager 对象                    |
| buildId                       | 浏览器的构建编号                                                      |
| connection                    | 返回暴露 Network Information API 的 NetworkInformation 对象           |
| cookieEnabled                 | 返回布尔值，表示是否启用了 cookie                                     |
| credentials                   | 返回暴露 Credentials Management API 的 CredentialsContainer 对象      |
| deviceMemory                  | 返回单位为 GB 的设备内存容量                                          |
| doNotTrack                    | 返回用户的“不跟踪”（do-not-track）设置                                |
| geolocation                   | 返回暴露 Geolocation API 的 Geolocation 对象                          |
| getVRDisplays()               | 返回数组，包含可用的每个 VRDisplay 实例                               |
| getUserMedia()                | 返回与可用媒体设备硬件关联的流                                        |
| hardwareConcurrency           | 返回设备的处理器核心数量                                              |
| javaEnabled                   | 返回布尔值，表示浏览器是否启用了 Java                                 |
| language                      | 返回浏览器的主语言                                                    |
| languages                     | 返回浏览器偏好的语言数组                                              |
| locks                         | 返回暴露 Web Locks API 的 LockManager 对象                            |
| mediaCapabilities             | 返回暴露 Media Capabilities API 的 MediaCapabilities 对象             |
| mediaDevices                  | 返回可用的媒体设备                                                    |
| maxTouchPoints                | 返回设备触摸屏支持的最大触点数                                        |
| mimeTypes                     | 返回浏览器中注册的 MIME 类型数组                                      |
| onLine                        | 返回布尔值，表示浏览器是否联网                                        |
| oscpu                         | 返回浏览器运行设备的操作系统和（或）CPU                               |
| permissions                   | 返回暴露 Permissions API 的 Permissions 对象                          |
| platform                      | 返回浏览器运行的系统平台                                              |
| plugins                       | 返回浏览器安装的插件数组。在 IE 中，这个数组包含页面中所有<embed>元素 |
| product                       | 返回产品名称（通常是"Gecko"）                                         |
| productSub                    | 返回产品的额外信息（通常是 Gecko 的版本）                             |
| registerProtocolHandler()     | 将一个网站注册为特定协议的处理程序                                    |
| requestMediaKeySystemAccess() | 返回一个期约，解决为 MediaKeySystemAccess 对象                        |
| sendBeacon()                  | 异步传输一些小数据                                                    |
| serviceWorker                 | 返回用来与 ServiceWorker 实例交互的 ServiceWorkerContainer            |
| share()                       | 返回当前平台的原生共享机制                                            |
| storage                       | 返回暴露 Storage API 的 StorageManager 对象                           |
| userAgent                     | 返回浏览器的用户代理字符串                                            |
| vendor                        | 返回浏览器的厂商名称                                                  |
| vendorSub                     | 返回浏览器厂商的更多信息                                              |
| vibrate()                     | 触发设备振动                                                          |
| webdriver                     | 返回浏览器当前是否被自动化程序控制                                    |


navigator 对象的属性通常用于确定浏览器的类型。

## 检测插件

检测浏览器是否安装了某个插件时开发中常见的需求。除IE10及更低版本外的浏览器，都可以通过plugins数组来确定。这个数组中的每一项都包含如下属性：
- name：插件名称
- description：插件介绍
- filename：插件的文件名
- length：由当前插件处理的MINE类型数量

通常，name属性包含识别插件所需的必要信息，尽管不是特别准确。检测插件就是遍历浏览器中可用的插件，并逐个比较插件名称，如下：
```js
// 插件检测，IE10 及更低版本无效
let hasPlugin = function (name) {
  name = name.toLowerCase();
  for (let plugin of window.navigator.plugins) {
    if (plugin.name.toLowerCase().indexOf(name) > -1) {
      return true;
    }
  }
  return false;
};
// 检测 Flash
console.log(hasPlugin("Flash"));
// 检测 QuickTime
console.log(hasPlugin("QuickTime"));
```


这个 hasPlugin()方法接收一个参数，即待检测插件的名称。第一步是把插件名称转换为小写形式，以便于比较。然后，遍历 plugins 数组，通过 indexOf()方法检测每个 name 属性，看传入的名称是不是存在于某个数组中。比较的字符串全部小写，可以避免大小写问题。传入的参数应该尽可能独一无二，以避免混淆。

**旧版本 IE 中的插件检测**
在这些 IE中检测插件要使用专有的 ActiveXObject，并尝试实例化特定的插件。  
IE 中的插件是实现为 COM 对象的，由唯一的字符串标识。因此，要检测某个插件就必须知道其 COM 标识符。如下：
```js
// 在旧版本 IE 中检测插件
function hasIEPlugin(name) {
  try {
    new ActiveXObject(name);
    return true;
  } catch (ex) {
    return false;
  }
}
// 检测 Flash
console.log(hasIEPlugin("ShockwaveFlash.ShockwaveFlash"));
// 检测 QuickTime
console.log(hasIEPlugin("QuickTime.QuickTime"));
```

因为检测插件涉及两种方式，所以一般要针对特定插件写一个函数，而不是使用通常的检测函数。比如下面的例子：
```js
  // 在所有浏览器中检测 Flash
  function hasFlash() {
    var result = hasPlugin("Flash");
    if (!result) {
      result = hasIEPlugin("ShockwaveFlash.ShockwaveFlash");
    }
    return result;
  }
  // 在所有浏览器中检测 QuickTime
  function hasQuickTime() {
    var result = hasPlugin("QuickTime");
    if (!result) {
      result = hasIEPlugin("QuickTime.QuickTime");
    }
    return result;
  }
  // 检测 Flash
  console.log(hasFlash());
  // 检测 QuickTime
  console.log(hasQuickTime());
```


:::warning 注意
plugins 有一个 refresh()方法，用于刷新 plugins 属性以反映新安装的插件。这个方法接收一个布尔值参数，表示刷新时是否重新加载页面。如果传入 true，则所有
包含插件的页面都会重新加载。否则，只有 plugins 会更新，但页面不会重新加载。
:::

## 注册处理程序

现代浏览器支持 navigator 上的（在 HTML5 中定义的）registerProtocolHandler()方法。这个方法可以把一个网站注册为处理某种特定类型信息应用程序。

要使用 registerProtocolHandler()方法，必须传入 3 个参数：
- 要处理的协议（如"mailto"或"ftp"）
- 处理该协议的 URL
- 应用名称
比如，要把一个 Web 应用程序注册为默认邮件客户端，可以这样做：
```js
navigator.registerProtocolHandler("mailto","http://www.somemailclient.com?cmd=%s","Some Mail Client");
```

