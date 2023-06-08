---
title: JS替换反斜杠
date: 2023-06-08
category:
  - bug记录
---

:::normal-demo 示例代码

```js
const oss = `{"bus_key":"2023/06/08/6657c455911f402dab9d5e778fcbb95c"`;

function formatOss(oss) {
  const format = oss.substr(oss.indexOf("{"), oss.lastIndexOf("}") + 1).replaceAll(/\\/g, "");

  if (oss.indexOf("{") !== -1 && oss.lastIndexOf("}") + 1 !== -1 && format.endsWith('""')) {
    return format.substr(0, format.length - 2);
  } else {
    return '传入格式错误，不包括符号 "{" 或 "}"'
  }
}

console.log(formatOss(oss));

```

:::