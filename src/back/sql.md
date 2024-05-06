---
title: SQL语句
date: 2022-03-01
order: 1
---





## 注释

### 单行注释

```sql
-- 这是单行注释的内容
```

### 多行注释

```sql
/*
 这
 是
 多
 行
 注
 释
 的
 内
 容
 */
```

## 查看数据库

该方法可以查看当前连接的所有数据库列表

```sql
SHOW DATABASES;
```

## 使用数据库

连接数据库成功后，需要使用哪个就使用`use`关键字进行使用，如：
```sql
USE mydb;
```

## 创建数据库

```sql
-- 直接创建数据库
CREATE DATABASE mydb;

-- 创建数据库之前无论有没有先删除一下
DROP DATABASE IF EXISTS mydb;
CREATE DATABASE mydb;

-- 创建数据库之前条件判断一下是否存在，如果不存在才创建
CREATE DATABASE IF NOT EXISTS mydb;
```

## 创建表

### 数据类型

学会创建表之前，首先需要知道一些关于数据库数据类型的前置知识：

数据库数据类型有：
- `int`-整型/整数
- `float`-浮点型/小数
- `char`-存在固定长度的字符串
- `varchar`-非固定长度的字符串，比如`varchar(6)`，字符串代表长度可以不固定，但是最大长度是6位
- `date`-时间格式，格式为：`yyyy-mm-dd`
- `datetime`-时间的一种格式，格式为：`yyyy-mm-dd hh:mm:ss`

数据库表名是不区分大小写的，因此表名不可使用驼峰命名法，你可以使用大写，也可以使用小写，若两个单词需要连接，可以考虑采用下划线`_`进行连接，如`t_user`。

### 约束类型


创建表的语法格式为：
```sql
CREATE TABLE 表名(
	列名 数据类型 可选可不选的约束 COMMENT '字段代表意思',
	列名 数据类型 ,
    ...
    外键约束
) COMMENT '表意思';
```

常见的列名约束有：
- `主键约束`：每张表都需要一个主键约束，并且有且只有一个，通常以数字作为主键，也可以是其它类型，使用主键约束的关键字为`PRIMARY KEY`，可配合`AUTO_INCREMENT`一起使用，实现主键自增。
- `唯一约束`：关键字为`unique`，使用了唯一约束后，该表的这一列保存的数据不能重复，通常可以对身份证这一类数据进行唯一约束。
- `非空约束`：关键字为`not null`，使用非空约束后，代表该表保存这一列的数据不能为空，比如该表保存的用户名、性别、注册时间这类数据不能为空。
- `默认值约束`：关键字为`default`，使用了默认值约束后，当插入数据时候，可以不填这一项数据，数据库保存的时候，会自动设置你在创建表时设置的默认值，格式如：`DEFAULT '男'`
  
外键约束：这个外键约束了另外一张表的主键，因为外键的存在，所以与另外一张表产生关系。此时就会诞生一种概念：==主表==、==从表==。

哪张表设置了外键约束关联，那张表就是从表。关联了哪张表的主键，那张表就是主表。

设置外键约束注意事项：
1. 创建的时候先创建主表，再创建从表。
2. 删除的时候先删除从表，再删除主表。
3. 从表的外键和主表外键数据类型应是一样的
4. 主表的外键必须是主键。

什么时候需要用到外键约束？

&emsp;&emsp;场景假设：当一张表保存的是用户信息，比如用户姓名、年龄、性别等，另一张表保存的是用户的浏览记录，这个时候我们肯定会想到，肯定是先有用户才有的浏览记录，而不是先有该用户的浏览记录才有的该用户。此时可以用到外键约束，用户信息表是主表，用户的浏览器记录是从表，先创建用户信息主表，再创建用户浏览器记录从表。

