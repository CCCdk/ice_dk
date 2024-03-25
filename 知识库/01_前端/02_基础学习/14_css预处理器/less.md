# less

### 前言

正如Less官网所展示的那句话 `它是 CSS，只是多了一点东西`,Less作为css的语言扩展，只是对css语言做了一些方便的补充，能让开发者更易于开发和使用。对于我个人而言，less具有层级的写法能减少重复选择器的书写，方便阅读，就像看html框架结构那样，更方便地读懂css结构。

### 安装

#### nodejs安装

（1）全局安装 使用 npm 安装

```
npm install less -g
```

(2) 局部安装

```css
npm i less --save-dev
```

如上所示，只需要简单地操作就能在我们的项目中愉快地使用less了

#### lessc

就如同javac能够将.java文件编译为.class文件一样，我们可以使用lessc命令将.less文件编译为.css文件，这样就能够被浏览器直接识别。

例：我们新建一个test.less文件，简单写几个样式

```css
.main{
   padding:4px;
   height:100px;
   .content{
       margin:8px;
   }
}
```

可以在命令行中使用lessc命令编译

```
复制代码lessc test.less test.css
```

会发现同目录下生成了test.css 文件，文件内容如下：

```css
.main {
  padding: 4px;
  height: 100px;
}
.main .content {
  margin: 8px;
}
```

#### 浏览器中使用

除了使用nodejs等第三方工具预编译外，我们可以简单地直接在浏览器中使用less
首先在head中引用less样式表

```bash
<link rel="stylesheet/less" type="text/css" href="styles.less" />
```

然后在script中添加less.js

```xml
<script src="less.js" type="text/javascript"></script>
```

还可以通过编程方式设置选项，方法是将它们设置在脚本标记之前的 less 对象上 - 这会影响所有初始链接标签和 less 的编程使用

```xml
<script>
  less = {
    env: "development",
    async: false,
    fileAsync: false,
    poll: 1000,
    functions: {},
    dumpLineNumbers: "comments",
    relativeUrls: false,
    rootpath: ":/a.com/"
  };
</script>
<script src="less.js"></script>
```

Less.js 支持所有现代浏览器（最新版本的 Chrome、Firefox、Safari 和 Edge）,但是依然建议在服务器端编译 Less。

### 使用语法

#### 变量

less使用`@`来标识变量，如下所示：

```less
@width: 10px;
@height: @width + 10px;

#header {
  width: @width;
  height: @height;
}
```

通过编译可以得到如下结果：

```css
#header {
  width: 10px;
  height: 20px;
}
```

在开发中使用变量能够将样式表中很多重复的值统一配置，如规范中的`padding`、`color`、`border`等属性的值，能够方便地让开发者统一值，以及方便统一修改，更易于使用。在一键换肤、主题切换等使用场景非常适用。 除上述案例中的表示属性值，变量还可用于多个场景： （1）选择器

```less
@my-selector: banner;

.@{my-selector} {
  font-weight: bold;
  line-height: 40px;
  margin: 0 auto;
}
```

(2) URL

```less
@images: "../img";

body {
  color: #444;
  background: url("@{images}/white-sand.png");
}
```

(3) 导入语句

```less
@themes: "../../src/themes";

@import "@{themes}/tidal-wave.less";
```

(4) 属性

```less
@property: color;

.widget {
  @{property}: #0ee;
  background-@{property}: #999;
}
```

(5) 属性作为变量（新）

你可以使用 `$prop` 语法轻松地将属性视为变量

```css
.widget {
  color: #efefef;
  background-color: $color;
}
 //编译后
.widget {
  color: #efefef;
  background-color: #efefef;
}
```

#### 混入

混入是一种将一组属性从一个规则集中包含（"混合进入"）到另一个规则集中的方法

当我定义了一个样式，如下：

```css
.bordered {
  border-top: dotted 1px black;
  border-bottom: solid 2px black;
}
```

如果我们在其他class下也需要使用同样的属性，那么可以使用混入，如下所示：

```css
#menu a {
  color: #111;
  .bordered();
}

.post a {
  color: red;
  .bordered();
}

//编译后
#menu a {
  color: #111;
  border-top: dotted 1px black;
  border-bottom: solid 2px black;
}
.post a {
  color: red;
  border-top: dotted 1px black;
  border-bottom: solid 2px black;
}
```

更多用法： （1）带括号的混入 如果你想创建一个 mixin 但你不希望那个 mixin 出现在你的 CSS 输出中，可以在mixin定义之后加上括号，如下所示：

```css
.my-mixin {
  color: black;
}
.my-other-mixin() {
  background: white;
}
.class {
  .my-mixin();
  .my-other-mixin();
}

//编译后
.my-mixin {
  color: black;
}
.class {
  color: black;
  background: white;
}
```

（2）!important 关键字 在 mixin 调用后使用 !important 关键字将其继承的所有属性标记为 !important，如下所示：

