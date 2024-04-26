---
title: 组件基础
date: 2024-04-25
category:
  - vue3
---


### Props

#### Props声明

在使用`<script setup>`的单文件组件中，props可以使用`defineProps()`宏来进行声明：

```vue
<script setup>
const props = defineProps(['foo']);

console.log(props.foo);
</script>
```

在没有使用`<script setup>`的组件中，prop可以使用props选项来进行声明：

```js
export default {
  props: ['foo'],
  setup(props) {
    // setup() 接收 props 作为第一个参数
    console.log(props.foo)
  }
}
```



---

### 事件

#### 事件校验

和对 props 添加类型校验的方式类似，所有触发的事件也可以使用对象形式来描述。

要为事件添加校验，那么事件可以被赋值为一个函数，接收的参数就是排除事件时传入`emit`的内容，返回一个布尔值来表明事件是否合法。

```vue
<script setup>
const emit = defineEmits({
  // 没有校验
  click: null,

  // 校验 submit 事件
  submit: ({ email, password }) => {
    if (email && password) {
      return true
    } else {
      console.warn('Invalid submit event payload!')
      return false
    }
  }
})

function submitForm(email, password) {
  emit('submit', { email, password })
}
</script>
```





### 透传 Attributes

#### Attributes 继承

”透传 attribute“指的是传递给一个组件，却没有被该组件声明为props或emits的 attribute或者`v-on`事件监听器。最常见的例子就是`class`、`style`和`id`。

当一个组件以单个元素微根作渲染时，透传的 attribute 会自动被添加到根元素上。举例来说：

```vue
<!-- <MyButton> 的模板 -->
<button>click me</button>

<!-- 父组件 -->
<MyButton class="large" />

<!-- 渲染结果 -->
<button class="large">click me</button>
```

这里，`<MyButton>` 并没有将 `class` 声明为一个它所接受的 prop，所以 `class` 被视作透传 attribute，自动透传到了 `<MyButton>` 的根元素上。

##### 对 class 和 style 的合并

如果一个子组件的根元素已经有了`class`和`style` attribute，它会从父组件上继承的值合并。如下代码：

```vue
<!-- <MyButton> 的模板 -->
<button class="btn">click me</button>

<!-- 父组件 -->
<MyButton class="large" />

<!-- 渲染结果 -->
<button class="btn large">click me</button>
```

##### v-on 监听器继承

同样的规则适用于`v-on`事件监听器：

```vue
<!-- 子组件 -->
<button class="btn" @click="handleClick">click me</button>

<!-- 父组件 -->
<MyButton @click="onClick" />
```

`click` 监听器会被添加到 `<MyButton>` 的根元素，即那个子组件的 `<button>` 元素之上。当原生的 `<button>` 被点击，会触发父组件的 `onClick` 方法。同样的，如果原生 `button` 元素自身也通过 `v-on` 绑定了一个事件监听器`handleClick`函数，则这个监听器和从父组件继承的监听器函数：`handleClick`、`onClick`都会被触发。

##### 深层组件继承

在有些情况下，我们的组件并不一定只有两级，如下代码：

```vue
<!-- 根组件 -->
<MyButton  />

<!-- 第二级组件：MyButton组件实际还会渲染BaseButton组件 -->
<BaseButton   />

<!-- 第三级组件：BaseButton组件才是实际封装组件的代码 -->
<button class="btn" @click="handleClick">click me</button>
```

此时`<MyButton>`接收的透传 attribute 会直接继续传给`<BaseButton>`。但需要注意的是：

1. 如果透传的 attribute 在`<MyButton>`声明过相同的props或者`emits`事件，就会被`<MyButton>`”消费“了，而不会继续透传到`<BaseButton>`组件中去。

2. 透传的 attribute 若符合声明，会继续作为props传入`<BaseButton>`。

#### 禁用 Attributes 继承

