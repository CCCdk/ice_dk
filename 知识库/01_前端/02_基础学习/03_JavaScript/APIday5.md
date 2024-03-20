# Window对象

## BOM(浏览器对象模型)

![BOM](.\图片\BOM.png)

- window对象是一个全局对象，也可以说是JavaScript中的顶级对象

- 像document，alert()，console.log()这些都是window的属性，基本BOM的属性和方法都是window的。

- 所有通过var定义在全局作用域中的变量、函数都会编程window对象的属性和方法

- window对象下的属性和方法调用的时候可以省略window 

## 定时器-延时函数

JavaRScript内置的一个用来让代码延迟执行的函数，叫setTimeout

**语法**：

```js
setTimeout(回调函数,等待的毫秒数)
```

setTimeout仅仅只执行一次，所以可以理解为就是把一段代码延迟执行，平时省略window

**清除延时函数**：

```js
let timer =setTimeout(回调函数,等待的毫秒数)

clearTimeout(timer)
```

**注意点**：

- 延时器需要等待，所以后面的代码先执行
- 每一次调用延时器都会产生一个新的延时器

### 两种定时器对比

- **两种定时器对比**：执行的次数
- 延时函数：执行一次
- 间歇函数：每隔一段时间就执行一次，除非手动清除

## JS执行机制

JavaScript语言的一大特点就是**单线程**，也就是说，**同一个时间只能做一件事**。

这是因为JavaScript这门脚本语言诞生的使命所致----JavaScript是为处理页面中用户的交互，以及操作DOM而诞生的。比如我们对某个DOM元素进行添加和删除操作，不能同时进行，应该先进行添加，之后再删除。

单线程就意味着，所有任务需要排队，前一个任务结束，才会执行后一个任务。这样所导致的问题是：如果js执行的时间过长，这样就会造成页面的渲染不连贯，导致页面渲染加载阻塞的感觉。

为了解决这个问题，利用多核CPU的计算能力，HTML提出Web Worker标准，允许JavaScript脚本创建多个线程，于是，js中出现了**同步**和**异步**。

### 同步任务

同步任务都在主线程上执行，形成一个**执行线**。

### 异步任务

JS的异步是通过回调函数实现的

一般而言，异步任务有以下三种类型：

1. 普通事件：如click，resize等
2. 资源加载，如load，error等
3. 定时器，包括setinterval，setTimeout等

异步任务相关添加到**任务队列**中（任务队列也称为消息队列）

### 机制

1. 先执行**执行线中的同步任务**。
2. 异步任务放入任务队列中。

3. 一旦执行栈中的所有同步任务执行完毕，系统就会按次序读取**任务队列**中异步任务，于是被读取的异步任务结束等待状态，进入执行栈，开始执行。

由于主线程不断的重复获得任务，执行任务，再获取任务，再执行，所以这种机制被称为**事件循环**。

## location对象

location的数据类型是对象，它拆分并保存了URL地址的各个组成部分

**常用属性和方法**：

- href属性获取完整的url地址，对其赋值时用于地址的跳转

```js
//可以得到当前文件URL地址
console.log(location.href)
//可以通过js方式跳转到目标地址
location.href='http://www.itcast.cn'
```



经常用href，利用js的方法去跳转页面

- search属性获取地址中携带的参数，符号?后面部分

```js
console.log(location.search)
```

- hash属性获取地址中的哈希值，符号#后面部分

```js
console.log(location.hash)
```



- reload方法用来刷新当前页面，传入参数true时表示强制刷新。

```js
let btn=document.querySelector('button')
btn.addEventListener('click',function(){
    location.reload(true)
    //强制刷新  类似 ctrl+f5
})
```

## navigator对象

navigator的数据类型是对象，该对象下记录了浏览器自身的相关信息

**常用属性和方法**：

- 通过userAgent检测浏览器的版本及平台

```js
//检测userAgent（浏览器信息）
!(function(){
    const userAgent =navigator.userAgent
    //验证是否为Android或iPhone
    const android=userAgent.match(/(Android);?[\s\/]+([\d.]+)?/)
    const iPhone=userAgent.match(/(iPhone\sOS)\s([\d_]+)/)
    //如果是Android或iPhone，则跳转至移动站点
    if(android||iPhone){
        location.href='http://m.itcast.cn'
    }
    })();
```

## history对象

history的数据类型是对象，主要管理历史记录，该对象与浏览器地址栏的操作相对应，如前进，后退，历史记录等

**常用属性和方法**：

- back()       -->   可以后退功能
- forward()   -->   前进功能

- go(参数)    -->   前进后退功能，参数如果是1前进一个页面，如果是-1后退一个页面

history对象一般在实际开发中比较少用，但是会在一些OA办公系统中见到

# 本地存储

## 本地存储介绍

- 以前我们页面写的数据一刷新页面就没有了
- 随着互联网的快速发展，基于网页的应用越来越普遍，同时也变得越来越复杂，为了满足各种各样的需求，会经常性在本地存储大量的数据，HTML5规范提出了相关解决方案。

1. 数据存储在**用户浏览器**中
2. 设置、读取方便、甚至页面刷新不丢失数据
3. 容量较大，sessionStorage和localStorage约5M左右

## 本地存储分类 

### localStorage

**作用**：可以将数据永久存储在本地（用户的电脑），除非手动删除，否则关闭页面也会存在。

**特性**：

- 可以多窗口（页面）共享（统一浏览器可以共享）
- 以键值对的形式存储使用

**语法**：

**存储数据**：

```js
localStorage.setltem(key,value)
```

**获取数据**：

```js
localStorage.getltem(key)
```

**删除数据**：

```js
localStorage.removeltem(key)
```

### sessionStorage

**特性**：

- 生命周期为关闭浏览器窗口
- 在同一个窗口（页面）下数据可以共享
- 以键值对的形式存储使用
- 用法跟localStorage基本相同

## 存储复杂数据类型

**问题**：本地只能存储字符串，无法存储复杂数据类型

**解决方法**：需要将复杂数据类型**转换成JSON字符串**，再存储到本地

**语法**：JSON.stringify(复杂数据类型)



 **问题**：把取出来的字符串转换为对象

**语法**：JSON.parse(JSON字符串)

```js
const obj=JSON.parse(localStorage.getItem('goods'))
console.log(obj)
```

将JSON字符串转换成对象，**取出**时候使用

# 字符串拼接

利用map()和join()数组方法实现字符串拼接（效果更高，**开发常用**的写法）

## 数组中map方法

map可以遍历数组**处理数据**，并且**返回新的数组**。

```js
const arr=['red','blue','green']
const newArr=arr.map(function(ele,index){
    console.log(ele)//数组元素
    console.log(index)//数组索引号
    return ele + '颜色'
})
console.log(newArr)//['red颜色','blue颜色','green颜色']
```

**map也称为映射**。映射是个术语，指两个元素的集之间元素相互“对应”的关系

**map重点在于有返回值**，forEach没有返回值。

## 数组中join方法

**作用**：

join()方法用于把数组中的所有元素**转换一个字符串**。

**语法**：

```js
const arr=['red颜色','blue颜色','green颜色']
//小括号里面是什么符号，就用什么符号隔开
console.log(arr.join())//red颜色,blue颜色,green颜色
console.log(arr.join(''))//red颜色blue颜色green颜色
```

  
