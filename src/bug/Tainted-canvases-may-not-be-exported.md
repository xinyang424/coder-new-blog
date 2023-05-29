---
title: Failed to execute 'toDataURL' on 'HTMLCanvasElement' Tainted canvases may not be exported.
date: 2023-05-29
category:
  - bug记录
---

:::danger
Uncaught DOMException: Failed to execute 'toDataURL' on 'HTMLCanvasElement': Tainted canvases may not be exported.
:::


大概意思是canvas无法执行toDataURL方法：污染的画布无法输出。

经google 发现原来是受限于 CORS 策略，会存在跨域问题，虽然可以使用图像（比如append到页面上）但是绘制到画布上会污染画布，一旦一个画布被污染,就无法提取画布的数据，比如无法使用使用画布toBlob(),toDataURL(),或getImageData()方法;当使用这些方法的时候 会抛出一个安全错误。


```js
const cvs = document.querySelector("#cvs");
cvs.width = 480;
cvs.height = 270;
if (cvs.getContext("2d")) {
  const ctx = cvs.getContext("2d");
  const img = new Image();
  img.src = "https://picsum.photos/1920/1080";
  img.setAttribute("crossOrigin", "Anonymous"); //加上这就话就不会报错了
  img.onload = () => {
    ctx.drawImage(img, 0, 0);
    const base64 = cvs.toDataURL("image/jpeg", 0.5);
    console.log(base64);
  };
}
```








