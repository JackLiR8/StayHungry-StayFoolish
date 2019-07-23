console.group('---------- class-1 ----------')
class Demo {
    constructor(name){
        this.title = 'class-demo'
        this.name = name
    }
    greet(){
        console.log(`hello,${this.name}`)
    }
}

let user = new Demo('kevin')
user.greet()

/* 
    class Demo {...} 构造器做了哪些事？
    
        1. 创建一个以 Demo 为名称的函数
        2. 储存所有方法

    注意：
        1. 类和模块内部使用严格模式
        2. 不存在提升
        3. 类的方法内部如果含有this，它默认指向类的实例。
*/

// 类是函数
console.log('class demo的类型:',typeof Demo)  // function
// 是构造方法
console.log(Demo === Demo.prototype.constructor); // true

/* ---------------------------------- getter 和 setter -------------------------------
    在“类”的内部可以使用get和set关键字，对某个属性设置存值函数和取值函数，
    拦截该属性的存取行为。
*/
class MyClass {
    constructor(n){
        this.num = n
    }
    get num(){
        return this._num
    }
    set num(value) {
        if(value < 5){
            console.log('too small')
            return
        }
        this._num = value       // 此处不可写this.num, 会陷入死循环
    }
}

let inst = new MyClass(5)
console.log(inst.num)   // 5
inst.num = 4   // too small
inst.num = 7
console.log(inst.num)   // 7

/* ----------------------------------- 静态方法 ----------------------  
    如果在一个方法前，加上static关键字，就表示该方法不会被实例继承，
    而是直接通过类来调用，这就称为“静态方法”。

    注意:
        1. 如果静态方法包含this关键字，这个this指的是类，而不是实例
        2. 静态方法可以和非静态方法重名
        3. 子类可以继承父类的静态方法
*/
class Foo {
    constructor(){
        this.name = 'class'
    }
    static getName() {
        console.log(this.name)  // this指向类
    }
    getNa() {
        console.log(this.name)  // this指向实例
    }
}

let a = new Foo()

// a.getName()    报错 a.getName is not a function
Foo.getName()   // Foo
a.getNa()    // class

class Bar extends Foo {

}
Bar.getName()       // Bar

/* --------------------------------- 把实例属性写在类的最顶层 ---------------------------

    这种新写法的好处是，所有实例对象自身的属性都定义在类的头部，看上去比较整齐，
    一眼就能看出这个类有哪些实例属性。
*/
class Count {
    _count = 0;

    get value(){    
        return this._count;
    }
    increment(){
        this._count++;
    }
}

let counter = new Count()
console.log(counter.value)      // 0
counter.increment()
console.log(counter.value)      // 1

/* --------------------------- new.target属性 ---------------------- 
  
    new.target属性返回构造类自己
*/
console.groupEnd()