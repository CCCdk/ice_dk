1. Map默认不包含任何键，且键可以为任何值
1. 不太推荐以下的写法，因为Map查询不到

```
const wrongMap = new Map();
wrongMap["bla"] = "blaa";
wrongMap["bla2"] = "blaaa2";

console.log(wrongMap); // Map { bla: 'blaa', bla2: 'blaaa2' }

```

3. Map合并

```js
const merged = new Map([...first, ...second]);
```

4. Map的函数和方法

```js
map.has(key)//检查，返回布尔值

set(key, value)//建立键值，返回Map
map.get(key)	//获取,找不到则返回 undefined

map.clear()  	//清除Map
map.delete(key)//删除map中的一个键，若存在并已被移除，则为 true；如果该元素不存在，则为 false

//迭代器
map.entries()

//遍历
forEach(callbackFn[, thisArg])//callbackFn的参数分别为：值、键、正在迭代的map

```

