---
title: Centos安装nginx
date: 2022-12-15
category:
  - 运维
---

<!-- more -->

## 安装编译Nginx依赖

**1、安装gcc**

安装Nginx需要先将官网下载的源码进行编译，编译依赖gcc环境，如果没有gcc环境，则需要安装：

`yum install gcc-c++`

不然可能就会报错：`Invalid C++ compiler or C++ compiler flags.`

**2、PCRE pcre-devel安装**

PCRE是一个（Perl Compatible Regular Expressions）是一个Perl库，包括perl兼容的正则表达式。nginx的http模块使用pcre来解析正则表达式，所以需要在linux上安装pcre库，pcre-devel是使用pcre开发的一个二次开发库。nginx也需要此库。命令：

`yum install -y pcre pcre-devel`

不然可能报错：`the HTTP rewrite module requires the PCRE library.`

**3、zlib安装**

zlib库提供了很多种压缩喝解压缩的方式，nginx使用zlib对http包的内容进行gzip，所以需要在Centos上安装zlib库。

`yum install -y zlib zlib-devel`

不然可能报错：`the HTTP gzip module requires the zlib library.`

**4、OpenSSL安装**

OpenSSL是一个强大的安全套接字层密码库，囊括主要的密码算法、常用的密钥和证书封装管理功能及SSL协议，并提供丰富的应用程序供测试或其它目的使用。

nginx不仅支持http协议，还支持https（即在ssl协议上传输http），所以需要在Centos安装OpenSSL库。

`yum install -y openssl openssl-devel`



## 下载安装运行Nginx
**1、下载Nginx**

`wget https://nginx.org/download/nginx-1.19.9.tar.gz `

**2、解压Nginx**

`tar -zxvf nginx-1.19.9.tar.gz`

**3、执行configure文件**

`cd nginx-1.19.9 && ./configure `



**4、make命令编译**
执行完后会有一个MakeFile文件

make是一个命令工具，它解释MakeFile中的指令（应该说是规则）。在Makefile文件中描述了整个工程所有文件的编译顺序、编译规则。

`make`

`make install`

**5、查询Nginx安装目录**

`whereis nginx`

**6、执行Nginx**

根据以上方法进入Nginx安装路径，参考路径：`/usr/local/nginx`

进入sbin文件：`cd sbin`

执行Nginx：`./nginx`

**7、关于Nginx更多命令在Centos下的命令**

- 关于命令输入
如果你是在`/usr/local/nginx`目录下，启动Nginx的命令为：`./sbin/nginx`

但是如果是在`/usr/local/nginx/sbin`目录下，启动Nginx的命令为：`./nginx`

由此可见，有没有`sbin`取决于你在哪一级的目录

- 查看Nginx是否运行成功
`ps -ef | grep nginx`

- 维护命令
`cd /usr/local/nginx`——进入安装路径

`./sbin/nginx`——启动命令

`./sbin/nginx -s reload`——重载

`./sbin/nginx -s stop`——关闭

`./sbin/nginx -s quit`——优雅关闭（当请求被处理完成之后才关闭）

**8、配置Nginx环境变量**

`export PATH=$PATH:/usr/local/nginx/sbin`

**9、多个环境变量**

`export PATH=$PATH:/node-v14.19.1-linux-x64/bin:/usr/local/nginx/sbin`

修改完环境变量记得运行`source profile`重新加载环境变量配置文件。

此时`nginx -v`即可打印出nginx的版本号

## yum404解决方案
该情况可能出现在Centos7，而Centos 8应该是不会出现的，如果出现了可以安装下面的方式试试：
```c
// 进入配置文件夹
cd /etc/yum.repos.d/
// 删除旧的配置文件
rm *.repo
// 输入“y”回车确认
```

使用ls命令确保该目录下的.repo文件已完全删除

下载可以用的.repo文件

`wget -O /etc/yum.repos.d/CentOS-Base.repo https://mirrors.aliyun.com/repo/Centos-vault-8.5.2111.repo`

如果你没有安装wget，也可以用下面的命令：

`curl -o /etc/yum.repos.d/CentOS-Base.repo https://mirrors.aliyun.com/repo/Centos-vault-8.5.2111.repo`

运行yum makecache生成缓存

`yum makecache`



## Centos 8配置https

1、查看http模块是否安装：`nginx -V`，若`configure arguments:`右边为空则证明没有安装

2、安装http_ssl模块，需要找到源码文件，注意不是安装目录，源码文件夹下有个`configure`文件，也就是通过`wget http://xxx`这种方式下载解压过后的文件。

先执行这段话：

`./configure --prefix=/usr/local/nginx --with-http_stub_status_module --with-http_ssl_module`

然后编译：

`make`

先停止服务：

`nginx -s quit`或`nginx -s stop`

覆盖原有`sbin`文件夹下的`nginx`文件

`cp ./objs/nginx /usr/local/nginx/sbin/`

前面为生成的nginx，后面是你安装目录下的nginx，若不知道你sbin文件夹下的nginx文件，可以通过此命令查找：`whereis nginx`

此时再通过`nginx -V`查看`configure arguments:`右边是否为空，

![image.png](./img/install-nginx-1.png)

显示这些证明安装成功

然后进入到安装目录，这里参考我的安装目录：`cd /usr/local/nginx/conf`

配置nginx的文件就是此目录下的`nginx.conf`文件，`vim nginx.conf`

配置完成后通过`nginx -t`检查是否配置错误

重启nginx：`nginx -s reload`







