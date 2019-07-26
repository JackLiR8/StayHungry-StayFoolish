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

    demo()   //  5 6
    demo({x: 1})   // 1 undifined
    demo({x: 1, y: 2}) // 1 2

    console.groupEnd()
})()