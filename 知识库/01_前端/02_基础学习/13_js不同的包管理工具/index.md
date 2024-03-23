# 包管理工具

npm  yarn pnpm

# pnpm、npm、yarn 包管理工具『优劣对比』及『环境迁移』

## 前言

博主在开发前端网站的时候，发现随着开发的项目的逐渐增多，安装的依赖包越来越臃肿，依赖包的安装速度也是非常越来越慢，多项目开发管理也是比较麻烦。之前我就了解过 `pnpm`，但是当时担心更换包管理环境可能会出现的依赖等问题，并且也没有急切的需求，所以当时并没有立即更换

综上所述，随着上面问题的出现，更换包管理环境也逐渐提上日程，所以本文主要将会简单对比 `pnpm 和 npm / yarn` ，并且详细讲解**如何在多项目环境中迁移到 `pnpm`**

![Pnpm安装与使用教程- 小白龙博客](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4e70ee42a1414b08aafa43fb2faa4c94~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1000&h=420&s=6156&e=webp&b=f9af01)

## 介绍

### npm v2

此时期主要是采用简单的**递归依赖**方法，最后形成**高度嵌套的依赖树**。然后就会造成如下问题：**重复依赖嵌套地狱，空间资源浪费，安装速度过慢，文件路径过长**等问题。大家都很熟悉，这里不再详细解释

### npm v3

v3 版本作了较大的更新，开始采取**扁平化**的依赖结构。这样的依赖结构可以很好的解决重复依赖的嵌套地狱问题，但是却出现**扁平化依赖算法耗时长**这样新的问题

