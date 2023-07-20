---
title: Chrome DevTools
date: 2023-07-17
category:
  - 实用技巧
---

Chrome DevTools是一个非常强大的开发者工具，可以让我们更轻松的去调试和优化我们的网站。

<!-- more -->

## 打开Chrome DevTools

这里仅介绍快捷键的方式：  
| OS               | Elements         | Console          | Your last panel           |
| :--------------- | :--------------- | :--------------- | :------------------------ |
| Windows or Linux | Ctrl + Shift + C | Ctrl + Shift + J | F12/Ctrl + Shift +I       |
| Mac              | Cmd + Option + C | Cmd + Option + J | Fn + F12/Cmd + Option + I |

## 面板介绍

### Elements

#### 查看 DOM

**检查元素：** 可以通过鼠标光标直接选择。


**键盘操作：**通过方向键上下左右进行选择：上下选择元素、右键展开元素、左键折叠元素。

**滚动到视图：**选择对应的元素后右击选择“Scroll into view”。

**显示标尺：**Settings > Perferences > Elements > Show rulers on hover 或 `Contrl + Shift + P`输入`rulers`。

**搜索：**支持这三种搜索模式：DOM Tree by string、CSS selector、XPath selector。打开控制台，直接`Ctrl + F`就可以聚焦到搜索框。

**编辑DOM：**
- 可以对DOM中的内容进行编辑——修改内容。
- 可以对元素进行添加class或id等。
- 选择元素后修改节点类型。
- 右键元素选择“Edit as HTML。
- 拖动元素可进行重排元素顺序。
- 强制元素状态：右键元素鼠标悬停到“Force state”，在展开中有显示状态类型，如active、hover、focus、visited等。
- 隐藏元素：选中要隐藏的元素，按下`H`键就会隐藏，再按下`H`键就会显示。或则右键元素选择`hidden`也是可以的。
- 删除元素：选中要删除的元素，右键选择`Delete element`，删除后可以通过`Ctrl + Z`撤销刚才的操作。




**Console 访问 DOM**：
- `$0`：选中元素后，在`Console`面板输入`$0`就返回返回选中的元素，无需`document.querySelector`这种方式获取。
- 全局变量：选中元素后，右键选择`Store as global variable`，此时`Console`面板就会打印出`temp1`。
- JS Path：选中元素后，右键将鼠标悬停到`Copy`，在展开项中选择`Copy JS Path`。它会把元素的路径加到剪贴板里面，其实就是一个`document.querySelector("xxx")`的指令，直接回车执行即可。


**DOM断点：**选中元素后，右键将鼠标悬停到`Break on`，在展开的面板中选择断点类型：子树修改触发的断点、属性的修改触发断点、节点的移除触发断点。

**DOM 属性：**选中元素后，在Elements中找到`Properties`面板（在Computed面板附近），就可以看到该元素上所挂载的属性。支持搜索，同时还有一个`Show all`，勾选上就会把null的属性也显示出来，不勾选只展示有值的属性。


**徽章设置：**选中元素后，右键选择`Badge settings...`，此时顶部就会显示如`grid`、`flex`、`ad`等勾选项。这个作用相当于如果某个容器采用了flex布局，该元素对应地方有个`flex`的标记徽章，点击这个`flex`标记徽章，就可以在`Layout`面板找到更多属性。至于徽章设置则是选择是否显示这些徽章，但不会影响原有布局方式，只是不能明确看到它是采用了flex布局的。




#### Elements面板中的CSS

**查看和编辑CSS：**
- 查看元素样式：选中元素后，在`Styles`面板里可以看到元素的样式有哪些。
- 给元素添加class：选中元素后，在`Styles`面板里，点击`.cls`可以新增一个class，，同时下面的勾选项的意思是，是否保留原样式。
- 给元素添加样式：选中元素后，在`Styles`面板里，在`element.style`里添加的样式里，会通过内联方式添加到元素标签内。通常如果这样添加样式要注意权重问题。
- 给元素应用伪状态：选中元素后，可以右键将鼠标悬停到`Force state`，在展开的选项里选择状态，或者在`Styles`面板里，点击`:hov`，然后勾选需要强制的状态。如hover、active等。
- 改变元素尺寸/单位：可选单位有：px、cm、mm、in、pc、pt、ch、em、rem、vh、vw、vmax、vmin



**复制CSS**：选中元素后，在`Styles`面板里可以看到元素对应的类名有哪些，右键选择`Copy rule`。或者选中单独的某一属性，右键选择其它的。

---

**理解Style面板的属性状态：**  
Invalid(无效)/Overridden(复写)/Inactive(不可交互)/Inherited and non-inherited(继承跟非继承) / Shorthand(简写样式) / Non-editable(不可编辑的)：
- 无效属性会显示黄帝白色的感叹号。
- 重写会出现删除线。
- 如果是浅色（透明度降低的形式）且后面带有一个圆圈的感叹号，代表这个属性是不可使用的。
- 继承的属性会显示在`Inherrited from xxx`。
- 不可编辑的样式同时是用户代理样式表`User agent stylesheet`，但是可以通过复写的方式，将原有属性替换掉。

**计算窗口面板：**悬停属性上会有一个箭头，点击会跳转到最终属性生效的地方。灰色（透明度降低）的属性是计算出来的，不可点击箭头进行跳转最终属性生效的地方，因为它是通过样式计算出来的，如一个容器的高度由内容撑开的，除非给了定高。

**搜索：**样式搜索可以在计算窗口面板里搜索出来的。

**未使用状态：**在控制板点击三个点 > More tools > Coverage > 点击那个刷新按钮就可以进行状态分析了

---

**拾色器/角度/阴影/动画**

如果类样式里有颜色，旁边会显示色块的，点击这个色块，就会出现拾色器。

**查看Grid布局**

Grid编辑器

Grid查看选项

多个Grid

**查看Flex布局**

**查看@container布局**


### Console

### Sources

### Network

### Performance

### Memory

### Application

### Recorder

### Rendering

## 快捷键

## 适用场景

## 调试技巧

