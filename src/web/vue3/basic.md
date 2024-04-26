---
title: vue3基础
date: 2024-04-25
category:
  - vue3

---


### 模板语法

#### 同名简写

该特性需要在`3.4+`中使用，如果 attribute 的名称与绑定的 JavaScript 值的名称相同，那么可以进一步简化语法，省略 attribute 值：

```vue
<!-- 与 :id="id" 相同 -->
<div :id></div>

<!-- 这也同样有效 -->
<div v-bind:id></div>
```

#### 动态绑定多个值

通过不带参数的 `v-bind`，你可以将它们绑定到单个元素上：

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
```

#### 调用函数

可以在绑定的表达式中使用一个组件暴露的方法：

```vue
<time :title="toTitleDate(date)" :datetime="date">
  {{ formatDate(date) }}
</time>
```

> 注意
>
> 绑定在表达式中的方法在组件**每次更新时都会被重新调用**，因此**不应该**产生任何副作用，比如**改变数据**或**触发异步操作**。

#### 动态参数

```vue
<!-- 属性绑定 -->
<a v-bind:[attributeName]="url"> ... </a>
<!-- 简写 -->
<a :[attributeName]="url"> ... </a>

<!-- 事件绑定 -->
<a v-on:[eventName]="doSomething"> ... </a>
<!-- 简写 -->
<a @[eventName]="doSomething"> ... </a>
```

##### 动态参数值的限制

动态参数中表达式的值应当是一个字符串，或者是 `null`。特殊值 `null` 意为显式移除该绑定。其他非字符串的值会触发警告。

##### 动态参数语法限制

动态参数表达式因为某些字符的缘故有一些语法限制，比如空格和引号，在 HTML attribute 名称中都是不合法的。例如下面的示例：

```vue
<!-- 这会触发一个编译器警告 -->
<a :['foo' + bar]="value"> ... </a>
```

如果你需要传入一个复杂的动态参数，可以使用`computed`替换复杂的表达式。

##### 动态参数语法使用注意事项

```vue
<MyComponent :[someAttr]="value"> ... </a>
```

如果你的组件拥有 “someAttr” 属性（这个属性的名字是在你封装组件的时候自己取的props名）而非 “someattr”，这段代码将不会工作。单文件组件内的模板**不**受此限制。

### 列表渲染

`v-for`可以渲染的数据类型有：数字、数组、对象。

#### 在v-for里使用范围值

```vue
<p v-for="(n, i) in 5">{{ n }}--{{ i }}</p>
<!-- 渲染为 -->
<p>1--0</p>
<p>2--1</p>
<p>3--2</p>
<p>4--3</p>
<p>5--4</p>
```

注意这里的`n`是从1开始，而不是从0开始。

#### v-for 与 数组

```vue
<template>
  <p v-for="(item, index) in arr">{{ item }}--{{ index }}</p>
</template>

<script setup>
const arr = ["Hello", "World"];
</script>

// 渲染为
<p>Hello--0</p>
<p>World--1</p>
```

#### v-for 与对象

```vue
<template>
  <p v-for="(key, value, index) in myObject">{{ key }}--{{ value }}--{{ index }}</p>
</template>

<script setup>
const myObject = {
  title: "How to do lists in Vue",
  author: "Jane Doe",
  publishedAt: "2016-04-10",
};
</script>

//渲染为
<p>How to do lists in Vue--title--0</p>
<p>Jane Doe--author--1</p>
<p>2016-04-10--publishedAt--2</p>

```

或者

```vue
<template>
  <p v-for="value in myObject">{{ value }}</p>
</template>

<script setup>
const myObject = {
  title: "How to do lists in Vue",
  author: "Jane Doe",
  publishedAt: "2016-04-10",
};
</script>

//渲染为
<p>How to do lists in Vue</p>
<p>Jane Doe</p>
<p>2016-04-10</p>

```

#### 通过key管理状态

简单来说，通过在`v-for`渲染时设置唯一`key`有助于让vue重用和重新排序现有元素，避免重新渲染元素，如下：

```vue
<div v-for="item in items" :key="item.id">
  <!-- 内容 -->
