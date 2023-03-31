---
title: 暗色系与亮色系
date: 2022-03-01
category:
  - CSS
tag:
  - CSS的亮色系与暗色系实现
head:
  - - meta
    - name: keywords
      content: 暗色系与亮色系实现  | coder-new
---

## CSS获取系统主题
```css
:root {
  --vt-c-white: #ffffff;
  --vt-c-white-soft: #f8f8f8;
  --vt-c-white-mute: #f2f2f2;

  --vt-c-black: #181818;
  --vt-c-black-soft: #222222;
  --vt-c-black-mute: #282828;

  --vt-c-indigo: #2c3e50;

  --vt-c-divider-light-1: rgba(60, 60, 60, 0.29);
  --vt-c-divider-light-2: rgba(60, 60, 60, 0.12);
  --vt-c-divider-dark-1: rgba(84, 84, 84, 0.65);
  --vt-c-divider-dark-2: rgba(84, 84, 84, 0.48);

  --vt-c-text-light-1: var(--vt-c-indigo);
  --vt-c-text-light-2: rgba(60, 60, 60, 0.66);
  --vt-c-text-dark-1: var(--vt-c-white);
  --vt-c-text-dark-2: rgba(235, 235, 235, 0.64);
}

/* semantic color variables for this project */
:root {
  --color-background: var(--vt-c-white);
  --color-background-soft: var(--vt-c-white-soft);
  --color-background-mute: var(--vt-c-white-mute);

  --color-border: var(--vt-c-divider-light-2);
  --color-border-hover: var(--vt-c-divider-light-1);

  --color-heading: var(--vt-c-text-light-1);
  --color-text: var(--vt-c-text-light-1);

  --section-gap: 160px;
}
/* 或 */
@media (prefers-color-scheme: light) {
  body {
    background: #fff;
    color: #333;
  }
}

@media (prefers-color-scheme: dark) {
  :root {
    --color-background: var(--vt-c-black);
    --color-background-soft: var(--vt-c-black-soft);
    --color-background-mute: var(--vt-c-black-mute);

    --color-border: var(--vt-c-divider-dark-2);
    --color-border-hover: var(--vt-c-divider-dark-1);

    --color-heading: var(--vt-c-text-dark-1);
    --color-text: var(--vt-c-text-dark-2);
  }
}
```

## JS获取系统主题
```javascript
const themeMedia = window.matchMedia("(prefers-color-scheme: light)");
if (themeMedia.matches) {
  console.log('light')
} else {
  console.log('dark')
}
```

## JS监听系统主题变化
```javascript
const themeMedia = window.matchMedia("(prefers-color-scheme: light)");
themeMedia.addListener(e => {
    if (e.matches) {
        console.log('light')
    } else {
        console.log('dark')
    }
});
```

## JS修改:root实现换肤
```javascript
document.documentElement.style.setProperty(`--light`, style);
```
