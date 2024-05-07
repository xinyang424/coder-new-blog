---
title: Express 
date: 2023-05-25
icon: express
order: 2
---


安装：
```shell
npm i express
```

项目根目录下创建`app.js`文件，该文件有以下内容：
```js
const express = require('express'), https = require('https'), fs = require('fs');

const cors = require('./utils/cors');//跨域
const jwt = require('./utils/jwt');//jsonwebtoken

// 引入路由
const homeRouter = require('./routers/home')
const loginRouter = require('./routers/login')

//创建http服务 
const app = express();

//配置https
const options = {
    // 两个https的证书
    key: fs.readFileSync(__dirname + '/utils/ssl/xxx.com.cn.key', "utf8"),
    cert: fs.readFileSync(__dirname + '/utils/ssl/xxx.com.cn_public.crt', "utf8")
}
// 创建https服务
const server = https.createServer(options, app)

// 打开一个端口作为https服务，端口号为5577
server.listen(5577, () => {
    console.log("https port is 5577!")
})

// 配置请求数据以json格式为主
app.use(express.json()) 
// 配置请求头的数据类型为 x/www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// 解决跨域问题
app.use(cors);
// 验证token
app.use(jwt);

//使用路由
app.use('/home', homeRouter);
app.use('/login', loginRouter);

//配置http端口号为5566
app.listen(5566, () => {
    console.log('http port is 5566')
})

```

由以上代码我们还需要配置路由，在项目根目录下创建`routers`文件夹。该文件夹下有`home.js`和`login.js`，有以下内容：

```js
// home.js
const express = require('express');
const router = express.Router();
const db = require('../utils/db');

//查询轮播图内容
router.get('/getSlideShow', function (req, res) {
    let mysql = `SELECT * FROM o_slideshow;`
    db(mysql, null, function (err, data) {
        if (err) {
            console.log(err);
            return res.json({
                code: 500,
                msg: '服务器报错，请稍后重试'
            })
        }
        return res.send({
            code: 200,
            data: data
        })

    })
});
module.exports = router;

// login.js
const express = require('express');
const router = express.Router();
const db = require('../utils/db');
const jwt = require('jsonwebtoken');

//用户登录
router.post('/getuser', function (req, res) {
    let mysql = 'SELECT s_id,s_disable FROM o_student WHERE s_tel = ? AND s_password = ?;';
    let mysql2 = 'SELECT s_id FROM o_student WHERE s_tel = ?;'
    db(mysql, [req.body.phone, req.body.password], function (err, data) {
        if (err) {
            console.log(err);
            return res.send({
                code: 500
            })
        }
        if (data.length) {
            //账号或密码都对
            return res.send({
                code: 200,
                data: data,
                token: jwt.sign({ data: data[0] }, 'PrivateKey', { expiresIn: '168h' })
            })
        }

    })
})

module.exports = router;
```

关于`utils`文件夹下的`cors.js`和`db.js`、`jwt.js`文件内容，可依次参考：[cors](cors.md)、[sql](sql.md)、[jwt](jwt.md)。


在项目根目录下终端，输入以下指令开始运行：
```shell
# 直接运行
node app.js

# 使用nodemon 使用可以全局安装：npm i nodemon -g，或安装在项目内npm i nodemon -D，这样每次保存代码都会自动重新运行一遍，而node app.js运行方式每次都需要手动更新，安装nodemon完成后
nodemon app.js

# 或使用pm2运行，有关pm2介绍，请在本网站中搜索。
```


**注意：若无https证书，需要对应地将https配置代码注释掉，读取https两个证书需要用到fs，安装命令如下：**
```shell
npm i fs
```

配置https服务也需要安装：
```shell
npm i https
```