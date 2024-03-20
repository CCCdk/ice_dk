**遇到表单全选，反选**：

可以利用css的伪类选择器进行判断。

# 事件流

**事件完整执行过程中的流动路径**。

说明：假设页面里有个div,当触发事件时，会经历两个阶段，分别是捕获阶段，冒泡阶段

简单来说：捕获阶段是从父到子，冒泡阶段是从子到父

**实际工作都是使用事件冒泡为主**。

## 事件捕获（了解）

**概念**：从DOM的根元素开始去执行对应的事件（从外到里）

- 事件捕获需要写到对应代码才能看到效果

代码：

```js
DOM.addEventListener(事件类型,事件处理函数,是否使用捕获机制)
```

**说明**：

- addEventListener第三个参数传入true代表是捕获阶段触发(很少使用)
- 若传入false代表冒泡阶段触发，默认就是false
- 若是用L0事件监听，则只有冒泡阶段，没有捕获

## 事件冒泡

**概念**：当一个元素的事件被触发时，同样的事件将会在该元素的所有祖先元素中依次被触发，这个过程被称为事件冒泡。

**简单理解**：当一个元素触发事件后，会依次向上调用所有父级元素的**同名事件**。

事件冒泡是默认存在的

事件监听第三个参数是false,或者默认都是冒泡

## 阻止冒泡

**问题**：因为默认就有冒泡模式的存在，所以容易导致事件影响父级元素

**需求**：若想把事件就限制到当前元素内，就需要阻止事件冒泡

**前提**;阻止事件冒泡需要拿到事件对象

**语法**：

在function(e)，在function的括号后面加上e，后面的那一些事件都不流动。

```js
事件对象.stopPropagation()
```

**注意**：此方法可以**阻断事件流动传播**，不光在冒泡有效，而且捕获阶段也有效。

## 解绑事件

on事件方式，直接使用null覆盖就可以实现事件的解绑

```js
//绑定事件
btn.onclick=function(){
    alert('点击了')
}
//解绑事件
btn.onclick=null
```

addEventListener方式，必须使用：

removeEventListener(事件类型，事件处理函数，[获取捕获或者冒泡阶段])

例如：

```js
function fn(){
    alert('点击了')
}
//绑定事件
btn.addEventListener('click',fn)
//解决事件
btn.removeEventListener('click',fn)
```

**注意**：**匿名函数无法被解绑**。

## 鼠标经过事件的区别

- mouseover和mouseout会有冒泡效果

- mouseenter和mouseleave没有冒泡效果(推荐)

## 两种注册事件的区别

传统on注册(L0):

- 同一个对象，后面注册的事件会覆盖前面注册（同一个事件）
- 直接使用null覆盖就可以实现事件的解绑
- 都是冒泡阶段执行的

事件监听注册(L2):

- 语法：addEventListener(事件类型，事件处理函数，是否使用捕获)
- 后面注册的事件不会覆盖前面注册的事件(同一个事件)
- 可以通过第三个参数去确定是在冒泡或者捕获阶段执行
- 必须使用removeEventListener(事件类型，事件处理函数，[获取捕获或者冒泡阶段])
- 匿名函数无法被解绑

# 事件委托

利用事件流的特征解决一些开发需求的知识技巧

- 优点：减少注册次数，可以提高程序性能
- 原理：事件委托其实是利用事件冒泡的特点

给**父元素注册事件**，当我们触发子元素的时候，会冒泡到父元素身上，从而触发父元素的事件。

**实现**：事件对象.target.tagName   可以获得真正触发事件的元素

这里的tagName是对象的名字(看一下是否为大写)

用if语句进行判断。

# 阻止元素默认行为

我们某些情况下需要阻止默认行为的发生，比如阻止链接的跳转，表单域跳转。

语法：

```js
e.preventDefault()
```

# 页面加载事件

## load事件

