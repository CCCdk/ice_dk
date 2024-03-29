# 一文了解 SVG！！！😏

## 初识 SVG

SVG（Scalable Vector Graphics）是一种用于描述二维矢量图形的 XML 标记语言。它可以被用来创建图形和动画，通常用于 Web 开发中，因为它可以无损缩放而不会失真。

> - SVG 标签是 SVG 图形的一个容器。
> - 基本语法：`<svg></svg>`。
> - `<svg></svg>` 里面包含了很多标签，用于绘制各种图形。
> - SVG 也可以理解为绘制图形的画布。width 用于定义画布的宽度，height用于定义画布的高度。

SVG 有一些预定义的形状元素供开发者使用：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d6979e0978734998bd846247e34e65eb~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1320&h=609&s=285868&e=png&b=ffffff)

## SVG 绘制矩形、圆形和椭圆形

### 矩形

绘制矩形使用 `rect` 标签，基本语法为：`<rect />`。

```xml
<rect x="x坐标" y="y坐标" width="矩形宽度" height="矩形高度" fill="填充颜色" stroke="边框颜色" stroke-width="边框宽度" />
```

基本属性有：

- `x`：矩形左上角的 x 坐标。
- `y`：矩形左上角的 y 坐标。
- `width`：矩形的宽度。
- `height`：矩形的高度。
- `fill`：矩形的填充颜色。
- `stroke`：矩形边框的颜色。
- `stroke-width`：矩形边框的宽度。
- `rx`: 指定矩形四个角的水平圆角半径。如果指定了 `rx` 而没有指定 `ry`，则 `ry` 默认等于 `rx`。
- `ry`: 指定矩形四个角的垂直圆角半径。如果没有指定 `ry`，则 `ry` 默认等于 `rx`。
- `opacity`: 指定矩形的不透明度，取值范围为 0（完全透明）到 1（完全不透明）

例如：绘制了一个蓝色填充、黑色边框的矩形，左上角坐标为 (10, 10)，宽度为 80，高度为 50，边框宽度为 2。

```xml
<svg width="100" height="100">
  <rect x="10" y="10" width="80" height="50" fill="blue" stroke="black" stroke-width="2" />
</svg>
```

### 圆形

绘制圆形使用 `circle` 标签，基本语法为：`<circle />`。

```xml
<circle cx="圆心x坐标" cy="圆心y坐标" r="半径" fill="填充颜色" stroke="边框颜色" stroke-width="边框宽度" />
```

基本属性有：

- `cx`：圆心的 x 坐标。
- `cy`：圆心的 y 坐标。
- `r`：圆形的半径。
- `fill`：圆形的填充颜色。
- `stroke`：圆形边框的颜色。
- `stroke-width`：圆形边框的宽度。

例如：绘制一个填充颜色为红色、边框颜色为黑色的圆形，圆心坐标为 (50, 50)，半径为 30，边框宽度为 1。

```xml
<svg width="100" height="100">
  <circle cx="50" cy="50" r="30" fill="red" stroke="black" stroke-width="1" />
</svg>
```

### 椭圆

绘制圆形使用 `ellipse` 标签，基本语法为：`<ellipse/>`。

```xml
<ellipse cx="椭圆中心的 x 坐标" cy="椭圆中心的 y 坐标" rx="椭圆水平半径" ry="椭圆垂直半径" fill="填充颜色" stroke="边框颜色" stroke-width="边框宽度" />
```

基本属性有：

- `cx`: 指定椭圆的中心点的 x 坐标。
- `cy`: 指定椭圆的中心点的 y 坐标。
- `rx`: 指定椭圆在 x 轴方向上的半径长度。
- `ry`: 指定椭圆在 y 轴方向上的半径长度。
- `fill`: 指定椭圆的填充颜色。
- `stroke`: 指定椭圆的边框颜色。
- `stroke-width`: 指定椭圆的边框宽度。
- `opacity`: 指定椭圆的透明度（取值范围为 0 到 1，0 表示完全透明，1 表示完全不透明）。

例如：绘制一个中心位于 (100, 50) 的椭圆，x 轴半径为 80，y 轴半径为 30，填充颜色为天蓝色，边框颜色为深蓝色，边框宽度为 2，透明度为 0.8。

