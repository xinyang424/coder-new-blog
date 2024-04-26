---
title: 开发中常用API集合
date: 2021-12-12
category:
  - 实用技巧
---

### 判断某个坐标是否在电子围栏内

:::details 查看代码
```ts
/**
 * 判断当前位置是否在电子围栏内(注意坐标类型都是wgs84)
 * @param currentPoint  当前位置坐标，如：[longitude, latitude]
 * @param polygonPoint  电子围栏坐标，如：[ [longitude, latitude], [longitude, latitude] ]
 */
export const useIsPointInPolygon = (userLocation: [number, number], fence: [number, number][]): boolean => {
  const userLongitude = userLocation[0];
  const userLatitude = userLocation[1];

  // 通过射线法判断点是否在多边形内部
  let isIn = false;
  for (let i = 0, j = fence.length - 1; i < fence.length; j = i++) {
    const fenceLongitude1 = fence[i][0];
    const fenceLatitude1 = fence[i][1];
    const fenceLongitude2 = fence[j][0];
    const fenceLatitude2 = fence[j][1];

    // 判断点与多边形的边是否相交
    const intersect =
      fenceLatitude1 > userLatitude !== fenceLatitude2 > userLatitude &&
      userLongitude < ((fenceLongitude2 - fenceLongitude1) * (userLatitude - fenceLatitude1)) / (fenceLatitude2 - fenceLatitude1) + fenceLongitude1;
    if (intersect) isIn = !isIn;
  }

  console.log("isIn", isIn);

  return isIn;
};

```
:::

### wgs84与gcj02坐标类型互转

:::details 查看代码
```ts
const x_PI: number = (3.14159265358979324 * 3000.0) / 180.0;
const PI: number = 3.1415926535897932384626;
const a: number = 6378245.0; //卫星椭球坐标投影到平面地图坐标系的投影因子。
const ee: number = 0.00669342162296594323; //椭球的偏心率。

/**
 * 判断是否是中国范围内的坐标
 * @param {array} coordinate 传入坐标，格式：[经度, 纬度]
 * @returns {boolean} 是否在中国范围内
 */
const out_of_china = (coordinate: Coordinate): boolean => {
  return coordinate[0] < 72.004 || coordinate[0] > 137.8347 || coordinate[1] < 0.8293 || coordinate[1] > 55.8271 || false;
};

/**
 * 转为纬度
 * @param {number} lng 经度
 * @param {number} lat 纬度
 * @returns  {number} 转化后的纬度
 */
const transformlat = (lng: number, lat: number): number => {
  let ret: number = -100.0 + 2.0 * lng + 3.0 * lat + 0.2 * lat * lat + 0.1 * lng * lat + 0.2 * Math.sqrt(Math.abs(lng));
  ret += ((20.0 * Math.sin(6.0 * lng * PI) + 20.0 * Math.sin(2.0 * lng * PI)) * 2.0) / 3.0;
  ret += ((20.0 * Math.sin(lat * PI) + 40.0 * Math.sin((lat / 3.0) * PI)) * 2.0) / 3.0;
  ret += ((160.0 * Math.sin((lat / 12.0) * PI) + 320 * Math.sin((lat * PI) / 30.0)) * 2.0) / 3.0;
  return ret;
};
/**
 * 转为经度
 * @param {number} lng 经度
 * @param {number} lat 纬度
 * @returns  {number} 转化后的经度
 */
const transformlng = (lng: number, lat: number): number => {
  let ret: number = 300.0 + lng + 2.0 * lat + 0.1 * lng * lng + 0.1 * lng * lat + 0.1 * Math.sqrt(Math.abs(lng));
  ret += ((20.0 * Math.sin(6.0 * lng * PI) + 20.0 * Math.sin(2.0 * lng * PI)) * 2.0) / 3.0;
  ret += ((20.0 * Math.sin(lng * PI) + 40.0 * Math.sin((lng / 3.0) * PI)) * 2.0) / 3.0;
  ret += ((150.0 * Math.sin((lng / 12.0) * PI) + 300.0 * Math.sin((lng / 30.0) * PI)) * 2.0) / 3.0;
  return ret;
};

/**
 * wgs84 和 gcj02 坐标互转
 * @param {array} coordinate 传入坐标，格式：[经度, 纬度]
 * @param {string} type 默认值为："wgs84-gcj02"，即wgs84转gcj02，可选值为："gcj02-wgs84"
 * @returns {array} 转化结果，格式：[经度, 纬度]
 */
export const useCoordinateTransform = (coordinate: Coordinate, type: string = "wgs84-gcj02"): Coordinate => {
  if (out_of_china(coordinate)) return coordinate;
  if (type === "wgs84-gcj02") {
    var dlat = transformlat(coordinate[0] - 105.0, coordinate[1] - 35.0);
    var dlng = transformlng(coordinate[0] - 105.0, coordinate[1] - 35.0);
    var radlat = (coordinate[1] / 180.0) * PI;
    var magic = Math.sin(radlat);
    magic = 1 - ee * magic * magic;
    var sqrtmagic = Math.sqrt(magic);
    dlat = (dlat * 180.0) / (((a * (1 - ee)) / (magic * sqrtmagic)) * PI);
    dlng = (dlng * 180.0) / ((a / sqrtmagic) * Math.cos(radlat) * PI);
    var mglat = coordinate[1] + dlat;
    var mglng = coordinate[0] + dlng;

    return [mglng, mglat];
  } else if (type === "gcj02-wgs84") {
    var dlat = transformlat(coordinate[0] - 105.0, coordinate[1] - 35.0);
    var dlng = transformlng(coordinate[0] - 105.0, coordinate[1] - 35.0);
    var radlat = (coordinate[1] / 180.0) * PI;
    var magic = Math.sin(radlat);
    magic = 1 - ee * magic * magic;
    var sqrtmagic = Math.sqrt(magic);
    dlat = (dlat * 180.0) / (((a * (1 - ee)) / (magic * sqrtmagic)) * PI);
    dlng = (dlng * 180.0) / ((a / sqrtmagic) * Math.cos(radlat) * PI);
    mglat = coordinate[1] + dlat;
    mglng = coordinate[0] + dlng;
    return [coordinate[0] * 2 - mglng, coordinate[1] * 2 - mglat];
  }
  return coordinate;
};

```
:::


