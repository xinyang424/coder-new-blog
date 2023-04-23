---
title: vue-router
date: 2022-03-16
category:
  - vue2
tag:
  - vue-router
---

## 动态路由匹配

```js
{
  path: "/about/:username",
  name: "about",
  component: () => import("@/views/AboutView.vue"),
},
```

```vue
<!-- app.vue -->
<template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about/John">About</router-link>
    </nav>
    <router-view />
  </div>
</template>

<!-- about.vue -->
<script>
export default {
  created() {
    console.log(this.$route.params);
  },
};
</script>

<!-- output -->
{ "username": "John" }
```


## 导航守卫

### 全局前置守卫
```javascript
const router = new VueRouter({ ... })

router.beforeEach((to, from, next) => {
  // ...
})
```
当一个导航触发时，全局前置守卫按照创建顺序调用。守卫是异步解析执行，此时导航在所有守卫 resolve 完之前一直处于 等待中。  

**参数说明**  
- `to: Route`：即将要进入的目标路由对象。
- `from: Route`：当前导航正要离开的路由。
- `next: Function`:
  - `next()`：允许跳转。
  - `next(false)`：中断跳转。
  - `next("/")`或`next({ path: "/" })`：跳转到指定位置。
  - `next(error)`：(2.4.0+) 如果传入 `next` 的参数是一个 `Error` 实例，则导航会被终止且该错误会被传递给 `router.onError()` 注册过的回调。

**使用示例**  
```javascript
router.beforeEach((to, from, next) => {
  if (to.name !== 'Login' && !isAuthenticated) next({ name: 'Login' })
  else next()
})
```

### 全局解析守卫
在 `2.5.0+` 你可以用 `router.beforeResolve` 注册一个全局守卫。这和 `router.beforeEach` 类似，区别是在导航被确认之前，同时在所有组件内守卫和异步路由组件被解析之后，解析守卫就被调用。

### 全局后置钩子
与守卫不同的是，这些钩子不会接受 `next` 函数也不会改变导航本身：
```javascript
router.afterEach((to, from) => {
  // ...
})
```

### 路由独享守卫
```javascript
const router = new VueRouter({
  routes: [
    {
      path: '/foo',
      component: Foo,
      beforeEnter: (to, from, next) => {
        // ...
      }
    }
  ]
})
```

### 组件内的守卫
```javascript
const Foo = {
  template: `...`,
  beforeRouteEnter(to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
  },
  beforeRouteUpdate(to, from, next) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
  },
  beforeRouteLeave(to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
  }
}
```

**注意**
`beforeRouteEnter` 守卫 不能 访问 `this`，因为守卫在导航确认前被调用，因此即将登场的新组件还没被创建。

不过，你可以通过传一个回调给 `next`来访问组件实例。在导航被确认的时候执行回调，并且把组件实例作为回调方法的参数。
```javascript
beforeRouteEnter (to, from, next) {
  next(vm => {
    // 通过 `vm` 访问组件实例
  })
}
```

## history模式
**启用**
```javascript
const router = new VueRouter({
  mode: 'history',
  routes: [...]
})
```

**服务器支持**
1. Apaache
```text
<IfModule mod_negotiation.c>
  Options -MultiViews
</IfModule>
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```
2. nginx
```json
 location / {
   try_files $uri $uri/ /index.html;
 }
```
3. nodejs + http
```javascript
const http = require('http')
const fs = require('fs')
const httpPort = 80

http.createServer((req, res) => {
  fs.readFile('index.html', 'utf-8', (err, content) => {
    if (err) {
      console.log('We cannot open "index.html" file.')
    }

    res.writeHead(200, {
      'Content-Type': 'text/html; charset=utf-8'
    })

    res.end(content)
  })
}).listen(httpPort, () => {
  console.log('Server listening on: http://localhost:%s', httpPort)
})
```
4. nodejs+express
   使用 [connect-history-api-fallback 中间件](https://github.com/bripkens/connect-history-api-fallback)
5. vue配置404组件
```javascript
const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '*', component: NotFoundComponent }
  ]
})
```