```xml
<svg width="200" height="100">
  <ellipse cx="100" cy="50" rx="80" ry="30" fill="skyblue" stroke="navy" stroke-width="2" opacity="0.8" />
</svg>
```

## SVG 绘制线条、多边形和多线条

### 绘制线条 `<line />`

使用 `<line />` 标签可以在 SVG 中绘制直线。

```xml
<line x1="起点x坐标" y1="起点y坐标" x2="终点x坐标" y2="终点y坐标" stroke="线条颜色" stroke-width="线条宽度" />
```

基本属性有：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f720e13501544673815f78ff80fe1177~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=570&h=448&s=70815&e=png&b=053a4d)

- `x1`, `y1`: 起点坐标
- `x2`, `y2`: 终点坐标
- `stroke`: 线条颜色
- `stroke-width`: 线条宽度

例如：绘制一条起点坐标为(50, 50)，终点坐标为(150, 150)的直线。

```xml
<svg width="200" height="200">
  <line x1="50" y1="50" x2="150" y2="150" stroke="black" stroke-width="2" />
</svg>
```

> 注意：SVG 所有图形的绘制坐标的起点都是在画布的左上角！

### 绘制多边形 `<polygon />`

使用 `<polygon />` 标签**可以在 SVG 中绘制多边形**。它用于创建一个至少包含三个边的图形，**要求封闭**。

```xml
<polygon points="x1,y1 x2,y2 x3,y3 ..." fill="color" stroke="color" stroke-width="width" />
```

基本属性有：

- `points`: 多边形各个顶点坐标。
- `fill`: 填充颜色。
- `stroke`: 边框颜色。
- `stroke-width`: 边框宽度。

例如：绘制一个填充为黄色的四边形。

```xml
<svg width="200" height="200">
  <polygon points="100,50 150,100 100,150 50,100" fill="yellow" stroke="black" stroke-width="2" />
</svg>
```

> 注意：每个点的坐标用空格隔开！

### 绘制多条线 `<polyline />`

使用 `<polyline />` 标签**可以在 SVG 中绘制多条线段**。它可以创建任何只由直线组成的形状，一般是把几个点连接起来，**不要求封闭。**

```xml
<polyline points="x1,y1 x2,y2 x3,y3 ..." fill="none" stroke="color" stroke-width="width" />
```

基本属性有：

- `points`: 线段各个端点坐标。
- `fill`: 填充颜色（通常为`none`）。
- `stroke`: 线条颜色。
- `stroke-width`: 线条宽度。

例如：绘制一条由三个端点构成的折线。

```xml
<svg width="200" height="200">
  <polyline points="50,50 100,100 150,50" fill="none" stroke="blue" stroke-width="2" />
</svg>
```

## SVG 绘制文本

### `<text>` 标签

当在SVG中绘制文本时，可以使用 `<text></text>` 元素来实现。

```xml
<text x="x坐标" y="y坐标">要显示的文本</text>
```

- `x` 和 `y` 属性用于指定文本的起始位置。这些属性通常是相对于SVG画布左上角的位置。
- 在 `<text></text>`元素内部放置要显示的文本内容。

除了 `x` 和 `y` 属性之外，还可以使用其他属性来调整文本的外观，例如：

- `font-family`：指定文本的字体系列，如 `"Arial"`, `"Verdana"`, `"Helvetica"` 等。
- `font-size`：指定文本的字体大小。
- `font-weight`：指定文本的字体粗细，如 `"normal"`, `"bold"`。
- `font-style`：指定文本的字体样式，如 `"normal"`, `"italic"`, `"oblique"`。
- `fill`：指定文本的填充颜色。
- `text-anchor`：指定文本的对齐方式，有 `"start"`, `"middle"`, `"end"` 三种选项。
  - start：以文本的左端对齐
  - middle：以文本的中间对齐
  - end：以文本的末尾对齐
- `transform`：用于对文本进行变换，如平移、旋转等操作。

例如：文本 “Hello, SVG!” 将会在 SVG 画布上的坐标 (10, 50) 处以 20px 的 Arial 字体显示，并使用黑色填充颜色。