### useVModel
:::details 查看代码
```ts
import { computed } from "vue";
export const useVModel = (props: AnyObject, propName: string, emit: (...args: any) => void) => {
  return computed({
    get() {
      return new Proxy(props, {
        set(obj, name, val) {
          emit("update:" + propName, {
            ...obj,
            [name]: val,
          });
          return true;
        },
      });
    },
    set(val) {
      emit("update:" + propName, val);
    },
  });
};

```
:::


### useSelecterNodeInfo

:::details 查看代码
```ts
import { getCurrentInstance } from "vue";
export const useSelecterNodeInfo = (selector: string): Promise<UniApp.NodeInfo | UniApp.NodeInfo[]> => {
  const query = uni.createSelectorQuery().in(getCurrentInstance());
  return new Promise(resolve => {
    query
      .select(selector)
      .boundingClientRect((nodeRef: UniApp.NodeInfo | UniApp.NodeInfo[]) => {
        resolve(nodeRef);
      })
      .exec();
  });
};

```
:::

### useGetStringSize

:::details 查看代码
```ts
export const useGetStringSize = (str: string): number => {
  let len: number = 0;
  for (let i = 0; i < str.length; i++) {
    const code = str.charCodeAt(i);
    if (code <= 0x007f) {
      len += 1;
    } else if (code <= 0x07ff) {
      len += 2;
    } else if (code <= 0xffff) {
      len += 3;
    } else {
      len += 4;
    }
  }
  return len;
};
```
:::

### canvas签名

