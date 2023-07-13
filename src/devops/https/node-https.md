---
title: node实现https
date: 2022-10-20
category:
  - 运维
---

<!-- more -->

```js
const express = require("express"),
  https = require("https"),
  fs = require("fs"); //http服务

const loginRouter = require("./routers/login");
const app = express();

app.use(express.json()); //请求数据以json格式为主
app.use(express.urlencoded({ extended: true })); //请求头的数据类型为 x/www-form-urlencoded

//配置https
// https服务
const options = {
  key: fs.readFileSync(__dirname + "/utils/ssl/xxx.key", "utf8"),
  cert: fs.readFileSync(__dirname + "/utils/ssl/xxx.crt", "utf8"),
};
const server = https.createServer(options, app);
server.listen(5577, () => {
  console.log("https port is 5577!");
});

app.use("/login", loginRouter); //使用登录路由

app.listen(5566, () => {
  //配置http的端口号为5566
  console.log("http port is 5566");
});
```