通过设置`inheritAttrs`为`false`从而达到禁用 Attributes 继承的目的

```vue
<script setup>
defineOptions({
  inheritAttrs: false
})
// ...setup 逻辑
</script>
```

在禁用 Attributes 继承后，我们可以选择性地控制透传进来的 attribute 被如何使用，比如在模板标签出直接使用透传的 attribute：

```vue
<span>Fallthrough attribute: {{ $attrs }}</span>
```

这个 `$attrs` 对象包含了除组件所声明的 `props` 和 `emits` 之外的所有其他 attribute，例如 `class`，`style`，`v-on` 监听器等等。

不过使用过程中需要注意：

- 和 props 有所不同，透传 attributes 在 JavaScript 中保留了它们原始的大小写，所以像 `foo-bar` 这样的一个 attribute 需要通过 `$attrs['foo-bar']` 来访问。

- 像 `@click` 这样的一个 `v-on` 事件监听器将在此对象下被暴露为一个函数 `$attrs.onClick`。

此外，前面提到了，透传的 attribute 会继承在子组件的根节点上，如我们想将透传的 attribute 应用在不同的节点上是，我们可以通过**禁用继承**的方式，选择性控制attribute继承在节点的位置，如：

```vue
<!-- 这样透传的 attribute 会继承在button上而不是div -->
<div class="btn-wrapper">
  <button class="btn" v-bind="$attrs">click me</button>
</div>
```

提示：没有参数的`v-bind`会将一个对象的所有属性都作为 attribute 应用到目标元素上。

```vue
<template>
	<div v-bind="objectOfAttrs"></div>
</template>

<script>
const objectOfAttrs = {
  id: 'container',
  class: 'wrapper'
}
</script>

<!-- 渲染结果为 -->
<div id="container" class="wrapper"></div>
```

#### 多根节点的 Attribute 继承

与单根组件有所不同，有着多个根节点的组件没有自动 attribute 透传行为，如果`$attrs`没有被显式绑定，将会抛出一个运行时的警告。如下代码:

```vue
<!-- 父组件-->
<CustomLayout id="custom-layout" @click="changeValue" />
 
<!-- 子组件，用有多个根节点-->
<header>...</header>
<main>...</main>
<footer>...</footer>
```

此时若想消除警告，需要显式地指定谁来继承这个 attribute：

```vue
<header>...</header>
<main v-bind="$attrs">...</main>
<footer>...</footer>
```

#### 在 JavaScript 中访问透传的 Attribute

如果需要，可以在 `<script setup>` 中使用 `useAttrs()` API 来访问一个组件的所有透传 attribute：

```vue
<script setup>
import { useAttrs } from 'vue';

const attrs = useAttrs();
</script>
```

> 注意
>
> 虽然这里的 `attrs` 对象总是反映为最新的透传 attribute，但它并不是响应式的 (考虑到性能因素)。你不能通过侦听器去监听它的变化。如果你需要响应性，可以使用 prop。或者你也可以使用 `onUpdated()` 使得在每次更新时结合最新的 `attrs` 执行副作用。

### v-model

`v-model`可以在组件上使用以实现双向绑定。

#### 单个v-model参数绑定

从Vue3.4开始，推荐的实现方式是使用`defineModel()`宏：

```vue
<!-- Child.vue -->
<script setup>
const model = defineModel()

function update() {
  model.value++
}
</script>

<template>
  <div>parent bound v-model is: {{ model }}</div>
</template>

<!-- Parent.vue -->
<Child v-model="count" />
```

`defineModel()`返回的值是一个ref。它可以像其它ref一样被访问以及修改，不过它能起到在父组件和当前变量之间的双向绑定的作用：

- 它的`.value`和父组件的`v-model`的值同步
- 当它被子组件变更了，会触发父组件绑定的值一起更新。

`defineModel`是一个遍历宏，编译器将其展开为以下内容：

