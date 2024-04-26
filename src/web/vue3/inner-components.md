---
title: 内置组件
date: 2024-04-25
category:
  - vue3
---

### Transition

`Transition`是一个内置组件，这意味着它在任意位置都是可以直接被使用而无需注册。它可以将进入和离开的动画应用到通过默认插槽传递给它的元素或组件上。进入或离开都可以由以下的条件之一触发：

- 由`v-if`所触发的切换

- 由`v-show`所触发的切换

- 由特殊元素`<component>`切换的动态组件

- 改变特殊的`key`属性

> 注意
>
> `<Transition>`仅支持单个元素或组件作为其插槽的内容。如果内容是一个组件，这个组件必须仅有一个根元素。



### TransitionGroup



### KeepAlive

#### 基本使用

```vue
<!-- 非活跃的组件将会被缓存！ -->
<KeepAlive>
  <component :is="activeComponent" />
</KeepAlive>
```

#### 包含/排除

`<KeepAlive>` 默认会缓存内部的所有组件实例，但我们可以通过 `include` 和 `exclude` prop 来定制该行为。这两个 prop 的值都可以是一个以英文逗号分隔的字符串、一个正则表达式，或是包含这两种类型的一个数组：

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

它会根据组件的 name 选项进行匹配，所以组件如果想要条件性地被 `KeepAlive` 缓存，就必须显式声明一个 `name` 选项。

> 注意
>
> 在 3.2.34 或以上的版本，使用`<script setup>` 的单文件组件会自动根据文件名生成对应的`name`选项，无需再手动声明。

如以下代码无需手动声明：

```vue
<script>
export default {
    name:"my-component"
}
</script>
```
#### 最大缓存实例数

我们可以通过传入 `max` prop 来限制可被缓存的最大组件实例数。`<KeepAlive>` 的行为在指定了 `max` 后类似一个 [LRU 缓存](https://en.wikipedia.org/wiki/Cache_replacement_policies#Least_recently_used_(LRU))：如果缓存的实例数量即将超过指定的那个最大数量，则最久没有被访问的缓存实例将被销毁，以便为新的实例腾出空间。

```vue
<KeepAlive :max="10">
  <component :is="activeComponent" />
</KeepAlive>
```

#### 缓存实例的生命周期

当一个组件实例从 DOM 上移除但因为被`<KeepAlive>`缓存而仍作为组件树的一部分时，它将变为**不活跃**状态而不是被卸载。当一个组件实例作为缓存树的一部分插入到 DOM 中时，它将重新**被激活**。



一个持续存在的组件可以通过`onActivated()`和`onDeactivated()`注册相应的两个状态的生命周期钩子函数：

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

请注意：

- `onActivated`在组件挂载时也会调用，并且`onDeactivated`在组件卸载时也会调用。
- 这两个钩子不仅适用于`<KeepAlive>`缓存的根组件，也适用于缓存树中的后代组件。


---

### Teleport

`<Teleport>`是一个内置组件，它可以将一个组件内部的一部分模板“传送”到该组件的 DOM 结构外层的位置去。

`<Teleport>`组件内可以是 DOM 结构，也可以是组件，利用设置props`to`传送到目标节点，可以是HTML标签，也可以是类名或id名。

若想禁用 `<Teleport>`，可以设置`disabled`为`true`

#### 禁用 Teleport

在某些场景下可能需要视情况禁用`<Teleport>`。举例来说，我们想要在桌面端将一个组件当作浮层来渲染，但在移动端则当作行内组件。我们可以通过对`<Teleport>`动态地传入一个`disabled`prop来处理这两种情况：

```vue
<Teleport :disabled="isMobile">
  ...
</Teleport>
```

这里的 `isMobile` 状态可以根据 CSS media query 的不同结果动态地更新。

#### 多个 Teleport 共享目标

一个可重用的模态框可能同事存在多个实例。对于此类场景，若个`<Teleport>`组件可以将其内容挂载在同一个目标元素上，而顺序就是简单的顺次追加，后挂载的将排在目标元素下更后面的位置上。如下：

```vue
<Teleport to="#modals">
  <div>A</div>
</Teleport>
<Teleport to="#modals">
  <div>B</div>
</Teleport>

<!-- 渲染为： -->
<div id="modals">
  <div>A</div>
  <div>B</div>
</div>
```





### Suspense