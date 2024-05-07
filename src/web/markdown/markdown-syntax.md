---
title: Markdown 语法
date: 2023-04-05
category:
  - Markdown
order: 2
---

<!-- more -->

## 1 标题语法

要创建标题，在单词或短语前面添加井号（`#`）。`#`的数量代表了标题的级别。

如添加三个`#`表示创建三级标题(`h3`)(例如：`### My Header`)

**可选语法：**  
可以在文本下方添加任意数量的 `==` 号来标识一级标题，或者 `--` 号来标识二级标题。

**注意：**  
不同的Markdown应用程序处理`#`和标题之间的空格方式并不一致。为了兼容考虑，需要用一个空格在`#`和标题之间进行分隔。

## 2 段落语法

要创建段落，需要使用空白行将一行或多行文本进行分隔。

**注意：**  
不要用空格(spaces)或制表符(tabs)缩进段落

## 3 换行语法

在一行的末尾添加两个或多个空格，然后按回车(Enter)键，即可创建一个换行(`<br>`)。

## 4 强调语法

通过将文本设置为粗体或斜体来强调其重要性。

### 4.1 粗体
要加粗文本，请在单词或短语的前后各添加两个星号，如`**strong text**`

### 4.2 斜体
要用斜体显示文本，请在单词或短语前后添加一个星号，如`*Italic text*`

### 4.3 斜体且加粗
要同时用粗体和斜体突出显示文本，请在单词或短语前后各添加三个星号或下划线。要加粗并用斜体显示单词或短语的中间部分，请在要突出显示的部分前后各添加三个星号，中间不要带空格。

## 5 引用语法

要创建引用块，需要在段落前面添加一个`>`符号。
```md
> Dorothy followed her through many of the beautiful rooms in her castle.
```
渲染效果如下：
```md
> Dorothy followed her through many of the beautiful rooms in her castle.
```

### 5.1 多个段落的块引用  
块引用可以包含多个段落。为段落之间的空白行添加一个 ` >` 符号。
```md
> Dorothy followed her through many of the beautiful rooms in her castle.
>
> The Witch bade her clean the pots and kettles and sweep the floor and keep the fire fed with wood.
```
渲染效果如下：
> Dorothy followed her through many of the beautiful rooms in her castle.
>
> The Witch bade her clean the pots and kettles and sweep the floor and keep the fire fed with wood.

### 5.2 嵌套块引用
块引用可以嵌套。在要嵌套的段落前添加一个 `>>` 符号。

```md
> Dorothy followed her through many of the beautiful rooms in her castle.
>
>> The Witch bade her clean the pots and kettles and sweep the floor and keep the fire fed with wood.
```

渲染效果如下：
> Dorothy followed her through many of the beautiful rooms in her castle.
>
>> The Witch bade her clean the pots and kettles and sweep the floor and keep the fire fed with wood.


### 5.3 带有其它元素的块引用
块引用可以包含其他 Markdown 格式的元素。并非所有元素都可以使用，需要进行实验以查看哪些元素有效。如：
```md
> #### The quarterly results look great!
>
> - Revenue was off the chart.
> - Profits were higher than ever.
>
>  *Everything* is going according to **plan**.
```
渲染效果如下：
> #### The quarterly results look great!
>
> - Revenue was off the chart.
> - Profits were higher than ever.
>
>  *Everything* is going according to **plan**.


## 6 列表语法
可以将多个条目组织成有序或无序列表

### 6.1 有序列表
要创建有序列表，需要在每个列表项前添加数字并紧跟一个英文句点。数字不必按数学顺序排列，但是列表应当以数字1开始。比如：
```md
1. First item
2. Second item
3. Third item
4. Fourth item

1. First item
1. Second item
1. Third item
1. Fourth item

1. First item
8. Second item
3. Third item
5. Fourth item

1. First item
2. Second item
3. Third item
    1. Indented item
    2. Indented item
4. Fourth item
```

### 6.2 无序列表
要创建无序列表，需要在每个列表项前面添加破折号(`-`)、星号(`*`)、或加号(`+`)。缩进一个或多个列表项可创建嵌套列表。例如：
```md
- First item
- Second item
- Third item
- Fourth item

* First item
* Second item
* Third item
* Fourth item

+ First item
+ Second item
+ Third item
+ Fourth item

- First item
- Second item
- Third item
    - Indented item
    - Indented item
- Fourth item
```

### 6.3 在列表中嵌套其它元素
要在保留列表连续性的同时在列表中添加另一元素，请将该元素缩进四个空格或一个制表符。如下例所示：
```md
*   This is the first list item.
*   Here's the second list item.

    I need to add another paragraph below the second list item.

*   And here's the third list item.
```


