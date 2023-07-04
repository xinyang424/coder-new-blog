---
title: VSCode 常用快捷键
date: 2023-06-28
category:
  - 实用技巧
---

<!-- more -->

- **合并多行**：`Ctrl + J`
- **代码格式化**：`Shift + Option +F`(Mac)、`Shift + Alt + F`
- **代码折叠**：`Ctrl + Shift + [`
- **复制上下行**：`Shift + Alt 上/下箭头`
- **打开或关闭侧边栏**：`Ctrl + B`
- **导航到特定行**：`Ctrl + G`然后输入行数。
- **转到文件中的符号**：`Ctrl + Shift + O`
- **转到工作区的符号**：`Ctrl + T`
- **删除上一个词**：`Ctrl + Backspace`
- **删除一行**：`Ctrl + X`
- **上方或下方添加光标**：`Ctrl + Alt + 上/箭头`
- **列框选择**：`Shift + Alt + 鼠标选中`
- **命令面板**：`Ctrl + P`

[更多快捷键](https://code.visualstudio.com/shortcuts/keyboard-shortcuts-windows.pdf)


禁止修改某一文件：打开settings，搜索`readonly`，在`Readonly include`中添加文件`node_modules/**`，此时修改`node_modules`里的文件就没法修改了。

在编辑区跳到工作区，可以按下键盘的`Ctrl + 0`，此时焦点就会在工作区，注意0不是数字区键盘上的0，此时可以通过上下箭头选择文件，还可以通过空格展开文件。


同时选中多行同一位置：按住`Ctrl + Alt + 上下箭头`

`Ctrl + Shift Home`全部选中，按住`[`添加为数组。