语法示例：
```sql
-- 创建工作表
CREATE TABLE t_job(
	j_id INT PRIMARY KEY AUTO_INCREMENT COMMENT '表主键',
	j_name VARCHAR(16) NOT NULL UNIQUE COMMENT '工作岗位名称，不能为空'
) COMMENT '工作岗位表';

-- 创建用户表
CREATE TABLE t_user(
	u_id INT PRIMARY KEY AUTO_INCREMENT COMMENT '表主键',
    u_name VARCHAR(6) NOT NULL COMMENT '用户名称，不能为空',
	u_age INT COMMENT '用户年龄',
	u_sex CHAR(1) DEFAULT '男' COMMENT '用户性别，默认值是‘男’',
	u_tel CHAR(11) UNIQUE COMMENT '用户手机号，并且唯一不能重复',
	u_j_id INT  COMMENT '用户关联用户工作表的主键id',
    -- 设置外键约束，将u_j_id关联t_job的j_id
	CONSTRAINT FOREIGN KEY(u_j_id) REFERENCES t_job(j_id)
) COMMENT '用户表';
```

## 删除表

```sql
DROP TABLE t_user;
```

## 修改表

修改表设置的列属性：
```sql
-- 修改表名为t_user，添加t_address作为新列，数据类型是varchar(30)，约束为NOT NULL
ALTER TABLE t_user ADD t_address varchar(30) NOT NULL;
-- 修改表名为t_user，修改t_address列名为t_merry，修改为数据类型是CHAR(2)，约束为NOT NULL
ALTER TABLE t_user CHANGE t_address t_merry  CHAR(2) NOT NULL;
-- 删除表名为t_user的列名为t_merry的这一列
ALTER TABLE t_user DROP t_merry
```

## 查看表

```sql
SHOW TABLES;
```

## 备份表

`create table 备份表表名 select  * from 要备份的表名`

## 插入表数据
三种方法：
1. `INSERT INTO 表名(列名,列名,列名...) VALUES(值,值,值....);`可选择添加数据，列名与数据要一一对应。
2. `INSERT INTO 表名 VALUES(值,值,.....);`必须对应列名顺序，必须全部添加。
3. `INSERT INTO 表名 VALUES (值,值,...) ,(),();`使用插入多条数据的时候。

## 删除表数据
两种方法：
1. `DELETE from 表名`：直接删除表数据
2. `DELETE from 表名 WHERE u_id=5;`：条件删除表数据
3. `TRUNCATE TABLE 表名`：删除所有表数据，与`DELETE`关键字见下。

`DELETE`和`TRUNCATE`两者删除的区别：
`DELETE`是假删，可以恢复的，比如自增长的id，新增id为1，删除id为1，但是新增后id从2开始的。
`TRUNCATE`常用于清空表的数据



## 修改表数据
- `UPDATE 表名 set 列名 = 值` 会把某一列全部修改为某个值
- `UPDATE 表名 set 列名 = 值 WHERE u_id=1` 根据条件去指定修改某一行的数据





## 查询

### 全量查询

不带条件的查询，直接查出所有数据：
```sql
-- 仅查出表t_user的u_name这一列
SELECT u_name FROM t_user
-- 查出表t_user的所有列
SELECT * FROM t_user;

-- 将查询后的列名取别名

-- 利用 AS 关键字取别名
SELECT u_name AS name , u_age AS age FROM t_user;
-- 也可不利用 AS 关键字取别名，但需要空格进行隔开
SELECT u_name name , u_age age FROM t_user;
-- 也可将别名取为中文类型的
SELECT u_name AS '姓名' , u_age AS '年龄' FROM t_user;

-- 查询后可以把查询后的的值计算返回(注意加应该是数字，不能是字符串)

-- 没有通过计算正常查询的
SELECT u_name,u_age FROM t_user;
-- 将年龄都 +10 后查询
SELECT u_name,u_age+10 FROM t_user;
```

### 条件查询

查询有常规利用`where`关键字进行查询，还可以有==范围查询==，如利用`>`、`<`、`=`、`<=`、`>=`、`!=`、`OR`、`IN`、`BETWEEN...AND...`、`AND`;==模糊查询==，如关键字`LIKE`。

常规查询：
```sql
-- 常规查询
SELECT * FROM t_user WHERE u_id=1;
```

