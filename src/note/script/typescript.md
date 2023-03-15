---
title: TypeScript
date: 2023-03-01
category:
  - script系列
tag:
  - TS
order: 3
---

:::info
💡参照TS官网：[TypeScript](https://www.typescriptlang.org/)
:::

# TS介绍

## 什么是TS

TS是JS的超集，JS有的TS都有，vscode对TS非常友好，vscode和TS都是微软开发的。TS是微软开发的开源编程语言，在JS基础之上，为JS添加了类型支持。

## TS为什么要为JS添加类型支持

JS背景：JS的类型系统存在“先天性缺陷”，js代码中绝大部分的错误都是类型错误(常见报错：Uncaught TypeError)
JS造成的问题：会增加了找bug、改bug的时间，严重影响了开发效率。

从编程语言的动静来区分，TS属于静态类型的编程语言，JS属于动态类型的编程语言。

- 静态类型：编译期做类型检查
- 动态类型：执行期做类型检查

对JS来说，需要等到代码真正去执行的时候才能发现错误(发现问题较晚)。
对TS来说，在代码编译的时候(代码执行前)就可以发现错误(发现问题较早)。

配合vscode等开发工具，TS可以提前到编译代码的同时就发现代码中的错误，减少bug、改bug时间。

## TS相比JS的优势

- 更早发现错误，在写代码的时候就可以发现错误，减少找bug、改bug时间，提升开发效率。
- 程序中任何位置的代码都有代码提示，随时随地的安全感，增强了开发体验。
- 强大的类型系统提升了代码的可维护性，使得重构代码更加容易。
- 支持最新的ECMAScript语法，优先体验最新的语法。
- TS类型推断判断，不需要在代码中每个地方都显示标注类型，减少开发时间

## 各框架对TS的关系

Vue3源码使用TS进行重写，Angular默认支持TS，React与TS完美配合。

---

# TS在非项目中使用

TS文件是不能直接被浏览器解析的。
为解决这一问题：

1. 在node环境需要安装一个解析TS的工具 tslib/ts-node。
2. 在框架中，babel、ts-loader自动帮我们解析。

## 在node环境编译TS

1. 配置全局的TS环境

下载ts：`npm i  typescript -g`
查看ts版本号：`tsc -v`
将ts文件编译为js文件：`tsc xxx.ts`在同级目录会新增同名的js文件。

2. 在node环境下载解析TS的工具

```bash
npm i -g ts-node
npm i -d tslib @types/node
```

3. 执行TS文件

```bash
ts-node xxx.ts
```

---

# TS语法

## 类型检测(约束数据类型)

### 原始类型

```typescript
let 变量名:number         //约束为number数据类型
let 变量名:string         //约束为string数据类型
let 变量名:boolean        //约束为布尔数据类型
let 变量名:void       //约束为空值类型
let 变量名:null       //约束为null
let 变量名:undefined    //约束为undefined
let 变量名:object         //约束为JSON对象
let 变量名:string[]       //约束为字符串数组
```

#### 声明number类型

```typescript
let notANumber:number = NaN;//NaN
let number:number = 123;//普通数字
let infinityNumber:number = Infinity;//无穷大
let decimal:number = 6;//十进制
let hex:number = 0xf00d;//十六进制
let binary:number = 0b1010;//二进制
let octal:nmber = 0o744;//八进制
```

#### 声明string类型

```javascript
let str:string = 'def';
let newStr = `abc ${str}`;
console.log(newStr);

//将ts文件转为js文件如下(字符串也可以做连接)
var str = 'def';
var newStr = "abc ".concat(str);
console.log(newStr);
```

#### 声明布尔类型

```javascript
let b:boolean = true;
let b:boolean = false;
let b:boolean = Boolean(0);//false  
let b:boolean = Boolean(1);//true
let b:Boolean = new Boolean(0);//这样定义返回的是一个布尔值对象，读值的话还需要b.valueOf()才为false

//ps：如果时new Boolean就会返回一个布尔值对象就会报错，而定义时接收的是布尔值
```

#### 空值类型

1. js没有空值（Void）的概念，在TS中，可以用void表示没有任何返回值的函数。
2. void值定义后不可再被赋值，否则就会报错。

```typescript
//函数空值
function Fn():void{
  
}

//变量空值
let u:void = undefined;
let n:void = null;//这么声明null已经会报错了
```

#### Null和undefined类型

```typescript
let u:undefined=undefined;
let n:null=null;
```

#### undefined、null和void区别

1. undefined和null定义后可再被赋值
2. void定义后不可再被赋值

### any类型

### 任意类型

Any类型和unknown顶级类型：
nodejs环境执行ts

1. `npm i @type/node --save-dev`也就是`npm i @type/node -D`
2. 下载：`npm i ts-node -g`，查看版本号：`ts-node -v`

说明：

1. 没有强制限定哪种类型，随时切换类型都可以，我们可以对any进行任何操作，不需要检查类型
2. 声明变量的时候没有指定任何类型，默认就是any类型
3. 弊端：如果使用any类型就失去了ts类型检测的作用
4. TS3.0中引入的unknown类型也被认为top type，但它更安全。与any一样，所有类型都可以分配给unknown，unknown类型比any类型更加严格，当你要使用any的时候可以尝试使用unknow

```typescript
let anys:any = '123';
let unknow:unknown = '123';
```

any和unknown区别：

1. 当都定义为对象时，any定义的读取键值对不会报错，而unknown读取键值对会报错。
2. unknown类型不可赋值给其它类型定义的变量，但是any类型可以赋值给其它类型定义的变量。
3. unknown类型只能赋值给unknown类型或any类型
4. 相对来说，unknown会更安全。

### 数组类型

#### 一维数组

```typescript
//以下方法声明的是一维数组
let 变量名 :number[] //数组由全由数字构成
let 变量名:any[] 

//数组泛型
let 变量名 :Array<string> 或 let 变量 :string[]//数组由全由字符串构成
let 变量名:Array<any>


```

#### 多维数组

```typescript
//以下方法声明的是二维数组
let 变量名:number[][] = [[],[]]
let 变量名:Array<Array<number>>=[[],[]]

//以下方法声明的是三维数组
let 变量名:number[][][] = [[[]],[[]]]
```

#### argument类数组

```typescript
const Arr = (...args):void=>{
  console.log(arguments)//打印结果：[Arguments] { '0': 111, '1': 222, '2': 333 }
  // let arr:number[] = agruments;//这一步是错误的，因为类数组不能这么定义 类型“IArguments”缺少类型“number[]”的以下属性: pop, push, concat, join 及其他 26 项。
  let arr:IArguments = arguments //ts内置对象IArguments需要这么定义
   console.log(arr);//打印结果：[Arguments] { '0': 111, '1': 222, '2': 333 }
}

Arr(111,222,333)
```

其中IArguments是TS中定义好了的类型，它实际上就是：

```typescript
interface IArguments{
  [index:number]:any;
  length:number;
  callee:Function
}
```

关于接口属性名是这个[index:number]：

```typescript
interface ArrNumber {
  [index:number]:string
}

let arr:ArrNumber=["1","2","3"]
```

---

## 函数类型

指的是函数的形参类型和返回值的类型

### 单独指定函数形参的数据类型或返回值的数据类型

#### 普通函数

```typescript
function 函数名(形参:string):返回值数据类型{
   return 形参
}//约束形参的数据类型和返回值，void就是无返回值，对应的string就约束返回值为string类型
```

#### 箭头函数

```typescript
const 函数名 = (形参:number):返回值数据类型{
    return 形参
}
```

### 同时指定函数参数的数据类型和返回值的数据类型

```typescript
const add:(num1:number,num2:number)=>number=(num1,num2)=>{
     return num1 + num2
}
```

### 函数无返回值(void)

```typescript
//指定函数的形参为字符串类型，且函数没有返回值
function 函数名(形参:string):void{
  
}
```

### 函数可选参数(可传可不传)

```typescript
//函数两个参数可传可不传，同时函数没有返回值
function fn(num1:number,num2?:number):void{
  
}
```

注意：如果有可选参数，不能在必选参数的前面，否则会报错

const可以适用于引用类型，而let可以适用于基础类型。

### 接口定义参数

```typescript
//定义参数 num 和 num2  ：后面定义返回值的类型
interface Add {
    (num:  number, num2: number): number
}
 
const fn: Add = (num: number, num2: number): number => {
    return num + num2
}
fn(5, 5)
 
 
interface User{
    name: string;
    age: number;
}
function getUserInfo(user: User): User {
  return user
}
```

### 定义剩余参数

```typescript
const fn = (array:number[],...items:any[]):any[] => {
       console.log(array,items)
       return items
}
 
let a:number[] = [1,2,3]
 
fn(a,'4','5','6')
```

### 函数重载

重载是方法名字相同，而参数不同，返回类型可以相同也可以不同(方法名相同，形参不同，与返回值无关，即叫函数重载)。
如果参数类型不同，则参数类型应设置为 **any**。
参数数量不同你可以将不同的参数设置为可选。

```typescript
//将函数的声明和实现分开，多个声明，一个实现
function fn(params: number): void
 
function fn(params: string, params2: number): void
 
function fn(params: any, params2?: any): void {
 
    console.log(params)
 
    console.log(params2)
 
}
 
 
 
fn(123)
 
fn('123',456)
```

---

## 对象类型

由对象或者方法构成

### 对象

```typescript
let 变量:{
  xxx:string;
  xxx:string;
  xxx():void
} ={
  xxx:xxx,
  xxx:xxx,
  xxx(){}
}  //定义一个变量为json对象，且定义了json里有哪些变量，变量属于哪些数据类型
```

### 对象中的可选属性

对象的属性或方法，也可以是可选的，此时就用到可选属性了。可选属性的语法与函数可选参数的语法一致，都使用?来表示：

```typescript
//往myAxios函数里传入一个json对象，但是这个json对象里可以选择是否传入某些属性
function myAxios(config:{url:string;method?:string}){
    console.log(config)
}
myAxios({
    url:""
})
```

---

## 接口

### 定义接口

接口名可以是变量，也可以是函数，函数可以约束形参，也可以约束返回值的数据类型。

```typescript
interface xxx{
    属性
    方法
}
```

```typescript
interface Person{
  name:string,
  age?:number,
  fn():void,
  fn2():number
}

let obj:Person ={
  name:"嗷嗷叫",
  fn:():void=>{
    console.log(obj.a)
  },
  fn2:():number=>{
    return 111
  }
}
```

### 使用接口

#### 约束对象的数据类型

```typescript
let 对象名:接口名={
    xxx:xxx,
    xxx:xxx
}
```

#### 约束形参的数据类型

```typescript
function 函数名(形参:接口){

}
```

#### class类约束数据类型

```typescript
class 类名 implements 接口名{

}
```

### 接口和类型别名的区别

相同：都可以个对象指定类型
不同点：

1. 接口：只能为对象指定类型
2. 类型别名：不仅可以为对象指定类型，实际上可以为任意类型指定别名

```typescript
//指定类型别名为CustomArray,这里为复杂数据类型指定了类型别名，数组就是复杂的数据类型
type CustomArray = (number | string)[]; //定义了CustomArray为一个数组，只能由number或者string类型组成
let arr1 : CustomArray = [1,'1'];//使用自己定义的类型别名

//再或者为复杂数据类型对象自定义类型别名
type IPerson = {
    name:string
    age:number
}

//也可以为简单的数据类型自定义类型别名
type Num = number | string
```

### 接口的继承

如果两个接口之间有相同的属性或方法，可以将公共的属性或方法抽离出来，通过继承来实现复用。

```typescript
interface Point3D {
    x: number,
    y: number,
}
interface Point2D extends Point3D {
    z: number
}
//Point2D接口继承了Point3D接口的特性，可以简化写代码的步骤，此时PointsD接口则为：
let obj: Point2D = {
    x: 1,
    y: 2,
    z: 3
}
```

### 任意属性[propName:string]

需要注意的是，一旦定义了任意属性，那么确定属性和可选属性的类型都必须是它的类型的子集。

```typescript
//在这个例子当中我们看到接口并没有定义C，但是也并没有报错
//因为我们定义了[propName:string]:any
//允许添加新的任意属性
interface Person {
  a:string,
  b?:string
  [propName:string]:string | number  //使用联合类型或 [propName:string]:any
}

const person:Person={
  a:"213",
  c:"123"
}
```

### 只读属性(readonly)

```typescript
interface Person {
  readonly a:string,
  b?:string
}
let p:Person = {
  a:"123"
}

//此时再修改就会报错
// p.a="466"
//但是读取就不会报错
console.log(p.a)
```

### 接口注意事项

若两个接口名一样，那么这两个定义的属性将会合并

```typescript
interface A{
  name:string
}
interface A{
  age:number
}

let obj:A={
  name:"嗷嗷叫",
  age:18
}
console.log(obj)
```

可选式操作符——?

### 接口总结

1. 可以拿来定义属性：必选属性，可选属性、任意属性
2. 可以拿来定义方法：有返回值类型的方法、无返回值类型的方法
3. 接口继承
4. 同名的接口名，接口里面定义的东西会合并

---

## 元组（Tuple）

JS中number[ ]的缺点：不严谨，因为该类型的数组中可以出现任意多个数字
元组则是另一种数据类型，它确切地知道好多少个元素，以及特定索引对应的类型，如：
如果需要一个固定的大小不同类型值的集合，我们可以使用元组
元组也是数组的变种，元组是固定数量的不同类型的元素组合。
元素与集合的不同之处在于，元组中的元素类型可以是不同的，而且数量固定。元组的好处在于可以把多个元素作为一个单元传递。如果一个方法需要返回多个值，可以把这多个值作为元组返回，而不需要创建额外的类来表示。

```typescript
let 变量:[string,number]    //约束数组里第1位为字符串，第2位为number，且数组只能是两位
let 变量:[string|number]    //约束数组里只有一位，可以是字符串或者是数字
//元组类型可以确切地标记出有多少个元素，以及每个元素的类型
 
 
let arr2: readonly [number,boolean,string,undefined] = [1,true,'sring',undefined]


//当赋值或访问一个已知索引的元素时，会得到正确的类型
arr2[0].length //error
arr2[2].length //success
```

对于越界元素它的类型会被限制为联合类型，比如定义的是string和number，就不会允许你用boolean。
或者当你访问元组的越界元素时，会使用联合类型来代替

```typescript
let arr:[string,number] = ["qyxc",123]
arr.push(true) //error
arr.push("123123")//不会报错。虽然定义的时候仅允许两个元素，但是可以通过push进去
```

应用场景，返回excel格式，一般就是二维数组

```typescript
let excel:[string,string,nmber][]=[
  ["title","name",1]
]
```

---

## 枚举类型

在JS中是没有枚举的概念的，但是在TS中帮我们定义了枚举这个类型

### 使用枚举

通过enum关键字定义我们的枚举，默认情况是从0为元素开发编号

### 枚举应用场景

```typescript
//根据形参值返回不同值
const fn = (color:string):number=>{
  if(type == 'red'){
    return 0
  }else if(type == 'green'){
    return 1
  }else if(type == 'blue'){
    return 2
  }
}
//或者
let obj={
  "red":0,
  "green":1,
  "blue":2
}

//而在ts中
enum Color {
  red,//默认为0
  green,//默认为1
  blue//默认为2
}
console.log(Color.red)
```

### 枚举类型有哪些

#### 数字枚举

```typescript
enum Types{
   Red,
   Green,
   BLue
}
//红绿蓝 Red = 0 Green = 1 Blue= 2 分别代表红色0 绿色为1 蓝色为2
//这样写就可以实现应为ts定义的枚举中的每一个组员默认都是从0开始的所以也就是
enum Types{
   Red = 0,
   Green = 1,
   BLue = 2
}
//默认就是从0开始的 可以不写值
```

#### 增长枚举

```typescript
enum Types{
   Red = 1,
   Green,
   BLue
}
//我们定义了一个数字枚举， Red使用初始化为 1。 
//其余的成员会从 1开始自动增长。 换句话说， Type.Red的值为 1， Green为 2， Blue为 3。
```

#### 自定义枚举

```typescript
enum Types{
  Red = 2,
  Green = 5,
  Blue = 7
}
```

#### 字符串枚举

字符串枚举的概念很简单。 在一个字符串枚举里，每个成员都必须用字符串字面量，或另外一个字符串枚举成员进行初始化。

```typescript
enum Types{
  Red = "red",
  Green = "green",
  Blue = "blue"
}
//如果定义为字符串类型的，就需要全部定义
```

由于字符串枚举没有自增长的行为，字符串枚举可以很好的序列化。 换句话说，如果你正在调试并且必须要读一个数字枚举的运行时的值，这个值通常是很难读的 - 它并不能表达有用的信息，字符串枚举允许你提供一个运行时有意义的并且可读的值，独立于枚举成员的名字。

#### 异构枚举

数字和字符串混合使用

```typescript
enum Types{
  yes = 1,
  no = "no"
}
```

#### 接口枚举

定义一个枚举Types 定义一个接口A 他有一个属性red 值为Types.yyds
声明对象的时候要遵循这个规则

```typescript
enum Types {
    yyds,
    dddd
}
interface A {
    red: Types.yyds
}

let obj: A = {
    red: Types.yyds
}
console.log(obj.red); //打印为0，因为枚举默认是从0开始的。
```

#### const枚举

   1. 在enum关键字前，可以使用let、var，但是不能使用const。
   2. 如果用const声明枚举，待ts编译为js，会将枚举编译为常量。如果不用就会是对象

```typescript
const enum Types {
    error,
    success
}
let code = 0
if (code == Types.error) { }
//编译为js就是
var code = 0;
if (code == 0 ) { }


enum Types {
    error,
    success
}
let code = 0
if (code == Types.error) { }
//编译为js就是
var Types;
(function (Types) {
    Types[Types["error"] = 0] = "error";
    Types[Types["success"] = 1] = "success";
})(Types || (Types = {}));
var code = 0;
if (code == Types.error) { }
```

#### 反向映射

数字可以进行反向映射：

```typescript
enum Types {
  success = 1
}

let success:number = Types.success

let key = Types[1]//当不知道1在枚举里叫什么名字时，可以这样

console.log(`value--${success}`,`key---${key}`)


```

字符串无法进行反向映射：

```typescript
enum Types {
    success = "456"
}

let success: string = Types.success

let key = Types[success]//此时这里就会报错

console.log(`value--${success}`, `key---${key}`)
```

---

## 联合类型 |

```typescript
let 变量名:(string|number)[]      //约束为字符串或数字的数组
let 变量名:string|number[]       //约束为字符串或者是数字类的数组
let 变量名:string|number
```

注意：
| 在TS里面又叫联合类型。
联合类型：由两个或多个其它类型组成的类型，表示可以是这些类型中的任意一种。

#### 函数使用联合类型

```typescript
const fn = function(type:number):boolean{
  return !!type
}

fn(1)

const fn = (somethine:number | boolean):boolean=>{
  return !!something  //此话可以进行强转，虽然定义了返回值类型为布尔，但是强转可以让此函数返回number或boolean
}
```

---

## 交叉类型 &

多种类型的集合，联合对象将具有所联合类型的所有成员

```typescript
interface People {
  age: number,
  height： number
}
interface Man{
  sex: string
}
const xiaoman = (man: People & Man) => {
  console.log(man.age)
  console.log(man.height)
  console.log(man.sex)
}
//不能多也不能少一个属性
xiaoman({age: 18,height: 180,sex: 'male'});
```

---

## 类型断言

使用类型断言来指定更具体的类型
如：如果定义一个变量只能是获取页面的元素节点，且防止这个变量赋值为其它的，可以这么为此使用类型断言。

#### DOM节点断言

```typescript
const oDiv:HTMLDivElement = document.querySelector('#app') as HTMLDivElement
```

#### 函数内使用断言

```typescript
let fn = function(num:number | string) :void{
  //不能滥用类型断言，因为长度只对字符串适用，但是number就没有，就会是undefined
  console.log((num as string).length)
}

fn('12345')
```

#### 形参上未知属性使用断言

```typescript
interface A{
  run:string
}
interface B{
  build:string
}

let fn = (type:A|B):void=>{
  console.log((<A>type).run) //  console.log((type as A).run)
}
```

#### window上挂载变量(any临时断言)

```typescript
(window as any).abc = 123
```

#### 总结

类型断言就分为泛型断言和as断言：

```typescript
//泛型断言
let someValue: any = "this is a string";

let strLength: number = (<string>someValue).length;

//as断言
let someValue: any = "this is a string";

let strLength: number = (someValue as string).length;
```

注意事项：
两种形式是等价的。 至于使用哪个大多数情况下是凭个人喜好；然而，当你在TypeScript里使用JSX时，只有 as语法断言是被允许的。

#### as const

对字面量而言，与const直接定义是有区别的
如果是普通类型跟直接const 声明是一样的

```typescript
const names = '小满'
names = 'aa' //无法修改
 
 
 
 
let names2 = '小满' as const
names2 = 'aa' //无法修改
```

```typescript
// 数组
let a1 = [10, 20] as const;
const a2 = [10, 20];
 
a1.unshift(30); // 错误，此时已经断言字面量为[10, 20],数据无法做任何修改
a2.unshift(30); // 通过，没有修改指针
```

#### 类型断言不会做隐式转换

```typescript
function aaa(num: any): boolean {
    return num as boolean
}

let bbb = aaa(1)
console.log(bbb) //打印为1，并不会做隐式转换为true，因为编译时候会删除类型断言
```

## 类型推论/类型推断

声明了一个变量，但是没有定义类型，TS会明确的指定类型的时候推测出一个类型，这就是类型推论。

```typescript
let str = "qyxc" //此时已经推论出str变量为string类型

str = 123
/*
    error 
    let str: string 
    不能将类型“number”分配给类型“string”。
*/
str = "asda" //success

let newStr   //此时会推论出newStr变量为any类型
```

## 类型别名

使用type关键字来创建类型别名

#### 定义类型别名

```typescript
type str = string
 
 
let s:str = "我是小满"
 
console.log(s);
```

#### 定义函数别名

```typescript
type str = () => string
 
 
let s: str = () => "我是小满"
 
console.log(s);
```

#### 定义元组类型别名

```typescript
type CustomArray = (number | string)[]
let arr1 : CustomArray = [1,'1']
```

#### 定义值的别名

```typescript
type value = boolean | 0 | '213'
 
 
let s:value = true
//变量s的值  只能是上面value定义的值
```

---

## never类型

never类型表示的是那些永不存在的值的类型。 例如， never类型是那些总是会抛出异常或根本就不会有返回值的函数表达式或箭头函数表达式的返回值类型； 变量也可能是 never类型，当它们被永不为真的类型保护所约束时。
never类型是任何类型的子类型，也可以赋值给任何类型；然而，_没有_类型是never的子类型或可以赋值给never类型（除了never本身之外）。 即使 any也不可以赋值给never。

#### never类型使用

```typescript
// 返回never的函数必须存在无法达到的终点
function error(message: string): never {
    throw new Error(message);
}

// 推断的返回值类型为never
function fail() {
    return error("Something failed");
}

// 返回never的函数必须存在无法达到的终点
function infiniteLoop(): never {
    while (true) {
    }
}
```

#### TS推断出never类型的情景

```typescript
type bbb = string & number ;//会推断出never类型
```

#### never类型和void类型区别

```typescript
    //void类型只是没有返回值 但本身不会出错
    function Void():void {
        console.log();
    }
 
    //只会抛出异常没有返回值
    function Never():never {
    throw new Error('aaa')
    }
```

#### never类型应用场景

这是原来的基础代码：

```typescript
interface A {
    type: "foo"
}
 
interface B {
    type: "bar"
}
type All = A | B ;
function handleValue(val: All) {
    switch (val.type) {
        case 'foo':
            break;
        case 'bar':
            break
        default:
            //兜底逻辑 一般是不会进入这儿如果进来了就是程序异常了，也就是所有的接口都匹配
            
            const exhaustiveCheck:never = val;
            break
    }
}
```

此时新增了一个接口：

```typescript
interface A {
    type: "foo"
}
 
interface B {
    type: "bar"
}
interface C {
    type: "bizz"
}
type All = A | B | C;
function handleValue(val: All) {
    switch (val.type) {
        case 'foo':
            break;
        case 'bar':
            break
        default:
            //兜底逻辑 一般是不会进入这儿如果进来了就是程序异常了
 
            const exhaustiveCheck: never = val;//此时这里就会报错，因为bizz这里不匹配
            break
    }
}
```

需要对以上代码进行修改：

```typescript
interface A {
    type: "foo"
}
 
interface B {
    type: "bar"
}
interface C {
    type: "bizz"
}
type All = A | B | C;
function handleValue(val: All) {
    switch (val.type) {
        case 'foo':
            break;
        case 'bar':
            break;
        case 'bizz':
            break;
        default:
            //兜底逻辑 一般是不会进入这儿如果进来了就是程序异常了
 
            const exhaustiveCheck: never = val;//此时这里就不会报错了，就不需要等到启动项目时候才知道问题
            break
    }
}
```

---

## symbol类型

[文档地址](https://www.tslang.cn/docs/handbook/symbols.html)
自ECMAScript 2015起，symbol称为了一种新的原生类型，就像number和string一样。
symbol类型的值是通过Symbol构造函数创建的。
可以传参数做唯一标志，仅支持string和number类型的参数，传对象会被toString()，变为[Object,Object]

```typescript
let sym1 = Symbol();
let sym2 = Symbol("key")

let s1:symbol = Symbol()
```

### symbol应用场景

#### Symbol的值是唯一的

```typescript
const s1 = symbol()
const s2 = symbol()
//s1 === s2 //false
```

#### 用作对象属性的键

```typescript
let sym = Symbol();

let sym1 = Symbol();

let obj = {
    [sym]: "value",
    [sym1]:"value2",
    color:red,
    weather:sun
};
 
console.log(obj[sym]); // "value"

//循环带有symbol作为键值对的对象——forin便利
for(let key in obj){
  console.log(key)//打印出color、weather的值，symbol类型是不会渲染出来的。
}

//Object.keys()编译
console.log(Object.keys(obj))//会返回一个数组：[color,weather]，但是symbol类型的键值对还是不会打印出来的

//getOwnPropertyNames
console.log(Object.getOwnPropertyNames(obj))//会返回一个数组：[color,weather]，但是symbol类型的键值对还是不会打印出来的


//JSON.stringify
console.log(JSON.stringify(obj))//还是打印不出来symbol类型

//如何读取symbol的值
//方法一：拿到具体的symbol 属性,对象中有几个就会拿到几个
console.log(Object.getOwnPropertySymbols(obj))
//方法二： es6 的 Reflect 拿到对象的所有属性
console.log(Reflect.ownKeys(obj))
```

#### Symbol.iterator 迭代器 和 生成器 for of

支持遍历大部分类型迭代器：Array、nodeList、argumetns、set(new Set())、map(new map()) 等，
作用：在数据量很大的情况下，可以使用迭代器惰性加载数据

```typescript
let arr:Array<number> = [4,5,6];

let it:Iterator<number> = arr[Symbol.iterator]()

console.log(it.next())//遍历第一次，打印：{value:4,done:false}
console.log(it.next())//遍历第二次，打印：{value:5,done:false}
console.log(it.next())//遍历第三次，打印：{value:6,done:false}
console.log(it.next())//遍历第四次，打印：{value:undefined,done:true}

//返回的是一个对象，value表示值，done表示是否停止迭代，也就是还是继续迭代就为false，否则为true
```

测试用例：
迭代器：

```typescript
type mapKeys = string | number

let arr:Array<number> = [4,5,6]

let set:Set<number> = new Set([1,2,3])

let map:Map<mapKeys,mapKeys> = new Map()
map.set('1','王爷')
map.set('2','皇上')

function gen(erg:any){
  let it:Iterator<any>Iterator<any> = erg[Symbol.iterator]()
  let next:any = {done:false}
  while(!next.done){
    next = it.next()
    if(!next.done){
      console.log(next) // console.log(next.value)
    }
  }
}
```

注意：
对象不支持上面的迭代器

生成器：

```typescript
let arr:Array<number> = [4,5,6]

let set:Set<number> = new Set([1,2,3])

let map:Map<mapKeys,mapKeys> = new Map()
map.set('1','王爷')
map.set('2','皇上')

for(let item of set){
  console.log(item)//会自动调用set下面的iterator，打印结果：1 2 3
}

for(let item of arr){
  console.log(item)//会自动调用set下面的iterator，打印结果：4 5 6
}

for(let item of map){
  console.log(item)//会自动调用set下面的iterator，打印结果：['1','王爷'] ['2','皇上']
}

//简单来说，for of就是iterator的语法糖
```

注意：
1、同样是不支持对象
2、for in循环数组，打印出来的是索引，而for of循环数组可直接把值读取出来

以下为这些symbols的列表：
Symbol.hasInstance
方法，会被instanceof运算符调用。构造器对象用来识别一个对象是否是其实例。
Symbol.isConcatSpreadable
布尔值，表示当在一个对象上调用Array.prototype.concat时，这个对象的数组元素是否可展开。
Symbol.iterator
方法，被for-of语句调用。返回对象的默认迭代器。
Symbol.match
方法，被String.prototype.match调用。正则表达式用来匹配字符串。
Symbol.replace
方法，被String.prototype.replace调用。正则表达式用来替换字符串中匹配的子串
Symbol.search
方法，被String.prototype.search调用。正则表达式返回被匹配部分在字符串中的索引。
Symbol.species
函数值，为一个构造函数。用来创建派生对象。
Symbol.split
方法，被String.prototype.split调用。正则表达式来用分割字符串。
Symbol.toPrimitive
方法，被ToPrimitive抽象操作调用。把对象转换为相应的原始值。
Symbol.toStringTag
方法，被内置方法Object.prototype.toString调用。返回创建对象时默认的字符串描述。
Symbol.unscopables
对象，它自己拥有的属性会被with作用域排除在外。

---

## 内置对象

JS有很多内置对象，它们可以直接在TS中当作定义好的类型。

### ECMAScript的内置对象

**Boolean、Number、string、RegExp、Date、Error**

```typescript
let b: Boolean = new Boolean(1)
console.log(b)

let n: Number = new Number(true)
console.log(n)

let s: String = new String('哔哩哔哩关注小满zs')
console.log(s)

let d: Date = new Date()
console.log(d)

let r: RegExp = /^1/
console.log(r)

let e: Error = new Error("error!")
console.log(e)
```

### DOM和BOM内置对象

**Document、HTMLElement、Event、NodeList 等**
[可参考GitHub](https://github.com/microsoft/TypeScript/tree/main/src/lib)

```typescript
const list:NodeList = document.querySelectorAll("#list li")
let body: HTMLElement = document.body;
let allDiv: NodeList = document.querySelectorAll('div');
//读取div 这种需要类型断言 或者加个判断应为读不到返回null
let div:HTMLElement = document.querySelector('div') as HTMLDivElement
document.addEventListener('click', function (e: MouseEvent) {
    
});
//dom元素的映射表
interface HTMLElementTagNameMap {
    "a": HTMLAnchorElement;
    "abbr": HTMLElement;
    "address": HTMLElement;
    "applet": HTMLAppletElement;
    "area": HTMLAreaElement;
    "article": HTMLElement;
    "aside": HTMLElement;
    "audio": HTMLAudioElement;
    "b": HTMLElement;
    "base": HTMLBaseElement;
    "bdi": HTMLElement;
    "bdo": HTMLElement;
    "blockquote": HTMLQuoteElement;
    "body": HTMLBodyElement;
    "br": HTMLBRElement;
    "button": HTMLButtonElement;
    "canvas": HTMLCanvasElement;
    "caption": HTMLTableCaptionElement;
    "cite": HTMLElement;
    "code": HTMLElement;
    "col": HTMLTableColElement;
    "colgroup": HTMLTableColElement;
    "data": HTMLDataElement;
    "datalist": HTMLDataListElement;
    "dd": HTMLElement;
    "del": HTMLModElement;
    "details": HTMLDetailsElement;
    "dfn": HTMLElement;
    "dialog": HTMLDialogElement;
    "dir": HTMLDirectoryElement;
    "div": HTMLDivElement;
    "dl": HTMLDListElement;
    "dt": HTMLElement;
    "em": HTMLElement;
    "embed": HTMLEmbedElement;
    "fieldset": HTMLFieldSetElement;
    "figcaption": HTMLElement;
    "figure": HTMLElement;
    "font": HTMLFontElement;
    "footer": HTMLElement;
    "form": HTMLFormElement;
    "frame": HTMLFrameElement;
    "frameset": HTMLFrameSetElement;
    "h1": HTMLHeadingElement;
    "h2": HTMLHeadingElement;
    "h3": HTMLHeadingElement;
    "h4": HTMLHeadingElement;
    "h5": HTMLHeadingElement;
    "h6": HTMLHeadingElement;
    "head": HTMLHeadElement;
    "header": HTMLElement;
    "hgroup": HTMLElement;
    "hr": HTMLHRElement;
    "html": HTMLHtmlElement;
    "i": HTMLElement;
    "iframe": HTMLIFrameElement;
    "img": HTMLImageElement;
    "input": HTMLInputElement;
    "ins": HTMLModElement;
    "kbd": HTMLElement;
    "label": HTMLLabelElement;
    "legend": HTMLLegendElement;
    "li": HTMLLIElement;
    "link": HTMLLinkElement;
    "main": HTMLElement;
    "map": HTMLMapElement;
    "mark": HTMLElement;
    "marquee": HTMLMarqueeElement;
    "menu": HTMLMenuElement;
    "meta": HTMLMetaElement;
    "meter": HTMLMeterElement;
    "nav": HTMLElement;
    "noscript": HTMLElement;
    "object": HTMLObjectElement;
    "ol": HTMLOListElement;
    "optgroup": HTMLOptGroupElement;
    "option": HTMLOptionElement;
    "output": HTMLOutputElement;
    "p": HTMLParagraphElement;
    "param": HTMLParamElement;
    "picture": HTMLPictureElement;
    "pre": HTMLPreElement;
    "progress": HTMLProgressElement;
    "q": HTMLQuoteElement;
    "rp": HTMLElement;
    "rt": HTMLElement;
    "ruby": HTMLElement;
    "s": HTMLElement;
    "samp": HTMLElement;
    "script": HTMLScriptElement;
    "section": HTMLElement;
    "select": HTMLSelectElement;
    "slot": HTMLSlotElement;
    "small": HTMLElement;
    "source": HTMLSourceElement;
    "span": HTMLSpanElement;
    "strong": HTMLElement;
    "style": HTMLStyleElement;
    "sub": HTMLElement;
    "summary": HTMLElement;
    "sup": HTMLElement;
    "table": HTMLTableElement;
    "tbody": HTMLTableSectionElement;
    "td": HTMLTableDataCellElement;
    "template": HTMLTemplateElement;
    "textarea": HTMLTextAreaElement;
    "tfoot": HTMLTableSectionElement;
    "th": HTMLTableHeaderCellElement;
    "thead": HTMLTableSectionElement;
    "time": HTMLTimeElement;
    "title": HTMLTitleElement;
    "tr": HTMLTableRowElement;
    "track": HTMLTrackElement;
    "u": HTMLElement;
    "ul": HTMLUListElement;
    "var": HTMLElement;
    "video": HTMLVideoElement;
    "wbr": HTMLElement;
}
```

### promise

```typescript
//这里函数定义的返回值就是返回的Promise对象，Promise返回的是number类型
function promise():Promise<number>{
  //这里的泛型定义的是Promise的返回类型，这里定义为number，从而让ts知道我们promise返回的是什么
  return new Promise<number>((resolve,reject)=>{
    resolve(1)
  })
}

promise().then(res=>{
  console.log(res)
})
```

## class(类)

### 类型约束

ES6提供了更接近传统语言的写法，引入Class(类)这个概念，作为对象的模板。通过class关键字，可以定义类。基本上，ES6的class可以看作只是一个语法糖，它的绝大部分功能，ES6都可以做到，新的class写法只是让对象模型的写法更加清晰、更像面向对象编程语法。

```typescript
//定义类 在JS中这么写是没问题，但是在TS中这么写就会有问题
class Person{
  constructor(name:string,age:number){
    this.name = name
    this.age = age
  }
  run{
    
  }
}

new Person("qyxc",18)

//ts中是以下写法
class Person{
  name:string
  age:string
  constructor(name:string,age:number){
    this.name = name
    this.age = age
  }
  run{
    
  }
}

new Person("qyxc",18)

//一般定义的变量必须得用，否则就会报错，要么就是age声明类型的时候，书写默认值：age:string = 10
// 要么就是在constructor里，this.age = age  //即赋值
```

### 属性类型

#### 共有属性（public）

关键字：public，使用public关键字外面可以直接访问，如：

```typescript
class Deme {
    public a = 'aaa';
}
let d1 = new Deme();
//访问a
console.log(d1.a);//可以访问到a
```

#### 私有属性（private）

关键字：private，使用private关键字只能在自己类中使用，如：

```typescript
class Demo {
    private c = 'ccc';
    show() {
        return this.c
    }
}
class Demo2 extends Demo {
    constructor() {
        super();//通过super关键字调用父类
        this.c//访问不到
    }
    show2() {
        return this.c;//访问不到
    }
}
let d1 = new Demo();
let d2 = new Demo2();
//访问c
console.log(d2.c);//错误访问
console.log(d2.show());//正确访问，可以在子类中使用
```

#### 受保护的属性（protected）

关键字：protected，使用protected关键字只能在自己类或者子类里面使用，不可直接进行访问，如：

```typescript
//在自己的类中访问
class Demo {
    protected c = 'ccc';
    show() {
        return this.c
    }
}
let d1 = new Demo();
//访问c
console.log(d1.show());//正确访问，可以在自己的类中访问
console.log(d1.c);//错误访问
//子类中访问
class Demo {
    protected c = 'ccc';
    show() {
        return this.c
    }
}
class Demo2 extends Demo {
    constructor() {
        super();//通过super关键字调用父类
       this.c//这里也可以访问的到
    }
    show2() {
        return this.c;
    }
}
let d1 = new Demo();
let d2 = new Demo2();
//访问c
console.log(d1.c);//错误访问
console.log(d2.show2());//正确访问，可以在子类中使用
```

#### 静态属性和静态方法（static）

静态属性
我们用static 定义的属性 不可以通过this 去访问 只能通过类名去调用

```typescript
class Demo {
    // static name: string //这里定义的name，会跟constructor的name冲突
    static cb: string = 'qyxc'
    constructor(name: string) {
        // this.cb //这里访问不到cb
    }
    run(){
        this.cb //访问不到cb
    }
}
let d1 = new Demo("qyxc")
console.log(d1.cb); //访问不到cb
console.log(Demo.cb);//访问得到cb
```

静态方法
static 静态函数 同样也是不能通过this 去调用 也是通过类名去调用，如果两个函数都是static 静态的是可以通过this互相调用。

```typescript
class Demo {
    constructor(name: string) {
        // this.run()//访问不到run方法
    }
    static run() {
        return '123123';
    }
    static go() {
        //访问得到run方法
        return this.run()
    }
}
let d1 = new Demo("qyxc")
console.log(d1.go()); //访问不到go方法
console.log(Demo.go());//访问得到go方法
```

static无论是静态方法还是静态属性都可以互相访问，但是不能访问如public、private等定义的变量

### interface定义类

类的继承还是用extends，多个接口使用逗号隔开

```typescript
 
interface PersonClass {
    get(type: boolean): boolean
}
 
interface PersonClass2{
    set():void,
    asd:string
}
 
class A {
    name: string
    constructor() {
        this.name = "123"
    }
}
 
class Person extends A implements PersonClass,PersonClass2 {
    asd: string
    constructor() {
        super()
        this.asd = '123'
    }
    get(type:boolean) {
        return type
    }
    set () {
 
    }
}
```

### set和get方法

`set(){}`可以监听修改值，`get(){}`可以监听获取值。

```typescript
class Demo2 {
    _age = 10;
    get age() {
        return this._age + 10;
    }
    set age(age: number) {
        this._age = age;
    }
}
let d1 = new Demo2();
d1.age = 20;
console.log(d1.age);

//如果注释掉11行，12行就仅仅是获取值，此时打印的就是20
//如果不注释11行，那就是设置了值，此时_age就是20，而12行再获取值的时候就会是30
//每次获取值都会+10再返回出来
```

### 补充

#### static

不能在实例里面使用，示例出来的对象无法调用。

#### 方法可以共有也可以私有

- public(共有)——示例出来的对象可以调用
- private(私有)——示例出来的对象不可调用

---

## 抽象类

里面有抽象方法和抽象属性，或者是实现了的方法和属性
抽象类不能直接new后使用，需要继承再使用

### 如何定义抽象类

```typescript
abstract class Cla {
    abstract b: number;
    abstract show(a: number): void;
};
let p1 = new Cla();
console.log(Cla.b);//会报错，不能直接实例化抽象类调用

//需通过继承后再调用，如：
class Class1 extends Cla {
    show(a: number): void {
        console.log(a);
    }
    a = 1;//show方法不会使用这里的数据，但是实例化的Class1对象又可以访问到a
    b = 2;//注意不能写成b:2，会报错
}
let c1 = new Class1();
c1.show(2) //打印为2
```

### 应用场景

应用场景如果你写的类实例化之后毫无用处此时我可以把他定义为抽象类。
我们在A类定义了 getName 抽象方法但未实现
我们B类实现了A定义的抽象方法，如不实现就会报错 **我们定义的抽象方法必须在派生类实现**

```typescript
abstract class A {
   name: string
   constructor(name: string) {
      this.name = name;
   }
   print(): string {
      return this.name
   }
 
   abstract getName(): string
}
 
class B extends A {
   constructor() {
      super('小满')//给父类传递参数
   }
   getName(): string {
      return this.name
   }
}
 
let b = new B();
 
console.log(b.getName());
```

### 抽象类和接口的区别

         1. 接口里面属性不能给值,接口里面不能写已经实现的方法。

                                 抽象类里面可以写已经实现的属性和方法。

         2. 接口可以实现多个。

类只能继承一个。

         3. 抽象类里面可以定义公共、受保护类型。

接口默认都是公共类型。

---

## 泛型

数据类型是可变的，具体看是什么，传了什么数据类型。变量类型变量化

### 函数泛型

#### 单个泛型

```typescript
function show<T>(a:T,b:T){
  
}
show<string>('bb','a');
//sting为定义的泛型，show方法定义泛型且规定a、b两个形参都为string数据类型
//反之如果定义泛型为number数据类型，那么a、b两个形参都为number数据类型

//简写
show(1,2)//此时触发ts的类型推论，也是不会报错的
```

#### 多个泛型

```typescript
function sub<T,U>(a:T,b:U):Array<T | U>{
  let arr:Array<T | U> = [a,b]
}

sub<number,string>(1,"a")
//或
sub(1,"a")
```

### 泛型约束

```typescript
interface Len{
  length:number
}
function getLength<T extend Len>(arg:T){
  return arg.length
}
getLength([1,2,3])//此时传就必须传带有length的参数
```

### 接口泛型

声明接口的时候 在名字后面加一个<参数>
使用的时候传递类型

```typescript
interface MyInter<T> {
   (arg: T): T
}
 
function fn<T>(arg: T): T {
   return arg
}
 
let result: MyInter<number> = fn //此时接口被约束为number类型，fn就只能接收number类型
 
result(123)
```

### 对象字面量泛型

```typescript
let foo: { <T>(arg: T): T }
 
foo = function <T>(arg:T):T {
   return arg
}

foo(123)
```

### 使用keyof约束对象

其中使用了TS泛型和泛型约束。首先定义了T类型并使用extends关键字继承object类型的子类型，然后使用keyof操作符获取T类型的所有键，它的返回 类型是联合 类型，最后利用extends关键字约束 K类型必须为keyof T联合类型的子类型。

```typescript
//优化前的函数
function prop<T>(obj: T, key) {
   return obj[key]
}

//优化后的函数
function prop<T, K extends keyof T>(obj: T, key: K) {
   return obj[key]
}
 
 
let o = { a: 1, b: 2, c: 3 }
 
prop(o, 'a') 
prop(o, 'd') //优化前的函数不会报错，而优化后的函数此时就会报错发现找不到
```

### 类泛型

```typescript
class Demo<T>{
    attr:T[]:[];
    name: T
    age: number
    constructor(name: T, age: number) {
    }
  add(a:T):Array<T>{
    return [a]
  }
}
let s = new Demo<string>('aaa', 18)
s.attr=[1,2,3]
s.add(213)
//实例化对象定义泛型为string类型，Demo类订定义了泛型，规定name属性必须为string
```

这种约束数据类型只有在调用时候再约束数据类型，不像接口哪些，直接把某个属性或者变量直接定死的数据类型，不够泛型用起来灵活。

---

## 补充

### object、Object以及{}区别

Object：
Object跟原型链是有关系的，原型链的顶端就是Object或者是function，也就是说：所有的原始类型和对象类型都指向这个Object。而在TS中，Object就表示包含了所有的类型，即可以等于任何的值。

object：
常用于泛型约束，object表示非原始类型，也就是除number，string，boolean，symbol，null或undefined之外的类型。

{}——字面量模式
{}可以理解为new Object，包含所有的类型

```typescript
let a:{} = 123
let a:{} = "123"
let a:{} = []
let a:{} = {}
```

字面量模式注意事项：

1. 它虽然可以赋值任意类型，但是赋值之后是不能进行修改的，是无法对变量进行重新赋值的一个操作。
2. 建议少用字面量模式

# TS在项目中的使用

## tsconfig.json配置文件

tsconfig.json文件是通过`tsc -- init`命令生成的，而使用`tsc`命令前提条件`npm i typescript -g`

### 配置详解

```typescript
"compilerOptions": {
  "incremental": true, // TS编译器在第一次编译之后会生成一个存储编译信息的文件，第二次编译会在第一次的基础上进行增量编译，可以提高编译的速度
  "tsBuildInfoFile": "./buildFile", // 增量编译文件的存储位置
  "diagnostics": true, // 打印诊断信息 
  "target": "ES5", // 目标语言的版本
  "module": "CommonJS", // 生成代码的模板标准
  "outFile": "./app.js", // 将多个相互依赖的文件生成一个文件，可以用在AMD模块中，即开启时应设置"module": "AMD",
  "lib": ["DOM", "ES2015", "ScriptHost", "ES2019.Array"], // TS需要引用的库，即声明文件，es5 默认引用dom、es5、scripthost,如需要使用es的高级版本特性，通常都需要配置，如es8的数组新特性需要引入"ES2019.Array",
  "allowJS": true, // 允许编译器编译JS，JSX文件
  "checkJs": true, // 允许在JS文件中报错，通常与allowJS一起使用
  "outDir": "./dist", // 指定输出目录
  "rootDir": "./", // 指定输出文件目录(用于输出)，用于控制输出目录结构
  "declaration": true, // 生成声明文件，开启后会自动生成声明文件
  "declarationDir": "./file", // 指定生成声明文件存放目录
  "emitDeclarationOnly": true, // 只生成声明文件，而不会生成js文件
  "sourceMap": true, // 生成目标文件的sourceMap文件
  "inlineSourceMap": true, // 生成目标文件的inline SourceMap，inline SourceMap会包含在生成的js文件中
  "declarationMap": true, // 为声明文件生成sourceMap
  "typeRoots": [], // 声明文件目录，默认时node_modules/@types
  "types": [], // 加载的声明文件包
  "removeComments":true, // 删除注释 
  "noEmit": true, // 不输出文件,即编译后不会生成任何js文件
  "noEmitOnError": true, // 发送错误时不输出任何文件
  "noEmitHelpers": true, // 不生成helper函数，减小体积，需要额外安装，常配合importHelpers一起使用
  "importHelpers": true, // 通过tslib引入helper函数，文件必须是模块
  "downlevelIteration": true, // 降级遍历器实现，如果目标源是es3/5，那么遍历器会有降级的实现
  "strict": true, // 开启所有严格的类型检查
  "alwaysStrict": true, // 在代码中注入'use strict'
  "noImplicitAny": true, // 不允许隐式的any类型
  "strictNullChecks": true, // 不允许把null、undefined赋值给其他类型的变量
  "strictFunctionTypes": true, // 不允许函数参数双向协变
  "strictPropertyInitialization": true, // 类的实例属性必须初始化
  "strictBindCallApply": true, // 严格的bind/call/apply检查
  "noImplicitThis": true, // 不允许this有隐式的any类型
  "noUnusedLocals": true, // 检查只声明、未使用的局部变量(只提示不报错)
  "noUnusedParameters": true, // 检查未使用的函数参数(只提示不报错)
  "noFallthroughCasesInSwitch": true, // 防止switch语句贯穿(即如果没有break语句后面不会执行)
  "noImplicitReturns": true, //每个分支都会有返回值
  "esModuleInterop": true, // 允许export=导出，由import from 导入
  "allowUmdGlobalAccess": true, // 允许在模块中全局变量的方式访问umd模块
  "moduleResolution": "node", // 模块解析策略，ts默认用node的解析策略，即相对的方式导入
  "baseUrl": "./", // 解析非相对模块的基地址，默认是当前目录
  "paths": { // 路径映射，相对于baseUrl
    // 如使用jq时不想使用默认版本，而需要手动指定版本，可进行如下配置
    "jquery": ["node_modules/jquery/dist/jquery.min.js"]
  },
  "rootDirs": ["src","out"], // 将多个目录放在一个虚拟目录下，用于运行时，即编译后引入文件的位置可能发生变化，这也设置可以虚拟src和out在同一个目录下，不用再去改变路径也不会报错
  "listEmittedFiles": true, // 打印输出文件
  "listFiles": true// 打印编译的文件(包括引用的声明文件)
}
 
// 指定一个匹配列表（属于自动指定该路径下的所有ts相关文件）
"include": [
   "src/**/*"
],
// 指定一个排除列表（include的反向操作）
 "exclude": [
   "demo.ts"
],
// 指定哪些文件使用该配置（属于手动一个个指定文件）
 "files": [
   "demo.ts"
]
```

`echo ''>index.ts`意思：创建一个内容为空的index.ts文件
`del index.ts`意思：删除index.ts文件
`mkdir dist`意思：创建dist文件夹

### 常用的配置项

1、include——指定编译文件默认是编译当前目录下所有的ts文件。

```typescript
"include": ["./index.ts"],
```

2、exclude——指定排除的文件

```typescript
"exclude": ["./index.ts"],
```

3、target——指定编译js的版本，例如es5或es6

```typescript
"target":"es5"
```

4、allowJS——是否允许编译js文件

```typescript
"allowJS":true
```

5、removeComments——是否在编程过程中删除文件中的注释

```typescript
"removeComments":true
```

6、rootDir——编译文件的目录
7、outDir——输出的目录

```typescript
"outDir":"./dist"
```

8、sourceMap——代码源文件

```typescript
"sourceMap":true
```

9、strict——严格模式，禁止滥用类型

```typescript
"strict":true
```

10、module——默认commonjs  可选ES6模式 amd  umd 等

```typescript
"module":"commonjs "
```

commonjs用的require引用，nodejs也遵循commonjs。

## 命名空间

我们在工作中无法避免全局变量造成污染，TypeScript提供了namespace避免这个问题出现：

- 内部模块，主要用于组织代码，避免命名冲突
- 命名空间内的默认私有
- 通过export暴露
- 通过namespace关键字定义

### 如何声明命名空间

TS与ES5一样，任何包含顶级import或者export的文件都被当成一个模块。相反地，如果一个文件不带有顶级的import或者export声明，那么它的内容被视为全局可见的（因此对模块也是可见的）。

命名空间中通过export将想要暴露的部分导出，如果不用export导出无法读取其值。

```typescript
//index.ts
const a:number = 1
//index2.ts
const a:number = 2
```

同时打开index.ts文件和index2.ts文件时，因为两个文件默认作用都是全局的，且变量名一样，此时就会报错，如何避免这种报错呢：
方法一：

```typescript
//index.ts
export const a:number = 1
//index2.ts
const a:number = 2
```

方法二：

```typescript
//index.ts
namespace A{
  export const a:number = 1
}
//index2.ts
namespace B{
  export const a:number = 2
}
```

### 如何使用命名空间的变量

```typescript
//index.ts
namespace A{
  export const a:number = 1
}

console.log(A.a)
```

### 嵌套命名空间

```typescript
namespace A{
  export namespace C{
    export const D = 5
  }
}

console.log(A.C.D)
```

### 抽离命名空间

```typescript
//抽离命名空间
//index.ts
export namespace B{
  export const a = 2
}

//使用抽离的命名空间
//index2.ts
import { B } from './index.ts'
```

### 简化命名空间

```typescript
//改造前
namespace A{
  export namespace C{
    export const D = 5
  }
}

console.log(A.C.D)

//改造后
namespace A{
  export namespace C{
    export const D = 5
  }
}
import AAA = A.C
console.log(AAA.D)
```

注意：
ts-node不认识这种简化的命名空间，不能使用ts-node直接编译此ts文件，但是可以通过tsc将该ts文件编译为js文件，然后再执行js文件。

### 合并命名空间

重名的命名空间会合并

```typescript
namespace A{
  export const A = 1
}

namespace A{
  export const B = 1
}

//此时并不会报错，且同时可以访问A和B变量，因为两个命名空间已经合并了
console.log(A.A)
console.log(A.B)
```

---

## 三斜线指令

三斜线指令是包含单个XML标签的单行注释。注释的内容会作为编译器指令使用。
三斜线指令仅可放在包含它的文件的最顶端。一个三斜线指令的签名只能出现单行或多行注释。这包含其它的三斜线指令。如果它们出现在一个语句或声明之后，那么它们会被当作普通的单行注释，并且不具有特殊的涵义。
/// <reference path="..." />指令是三斜线指令中最常见的一种。 它用于声明文件间的 _依赖_。
三斜线引用告诉[编译器](https://so.csdn.net/so/search?q=%E7%BC%96%E8%AF%91%E5%99%A8&spm=1001.2101.3001.7020)在编译过程中要引入的额外的文件。
你也可以把它理解能import，它可以告诉编译器在编译过程中要引入的额外的文件。

### 利用三斜线指令引入变量

例如：
a.ts

```typescript
namespace A {
    export const fn = () => 'a'
}
```

b.ts

```typescript
namespace A {
    export const fn2 = () => 'b'
}
```

index.ts

```typescript
///<reference path="./index2.ts" />
///<reference path="./index3.ts" />
 
 
console.log(A);//引入之后直接可以使用变量A
```

### 利用三斜线指令引入声明文件

例如，把 /// <reference types="node" />引入到声明文件，表明这个文件使用了 @types/node/index.d.ts里面声明的名字； 并且，这个包需要在编译阶段与声明文件一起被包含进来。
仅当在你需要写一个d.ts文件时才使用这个指令。
`///<reference types="node" />`

注意事项：
如果你在配置文件 配置了noResolve 或者自身调用自身文件会报错

## 声明文件.d.ts declare

当使用第三方库时，我们需要引用它的声明文件，才能获得对应的代码补全、接口提示等功能。

- declare var 声明全局变量
- declare function 声明全局方法
- declare class 声明全局类
- declare enum 声明全局枚举类型
- declare namespace 声明(含有子属性的)全局对象
- interface 和 type 声明全局类型
- /// <reference /> 三斜线指令

`npm i express -S`等同于`npm i express --save`

默认引入express会报声明文件的错，然后可以下载声明文件：`npm i @type/express -D`
此时：

```typescript
import express from 'express';//此时声明文件没报错了，但是前面没使用可能会报错
```

在tsconfig.json中

```typescript
{
  "compilerOptions":{
    "strict":true,
     "allowSyntheticDefaultImports": true,//配置这一项就不会报错了
  }
}
```

更多的声明文件：[参考此链接](https://www.npmjs.com/~types?activeTab=packages)

## Mixins混入

TS混入Mixins其实vue也有mixins这个东西，你可以把他看作合并

### 对象混入

可以使用es6的Object.assign合并多个对象

```typescript
interface Name {
    name: string
}
interface Age {
    age: number
}
interface Sex {
    sex: number
}
 
let people1: Name = { name: "小满" }
let people2: Age = { age: 20 }
let people3: Sex = { sex: 1 }
 
const people = Object.assign(people1,people2,people3)

console.log(people)
```

### 类的混入

首先声明两个mixins类 （严格模式要关闭不然编译不过）

```typescript
class A {
    type: boolean = false;
    changeType() {
        this.type = !this.type
    }
}
 
 
class B {
    name: string = '张三';
    getName(): string {
        return this.name;
    }
}
```

下面创建一个类，结合了这两个mixins
首先应该注意到的是，没使用extends而是使用implements。 把类当成了接口
我们可以这么做来达到目的，为将要mixin进来的属性方法创建出占位属性。 这告诉编译器这些成员在运行时是可用的。 这样就能使用mixin带来的便利，虽说需要提前定义一些占位属性

```typescript
class C implements A,B{
    type:boolean
    changeType:()=>void;
    name: string;
    getName:()=> string
}
```

最后，创建这个帮助函数，帮我们做混入操作。 它会遍历mixins上的所有属性，并复制到目标上去，把之前的占位属性替换成真正的实现代码
Object.getOwnPropertyNames()可以获取对象自身的属性，除去他继承来的属性，
对它所有的属性遍历，它是一个数组，遍历一下它所有的属性名

```typescript
Mixins(C, [A, B])
function Mixins(curCls: any, itemCls: any[]) {
    itemCls.forEach(item => {
        Object.getOwnPropertyNames(item.prototype).forEach(name => {
            curCls.prototype[name] = item.prototype[name]
        })
    })
}

let c  =new C();
c.type
c.changeType
c.name
c.getName
```

## 装饰器（Decorator）

**Decorator装饰器是一项实验性特性，在未来的版本中可能会发生改变。**

它们不仅增加了代码的可读性，清晰地表达了意图，而且提供一种方便的手段，增加或修改类的功能。

### 启用装饰器

若要启用实验性的装饰器特性，你必须在命令行行或tsconfig.json文件里启用编译器选项

```typescript
 "compilerOptions": {
    "experimentalDecorators": true,
 }
```

### 定义装饰器

```typescript
//定义一个类装饰器函数 他会把ClassA的构造函数传入你的watcher函数当做第一个参数
const watcher:ClassDecorator = (target:Function)=>{
  //往A类上挂载一个getParmas方法
  target.prototype.getParams = <T>(params: T):T => {
        return params
    }
}

@wather
class A{
  
}

let a = new A();

console.log((<any>a).getName('123123'))
console.log((a as any).getName('123123'))
```

使用该装饰器的好处，可以快速构建一个新类出来，且具备同样的功能，如：

```typescript
@wather
class B{
  
}

let b = new B();

console.log((<any>b).getName('123123'))
console.log((b as any).getName('123123'))
```

### 装饰器工厂

其实也就是一个高阶函数 外层的函数接受值 里层的函数最终接受类的构造函数
函数柯里化

```typescript
const watcher = (name: string): ClassDecorator => {
    return (target: Function) => {
        target.prototype.getParams = <T>(params: T): T => {
            return params
        }
        target.prototype.getOptions = (): string => {
            return name
        }
    }
}
 
@watcher('name')
class A {
    constructor() {
 
    }
}
 
const a = new A();
console.log((a as any).getParams('123'));
```

### 装饰器组合

就是可以使用多个装饰器

```typescript
const watcher = (name: string): ClassDecorator => {
    return (target: Function) => {
        target.prototype.getParams = <T>(params: T): T => {
            return params
        }
        target.prototype.getOptions = (): string => {
            return name
        }
    }
}
const watcher2 = (name: string): ClassDecorator => {
    return (target: Function) => {
        target.prototype.getNames = ():string => {
            return name
        }
    }
}
 
@watcher2('name2')
@watcher('name')
//@watcher2('name2')  @watcher('name')
class A {
    constructor() {
 
    }
}
 
 
const a = new A();
console.log((a as any).getOptions());
console.log((a as any).getNames());
```

### 方法装饰器

返回三个参数：
1、对于静态成员来说是类的构造函数，对于实例成员是类的原型对象。
2、成员的名字。
3、成员的属性描述符

#### 如何定义方法装饰器

```typescript
const met:MethodDecorator = (...args) => {
    console.log(args);//打印结果见下
}
```

#### 如何使用方法装饰器

```typescript
class A {
    constructor() {
 
    }
    @met
    getName ():string {
        return '小满'
    }
}
 
 
const a = new A();
```

打印结果：

```typescript
[
  {},
  'getName',
  {
    value: [Function: getName],
    writable: true,
    enumerable: false,
    configurable: true
  }
]
```

### 属性装饰器

返回两个参数：
1、对于静态成员来说时类的构造函数，对于实例成员时类的原型对象。
2、属性的名字
[ {}, 'name', undefined ]

#### 如何定义属性装饰器

```typescript
const met:PropertyDecorator = (...args) => {
    console.log(args);//打印为：[ {}, 'name', undefined ]
}
```

#### 如何使用属性装饰器

```typescript
 class A {
    @met
    name:string = 'qyxc'
    constructor() {
 
    }
   
}
 
 
const a = new A();
```

### 形参装饰器

返回三个参数

1. 对于静态成员来说是类的构造函数，对于实例成员是类的原型对象。
2. 成员的名字。
3. 参数在函数参数列表中的索引。

#### 如何定义形参装饰器

```typescript
const met:ParameterDecorator = (...args) => {
    console.log(args);//打印结果为：[ {}, 'getName', 0 ]  0是参数的位置
}
```

#### 如何使用形参装饰器

```typescript
 class A {
    constructor() {
 
    }
    getName(@params name: string = 'qyxc'): string {
        return name
    }
}
 
 
const a = new A();
```

---

# Rollup构建TS项目

## 项目初始化

1. `npm init -y`和`tsc --init`
2. 新建`rollup.config.js`配置文件
3. 新建public文件夹，并在此文件夹新建index.html文件并初始化里面的内容
4. 新建src文件夹，并在此文件夹新建index.ts文件并初始化里面的内容
5. 最终结果：

![image.png](https://cdn.nlark.com/yuque/0/2022/png/26898279/1670567278197-b304e0c0-4580-43ef-9912-ed41d42821e5.png#averageHue=%23fbe4ec&clientId=uefe19e36-17d2-4&from=paste&height=187&id=u933c1a62&name=image.png&originHeight=187&originWidth=307&originalType=binary&ratio=1&rotation=0&showTitle=false&size=6829&status=done&style=none&taskId=u954bb30d-34df-4a98-bbcc-64be4a67049&title=&width=307)

## 安装依赖

复制以下内容到`package.json`文件中，并允许`npm install`

```json
{
  "name": "rollup-ts",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "cross-env": "^7.0.3",
    "rollup-plugin-livereload": "^2.0.5",
    "rollup-plugin-node-resolve": "^5.2.0",
    "rollup-plugin-replace": "^2.2.0",
    "rollup-plugin-serve": "^1.1.0",
    "rollup-plugin-terser": "^7.0.2",
    "rollup-plugin-typescript2": "^0.31.1",
    "typescript": "^4.5.5"
  }
}
```

## 配置文件

1、初始化`rollup.config.js`文件：

```json

import path from 'path'//读取路径

import ts from 'rollup-plugin-typescript2' //让其识别ts文件

export default {
    input: "./src/index.ts",
    output: {
        file: path.resolve(__dirname, './lib/index.js'),
        format: "umd"
    },

    plugins: [
        ts()
    ]
}

```

2、在`package.json`配置打包命令，即：

```json
"scripts": {
    "build": "rollup -c"
},
```

`rollup -c`就是根目录

3、修改`ts.config.json`，将`"module": "commonjs"`,修改为`"module": "es5"`
![image.png](https://cdn.nlark.com/yuque/0/2022/png/26898279/1670567928568-e75c3f29-6c16-4a8d-b038-18f382eb09db.png#averageHue=%23fcfaf7&clientId=uefe19e36-17d2-4&from=paste&height=51&id=u99fc2163&name=image.png&originHeight=51&originWidth=655&originalType=binary&ratio=1&rotation=0&showTitle=false&size=6723&status=done&style=none&taskId=u36fa2a45-3957-4e15-8ef2-15128412af8&title=&width=655)

4、终端运行命令`npm run build`，运行完成目录中也会多一个文件夹：
![image.png](https://cdn.nlark.com/yuque/0/2022/png/26898279/1670567978165-f6cb41d8-3469-4c06-9f40-8bed7e7dabf8.png#averageHue=%23fbdfe9&clientId=uefe19e36-17d2-4&from=paste&height=301&id=uab0ca782&name=image.png&originHeight=301&originWidth=311&originalType=binary&ratio=1&rotation=0&showTitle=false&size=9538&status=done&style=none&taskId=u98130b3b-fbb4-4174-85d5-3366b241a0a&title=&width=311)

5、修改`public`文件夹下的`index.html`文件

```html
<!DOCTYPE html>
<html lang="en">

  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
  </head>

  <body>

  </body>

</html>
<!-- 引入打包后的文件 -->
<script src="../lib/index.js"></script>
```

6、在`package.json`配置启动命令，即：

```html
"scripts": {
    "dev": "rollup -c -w"
},
```

`rollup -c -w` `-w`就是`-watch`，一有变动就会重启。

7、运行命令`npm run dev`此时已经可以对文件进行监听，但是还并没有前端的服务。

8、配置前段服务，修改`rollup.config.js`

```javascript

import path from 'path'//读取路径

import ts from 'rollup-plugin-typescript2' //让其识别ts文件

import serve from 'rollup-plugin-serve' //引入服务

export default {
    input: "./src/index.ts",
    output: {
        file: path.resolve(__dirname, './lib/index.js'),
        format: "umd"
    },

    plugins: [
        ts(),
        serve({
            open: true,//运行成功后是否打开
            port: 4132,//指定端口
            openPage: '/public/index.html'//打开的文件位置
        })
    ]
}

```

提示：最好用vscode打开项目的根目录，否则openPage可能会报错。
参考打开的项目结构：
![image.png](https://cdn.nlark.com/yuque/0/2022/png/26898279/1670568647020-ccdea809-c5a1-4fbf-8a62-917b1ca1f54e.png#averageHue=%23f9e1eb&clientId=uefe19e36-17d2-4&from=paste&height=224&id=u68b9cc5a&name=image.png&originHeight=224&originWidth=303&originalType=binary&ratio=1&rotation=0&showTitle=false&size=8561&status=done&style=none&taskId=u50e66519-41a0-4a06-a310-781a77a240c&title=&width=303)

9、按上述步骤配置好后，再次重新运行`npm run dev`命令，此时网页自动打开，打开控制台也看见打印出的东西，但是修改index.ts文件是的打印内容时，发现网页并不会热更新。

10、配置热更新服务，在`rollup.config.js`文件中：

```javascript

import path from 'path'//读取路径

import ts from 'rollup-plugin-typescript2' //让其识别ts文件

import serve from 'rollup-plugin-serve' //引入服务

import livereload from 'rollup-plugin-livereload'//引入热更新服务

export default {
    input: "./src/index.ts",
    output: {
        file: path.resolve(__dirname, './lib/index.js'),
        format: "umd"
    },

    plugins: [
        ts(),
        livereload(),//调用热更新服务
        serve({
            open: true,//运行成功后是否打开
            port: 4132,//指定端口
            openPage: '/public/index.html'//打开的文件位置
        })
    ]
}

```

tip：配置好后，重新启动项目`npm run dev`，此时再修改`index.ts`文件，发现就可以热更新了

11、此时代码运行起来，但是代码并没有被压缩，我们还可以配置一下代码压缩服务：

```javascript

import path from 'path'//读取路径

import ts from 'rollup-plugin-typescript2' //让其识别ts文件

import serve from 'rollup-plugin-serve' //引入服务

import livereload from 'rollup-plugin-livereload'//引入热更新服务

import { terser } from 'rollup-plugin-terser'///引入代码压缩

export default {
    input: "./src/index.ts",
    output: {
        file: path.resolve(__dirname, './lib/index.js'),
        format: "umd"
    },

    plugins: [
        ts(),
        livereload(),//调用热更新服务
        terser(),//启用代码压缩
        serve({
            open: true,//运行成功后是否打开
            port: 4132,//指定端口
            openPage: '/public/index.html'//打开的文件位置
        })
    ]
}

```

12、虽然代码压缩了，但是此时如果在在控制台点击查看代码，就会发现代码被压缩，不好分析，此时可以配置`sourcemap`，在`rollup.config.js`文件中：

```javascript
output: {
        file: path.resolve(__dirname, './lib/index.js'),
        format: "umd",
        sourcemap: true
},
```

`tsconfig.json`也得打开：

```javascript
 "sourceMap": true,
```

配置好后再次重新运行：
![image.png](https://cdn.nlark.com/yuque/0/2022/png/26898279/1670569482823-1848f69b-5921-4a8f-b8e4-9d1b121c17cb.png#averageHue=%23f8f7f6&clientId=u47048856-c624-4&from=paste&height=137&id=ue5c69a26&name=image.png&originHeight=137&originWidth=802&originalType=binary&ratio=1&rotation=0&showTitle=false&size=13416&status=done&style=none&taskId=uf1fded4a-56b3-4e1c-b396-4ed03f6b089&title=&width=802)
此时点击就很方便查看到源文件了：
![image.png](https://cdn.nlark.com/yuque/0/2022/png/26898279/1670569506159-f72428ba-cb4c-4f53-bfb8-327f7f2ced0c.png#averageHue=%23f4f4f3&clientId=u47048856-c624-4&from=paste&height=213&id=uc331ec7d&name=image.png&originHeight=213&originWidth=734&originalType=binary&ratio=1&rotation=0&showTitle=false&size=22762&status=done&style=none&taskId=ub54e353d-e1a1-43f0-94ab-09d1bd96350&title=&width=734)

13、如何判断是生产环境还是开发环境，可以借助两个插件：`cross-env`和`rollup-plugin-replace`，两个依赖下载好后，配置`package.json`文件的启动命令：

```javascript
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "cross-env NODE_ENV=development  rollup -c -w",
    "build": "cross-env NODE_ENV=produaction  rollup -c"
},
```

当运行`npm run dev`的时候，`cross-env`会将node环境变量设置为`development`，`npm run build`反之。

14、在`rollup.config.js`文件中就可以打印出来环境变量:

```javascript
console.log(process.env);
```

此时只是可以在通过运行`npm run dev`或`npm run build`命令在终端来查看环境变量，但是你在`index.ts`文件是打印不出来环境变量的，也就是说，此时浏览器是没有环境变量这个东西的。但是可以通过`rollup-plugin-replace`去注册。

15、修改`rollup.config.js`文件

```javascript

console.log(process.env);//可以在终端打印出来环境变量

import path from 'path'//读取路径

import ts from 'rollup-plugin-typescript2' //让其识别ts文件

import serve from 'rollup-plugin-serve' //引入服务

import livereload from 'rollup-plugin-livereload'//引入热更新服务

import { terser } from 'rollup-plugin-terser'///引入代码压缩

import replace from 'rollup-plugin-replace'

export default {
    input: "./src/index.ts",
    output: {
        file: path.resolve(__dirname, './lib/index.js'),
        format: "umd",
        sourcemap: true//启用map，同时记得tsconfig.json的sourceMap也要设置为true
    },

    plugins: [
        ts(),
        livereload(),//调用热更新服务
        terser(),//启用代码压缩
        replace({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV) //往浏览器注册环境变量，就可以通过process.env.NODE_ENV来访问
            //这里的名字是自定义的
        }),
        serve({
            open: true,//运行成功后是否打开
            port: 4132,//指定端口
            openPage: '/public/index.html'//打开的文件位置
        })
    ]
}

```

在index.ts文件中：

```javascript
const a: string = 'qyxc123123'

console.log(process.env.NODE_ENV);

```

浏览器控制台：
![image.png](https://cdn.nlark.com/yuque/0/2022/png/26898279/1670570336550-b67baf8e-b876-4a95-bd00-b12d4208d075.png#averageHue=%23f5f4f4&clientId=u47048856-c624-4&from=paste&height=108&id=u585cfa67&name=image.png&originHeight=108&originWidth=799&originalType=binary&ratio=1&rotation=0&showTitle=false&size=12400&status=done&style=none&taskId=uf0c22f68-ade3-4e9f-8d05-81ced5761a3&title=&width=799)

16、根据环境变量判断是否需要启服务和热更新

```javascript

console.log(process.env);//可以在终端打印出来环境变量

import path from 'path'//读取路径

import ts from 'rollup-plugin-typescript2' //让其识别ts文件

import serve from 'rollup-plugin-serve' //引入服务

import livereload from 'rollup-plugin-livereload'//引入热更新服务

import { terser } from 'rollup-plugin-terser'///引入代码压缩

import replace from 'rollup-plugin-replace'

const isDev = () => {
    return process.env.NODE_ENV === "development"
}

export default {
    input: "./src/index.ts",
    output: {
        file: path.resolve(__dirname, './lib/index.js'),
        format: "umd",
        sourcemap: true//启用map，同时记得tsconfig.json的sourceMap也要设置为true
    },

    plugins: [
        ts(),
        isDev() && livereload(),//调用热更新服务
        terser(),//启用代码压缩
        replace({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV) //往浏览器注册环境变量，就可以通过process.env.NODE_ENV
        }),
        isDev() && serve({
            open: true,//运行成功后是否打开
            port: 4132,//指定端口
            openPage: '/public/index.html'//打开的文件位置
        })
    ]
}

```

配置好后如何你直接打开html文件，就会显示为生产环境，但是如果你用`npm run dev`启动项目就是显示为开发环境。

17、删除`console.log()`代码

```javascript
terser({
    compress: {
        drop_console: true
    }
}),//启用代码压缩
```

# Webpack构建TS项目

## 项目初始化

1. 新建public文件夹，并在此文件夹新建index.html，并初始化里面的内容。
2. 新建src文件夹，并再次文件夹新建index.ts
3. 新建webpack.config.js
4. 分别运行命令`npm init -y`和`tsc --init`
5. 项目结构参考：

![image.png](https://cdn.nlark.com/yuque/0/2022/png/26898279/1670571489504-b6394674-5458-4359-b013-f6e1b59fe93a.png#averageHue=%23fbe5ed&clientId=u47048856-c624-4&from=paste&height=173&id=u83543723&name=image.png&originHeight=173&originWidth=313&originalType=binary&ratio=1&rotation=0&showTitle=false&size=6743&status=done&style=none&taskId=u3e3eca72-7459-4f3b-a6a1-061af9568fb&title=&width=313)

## 安装依赖

1. `npm i webpack -D`（如果webpack版本是4以上的，需要额外安装`npm i webpack-cli -D`）
2. `npm i webpack-dev-server -D`安装热更新服务
3. `npm i ts-loader -D`帮助webpack解析ts。
4. `npm i html-webpack-plugin -D`webpack加载的html模板
5. `npm i typescript -D`安装ts语法到项目中
6. `package.json`文件依赖参考，或者直接复制过去然后`npm i`

```json
{
  "name": "webpack-ts",
  "version": "1.0.0",
  "description": "",
  "main": "webpack.config.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "webpack-dev-server"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "html-webpack-plugin": "^5.5.0",
    "ts-loader": "^9.4.2",
    "typescript": "^4.9.4",
    "webpack": "^5.75.0",
    "webpack-cli": "^5.0.1",
    "webpack-dev-server": "^4.11.1"
  }
}

```

## 项目初始化

### 初始化webpack.config.js

```javascript


const path = require("path")

const htmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
  entry: "./src/index.ts",//入口文件
  mode: "development",
  output: {
    //出口文件
    path: path.resolve(__dirname, './dist'),//出口文件路径
    filename: "index.js"//出口生成的文件名
  },

  module: {
    rules: [
      //定义规则
      {
        //以ts结尾的文件使用ts-loader进行编译解析
        test: /\.ts$/,
        use: "ts-loader"
      }
    ]
  },
  devServer: {
    open: true,//启动后自动打开默认浏览器
    port: 8080,//配置端口号
    proxy: {}//配置代理
  },
  resolve: {
    //匹配文件的后准名
    extensions: ['.js', '.ts']//帮助我们匹配后缀的
  },
  plugins: [
    //指定加载的html模板文件
    new htmlWebpackPlugin({
      template: "./public/index.html"
    })
  ]
}

```

### 初始化index.ts文件

```javascript
console.log('webpack')
```

### 配置项目启动命令

```json
"scripts": {
  "test": "echo \"Error: no test specified\" && exit 1",
  "dev": "webpack-dev-server"
},
```

### 启动项目

`npm run dev`
![image.png](https://cdn.nlark.com/yuque/0/2022/png/26898279/1670572763420-bb30de79-0475-4a3f-83b2-715252047b67.png#averageHue=%23f6f5f4&clientId=u47048856-c624-4&from=paste&height=166&id=uc634b0fb&name=image.png&originHeight=166&originWidth=804&originalType=binary&ratio=1&rotation=0&showTitle=false&size=21192&status=done&style=none&taskId=u851cfba4-3669-4ea8-b1ab-b185f27836b&title=&width=804)

### 配置项目打包命令

```json
 "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "webpack-dev-server",
    "build": "webpack"
  },
```

### 打包项目

`npm run build`

---

# 实战TS编写发布订阅模式

## 概述

什么是发布订阅模式，如addEventListener，Vue EventBus都属于发布订阅模式

简单来说，一个人带球，一个人带球拍，一个人带水，三个人全部准备好后才可以开始打球

## 思维导图

定义三个角色：发布者、订阅者、调度者
![image.png](https://cdn.nlark.com/yuque/0/2022/png/26898279/1670573776347-8873d68e-e8c3-44fb-9fae-1d28740c10dc.png#averageHue=%23fafafa&clientId=u47048856-c624-4&from=paste&height=313&id=u83310d0e&name=image.png&originHeight=313&originWidth=650&originalType=binary&ratio=1&rotation=0&showTitle=false&size=34525&status=done&style=none&taskId=u0246f1fd-52b3-4f91-91c6-c3079585a7a&title=&width=650)

## 具体代码

1. on——订阅/监听
2. emit——发布/注册
3. once——只执行一次
4. off——解除绑定

```json
interface EventFace {
    on: (name: string, callback: Function) => void,
    emit: (name: string, ...args: Array<any>) => void,
    off: (name: string, fn: Function) => void,
    once: (name: string, fn: Function) => void
}
 
interface List {
    [key: string]: Array<Function>,
}
class Dispatch implements EventFace {
    list: List
    constructor() {
        this.list = {}
    }
    on(name: string, callback: Function) {
        const callbackList: Array<Function> = this.list[name] || [];
        callbackList.push(callback)
        this.list[name] = callbackList
    }
    emit(name: string, ...args: Array<any>) {
        let evnetName = this.list[name]
        if (evnetName) {
            evnetName.forEach(fn => {
                fn.apply(this, args)
            })
        } else {
            console.error('该事件未监听');
        }
    }
    off(name: string, fn: Function) {
        let evnetName = this.list[name]
        if (evnetName && fn) {
            let index = evnetName.findIndex(fns => fns === fn)
            evnetName.splice(index, 1)
        } else {
            console.error('该事件未监听');
        }
    }
    once(name: string, fn: Function) {
        let decor = (...args: Array<any>) => {
            fn.apply(this, args)
            this.off(name, decor)
        }
        this.on(name, decor)
    }
}
const o = new Dispatch()
 
 
o.on('abc', (...arg: Array<any>) => {
    console.log(arg, 1);
})
 
o.once('abc', (...arg: Array<any>) => {
    console.log(arg, 'once');
})
// let fn = (...arg: Array<any>) => {
//     console.log(arg, 2);
// }
// o.on('abc', fn)
// o.on('ddd', (aaaa: string) => {
//     console.log(aaaa);
// })
//o.off('abc', fn)
 
o.emit('abc', 1, true, '小满')
 
o.emit('abc', 2, true, '小满')
 
// o.emit('ddd', 'addddddddd')
```

# TS进阶用法

## proxy

### 概述

proxy对象用于创建一个对象的代理，从而实现基本操作的拦截和自定义（如属性查找、赋值、枚举、函数调用等）

### target

要使用Proxy包装的目标对象（可以是任何类型的对象，包括原生数组，函数，甚至另一个代理）

### handler

一个通常以函数作为属性的对象，各属性中的函数分别定义了在执行各操作时代理p的行为
`handler.get()`本次使用的get
属性读取操作的捕捉器
`handler.set()`本地使用的set
属性设置操作的捕捉器

## Reflect

与大多数全局对象不同的Reflect并非一个构造函数，所以不饿能通过new运算符对其进行调用，或者将Relect对象作为一个函数来调用。Reflect的所有属性和方法都是静态的（就像Math对象）。

### Reflect.get(target, name, receiver)

Reflect.get方法查找并返回target对象的name属性，如果没有该属性返回undefined

### Reflect.set(target, name,value, receiver)

Reflect.set方法设置target对象的name属性等于value。

## 具体代码

```typescript
type Person = {
  name: string,
  age: number,
  text: string
}


const proxy = (object: any, key: any) => {
  return new Proxy(object, {
    //target就是传过来的目标对象，prop就是传过来对象中属性的值，receiver跟target一样，防止上下文错误
    get(target, prop, receiver) {
      console.log(`get key======>${key}`);
      return Reflect.get(target, prop, receiver) //就可以去到值
    },
 //value就是要设置的值
    set(target, prop, value, receiver) {
      console.log(`set key======>${key}`);

      return Reflect.set(target, prop, value, receiver)
    }
  })
}

//这里的key是使用了type定义值的别名方式，约束其为name或者age或者text
const logAccess = (object: Person, key: 'name' | 'age' | 'text') => {
  //第一个参数是对象，第二个参数是属性的键值对
  return proxy(object, key)
}

let man: Person = logAccess({
  name: "qyxc",
  age: 20,
  text: "啦啦啦啦"
}, 'age')

//设置值——调用proxy函数的set方法
man.age  = 30

//读取值
console.log(man);
```

### 使用泛型+keyof优化

```typescript
type Person = {
    name: string,
    age: number,
    text: string
}
 
 
const proxy = (object: any, key: any) => {
    return new Proxy(object, {
        get(target, prop, receiver) {
            console.log(`get key======>${key}`);
            return Reflect.get(target, prop, receiver)
        },
 
        set(target, prop, value, receiver) {
            console.log(`set key======>${key}`);
 
            return Reflect.set(target, prop, value, receiver)
        }
    })
}
 
 
const logAccess = <T>(object: T, key: keyof T): T => {
    return proxy(object, key)
}
 
let man: Person = logAccess({
    name: "小满",
    age: 20,
    text: "我的很小"
}, 'age')
 
 
let man2 = logAccess({
    id:1,
    name:"小满2"
}, 'name')
 
man.age = 30
 
console.log(man);
```

## Partial & pick

### Partial

#### Partial使用示例代码

```typescript
type Person = {
    name:string,
    age:number
}
 
type p = Partial<Person>
```

鼠标滑动到p上就会发现，值都变成可选的了：

```typescript
type p = {
    name?: string | undefined;
    age?: number | undefined;
}
```

#### Partial源码

```typescript
/**
 * Make all properties in T optional
  将T中的所有属性设置为可选
 */
type Partial<T> = {
    [P in keyof T]?: T[P];
};
```

#### Partial源码解析

1. in

in 我们可以理解成for in P 就是key 遍历  keyof T  就是联合类型的每一项

2. keyof

将一个接口对象的全部属性取出来变成联合类型

3. ?

这个操作就是将每一个属性变成可选项

4. T[P]

T[P] 索引访问操作符，与 JavaScript 种访问属性值的操作类似

### Pick

从类型定义T的属性中，选取指定一组属性，返回一个新的类型定义。

#### Pick使用示例代码

```typescript
type Person = {
    name:string,
    age:number,
    text:string
    address:string
}
 
type Ex = "text" | "age"
 
type A = Pick<Person,Ex>
```

鼠标滑动到A上就会发现，我们想要的参数都被筛选出来了：

```typescript
type A = {
  text:string,
  age:number
}
```

#### Pick源码

```typescript
/**
 * From T, pick a set of properties whose keys are in the union K
 */
type Pick<T, K extends keyof T> = {
    [P in K]: T[P];
};
```

#### Pick源码解析

1. extends——约束K只能是T里面的
2. keyof——将一个接口对象的全部属性取出来变成联合类型，也就是约束key只能是K对象

## Record & Readonly

### Readonly

#### Readonly示例代码

```typescript
type Person = {
  name:string,
  age:number
}

type man = Readonly<Person>
```

鼠标滑到man上可以看到：

```typescript
type man = {
  readonly name:string,
  readonly age:number
}
```

#### Readonly源码

```typescript
type Readonly<T> = {
    readonly [P in keyof T]: T[P];
};
```

#### Readonly源码解析

Readonly 这个操作就是将每一个属性变成只读

### Record

做到了约束 对象的key 同时约束了 value

#### Record示例代码

```typescript
type Person = {
  name:string,
  age:number,
  text:string
}

type newPerson = "person1" | "person2"

type man = Record<newPerson,Person>
```

鼠标悬停在man上：

```typescript
type man = {
  person1:Person,
  person2:Person
}

//此时使用
let obj:man = {
  person1:{name:"小张",age:20,text:"真帅"},
  person2:{name:"小王",age:21,text:"真丑"},
}
```

#### Record源码

```typescript
type Record<K extends keyof any, T> = {
    [P in K]: T;
};
```

#### Record源码解析

1. keyof any 返回 string number symbol 的联合类型。
2. in 我们可以理解成for in P 就是key 遍历 keyof any 就是string number symbol类型的每一项。
3. extends来约束我们的类型。
4. T 直接返回类型

帮助我们约束了key值的类型

## infer

infer类型是TS新增到的关键字，充当占位符。

### infer代码示例

我们来实现一个条件类型推断的例子
定义一个类型，如果是数组类型，就返回数组元素的类型，否则，就传入什么类型就返回什么类型。

```typescript
type TYPE<T> = T extends Array<any> ? T[number] : T

type A = TYPE<(boolean | string)[]>//推断出是字符串或布尔类型的数组

type B = TYPE<string> //推断出为字符串
```

使用inter进行修改：

```typescript
type TYPE<T> = T extends Array<infer U> ? U: T
type A = Infer<string | Symbol[]>
```

配合元组使用联合类型：

```typescript
type TupleToUni<T> = T extends Array<infer E> ? E : never
 
type TTuple = [string, number];
 
type ToUnion = TupleToUni<TTuple>; // string | number
```

### infer类型提取

#### 1、提取头部元素

```typescript
type Arr = ['a','b','c']

type First<T extends any[]> = T extends [infer Firsr,...any[]] ? First : []

type a = First<Arr>
```

类型参数T通过extends约束只能是数组类型，然后通过infer声明局部First变量做提取，后面的元素可以是任意类型，然后把局部变量返回。

#### 2、提取尾部元素

```typescript
type Arr = ['a','b','c']

type Last<T extends any[]> = T extends [...any[],infer Last,] ? Last : []

type C = Last<Arr>
```

#### 3、剔除第一个元素Shift

```typescript
type Arr = ['a','b','c']
 
type First<T extends any[]> =  T extends [unknown,...infer Rest] ? Rest : []
 
type a = First<Arr>
```

思路就是 我们除了第一个的元素把其他的剩余元素声明成一个变量 直接返回 就实现了我们的要求 剔除第一个元素。

#### 4、剔除尾部元素pop

```typescript
type Arr = ['a','b','c']
 
type First<T extends any[]> =  T extends [...infer Rest,unknown] ? Rest : []
 
type a = First<Arr>
```

### infer递归

```typescript
//原类型
type Arr = [1, 2, 3, 4]

//目标想转换成的结果
type Arr = [4,3,2,1]

//完整代码
type Arr = [1, 2, 3, 4]
 
type ReveArr<T extends any[]> = T extends [infer First, ...infer rest] ? [...ReveArr<rest>, First] : T
 
type Res = ReveArr<Arr>
```

  具体思路 首先使用泛型约束 约束只能传入数组类型的东西  然后从数组中提取第一个，放入新数组的末尾，反复此操作，形成递归 满足结束条件返回该类型。
