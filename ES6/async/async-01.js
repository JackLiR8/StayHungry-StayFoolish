console.group(' ---------------- async-01 ----------------')
/*  async函数是Generator函数的语法糖， Generator函数中的 * 用 async 代替， yield 用 await 代替

        async 函数对 Generator 函数的改进：
            1. 内置执行器。 async 函数的执行与普通函数一样，只需要一行，Generator 函数需要调用 
            next 方法或者使用 co 模块才能真正执行
            2. 更好的语义
            3. 更广的适用性     co 模块约定，yield 后面只能跟 Thunk 函数或者 promise 对象， await
                                后面可以是 Promise 对象和原始类型的值（此时等同于同步操作）。

            4. 返回值是 Promise     可以用 then 方法进行下一步操作

        用法：
            async 返回一个 Promise 对象，可以使用 then 方法添加回调函数。执行时，一旦遇到 await 就会先返回，
            等到异步操作完成后再接着执行函数体内的其他语句。 

        使用形式：
            1. 函数声明     async function foo() {}
            2. 函数表达式   const foo = async function () {}
            3. 对象的方法   let obj = { async foo() {}  }
            4. 箭头函数     const foo = async () => {}
            5. Class的方法
                    class Storage {
                        constructor(){
                            // ...
                        }

                        async getAvatar(name){
                            // ...
                        }
                    }
     */

     // ☞ 指定多少毫秒后输出一个值
     async function timeout(ms) {
        await new Promise((resolve) => {
            setTimeout(resolve, ms);
        })
     }

     async function asyncPrint(value,ms){
        await timeout(ms);
        console.log(value)
     }

     asyncPrint('hello',500)

    /* ------------------------------------------- 语法 ---------------------------------------- */
    // 1. 返回 Promise 对象

        /* async 函数返回一个 Promise 对象， async 函数内部 return 语句的返回值，会成为 then 方法回调函数的参数 */ 
        async function f(){
            return 'hello,Jack!'
        }
        f().then(v => console.log(v))       // 'hello,Jack!'

        /* async 函数内部抛出的错误会导致返回的 Promise 对象变为 reject 状态。 抛出的错误对象会被 catch 方法回调函数接收到 */
        async function a(){
            throw new Error('出错了')
        }
        a().then(
            v => console.log(v),
            e => console.error(e)
        )

    // 2. Promise 对象的状态变化
        /*  async 函数返回的 Promise 对象必须等到内部所有的 await 命令后面的 Promise 对象执行完毕后才会发生
            状态改变， 除非遇到 return 语句或者抛出错误。 

        async function getTitle(url){
            let response = await fetch(url);
            let html = await response.text();
            return html.match(/<title>([\s\S]+)<\/title>/i)[1]
        }

        getTitle('https://tc39.github.io/ecma262/').then(v => console.log(v))
        // ECMAScript® 2020 Language&nbsp;Specification

        */
console.groupEnd()