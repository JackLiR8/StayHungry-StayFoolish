console.group('------------ class-02 ------------')
/* ----------------------------- class的继承 -----------------------------

        子类必须在constructor方法中调用super方法，否则新建实例时会
    报错。这是因为子类自己的this对象，必须先通过父类的构造函数完成塑
    造，得到与父类同样的实例属性和方法，然后再对其进行加工，加上子类
    自己的实例属性和方法。如果不调用super方法，子类就得不到this对象。

        如果子类没有定义constructor方法，这个方法会被默认添加，代码
    如下。也就是说，不管有没有显式定义，任何一个子类都有constructor方法

    下面代码中，Child类的constructor方法和toString方法之中，都出现了super关键字，
    它在这里表示父类的构造函数，用来新建父类的this对象  
*/
class Parents {
    constructor(f,m) {
        this.f = f;
        this.m = m;
    }
    toString() {
        return `${this.f} + ${this.m}`
    }
}
class Child extends Parents {
    constructor(f,m,c) {
        super(f,m)  // 调用父类的constructor(x, y)
        this.c = c
    }
    toString() {
        return `${super.toString()} => ${this.c}`       // 借助super调用父类的toString()
    }
}

let p = new Parents('jack','sophie')
console.log(p.toString())       // jack + sophie

let c = new Child('jack','sophie','kevin')
console.log(c.toString())       // jack + sophie => kevin

/* ----------------------------- Object.getPrototypeOf() -----------------------------

    Object.getPrototypeOf方法可以用来从子类上获取父类。可以使用这个方法判断，
    一个类是否继承了另一个类。
*/
console.log(Object.getPrototypeOf(Child) === Parents)   // true

/* ----------------------------- super 关键字 ----------------------------- 
    super 既可以当作函数使用，也可以当作对象使用。

    1.  super作为函数调用时，代表父类的构造函数。ES6 要求，子类的构造函数必须执行一次
        super函数super虽然代表了父类A的构造函数，但是返回的是子类B的实例，即super内部的
        this指的是B的实例
        
    2.  super作为对象时:
            在普通方法中，指向父类的原型对象；
            在静态方法中，指向父类。

    3.  这里需要注意，由于super指向父类的原型对象，所以定义在父类实例上的方法或属性，
        是无法通过super调用的。

    4.  在子类普通方法中通过super调用父类的方法时，方法内部的this指向当前的子类实例。

    5.  在子类的静态方法中通过super调用父类的方法时，方法内部的this指向当前的子类，
        而不是子类的实例。

    6.  使用super的时候，必须显式指定是作为函数、还是作为对象使用，否则会报错。
*/


/* ----------------------------- 类的继承链 -----------------------------
    Class 作为构造函数的语法糖，同时有prototype属性和__proto__属性，因此同时存在两条继承链。

    （1）子类的__proto__属性，表示构造函数的继承，总是指向父类。
    （2）子类prototype属性的__proto__属性，表示方法的继承，总是指向父类的prototype属性。
*/
console.log(Child.__proto__ === Parents)    // true
console.log(Child.prototype.__proto__ === Parents.prototype)    // true

console.groupEnd()