</div>
```

当然，当一些情况并不是和`v-for`搭配使用我们也可以通过改变`key`值刷新组件，从而让组件重新触发一系列生命周期钩子函数。



### Ref深层响应性

Ref可以持有任何类型的值，包括深层嵌套的对象、数组或者JavaScript内置的数据结构，比如`Map`。

Ref会使它具有深层响应性。这意味着即使改变嵌套对象或数组时，变化也会被检测到：

```ts
import { ref } from 'vue'

const obj = ref({
  nested: { count: 0 },
  arr: ['foo', 'bar']
})

function mutateDeeply() {
  // 以下都会按照期望工作
  obj.value.nested.count++
  obj.value.arr.push('baz')
}
```

也可以通过`shallowRef`来放弃深层响应性。对于浅层ref，只有`.value`的访问会被追踪。浅层ref可以用于避免对大型数据的响应性开销来优化性能、或者有外部库管理其内部状态的情况。



#### Ref解包细节

1. ref在`script`中需要`xx.value`才能访问到数据，但是在`html`中无需进行`xx.value`访问数据，直接使用数据`xx`即可。

2. 若ref会在作为**响应式对象**的属性被访问或修改时会自动解包。如下：

   ```ts
   const count = ref(0);
   const state = reactive({
     // 该过程会自动将count解包
     count
   });
   
   console.log(state.count); // 打印为0，因为自动解包了，如果没有自动解包，打印应该为{ value: 0 }
   
   state.count = 1; // 此时修改数据也不用state.count.value，直接state.count即可直接进行数据修改
   console.log(count.value) // 1 
   ```

3. 若ref作为**响应式数组或原生集合类型**（如`Map`）中的元素被访问时，它不会被解包，如下：

   ```ts
   const books = reactive([ref('Vue 3 Guide')]);// 该声明方式并不会让ref自动解包
   console.log(books[0].value); // 这里需要 .value访问，打印为`Vue3 Guide`
   
   const map = reactive(new Map([['count', ref(0)]])); // 该声明方式也不会让ref自动解包
   
   console.log(map.get('count').value); // 这里需要 .value进行访问
   ```

4. 若ref作为**非响应式对象**时，也是不会触发解包的，如下：

   ```ts
   const count = ref(0);
   const object = { id: ref(1) };
   
   // 当在页面像下面这样使用时就不会达到预期的效果
   {{ object.id +1 }}
   
   //会渲染为[object Object]1，原因就是在这里并不会对ref进行解包，而object.id是一个ref响应式对象，所以会渲染为：[object Object]1
   ```

   但如果将它从非响应式对象结构出来时，不但不会影响其响应式，而且当在页面使用的时候，会自动解包，如下：

   ```ts
   const { id } = object;
   
   // 在页面中使用，渲染结果就为2
   {{ id + 1 }}
   ```

   

### Reactive的局限性

1. **有限值的类型：**它只能用于对象类型（对象、数组和Map、Set这样的集合类型）。它不能持有如`string`、`number`或`boolean`这样的原始类型。(Q：如果持有原始数据类型会怎么样？)
2. **不能替换整个对象：**如果直接替换响应式对象，直接替换响应式对象会丢失响应式。（Q：如何在不丢失响应式的情况下，清空响应式数据？）
2. **不能解构：**将响应式对象进行解构时，会丢失响应式数据。



### 计算属性（computed）

#### 计算属性缓存 vs 方法

```vue
<template>
  <p>Has published books:</p>
  <span>{{ publishedBooksMessage }}</span>
  <p>{{ calculateBooksMessage() }}</p>
</template>
<script setup>
import { reactive, computed } from 'vue'

const author = reactive({
  name: 'John Doe',
  books: [
    'Vue 2 - Advanced Guide',
    'Vue 3 - Basic Guide',
    'Vue 4 - The Mystery'
  ]
})

// 一个计算属性 ref
const publishedBooksMessage = computed(() => {
  return author.books.length > 0 ? 'Yes' : 'No'
})

// 组件中
function calculateBooksMessage() {
  return author.books.length > 0 ? 'Yes' : 'No'
}
</script>


