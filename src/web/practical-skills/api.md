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