```xml
<svg width="200" height="100">
  <text x="10" y="50" font-family="Arial" font-size="20" fill="black">Hello, SVG!</text>
</svg>
```

### `<tspan>` 标签

在SVG中，除了 `<text>` 标签外，还可以结合使用 `<tspan>` 标签来对文本进行更精细的控制。

`<tspan></tspan>` 标签可以用来设置文本的不同样式，包括颜色、字体大小、字体粗细等。通过在 `<text></text>` 标签内部嵌套多个 `<tspan></tspan>` 标签，可以实现对文本的分段样式设置。

例如：第一个 `tspan` 标签设置文本 “Hello” 的颜色为红色，第二个 `tspan` 标签设置文本 “World” 的颜色为蓝色并加粗。

```xml
<svg width="200" height="100">
  <text x="10" y="30">
    <tspan fill="red">Hello</tspan>
    <tspan fill="blue" font-weight="bold">World</tspan>
  </text>
</svg>
```

### 文本添加外链

关于如何在SVG文本中添加链接，一种常见的做法是使用 `<a>` 标签来包裹文本内容，并设置 `xlink:href` 属性指定链接地址。

例如：`<a>` 标签包裹了文本内容，并设置了 `xlink:href` 属性为链接地址，用户点击文本时将跳转到指定的网页。这样就可以在 SVG 中创建可点击的链接文本。

```xml
<svg width="200" height="100">
  <a xlink:href="https://www.example.com">
    <text x="10" y="30">Click here to visit Example website</text>
  </a>
</svg>
```

## SVG 绘制路径

在 SVG 中，路径由一个或多个路径指令组成，每个路径指令表示了一种绘制操作。路径指令由字母和数字组成，字母表示操作类型，数字表示坐标或参数。

一个基本的路径元素的定义如下：

```xml
<path d="M x1 y1 L x2 y2" />
```

> `d` 属性用来定义路径指令，其中 `M` 表示移动到指定坐标，`L` 表示画一条直线到指定坐标。

例如：

```xml
<path d="M 150 0 l 75 200" />
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c590d22814af4f5a9592ddd6c6b900e8~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1153&h=298&s=108930&e=png&b=053a4d)

> 注意：可以看到上述例子的 M 是大写，l 是小写！需要注意的是：大写字母表示绝对定位，小写字母表示相对定位。**绝对定位是相对于屏幕坐标原点的位置。相对定位是相对于上一个绘制点的位置。**

### 常见路径指令

- `M x y`：移动到指定坐标
- `L x y`：画一条直线到指定坐标
- `H x`：画一条水平线到指定 x 坐标
- `V y`：画一条垂直线到指定 y 坐标
- `Z`：闭合路径

## SVG 描边属性

所有的描边属性都可以应用于任何类型的线条、文本和元素的轮廓。

当在 SVG 中绘制形状时，可以为这些形状定义描边（Stroke）属性，以控制描边的样式、颜色、宽度等。以下是一些常用的 SVG 描边属性：

1. **stroke**: 描边的颜色。可以使用颜色名称、十六进制值、RGB值等来定义。

   ```xml
   <rect x="10" y="10" width="100" height="50" stroke="red" />
   ```

2. **stroke-width**: 描边的宽度。指定描边的粗细程度，值为正数。

   ```xml
   <circle cx="50" cy="50" r="30" stroke="blue" stroke-width="2" />
   ```

3. **stroke-opacity**: 描边的透明度。值为0（完全透明）到1（完全不透明）之间的数字。

   ```xml
   <line x1="10" y1="10" x2="50" y2="50" stroke="green" stroke-opacity="0.5" />
   ```

4. **stroke-linecap**: 描边端点的形状。可以是`butt`（默认）、`round`或`square`，分别表示平直、圆形或方形的端点。

   ```xml
   <line x1="10" y1="10" x2="50" y2="50" stroke="black" stroke-linecap="round" />
   ```

5. **stroke-linejoin**: 描边拐角的形状。可以是`miter`（默认）、`round`或`bevel`，分别表示尖角、圆角或斜角。

   ```xml
   <polyline points="50,50 100,25 150,50" stroke="purple" stroke-linejoin="round" />
   ```

6. **stroke-dasharray**: 描边虚线模式。可以指定一系列数字来定义实线和虚线的间隔，例如`"5,3"`表示5像素实线，3像素虚线。

   ```xml
   <path d="M10 10 L90 10" stroke="orange" stroke-dasharray="5,3" />
   ```

## SVG 模糊和阴影效果

SVG 中的模糊和阴影效果可以让图形看起来更加生动和具有立体感。

> 给 SVG 图形添加特殊效果，可以通过 `filter` 元素来实现：
>
> - 基本的语法为`<filter></filter>`
> - `filter` 元素里面包含一个或多个效果滤镜。
> - `filter` 元素有一个必要的 id 属性，用于识别过滤器。图形通过这个 id 指向要使用的过滤器。
> - `filter` 元素都是在 `defs` 元素中定义的。
> - 模糊效果可以通过 `feGaussianBlur` 滤镜来创建。(`feGaussianBlur` 通过 stdDeviation 属性定义模糊的数量。值越大模糊的程度就越高。)

### 模糊效果

SVG 中的模糊效果可以通过 `filter` 元素和 `feGaussianBlur` 滤镜来实现。例如：

```xml
<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="blur">
      <feGaussianBlur in="SourceGraphic" stdDeviation="5" />
    </filter>
  </defs>
  <circle cx="100" cy="100" r="50" fill="blue" filter="url(#blur)" />
