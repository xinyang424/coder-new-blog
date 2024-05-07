---
title: Markdown 方言
date: 2023-04-05
category:
  - Markdown
order: 3
---

### 选项卡

```ts
// 配置
import { hopeTheme } from "vuepress-theme-hope";

export default {
  theme: hopeTheme({
    plugins: {
      mdEnhance: {
        tabs: true,
      },
    },
  }),
};
```



:::: md-demo 非联动切换
::: tabs

@tab 标题 1

标题 1 的内容 

@tab 标题 2

标题 2 的内容 

@tab:active 标题 3


标题 3 的内容 后面跟:active会被默认激活

:::
::::



**联动切换**


:::: md-demo 联动切换
一个水果选项卡列表:

::: tabs#fruit

@tab apple#apple

Apple

@tab banana#banana

Banana


:::

另一个水果选项卡列表:

::: tabs#fruit

@tab apple

Apple

@tab banana

Banana

@tab orange

Orange

:::
::::



### GFM 警告

```ts
// 配置
import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
  theme: hopeTheme({
    plugins: {
      mdEnhance: {
        // 启用 GFM 警告
        alert: true,
      },
    },
  }),
});

```


::: md-demo GFM 警告
> [!note]
> 注释文字

> [!important]
> 重要文字

> [!tip]
> 提示文字

> [!warning]
> 注意文字

> [!caution]
> 警告文字
:::




### 属性支持


```ts
// 配置
import { hopeTheme } from "vuepress-theme-hope";

export default {
  theme: hopeTheme({
    plugins: {
      mdEnhance: {
        attrs: true,
      },
    },
  }),
};

```


可以使用语法 `{attrs}` 来为 Markdown 元素添加属性。

比如，如果你想要一个 id 为 say-hello-world，文字为 Hello World 的二级标题，你可以使用:
```md
## Hello World {#say-hello-world}
```

如果你想要一个有 full-width Class 的图片，你可以使用:
```md
![img](link/to/image.png) {.full-width}
```

同时也支持其他属性:
```md
一个包含文字的段落。 {#p .a .b align=center customize-attr="content with spaces"}
```

会被渲染为：
```html
<p id="p" class="a b" align="center" customize-attr="content with spaces">
  一个包含文字的段落。
</p>
```

### 提示容器


```ts
// 配置
import { hopeTheme } from "vuepress-theme-hope";

export default {
  theme: hopeTheme({
    plugins: {
      mdEnhance: {
        // 这就是默认选项，所以你可以直接使用此功能
        hint: true,
      },
    },
  }),
};

```

 
:::: md-demo 提示容器
::: important
重要容器。
:::

::: info
信息容器。
:::

::: note
注释容器。
:::

::: tip
提示容器
:::

::: warning
警告容器
:::

::: caution
危险容器
:::

::: details
详情容器
:::
::::


### 自定义对齐


```ts
// 配置
import { hopeTheme } from "vuepress-theme-hope";

export default {
  theme: hopeTheme({
    plugins: {
      mdEnhance: {
        align: true,
      },
    },
  }),
};
```


:::: md-demo 自定义对齐
::: left
左对齐的内容
:::

::: center
居中的内容
:::

::: right
右对齐的内容
:::

::: justify
两端对齐的内容
:::
::::



### 代码块分组

```ts
// 配置
import { hopeTheme } from "vuepress-theme-hope";

export default {
  theme: hopeTheme({
    plugins: {
      mdEnhance: {
        codetabs: true,
      },
    },
  }),
};

```

:::: md-demo 代码块分组
::: code-tabs#shell

@tab pnpm

```bash
pnpm add -D vuepress-plugin-md-enhance
```

@tab yarn

```bash
yarn add -D vuepress-plugin-md-enhance
```

@tab:active npm

```bash
npm i -D vuepress-plugin-md-enhance
```
:::
::::

