---
title: nginx
date: 2022-03-20
icon: nginx
category:
  - 运维
---

<!-- more -->


## 什么是Nginx？

Nginx是一款高性能的开源Web服务器和反向代理服务器。它具有轻量级、高并发处理能力和低内存消耗的特点，被广泛应用于构建高性能的网络功能

Nginx 最初由俄罗斯的工程师Igor Sysoev开发，首次发布于2004年。它的设计目标是解决C10k问题，即在高并发环境下保持高性能和可靠性。

当时的服务器软件都是单线程的，导致在高并发的情况下，服务器性能会变得非常的差，Nginx的出现便很好的解决了这个问题。

在官方给出的数据当中，Nginx可以支持5万个并发连接，epoll-IO多路复用、高并发，最大50000个连接，高性能、低内存消耗，热部署。

Nginx 的主要特点包括：
1. 高性能：Nginx 使用事件驱动和异步非阻塞的工作模式，能够处理大量并发连接，具有出色的性能表现。
2. 负载均衡：作为反向代理服务器，Nginx 可以将请求分发到多个后端服务器，实现负载均衡，提高系统的可扩展性和稳定性。
3. 反向代理：Nginx 可以作为反向代理，接收客户端请求，并将请求转发到后端服务器，隐藏后端服务器的真实地址。
4. 静态文件服务：Nginx 可以快速、高效地提供静态文件的访问，通过将静态文件缓存到内存中，减轻后端服务器的负载。
5. 动态内容支持：除了静态文件服务，Nginx 还可以与后端应用程序（如 PHP、Node.js）进行集成，处理动态内容的请求。
6. 可扩展性：Nginx 可以通过添加模块进行功能扩展，满足不同的需求。

Nginx具有卓越的性能和灵活性，Nginx 在互联网应用中被广泛使用，包括网站服务器、反向代理、负载均衡、缓存服务器、媒体流服务器等。它已经成为构建高性能和可靠性的现代 Web 架构中的重要组件之一。

Web服务器还有：Apache、Cloudflare、OpenResty

## 安装Nginx

**方式一：**
```shell
# linux
sudo apt update
sudo apt install nginx

# macos
brew install nginx

# windows
scoop install nginx
choco install nginx
```

**方式二：**

源码编译安装：
1. 下载nginx源码到自己电脑上
2. 执行预编译：`./configure`
3. 编译：`make`
4. 安装：`make install`

这种方式比较灵活，可以自定义配置各种参数，适合于一些特殊的应用场景，比如想安装一些特殊模块或者想修改一些源码来自定义一些功能，再或者要求安装在服务器上的Nginx不能访问外网等。

**方式三：**

适用docker进行安装
```shell
docker pull nginx
```

## 服务启停止
```shell
# linux 回车后没有提示消息即成功
nginx

# windows
start nginx 
```

**查看nginx后台进程**
```bash
ps -ef|grep nginx
```
关注两个进程，一个master进程，一个worker进程

![nginx进程模型](./images/nginx-worker.png)

这里的master进程就是nginx的主进程，它主要负责读取和验证配置文件以及管理worker进程，worker进程就是nginx的工作进程，负责处理实际的请求，master进程只有一个，而worker进程可以有多个。

worker进程的数量可以通过配置文件进行修改

```bash
# 查看端口号占用情况
lsof -i:端口号

# 优雅停止服务器
nginx -s quit

# 立即停止
nginx -s stop

# 重载配置文件
nginx -s reload

# 重新打开日志文件
nginx -s reopen
```


## 静态站点部署

```bash
# 查看nginx的安装目录、编译参数以及配置文件和日志文件的位置等各种信息，尤其是nginx配置文件的位置，也就是nginx.conf这个文件
# 这个文件位置和使用的操作系统以及安装的nginx方式有关
nginx -V

```

也可以输入`nginx -t`回车后,`--con-path=`后面的就是配置文件的路径，常见位置：
- `/etc/nginx/conf`
- `/usr/local/etc/nginx`
- `/opt/homebrew/etc/nginx`

`nginx.conf`常见配置：
```json
worker_processes  10; //worker进程数量，一般来说，修改为同服务器CPU内核数量是比较合适的，也可以设置为auto，这样就会自动根据CPU内核的数量来自动设置worker进程的数量
server{
    listen       80; //端口号
    location / {    //匹配浏览器输入的 / 路径
        root   html;  //进入html文件夹，相当于根目录的
        index  index.html index.htm; //匹配index.html文件或index.htm文件
    }
}
```