```

虽然**计算属性**和**方法**都能够实现上述效果，但是不同的是：

- 计算属性值会基于响应式依赖被缓存，一个计算属性仅会在其响应式依赖更新时才会重新计算，这意味着，只要`author.books`的长度不变化，无论多少次访问`publishedBooksMessage`都会立即返回先前的计算结果，而不用重复执行`getter`函数。这也解释了为什么下面的计算属性用于不会更新，因为`Date.now()`并不是一个响应式依赖：

```ts
const now = computed(() => Date.now())
```

​		而方法调用会**总是**在页面重新渲染发生时再次执行函数。

相同处在于：

- 计算属性和方法都可传参计算

  ```ts
  
  <template>
  
  	<div v-for="item in list">
  		<div v-if='isComputedShow(item)'>computed是否显示</div>
          <div v-if='isMethodShow(item)'>method是否显示</div>
  	</div>
  
  	<p> {{ square(num) }} </p>
  
  </template>
   
  
  <script setup>
  import { ref, computed } from 'vue'
  const currentId = ref(null)
  	 
  const isComputedShow = computed(() => (item) => {
  	return currentId === item.id
  })
  
  const isMethodShow = (item)=> currentId === item.id
  
  
  </script>
  ```



#### 可写计算属性

计算属性默认是只读的，当尝试修改一个计算属性的时，会收到一个运行警告。只有在某些特殊场景值中可能用到”可写“属性，可以通过`getter`和`setter`来创建：

```vue
<template>
  <div class="home">
    <!-- 点击按钮后，firstName变为Hello，lastName变为word，fullName变成Hello World -->  
    <p>{{ firstName }}</p>
    <p>{{ lastName }}</p>
    <p>{{ fullName }}</p>
    <button @click="handleClick">click me</button>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const firstName = ref("John");
const lastName = ref("Doe");

const fullName = computed({
  // getter
  get() {
    return firstName.value + " " + lastName.value;
  },
  // setter
  set(newValue) {
    // 注意：这里使用的是解构赋值语法
    [firstName.value, lastName.value] = newValue.split(" ");
  },
});

const handleClick = () => {
  fullName.value = "Hello word";
};
</script>

<style scoped>
.home {
  height: 100%;
}
</style>

