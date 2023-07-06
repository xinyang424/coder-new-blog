---
title: 正则表达式
date: 2022-12-15
category:
  - javascript
---


<!-- more -->


## 常用正式表达式
1. `\d`数字等价[0-9]
2. `\D`代表的是非数字
3. `\s`空白字符包括换行
4. `\S`非空白符，与上面相反
5. `\n`换行
6. `\w`等价`[A-Za-z0-9_]`
7. `\W`等价`[^A-Za-z0-9_]`
8. `\t`
9. `.`匹配除换行符(`\n`、`\r`)之外的任意单个字符，相等于`[^\n\r]`
10. `*`任意长度，等价`{0,}`
11. `+`长度大于1位，等价`{1,}`
12. `?`长度0-1位，等价`{0,1}`
13. `[]`组合`[0-9]`表示0-9，`[0-9a-z.$]`表示`0-9`或者`a-z`或者`.`或者`$`
14. `{}`长度显示，`{0,5}`表示长度0-5，`{5}`表示长度5，`{1,}`表示长度大于1
15. `^`以什么开头，如果在`[]`中出现，那么表示非，取反的意思
16. `$`表示以什么结尾
17. `//g`正则后面的g代表全量匹配，会匹配多次


## 代码示例
```javascript
const reg1 = /\d/

console.log(reg1.test('13'))//打印为true
console.log(reg1.test('a13b'))//打印为true

//由此可见，reg1是当有数字的时候就会返回true，如果我想完全由数字匹配返回true，可以这么修改

const reg2 = /^\d$/   //^以数字开头、$代表以数字结尾，匹配的是一位数字

const reg3 = /^\d\d$/   //^以数字开头、$代表以数字结尾，匹配的是两位数字
const reg4 = /^\d{2}$/  //^以数字开头、$代表以数字结尾，匹配的是两位数字
const reg5 = /^\d{2,4}$/  //^以数字开头、$代表以数字结尾，匹配的是2位到4位数字
const reg6 = /^\d{2,}$/  //^以数字开头、$代表以数字结尾，匹配的是2位以上的数字

const reg7 = /^/d+$/ //  /d等价于{1,}
```

## 案例示例

```js
//校验手机号
const reg1 = /^1\d{10}$/ //以1开头，后面是10为数字即可匹配为true

//座机号，此正则仅满足短横线连接的座机号，即：020-1234567、020-12345678、0210-1234567、0210-12345678这种格式的
const reg2 = /^\d{3,4}-\d{7,8}$/

//若还想满足以“-”连接或以“/”连接，可参考写明的：
const reg3 = /^\d{3,4}(-|\/)\d{7,8}$/ //因为(-|/)中的"/"是正则表达式里的，需要加“\”来进行转义

//4位验证码的判断
const reg4 = /^\d{4}$/

//邮箱判断
const reg5 = /^[0-9a-z_]{2,20}@[0-9a-z]{1,10}[.a-z0-9]+[^.]$/i
/*
	1、[0-9a-z_]代表的意思是可以是0到9的数字、可以是a-z的字母，还可以是下划线，-代表的是区间
  2、[ABCD1234]这种没有-代表区间，那么代表的意思就是可以是ABCD1234其中的任意一位
  3、[^.]当^出现在[]里面的是时代表取反，这句话的意思是，除了.以外的
	最后的i表示忽略大小写
*/

//去除字符串中，非数字的部分
const str = 'abc123aa'
console.log(str.replace(/\d/g,""))//打印结果位abcaa
//这里的/g代表的意思就是全部匹配，如果不加这个的话，代表只会匹配一次就不会执行了，加上g就会全部匹配。直到不满足条件时候。

//去除非字符串的部分
const str = 'abc13aa'
console.log(str.replace(/[^0-9]/g,""))//打印结果为13，[]里出现^代表的是取反，这里代表的是除了0-9

const str = 'abc123aa'
console.log(str.replace(/\D/g,""))//打印结果为123，\D代表的是非数字

//身份证号验证
const reg = /^1\d{1-16}(\d|X){1}$/


//获取url参数
/*
	*?	非贪婪匹配，会一直找，找到后面的正则规则为止
  abc 后面匹配的就是$，即是结束标签
  .   相当于[^\n\r]相当于除换行
  连起来匹配除换行字符外，直到匹配到&或结束$后停止匹配
*/
function querystring(){
  const path = '?id=55&name=abc'
  const reg = path.math(/id=(.*?)(&|$)/)
  return reg ? reg[1] : null
}
console.log(querystring())


//动态获取参数
/*
	当我们需要写动态正则的时候，可以RegExp对象，把正则字符串传进去
*/
function queryString(path,key){
  const reg = new RegExp(key + '=(.*?)(&|$)')
  const exp = path.math(reg)
   return exp ? exp[1] : null
}


//过滤html标签
const str = '<div><a href="">点击跳转</a><img src="http:xx.xx.xx" /></div>'
console.log(str.replace(/<([^>])>/g,""))//打印为：点击跳转

// 只保留图片标签
console.log(str.replace(/<\/?([a-z]).*?>/ig,(res,group1)=>{
  if(group1 === "img" || group1 === "p"){
    //同时保留img标签和p标签
    return res
  }
  return ''
}))


//字符串模板
const text = '{name}说，今天天气{desc}。';
const obj = {
  name:"张三",
  desc:"真好"
}

console.log(text.replace(/\{(.*?)\}/g),(result,group1)=>{
  return obj[group1]
})


//去除多余的空格
const text="  你  好   "
console.log('---' + text.replace(/\s/g,"") + '---')

//去除两边的空格，保留中间的空格
const text="  你  好   "
console.log('---' + text.replace(/^\s+|\s+$/g,"") + '---')//此正则的意思是去除两边空格，去掉以空格开头或者以空格结尾，空格可能多个，所以用+


//数据格式化
const text = "xxxx;张三：15555555555",2222asdasaz;xxxx;xxx;李四：16666666666,2222asdasaz;xxxx
const arr = []
text.replace(/;([\u4e00-\u9fa5]+)：(1\d{10}),([0-9a-z]+);/g,(result,group1,group2,group3)=>{
  arr.push({
    name:group1,
    phone:group2,
    orderid:group3,
  })
})
console.log(arr)
```

注：
1、当正则表达式出现非正则语义的字符，就表示为普通字符。
2、如果正则表达式中，想把“/”当普通字符使用，必须要用“\”来进行转义
3、如果想使用或者条件，则可以用“()”括起来，在括号里使用“|”来表示或，做或者条件。


千分位

```js
let num = 999999
console.log(num.toLocaleString())//打印结果为：9,999,99
```














