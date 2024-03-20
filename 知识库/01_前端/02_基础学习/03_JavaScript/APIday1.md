# 变量声明

**建议**：const优先，尽量使用const，原因是

- const语义化更好

- react框架

约定：有了变量先给const，如果发现它后面是要被修改的，再改为let

**建议数组和对象使用const来声明**。

 # Web API的基本认知

## 作用

就是使用JS去操作html和浏览器

分类：**DOM**（文档对象模型），**BOM**（浏览器对象模型）

- DOM(Document Object Model --->文档对象模型)是用来呈现以及与注意HTML或XML文档交互的API
- 白话文：DOM是浏览器提供的一套专门用来**操作网页内容**的功能

- DMO作用

开发网页内容特效和实现用户交互

## DOM树

### 概念

将HTML文档以树状结构直观的表现出来，我们称之为文档数或DOM树

描述网页内容关系的名词

### 作用

**文档树直观地体现了标签与标签之间的关系**。

## DOM对象

### 概念

浏览器根据html标签生成的**JS对象**。

- 所有的标签属性都可以在这个对象上面找到
- 修改这个对象的属性会自动映射到标签身上

### 核心思想

把网页内容当做**对象**来处理

### document对象

- 是DMO里提供的一个**对象**。

- 所以它提供的属性和方法都是**用来访问和操作网页内容的**。

- 网页所有内容都在document里面

# 获取DOM对象

## 根据CSS选择器来获取DOM元素

1. 选择匹配的**第一个元素**！！

**语法**：

```js
document.querySelector('css选择器')
```

**参数**：

包含一个或多个有效的CSS选择器**字符串**。

**返回值**：

css选择器匹配的**第一个元素**，一个HTMLElement对象。

如果没有匹配到，则结果为null



2. 选择匹配的**多个元素**：

**语法**：

```js
document.querySelectorAll('css选择器')
```

**参数**：

包含一个或多个有效的css选择器 **字符串**。

**返回值**：

css选择器匹配的**NodeList对象集合**：

```js
document.querySelectorAll('css选择器')
```

得到的是一个**伪数组**：

- 有长度有索引号的数组
- 但是没有pop()  push() 等数组方法

想要得到里面的每一个对象，则需要遍历(for)的方式获得

**哪怕只有一个元素。也是一个伪数组**。

## 其他获取DOM元素方法（了解）

```js
//根据id获取一个元素
document.getElementById('nav')
//根据标签获取一类元素，获取页面的所有div
document.getElementsByTaName('nav')
//根据一类名获取元素，获取页面 所有类名为w的
document.getElementByClassName('w')
```

# 操作元素内容

DOM对象都是根据标签生成的，所以操作标签，本质上就是操作DOM对象

就是操作对象使用的**点语法**。

如果想要修改标签元素的里面的**内容**，则可以使用如下几种方式

1. 对象.innerText   属性

```js
//获取元素
const box=document.querySelector('.box')
//修改文字内容     对象.innerText 属性
console.log(box.innerText) //获取文字内容
box.innerText='你好哇，这个地方已经被我改了噢'
```

- 将文本内容添加/更新 到任意标签位置
- 显示纯文本，**不解析标签**

2. 对象.innerHTML 属性

```js
box.innerHTML='你好哇，这个地方已经被我改了噢'
```

- 将文本内容添加/更新 到任意标签位置
- **会解析标签**，多标签建议使用模板字符

# 操作元素属性

## **操作常用属性**：

最常见属性：href,title,src等

语法：  对象.属性=值

```js
//1.获取图片元素
const img=document.querySelector('img')
//2.修改图片对象的属性
img.src=''
img.title=''
```

 

## **操作元素样式属性**：

1. 通过style属性操作css

**语法**：修改样式属性   **对象.style.样式属性='值'**，**别忘了跟单位**。

```js
box.style.width='300px'
```

**多组单词，采取小驼峰命名法**。



2. 操作类名(className)操作css

如果修改的样式比较多，直接通过style属性修改比较繁琐，我们可以通过借助于css类名的形式

语法：

```js
//active是一个css类名
元素.className='active'
```

**注意**：

- 由于class是关键字，所以使用className去代替

- className是使用新值**换**旧值，如果需要添加一个类，需要保留之前的类名



3. 通过classList操作类控制css

为了解决className容易覆盖以前的类名，我们可以通过classList方式追加和删除类名

**语法**：

```js
  //追加一个类
  元素.classList.add('类名')
  //删除一个类
  元素.classList.remove('类名')
  //切换一个类，有就加，没有就删
  元素.classList.toggle('类名')
```

![获取图片，修改背景](.\图片\获取图片，修改背景.png)

## **操作表单元素属性**：

表单很多情况下，也需要修改属性，比如点击眼睛，可以看到密码，本质是把表单类型转换为文本框

正常的有属性有取值的，跟其他的标签属性没有任何区别

获取：DOM对象.属性名

设置：DOM对象.属性名=新值

**获取表单里面的值**：   **表单.value**

如：

```html
<input type="text" value="电脑">
<script>
    const uname= document.querySelector('input')
    console.log(uname.value)
    uname.
</script>
```

```html
<input type="checkbox" name="" id="">
<button>
    点击
</button>
<script>
    //获取
    const ipt=document.querySelector('input')
    //只接收布尔值
    ipt.checked=true
    //获取
    const button=document.querySelector('button')
    //表示是否禁用，要禁用的话，就是true，不然就是false
    button.disabled=true
</script>
```

## **自定义属性**：

**标准属性**：标签天生自带的属性，比如class，id，title等，可以直接使用点语法操作比如：disabled，checked，selected

**自定义属性**：

- 在html5中推出来了专门的data-自定义属性
- 在标签上一律以data-开头
- 在DOM对象上一律以dataset对象方式获取

![自定义属性](.\图片\自定义属性.png)

# 定时器-间歇函数

- 网页中经常会需要一种功能：每隔一段时间需要**自动**执行一段代码，不需要我们手动去触发
- 例如：网页中的倒计时
- 要实现这种需求，需要定时器函数
- 定时器函数有两种：

## 定时器函数

定时器函数可以开启和关闭定时器

1. 开启定时器

```js
setInterval(函数,间隔时间)
```

函数名的话，不要加小括号，你也可以这样：'fn()'

**作用**：每隔一段时间调用这个函数

间隔时间单位是毫秒

![开启定时器](.\图片\开启定时器.png)

**注意**：1. 函数名字**不需要加括号**。

2.**定时器返回的是一个id数字**。

2. 关闭定时器

```js
clearInterval(变量名)
```