</svg>
```

### 阴影效果

- SVG 中的阴影效果可以通过 `filter` 元素和 `feDropShadow` 滤镜来实现。例如：

```xml
<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="dropshadow">
      <feDropShadow dx="2" dy="2" stdDeviation="2" flood-color="gray" />
    </filter>
  </defs>
  <rect x="50" y="50" width="100" height="100" fill="blue" filter="url(#dropshadow)" />
</svg>
```

- 通过 `feOffset` 和 `feBlend` 滤镜的组合来实现。

这种方法的原理是在 `feOffset` 滤镜中对元素进行指定方向的偏移，然后通过 `feBlend` 滤镜将原始元素和偏移后的元素进行混合，从而创建出阴影效果。例如：

```xml
<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="dropshadow" height="150%">
      <feOffset result="offOut" in="SourceGraphic" dx="2" dy="2" />
      <feBlend in="SourceGraphic" in2="offOut" mode="normal" />
    </filter>
  </defs>
  <rect x="50" y="50" width="100" height="100" fill="blue" filter="url(#dropshadow)" />
</svg>
```

## SVG 线性渐变和径向渐变

线性渐变和径向渐变是两种常用的渐变效果，它们可以让图形呈现出平滑过渡的色彩变化。

### 线性渐变（Linear Gradient）

线性渐变是一种色彩在两个或多个指定点之间按照一条直线方向过渡的效果。要在SVG中创建线性渐变，需要使用 `<linearGradient>` 元素，并指定渐变的起始点和结束点，以及渐变色彩的分布。

```xml
<linearGradient id="gradientId" x1="x1Value" y1="y1Value" x2="x2Value" y2="y2Value">
  <stop offset="offsetValue" stop-color="colorValue" stop-opacity="opacityValue" />
  <!-- 可以添加多个 stop 元素定义不同位置的颜色和透明度 -->
</linearGradient>
```

#### 基本语法

- `id` 属性：定义渐变的唯一标识符，以便在需要的地方引用。
- `x1`, `y1`：定义渐变起点的坐标。
- `x2`, `y2`：定义渐变终点的坐标。

#### **渐变方向**

- 渐变的方向由起点 `(x1, y1)` 和终点 `(x2, y2)` 决定。
- 如果 `x1 < x2`，渐变方向是从左到右；如果 `x1 > x2`，渐变方向是从右到左。
- 如果 `y1 < y2`，渐变方向是从上到下；如果 `y1 > y2`，渐变方向是从下到上。

简单来说，可以看此图：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/30e821c99d484078b814e3790954c20e~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=950&h=501&s=133241&e=png&b=043043)

#### `stop` 元素

- `offset` 属性：指定渐变的位置，取值范围为 0 到 1。
- `stop-color` 属性：定义当前位置的颜色。
- `stop-opacity` 属性：定义当前位置的透明度，取值范围为 0 到 1。

使用方法：通过引用 `linearGradient` 的 `id` 可以将渐变应用到图形的 `fill` 或 `stroke` 属性中。

例如：创建了一个线性渐变，从黄色过渡到红色，然后将这个渐变应用到一个矩形上。

```xml
<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="linearGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:rgb(255,255,0);stop-opacity:1" />
      <stop offset="100%" style="stop-color:rgb(255,0,0);stop-opacity:1" />
    </linearGradient>
  </defs>
  
  <rect x="10" y="10" width="180" height="180" fill="url(#linearGradient1)" />