```

#### Getter不应有副作用

计算属性的getter应只做计算属性而不做其它额外的逻辑，例如：**不要改变其它状态、在getter做异步请求或更改DOM！**getter的职责应该仅为计算和返回该值。

#### 避免直接修改计算属性值

从计算属性返回的值是派生状态。可以把它看作是一个”临时快照“，每当源状态发生变化时，就会创建一个新的快照。更改快照是没有意义的，因此计算属性的返回值也应该被视为只读的，并且永远不应该被更改，而是应该更改它所依赖的源状态以触发新的计算。



### 侦听器(watch)

计算属性允许我们声明地计算衍生值。然而在有些情况下，我们需要在状态变化时执行一些”副作用“，也就是进行一些额外的操作，如更改DOM，或是根据异步操作去修改另一处的状态。

侦听器的用处示例如下：

1. 监听数据进行一些异步操作：

   ```vue
   <script setup>
   import { ref, watch } from 'vue'
   
   const question = ref('')
   const answer = ref('Questions usually contain a question mark. ;-)')
   const loading = ref(false)
   
   // 可以直接侦听一个 ref
   watch(question, async (newQuestion, oldQuestion) => {
     if (newQuestion.includes('?')) {
       loading.value = true
       answer.value = 'Thinking...'
       try {
         const res = await fetch('https://yesno.wtf/api')
         answer.value = (await res.json()).answer
       } catch (error) {
         answer.value = 'Error! Could not reach the API. ' + error
       } finally {
         loading.value = false
       }
     }
   })
   </script>
   
   <template>
     <p>
       Ask a yes/no question:
       <input v-model="question" :disabled="loading" />
     </p>
     <p>{{ answer }}</p>
   </template>
   ```

   

2. 可监听的数据源类型

   ```ts
   // 监听ref数据源
   const x = ref(0)
   const y = ref(0)
   
   // 单个 ref
   watch(x, (newX) => {
     console.log(`x is ${newX}`)
   })
   
   // getter 函数
   watch(
     () => x.value + y.value,
     (sum) => {
       console.log(`sum of x + y is: ${sum}`)
     }
   )
   
   // 多个来源组成的数组
   watch([x, () => y.value], ([newX, newY]) => {
     console.log(`x is ${newX} and y is ${newY}`)
   })
   
   // 若监听由reactive声明的数据，需要用一个返回该属性的getter函数：
   const obj = reactive({ count: 0 })
   
   // 错误的监听方法，因为 watch() 得到的参数是一个 number
   watch(obj.count, (count) => {
     console.log(`count is: ${count}`)
   })
   
   // 正确的监听方法
   // 提供一个 getter 函数
   watch(
     () => obj.count,
     (count) => {
       console.log(`count is: ${count}`)
     }
   )
   ```

#### 深层侦听器(deep)

   可以显式地加上`deep`选项，强制转成深层侦听器，此时若监听的数据子项变化也会被watch监听到，如下例：

   ```ts
   <template>
     <div class="home">
       <p>{{ obj.obj.count }}</p>
   
       <button @click="increase">数字增加</button>
       <button @click="replace">替换对象</button>
     </div>
   </template>
   
   <script setup>
   import { ref, reactive, computed, watch } from "vue";
   const obj = reactive({
     obj: {
       count: 1,
     },
   });
   
   const increase = () => {
     obj.obj.count++;
   };
   const replace = () => {
     obj.obj = {
       count: "被替换了",
     };
   };
   
   watch(
     () => obj.obj,
     newValue => {
       // 数字增加不会进入到这里，对象替换了才会进入到这里
       console.log(newValue);
     },
   );
   watch(
     () => obj.obj,
     newValue => {
       // 数字增加和对象替换都会进入到这里
       console.log(newValue);
     },
     {
       deep: true,
     },
   );
   </script>
   
   <style scoped>
   .home {
     height: 100%;
   }
   </style>
   
   ```

   > 谨慎使用
   >
   > 深度侦听需要遍历被侦听对象中的所有嵌套的属性，当用于大型数据结构时，开销很大。因此请只在必要时才使用它，并且要留意性能。

#### 即时回调侦听器(immediate)

`watch`默认是懒执行的：仅当数据源变化时，才会执行回调。但如果想创建的时候立即执行一边回调，可以通过传入`immediate: true`选择来强制执行侦听器回调立即执行：

```ts
watch(
  source,
  (newValue, oldValue) => {
    // 立即执行，且当 `source` 改变时再次执行
  },
  { immediate: true }
)
```

#### 一次性侦听器(once)

每当被侦听源发生变化时，侦听器的回调就会执行。如果希望回调只在源变化时触发一次，请使用 `once: true` 选项。

```ts
watch(
  source,
  (newValue, oldValue) => {
    // 当 `source` 变化时，仅触发一次
  },
  { once: true }
)
```

#### watchEffect

   若监听的源数据并且在侦听器的回调函数中也使用到了监听的源数据，同时也期待创建侦听器的时候执行一次侦听器的回调函数，则可以下列代码进行优化：

   ```ts
   const todoId = ref(1)
   const data = ref(null)
   
   watch(
     todoId,
     async () => {
       const response = await fetch(
         `https://jsonplaceholder.typicode.com/todos/${todoId.value}`
       )
       data.value = await response.json()
     },
     { immediate: true }
   )
   // 将以上代码优化为成下面的
   
   watchEffect(async () => {
     const response = await fetch(
       `https://jsonplaceholder.typicode.com/todos/${todoId.value}`
     )
     data.value = await response.json()
   })
   ```

   在上面示例代码的下半部分中，`watchEffect`会立即执行，不需要指定`immediate: true`。在执行期间，它会自动追踪`todoId.value`作为依赖。每当`todoId.value`变化时，回调会再次执行。并且有了`watchEffect`，就不需要明确传递`todoId`作为源值。

   - `watchEffect`相比`watch`好处：在对于这种只有一个依赖项的例子来说，`watchEffect()`的好处相对较小。但是对于多个依赖项的侦听器来说，使用`watchEffect`可以手动维护依赖列表的负担。此外，若侦听一个嵌套数据结构中的几个属性，`watchEffect`可能会比深度侦听器更有效，因为它将只跟踪回调中被用到的属性，而不是递归地跟踪所有的属性。

     > `watchEffect` 仅会在其**同步**执行期间，才追踪依赖。在使用异步回调时，只有在第一个 `await` 正常工作前访问到的属性才会被追踪。
     
     这句话什么意思，见下例：
     
     ```vue
     <script setup>
     import { ref, watchEffect } from "vue";
     const todoId = ref(0);
     
     setTimeout(()=>{
       // 这会导致watchEffect不能正常工作
       watchEffect(() => {
       	console.log("todoId", todoId.value);
       });  
     },1000)
     
     
     </script>
     ```
     
     

####  watch vs watchEffect

`watch`和`watchEffect`都能响应式地执行有副作用的回调。它们之间的主要区别是追踪响应式依赖的方式：

- `watch`只追踪明确侦听的数据源。不会追踪任何在回调中访问到的东西。并且仅在数据源确实改变时才会触发回调。`watch`会避免在发生副作用时追踪依赖，因此能够更加精确地控制回调函数的触发时机。
- `watchEffect`则会在副作用发生期间追踪依赖。会在同步执行过程中，自动追踪所有能访问到的响应式数据。这更方便，而且代码往往更简洁。但可能造成的缺点是响应式依赖关系不会那么明确。

#### 回调触发时机

当你更改了响应式状态，它可能会同时触发Vue组件更新和侦听器的回调。

侦听器的回调触发类似于组件更新，并不会修改后立即执行，而是会被批量处理从而避免重复调用。例如我们如果同步将一千个项目依次推入到被侦听的数组中，我们并不希望侦听器回调函数被触发触发一千次。

##### Post Watcher

在默认情况下，侦听器回调会在父组件**更新之后**、所属组件的DOM**更新之前**被调用。这意味着如果此时你想在侦听器回调函数中访问所属组件的DOM，那么DOM此时还处于更新之前的状态，此时可以有以下解决方案，或者直接用`watchPostEffect`：

```ts
watch(source, callback, {
  flush: 'post'
})

