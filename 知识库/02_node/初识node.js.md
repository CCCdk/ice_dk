# 思考：

## 为什么js能在浏览器中被执行：

 待执行的js代码 -> 因为有JavaScript解析引擎

![81fe24f0e3799f320b903dfff35613d](.\图片\81fe24f0e3799f320b903dfff35613d.png)

## 为什么JavaScript可以操作DOM和BOM

![1689168369686](.\图片\1689168369686.jpg)

## JavaScript运行环境

如Chrome浏览器运行环境

1. V8引擎
2. 内置API：DOM，BOM，Canvas，ajax等内置函数，js内置对象，etc...

# 什么是Node.js

是一个基于Chrome V8引擎的**JavaScript运行环境**。



# fs文件系统模块

**fs模块**是Node.js官方提供的，用来操作文件的模块，它提供了一系列的方法和属性，用来满足用户对文件的操作

例如：

- fs.readFile()方法，用来**读取**指定文件中的内容
- fs.writeFile()方法，用来向指定的文件中**写入**内容。

## fs.readFile()

可以**读取指定文件中的内容**，语法如下

 fs.readFile(path[,options],callback)

 参数1：**必选**参数，字符串，表示文件的路径

 参数2：可选参数，表示以什么**编码格式**来读取文件

 参数3：**必选**参数，文件读取完成后，通过回调函数拿到读取的结果

```js
//1. 导入fs模块，未操作文件
const fs=require('fs')
//2. 调用fs.readFile()方法读取文件
fs.readFile('./1.txt','utf8',function(err,dataStr){
    console.log(err)
})
若读取成功，则err的值为null
若读取失败，则err的值为错误对象，datStr的值为undefined

```

## fs.writeFile()

 fs.readFile(file,data[,options],callback)

 参数1：**必选**参数，字符串，表示文件的路径

 参数2：**必选**参数，表示要写入的内容

 参数3：可选参数，表示以什么**编码格式**来读取文件

 参数4：**必选**参数，文件写入完成后的回调函数

```js
//1. 导入fs模块，未操作文件
const fs=require('fs')
//2. 调用fs.readFile()方法读取文件
fs.writeFile('./1.txt','abcd',function(err,dataStr){
    console.log(err)
})
//若读取成功，则err的值为null
//若读取失败，则err的值为错误对象
```

## fs模块 - 路径动态拼接的问题

在使用fs模块操作文件时，如果提供的操作路径是以./或../开头的**相对路径**时，很容易出现路径动态拼接错误的问题

原因：代码在执行的时候，**会以执行node命令时所处的目录**，动态拼接出被操作文件的完整路径

第1种方案：

```js
//出现路径拼接错误的问题，是因为提供的相对路径，可以直接提供一个绝对路径
//这样会导致移植性非常差，并且不利于维护
```

第2种方案：
一般会在前面加上  __dirname表示当前文件所在的目录，后面接一个+号

# path路径模块

**path模块**是Node.js官方提供的，用来**处理路径**的模块，它提供了一系列的方法和属性，用来满足用户对路径的处理需求。

- path.join()方法，用来**将多个路径片段拼接成一个完整的路径字符串**。
- path.basename()方法，用来从路径字符串中，将文件名解析出来

```js
const path=require(path)
```

## path.join()

使用path.join()方法，可以**把多个路径片段拼接为完整的路径字符串**

```js
path.join([...path])
参数解读：
...paths<string>路径片段的序列
返回值：<string>
//    ../会抵消前面的路径
```

 如path.join(__disname,'路径')

## path.basename()

使用path.basename()方法，可以**获取路径中的最后一部分**，经常通过这个方法获取路径中的文件名

```js
path.basename(path[,ext])
//这里的ext指的是扩展名，如果传入的话，则可以只返回它的文件名
```

## path.extname()

使用path.extname()方法，可以获取路径中的**扩展名**部分

# http模块

在网络节点中，负责消费资源的电脑，叫做客户端

**负责对外提供网络资源**的电脑，叫做服务器

**http模块**是Node.js官方提供的，用来**创建web服务器**的模块。通过http模块提供的http.createSever()方法，就能方便地把一台普通的电脑，变成一台web服务器，从而对外提供web资源服务。

## http模块的作用

服务器和普通电脑的**区别**在于，服务器上安装了web服务器软件，例如：IIS，Apache等。

## 服务器相关概念

### IP地址

互联网上**每台计算机的唯一地址**。

**格式**：通常用“点分十进制”表示成(a,b,c,d)的形式，其中，a,b,c,d都是0~255之间的十进制整数，例如：用点分十进表示的IP地址(192.168.1.1)

注意：互联网中每台web服务器，都有自己的IP地址

### 域名和域名服务器

  IP地址不好记，又发明了一套**字符型**的**地址方案**，即所谓的**域名地址**。

域名服务器就是**提供IP地址和域名之间的转换服务的服务器**。

127.0.0.1对应的域名是localhost，它们都代表我们自己的这台电脑，在使用效果上没啥区别

### 端口号

在一台电脑中，可以运行成百上千个web服务，每个web服务都对应一个唯一的端口号，客户端发送过来的网络请求，通过端口号，可以被准确地交给**对应的web服务**进行处理。

**只有80端口可以被省略**。

## 创建web服务器的基本步骤

### 导入http模块

```js
const http=require('http')
```

### 创建web服务器实例

调用http.createServer()方法，即可快速创建一个web服务器实例：

```js
const server =http.createServer()
```

### 为服务器实例绑定request事件

即可监听客户端发送过来的网络请求

```js
//使用服务器实例的   .on()方法，为服务器绑定一个request事件
server.on('request',(req,res)=>{
    //只要客户端来请求我们自己的服务器，就会触发request事件，从而调用函数
})
```

### 启动服务器

通过服务器实例的listen()方法，即可启动当前的web服务器实例

```js
//调用server.listen(端口号,cb回调)方法，即可启动web服务器
server.listen(80,() =>{

})
```

## req请求对象

只要服务器接收到了客户端的请求，就会调用通过server.on()为服务器绑定的request事件处理函数

如果想在事件处理函数中，访问与客户端相关的**数据**和**属性**。

```js
req.url
req.method
```

## res相应对象

如果想在事件处理函数中，访问与服务端相关的**数据**和**属性**。

```js
res.end()
```

## 解决中文乱码的问题

```js
res.setHeader('Content-Type','text/html;charset=utf-8')
```

