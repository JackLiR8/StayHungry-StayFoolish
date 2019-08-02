+(() => {
    console.group('----------- 函数默认值 -----------') 

/* ----------------------------------- 基本用法 ----------------------------------- */
    function Point(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    const p = new Point()
    console.log(p)  //  { x: 0, y: 0 }

    // 1. 参数变量是默认声明的，所以不能用let或const再次声明。

    // 2. 使用参数默认值时，函数不能有同名参数。
    function foo(x, x, y) {
        // 
    }

    /* function foo1(x, x, y = 1){
        // 报错
    } */

/* ----------------------------------- 结合解构赋值 ----------------------------------- */

    function demo1({x, y = 5}) {
        console.log(x,y)
    }

    demo1({})   // undefined 5
    demo1({x: 1})   // 1 5
    demo1({x: 1, y: 2}) // 1 2
    // demo1()    报错

    /* 
        上面代码只使用了对象的解构赋值默认值，没有使用函数参数的默认值。只有当函数foo的参数是一个对象时，变量x和y才会通过解构赋值生成。
    */

    function demo({x, y = 5} = {}) {
        console.log(x,y)
    }

    demo()   //  undefined 5 
    demo({x: 1})   // 1 undifined
    demo({x: 1, y: 2}) // 1 2

    /* 
        写法1：函数参数的默认值是空对象，但是设置了对象解构赋值的默认值；
    */
    function m1({x = 0, y = 0} = {}) {
        console.log(x, y)
    }

    /* 
        写法2：函数参数的默认值是一个有具体属性的对象，但是没有设置对象解构赋值的默认值
    */
    function m2({x, y} = {x: 0, y: 0}) {
        console.log(x,  y)
    }

    m1()    // 0, 0
    m2()    // 0, 0

    m1({})  // 0, 0
    m2({})  // undefined, undefined

    m1({x:1})   // 1, 0
    m2({x:1})   // 1, undefined

    m1({z:1})   // 0, 0
    m2({z:1})   // undefinded undefined

/* ----------------------------------- 函数默认值的位置 -----------------------------------

    通常情况下，定义了默认值的参数，应该是函数的尾参数。因为这样比较容易看出来，到底省略了哪些参数。
    如果非尾部的参数设置默认值，实际上这个参数是没法省略的

    如果传入undefined，将触发参数等于默认值，null则没有这个效果。
*/
    function foo(x = 1, y = 2) {
        console.log(`[${x},${y}]`)
    }

    foo(undefined)  // [1, 2]
    foo(null)       // [null, 2]

/* ----------------------------------- 函数的 length 属性 -----------------------------------

    指定了默认值以后，函数的length属性，将返回没有指定默认值的参数个数。
    也就是说，指定了默认值后，length属性将失真。

    这是因为length属性的含义是，该函数预期传入的参数个数。某个参数指定
    默认值以后，预期传入的参数个数就不包括这个参数了。

    如果设置了默认值的参数不是尾参数，那么length属性也不再计入后面的参数了。


*/
    console.log((function (a,b){}).length)      // 2
    console.log((function (a = 1,b){}).length)  // 0
    console.log((function (a ,b = 2){}).length)  // 1

    console.groupEnd()
})()