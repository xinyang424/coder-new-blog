---
title: css功能
date: 2023-01-10
category:
  - vue3
tag:
  - vue3中新增的css功能
---

## 深度选择器
```vue
<style scoped>
.a :deep(.b) {
  /* ... */
}
</style>

```

## 插槽选择器
```vue
<style scoped>
:slotted(div) {
  color: red;
}
</style>

```

## 全局选择器
```vue
<style scoped>
:global(.red) {
  color: red;
}
</style>

```

## 混合使用局部与全局样式
同一个SFC两个`style`标签：
```vue
<style>
/* 全局样式 */
</style>

<style scoped>
/* 局部样式 */
</style>

```

## css Module
```vue
<template>
  <p :class="$style.red">This should be red</p>
</template>

<style module>
.red {
  color: red;
}
</style>

```