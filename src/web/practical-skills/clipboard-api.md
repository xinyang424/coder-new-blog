---
title: 剪贴板操作 Clipboard API
date: 2022-03-01
category:
  - 实用技巧
tag:
  - 剪贴板操作
  - Clipboard API
  - JS访问剪贴板
---



## 简介
浏览器允许JS读写剪贴板，自动复制或粘贴内容。用处就是“一键复制”啦。 
目前，一共有三种方法可以实现剪贴板操作：
- `Document.execCommand()`方法
- 异步的`Clipboard API`
- copy是事件和paste事件

本文将介绍这三种方法。

## Document.execCommand()方法
当一个HTML文档切换到设计模式时，`document`暴露`execCommand`方法，该方法允许允许命令来操纵可编辑内容区域的元素。
:::normal-demo 示例代码
```html
<div contenteditable="true">双击我可以开始编辑！！！</div>
```
:::

:::warning 注意
根据MDN对[execCommand](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/execCommand)的描述，已不再推荐使用该特性，虽然一些浏览器仍然可以支持它，但也许已从相关的web标准中移除，也许正准备移除或处于兼容性而保留。尽量不要使用该特性，并更新现有的代码。该特性随时可能无法正常工作。故本篇文章不对此方法做过多介绍。
:::



## Clipboard API
Clipboard API是下一代的剪贴板操作方法，比传统的`document.execCommand()`方法更强大、更合理。  
它的所有操作都是异步的，返回Promise对象，不会造成页面卡顿。而且，它可以将任意内容（比如图片）放入剪贴板。  
`navigator.clipboard`属性返回 Clipboard 对象，所有操作都通过这个对象进行。
```js
const clipboardObj = navigator.clipboard;
```

若`navigator.clipboard`属性返回`undefined`，就说明当前浏览器不支持这个API。    
由于用户可能把敏感数据（比如密码）放在剪贴板，允许脚本任意读取会产生安全风险，因此这个API的安全限制也比较多。  
首先，chrome浏览器规定，只有HTTPS协议的页面才能使用这个API。不过，开发环境（`localhost`）允许使用非加密协议。  
其次，调用时需要明确获得用户的许可。权限的具体实现使用了Permissions API，跟剪贴板相关的有两个权限：`clipboard-write`（写权限）和`clipboard-read`（读权限）。“写权限”自动授予脚本，而“读权限”必须用户明确同意给予。也就是说，写入剪贴板，脚本可以自动完成。但是读取剪贴板时，浏览器会弹出对话框，询问用户是否同意读取。

### Clipboard 对象
Clipboard对象提供了四个方法，用来读取剪贴板。他们都是异步方法，返回promise对象。

#### Clipboard.readText()
`Clipboard.readText()`方法用于复制剪贴板里面的文本数据。

:::normal-demo 使用示例
```css
#clipboardContent {
  width: 300px;
  height: 200px;
  border: 2px solid #333;
}
```
```html
<button onclick="getClipboardContent()">点击获取剪贴板中内容</button>
<div id="clipboardContent"></div>
```

```js
const clipboardContent = document.querySelector("#clipboardContent");
const getClipboardContent = () => {
  // navigator.permissions.query({ name: "clipboard-read" })promise返回result，可用于判断是否授权获取剪贴板内容权限
  navigator.permissions.query({ name: "clipboard-read" }).then(async result => {
    if (result.state == "granted" || result.state == "prompt") {
      const text = await navigator.clipboard.readText();
      if (text.length) {
        clipboardContent.innerText = "剪贴板内容为：\n" + text;
      } else {
        clipboardContent.innerText = "剪贴板内无内容";
      }
    } else {
      clipboardContent.innerText = "未授权获取剪贴板权限，请在弹框中选择允许再点击获取剪贴板内容按钮。";
    }
  });
};
```

:::

上面示例中，用户点击页面后，就会输出剪贴板里面的文本。注意，浏览器这时会跳出一个对话框，询问用户是否同意脚本读取剪贴板。

如果用户不同意，脚本就会报错。这时，可以使用try...catch结构，处理报错，或像上述代码查看是否有权限。
```js
async function getClipboardContents() {
  try {
    const text = await navigator.clipboard.readText();
    console.log('Pasted content: ', text);
  } catch (err) {
    console.error('Failed to read clipboard contents: ', err);
  }
}
```

#### Clipboard.read()
`Clipboard.read()`方法用于复制剪贴板里面的数据，可以是==文本数据==，也可以是==二进制数据（比如图片）==。该方法需要用户明确给予许可。

该方法返回一个 Promise 对象。一旦该对象的状态变为 resolved，就可以获得一个数组，每个数组成员都是 ClipboardItem 对象的实例。

```js
async function getClipboardContents() {
  try {
    const clipboardItems = await navigator.clipboard.read();//只能是文本数据或者是二进制数据，直接复制文件夹或图片就会报错
    for (const clipboardItem of clipboardItems) {
      for (const type of clipboardItem.types) {
        const blob = await clipboardItem.getType(type);
        console.log(URL.createObjectURL(blob));
      }
    }
  } catch (err) {
    console.error(err.name, err.message);
  }
}
```
`ClipboardItem` 对象表示一个单独的剪贴项，每个剪贴项都拥有`ClipboardItem.types`属性和`ClipboardItem.getType()`方法。