官方仓库 issue 的解释：[npm@3 wants to be faster · Issue #8826 · npm/npm (github.com)](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fnpm%2Fnpm%2Fissues%2F8826)

### npm v5

为了解决上面出现的扁平化依赖算法耗时长问题，npm 引入 package-lock.json 机制，package-lock.json 的作用是锁定项目的依赖结构，保证依赖的稳定性，有兴趣的朋友可以直接查看官方文档

官方文档：[package.json | npm Docs (npmjs.com)](https://link.juejin.cn/?target=https%3A%2F%2Fdocs.npmjs.com%2Fcli%2Fv10%2Fconfiguring-npm%2Fpackage-json)

> 注：其实在 package-lock.json 机制出现之前，可以通过 npm-shrinkwrap 实现锁定依赖结构，但是 npm-shrinkwrap 默认关闭，需要主动执行。

### yarn

官网：[Home page | Yarn (yarnpkg.com)](https://link.juejin.cn/?target=https%3A%2F%2Fyarnpkg.com%2F)

首先需要提出的是 yarn 出现时间为 2016 年，此时 npm 处于 v3 时期，其实当时 yarn 解决的问题基本就是 npm v5 解决的问题，包括使用 yarn.lock 等机制，锁定版本依赖，实现并发网络请求，最大化网络资源利用率，其次还有利用缓存机制，实现了离线模式

其实后面很多 npm 都是在学习 yarn 的机制，上面的机制目前 npm 基本也都实现了，就目前而言 npm 和 yarn 其实并没有差异很大，具体使用 npm 还是 yarn 可以看个人需求

### pnpm

中文官网：[pnpm - 速度快、节省磁盘空间的软件包管理器 | pnpm中文文档 | pnpm中文网](https://link.juejin.cn/?target=https%3A%2F%2Fwww.pnpm.cn%2F)

pnpm 内部使用基于内容寻址的文件系统来存储磁盘上所有的文件，这样可以做到不会出现重复安装，在项目中需要使用到依赖的时候，pnpm 只会安装一次，之后再次使用都会直接**硬链接**指向该依赖，极大节省磁盘空间，并且加快安装速度

> 注：硬链接是多个文件名指向同一个文件的实际内容，而软链接（符号链接）是一个独立的文件，指向另一个文件或目录的路径

也许有人说 yarn 默认也是扁平化安装方式，但是 **yarn 有独特的 PnP 安装方式**，可以直接去掉 node_modules，将依赖包内容写在磁盘，节省了 node 文件 I/O 的开销，这样也能提升安装速度，但是 **yarn PnP 和 pnpm 机制是不同的**，且**总体来说安装速度 pnpm 是要快于 yarn PnP** 的，详情请看下面官方文档

> 官方文档：[Overview | Yarn (yarnpkg.com)](https://link.juejin.cn/?target=https%3A%2F%2Fclassic.yarnpkg.com%2Fen%2Fdocs%2Fpnp%2F)

最后就是 **pnpm 是默认支持 monorepo 多项目管理**的，在日渐复杂的前端多项目开发中尤其适用，也就说我们不再需要 lerna 来管理多包项目，可以使用 pnpm + Turborepo 作为我们的项目管理环境

> 配置工作空间官方文档：[工作空间（Workspace） | pnpm](https://link.juejin.cn/?target=https%3A%2F%2Fpnpm.io%2Fzh%2Fworkspaces)

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f4dedf9d940c4562875f2bc950a5f0e1~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=750&h=367&s=81994&e=png&b=fffefe)

还有就是 pnpm 还能管理 nodejs 版本，可以直接**替代 nvm**，命令如下所示

```bash
# 安装 LTS 版本
pnpm env use --global lts
# 安装指定版本
pnpm env use --global 16
```

## 迁移

迁移过程中主要有如下问题：因为使用 npm 或 yarn 安装依赖项时，所有包都被提升到模块目录的根目录。因此，**源代码可以访问未作为依赖项添加到项目的依赖项**。但是默认情况下，pnpm 使用链接仅将项目的**直接依赖**项添加到模块目录的根目录中

这意味着如果 package.json 没有引用的依赖，那么它将无法解析。这是迁移中的最大障碍。可以使用 [auto-install-peers](https://link.juejin.cn/?target=https%3A%2F%2Fpnpm.io%2Fnpmrc%23peer-dependency-settings) 设置自动执行此操作（默认情况下是false）

对于多个使用 npm 安装依赖的项目，单独删除依赖包很耗时间，我们可以使用 [npkill](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fvoidcosmos%2Fnpkill) ，该工具可以列出系统中的任何 node_modules 目录以及它们占用的空间。然后可以选择要删除的依赖以释放空间

![npkill-demo-0.10.0](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8e0c4736bd224a3fb986cc9c5645a28f~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=795&h=364&s=698923&e=gif&f=446&b=1d1f20)

首先全局安装包

```bash
npm i -g pnpm
```

迁移步骤如下

1.首先使用 npkill 删除 node_modules 依赖包

2.项目根目录创建 `.npmrc`，填写如下内容

```bash
auto-install-peers=true
```

3.导入依赖锁定文件（pnpm-lock.yaml）

保证根目录有如下依赖锁定文件（npm-shrinkwrap.json，package-lock.json，yarn.lock）

然后执行如下命令

```bash
pnpm import pnpm-lock.yaml
```

4，最后执行 `pnpm i` 安装依赖

## 问题

### 生成依赖文件警告

官方 issue 解释：[Unmet peer dependencies and The command -- pnpm/pnpm (github.com)](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fpnpm%2Fpnpm%2Fissues%2F4684)

生成 `pnpm-lock.yaml` 文件时出现如下警告

```bash
 WARN  Issues with peer dependencies found
.
└─┬ vuepress 1.9.9
  └─┬ @vuepress/core 1.9.9
    └─┬ vue-loader 15.10.1
      └─┬ @vue/component-compiler-utils 3.3.0
        └─┬ consolidate 0.15.1
          ├── ✕ unmet peer react-dom@^16.13.1: found 15.7.0
          └── ✕ unmet peer react@^16.13.1: found 15.7.0
```

这是因为在 npm 3 中，不会再强制安装 `peerDependencies` （对等依赖）中所指定的包，而是通过警告的方式来提示我们。**pnpm** 会在全局缓存已经下载过的依赖包，如果全局缓存的依赖版本与项目 `package.json` 中指定的版本不一致，就会出现这种 `hint` 警告

我们可以在项目的 `package.json` 中配置 `peerDependencyRules` 忽略对应的警告提示

```json
{
  "pnpm": {
    "peerDependencyRules": {
      "ignoreMissing": [
        "react"
      ]
    }
  }
}
```

或者说直接在 `.npmrc` 配置文件中直接关闭严格的对等依赖模式，可以添加 `strict-peer-dependencies=false` 到配置文件中，或者执行如下命令

```bash
npm config set strict-peer-dependencies=false
```

然后也可能会出现警告 `deprecated subdependencies found`，暂时可以忽略

### 幽灵依赖问题

在最后安装依赖的时候可能会出现`幽灵依赖`问题，幽灵依赖就是没有在`package.json`中，但是项目中，或者引用的包中使用到的依赖

举个例子，比如我们现在使用 npm 安装了 v-viewer 依赖，同时 `viewerjs` 是 `v-viewer` 的依赖项，由于扁平化依赖机制，我们可以在 `node_modules/v-viewer/package.json` 中看到声明的 `viewerjs` 依赖，即使项目根目录下的 `package.json` 没有声明 `viewerjs` 依赖，我们仍旧可以使用，这就是幽灵依赖

而现在我们切换为 `pnpm` 后，在默认情况下不允许访问未声明的依赖，有以下两种解决方案

1.自行安装未声明依赖项

> 幽灵依赖自动扫描工具：[@sugarat/ghost - npm (npmjs.com)](https://link.juejin.cn/?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2F%40sugarat%2Fghost)

```bash\
bash\
复制代码pnpm i -S viewerjs
```

或者说某些版本 pnpm 会自动爆出幽灵依赖错误 `missing peer ...`，也可以直接不使用上面的扫描工具，直接自行安装后面的 `...` 依赖

2.找到`.npmrc` 文件，在其中配置 `public-hoist-pattern` 或者 `shamefully-hoist` 字段，将依赖提升到根`node_modules` 目录下解决，也就是所谓的依赖提升

> 依赖提升官方文档：[.npmrc | pnpm](https://link.juejin.cn/?target=https%3A%2F%2Fpnpm.io%2Fzh%2Fnpmrc%23public-hoist-pattern)

```bash
# .npmrc
# 提升含有 eslint(模糊匹配)、prettier(模糊匹配)、viewerjs(精确匹配) 的依赖包到根 node_modules 目录下
public-hoist-pattern[]=*eslint*
public-hoist-pattern[]=*prettier*
public-hoist-pattern[]=viewerjs

# 提升所有依赖到根 node_modules 目录下，相当于 public-hoist-pattern[]=*，与上面一种方式一般二选一使用
shamefully-hoist=true
```

当然，**极不推荐用这样的方式解决依赖问题**，这样没有充分利用 `pnpm` 依赖访问安全性的优势，又走回了 `npm` / `yarn` 的老路。

## 参考链接

- [pnpm 对比 npm/yarn 好在哪里 - 掘金 (juejin.cn)](https://juejin.cn/post/7047556067877716004)
- [现在我更推荐 pnpm 而不是 npm/yarn? - 掘金 (juejin.cn)](https://juejin.cn/post/6932046455733485575)
- [如何将 npm / yarn 项目迁移到 pnpm？ - 掘金 (juejin.cn)](https://juejin.cn/post/7129552750446116878)
- [浅谈 npm, yarn, pnpm之间的区别 - 掘金 (juejin.cn)](https://juejin.cn/post/7107902138952450061)
- [vue 配套生态已经全面使用 pnpm 了 - 掘金 (juejin.cn)](https://juejin.cn/post/7200679596122538045)
- [打造高效Monorepo：Turborepo、pnpm、Changesets实践 (uupt.com)](https://link.juejin.cn/?target=https%3A%2F%2Ftech.uupt.com%2F%3Fp%3D1185)
- [新一代包管理工具 pnpm 使用心得 - 知乎 (zhihu.com)](https://link.juejin.cn/?target=https%3A%2F%2Fzhuanlan.zhihu.com%2Fp%2F546400909)
- [ERR_PNPM_PEER_DEP_ISSUES Unmet peer dependencies (tiven.cn)](https://link.juejin.cn/?target=https%3A%2F%2Ftiven.cn%2Fp%2F310ff420%2F)