:::details 查看代码
```vue
<template>
  <div class="sign" v-if="show">
    <header :class="[isFullScreen ? 'header-rotate' : '']">
      <p>签名板</p>
      <div>
        <button @click.capture="controlFullScreen">
          <full-screen-icon v-if="!isFullScreen"></full-screen-icon>
          <off-screen-icon v-else></off-screen-icon>
          <span>{{ isFullScreen ? "还原" : "全屏" }}</span>
        </button>
        <button @click.capture="signComplete">
          <check-icon></check-icon>
          <span>确定</span>
        </button>
        <button @click.capture="revoke">
          <revoke-icon></revoke-icon>
          <span>撤回</span>
        </button>
        <button @click.capture="clearSign">
          <clear-icon></clear-icon>
          <span>清空</span>
        </button>
      </div>
    </header>
    <div class="sign-container" :class="[isFullScreen ? 'sign-container-rotate' : '']" ref="container">
      <canvas ref="cvs" @touchstart="signStart" @touchmove="signMove" @touchend="signEnd" :width="cvsSize.width" :height="cvsSize.height"></canvas>
    </div>
    <div class="tip" v-if="!isFullScreen">注意：全屏或退出全屏会将已签名内容清空，需再次重新签名！</div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, nextTick, onMounted } from "vue";
import { Dialog, Snackbar } from "@varlet/ui";
import http from "@/utils/http";
import { encryptData } from "@/utils/http/libs";
import "@varlet/ui/es/dialog/style/index.mjs";
import "@varlet/ui/es/snackbar/style";
useHead({
  title: "消防验收 | 签名",
});
const show = ref<boolean>(false);
const router = useRouter();
const container = ref<HTMLDivElement>();
const cvs = ref<HTMLCanvasElement>();
const isFullScreen = ref<boolean>(false);
const cvsSize = reactive<{
  width: number;
  height: number;
  offsetTop: number;
  offsetLeft: number;
}>({
  width: 0,
  height: 0,
  offsetTop: 0,
  offsetLeft: 0,
});
/**
 * 上一页面数据
 */
const previousPageData = {
  itemID: "",
  QRID: "",
  code: "",
  platform: "APP",
};

// 画笔
let ctx: CanvasRenderingContext2D | null | undefined;
// 是否绘画过
let isPainting: boolean = false;

let historyPath: Array<ImageData> = [];

const startPosition = {
  startX: 0,
  startY: 0,
};

// 初始画布
const initCanvas = async () => {
  cvsSize.width = container.value?.clientWidth || 0;
  cvsSize.height = container.value?.clientHeight || 0;
  cvsSize.offsetTop = container.value?.offsetTop || 0;
  cvsSize.offsetLeft = container.value?.offsetLeft || 0;

  ctx = cvs.value?.getContext("2d");
  await nextTick();
  clearSign();
};

// 落笔
const signStart = (event: TouchEvent) => {
  startPosition.startX = event.touches[0].pageX - cvsSize.offsetLeft;
  startPosition.startY = event.touches[0].pageY - cvsSize.offsetTop;
};
// 开始画
const signMove = (event: TouchEvent) => {
  if (startPosition.startX !== 0 && !isPainting) {
    isPainting = true;
  }
  const { pageX, pageY } = event.touches[0];
  ctx?.beginPath();
  ctx!.strokeStyle = "#333333";
  ctx!.lineWidth = 4;
  ctx!.lineCap = "round";
  ctx!.lineJoin = "round";
  ctx?.moveTo(startPosition.startX, startPosition.startY);
  ctx?.lineTo(pageX - cvsSize.offsetLeft, pageY - cvsSize.offsetTop);
  ctx?.closePath();
  ctx?.stroke();
  startPosition.startX = pageX - cvsSize.offsetLeft;
  startPosition.startY = pageY - cvsSize.offsetTop;
};
// 起笔
const signEnd = (event: TouchEvent) => {
  isPainting = false;
  const imgData: ImageData = ctx?.getImageData(0, 0, cvsSize.width, cvsSize.height) as ImageData;
  historyPath.push(imgData);
};

// 清除签名
const clearSign = () => {
  ctx?.clearRect(0, 0, cvsSize.width, cvsSize.height);
  ctx!.fillStyle = "#ffffff";
  ctx?.fillRect(0, 0, cvsSize.width, cvsSize.height);
  historyPath.length = 0;
};
// 撤回
const revoke = () => {
  if (!historyPath.length) return;
  historyPath.pop();
  if (!historyPath.length) {
    clearSign();
    return;
  }
  ctx?.putImageData(historyPath[historyPath.length - 1], 0, 0);
};
// 签名完成
const signComplete = () => {
  if (!historyPath.length) {
    Dialog({
      title: "提示",
      message: "请先进行签名！",
      cancelButton: false,
    });
    return;
  }
  Snackbar({
    type: "loading",
    content: "签名提交中",
    lockScroll: true,
    forbidClick: true,
  });
  rotateImg(cvs.value?.toDataURL() as string, isFullScreen.value ? 270 : 0).then(base64 => {
    const file = base64toFile(base64, previousPageData.QRID);

    http({
      api: previousPageData.platform === "APP" ? "tywjglAjaxProxy.upload" : "qrCodeCommonAjaxProxy.upload",
      data: file,
      path:
        "/*.AS?" +
        encryptData({ name: file.name, size: file.size, type: file.type }, "java", previousPageData.platform === "APP" ? "tywjglAjaxProxy.upload" : "qrCodeCommonAjaxProxy.upload", false, "upload"),
      headers: {
        "Content-Type": "application/octet-stream",
        authorization: sessionStorage.getItem("id") || "",
      },
      encrypt: false,
    }).then(res => {
      if (res.code === "1") {
        Snackbar.clear();
        Dialog({
          title: "错误提示",
          message: "文件上传出错" + res.msg,
          cancelButton: false,
        });
      } else {
        http({
          api: previousPageData.platform === "APP" ? "xfysXcpdDpdAjaxProxy.pdjhSign" : "qrCodeCommonAjaxProxy.saveSignInfo",
          data: {
            C_JLBH: previousPageData.QRID,
            C_PDJHBH: previousPageData.itemID,
            code: previousPageData.code, //短信验证码
            C_QMEWMTP: res.data, // 签名的图片GUID
          },
        }).then(res => {
          Snackbar.clear();
          if (res.code === "0") {
            router.push({ path: "/success", state: { sign: true, platform: previousPageData.platform }, replace: true });
          } else {
            Dialog({
              title: "错误提示",
              message: res.msg,
              cancelButton: false,
            });
          }
        });
      }
    });
  });
};

// 旋转图片
const rotateImg = (url: string, rotate: number): Promise<string> => {
  return new Promise((resolve, reject) => {
    const img: HTMLImageElement = new Image();
    img.src = url;
    img.setAttribute("crossOrigin", "Anonymous");
    img.onload = () => {
      const canvas: HTMLCanvasElement = document.createElement("canvas");
      const context: CanvasRenderingContext2D = canvas.getContext("2d") as CanvasRenderingContext2D;
      let originWidth = img.width;
      let originHeight = img.height;
      let maxWidth = 400; //500 150
      let maxHeight = 300; //400 100
      let targetWidth = originWidth;
      let targetHeight = originHeight;
      if (originWidth > maxWidth || originHeight > maxHeight) {
        if (originWidth / originHeight > maxWidth / maxHeight) {
          targetWidth = maxWidth;
          targetHeight = Math.floor(maxWidth * (originHeight / originWidth));
        } else {
          targetWidth = Math.floor(maxHeight * (originWidth / originHeight));
          targetHeight = maxHeight;
        }
      }
      if (rotate > 45 && rotate <= 135) {
        canvas.width = targetHeight;
        canvas.height = targetWidth;
      } else if (rotate > 225 && rotate <= 315) {
        canvas.width = targetHeight;
        canvas.height = targetWidth;
      } else {
        canvas.width = targetWidth;
        canvas.height = targetHeight;
      }
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.translate(canvas.width / 2, canvas.height / 2);
      context.rotate((rotate * Math.PI) / 180);
      context.translate(-canvas.width / 2, -canvas.height / 2);
      context.drawImage(img, canvas.width / 2 - targetWidth / 2, canvas.height / 2 - targetHeight / 2, targetWidth, targetHeight);
      context.translate(canvas.width / 2, canvas.height / 2);
      context.rotate((-rotate * Math.PI) / 180);
      context.translate(-canvas.width / 2, -canvas.height / 2);
      context.restore();
      const base64: string = canvas.toDataURL("image/jpg", 0.5);
      resolve(base64);
    };

    img.onerror = () => {
      reject("");
    };
    img.setAttribute("crossOrigin", "anonymous");
  });
};

/**
 * 控制全屏
 */
const controlFullScreen = () => {
  isFullScreen.value = !isFullScreen.value;
  setTimeout(() => {
    initCanvas();
  }, 400);
};

/**
 * 初始化页面
 */
const initPage = () => {
  if (typeof window !== "undefined" && typeof history !== "undefined") {
    if (history.state.QRID && history.state.code) {
      previousPageData.itemID = history.state.itemID || "";
      previousPageData.QRID = history.state.QRID;
      previousPageData.code = history.state.code;
      previousPageData.platform = history.state.platform;
      show.value = true;
    } else {
      router.push({ path: "/", replace: true });
    }
  }
};

/**
 * base64转file
 */

const base64toFile = (base64: string, filename: string): File => {
  const arr: string[] = base64.split(",");
  const bstr = atob(arr[1]);
  let n: number = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: "image/jpg" });
};

initPage();
onMounted(async () => {
  await nextTick();
  show.value && initCanvas();
});
</script>

<style lang="scss" scoped>
.sign {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  overflow: hidden;
  background-color: #f7f4f8;

  position: relative;
  header {
    width: 100vw;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #5f5f5f;
    transform-origin: top left;
    padding: 20px 30px;
    transition: all 0.3s ease-in-out;

    p {
      font-size: 30px;
      font-weight: 400;
      color: initial;
    }
    & > div {
      display: flex;

      button {
        background-color: transparent;
        border: none;
        display: flex;
        align-items: center;
        margin-left: 50px;
        svg {
          width: 25px;
          height: 25px;
        }
        span {
          margin-left: 8px;
          white-space: nowrap;
          color: initial;
          font-size: 25px;
        }
      }
    }
  }
  &-container {
    background-color: #fff;
    overflow: hidden;
    border-radius: 10px;
    border: 3px dashed #e1e1e1;
    transition: all 0.3s ease-in-out;
    margin: 20px 30px;
    height: 400px;
  }
  .tip {
    margin-top: 50px;
    padding-left: 28px;
    font-size: 25px;
    color: #ff444f;
  }
  .header-rotate {
    width: calc(100vh - 64px);
    transform: rotate(90deg) translate(0, -750px);
    position: absolute;
    left: -32px;
    top: 32px;
    padding: 0 10px;
  }
  &-container-rotate {
    margin: 32px 90px 32px 50px;
    height: calc(100vh - 64px);
  }
}
</style>

```
:::