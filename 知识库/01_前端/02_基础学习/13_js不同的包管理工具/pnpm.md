# pnpm简介和使用

作为一名前端程序媛👨🏻‍💻，对`npm`和`yarn`这两个包管理器一定不陌生，那么你听说过[pnpm](https://link.juejin.cn?target=https%3A%2F%2Fpnpm.io%2F)么？它到底是个什么东西？和npm还有yarn有什么区别，又有什么作用呢？本文就将解决以下这几个问题：

1. `pnpm`是什么？有什么作用
2. `pnpm`有什么优势和特点
3. `pnpm`与`npm`和`yarn`有什么不同？
4. `pnpm`如何安装和使用

# pnpm是什么

快速的，节省磁盘空间的包管理工具

> ```
> Fast, disk space efficient package manager
> ```

通过`pnpm`的简介我们可以看出来它实际上就是一个包管理工具，作用是跟`npm`和`yarn`一样的呢。那既然功能是一样的为什么又要出现一个`pnpm`呢？通过官方的文档我们可以看出来它的优势在于：

- 包安装速度极快
- 磁盘空间利用效率高

# `pnpm`有什么优势和特点

我们上面提到了pnpm的优势在于*包安装速度极快*和*磁盘空间利用效率高*。

## 包安装速度极快

比传统方案安装包的速度快了两倍，以下是官方给出的[benchmarks](https://link.juejin.cn?target=https%3A%2F%2Fpnpm.io%2Fzh%2Fbenchmarks)(对比了npm, pnpm, Yarn Classic, and Yarn PnP)，在多种常见情况下，执行install的速度比较

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/61e985c6fdc54697a014f6f2383377e6~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

为什么pnpm要比其他的包处理器要快呢？

主要得益于它的包管理机制，实现了节约磁盘空间并提升安装速度（也就是第二个优势）

## 磁盘空间利用效率高

pnpm 的 `node_modules` 布局使用符号链接来创建依赖项的嵌套结构。`node_modules` 中每个包的每个文件都是来自内容可寻址存储的硬链接。

那么为什么说pnpm这种`基于内容寻址`的方式对磁盘空间利用效率比较高呢

- 不会重复安装同一个包。使用`npm/yarn` 的时候，如果100个包依赖`express` ，那么就可能安装了100次`express` ，磁盘中就有100个地方写入了这部分代码。但是`pnpm`会只在一个地方写入这部分代码，后面使用会直接使用硬链接

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/36d5260c0e094fbfa2a7865b362bda51~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

- 即使一个包的不同版本，pnpm 也会极大程度地复用之前版本的代码。举个例子，比如 `express4.18.1` 和`epxress5.0.0-beta.1`的两个版本升级对比，`epxress5.0.0-beta.1`只是重新下载了19个新的更新的包。

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7c2f15f6ebbe4bfb842a0cebfb440d18~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

# `pnpm`与`npm`和`yarn`有什么不同？

`pnpm`与`npm`和`yarn`的不同点主要是从包的依赖管理方面来说明。

## npm2的依赖管理

npm2生成的依赖管理比较的简单直接，会按照安装包的依赖树形结构直接填充在本地的目录结构下：

比如`express`和`koa`他们会同时依赖`accepts`，那么在`install`之后生成的`node_modules`就会是如下结构：

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ca8280d3e3924f7aa8393083fafeab60~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

npm2的这种方式的优点就是`比较的直观`，但是呢缺点也是显而易见的就是

1. 层级依赖过深
2. 相同包的相同版本会多次被下载，利用率低，占用磁盘空间大

## npm3/yarn的依赖管理

针对npm2的两个缺点呢，npm3做了个改变，不再使用嵌套的结构了，而是讲依赖进行打平，这样就能解决层级依赖深和包的利用率的问题，那么上面的依赖关系就会变成下面这个样子：

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f7965c8b2807473089ccc32f3af65854~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

在文件里看就是下面的这个样子(为了方便观看，把其他依稀依赖包手动删除了😁)：

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cda71f1803cc453e80d3c84a48b40eb7~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

我们可以看出，`express@4.18.1`和`koa@2.13.4`引用了`accepts`的版本是一样的，这样才会被平铺在`node_modules`下，那如果引用的包的版本不一样又是什么样的情况呢？就像`debug`,`http-errors` 、`statuses`等这几个包

- `express@4.18.1`引入的是:`debug@2.6.9`、`http-errors@2.0.0`、`statuses@2.0.1`
- `koa@2.13.4`引入的是:`debug@4.3.2`、`http-errors@1.6.3`、`statuses@1.5.0`

此时，在`node_modules`结构是下面这个样子：

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a8104610094742918d48d7b201f25316~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/775dde9c54d54657935f2e301a4dfcb0~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

至于为什么说`express@4.18.1`的依赖包会在根目录的`node_modules`下呢，这是npm自己的一个规则，具体可以看一下[与你项目相关的npm知识总结](https://juejin.cn/post/6933167787435261959)

npm3的这种平铺方式确实是解决了层级依赖深和包的利用率的问题，但是也引入了其他的问题：

1. 对没有手动引入的包，例如`express@4.18.1`依赖的`cookie`，项目中手动引入，但是依然可以使用，这样就造成了如果哪天express改变了策略不在使用cookie，而我们的项目中又使用了cookie，这样就会导致项目无法启动
2. 虽然npm是共享了相同版本的依赖，但是如果版本不同，npm还是会完整的下载两个不同的版本，这样也会有依赖的冗余

## [pnpm的依赖](https://link.juejin.cn?target=https%3A%2F%2Fpnpm.io%2Fzh%2Fsymlinked-node-modules-structure)

pnpm为了解决npm3带来的一些问题呢，采用了另外一种方式来管理依赖：pnpm 的 `node_modules` 布局使用符号链接来创建依赖项的嵌套结构管。

`node_modules` 中`.pnpm`下每个包的每个文件都是来自内容可寻址存储的硬链接。

这是 `node_modules` 中的唯一的“真实”文件。 一旦所有包都硬链接到 `node_modules`，就会创建符号链接来构建嵌套的依赖关系图结构。

我们用pnpm安装一下`express@4.18.1`和`koa@2.13.4`，生成的目录如下所示：

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7985ada5da2442638dae3fa4ab2f4465~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

在`node_modules`中的依赖只有在`package.json`中手动引入的依赖`express`和`koa`，细心的你会发现这两个文件后面有一个箭头，而这个箭头就是pnpm使用的软连接的方式指向了`.pnpm`文件真正的文件：

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0d243d8fe2dc4368a5a0db881406ff8a~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

这些文件会在内存中统一存储，如果有依赖不同版本的时候，pnpm也只会下载不同版本中不同的内容。对比

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/56257d6edf414ae89339033ff8f17e57~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

> **小课堂：硬链接和软连接的区别**
>  linux下有两种链接，一种是`硬链接（Hard Link）`，另一种是`符号链接(Symbolic Link)`，也可以称之为软连接
>
> - `硬链接`：只能引用同一文件系统中的文件。它引用的是文件在文件系统中的物理索引（inode）。当移动或者删除原始文件时，硬链接不会被破坏，因为它所引用的是文件的物理数据而不是文件在文件结构中的位置。硬链接记录的是目标的inode。同一文件的不同硬链接文件相当于该文件的多个不同文件名，即多个不同访问路径，他们的inode都是一样的。不可以为目录创建软连接。
> - `符号链接`：和原文件不是同一个文件，符号链接会有自己的inode，它所引用的是原文件的path，当原文件被移动或删除的时候，符号链接的文件就不可以。例如windows中的快捷方式。也可以为目录创建软连接。 如何建立硬链接和软连接呢 可以使用`ln`命令来创建
> - `ln 原文件名 硬链接文件名`, 例如： `ln file hardfile`,就是创建了`file`文件的硬链接文件`hardfile`
> - `ln -s 原文件名 硬链接文件名`,例如： `ln -s file softfile`,就是创建了`file`文件的硬链接文件`softfile` 在系统中查看操作一遍（执行以下命令）
>
> ```cmd
> cmd复制代码touch file && echo 'thisi is init file' > file
> ln file hardfile
> ln -s file softfile 
> ln -ls
> ```
>
> ![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/15369e26450440d1a00828bf2d2cece3~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?) 可以看到`hardfile`和`file`的inode是一样的（最左侧的33038778），而`softfile`是有了一个自己的inode
>  此时如果删除`file`文件 `rm file`，再去查看`hardfile`和`softfile`看一下有什么变化
>
> ```cmd
> cmd复制代码cat hardfile
> cat softfile
> ```
>
> 此时会发现，`hardfile`文件是不受影响的,`softfile`已经不存在了，因为它链接到的`file`已经不存在了 ![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6208555e5436451cbf2d6eb54020dbd8~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

## 其他对比

以下是官方给出的`pnpm`与`npm`和`yarn`的对比

| 标题                     | pnpm                                                         | yarn                 | npm                     |
| ------------------------ | ------------------------------------------------------------ | -------------------- | ----------------------- |
| 工作空间支持（monorepo） | ✔️                                                            | ✔️                    | ✔️                       |
| 隔离的 `node_modules`    | ✔️ - 默认                                                     | ✔️                    | ❌                       |
| 提升的 `node_modules`    | ✔️                                                            | ✔️                    | ✔️ - 默认                |
| 自动安装 peers           | ✔️ - 通过 [auto-install-peers=true](https://link.juejin.cn?target=https%3A%2F%2Fpnpm.io%2Fzh%2Fnpmrc%23auto-install-peers) | ❌                    | ✔️                       |
| Plug'n'Play              | ✔️                                                            | ✔️ - 默认             | ❌                       |
| 零安装                   | ❌                                                            | ✔️                    | ❌                       |
| 修补依赖项               | ❌                                                            | ✔️                    | ❌                       |
| 管理 Node.js 版本        | ✔️                                                            | ❌                    | ❌                       |
| 有锁文件                 | ✔️ - `pnpm-lock.yaml`                                         | ✔️ - `yarn.lock`      | ✔️ - `package-lock.json` |
| 支持覆盖                 | ✔️                                                            | ✔️ - 通过 resolutions | ✔️                       |
| 内容可寻址存储           | ✔️                                                            | ❌                    | ❌                       |
| 动态包执行               | ✔️ - 通过 `pnpm dlx`                                          | ✔️ - 通过 `yarn dlx`  | ✔️ - 通过 `npx`          |

# 安装和使用

## 安装

### 使用独立脚本

```
curl -fsSL https://get.pnpm.io/install.sh | sh -`
 或者
 `wget -qO- https://get.pnpm.io/install.sh | sh -
```

### 使用npm安装

```
npm install -g pnpm
```

### 使用homebrew安装

```
brew install pnpm
```

## 使用

以下是列出常用的命令，具体可以参考官网[管理依赖](https://link.juejin.cn?target=https%3A%2F%2Fpnpm.io%2Fzh%2Fcli%2Fadd)

### 安装依赖包

```
pnpm add <pkg>
```

| Command              | Meaning                       |
| -------------------- | ----------------------------- |
| `pnpm add sax`       | 保存到 `dependencies`         |
| `pnpm add -D sax`    | 保存到 `devDependencies`      |
| `pnpm add -O sax`    | 保存到 `optionalDependencies` |
| `pnpm add -g sax`    | Install package globally      |
| `pnpm add sax@next`  | 从 `next` 标签下安装          |
| `pnpm add sax@3.0.0` | 安装指定版本 `3.0.0`          |

### 下载所有依赖

```
pnpm install` or `pnpm i
```

### 指定的范围更新软件包的最新版本

```
pnpm update` or `pnpm up
```

| Command              | Meaning                                                |
| -------------------- | ------------------------------------------------------ |
| `pnpm up`            | 遵循 `package.json` 指定的范围更新所有的依赖项         |
| `pnpm up --latest`   | 更新所有依赖项，此操作会忽略 `package.json` 指定的范围 |
| `pnpm up foo@2`      | 将 `foo` 更新到 v2 上的最新版本                        |
| `pnpm up "@babel/*"` | 更新 `@babel` 范围内的所有依赖项                       |

### 删除依赖

```
pnpm remove` or `pnpm rm` or `pnpm uninstall` or `pnpm un
```

### 运行脚本

- 运行一个在 `package`的 manifest 文件中定义的脚本:`pnpm run`
- 运行在` package` 的` scripts` 对象中`test` 属性指定的任意的命令:`pnpm test`
- 从 `create-*` 或 `@foo/create-*` 启动套件创建项目:`pnpm create`,例如`pnpm create react-app my-app`
- 运行在` package` 的` scripts` 对象中`start` 属性指定的任意的命令:`pnpm start` or`run start`

参考文章
 [剖析Npm、Yarn 与 Pnpm 依赖管理逻辑](https://link.juejin.cn?target=https%3A%2F%2Fdeveloper.51cto.com%2Farticle%2F692882.html)

[什么是PNPM？](https://link.juejin.cn?target=https%3A%2F%2Fwww.jianshu.com%2Fp%2Fa805e182798f)

[关于现代包管理器的深度思考——为什么现在我更推荐 pnpm 而不是 npm/yarn?](https://juejin.cn/post/6932046455733485575)

[为什么推荐使用pnpm](https://link.juejin.cn?target=https%3A%2F%2Fzhuanlan.zhihu.com%2Fp%2F419399115)

[都2022年了，pnpm快到碗里来！](https://link.juejin.cn?target=https%3A%2F%2Fzhuanlan.zhihu.com%2Fp%2F457698236)



作者：我就是小傲娇
链接：https://juejin.cn/post/7114117329687937032
来源：稀土掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。