watchEffect(callback, {
  flush: 'post'
})

// 还可以用更方便的别名 watchPostEffect
watchPostEffect(() => {
  /* 在 Vue 更新后执行 */
})
```

通过以上方案，就可以让侦听器的回调函数在Vue**更新之后的所属组件**的DOM再调用。

##### 同步侦听器

可以创建一个同步触发的侦听器，它会在Vue进行任何更新之前触发：

```ts
watch(source, callback, {
  flush: 'sync'
})

watchEffect(callback, {
  flush: 'sync'
})

// 还可以用更方便的别名 watchSyncEffect
watchSyncEffect(() => {
  /* 在响应式数据变化时同步执行 */
})
```

> 谨慎使用
>
> 同步侦听器不会进行批处理，每当检测到响应式数据发生变化时就会触发。可以使用它来监视简单的布尔值，但应避免在可能多次同步修改的数据源 (如数组) 上使用。

#### 停止侦听器

在`setup()`或`<script setup>`中用同步语句创建的侦听器，会自动绑定到宿主组件实例上，并且会随着宿主组件卸载时自动停止，因此无需关心怎么停止一个侦听器，如以下代码示例：

```vue
<script setup>
import { watchEffect } from 'vue'

// 它会随着该组件卸载自动停止
watchEffect(() => {})
</script>
```

但是若通过异步创建的侦听器则不会随着组件卸载而停止侦听，此时若不做处理，将会导致内存泄漏。若通过异步创建的侦听器可以用以下方式手动停止侦听，如以下代码：

```vue
<script setup>
import { watch, onUnmounted } from "vue";
let unwatch;
const timer = setTimeout(() => {
  clearTimeout(timer);
  unwatch = watch(() => {});
}, 500);
onUnmounted(() => {
  // 手动取消侦听器
  unwatch();
});
</script>
```

> 注意
>
> 需要异步创建侦听器情况很少，尽可能选择同步创建。若需要等待异步获取的数据，可以用条件式的侦听逻辑。

```ts
// 需要异步请求得到的数据
const data = ref(null)

watchEffect(() => {
  if (data.value) {
    // 数据加载后执行某些操作...
  }
})
```

### 类与样式绑定

在Vue中，可以通过`v-bind:class`和`v-bind:style`绑定类与样式，可以依次简写为：`:class`或`:style`，它们的值除了可以是字符串外，还可以是对象或数组。

在组件上使用：

```vue
<!-- 子组件模板 -->
<p class="foo bar">Hi!</p>

<!-- 在使用组件时 -->
<MyComponent class="baz boo" />

<!-- 渲染出的 HTML 为 -->
<p class="foo bar baz boo">Hi!</p>

