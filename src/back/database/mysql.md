---
title: MySQL
date: 2022-03-01
category:
  - 数据库
tag:
  - MySQL语句
  - 基本的增删改查语句
index: false
---



## 创建数据库

```sql
DROP DATABASE IF EXISTS mydb;
CREATE DATABASE mydb;

-- or
CREATE DATABASE IF NOT EXISTS mydb;
```

## 创建表

## 插入数据
三种方法：
1. `INSERT INTO 表名(列名,列名,列名...) VALUES(值,值,值....);`可选择添加数据，列名与数据要一一对应。
2. `INSERT INTO 表名 VALUES(值,值,.....);`必须对应列名顺序，必须全部添加。
3. `INSERT INTO 表名 VALUES (值,值,...) ,(),();`使用插入多条数据的时候。

## 删除表数据
两种方法：
1. `DELETE from 表名 WHERE u_id=5;`
2. `TRUNCATE TABLE 表名`

两者区别：
`DELETE`是假删，可以恢复的，比如自增长的id，新增id为1，删除id为1，但是新增后id从2开始的。
`TRUNCATE`常用于清空表的数据

## 修改表


## 修改表数据
- `UPDATE 表名 set 列名 = 值` 会把某一列全部修改为某个值
- `UPDATE 表名 set 列名 = 值 WHERE u_id=1` 根据条件去指定修改某一行的数据



## 删除数据

## 查询