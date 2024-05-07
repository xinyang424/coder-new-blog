---
title: CORS 
date: 2023-05-20
icon: cors
order: 3
---




## 基于 Nodejs + Express 实践

自行封装 cors：
```js
const express = require('express');
const router = express.Router();

router.all('*', function (req, res, next) {
    /* 设置响应头，允许所有网站都可以请求，当然也可以进行白名单配置，运行哪些可以通过访问，其它不可通过访问 */
    res.header('Access-Control-Allow-Origin', '*');
    /* 设置我们的请求方式可以有以下这些 */
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE,OPTIONS');
    /* 设置响应头可以有以下这些 */
    res.header('Access-Control-Allow-Headers', 'Content-Type,Content-Length, Authorization, Accept,X-Requested-With,token');
    /* 放行 */
    req.method === 'OPTIONS' ? res.status(204).end() : next();
});

module.exports = router;
```

使用的时候一定要在所有请求之前调用：
```js
const express = require('express');
const cors = require('./utils/cors');
const loginRouter = require('./routers/login');

//创建express服务 http
const app = express();

app.use(cors);//解决跨域问题

// 使用路由

app.use('/login', loginRouter);
```