---
title: 组件
date: 2023-01-10
---

## 全局组件

## 局部组件

## Transition 动画组件

Transition动画效果由以下条件触发：
1. `v-if`触发
2. `v-show`触发
3. `<component>`切换的动态组件触发
4. 改变特殊的 `key` 属性

**基本使用**
```vue
<template>
    <button @click="show = !show">Toggle</button>
    <Transition>
        <p v-if="show">hello</p>
    </Transition>
</template>

<style>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
```

当一个`<Transition>`组件中的元素被插入或移除时，会发生下面这些事情：
1. Vue 会自动检测目标元素是否应用了 CSS 过渡或动画。如果是，则一些 CSS 过渡 class 会在适当的时机被添加和移除。
2. 如果有作为监听器的 JavaScript 钩子，这些钩子函数会在适当时机被调用。
3. 如果没有探测到 CSS 过渡或动画、也没有提供 JavaScript 钩子，那么 DOM 的插入、删除操作将在浏览器的下一个动画帧后执行。

**基于css的过渡效果**
一共有6个应用于进入与离开过渡效果的css class。
![](./images/css-class.png)
1. `v-enter-from`：进入动画的起始状态。在元素插入之前添加，在元素插入完成后的下一帧移除。
2. `v-enter-active`：进入动画的生效状态。应用于整个进入动画阶段。在元素被插入之前添加，在过渡或动画完成之后移除。这个 class 可以被用来定义进入动画的持续时间、延迟与速度曲线类型。
3. `v-enter-to`：进入动画的结束状态。在元素插入完成后的下一帧被添加 (也就是 `v-enter-from` 被移除的同时)，在过渡或动画完成之后移除。
4. `v-leave-from`：离开动画的起始状态。在离开过渡效果被触发时立即添加，在一帧后被移除。
5. `v-leave-active`：离开动画的生效状态。应用于整个离开动画阶段。在离开过渡效果被触发时立即添加，在过渡或动画完成之后移除。这个 class 可以被用来定义离开动画的持续时间、延迟与速度曲线类型。
6. `v-leave-to`：离开动画的结束状态。在一个离开动画被触发后的下一帧被添加 (也就是 `v-leave-from` 被移除的同时)，在过渡或动画完成之后移除。
`v-enter-active` 和 `v-leave-active` 提供了为进入和离开动画指定不同速度曲线的能力，我们将在下面的小节中看到一个示例。

**为动画效果命名**
```vue
<template>
    <Transition name="fade">
    ...
    </Transition>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

```

对于大多数的 CSS 动画，我们可以简单地在 *-enter-active 和 *-leave-active class 下声明它们。

**自定义过渡class**
你也可以向 `<Transition>` 传递以下的 props 来指定自定义的过渡 class：
- `enter-from-class`
- `enter-active-class`
- `enter-to-class`
- `leave-from-class`
- `leave-active-class`
- `leave-to-class`

简单示例：
```vue
<!-- 假设你已经在页面中引入了 Animate.css -->
<Transition
  name="custom-classes"
  enter-active-class="animate__animated animate__tada"
  leave-active-class="animate__animated animate__bounceOutRight"
>
  <p v-if="show">hello</p>
</Transition>

```

**同时使用 transition 和 animation**
通过type来控制`<transition>`组件关注哪种类型的动画效果
```vue
<Transition type="animation">...</Transition>
<Transition type="transition">...</Transition>
```

## KeepAlive 缓存组件

**基本使用**
```vue
<KeepAlive>
  <component :is="activeComponent" />
</KeepAlive>
<!-- 或 -->
<KeepAlive>
  <AComponent />
  <BComponent />
</KeepAlive>
```
**参数说明**
| 参数    | 类型               | 说明        |
| :------ | :----------------- | :---------- |
| include | string、Reg、Array | 包含/排除， |
| max     | number             | 最大缓存数  |

**include使用示例**
```vue
<!-- 以英文逗号分隔的字符串 -->
<KeepAlive include="a,b">
  <component :is="view" />
</KeepAlive>

<!-- 正则表达式 (需使用 `v-bind`) -->
<KeepAlive :include="/a|b/">
  <component :is="view" />
</KeepAlive>

<!-- 数组 (需使用 `v-bind`) -->
<KeepAlive :include="['a', 'b']">
  <component :is="view" />
</KeepAlive>

```

**最大缓存数**
如果缓存的实例数量即将超过指定的那个最大数量，则最久没有被访问的缓存实例将被销毁，以便为新的实例腾出空间。

**缓存实例的生命周期**
```vue
<script setup>
import { onActivated, onDeactivated } from 'vue'

onActivated(() => {
  // 调用时机为首次挂载
  // 以及每次从缓存中被重新插入时
})

onDeactivated(() => {
  // 在从 DOM 上移除、进入缓存
  // 以及组件卸载时调用
})
</script>

```

注意：
- `onActivated` 在组件挂载时也会调用，并且 `onDeactivated` 在组件卸载时也会调用。
- 这两个钩子不仅适用于 `<KeepAlive>` 缓存的根组件，也适用于缓存树中的后代组件

## Teleport 传送组件

**基本使用**
```vue
<button @click="open = true">Open Modal</button>

<Teleport to="body">
  <div v-if="open" class="modal">
    <p>Hello from the modal!</p>
    <button @click="open = false">Close</button>
  </div>
</Teleport>
```

**多个Teleport共享目标**
就是简单的顺序追加：
```vue
<Teleport to="#modals">
  <div>A</div>
</Teleport>
<Teleport to="#modals">
  <div>B</div>
</Teleport>
```
以上代码会被渲染为：
```html
<div id="modals">
  <div>A</div>
  <div>B</div>
</div>

```

**参数说明**
| 参数     | 类型                | 说明                                                         |
| :------- | :------------------ | :----------------------------------------------------------- |
| to       | string、HTMLElement | 传送到目前节点下，不是同级而是父子关系，参数格式：body、#app |
| disabled | boolean             | 是否禁用                                                     |

## suspense 异步组件