1. 加载外部资源(如图片，外联CSS和javaScript等)加载完毕时触发的事件。

2. 为什么要学

   有些时候需要等页面资源全部处理完了做一些事情

   老代码喜欢把script写字head中，这时候直接找dom元素找不到

3. 事件名：load

4. 监听页面所有资源加载完毕

   给window添加load事件

```js
//页面加载事件
window.addEventListener('load',function(){
//执行的操作
})
```

## DOMContentLoaded事件

1. 当初始的HTML文档被完全加载和解析完成之后，DOMContentLoaded事件被触发，而无需等待样式表，图像等完全加载     

2. 事件名：DOMContentLoaded

3. 监听页面DOM加载完毕：

   给document添加DOMContentLoaded事件

```js
document.addEventListener('DOMContentLoaded',function(){
//执行的操作
})
```

# 元素滚动事件

滚动条在滚动的时候持续触发的事件

为什么要学？

很多网页需要检测用户把页面滚动到某个区域后做一些处理，比如固定导航栏，比如返回顶部

事件名：scroll

监听整个页面滚动：

```js
//页面滚动事件
window.addEventListener('scroll',function(){
//执行的操作
})
```

**给window或document添加scroll事件**。

# 页面滚动事件-获取位置

## scrollLeft和scrollTop(属性)

- 获取被卷去的大小
- 获取元素内容往左，往上滚出去看不到的距离
- 这两个值是**读写**的

尽量在scroll事件里面获取被卷去的距离

```js
//页面滚动事件
div.addEventListener('scroll',function(){
    console.log(this.scrollTop)
})
```

开发中，我们经常检测页面滚动的距离，比如页面100像素，就可以显示一个元素，或者固定一个元素

```js
//页面滚动事件
div.addEventListener('scroll',function(){
    //document.documentElement是html元素获取方式
    const n=document.documentElement.scorllTop
    console.log(n)
})
```

**注意事项**：

document.documentElement    HTML文档返回对象为HTML元素

# 到达代码的某一处

快捷键：Ctrl+G

# 例子

```js
window.addEventListener('scroll',function(){
    
})
```

# 滚动到指定坐标

scrollTo()方法可把内容滚动到指定的坐标

```js
//让页面滚动到y轴到1000像素的位置
window.scrollTo(0.1000)
//也可以这么写：
document.documentElement.scrollTop = 0//回到顶部  
```

# 页面尺寸事件

会在窗口尺寸改变的时候触发事件

**resize**:

```js
window.addEventListener('resize',function(){
    //执行的代码
})
```

## **检测屏幕宽度**/高度：

不包含边框的高度和滚动条

```js
window.addEventListener('resize',function(){
    let w =document.documentElement.clientWidth
    console.log(w)
})
```

# 元素的尺寸与位置

## 获取宽高：

- 获取元素的自身宽高，包含自身设置的宽高，padding，border
- offsetWidth和offsetHeight
- 获取处理的是数值，方便计算
- 注意：获取的是可视宽高，如果盒子是隐藏的，获取的结果是0

## 获取位置：

- 获取元素距离自己定位父级元素的左、上距离（**受父亲的影响**）
- offsetLeft和offsetTop，注意是只读属性

![offset...](.\图片\offset....png)

- element.getBoundingClientRect()，方法返回元素的大小及其相对于**视口**的位置

# 改变事件

内容发生变化，即触发事件

```js
const input =document.querySelector('input')
input.addEventListener('change',function(){
    //执行的代码
})
```



# 页面滑动

```js
//页面滑动
html{
scroll-behavior:smooth
}
```

# 刷新得到随机颜色

```js
//得到随机颜色的代码
function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

//选中元素的backgroundColor
const myElement = document.getElementById("my-element");

function changeColor() {
  const newColor = getRandomColor();
  myElement.style.backgroundColor = newColor;
}

setInterval(changeColor, 1000); // 每秒刷新一次颜色
```

