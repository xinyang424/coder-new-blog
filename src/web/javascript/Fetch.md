---
title: Fetch API
date: 2022-03-01
category:
  - javascript
tag:
  - Fetch
  - 网络请求
---


fetch是XMLHttpRequest的升级版，用于在JavaScript脚本里面发出http请求。浏览器原生提供这个对象。


<!-- more -->

## 基本用法

`fetch()`的功能与XMLHttpRequest基本相同，但有三个主要差异：
1. `fetch()`使用Promise，不使用回调函数，因此大大简化了写法，写起来更简洁。
2. `fetch()`采用模块化设计，API分散在多个对象上（Response对象、Request对象、Header对象），更合理些；相比之下，XMLHtppRequest的API设计并不是很好，输入、输出、状态都在同一个接口管理，容易写出非常混乱的代码。
3. `fetch()`通过数据流（Stream对象）处理数据，可以分块读取，有利于提高网站性能表现，减少内存占用，对于请求大文件或者网速慢得场景相当有用。XMLHttpRequest对象不支持数据流，所有得数据必须放在缓存里，不支持分块读取，必须等待全部拿到后，再一次性吐出来。

在用法上，`fetch()`接口一个URL字符串作为参数，默认向该网址发出Get请求，返回一个Promise对象。它的基本用法如下：
```javascript
fetch(url)
.then(...)
.catch(...)
```

## Response对象：处理http回应

### response对象的同步属性

`fetch()`请求成功以后，得到的是一个response对象。它对应服务器的http回应。如下：
```javascript
const response = await fetch(url);
```

Response包含的数据通过stream接口异步读取，但是它还包含一些同步属性，对应http回应标头信息（headers），可以立即读取。

```javascript
async function fetchText() {
  let response = await fetch('/readme.txt');
  console.log(response.status); 
  console.log(response.statusText);
}
```
在上面的示例中，`response.status`和`response.statusText`就是Response的同步属性，可以立即读取。

标头信息属性有下面这些：
1. `response.ok`属性返回一个布尔值，表示请求是否成功，`true`对应HTTP请求的状态码200到299，`false`对应其它的状态码。
2. `response.status`属性返回一个数字，表示http回应的状态码（例如：200，表示请求成功）。
3. `response.statusText`属性返回一个字符串，表示http回应的状态信息（例如请求成功以后，服务器返回“OK”）
4. `response.url`属性返回请求的url，如果url存在跳转，该属性返回的是最终url。
5. `response.type`属性返回的请求的类型。可能值如下：
         - `basic`：普通请求，即同源请求。
         - `cors`：跨域请求。
         - `error`：网络错误，主要用于service worker。
         - `opaque`：如果`fetch()`请求的`type`属性设为`no-cors`，就会返回这个值，详见请求部分。表示发出的是简单的跨域请求，类似`<form>`表单的那种跨域请求。
         - `opaqueredirect`：如果`fetch()`请求的`redirect`属性设为`manual`，就会返回这个值，详见请求部分。
6. `response.redirected`属性返回一个布尔值，表示请求是否发生过跳转。
   
### 判断请求是否成功
`fetch()`发出请求以后，有一个很重要的注意点：只有网络错误或者无法连接时，`fetch()`才会报错，其它情况都不会报错，而是认为请求成功。

这就是说，即使服务器返回的状态码是4xx或5xx，`fetch()`也不会报错（即`promise`不会变为`rejected`状态）。

只有通过`response.status`属性，得到http回应的真实状态码，才能判断请求是否成功，见下例子：
```javascript
async function fetchText() {
  let response = await fetch('/readme.txt');
  if (response.status >= 200 && response.status < 300) {
    return await response.text();
  } else {
    throw new Error(response.statusText);
  }
}
```
上面示例中，`response.status`属性只有等于2xx(200-299)，才能认定请求成功。这里不用考虑网址跳转（状态码为3xx），因为`fetch()`会将跳转的状态码自动转为200。

另一种方法是判断`response.ok`是否为`true`。
```javascript
if(response.ok){
    //请求成功
}else{
    //请求失败
}
```