```less
.foo (@bg: #f5f5f5, @color: #900) {
  background: @bg;
  color: @color;
}
.unimportant {
  .foo();
}
.important {
  .foo() !important;
}

//编译后
.unimportant {
  background: #f5f5f5;
  color: #900;
}
.important {
  background: #f5f5f5 !important;
  color: #900 !important;
}
```

（3）参数混合 可以将参数传递给Mixins，就如同使用js函数那样简单

```less
.border-radius(@radius) {
  -webkit-border-radius: @radius;
     -moz-border-radius: @radius;
          border-radius: @radius;
}
#header {
  .border-radius(4px);
}
.button {
  .border-radius(6px);
}
```

(4) @arguments 变量

```less
.box-shadow(@x: 0, @y: 0, @blur: 1px, @color: #000) {
  -webkit-box-shadow: @arguments;
     -moz-box-shadow: @arguments;
          box-shadow: @arguments;
}
.big-block {
  .box-shadow(2px, 5px);
}

//编译后
.big-block {
  -webkit-box-shadow: 2px 5px 1px #000;
     -moz-box-shadow: 2px 5px 1px #000;
          box-shadow: 2px 5px 1px #000;
}
```

#### 嵌套

（1）基本使用

```css
a {
  color: blue;
  &:hover {
    color: green;
  }
}

//编译后
a {
  color: blue;
}
a:hover {
  color: green;
}
```

（2）生成重复类名

```css
.button {
  &-ok {
    background-image: url("ok.png");
  }
  &-cancel {
    background-image: url("cancel.png");
  }

  &-custom {
    background-image: url("custom.png");
  }
}

//输出
.button-ok {
  background-image: url("ok.png");
}
.button-cancel {
  background-image: url("cancel.png");
}
.button-custom {
  background-image: url("custom.png");
}
```

（3）多个 &

```css
.link {
  & + & {
    color: red;
  }

  & & {
    color: green;
  }

  && {
    color: blue;
  }

  &, &ish {
    color: cyan;
  }
}

//输出
.link + .link {
  color: red;
}
.link .link {
  color: green;
}
.link.link {
  color: blue;
}
.link, .linkish {
  color: cyan;
}
```

（4）更改选择器顺序 将选择器添加到继承的（父）选择器之前可能很有用。这可以通过将 & 放在当前选择器之后来完成，如下所示：

```css
.header {
  .menu {
    border-radius: 5px;
    .no-borderradius & {
      background-image: url('images/button-background.png');
    }
  }
}

//输出
.header .menu {
  border-radius: 5px;
}
.no-borderradius .header .menu {
  background-image: url('images/button-background.png');
}
```

#### 操作

算术运算 +、-、*、/ 可以对任何数字、颜色或变量进行运算。如果可能，数学运算会考虑单位并在加、减或比较之前转换数字。结果在最左边有明确说明的单位类型。如果转换不可能或没有意义，则忽略单位。不可能转换的例子：px 到 cm 或 rad 到 %。

```less
@conversion-1: 5cm + 10mm; // result is 6cm
@conversion-2: 2 - 3cm - 5mm; // result is -1.5cm
```

#### 转义

转义允许你使用任意字符串作为属性或变量值。`~"anything"` 或 `~'anything'` 中的任何内容都按原样使用，除了 插值 之外没有任何变化,如下所示：

```less
@min768: ~"(min-width: 768px)";
.element {
  @media @min768 {
    font-size: 1.2rem;
  }
}

//编译结果
@media (min-width: 768px) {
  .element {
    font-size: 1.2rem;
  }
}
```

从 Less 3.5 开始，你可以简单地写

```less
@min768: (min-width: 768px);
.element {
  @media @min768 {
    font-size: 1.2rem;
  }
}
```

### 函数

Less 提供了许多函数，可以转换颜色、操作字符串和进行数学运算

#### 逻辑函数

（1）if，和js的`if`一样的条件语句，根据条件返回两个值之一。具体使用如下所示

```less
@some: foo;

div {
    margin: if((2 > 1), 0, 3px);
    color:  if((iscolor(@some)), @some, black);
}

//编译结果
div {
    margin: 0;
    color:  black;
}


if(not (true), foo, bar);
if((true) and (2 > 1), foo, bar);
if((false) or (isstring("boo!")), foo, bar);
```

（2）boolean，使用如下：

```less
@bg: black;
@bg-light: boolean(luma(@bg) > 50%);

div {
  background: @bg; 
  color: if(@bg-light, black, white);
}

//结果
div {
  background: black;
  color: white;
}
```

#### 字符串函数

（1）`escape` 将字符串转为URL编码，例：

```javascript
escape('a=1')

//输出
a%3D1
```

（2）`e` 字符串转译：字符串作为参数并按原样返回其内容，但不带引号。它可用于输出无效 CSS 语法或使用 Less 无法识别的专有语法的 CSS 值。例：

```less
@mscode: "ms:alwaysHasItsOwnSyntax.For.Stuff()" 
filter: e(@mscode);

//输出
filter: ms:alwaysHasItsOwnSyntax.For.Stuff();
```