<!-- 以上规则同样试用于class和style样式绑定 -->
```

Q：当父组件使用子组件时，额外加了与子组件相同的class或style时，哪个上样式权重更大？

A：在父组件使用的类或样式权重时，父组件的权重更大。如下：

```vue
<!-- 子组件模板 -->
<template>
  <div class="child">This is child component.</div>
</template>

<style scoped>
.child {
  color: pink;
}
</style>


<!-- 在使用组件时 -->
<template>
  <Child class="child" />
</template>

<script setup>
import Child from "./components/Child.vue";
</script>
<style scoped>
.child {
  color: purple;
}
</style>


<!-- 渲染出的 HTML 为，会显示会紫色 -->
<div data-v-b36379bb data-v-7a7a37b1 class="child">This is child component.</div>
<!-- 样式表 -->
.child[data-v-7a7a37b1]{
	color: purple;
}
.child[data-v-b36379bb]{
	color: pink;
}
```



**样式多值**

可以对一个样式属性提供多个（不同前缀的）值，举例来说：

```vue
<div :style="{ display: ['-webkit-box', '-ms-flexbox', 'flex'] }"></div>
```

数组仅会渲染浏览器支持的最后一个值。在这个示例中，在支持不需要特别前缀的浏览器中都会渲染为 `display: flex`。



### 生命周期

#### 生命周期钩子函数

每个Vue组件实例在创建时都需要精力一系列的初始化操作，比如初始化数据侦听、编译模板、挂载实例到DOM，以及在数据改变时更新DOM。在此过程中，它也会运行被称为生命周期钩子的函数，让开发者可以在特定的阶段运行自己的代码。



#### 注册周期钩子注意事项

Vue会自动将回调函数注册到当前正被初始化的组件实例上，这意味着这些钩子函数应当在组件初始化时被同步注册，因此请不要异步注册周期钩子函数，它将不会正常工作，如下：

```ts
setTimeout(() => {
  onMounted(() => {
    // 异步注册时当前组件实例已丢失
    // 这将不会正常工作
  })
}, 100)
```
如下在注册周期钩子函数之前使用了异步等待，也是无法让钩子函数正常工作的。
```ts
import { onMounted } from "vue";

const sleep = scronds => {
  return new Promise(resolve => {
    const timer = setTimeout(() => {
      clearTimeout(timer);
      console.log("倒计时完成");
      resolve(true);
    }, scronds * 1000);
  });
};
// await sleep(2);
onMounted(() => {
   // 如果这注册钩子函数之前或之后调用sleep函数，那么onMounted周期函数都将不能正常工作。
   // 在开发中要尤其注意避免当顶层直接使用await进行异步等待
  console.log("挂载完成");
});
// await sleep(2);
```

> 注意
>
> 这不意味着钩子函数只能在`setup()`或`<script setup>`内的上下文中调用。钩子函数也可以在一个外部函数中调用，主要调用栈时同步的即可。

#### 生命周期图示

<img alt="生命周期图示" src="https://cn.vuejs.org/assets/lifecycle_zh-CN.FtDDVyNA.png" height="800px">

#### 生命周期钩子函数

##### onBeforeMount()

`onBeforeMount`回调函数会在组件被卸载之前调用。

当这个钩子函数被调用时，组件已经完成了其响应式状态的设置，但还未创建DOM节点。它即将首次执行DOM渲染过程。

**这个钩子函数在服务端渲染期间不会调用**

`onBeforeMount`回调函数会在组件被挂载之前被调用

##### onMounted

`onMounted()`回调函数会在组件挂载完成后执行。

组件在以下情况下被视为已挂载：

- 其所有同步组件都已经被挂载（不包含异步组件或`<Suspense>`树内的组件）。

- 其自身的DOM树已经创建完成并插入了父容器中。注意仅当根容器在文档中时，才可以保证组件DOM树也在文档中。

Q：了解这两点到底什么意思。

**这个钩子函数在服务端渲染期间不会被调用**

​			因为这个钩子通常用于执行需要访问组件所渲染的DOM树相关的副作用，或是在服务端渲染应用中用于确保DOM相关代码仅在客户端执行。

Q：思考为什么`onMounted`为什么不能在服务器端调用。

##### onBeforeUpdate

`onBeforeUpdate`回调函数会在组件即将因为响应式状态变更而更新DOM树之前调用。

- 这个钩子可以用来在Vue更新DOM之前访问DOM状态

- 这个钩子中更改状态也是安全的

**这个钩子在服务器端渲染期间不会被调用**

##### onUpdated

`onUpdated()`回调函数会在组件因为响应式状态变更而更新其DOM树之后调用。

父组件的更新钩子会在子组件更新钩子之后再调用。

这个钩子会在组件的任意DOM更新之后被调用，这些更新可能是由不同的状态变更而导致的，因为多个变更可以在同一个渲染周期中批量执行（考虑到性能原因会批量执行）。如果需要在某个特定的状态更改之后访问更新后的DOM，可以使用`nextTick`作为替代。

> 注意
>
> - 这个钩子在服务器端渲染期间不会被调用
>
> - 不要在`updated`钩子中更改组件的状态，这可能会导致无限的更新循环！

##### onBeforeUnmount

`onBeforeUnmount`回调函数会在组件实例被卸载之前调用。

当这个钩子被调用时，组件实例依然还保有全部的功能。

**这个钩子在服务器端渲染期间不会被调用**

##### onUnmounted

`onUnmounted`回调函数会在组件实例被卸载之后调用。

一个组件在以下情况下被视为已卸载：

- 所有的子组件都已经被销毁。

- 所有相关的响应式作用（渲染作用以及`setup()`时创建的计算属性和侦听器）都已经停止。

我们可以利用`onUnmounted`钩子函数手动清理一些副作用，比如清除计时器、DOM事件监听器或者与服务器的连接。

**这个钩子函数在服务器端渲染期间不会被调用**

##### onErrorCaptured

`onErrorCaptured`回调函数会在捕获到后代组件传递的错误时调用。

```ts
function onErrorCaptured(callback: ErrorCapturedHook): void