- 一个名为`modelValue`的prop，本地ref的值与其同步
- 一个名为`update:modelValue`的事件，当本地ref的值发生变更时触发

在3.4版本之前，一般会按照如下的方式来实现上述相同的子组件：

```vue
<script setup>
const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <input
    :value="props.modelValue"
    @input="emit('update:modelValue', $event.target.value)"
  />
</template>
```

**注意**

1. 调用`defineModel`是可以传一个字符串的，但是如果是`modelValue`就可以省略

   ```ts
   const model = defineModel();
   // 等同于
   const model = defineModel("modelValue");
   // 只是这里的modelValue可以省略不写，因此在父组件的使用也可以省略掉:modelValue
   
   <MyChild v-model="count">
   // 等同于
   <MyChild v-model:modelValue="count">
       
   // 这里要留意这个细节，也就方便理解为什么当创建多个v-model的时候，我们可以区分哪个v-mode绑定了哪个值
   ```

   


2. 如果为 `defineModel` prop 设置了一个 `default` 值且父组件没有为该 prop 提供任何值，会导致父组件与子组件之间不同步。在下面的示例中，父组件的 `myRef` 是 undefined，而子组件的 `model` 是 1：

   ```ts
   // 子组件：
   const model = defineModel({ default: 1 });
   
   // 父组件
   const myRef = ref();
   <Child v-model="myRef"></Child>
   ```
   
   

####  多个 v-model 绑定

可以在单个组件实例上创建多个 `v-model` 双向绑定。

组件上的每一个 `v-model` 都会同步不同的 prop，而无需额外的选项：

```vue
<!-- 父组件  -->
<UserName
  v-model:first-name="first"
  v-model:last-name="last"
/>

<!-- 子组件  -->
<script setup>
const firstName = defineModel('firstName')
const lastName = defineModel('lastName')
</script>

<template>
  <input type="text" v-model="firstName" />
  <input type="text" v-model="lastName" />
</template>
```

通过以上示例代码可见，当定义`defineModel`的时候传入字符串，就可以定义多个`v-model`，而传入的字符串可用于子组件在父组件使用的时候，让父组件知道该如何绑定值。



#### v-model 修饰符

`v-model`内置了一些修饰符，如`.trim`、`.number`、`.lazy`。

在某些场景下，我们可能想要一个自定义组件的`v-model`支持自定义的修饰符。

比如我们想创建一个自定义修饰符`capitalize`，它会自动将`v-model`绑定输入的字符串值第一个字母转为大写：

```vue
<!-- 父组件  -->
<MyComponent v-model.capitalize="myText" />

<!-- 子组件  -->
<script setup>
const [model, modifiers] = defineModel({
  set(value) {
    if (modifiers.capitalize) {
      return value.charAt(0).toUpperCase() + value.slice(1)
    }
    return value
  }
})
</script>

<template>
  <input type="text" v-model="model" />
</template>
```

在3.4之前的用法：

```vue
<script setup>
const props = defineProps({
  modelValue: String,
  modelModifiers: { default: () => ({}) }
})

const emit = defineEmits(['update:modelValue'])

function emitValue(e) {
  let value = e.target.value
  if (props.modelModifiers.capitalize) {
    value = value.charAt(0).toUpperCase() + value.slice(1)
  }
  emit('update:modelValue', value)
}
</script>

<template>
  <input type="text" :value="modelValue" @input="emitValue" />
</template>
```

多个不同参数的`v-model`如何使用修饰符：

```vue
<!-- 父组件  -->
<UserName v-model:first-name.capitalize="first" v-model:last-name.uppercase="last" />

<!-- 子组件  -->
<script setup>
const [firstName, firstNameModifiers] = defineModel('firstName')
const [lastName, lastNameModifiers] = defineModel('lastName')

console.log(firstNameModifiers) // { capitalize: true }
console.log(lastNameModifiers) // { uppercase: true}
</script>
```

而在3.4之前如果这样用：