`ClipboardItem.types`属性返回一个数组，里面的成员是该剪贴项可用的 MIME 类型，比如某个剪贴项可以用 HTML 格式粘贴，也可以用纯文本格式粘贴，那么它就有两个 MIME 类型（`text/html`和`text/plain`）。

`ClipboardItem.getType(type)`方法用于读取剪贴项的数据，返回一个 Promise 对象。该方法接受剪贴项的 MIME 类型作为参数，返回该类型的数据，该参数是必需的，否则会报错。


#### Clipboard.writeText()
`Clipboard.writeText()`方法用于将文本内容写入剪贴板。

:::normal-demo 使用示例
```css
#clipboardContent {
  width: 300px;
  height: 200px;
  border: 1px solid pink;
}
```

```html
<div id="clipboardContent" contenteditable="true">我是一段很多很多的文字。</div>
<button onclick="getClipboardContents()">一键复制</button>
```
```js
const div = document.querySelector("#clipboardContent");
const getClipboardContents = async () => {
  try {
    await navigator.clipboard.writeText(div.outerText);
    alert("复制成功！你还可以修改内容中的问题再点击一键复制按钮");
  } catch (err) {
    console.error(err.name, err.message);
  }
};
```
:::


上面示例是用户在点击一键复制按钮后，框框里的文字就会在剪贴板里，同时用户可以双击框框里的文字修改，再点击一键复制按钮查看剪贴板内的内容是否修改。


#### Clipboard.write()
`Clipboard.write()`方法用于将任意数据写入剪贴板，可以是文本数据，也可以是二进制数据。

该方法接受一个 ClipboardItem 实例作为参数，表示写入剪贴板的数据。

:::warning 注意
注意，Chrome 浏览器目前只支持写入 PNG 格式的图片。
:::

:::normal-demo 使用示例
```html
<button onclick="getClipboardContents()">一键获取图片</button>
```

```js
const getClipboardContents = async () => {
  try {
    const imgURL = "https://dummyimage.com/300.png";
    const data = await fetch(imgURL);
    const blob = await data.blob();
    await navigator.clipboard.write([
      new ClipboardItem({
        [blob.type]: blob,
      }),
    ]);
    alert("复制成功，window下你可以按win + v查看剪贴板历史，但如果是第一次按win+v，相当于开启剪贴板历史，需要再点击一次");
  } catch (err) {
    alert(err.name, err.message);
  }
};
```
:::


上面示例中，脚本向剪贴板写入了一张图片。

`ClipboardItem()`是浏览器原生提供的构造函数，用来生成`ClipboardItem`实例，它接受一个对象作为参数，该对象的键名是数据的 MIME 类型，键值就是数据本身。

下面的例子是将同一个剪贴项的多种格式的值，写入剪贴板，一种是文本数据，另一种是二进制数据，供不同的场合粘贴使用。
```js
function copy() {
  const image = await fetch('https://dummyimage.com/300.png');
  const text = new Blob(['Cute sleeping kitten'], {type: 'text/plain'});
  const item = new ClipboardItem({
    'text/plain': text,
    'image/png': image
  });
  await navigator.clipboard.write([item]);
}
```

## copy事件，cut事件
用户向剪贴板放入数据时，将触发`copy`事件。

示例代码：
```js
const source = document.querySelector('.source');

source.addEventListener('copy', (event) => {
  const selection = document.getSelection();
  event.clipboardData.setData('text/plain', selection.toString().toUpperCase());
  event.preventDefault();
});
```
上面示例中，事件对象的`clipboardData`属性包含了剪贴板数据。它是一个对象，有以下属性和方法：
- Event.clipboardData.setData(type, data)：修改剪贴板数据，需要指定数据类型。
- Event.clipboardData.getData(type)：获取剪贴板数据，需要指定数据类型。
- Event.clipboardData.clearData([type])：清除剪贴板数据，可以指定数据类型。如果不指定类型，将清除所有类型的数据。
- Event.clipboardData.items：一个类似数组的对象，包含了所有剪贴项，不过通常只有一个剪贴项。

下面的示例是拦截用户的复制操作，将指定内容放入剪贴板：
```js
const clipboardItems = [];

document.addEventListener('copy', async (e) => {
  e.preventDefault();
  try {
    let clipboardItems = [];
    for (const item of e.clipboardData.items) {
      if (!item.type.startsWith('image/')) {
        continue;
      }
      clipboardItems.push(
        new ClipboardItem({
          [item.type]: item,
        })
      );
      await navigator.clipboard.write(clipboardItems);
      console.log('Image copied.');
    }
  } catch (err) {
    console.error(err.name, err.message);
  }
});
```
上面示例中，先使用`e.preventDefault()`取消了剪贴板的默认操作，然后由脚本接管复制操作。

cut事件则是在用户进行剪切操作时触发，它的处理跟`copy`事件完全一样，也是从`Event.clipboardData`属性拿到剪切的数据。

## paste事件
用户使用剪贴板数据，进行粘贴操作时，会触发`paste`事件。
下面的示例是拦截粘贴操作，由脚本将剪贴板里面的数据取出来。
```js
document.addEventListener('paste', async (e) => {
  e.preventDefault();
  const text = await navigator.clipboard.readText();
  alert('Pasted text: ', text);
});
```