type ErrorCapturedHook = (
  err: unknown,
  instance: ComponentPublicInstance | null,
  info: string
) => boolean | void
```

该钩子函数可以捕获到的错误类型;

- 组件渲染

- 事件处理器

- 生命周期钩子函数

- `setup()`函数

- 侦听器

- 自定义指令钩子

- 过渡钩子

这个钩子带有三个实参：错误对象、触发该错误的组件实例，以及一个说明错误来源类型的信息字符串。

##### onRenderTracked

*Dev only*

`onRenderTracked`回调函数会在组件渲染过程中追踪到响应式依赖时调用。

**这个钩子仅在开发模式下可用，且在服务器端渲染期间不会被调用。**

```ts
function onRenderTracked(callback: DebuggerHook): void

type DebuggerHook = (e: DebuggerEvent) => void

type DebuggerEvent = {
  effect: ReactiveEffect
  target: object
  type: TrackOpTypes /* 'get' | 'has' | 'iterate' */
  key: any
}
```

##### onRenderTriggered

*Dev only*

`onRenderTriggered`回调函数会在当响应式依赖的变更触发了组件渲染时的调用。

**这个钩子仅在开发模式下可用，且在服务器端渲染期间不会被调用。**

```ts
function onRenderTriggered(callback: DebuggerHook): void

type DebuggerHook = (e: DebuggerEvent) => void

type DebuggerEvent = {
  effect: ReactiveEffect
  target: object
  type: TriggerOpTypes /* 'set' | 'add' | 'delete' | 'clear' */
  key: any
  newValue?: any
  oldValue?: any
  oldTarget?: Map<any, any> | Set<any>
}
```

##### onActivated

注册一个回调函数，若组件实例是 `<KeepAlive>`缓存树的一部分，当组件被插入到 DOM 中时调用。

**这个钩子在服务器端渲染期间不会被调用。**

##### onDeactivated

注册一个回调函数，若组件实例是`<KeepAlive>`缓存树的一部分，当组件从 DOM 中被移除时调用。

**这个钩子在服务器端渲染期间不会被调用。**

##### onServerPrefetch 

*SSR only*

注册一个异步函数，在组件实例在服务器上被渲染之前调用。

- 如果这个钩子返回了一个 Promise，服务端渲染会在渲染该组件前等待该 Promise 完成。

- 这个钩子仅会在服务端渲染中执行，可以用于执行一些仅存在于服务端的数据抓取过程。
