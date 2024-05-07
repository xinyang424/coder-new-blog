---
title: 自生成签名
date: 2023-07-26
category:
  - 小程序
---

<!-- more -->

```js
wx.config({
  debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
  appId: '', // 必填，公众号的唯一标识
  timestamp: , // 必填，生成签名的时间戳
  nonceStr: '', // 必填，生成签名的随机串
  signature: '',// 必填，签名
  jsApiList: [] // 必填，需要使用的JS接口列表
});
```

`wx.confg`中的对象，有个必传值就是`signature`，可以从[官方工具](https://mp.weixin.qq.com/debug/cgi-bin/sandbox?t=jsapisign)进行在线生成。但是最终我们是要通过代码来实现的，这里介绍由JS实现自生成签名。



这里需要用到`jssha`，[GitHub仓库](https://github.com/Caligatio/jsSHA)，安装命令：
```shell
npm install jssha
```




::: details 查看示例代码

::: code-tabs#shell

@tab config.js
```js
const _charStr = "abacdefghjklmnopqrstuvwxyzABCDEFGHJKLMNOPQRSTUVWXYZ0123456789";

/**
 * 随机生成索引
 * @param min 最小值
 * @param max 最大值
 * @param i 当前获取位置
 */
const RandomIndex = (min, max, i) => {
  let index = Math.floor(Math.random() * (max - min + 1) + min),
    numStart = _charStr.length - 10;
  if (i == 0 && index >= numStart) {
    index = RandomIndex(min, max, i);
  }
  return index;
};

/**
 * 随机生成字符串
 * @param len 指定生成字符串长度
 */
const getRandomString = len => {
  let min = 0,
    max = _charStr.length - 1,
    _str = "";
  len = len || 15;
  for (let i = 0, index; i < len; i++) {
    index = RandomIndex(min, max, i);
    _str += _charStr[index];
  }
  return _str;
};

const appID = "";//公众号的appID ，如果有正式公众号在登录：https://mp.weixin.qq.com/，没有就在测试公众号平台登录：https://mp.weixin.qq.com/debug/cgi-bin/sandbox?t=sandbox/login

const appsecret = "";//公众号的appsecret

const timestamp = new Date().getTime();

//随机字符串
const noncestr = getRandomString(16);

//我根据生产环境和开发环境获取当前页面的url，这里仅支持hash模式路由，若想支持history模式路由可以继续完善，但要注意记得在公众号后台将此域名加在安全域名列表里面
const url = process.env.NODE_ENV === "development" ? "http://195.2.199.160/scwz_wxgh/" : location.href.split("#")[0];

export { appID, appsecret, timestamp, noncestr, url };

```

@tab fetch.js
```js
import { appID, appsecret, timestamp, url, noncestr } from "./config";
import { Toast, Dialog } from "vant";
import jsSHA from "jssha";
//先获取access_token，再获取jsapi_ticket
const getTicket = () => {
  Toast.loading({
    message: "加载中...",
    forbidClick: true,
    overlay: true,
    duration: 0,
  });
  return new Promise((resolve, reject) => {
    fetch(`/wxAPI/cgi-bin/token?grant_type=client_credential&appid=${appID}&secret=${appsecret}`, {
      headers: {
        "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
      },
    })
      .then(response => response.json())
      .then(data => {
        if (!data.access_token) {
          //获取access_token失败
          Toast.clear();
          Dialog.alert({
            message: data?.errmsg,
            confirmButtonColor: "#896F62",
          }).then(() => {
            // on close
          });
          return;
        }
        fetch(`/wxAPI/cgi-bin/ticket/getticket?access_token=${data.access_token}&type=jsapi`, {
          headers: {
            "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
          },
        })
          .then(response => response.json())
          .then(data => {
            if (data.ticket) {
              Toast.clear();
              resolve(data.ticket);
            } else {
              Toast.clear();
              Dialog.alert({
                message: data?.errmsg,
                confirmButtonColor: "#896F62",
              }).then(() => {
                // on close
              });
            }
          })
          .catch(error => {
            Toast.clear();
            Dialog.alert({
              message: error,
              confirmButtonColor: "#896F62",
            }).then(() => {
              // on close
            });
          });
      })
      .catch(error => {
        Toast.clear();
        Dialog.alert({
          message: error,
          confirmButtonColor: "#896F62",
        }).then(() => {
          // on close
        });
      });
  });
};

//根据获取的jsapi_ticket进行签名生成signature
const getSignature = async () => {
  const ticket = await getTicket();
  const shaObj = new jsSHA("SHA-1", "TEXT");
  shaObj.update(`jsapi_ticket=${ticket}&noncestr=${noncestr}&timestamp=${timestamp}&url=${url}`);
  return shaObj.getHash("HEX");
};

export default getSignature;

```

@tab router.js
```js
import getSignature from "@/utils/fetch.js";
import { appID, timestamp, noncestr } from "@/utils/config.js";

//初始化JS-SDK配置
const initSDK = async () => {
  wx.config({
    debug: process.env.NODE_ENV === "development",//只在生产模式下开启debug，在手机上调试或者微信开发者工具会有弹窗提示以及控制台输出
    appId: appID,
    timestamp: timestamp,
    nonceStr: noncestr,
    signature: await getSignature(),
    jsApiList: ["scanQRCode"],
  });
};
```


@tab home.vue
```vue
<script>
export default {
    methods:{
    //扫描二维码
    startScanQRCode(href) {
      wx.ready(() => {
        wx.scanQRCode({
          needResult: 1,
          scanType: ["qrCode"],
          success: async res => {
            Toast.loading({
              message: "加载中...",
              forbidClick: true,
              overlay: true,
              duration: 0,
            });
            const result = await res.resultStr;
            Toast.clear();
            this.$router.push({ path: href, query: { id: result } });
          },
          error: error => {
            Dialog.alert({
              message: error,
              confirmButtonColor: "#896F62",
            }).then(() => {
              // on close
            });
          },
        });
      });
    },
    }
}
</script>
```

:::


**补充：**
1. [JS-SDK使用教程](https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/JS-SDK.html)
2. [自生成签名过程](https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/JS-SDK.html#62)