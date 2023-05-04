---
title: 现代格式图像
date: 2023-03-15
category:
  - 实用技巧
---

<!-- more -->

## 为什么推荐使用AVIF或WebP格式的图像

与旧的 JPEG 和 PNG 对应格式相比，AVIF 和 WebP 是具有卓越压缩和质量特征的图像格式。以这些格式而不是 JPEG 或 PNG 对图像进行编码意味着它们加载速度更快并且消耗的数据流量更少。

AVIF 在 Chrome、Firefox 和 Opera 中受支持，与具有相同质量设置的其他格式相比，文件大小更小。有关 AVIF 的更多信息，请参阅服务 [AVIF 图像代码实验室](https://codelabs.developers.google.com/codelabs/avif#0)。  

WebP 受最新版本的 Chrome、Firefox、Safari、Edge 和 Opera 支持，并为网络上的图像提供更好的有损和无损压缩。有关 WebP 的更多信息，请参阅 [Web 的新图像格式](https://developers.google.com/speed/webp?hl=zh-cn)。

## webp

### 什么是webp

webp是一种新型的图片格式，可以为网站上的图片提供卓越的无损和有损压缩，使用webp，网站站长和web开发者可以制作更小、更丰富的图片，从而提升网页加载速度，

WebP 无损图片的大小比 PNG 图片小 26% 。WebP 有损图片比采用等效 SSIM 质量索引的同类 JPEG 图片缩小 25-34% 。

无损 WebP 支持透明度（也称为 Alpha 通道），费用仅为 22% 的额外字节。在可以接受有损 RGB 压缩的情况下，有损 WebP 也支持透明度，其提供的文件大小通常比 PNG 小 3 倍。

动画 WebP 图片均支持有损、无损和透明度，与 GIF 和 APNG 相比，这种格式可以减小文件大小。

### webp工作原理
有损 WebP 压缩使用预测性编码对图片进行编码，这与 VP8 视频编解码器用来压缩视频中的关键帧的方法相同。预测性编码使用相邻像素块中的值来预测块中的值，然后仅对差异进行编码。

无损 WebP 压缩使用已看到的图像片段来精确重构新像素。如果找不到有趣的匹配项，它还可以使用本地调色板。

### webp支持
Google Chrome、Safari、Firefox、Edge、Opera 浏览器以及许多其他工具和软件库本身就支持 WebP。开发者还添加了对各种图片编辑工具的支持。

WebP 包含轻量级编码和解码库 libwebp、用于将图片转换为 WebP 格式或从 WebP 格式转换图片的命令行工具 cwebp 和 dwebp，以及用于查看、多路复用和对 WebP 图片添加动画效果的工具。完整源代码可在下载页面上获取。

[更多注意事项查看](https://developers.google.com/speed/webp/faq?hl=zh-cn#how_can_i_detect_browser_support_for_webp)




## AVIF

### 什么是AVIF
图片平均占加载网页所需字节的 60% 以上。使用 AVIF，您可以缩小图像并加快网站加载速度。

AVIF 是从 AV1 视频比特流衍生出来的一种新的图像格式。 AVIF 专为提高压缩效率而构建。

### AVIF优点

AVIF 图像比具有相同或更好质量的 JPEG、PNG、GIF 或 WebP 图像小得多。

[参考文档](https://codelabs.developers.google.com/codelabs/avif#0)



