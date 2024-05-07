---
title: 自封装的hook
date: 2024-02-25
category:
  - 移动开发
---


### 根据path对文件进行签名
:::details 查看代码
```ts
import SparkMD5 from "spark-md5";
export const md5File = (
  path: string,
): Promise<{
  md5: string;
  size: number;
}> => {
  return new Promise((resolve, reject) => {
    plus.io.requestFileSystem(
      plus.io.PRIVATE_WWW,
      (fs: PlusIoFileSystem) => {
        fs.root?.getFile(
          path,
          { create: false },
          (fileEntry: PlusIoFileEntry) => {
            fileEntry.file(
              (file: PlusIoFile) => {
                const fileReader: PlusIoFileReader = new plus.io.FileReader();
                fileReader.onloadend = (evt: PlusIoFileEvent) => {
                  resolve({
                    // @ts-ignore
                    md5: calculateBase64Hash(evt.target?.result),
                    size: file.size || 0,
                  });
                };
                fileReader.readAsDataURL(file, "utf-8");
              },
              fileError => {
                reject("获取文件对象失败：" + fileError);
              },
            );
          },
          fileEntryError => {
            reject("读取文件失败：" + fileEntryError);
          },
        );
      },
      fsError => {
        reject("读取文件失败：" + fsError);
      },
    );
  });
};

/**
 * 根据文件的base64生成md5
 *
 * @param base64 文件的base64
 * @returns 文件的md5码
 */
const calculateBase64Hash = (base64: string): string => {
  const spark = new SparkMD5();
  spark.appendBinary(base64);
  return spark.end();
};
```
:::

### 根据path判断文件是否存在
:::details 查看代码
```ts
/**
 * 根据文件路径异步判断该路径下的文件是否存在
 *
 * @param path 文件路径
 * @returns 返回true代表该文件存在，返回false代表该文件不存在
 */
export const checkFileExists = (path: string): Promise<boolean> => {
  return new Promise(resolve => {
    if (path) {
      // #ifdef APP-PLUS
      plus.io.requestFileSystem(
        plus.io.PRIVATE_DOC,
        (fs: PlusIoFileSystem) => {
          fs.root?.getFile(
            path,
            { create: false },
            () => {
              resolve(true);
            },
            error => {
              resolve(false);
            },
          );
        },
        () => {
          resolve(false);
        },
      );
      // #endif
      // #ifdef H5
      resolve(false);
      // #endif
    } else {
      resolve(false);
    }
  });
};
```
:::

### 获取手机缓存文件总共多大
:::details 查看代码
```ts
/**
 * 异步获取手机缓存有多大
 *
 */
export const calculateDeviceCacheSize = (): Promise<PromiseResolveValue> => {
  return new Promise(resolve => {
    // #ifdef APP-PLUS
    let isGetSuccess: boolean = false;
    plus.io.requestFileSystem(
      plus.io.PRIVATE_DOC,
      (fs: PlusIoFileSystem) => {
        /**
         * 允许最大时间查询文件大小，避免一些情况下卡住无法返回文件的大小
         */
        let timer: NodeJS.Timeout = setTimeout(() => {
          !isGetSuccess &&
            resolve({
              flag: 1,
              data: formatBytes(0),
            });
          clearTimeout(timer);
        }, 2000);
        fs.root?.getMetadata(
          (directoryEntry: PlusIoMetadata) => {
            isGetSuccess = true;
            resolve({
              flag: 1,
              data: formatBytes(Number(directoryEntry.size)),
            });
            clearTimeout(timer);
          },
          getError => {
            resolve({
              flag: 0,
              errMsg: getError,
            });
          },
          true,
        );
      },
      error => {
        resolve({
          flag: 0,
          errMsg: error,
        });
      },
    );
    // #endif
    // #ifdef H5
    resolve({
      flag: 0,
      errMsg: "仅支持在APP上获取缓存文件大小",
    });
    // #endif
  });
};
```
:::
### 清除手机缓存文件
:::details 查看代码
```ts
/**
 * 异步清除设备缓存文件
 */
export const clearDeviceCache = (): Promise<PromiseResolveValue> => {
  return new Promise<PromiseResolveValue>(resolve => {
    // #ifdef APP-PLUS
    uni.showLoading({
      title: "清除设备缓存中",
    });
    plus.io.requestFileSystem(
      plus.io.PRIVATE_DOC,
      (fs: PlusIoFileSystem) => {
        fs.root?.removeRecursively(
          () => {
            uni.hideLoading();
            resolve({
              flag: 1,
              errMsg: "",
            });
          },
          failRes => {
            uni.hideLoading();
            resolve({
              flag: 0,
              errMsg: failRes.message,
            });
          },
        );
      },
      error => {
        uni.hideLoading();
        resolve({
          flag: 0,
          errMsg: error.message,
        });
      },
    );
    // #endif
    // #ifdef H5
    resolve({
      flag: 0,
      errMsg: "仅在APP下支持清除缓存功能",
    });

    // #endif
  });
};
```
:::
### 根据bytes转换单位
:::details 查看代码
```ts
/**
 * 将字节大小格式化如：1KB、1MB、1GB等
 *
 * @param bytes 字节大小
 * @returns 转换单位类似为：1KB、1MB、1GB等
 */
export const formatBytes = (bytes: number): string => {
  if (bytes === 0) return "0 MB";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};
```
:::


### 下载安装包
:::details 查看代码
```ts
export const downloadAPK = (url: string, errorCallback: (...args: any) => void) => {
  if (plus.os.name?.toLocaleLowerCase() == "ios") {
    plus.runtime.openURL(url);
  } else {
    const waitingToast: PlusNativeUIWaitingObj = plus.nativeUI.showWaiting("正在初始化下载...");
    let downloadTask: PlusDownloaderDownload = plus.downloader.createDownload(
      url + useJsonToUrl({ version: userInfoStore.userConf.latestAppVersion, appId: defaultConfig.appid }),
      {
        method: "GET",
        timeout: 3,
        retryInterval: 1,
        retry: 2,
      },
      (download: PlusDownloaderDownload, status: number) => {
        plus.downloader.clear();
        waitingToast.setTitle("下载完成，等待安装...");
        if (status == 200) {
          download.filename &&
            plus.runtime.install(
              plus.io.convertLocalFileSystemURL(download.filename),
              {
                force: true,
              },
              () => {
                plus.nativeUI.closeWaiting();
              },
              installErrorMsg => {
                plus.nativeUI.closeWaiting();
                errorCallback("安装错误：" + installErrorMsg);
              },
            );
        } else {
          plus.nativeUI.closeWaiting();
          errorCallback("下载最新APP版本失败，请稍后重试或联系APP开发者");
        }
      },
    );

    try {
      downloadTask.setRequestHeader("Authorization", userInfoStore.token.authorization);
      downloadTask.start();
      downloadTask.addEventListener("statechanged", (task: PlusDownloaderDownload) => {
        switch (task.state) {
          case 1:
            waitingToast.setTitle("正在连接服务器...");
            break;
          case 2:
            waitingToast.setTitle("服务器连接成功，开始下载...");
            break;
          case 3:
            if (task.downloadedSize && task.totalSize) {
              const percent = parseInt(((parseFloat(task.downloadedSize.toString()) / parseFloat(task.totalSize.toString())) * 100).toString());
              waitingToast.setTitle("正在下载(" + percent + "%)...");
            }
            break;
          case 4:
            break;
        }
      });
    } catch (err) {
      plus.nativeUI.closeWaiting();
      errorCallback("下载失败，请稍后重试");
    }
  }
};
```
:::