</svg>
```

### 径向渐变（Radial Gradient）

径向渐变是一种色彩从中心向外围扩散或收缩的效果。在SVG中创建径向渐变需要使用 `<radialGradient>` 元素，并指定渐变的中心点、半径和渐变色彩的分布。

```xml
<radialGradient id="gradientID" cx="x_center" cy="y_center" r="radius" fx="focal_x" fy="focal_y">
    <stop offset="0%" stop-color="color1" />
    <stop offset="100%" stop-color="color2" />
</radialGradient>
```

#### 基本语法

- `id`: 渐变的唯一标识符。
- `cx`、`cy`: 渐变圆心的坐标，指定为百分比或长度值。
- `r`: 渐变圆的半径，也可以指定为百分比或长度值。
- `fx`、`fy`（可选）: 渐变焦点的坐标，指定为百分比或长度值。若未指定，默认为圆心坐标。
- `stop`: 用于定义渐变中的颜色和位置，可以有多个`stop`元素。

#### **渐变方向**

`cx` 和 `cy` 属性定义了渐变的中心点，而 `r` 属性定义了渐变的半径。这些属性一起定义了径向渐变的起始和结束点，控制了渐变的形状和大小。

#### **`stop`** **元素**

与`linearGradient`类似，`stop`元素也在`radialGradient`中扮演着关键的角色。可以使用`offset`属性来指定颜色停止点的位置，以及`stop-color`属性来定义该位置的颜色。

例如：创建了一个径向渐变，从黄色过渡到红色，并将这个渐变应用到一个圆形上。

```xml
<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="radialGradient1" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
      <stop offset="0%" style="stop-color:rgb(255,255,0);stop-opacity:1" />
      <stop offset="100%" style="stop-color:rgb(255,0,0);stop-opacity:1" />
    </radialGradient>
  </defs>
  
  <circle cx="100" cy="100" r="80" fill="url(#radialGradient1)" />
</svg>
```

## 其他内容

### `<g></g> `标签

SVG中的 `<g>` 标签是用来创建一个组（group）的元素。它可以包含多个子元素，比如图形元素、文本元素、甚至其他组元素。通过将多个元素放在一个`<g>`组中，可以方便地对它们进行整体的控制、移动、缩放或应用样式。`<g>`标签本身不会直接显示任何内容，它主要用来组织和管理其他SVG元素。

例如：两个矩形元素被包含在一个`<g>`组中，使它们作为一个整体进行处理。

```arduino
<svg width="200" height="200">
  <g width="50" height="50">
    <rect x="20" y="20" fill="red" />
    <rect x="80" y="20" fill="blue" />
  </g>
</svg>
```

### `<use></use> `标签

```xml
<use xlink:href="#id"></use>
```

基本属性有：

- `xlink:href`：指定要重复使用的 SVG 元素的 ID。需要加上`#`符号。
- `x`和`y`：可选属性，用于指定`<use>`标签在文档中的位置。

当涉及到在 SVG 中**重复使用相同元素或图形**时，`<use>` 标签是一个非常有用的工具。 `<use>` 标签用于复制已定义的 SVG 图形，并在文档中的不同位置多次使用它。

例如：假设有一个定义好的 SVG 元素

```xml
<svg>
  <circle id="myCircle" cx="50" cy="50" r="30" fill="green" />
</svg>
```

然后可以使用 `<use>` 标签来复制并重复使用该元素。

```xml
<svg>
  <use xlink:href="#myCircle" x="100" y="100" />
  <use xlink:href="#myCircle" x="200" y="200" />
</svg>
```