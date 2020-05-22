/**
 * @file
 * 1. 阿里面试Foo
 * 2. 事件循环考察
 */

// ========================= 阿里面试题 ========================
function Foo() {
  getName = function() { console.log(1); }
  return this;
}
Foo.getName = function() { console.log(2); }
Foo.prototype.getName = function() { console.log(3); }
var getName = function() { console.log(4); }
function getName() { console.log(5); }

Foo.getName();		
getName();
Foo().getName();
getName();
new Foo.getName();
new Foo().getName();
new new Foo().getName();

// 2 4 1 1 2 3 3

/* 
  1. 函数声明整体提升；var声明只提升变量名，不赋值
  2. 运算符优先级
      20  圆括号
      19  成员访问
          new(带参数) - new Foo()
          函数调用
      18  new(无参数列表) - new Foo
*/

// ======================= 事件循环考察 ====================
async function async1() {
  console.log('async1 start')
  await async2()
  console.log('async1 end')
}

async function async2() {
  console.log('async2')
}

console.log('script start')
setTimeout(function() {
  console.log('setTimeout')
}, 0)

async1()

new Promise(resolve => {
  console.log('promise1')
  resolve()
}).then(() => {
  console.log('promise2')
})

console.log('script end')

// "script start"
// "async1 start"
// "async2"
// "promise1"
// "script end"
// "async1 end"
// "promise2"
// "setTimeout"