```vue
<script setup>
const props = defineProps({
firstName: String,
lastName: String,
firstNameModifiers: { default: () => ({}) },
lastNameModifiers: { default: () => ({}) }
})
defineEmits(['update:firstName', 'update:lastName'])

console.log(props.firstNameModifiers) // { capitalize: true }
console.log(props.lastNameModifiers) // { uppercase: true}
</script>
```

`defineModel`也是支持传入其它参数的，如：

```js

const model = defineModel({
    required: false,// 该值非必须传入
    default: 0,// 如果不传默认值为0
    type: Number,// 传入的值为number类型
})

```



---


### 插槽

#### 插槽内容和出口

`<slot>` 元素是一个**插槽出口** (slot outlet)，标示了父元素提供的**插槽内容** (slot content) 将在哪里被渲染：

<img alt="插槽渲染原理示意图" src="https://cn.vuejs.org/assets/slots.inBPF2Hb.png" height="300px">

#### 渲染作用域

插槽内容可以访问到父组件的数据作用域，因为插槽内容本身在父组件模板中定义的。例如：

```html
<span>{{ message }}</span>
<FancyButton>{{ message }}</FancyButton>
```

这里的两个 `{{ message }}` 插值表达式渲染的内容都是一样的。

插槽内容**无法访问**子组件的数据。Vue 模板中的表达式只能访问其定义时所处的作用域，这和 JavaScript 的词法作用域规则是一致的。换言之：

>父组件模板中的表达式只能访问父组件的作用域；子组件模板中的表达式只能访问子组件的作用域。

#### 默认内容(默认插槽)

```vue
<!-- 子组件中 -->
<button type="submit">
  <slot></slot>
</button>

<!-- 父组件中 -->
<SubmitButton>Save</SubmitButton>

<!-- 渲染结果 -->
<button type="submit">Save</button>
```

当不指定`slot`名字是，我们叫做匿名插槽，如果父组件中在其添加了内容，那就会传递给子组件中显示。

这使用于子组件只使用了一个插槽`slot`。

#### 具名插槽

如果我们有多个插槽的的时候，我们想要父组件传递过来的内容，能在子组件特定的位置上显示，那就需要**具名插槽**了。

```vue
<!-- 子组件中 -->
<div class="container">
  <header>
    <slot name="header"></slot>
  </header>
  <main>
    <slot></slot>
  </main>
  <footer>
    <slot name="footer"></slot>
  </footer>
</div>

<!-- 父组件中 -->
<BaseLayout>
  <template #header>
   This is header slot content.
  </template>
  <template>
   This is default slot content.
  </template>
  <template #footer>
   This is footer slot content.
  </template>
</BaseLayout>

<!-- 渲染结果 -->
<div class="container">
  <header>
    This is header slot content.
  </header>
  <main>
    This is default slot content.
  </main>
  <footer>
    This is footer slot content.
  </footer>
</div>
```

渲染原理以图示意：

<img src="https://cn.vuejs.org/assets/named-slots.giG_TKP2.png" height="300px">

当我们不为`slot`指定`name`的时候，会显示其默认内容（如果有），但它是有一个默认名字`default`的，只是我们可以忽略不写：

```vue
<BaseLayout>
  <template #header>
    <h1>Here might be a page title</h1>
  </template>

  <template #default>
    <p>A paragraph for the main content.</p>
    <p>And another one.</p>
  </template>

  <template #footer>
    <p>Here's some contact info</p>
  </template>
</BaseLayout>

<!-- 上面代码等同于 -->
<BaseLayout>
  <template #header>
    <h1>Here might be a page title</h1>
  </template>

  <!-- 隐式的默认插槽 -->
  <p>A paragraph for the main content.</p>
  <p>And another one.</p>

  <template #footer>
    <p>Here's some contact info</p>
  </template>
</BaseLayout>
```

#### 动态插槽