（2）% 格式 函数 %(string, arguments ...) 格式化一个字符串。第一个参数是带占位符的字符串。所有占位符都以百分比符号 % 开头，后跟字母 s、S、d、D、a 或 A。其余参数包含用于替换占位符的表达式。如果你需要打印百分比符号，请使用另一个百分比 %% 将其转义。 例：

```perl
format-a-d: %("repetitions: %a file: %d", 1 + 2, "directory/file.less");
format-a-d-upper: %('repetitions: %A file: %D', 1 + 2, "directory/file.less");
format-s: %("repetitions: %s file: %s", 1 + 2, "directory/file.less");
format-s-upper: %('repetitions: %S file: %S', 1 + 2, "directory/file.less");

//输出
format-a-d: "repetitions: 3 file: "directory/file.less"";
format-a-d-upper: "repetitions: 3 file: %22directory%2Ffile.less%22";
format-s: "repetitions: 3 file: directory/file.less";
format-s-upper: "repetitions: 3 file: directory%2Ffile.less";
```

（3）replace，字符串替换

```php
replace("Hello, Mars?", "Mars\?", "Earth!");
replace("One + one = 4", "one", "2", "gi");
replace('This is a string.', "(string)\.$", "new $1.");
replace(~"bar-1", '1', '2');

//结果
"Hello, Earth!";
"2 + 2 = 4";
'This is a new string.';
bar-2;
```

#### 列表函数

（1）length，返回值列表中的元素数，示例：

```less
@list: "banana", "tomato", "potato", "peach";
n: length(@list);
//输出
n: 4;
```

（2）extract，返回列表中指定位置的值，示例：

```less
@list: apple, pear, coconut, orange;
value: extract(@list, 3);

//输出
value: coconut;
```

（3）range 生成跨越一系列值的列表,（初始值、最终值、增加量）

```css
value: range(4);
value: 1 2 3 4;

value: range(10px, 30px, 10);
value: 10px 20px 30px;
```

（4）each将规则集的评估绑定到列表的每个成员

```less
@selectors: blue, green, red;

each(@selectors, {
  .sel-@{value} {
    a: b;
  }
});

//输出
.sel-blue {
  a: b;
}
.sel-green {
  a: b;
}
.sel-red {
  a: b;
}
```

#### 数学函数

由于大部分数学函数我们在使用js时已经接触很多，我在这就不逐一举例了，小伙伴们可以自己动手试试。 `cell`:四舍五入到下一个最高整数
`floor`:向下舍入到下一个最小整数
`percentage`:将浮点数转换为百分比字符串。
`round`:舍入
`sqrt`:计算数字的平方根。保持单位不变
`abs`:计算数字的绝对值。保持单位不变
`sin、asin、cos、acos、tan、atan`:数学知识，自行补充。
`pow`:返回第一个参数的第二个参数次方的值。
`min、max`:最大最小值

#### 类型函数

用于判断值是否属于某个类型，具体的函数如下： `isnumber`、`isstring`、`iscolor`、`iskeyword`、`isurl`、`ispixel`、`isem`、`ispercentage`、`isunit`、`isruleset`、`isdefined`

#### 杂项函数

`color`:解析颜色，表示颜色的字符串成为颜色。 `image-size`:从文件中获取图片尺寸。 `image-width`:从文件中获取图片宽度。 `image-height`:从文件中获取图片高度。 `convert`:将数字从一种单位转换为另一种单位。示例：

```scss
convert(9s, "ms")
convert(14cm, mm)
convert(8, mm) 
//结果
9000ms
140mm
8
```

### 命名空间

假设你想在 #bundle 下打包一些混入和变量，以供以后重用或分发

```css
#bundle() {
  .button {
    display: block;
    border: 1px solid black;
    background-color: grey;
    &:hover {
      background-color: white;
    }
  }
  .tab { ... }
  .citation { ... }
}
```

现在如果我们想在我们的 #header a 中混合 .button 类，我们可以这样做：

```less
#header a {
  color: orange;
  #bundle.button();  // can also be written as #bundle > .button
}
```

### 映射

从 Less 3.5 开始，你还可以使用混入和规则集作为值映射。类似于js的map

```css
#colors() {
  primary: blue;
  secondary: green;
}

.button {
  color: #colors[primary];
  border: 1px solid #colors[secondary];
}

//结果
.button {
  color: blue;
  border: 1px solid green;
}
```

### 作用域

Less 中的作用域与 CSS 中的作用域非常相似。首先在本地查找变量和混入，如果找不到，则从 "父级" 作用域继承。

```less
@var: red;

#page {
  @var: white;
  #header {
    color: @var; // white
  }
}
```

**延迟加载**

以下代码都是有效的

```less
.lazy-eval {
  width: @var;
}

@var: @a;
@a: 9%;

.lazy-eval {
  width: @var;
  @a: 9%;
}

@var: @a;
@a: 100%;
```

都可以进行正确的编译，编译成如下结果

```css
.lazy-eval {
  width: 9%;
}
```

### 注释

块式注释和行内注释都可以使用：

```less
/* One heck of a block
 * style comment! */
@var: red;

// Get in line!
@var: white;
```