修改完成`nginx.conf`配置文件后，可使用`nginx -t`来检查配置文件是否错误，每次修改完都要利用`nginx -s reload`重新加载配置文件。


## 配置文件


```js
events {
    worker_connections  1024;//主要是一些服务器和客户端之间网络连接的一些配置，比如指定每个worker进程可以同时接收多少个网络连接、网络IO模型等等 
}
http{
    include  mine.types;//这句话意思就是把mine.types这个文件包含进来，这个文件中包含了很多MINE文件类型，这样nginx就可以根据文件的后缀名来判断文件的类型，然后再根据不同的文件类型做不同的处理
    //这一部分是修改最频繁的部分，比如虚拟主机、反向代理、负载均衡等等
    //这一部分可以包括多个serve块，也就是虚拟主机

    include servers/*; //把servers目录下的所有配置文件都包含进来，这样就可以把每个虚拟主机的配置都放在一个单独的文件里，让主配置文件看起来更加简洁清晰
}

```

**include字段：**
```shell
# 绝对路径
include /etc/conf/nginx.conf

# 相对路径 相对路径中文件必须在正在编辑的nginx配置文件所在的目录中，Nginx会自动查找该文件
include port/80.conf

# 通配符
include *.conf

# 宏
include /path/to/$ENV(FILE}:
# 宏是可以替换为具体路径的字符串。例如在上面的例子中，变量SENV{FILE)表示一个指定路径，它可以被替换为一个具体的文件路径它可以避免将诸如 passwords 或类似信息写到配置文件中。
```