动态指定参数在`v-slot`上也是有效的，即可以定义下面这样的动态插槽名：

```vue
<base-layout>
  <template v-slot:[dynamicSlotName]>
    ...
  </template>

  <!-- 缩写为，其中dynamicSlotName需要在script定义 -->
  <template #[dynamicSlotName]>
    ...
  </template>
</base-layout>
```

#### 作用域插槽

#### 默认作用域插槽

在上面的**渲染作用域**中我们讨论到，插槽的内容无法访问到子组件的状态。

然而某些场景下插槽的内容可能想通过使用父组件域内和子组件域内的数据。要做到这一点，我们需要一种方法来让子组件在渲染时将一部分数据提供给插槽。

如：

```vue
<!-- 子组件 <MyComponent> 的模板-->
<div>
  <slot :text="greetingMessage" :count="1"></slot>
</div>

<!-- 父组件通过slot访问子组件的数据-->
<MyComponent v-slot="slotProps">
  {{ slotProps.text }} {{ slotProps.count }}
</MyComponent>

<!-- 父组件通过slot访问子组件的数据(解构访问)-->
<MyComponent v-slot="{ text, count }">
  {{ text }} {{ count }}
</MyComponent>

<!-- 在父组件使用v-slot可以直接在组件上使用，也可以如下使用 -->
<MyComponent>
  <template #default="{ text, count }">
		{{ text }} {{ count }}
  </template>
</MyComponent>
```

以图来示意访问子组件数据流程：

<img src="https://cn.vuejs.org/assets/scoped-slots.eu7SD3OQ.svg" height="400px">

#### 具名作用域插槽

具名作用域插槽就是在使用具名插槽的前提下，再使用作用域插槽，如下：

```vue
<!-- 父组件-->
<template>
  <Child>
    <template #header="{ title }">
      {{ title }}
    </template>

    <template #default="{ title }">
      {{ title }}
    </template>

    <template #footer="{ title }">
      {{ title }}
    </template>
  </Child>
</template>

<script setup>
import Child from "./components/Child.vue";
</script>

<!-- 子组件-->
<template>
  <div>
    <header>
      <slot name="header" title="header"></slot>
    </header>
    <main>
      <slot title="default"></slot>
    </main>
    <footer>
      <slot name="footer" title="footer"></slot>
    </footer>
  </div>
</template>

<!-- 渲染结果-->
<div>
    <header>header</header>
    <main>default</main>
    <footer>footer</footer>
</div>
```

当同时使用具名插槽和作用插槽时，每个插槽之间的作用域是独立的，不能相互访问，如下：

```vue
<!-- 该模板无法编译 -->
<template>
  <MyComponent v-slot="{ message }">
    <p>{{ message }}</p>
    <template #footer>
      <!-- message 属于默认插槽，此处不可用 -->
      <p>{{ message }}</p>
    </template>
  </MyComponent>
</template>
```

为什么直接在组件上使用`v-slot`下面的`footer`具名插槽使用不了`message`是因为上面代码相当于下面的：

```vue
<template>
  <MyComponent>
    <!-- 使用显式的默认插槽 -->
    <template #default="{ message }">
      <p>{{ message }}</p>
    </template>

    <template #footer>
      <p>Here's some contact info</p>
    </template>
  </MyComponent>
</template>
```

这样就可以明显的看出来`default`默认插槽的`message`，在`footer`插槽内是不可进行访问。

**具名作用域插槽使用示例：**

1. 渲染组件

   ```vue
   <!-- 父组件：告诉父组件请求数据的地址、需要请求多少条、以及列表如何展示 -->
   <FancyList :api-url="url" :per-page="10">
     <template #item="{ body, username, likes }">
       <div class="item">
         <p>{{ body }}</p>
         <p>by {{ username }} | {{ likes }} likes</p>
       </div>
     </template>
   </FancyList>
   
   <!-- 子组件：完成数据请求并把返回结果根据父组件传过来的列表渲染样式将列表渲染出来 -->
   <ul>
     <li v-for="item in items">
       <slot name="item" v-bind="item"></slot>
     </li>
   </ul>
   ```

   