范围查询：
```sql
-- 利用!=关键字 （筛选出年龄不等于18岁的用户）
SELECT * FROM t_user WHERE u_age!=18;

-- 同时利用>、<=、AND关键字 （筛选出年龄大于18岁并且小于等于23岁的用户）
SELECT * FROM t_user WHERE u_age>18 AND u_age<=23;

-- 利用BETWEEN...AND...关键字 （筛选出年龄在18~23岁之间）
SELECT * FROM t_user WHERE u_age BETWEEN 18 AND 23;

-- 利用OR关键字 （筛选出年龄等于2、等于12、等于18的用户）
SELECT * FROM t_user WHERE u_age=2 OR u_age=12 OR u_age=18;

-- 利用IN关键字 (筛选出年龄在18~22岁之间的用户)
SELECT * FROM t_user WHERE u_age IN (18,22);

```

模糊查询，关键字`LIKE`，其中`%`代表任意长度的字符，`_`代表一个长度的字符
```sql
-- 开头是老（长度不限）
SELECT * FROM t_user WHERE u_name like '老%';
-- 中间是（长度不限）
SELECT * FROM t_user WHERE u_name like '%王%';

-- 开头是老（长度限两位）
SELECT * FROM t_user WHERE u_name like '老_';
-- 中间是老（长度限三位）
SELECT * FROM t_user WHERE u_name like '_老_';
```

### 查询去重

```sql
SELECT DISTINCT sage from t_student
```

### 限制查询条数
使用`LIMIT`，规则与JavaScript普遍一样，都是前包括后不包括，比如`LIMIT(0,2)`，只会返回第0、第1条。

```sql
SELECT * FROM t_student LIMIT 0,2; 
```

### 非空查询

```sql
-- 查询列名ssex为空的数据
SELECT * FROM t_student where ssex is NULL;
-- 查询列名ssex不为空的数据
SELECT * FROM t_student where ssex is NOT NULL;
-- 查询列名sgrade为空字符串的数据
SELECT * FROM t_student where sgrade="";
```

###  查询排序

关键字`ORDER BY xx`-按什么进行分组、`DESC`-从大到小排、`ASC`-从小到大排序，不加该关键字默认是从小到大排序

```sql
-- 按照sage从小到大进行排序
select * FROM t_student ORDER BY sage;
-- 按照sage从大到小进行排序
select * FROM t_student ORDER BY sage DESC;

-- 按照sage从大到小排序，再按照sno从大到小进行排序
select * FROM t_student ORDER BY sage DESC,sno DESC;
```

### FROM 子查询

在`from`关键字里面的子查询：
```sql
SELECT *
FROM(
	SELECT * FROM 表名 LIMIT 0,5
) AS 别名（必须需要一个别名）
WHERE
  条件
```

### WHERE 子查询

在关键字`WHERE`内的子查询
```sql
SELECT *
FROM t_student
WHERE s_class_id = (
		SELECT c_id
		FROM t_class
		WHERE c_name='班级1'
);
```

### column 子查询

在“列”里面的子查询：
```sql
SELECT s_name,(
	SELECT s_class_id
	FROM t_class AS t2
	WHERE t1.s_class_id = t2.c_id
)
FROM t_student AS t1;
```

## 表连接

表连接分为：
- 自连接，关键字：`表1 INNER JOIN 表2`
- 全连接，关键字：`表1 JOIN 表2 ON 表1.列名 = 表2.列名`
- 左连接，关键字：`表1 LEFT JOIN 表2 ON 表1.表1的列名 = 表2.表2的列名`。
- 右连接，关键字：`表1 RIGHT JOIN 表2 ON 表1.表1的列名 = 表2.表2的列名`
- 交叉连接，关键字：`表1 CROSS JOIN 表2 ON 表1.表1的列名 = 表2.表2的列名`


左连接、右连接、自连接、全连接

### 自连接/内连接

```sql
SELECT e1.name AS Employee, e2.name AS Manager
FROM employees e1
INNER JOIN employees e2 ON e1.manager_id = e2.id;
```