**引用块：**
```md
*   This is the first list item.
*   Here's the second list item.

    > A blockquote would look great below the second list item.

*   And here's the third list item.
```

**代码块：**
代码块通常采用四个空格或一个制表符缩进。当它们被放在列表中时，请将它们缩进八个空格或两个制表符。
```md
1.  Open the file.
2.  Find the following code block on line 21:

        <html>
          <head>
            <title>Test</title>
          </head>

3.  Update the title to match the name of your website.
```

**图片：**
```md
1.  Open the file containing the Linux mascot.
2.  Marvel at its beauty.

    ![Tux, the Linux mascot](/assets/images/tux.png)

3.  Close the file.
```

**列表：**
```md
1. First item
2. Second item
3. Third item
    - Indented item
    - Indented item
4. Fourth item
```

## 7 代码语法

要将单词或短语表示为代码，请将其包裹在反引号(`)中

### 7.1 转义反引号
如果你要表示为代码的单词或短语中包含一个或多个反引号，则可以通过将单词或短语包裹在双引号(`` `code` ``)中

### 7.2 代码块
要创建代码块，请将代码块的每一行缩进至少四个空格或一个制表符，要创建不用缩进的代码块，请使用围栏式代码块

## 8 分割线语法

要创建分隔线，请在单独一行上使用三个或多个破折号(`---`)，并且不能包含其它内容


## 9 链接语法

超链接Markdown语法代码：`[超链接显示名](超链接地址 "超链接title")`  
对应的HTML代码：`<a href="超链接地址" title="超链接title">超链接显示名</a>`

### 9.1 网址和Email地址
使用尖括号可以很方便地把URL或者email地址变成可点击的链接。
```md
<https://markdown.com.cn>
<fake@example.com>
```
### 9.2 带格式化的链接
强调链接，在链接语法前后增加星号。要将链接表示为代码，请在方括号中添加反引号。
```md
I love supporting the **[EFF](https://eff.org)**.
This is the *[Markdown Guide](https://www.markdownguide.org)*.
See the section on [`code`](#code).
```
渲染效果如下：
I love supporting the **[EFF](https://eff.org)**.
This is the *[Markdown Guide](https://www.markdownguide.org)*.
See the section on [`code`](#code).

### 9.3 引用类型链接
引用样式链接是一种特殊的链接，它使URL在Markdown中更易于显示和阅读。参考样式链接分为两部分：与文本保持内联的部分以及存储在文件中其它位置的部分，以使文本易于阅读。

**链接第一部分格式**  
引用类型的链接的第一部分使用两组括号进行格式设置。第一组方括号包围应显示为链接的文本。第二组括号显示了一个标签，该标签用于指向您存储在文档其它位置的链接。

尽管不是必需的，可以在第一组和第二组括号之间包含一个空格。第二组括号中的标签不区分大小写。可以包含字母，数字，空格或标点符号。如下例：
- `[hobbit-hole][1]`
- `[hobbit-hole] [1]`

**链接第二部分格式**  
引用类型链接的第二部分使用以下属性设置格式：

1. 放在括号中的标签，其后紧跟一个冒号和至少一个空格（例如`[label]:`）。
2. 链接的URL，可以选择将其括号在尖括号中。
3. 链接的可选标题，可以将其括在双引号，单引号或括号中。

如下例：
- `[1]: https://en.wikipedia.org/wiki/Hobbit#Lifestyle`
- `[1]: https://en.wikipedia.org/wiki/Hobbit#Lifestyle "Hobbit lifestyles"`
- `[1]: https://en.wikipedia.org/wiki/Hobbit#Lifestyle 'Hobbit lifestyles'`
- `[1]: https://en.wikipedia.org/wiki/Hobbit#Lifestyle (Hobbit lifestyles)`
- `[1]: <https://en.wikipedia.org/wiki/Hobbit#Lifestyle> "Hobbit lifestyles"`
- `[1]: <https://en.wikipedia.org/wiki/Hobbit#Lifestyle> 'Hobbit lifestyles'`
- `[1]: <https://en.wikipedia.org/wiki/Hobbit#Lifestyle> (Hobbit lifestyles)`

## 10 图片语法

要添加图像，需要使用感叹号(`!`)，然后在方括号增加替代文本，图片链接放在圆括号里，括号里的链接后可以增加一个可选的图片标题文本。  

插入图片Markdown语法代码：`![图片alt](图片链接 "图片title")`  
对应的HTML代码：`<img src="图片链接" alt="图片alt" title="图片title">`

如：
```md
![这是图片](/assets/img/philly-magic-garden.jpg "Magic Gardens")
```

**链接图片：**  
给图片增加链接，需要将图像的Markdown括在方括号中，然后将链接添加在圆括号中。
```md
[![沙漠中的岩石图片](/assets/img/shiprock.jpg "Shiprock")](https://markdown.com.cn)
```

## 10.1 转义字符语法

要显示原本用于格式化Markdown文档的字符，需要在字符前面添加反斜杠字符\。
```md
\* Without the backslash, this would be a bullet in an unordered list.
```
渲染效果如下：
\* Without the backslash, this would be a bullet in an unordered list.

### 10.2 可做转义的字符

以下列出的字母都可以通过使用反斜杠字符从而达到转义目的。

| Character | Name                                         |
| :-------- | :------------------------------------------- |
| \         | backslash                                    |
| `         | backtick(see also scaping backticks in code) |
| *         | asterisk                                     |
| _         | underscore                                   |
| {}        | curly braces                                 |
| []        | brackets                                     |
| ()        | parentheses                                  |
| #         | pound sign                                   |
| +         | plus sign                                    |
| -         | minus sign(hyphen)                           |
| .         | dot                                          |
| !         | exclamation mark                             |
| \|        | pipe(see also escaping pipe in tables)       |


### 10.3 特殊字符自动转义

在HTML文件中，有两个字符需要特殊处理：`<`和`&`。`<`符号用于起始标签，`&`符号用于标记HTML实体。如果只是想用这些符号，你必须使用实体的形式，像`&lt;`和`&amp;`

比如：
- `http://images.google.com/images?num=30&q=larry+bird` -> `http://images.google.com/images?num=30&amp;q=larry+bird`
- `AT&T` -> `AT&amp;T`
- `©` -> `&copy;`
- `4 < 5` -> `4 &lt; 5`


## 11 Markdown内嵌HTML标签

对于 Markdown 涵盖范围之外的标签，都可以直接在文件里面用 HTML 本身。如需使用 HTML，不需要额外标注这是 HTML 或是 Markdown，只需 HTML 标签添加到 Markdown 文本中即可。




## 12 Markdown扩展语法

### 12.1 标题编号

所谓标题编号意思就是给这个标题设置一个ID：

```md
### My Great Heading {#custom-id}
```
以上写法实际渲染成下面的：
```html
<h3 id="custom-id">My Great Heading</h3>
```

此时可以通过a标签链接到标题ID：
```html
<a href="#heading-ids">Heading IDs</a>	
<!-- 或以下写法，意思是链接到某网页下的什么位置 -->
<a href="https://markdown.com.cn/extended-syntax/heading-ids.html#headid">Heading IDs</a>	
```

### 12.2 定义列表

简单来说允许你通过缩进来区分一些是主项还是子项，如下：

```md
First Term
: This is the definition of the first term.

Second Term
: This is one definition of the second term.
: This is another definition of the second term.
```

以上语法在html中会渲染为：
```html
<dl>
  <dt>First Term</dt>
  <dd>This is the definition of the first term.</dd>
  <dt>Second Term</dt>
  <dd>This is one definition of the second term. </dd>
  <dd>This is another definition of the second term.</dd>
</dl>
```

实现渲染呈现结果为：
<dl>
  <dt>First Term</dt>
  <dd>This is the definition of the first term.</dd>
  <dt>Second Term</dt>
  <dd>This is one definition of the second term. </dd>
  <dd>This is another definition of the second term.</dd>
</dl>


### 12.3 删除线

```md
~~世界是平坦的。~~ 我们现在知道世界是圆的。
```
实际渲染为：
~~世界是平坦的。~~ 我们现在知道世界是圆的。


### 12.4 任务列表语法

```md
- [x] Write the press release
- [ ] Update the website
- [ ] Contact the media
```
以上渲染为：
- [x] Write the press release
- [ ] Update the website
- [ ] Contact the media

### 12.5 使用Emoji表情

在Markdown中，有两种方法可以将表情符号添加到md文件中，一种是直接复制并粘贴到Markdown格式的文本中，或者输入emoji shortcodes。

**复制和粘贴表情符号：**<https://emojipedia.org/>

许多Markdown应用程序会自动以Markdown格式的文本显示表情符号。从Markdown应用程序导出的HTML和PDF文件应显示表情符号。

Tip: 如果您使用的是静态网站生成器，请确保将HTML页面编码为UTF-8。

**使用表情符号简码：**<https://github.com/markdown/markdown.github.com/wiki/Implementations>

一些Markdown应用程序允许您通过键入表情符号短代码来插入表情符号。这些以冒号开头和结尾，并包含表情符号的名称，如：
```md
去露营了！ :tent: 很快回来。

真好笑！ :joy:
```

但是推荐使用直接复制和粘贴表情符号，表情符号简码会在部分Markdown应用程序中支持。