2. 无渲染组件

   ```vue
   <!-- 父组件 -->
   <script setup>
   import MouseTracker from './MouseTracker.vue'
   </script>
   
   <template>
   	<MouseTracker v-slot="{ x, y }">
     	Mouse is at: {{ x }}, {{ y }}
   	</MouseTracker>
   </template>
   
   <!-- 子组件 -->
   <script setup>
   import { ref, onMounted, onUnmounted } from 'vue'
     
   const x = ref(0)
   const y = ref(0)
   
   const update = e => {
     x.value = e.pageX
     y.value = e.pageY
   }
   
   onMounted(() => window.addEventListener('mousemove', update))
   onUnmounted(() => window.removeEventListener('mousemove', update))
   </script>
   
   <template>
     <slot :x="x" :y="y"/>
   </template>
   ```

   

---



### 依赖注入

当组件嵌套比较深时，若某个深层的子组件需要根组件的部位数据时，如果使用props逐层传递，将会非常麻烦：

<img alt="prop逐级透传" src="https://cn.vuejs.org/assets/prop-drilling.FyV2vFBP.png" height="300px">

为尽量避免这种情况，我们可以使用`provide`和`inject`帮助我们解决这一问题。一个父组件相当于其所有的后代组件，会作为依赖提供者。任何后代的组件树，无论层级有多深，都可以注入由父组件提供给整条链路的依赖。

<img alt="prop逐级透传" src="https://cn.vuejs.org/assets/provide-inject.tIACH1Z-.png" height="300px">

#### provide

提供一个值，可以被后代组件注入：

```ts
function provide<T>(key: InjectionKey<T> | string, value: T): void
```

#### inject

注入一个由祖先组件或整个应用通过`provide`提供的值。

```ts
// 没有默认值
function inject<T>(key: InjectionKey<T> | string): T | undefined

// 带有默认值
function inject<T>(key: InjectionKey<T> | string, defaultValue: T): T

// 使用工厂函数
function inject<T>(
  key: InjectionKey<T> | string,
  defaultValue: () => T,
  treatDefaultAsFactory: true
): T
```

如果提供的值是一个 ref，注入进来的会是该 ref 对象，而**不会**自动解包为其内部的值。这使得注入方组件能够通过 ref 对象保持了和供给方的响应性链接。

使用示例：

```ts
// 如果祖先组件没有用provide注入一个key为message的值，那这里获取的将会是undefined
const message = inject('message');

// 如果没有祖先组件提供 "message"
// `value` 会是 "这是默认值"
const value = inject('message', '这是默认值')

// 第三个参数表示默认值应该被当作一个工厂函数。
const value = inject('key', () => new ExpensiveClass(), true)
```

#### 和响应式数据配合使用

通过`props`注入的是单向数据流，子组件是无法直接修改父组件提供的数据。

但是通过`provide`注入的数据，子组件通过`inject`接收后是可以进行修改的，若子组件修改注入的数据，那么父组件的数据也会随之改变。

如果你想从父组件注入的数据不被子组件所改变，可以使用`readonly`来包装提供的值：

```vue
<script setup>
import { ref, provide, readonly } from 'vue'

const count = ref(0)
provide('read-only-count', readonly(count))
</script>
```

#### 使用Symbol作注入名

我们已经知道了`provide`可以使用字符串作为注入名。但如果在构建大型的应用时，包含非常多的依赖提供，建议最好使用Symbol来作为注入名以避免潜在的冲突。

我们通常可以在一个单的文件里到处这些注入名Symbol：

```ts
// keys.js
export const myInjectionKey = Symbol()
```