### response.headers属性
response对象还有一个`response.headers`属性，指向一个headers对象，对应http回应的所有标头。  
headers对象可以使用`for...of`循环进行遍历。
```javascript
const response = await fetch(url);

for (let [key, value] of response.headers) { 
  console.log(`${key} : ${value}`);  
}

// 或者
for (let [key, value] of response.headers.entries()) { 
  console.log(`${key} : ${value}`);  
}
```
headers对象提供了以下方法，用来操作标头：
- `headers.get()`：根据指定的键名，返回键值。
- `headers.has()`：返回一个布尔值，表示是否包含某个标头。
- `headers.set()`：将指定的键名设置为新的键值，如果该键名不存在则会添加。
- `headers.append()`：添加标头。
- `headers.delete()`：删除标头。
- `headers.keys()`：返回一个遍历器，可以依次遍历所有键名。
- `headers.value()`：返回一个遍历器，可以依次遍历所有键值。
- `headers.entries()`：返回一个遍历器，可以依次遍历所有键值对（[key,value]）
- `heaers.forEach()`：依次遍历标头，每个标头都会执行一次参数函数。

上面的有些方法可以修改标头，那是因为继承自headers接口。对于http回应来说，修改标头的意义不大，况且很多标头都是只读的，浏览器不允许修改。

这些方法中，最常用的就是`response.headers.get()`，用于读取某个标头的值。
```javascript
let response =  await  fetch(url);  
response.headers.get('Content-Type')
// application/json; charset=utf-8
```

### 读取内容的方法

`response`对象根据服务器返回的不同类型的数据，提供了不同的读取方法。
- `response.text()`：得到文本字符串，可以用于获取文本数据，比如HTML文件。
- `response.json()`：得到json对象，主要用于获取服务器返回的json数据。
- `response.formData()`：得到FormData表单对象，主要用在service worker里面，拦截用户提交的表单，修改某些数据后，再提交给服务器。
- `response.blob()`：得到二进制blob对象，用于获取二进制文件。
```javascript
const response = await fetch('flower.jpg');
const myBlob = await response.blob();
const objectURL = URL.createObjectURL(myBlob);

const myImage = document.querySelector('img');
myImage.src = objectURL;
```
- `response.arrayBuffer()`：得到二进制ArrayBuffer对象，主要用于获取流媒体文件。
```javascript
const audioCtx = new window.AudioContext();
const source = audioCtx.createBufferSource();

const response = await fetch('song.ogg');
const buffer = await response.arrayBuffer();

const decodeData = await audioCtx.decodeAudioData(buffer);
source.buffer = decodeData;
source.connect(audioCtx.destination);
source.loop = true;
```

上面五个方法都是异步的，返回的都是Promise对象。必须等到异步操作结束，才能得到服务器返回的完整数据。

### response.clone()
stream对象只能读取一次，读取完就没了，如下：
```javascript
let text =  await response.text();
let json =  await response.json();  // 报错
```
上面示例先使用了`response.text()`，就把Stream读完了。后面再调用`response.json()`，就没有内容可读了，所以报错。response对象提供了`response.clone()`方法，创建response对象多个副本，实现多次读取。
```javascript
const response1 = await fetch('flowers.jpg');
const response2 = response1.clone();

const myBlob1 = await response1.blob();
const myBlob2 = await response2.blob();

image1.src = URL.createObjectURL(myBlob1);
image2.src = URL.createObjectURL(myBlob2);
```
上面示例中，`response.clone()`复制了一份response对象，然后将同一张图片读取了两次。

response对象还有一个`response.redirect()`方法，用于将response结果重定向到指定url。该方法一般只用在service worker里面。

### response.body属性
`response.body`属性是response对象暴露出的底层接口，返回一个readableStream对象，供用户操作。
它可以用来分块读取内容，应用之一就是显示下载进度。
::: normal-demo 下载示例
```css
* {
  margin: 0;
  padding: 0;
}
div {
  height: 800px;
  overflow: hidden;
  background: center/cover no-repeat;
}
```

```html
<div class="bg">
  <p></p>
</div>
```

```js
const div = document.querySelector(".bg");
const p = document.querySelector("p");

const http = async () => {
  const response = await fetch("https://picsum.photos/1920/1080");
  const totalType = response.headers.get("Content-Length"); //总字节
  const reader = response.body.getReader();
  let downloadType = 0; //已下载的字节
  const stream = await new ReadableStream({
    start(controller) {
      return pump();
      function pump() {
        return reader.read().then(({ done, value }) => {
          if (done) {
            controller.close();
            return;
          }

          // 将下一个数据块置入流中
          controller.enqueue(value);
          downloadType = downloadType + value.length;
          p.innerText = `图片下载进度：${((downloadType / totalType) * 100).toFixed(0)}%`; //下载百分比
          return pump();
        });
      }
    },
  });
  const newResponse = new Response(stream);
  const blob = await newResponse.blob();
  const objectURL = URL.createObjectURL(blob);
  div.style.backgroundImage = `url(${objectURL})`;
};
http();
```

