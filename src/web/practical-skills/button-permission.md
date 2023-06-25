---
title: 按钮权限控制
date: 2022-12-12
category:
  - 实用技巧
---

<!-- more -->


## 获取权限码

要做权限控制，肯定需要一个`code`，无论是权限码还是角色码都可以，一般后端会一次性返回，然后全局存储起来就可以了：
```js
import { defineStore } from 'pinia';
export const usePermissionStore = defineStore({
    state: () => ({
        // 权限代码列表
        permCodeList: [],
    }),
    getters: {
        // 获取
        getPermCodeList(){
      		return this.permCodeList;
    	},	
    },
    actions: {
        // 存储
        setPermCodeList(codeList) {
            this.permCodeList = codeList;
        },

        // 请求权限码
        async changePermissionCode() {
            const codeList = await getPermCode();
            this.setPermCodeList(codeList);
        }
    }
})

```
接下来它提供了三种按钮级别的权限控制方式。

## 函数方式
使用示例如下：
::: code-tabs#shell

@tab HTML
```html
<template>
  <a-button v-if="hasPermission(['20000', '2000010'])" color="error" class="mx-4">
    拥有[20000,2000010]code可见
  </a-button>
</template>

<script lang="ts">
  import { usePermission } from '/@/hooks/web/usePermission';

  export default defineComponent({
    setup() {
      const { hasPermission } = usePermission();
      return { hasPermission };
    },
  });
</script>

```
@tab JS
```js
export function usePermission() {
    function hasPermission(value, def = true) {
        // 默认视为有权限
        if (!value) {
            return def;
        }

        const allCodeList = permissionStore.getPermCodeList;
        if (!isArray(value)) {
            return allCodeList.includes(value);
        }
        // intersection是lodash提供的一个方法，用于返回一个所有给定数组都存在的元素组成的数组
        return (intersection(value, allCodeList)).length > 0;

        return true;
    }
}

```
:::

## 组件方式

::: code-tabs#shell

@tab 使用
```vue
<template>
  <div>
    <Authority :value="RoleEnum.ADMIN">
      <a-button type="primary" block> 只有admin角色可见 </a-button>
    </Authority>
  </div>
</template>
<script>
  import { Authority } from '/@/components/Authority';
  import { defineComponent } from 'vue';
  export default defineComponent({
    components: { Authority },
  });
</script>

```

@tab 组件
```vue
<script lang="ts">
  import { defineComponent } from 'vue';
  import { usePermission } from '/@/hooks/web/usePermission';
  import { getSlot } from '/@/utils/helper/tsxHelper';

  export default defineComponent({
    name: 'Authority',
    props: {
      value: {
        type: [Number, Array, String],
        default: '',
      },
    },
    setup(props, { slots }) {
      const { hasPermission } = usePermission();

      function renderAuth() {
        const { value } = props;
        if (!value) {
          return getSlot(slots);
        }
        return hasPermission(value) ? getSlot(slots) : null;
      }

      return () => {
        return renderAuth();
      };
    },
  });
</script>

```
:::