```js
// 在供给方组件中
import { provide } from 'vue'
import { myInjectionKey } from './keys.js'

provide(myInjectionKey, { /*
  要提供的数据
*/ });
```

```js
// 注入方组件
import { inject } from 'vue'
import { myInjectionKey } from './keys.js'

const injected = inject(myInjectionKey)
```

利用TS标注类型：

```ts
import { provide, inject } from 'vue'
import type { InjectionKey } from 'vue'

const key = Symbol() as InjectionKey<string>

provide(key, 'foo') // 若提供的是非字符串值会导致错误

const foo = inject(key) // foo 的类型：string | undefined
```

---

### 异步组件

#### 基本用法

在大型项目中，我们可以需要拆分应用为更小的块，并仅在需要时从服务器加载相关组件。Vue提供了`defineAsyncComponent`方法来实现此功能：

```ts
import { defineAsyncComponent } from 'vue'

const AsyncComp = defineAsyncComponent(() => {
  return new Promise((resolve, reject) => {
    // ...从服务器获取组件
    resolve(/* 获取到的组件 */)
  })
})
// ... 像使用其他一般组件一样使用 `AsyncComp`
```

从代码我们可以知道`defineAsyncComponent`的回调函数需要返回一个Promise，而ES 模块动态导入也会返回一个Promise，因此我们就可以把`import`和`defineAsyncComponent`结合使用，如下：

```ts
import { defineAsyncComponent } from 'vue'
const AsyncComp = defineAsyncComponent(() =>
  import('./components/MyComponent.vue')
)
```

最后得到`AsyncComp`是一个外层包装过的组件，仅在页面需要它渲染时才会调用加载内部实际组件的函数。它将会接收到的props和插槽传给内部的组件，所以你可以使用这个异步的包装组件无缝地替换原始组件，同时实现延迟加载。

`app.component()`也可以注册由`defineAsyncComponent`创建的异步组件：

```ts
app.component('MyComponent', defineAsyncComponent(() =>
  import('./components/MyComponent.vue')
))
```

#### 加载与错误状态

异步操作不可避免地会涉及到加载和错误状态，因此 `defineAsyncComponent()` 也支持在高级选项中处理这些状态：

```ts
const AsyncComp = defineAsyncComponent({
  // 加载函数
  loader: () => import('./Foo.vue'),

  // 加载异步组件时使用的组件
  loadingComponent: LoadingComponent,
  // 展示加载组件前的延迟时间，默认为 200ms
  delay: 200,

  // 加载失败后展示的组件
  errorComponent: ErrorComponent,
  // 如果提供了一个 timeout 时间限制，并超时了
  // 也会显示这里配置的报错组件，默认值是：Infinity
  timeout: 3000
})
```

#### 可以进行透传 Attributes

代码示例：

```vue
<!-- 加载动画组件 -->
<template>
  <div>加载中</div>
</template>

<!-- 父组件 -->
<template>
  <ChildPage :message="message"></ChildPage>
</template>

<script setup>
import { defineAsyncComponent, ref } from "vue";
import LoadingComponent from "./components/Loading.vue";
const message = ref("Hello World");
const ChildPage = defineAsyncComponent({
  loader: () =>
    new Promise(resolve => {
      const timer = setTimeout(() => {
        clearTimeout(timer);
        resolve(import("./components/Child.vue"));
      }, 2000);
    }),
  loadingComponent: LoadingComponent,
});
</script>


<!-- 子组件 -->
<template>
  <p>child</p>
  <p>来自props的数据：{{ message }}</p>
</template>

<script setup>
defineProps(["message"]);
</script>

```





#### 搭配Suspense使用

