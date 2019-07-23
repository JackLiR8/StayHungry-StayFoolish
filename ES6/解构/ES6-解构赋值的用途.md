## 解构赋值的用途
***
### 1. 变换变量的值
下面的代码交换变量 x 和 y 的值
```javascript
    let x = 1；
    let y = 2;
    [x, y] = [y, x]
```
### 2. 从函数返回多个值
函数只能返回一个值，如果想要返回多个值，则需要把他们放到数组或者对象里
```javascript
    // 返回数组
    function fn1(){
        return [1, 2, 3]
    }
    let [a,b,c] = fn1()

    // 返回对象
    function fn2(){
        return {
            foo:1,
            bar:2
        }
    }

    let {foo,bar} = fn2()
```
### 3. 函数参数的定义
解构赋值可以轻松将一组参数与变量名对应
```javascript
// 参数是数组
    function f([a,b,c]){...}
    f([1,2,3])

// 参数是对象
    function fn ({a,b,c}){...}
    fn({a:1, b:2, c:3})
```
### 4. 提取 JSON 数据
解构赋值可以轻松提取JSON数据
```javascript
    let jsonData = {
        id:11,
        msg:'hello',
        data:[1,2]
    }
    let {id,msg,data:arr} = jsonData
    console.log(id,msg,arr)
    // 11 , 'hello',[1,2]
```
### 5. 函数参数的默认值
```javascript
    jQuery.ajax = function (url, {
        async = true,
        beforeSend = function () {},
        cache = true,
        complete = function () {},
        crossDomain = false,
        global = true,
        // ... more config
    } = {}) {
        // ... do stuff
    };
```
### 6. 遍历Map结构
任何部署了 Iterator 接口的对象，都可以用for...of循环遍历。Map 结构原生支持 Iterator 接口，配合变量的解构赋值，获取键名和键值就非常方便。
```javascript
    const map = new Map();
    map.set('first', 'hello');
    map.set('second', 'world');

    for (let [key, value] of map) {
    console.log(key + " is " + value);
    }
    // first is hello
    // second is world
```
如果只想获取键名，或者只想获取键值，可以写成下面这样。
```javascript
// 获取键名
for (let [key] of map) {
  // ...
}

// 获取键值
for (let [,value] of map) {
  // ...
}
```
### 7. 输入模块的指定方法
加载模块时，需要指定某些方法，可用结构赋值
```javascript
const {SourceMapConsumer,SourceNode} = require('source-map')
```