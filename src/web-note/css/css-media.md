---
title: CSS媒体查询
date: 2022-03-01
category:
  - CSS
tag:
  - CSS媒体查询
head:
  - - meta
    - name: keywords
      content: CSS媒体查询  | coder-new
---


## 示例代码

```css
@media (min-width: 1024px) {
  body {
    display: flex;
    place-items: center;
  }

  #app {
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding: 0 2rem;
  }
}
```