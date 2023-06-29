---
title: 图片拖动对比
date: 2023-05-16
category:
  - Cookbook
---


<!-- more -->

:::normal-demo 案例
```css

body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  background-color: #000;
}
.container {
  width: 600px;
  height: 400px;
  margin: 10% auto;
  border-radius: 4px;
  position: relative;
  border: 2px solid #fff;
}
.photo {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-size: 600px 100%;
}
.bg_pic {
  background-image: url(https://e-assets.gitee.com/gitee-community-web/_next/static/media/project-bg-kanban.9f254c8f.jpg!/quality/100);
}
.toggle_pic {
  width: 50%;
  background-image: url(https://e-assets.gitee.com/gitee-community-web/_next/static/media/project-bg-scrum.f4535269.jpg!/quality/100);
}
.progress {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  appearance: none;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.3);
  outline: none;
  margin: 0;
  transition: all 0.3s;
}
.progress:hover {
  background: rgba(243, 243, 243, 0.1);
}
.progress::-webkit-slider-thumb {
  appearance: none;
  width: 5px;
  height: 500px;
  background-color: skyblue;
  cursor: col-resize;
}
```

```html
<div class="container">
    <div class="photo bg_pic"></div>
    <div class="photo toggle_pic"></div>
    <input type="range" min="1" max="100" value="50" class="progress" name="progress" />
</div>
```

```js
let position;
const progress = document.querySelector(".progress");
const dom = document.querySelector(".toggle_pic");
progress.addEventListener("input", e => {
  position = e.target.value;
  console.log(position);
  dom.style.width = `${position}%`;
});
```

:::

