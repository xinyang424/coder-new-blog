---
title: React.lazy
date: 2022-07-05
category:
  - React
---


React.lazy函数能让你像渲染常规组件一样动态引入组件。


<!-- more -->

```js
// before
import OtherComponent from "./otherComponent";


// after
const OtherComponent = React.lazy(() => import("./OtherComponent"));
```

此代码将会在组件首次渲染的时候，自动导入包含`OtherComponent`组件的包。

`React.lazy`接受一个函数，这个函数需要动态调用`import()`。它必须返回一个`Promise`，该Promise需要resolve一个`defalut`export的React组件。

然后应在`Suspense`组件中渲染lazy组件，如此使得我们可以使用在等待加载lazy组件时做优雅降级（如loading指示器等）。

```js
import React, { Suspense } from 'react';

const OtherComponent = React.lazy(() => import('./OtherComponent'));

function MyComponent() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <OtherComponent />
      </Suspense>
    </div>
  );
}
```

`Suspense` 组件还可以包裹多个懒加载组件：
```js
import React, { Suspense } from 'react';

const OtherComponent = React.lazy(() => import('./OtherComponent'));
const AnotherComponent = React.lazy(() => import('./AnotherComponent'));

function MyComponent() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <section>
          <OtherComponent />
          <AnotherComponent />
        </section>
      </Suspense>
    </div>
  );
}
```



