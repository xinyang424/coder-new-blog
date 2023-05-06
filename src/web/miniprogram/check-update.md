---
title: 微信小程序检测更新
date: 2022-03-01
category:
  - 小程序
---

## Taro示例代码
```js
const updateManager = Taro.getUpdateManager()
  updateManager.onCheckForUpdate(function (res) {
  // 请求完新版本信息的回调
  console.log(res.hasUpdate)
})
updateManager.onUpdateReady(function () {
  Taro.showModal({
    title: '更新提示',
    content: '新版本已经准备好，是否重启应用？',
    success: function (res) {
      if (res.confirm) {
        // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
        updateManager.applyUpdate()
      }
    }
  })
})
updateManager.onUpdateFailed(function () {
  // 新的版本下载失败
})
```
[文档地址](https://taro-docs.jd.com/docs/apis/base/update/getUpdateManager)


## 微信小程序示例代码
```js
const updateManager = wx.getUpdateManager()
updateManager.onCheckForUpdate(function (res) {
  // 请求完新版本信息的回调
  console.log(res.hasUpdate)
})
updateManager.onUpdateReady(function () {
  wx.showModal({
    title: '更新提示',
    content: '新版本已经准备好，是否重启应用？',
    success: function (res) {
      if (res.confirm) {
        // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
        updateManager.applyUpdate()
      }
    }
  })
})
updateManager.onUpdateFailed(function () {
  // 新版本下载失败
})
```

[文档地址](https://developers.weixin.qq.com/miniprogram/dev/api/base/update/UpdateManager.html)


## 注意事项

如果你第一次上传小程序不包含检测小程序版本升级的方法，但是第二次的时候加了检测小程序版本升级的方法，此时第二次线上版本是检测不到版本升级的。  
因此，在第二次添加了检测版本升级方法后，还是需要用户强制删除并加载第二个版本，此时往后第三个版本上线的时候，使用第二个版本的用户就可以检测到小程序版本升级了，但是第一次版本用户依然无法。

人性化完整示例代码（在onLaunch调用）
```js
// 获取小程序更新机制兼容
if (wx.canIUse('getUpdateManager')) {
  const updateManager = wx.getUpdateManager()
  updateManager.onCheckForUpdate(function (res) {
    // 请求完新版本信息的回调
    if (res.hasUpdate) {
      updateManager.onUpdateReady(function () {
        wx.showModal({
          title: '更新提示',
          content: '新版本已经准备好，是否重启应用？',
          success: function (res) {
            if (res.confirm) {
              // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
              updateManager.applyUpdate()
            }
          }
        })
      })
      updateManager.onUpdateFailed(function () {
        // 新的版本下载失败
        wx.showModal({
          title: '已经有新版本了哟~',
          content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~',
        })
      })
    }
  })
} else {
  // 如果希望用户在最新版本的客户端上体验您的小程序，可以这样子提示
  wx.showModal({
    title: '提示',
    content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
  })
}
```