上面语句可以不加`INNER`关键字也是起作用的，加不加都是自连接，加上相当于显示自连接，不加相当于隐式自连接。

### 全连接

使用关键字`表1 JOIN 表2 ON 表1.表1的列名 = 表2.表2的列名`

```sql
SELECT *
FROM t_a JOIN t_b ON  t_a.a_b_id = t_b.b_id;
```

### 左连接

保全左边的数据，使用左连接，左连接使用关键字`表1 LEFT JOIN 表2 ON 表1.表1的列名 = 表2.表2的列名`，如：
```sql
SELECT *
FROM t_a LEFT JOIN t_b ON  t_a.a_b_id = t_b.b_id;
```

### 右连接

保全右边的数据，使用右连接，右连接使用关键字`表1 RIGHT JOIN 表2 ON 表1.表1的列名 = 表2.表2的列名`，如：
```sql
SELECT *
FROM t_a RIGHT JOIN t_b ON  t_a.a_b_id = t_b.b_id;
```

### 交叉连接

左表的每一个记录，对应右表的全部记录。

```sql
SELECT
	* 
FROM
	left_table
	CROSS JOIN right_table ON left_table.left_id = right_table.right_id

```


## 聚合函数

- `COUNT()`：统计数量
- `AVG()`：平均值
- `MIN()`：最小值
- `MAX()`：最大值
- `SUM()`：求和

在使用过程中还可能使用到其它关键字：`IFNULL`、`HAVING`、`GROUP BY`


```sql
-- 不会把列名sno为null的数据统计进去
SELECT COUNT(sno) FROM t_student;
-- 统计表t_student有多少条数据
SELECT COUNT(*) FROM t_student;


-- 求平均
-- (一般如果有一列为null，最后除的时候，这一条不算)
SELECT AVG(sage) FROM t_student;
-- 如果想让null参与运算 IFNULL,如果是null就为0，关键字是IFNULL
SELECT AVG(IFNULL(sage,0)) FROM t_student;

-- 最小值 
SELECT MIN(sage) FROM t_student;

-- 最大值 
SELECT MAX(sage) FROM t_student;

-- 求和 
SELECT SUM(sage) FROM t_student;
```

分组查询：
```sql
-- 分组查询 GROUP BY (null会参与)   一般分组都是和统计一起使用
SELECT ssex FROM t_student GROUP BY ssex;

-- 分组和统计可以在一起使用
SELECT ssex,COUNT(ssex) FROM t_student GROUP BY ssex;

-- 分组统计后在进行筛选
SELECT ssex,COUNT(ssex) FROM t_student GROUP BY ssex HAVING COUNT(ssex)>3;
```

## 关于查询补充

查询的完整数据格式：`SELECT 去重 列名|*|聚合函数 FROM 表名 WHERE 条件 HAVING 分组统计后的筛选 ORDER BY 排序`。

它的执行顺序为：`FROM > WHERE >S ELECT > GROUP BY > COUNT() > HAVING > ORDER BY`




## 基于 Nodejs + Express 实践

安装：
```shell
npm i mysql
```

封装成公共方法：
```js
const mysql = require("mysql"); 

function db(sql, options, callback) {
  let myserver = mysql.createConnection({
    host: "数据库ip地址",
    user: "数据库连接用户名",
    password: "数据库连接密码",
    database: "连接的数据名名",
    port: 3306, // 端口号，默认3306，若修改了需要重新指定端口号
  });

  myserver.connect();

  myserver.query(sql, options, callback);

  myserver.end();
}

module.exports = db;
```

使用：
```js
const express = require('express');
const router = express.Router();
const db = require('../utils/db');

router.get('/getCourseClass', function (req, res) {
    let query = 'SELECT * FROM o_course;'
    db(query, null, function (err, data) {
        if (err) {
            return res.send({
                code: 500
            })
        }
        res.send({
            code: 200,
            data: data.length ? data : []
        })
    })

})
```
