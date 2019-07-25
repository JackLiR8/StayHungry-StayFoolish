#
ES6 编程风格  
#
参考阮一峰[编程风格](https://es6.ruanyifeng.com/#docs/style)

<!-- TOC -->

- [1. 块级作用域](#1-块级作用域)
    - [1.1. let 取代 var](#11-let-取代-var)
    - [1.2. 全局常量](#12-全局常量)
- [2. 字符串](#2-字符串)
- [3. 解构赋值](#3-解构赋值)
- [4. 对象](#4-对象)
- [5. 数组](#5-数组)
- [6. 函数](#6-函数)
- [7. Map](#7-map)
- [8. Class](#8-class)
- [9. 模块](#9-模块)

<!-- /TOC -->
# 1. 块级作用域
## 1.1. let 取代 var
+ var命令存在变量提升效用，let命令没有这个问题。  
+ let 和 if , for 可以形成块级作用域

## 1.2. 全局常量
>在let和const之间，建议优先使用const，尤其是在全局环境，不应该设置变量，只应设置常量。  
const优于let有几个原因。一个是const可以提醒阅读程序的人，这个变量不应该改变；另一个是const比较符合函数式编程思想，运算不改变值，只是新建值，而且这样也有利于将来的分布式运算；最后一个原因是 JavaScript 编译器会对const进行优化，所以多使用const，有利于提高程序的运行效率，也就是说let和const的本质区别，其实是编译器内部的处理不同。

```javascript
    // bad
    var a = 1, b = 2, c = 3;

    // good
    const a = 1;
    const b = 2;
    const c = 3;

    // best
    const [a, b, c] = [1, 2, 3];
```

# 2. 字符串
静态字符串一律使用单引号或反引号，不使用双引号。动态字符串使用反引号。
```javascript
    // bad
    const a = "foobar";
    const b = 'foo' + a + 'bar';

    // acceptable
    const c = `foobar`;

    // good
    const a = 'foobar';
    const b = `foo${a}bar`;
```
# 3. 解构赋值
+ 使用数组成员对变量赋值时，优先使用解构赋值。
```javascript
    const arr = [1, 2, 3, 4];

    // bad
    const first = arr[0];
    const second = arr[1];

    // good
    const [first, second] = arr;
```
+ 函数的参数如果是对象的成员，优先使用解构赋值。
```javascript
    // bad
    function getFullName(user) {
        const firstName = user.firstName;
        const lastName = user.lastName;
    }

    // good
    function getFullName(obj) {
        const { firstName, lastName } = obj;
    }

    // best
    function getFullName({ firstName, lastName }) {
    }
```
+ 如果函数返回多个值，优先使用对象的解构赋值，而不是数组的解构赋值。这样便于以后添加返回值，以及更改返回值的顺序。

```javascript
    // bad
    function processInput(input) {
        return [left, right, top, bottom];
    }

    // good
    function processInput(input) {
        return { left, right, top, bottom };
    }

    const { left, right } = processInput(input);
```
# 4. 对象
+ 单行定义的对象，最后一个成员不以逗号结尾。多行定义的对象，最后一个成员以逗号结尾
```javascript
    // bad
    const a = { k1: v1, k2: v2, };
    const b = {
        k1: v1,
        k2: v2
    };

    // good
    const a = { k1: v1, k2: v2 };
    const b = {
        k1: v1,
        k2: v2,
    };
```
+ 对象尽量静态化，一旦定义，就不得随意添加新的属性。如果添加属性不可避免，要使用Object.assign方法。
```javascript
// bad
const a = {};
a.x = 3;

// if reshape unavoidable
const a = {};
Object.assign(a, { x: 3 });

// good
const a = { x: null };
a.x = 3;
```
+ 如果对象的属性名是动态的，可以在创造对象的时候，使用属性表达式定义。
```javascript
// bad
const obj = {
  id: 5,
  name: 'San Francisco',
};
obj[getKey('enabled')] = true;

// good
const obj = {
  id: 5,
  name: 'San Francisco',
  [getKey('enabled')]: true,
};
```
+ 对象的属性和方法，尽量采用简洁表达法，这样易于描述和书写。
```javascript
var ref = 'some value';

// bad
const atom = {
  ref: ref,

  value: 1,

  addValue: function (value) {
    return atom.value + value;
  },
};

// good
const atom = {
  ref,

  value: 1,

  addValue(value) {
    return atom.value + value;
  },
};
```
# 5. 数组
+ 使用扩展运算符（...）拷贝数组。
+ 使用 Array.from 方法，将类似数组的对象转为数组

# 6. 函数
+ 立即执行函数可以写成箭头函数的形式。

```javascript
(() => {
  console.log('Welcome to the Internet.');
})();
```
+ 那些使用匿名函数当作参数的场合，尽量用箭头函数代替。因为这样更简洁，而且绑定了 this。
+ 箭头函数取代Function.prototype.bind，不应再用 self/_this/that 绑定 this。
```javascript
// bad
const self = this;
const boundMethod = function(...params) {
  return method.apply(self, params);
}

// acceptable
const boundMethod = method.bind(this);

// best
const boundMethod = (...params) => method.apply(this, params);
```
+ 所有配置项都应该集中在一个对象，放在最后一个参数，布尔值不可以直接作为参数。
```javascript
// bad
function divide(a, b, option = false ) {
}

// good
function divide(a, b, { option = false } = {}) {
}
```
+ 不要在函数体内使用 arguments 变量，使用 rest 运算符（...）代替。因为 rest 运算符显式表明你想要获取参数，而且 arguments 是一个类似数组的对象，而 rest 运算符可以提供一个真正的数组。

```javascript
// bad
function concatenateAll() {
  const args = Array.prototype.slice.call(arguments);
  return args.join('');
}

// good
function concatenateAll(...args) {
  return args.join('');
}
```
+ 使用默认值语法设置函数参数的默认值。
```javascript
// bad
function handleThings(opts) {
  opts = opts || {};
}

// good
function handleThings(opts = {}) {
  // ...
}
```
# 7. Map
+ 注意区分 Object 和 Map，只有模拟现实世界的实体对象时，才使用 Object。如果只是需要key: value的数据结构，使用 Map 结构。因为 Map 有内建的遍历机制。

# 8. Class
+ 总是用 Class，取代需要 prototype 的操作。因为 Class 的写法更简洁，更易于理解。
+ 使用extends实现继承，因为这样更简单，不会有破坏instanceof运算的危险

# 9. 模块
+ 使用import取代require。
+ 使用export取代module.exports。
+ 不要在模块输入中使用通配符。因为这样可以确保你的模块之中，有一个默认输出（export default）。
+ 如果模块默认输出一个函数，函数名的首字母应该小写。
+ 如果模块默认输出一个对象，对象名的首字母应该大写。