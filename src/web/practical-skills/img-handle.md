---
title: 图片处理
date: 2022-03-01
category:
  - 实用技巧
---

## 图片压缩

```javascript
function compressImage(image, quality) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  let compressedImage;

  // If image is a file object, convert to base64 string
  if (image instanceof File) {
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = function () {
      const img = new Image();
      img.src = reader.result;
      img.onload = function () {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        compressedImage = canvas.toDataURL('image/jpeg', quality);
      };
    };
  } else {
    const img = new Image();
    img.src = image;
    img.onload = function () {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      compressedImage = canvas.toDataURL('image/jpeg', quality);
    };
  }

  return compressedImage;
}
```