# Yarn 的安装与使用

## 前言

Yarn 是一款 JavaScript 的包管理工具（npm 的代替方案），在 Yarn 的官网有着一句话：*Safe, stable, reproducible projects* 。

正如 Yarn 官网的介绍，Yarn 的具有**速度快** 、**安全** 、**可靠** 的优点，在功能上相比于 npm 优化了许多功能等，例如网络性能优化，安装依赖的方式相同等功能。具体可以参考[Yarn 中文网](https://link.juejin.cn/?target=https%3A%2F%2Fyarn.bootcss.com%2F)。

## Yarn 的安装

Yarn 的安装比较简单，直接使用`npm`命令即可，这样的前提是你已经安装了 Node.js，命令如下：

```PowerShell
# 检查是否具有node.js
node-v
# 安装yarn
npm install -g yarn
```

安装完成之后可以通过如下命令检测是否安装成功：

```PowerShell
yarn -v
```

如果提示版本号则安装完成，提示的版本号为`1.X.X`就表示安装成功了

然后我们设置一下`yarn`库的镜像源，命令如下：

```PowerShell
yarn config set npmRegistryServer https://registry.npm.taobao.org
```

## Yarn 的常用命令

### 初始化

```PowerShell
yarn init
```

### 添加依赖包

```PowerShell
yarn add [package] # 会自动安装最新版本，会覆盖指定版本号
yarn add [package] [package] [package] # 一次性添加多个包
yarn add [package]@[version] # 添加指定版本的包
yarn add [package]@[tag] # 安装某个tag（比如beta,next或者latest）
```

### **将依赖项添加到不同依赖项类别**

不指定依赖类型默认安装到`dependencies`里，你也可以指定依赖类型分别添加到`devDependencies`、`peerDependencies`和`optionalDependencies`。

```PowerShell
# 加到 devDependencies
yarn add [package] --dev
#或
yarn add [package] -D

# 加到 peerDependencies
yarn add [package] --peer
#或
yarn add [package] -P

# 加到 optionalDependencies
yarn add [package] --optional
#或
yarn add [package] -O
```

### 升级依赖包

```PowerShell
yarn upgrade [package] # 升级到最新版本
yarn upgrade [package]@[version] # 升级到指定版本
yarn upgrade [package]@[tag] # 升级到指定tag
```

### **移除依赖包**

```PowerShell
yarn remove [package] # 移除包
```

### 从 package.json 里安装依赖，并将依赖项保存进 yarn.lock

```PowerShell
yarn # 安装所有依赖
yarn install # 安装所有依赖
yarn install --flat # 安装一个包的单一版本
yarn install --force # 强制重新下载所有包
yarn install --production # 只安装生产环境依赖
```

### 发布包

```PowerShell
yarn publish
```

### 运行脚本

```PowerShell
yarn run # 用来执行在 package.json 中 scripts 属性下定义的脚本
```

### 显示某个包的信息

```PowerShell
yarn info [package] # 可以用来查看某个模块的最新版本信息
```

### 缓存

```PowerShell
yarn cache
yarn cache list # 列出已缓存的每个包
yarn cache dir # 返回全局缓存位置
yarn cache clean # 清除缓存
```