**举个例子，将http下的server配置，一个配置http，一个配置https拆分开：**
```shell
# nginx.conf里
worker_processes  auto;

events {
    worker_connections  1024;
}

http {
    include       mime.types;
    default_type  application/octet-stream;

    sendfile        on;

    keepalive_timeout  65;

     upstream backend {
         ip_hash;
         server 127.0.0.1:3000;
    }
    include servers/*;
}


```
servers文件夹有http和https两个文件：  
![](./images//http-https.png)
```shell
# http文件里
# HTTP server
server {
   listen       80;
   server_name  localhost;

   location / {
     return 301 https://$host$request_uri;
   }

   error_page   500 502 503 504  /50x.html;
}

# https文件里
# HTTPS server
server {
   listen       443 ssl;
   server_name  localhost;

   ssl_certificate      /usr/local/nginx/ssl/cacert.pem;
   ssl_certificate_key  /usr/local/nginx/ssl/private.key;

   ssl_session_cache    shared:SSL:1m;
   ssl_session_timeout  5m;

   ssl_ciphers  HIGH:!aNULL:!MD5;
   ssl_prefer_server_ciphers  on;

   location / {
      # root   html;
      # index  index.html index.htm;
       proxy_pass http://backend;
   }
}
```

## 反向代理和负载均衡

反向代理是相对正向代理来说的，正向代理就是代理客户端，反向代理就是代理服务器端。

比如挂VPN访问国外网站，让VPN代替我们访问国外的网站，然后把返回结果返回到我们客户端，这就是一个典型的正向代理例子。这里的代理服务器代理的是客户端，且这个过程客户端是知道的，但是对于服务端是透明的。

而反向代理就是代理服务端，比如当我们访问一个网站的时候，比如我们访问Google，而Google域名只有一个，但是Google后面有很多的服务器，客户端请求Google网页，而Google服务器会将请求转发到后面的服务器上，从而隐藏了真实的服务器地址，端口等信息，这就是反向代理的典型例子。这里的代理服务器就是代理的服务端，而且这个过程对于客户端是透明的。Nginx就是一个非常好的反向代理服务器。

```js
http {
    upstream backend {
        ip_hash;
        server 127.0.0.1:8001 weight=3;
        server 127.0.0.1:8002;
        server 127.0.0.1:8003;
    }
    server {
        location /app {
            proxy_pass http://backend;
        }
    }
}
```

`nginx -t`检查配置文件是否错误，`nginx -s reload`重载配置文件。

默认是以轮询的方式来代理的，但是如果当服务器配置不一样的时候，我们想性能更好的服务器代理更多一点，那就可以添加关键字`weight`来设置权重。

`ip_hash`这个策略会根据客户端的IP地址来进行一个哈希，同一个客户端请求就会被分配到同一个服务器上，这样就能解决一些session性上的问题。


同一台服务器，3000端口由pm2启动的，现在用nginx进行代理：
```shell
http{
    upstream backend {
       ip_hash;
       server 127.0.0.1:3000;
    }

    # HTTP
    server {
        listen       80;
        server_name  localhost;

        location / {
           return 301 https://$host$request_uri;
        }
    }


    # HTTPS server
    server {
        listen       443 ssl;
        server_name  localhost;

        ssl_certificate      /usr/local/nginx/ssl/cacert.pem;
        ssl_certificate_key  /usr/local/nginx/ssl/private.key;

        ssl_session_cache    shared:SSL:1m;
        ssl_session_timeout  5m;

        ssl_ciphers  HIGH:!aNULL:!MD5;
        ssl_prefer_server_ciphers  on;

        location / {
           proxy_pass http://backend;
        }
    }

}
```


## HTTPS配置

HTTP + SSL = HTTPS

HTTP默认端口为80，HTTPS默认端口为443。在浏览器地址栏中，这两个端口号都不会显示。

可以通过openssl来生成一个自签名证书：
1. 生成私钥文件(private key)：`openssl genrsa -out private.key 2048`
2. 根据私钥文件生成证书签名请求文件（Certificate Signing Request，简称CSR文件）：`openssl req -new -key private.key -out cert.csr`
3. 根据私钥对证书申请进行签名从而生成证书文件（pem文件）：`openssl x509 -req -in cert.csr -out cacert.pem -signkey private.key`

生成过程中会提示输入一些信息，如国家(Country)、省份(Province)、城市(Locality Name)、公司(Unit Name)、名字(Common Name)、邮箱(Email Address)等等

最后需要两个文件，一个pem文件，一个key文件，需要放在服务器上。然后在nginx的配置文件下进行配置。

```shell
server {
    listen      443 ssl;
    server_name localhost;
    # 证书文件名称
    ssl_certificate     /opt/homebrew/etc/nginx/cacert.pem;
    # 证书私钥文件名称
    ssl_certificate_key /opt/homebrew/etc/nginx/private.key;
    # ssl验证配置
    ssl_session_timeout 5m; #缓存有效期
    # 安全连接可选的加密协议
    ssl_protocols   TLSv1 TLSv1.1 TLSv1.2 TLSv1.3;
    # 配置加密套件/加密算法，写法遵循 openssl 标准
    ssl_ciphers ECDHE-RSA-ASS128-GCM-SHA256:HIGH:!aNULL:!MD5:!RC4:!DHE;
    # 使用服务端首选算法
    ssl_prefer_server_ciphers on;
    location / {
            root   html;
            index  index.html index.htm;
    }
}

# http重定向到https
server {
    listen  80;
    server_name geekhour.net  www.geekhour.net;

    location / {
        return 301 https://$host$request_uri;
    }
    # return 301 https://$server_name$request-uri;
}
```

**注意：**自签名证书未经过CA机构的验证，所以浏览器访问会报不安全的，选择继续访问即可。

[详细Centos玩转https可以参考此文章](./https/centos-nginx-https.md)


## 虚拟主机

虚拟主机可以在一台主机上部署多个站点，很多时候网站在起步阶段并没有非常大的访问量，把多个网站部署在一起也不会对服务器造成太大的压力，而且这样可以节省服务器的资源和成本，nginx的虚拟主机就是通过`server`块来进行配置的。

```shell
# 每个虚拟块就是一个虚拟主机
server {
    listen  8088;
    listen  somename:8088;
    server_name somename alias anthor.alias; # 通过配置server_name来指定这个虚拟主机的域名，这样当访问这个域名的时候，就会匹配这个server块，这样就可以在一台服务器上配置多个虚拟机了

    location / {
        root html;
        index index.html index.htm;
    }
}
```

可以把`server`块的内容复制，然后在`server`文件夹下新建文件，这样主配置文件就看起来更干净、简洁。




## 允许跨域与允许使用history路由

```shell
location / {
    add_header Access-Control-Allow-Origin *; //允许跨域
    try_files $uri $uri/ /index.html;//避免网页使用history模式下，显示错误。
    root   html;
    index  index.html index.htm;
}
```