:::
上面的示例中，`response.body.getReader()`方法返回一个遍历器。这个遍历器的`read()`方法每次返回一个对象，表示本次读取的内容块。

:::note 补充
更多有关ReadableStream介绍[查看链接](https://developer.mozilla.org/zh-CN/docs/Web/API/ReadableStream#%E5%AE%9E%E4%BE%8B%E6%96%B9%E6%B3%95)
:::

这个对象的`done`属性是一个布尔值，用来判断有没有读完；`value`属性是一个arrayBuffer数组，表示内容块的内容。而`value.length`属性是当前块的大小。

## fetch()的第二个参数：定制http请求
`fetch()`的第一个参数是url，还可以接收第二个参数，作为配置对象，定制发出的http请求：
```javascript
fetch(url, optionObj)
```
上面示例的`optionObj`就是第二个参数。http请求的方法、标头、数据体都在这个对象里面设置。下面举例：
1. post请求
```javascript
const response = await fetch(url, {
  method: 'POST',
  headers: {
    "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
  },
  body: 'foo=bar&lorem=ipsum',
});

const json = await response.json();
```
上面示例中，配置对象用到了三个属性：
- `method`：http请求的方法，POST、DELETE、PUT都在这个属性设置。
- `headers`：一个对象，用来定制http请求的标头。
- `body`：post请求的数据体。
:::warning 注意
有些标头不能通过`headers`属性设置，比如`Content-Length`、`Cookie`、`Host`等。它们是由浏览器自动生成，无法修改。
:::
2. 提交json数据
```javascript
const user =  { name:  'John', surname:  'Smith'  };
 const response = await fetch('/article/fetch/post/user', {
 method: 'POST',
 headers: {
 'Content-Type': 'application/json;charset=utf-8'
 }, 
 body: JSON.stringify(user) 
 });
```
上面示例中，标头`Content-Type`要设成`application/json;chatset=utf-8`。因为默认发送的是纯文本，`Content-Type`的默认值是`text/plain;charset=utf-8`。  
3. 提交表单
```javascript
const form = document.querySelector('form');

const response = await fetch('/users', {
  method: 'POST',
  body: new FormData(form)
})
```
4. 文件上传
如果表单里面有文件选择器，可以用前一个例子的写法，上传的文件包含在整个表单里面，一起提交。  
另外一个方法是用脚本添加文件，构造出一个表单，进行上传，见下例：
```javascript
const input = document.querySelector('input[type="file"]');

const data = new FormData();
data.append('file', input.files[0]);
data.append('user', 'foo');

fetch('/avatars', {
  method: 'POST',
  body: data
});
```
上传二进制文件时，不用修改标头的`Content-Type`，浏览器会自动设置。
5. 直接上传二进制文件
`fetch()`也可以直接上传二进制数据，将Blob或ArrayBuffer数据放在`body`里面。
```javascript
let blob = await new Promise(resolve =>   
  canvasElem.toBlob(resolve,  'image/png')
);

let response = await fetch('/article/fetch/post/image', {
  method:  'POST',
  body: blob
});
```

## fetch()配置对象的完整API
`fetch()`第二个参数的完整API如下：
```javascript
const response = fetch(url, {
  method: "GET",
  headers: {
    "Content-Type": "text/plain;charset=UTF-8"
  },
  body: undefined,
  referrer: "about:client",
  referrerPolicy: "no-referrer-when-downgrade",
  mode: "cors", 
  credentials: "same-origin",
  cache: "default",
  redirect: "follow",
  integrity: "",
  keepalive: false,
  signal: undefined
});
```
`fetch()`请求的底层用的是`request()对象`的接口，参数完全一样，因此上面的API也是`request()`的API。

### cache
`cache`属性指定如何处理缓存。可能的取值如下：
- `default`：默认值，现在缓存里面寻找匹配的请求。
- `no-store`：直接请求远程服务器，并且不更新缓存。
- `reload`：直接请求远程服务器，并且更新缓存。
- `no-cache`：将服务器资源跟本地缓存进行比较，有新的版本才使用服务器资源，否则使用缓存。
- `force-cache`：缓存优先，只有不存在缓存的情况下，才请求远程服务器。
- `only-if-cached`：只检查缓存，如果缓存里面不存在，将返回504错误。

### mode
`mode`属性指定请求的模式。可能的取值如下：
- `cors`：默认值，允许跨域请求。
- `same-origin`：只允许同源请求。
- `no-cors`：请求方法只限于GET、POST和HEAD，并且只能使用有限的几个简单标头，不能添加跨域的复杂标头，相当于提交表单所能发出的请求。

### credentials
`credentials`属性指定是否发送cookie。可能的取值如下：
- `same-origin`：默认值，同源请求时发送cookie，跨域请求时不发送。
- `include`：不管同源请求，还是跨域请求，一律发送cookie。
- `omit`：一律不发送。
跨域请求发送cookie，需要将`credentials`属性设为`include`。
```javascript
fetch('http://another.com', {
  credentials: "include"
});
```

### signal
`signal`属性指定一个`AbortSignal `实例，用于取消fetch()请求，详见下一节。

### keepalive
`keepalive`属性用于页面卸载时，告诉浏览器在后台保持连接，继续发送数据。  
一个典型的场景就是，用户离开网页时，脚本向服务器提交一些用户行为的统计信息。这时，如果不用`keepalive`属性，数据可能就无法发送，因为浏览器已经把页面卸载了。
```javascript
window.onunload = function() {
  fetch('/analytics', {
    method: 'POST',
    body: "statistics",
    keepalive: true
  });
};
```

### redirect
`redirect`属性指定http跳转的处理方法。可能的取值如下：
- `follow`：默认值，`fetch()`跟随http跳转。
- `error`：如果发生跳转，`fetch()`就报错。
- `manual`：`fetch()`不跟随http跳转，但是`response.url`属性会指向新的URL，`response.redirected`属性会变为`true`，由开发者自己决定后续如何处理跳转。

### integrity
`integrity`属性指定一个哈希值，用户检查http回应传回的数据是否等于预先设定的哈希值。  
比如下载文件时，检查文件的SHA-256哈希值是否相符，确保没有被篡改。
```javascript
fetch('http://site.com/file', {
  integrity: 'sha256-abcdef'
});
```

### referrer
`referrer`属性用于设定`fetch()`请求的`referer`标头。
这个属性可以为任意字符串，也可以设为空字符串（即不发送`referer`标头）。
```javascript
fetch('/page', {
  referrer: ''
});
```
### referrerPolicy
`referrerPolicy`属性用于设定`referer`标头的规则。可能的取值如下：
- `no-referrer-when-downgrade`:默认值，总是发送referer标头，除非从https页面请求http资源时不发送
- `no-referrer`：不发送referer标头
- `origin`：referer标头只包含域名，不包含完整的路径。
- `origin-when-cross-origin`：同源请求referer标头包含完整的路径，跨域请求只包含域名
- `same-origin`：跨域请求不发送referer，同源请求发送
- `strict-origin`：referer标头只包含域名，https页面请求http资源时不发送referer标头。
- `strict-origin-when-cross-origin`：同源请求时referer标头包含完整的路径，跨域请求时只包含域名，https页面请求http资源时不发送该标头。
- `unsafe-url`：不管什么情况，总是发送referer标头。

## 取消fetch()请求
`fetch()`请求发送以后，如果中途想要取消，需要使用`AbortController`对象。
```javascript
let controller = new AbortController();
let signal = controller.signal;

fetch(url, {
  signal: controller.signal
});

signal.addEventListener('abort',
  () => console.log('abort!')
);

controller.abort(); // 取消

console.log(signal.aborted); // true
```
上面示例中，首先新建`AbortController`实例，然后发送`fetch()`请求，配置对象的`signal`属性必须指定接收`AbortController`实例发送的信号`controller.signal`。

`controller.abort()`方法用于发出取消信号。这时会触发`abort`事件，这个事件可以监听，也可以通过`controller.signal.aborted`属性判断取消信号是否已经发出。

下面是一个1秒后自动取消请求的例子。

```javascript
let controller = new AbortController();
setTimeout(() => controller.abort(), 1000);

try {
  let response = await fetch('/long-operation', {
    signal: controller.signal
  });
} catch(err) {
  if (err.name == 'AbortError') {
    console.log('Aborted!');
  } else {
    throw err;
  }
}

```


:::note 补充
有关AbortController更多介绍，[查看链接](https://developer.mozilla.org/zh-CN/docs/Web/API/AbortController)
:::