异步组件可以与搭配的[`<Suspense>`](#suspense组件)组件一起使用。具体怎么搭配使用详见关于`<Suspense>`组件的介绍。



### 内置组件

#### suspense组件

`suspense`组件内有两个插槽，一个是`default`默认插槽，一个是`name`为`fallback`的具名插槽，放在`default`默认插槽内的组件可以是一个异步创建的组件或组件内的`setup`顶层含有异步等待的操作，而`fallback`具名插槽可以放加载动画组件。

若此时默认插槽的组件处于等待状态，那么就会展示`fallback`具名插槽内的内容。

若默认插槽的组件不处于等待状态，则会直接展示`default`默认插槽的组件，不会展示`fallback`默认插槽的组件。

组件内`setup`顶层含有异步等待的组件使用代码示例：

```vue
<!-- 加载动画组件 -->
<template>
  <div>加载中</div>
</template>

<!-- 父组件 -->
<template>
  <Suspense>
    <!-- ChildPage 顶层含有异步等待操作 -->
    <Child></Child>
    <template #fallback>
      <LoadingComponent />
    </template>
  </Suspense>
</template>

<script setup>
import { defineAsyncComponent } from "vue";
import Child from "./components/Child.vue";
import LoadingComponent from "./components/Loading.vue";
</script>

<!-- 子组件 -->
<template>
  <p>child</p>
</template>

<script setup>
const sleep = seconds => {
  return new Promise(resolve => {
    const timer = setTimeout(() => {
      clearTimeout(timer);
      resolve(true);
    }, seconds * 1000);
  });
};
// 调用sleep函数，模拟异步操作
await sleep(2);
</script>

<!-- 
此时页面会先显示加载动画组件，2秒后再显示Child组件
-->
```

顶层使用`await`必须要与`<Suspense>`组件搭配使用，不然控制台会抛出警告且页面不能正常加载。



另外，我们可以搭配由`defineAsyncComponent`创建的异步组件与`<Suspense>`组件搭配使用.

但需要注意的是，使用`defineAsyncComponent`创建异步组件的时候，不能用`loadingComponent`指定加载组件从而替换在`<Suspense>`组件的具名插槽`fallback`放的加载组件，如下：

```vue
<!-- 父组件 -->
<template>
  <Suspense>
    <ChildPage></ChildPage>

    <template #fallback>
      <LoadingComponent />
    </template>
  </Suspense>
</template>

<script setup>
import { defineAsyncComponent } from "vue";
import LoadingComponent from "./components/Loading.vue";
const ChildPage = defineAsyncComponent({
  loader: () =>
    new Promise(resolve => {
      const timer = setTimeout(() => {
        clearTimeout(timer);
        // 两秒后返回组件，或者可以理解为等待请求完成后就可以开始渲染组件
        resolve(import("./components/Child.vue"));
      }, 2000);
    }),
});
</script>

<!-- 子组件 -->
<template>
  <p>child</p>
</template>

```

由`defineAsyncComponent`创建的异步组件，`<ChildPage />`组件顶层就可以无需使用`await`



但需要注意的是，`<Suspense>`和`defineAsyncComponent`结合使用时，`defineAsyncComponent.loader`里，如果没有网络请求等待操作，建议不能单纯用它来引入组件来创建异步组件，因为会造成`<LoadingComponent />`组件一闪而过。因为只要`<Suspense>`内的默认插槽组件是异步的，会优先显示具名插槽`fallback`组件内的内容。如下代码：

```vue
<template>
  <Suspense>
    <ChildPage></ChildPage>

    <template #fallback>
      <LoadingComponent />
    </template>
  </Suspense>
</template>

<script setup>
import { defineAsyncComponent } from "vue";
import LoadingComponent from "./components/Loading.vue";
const ChildPage = defineAsyncComponent({
  loader: () => import("./components/Child.vue"),
});
</script>

```

异步组件有**suspensible** props，它的默认值为`true`，当为`true`的时候，所有拥有异步依赖的组件都将由`<Suspense>`管理加载状态，每个拥有依赖的组件自己的加载、报错、延时和超时等选项都将被忽略。

如果**suspensible**的值为`false`，那么就让组件自己控制自己的加载状态。

