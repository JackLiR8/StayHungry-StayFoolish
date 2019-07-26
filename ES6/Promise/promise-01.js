/* 
    从语法上，Promise是一个对象。 ES6 规定，Promise对象是一个构造函数，
    用来生成Promise实例。

    特点：
        1.  对象状态不受外界影响 （只有异步操作的结果，可以决定当前是哪
            一种状态，任何其他操作都无法改变这个状态）
        2.  一旦状态改变，就不会在改变

    缺点：
        1.  无法取消，一旦新建它就会立即执行，无法中途取消
        2.  如果不设置回调函数，Promise内部抛出的错误，不会反应到外部
        3.  当处于pending状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）。


    const promise = new Promise((resolve,reject) => {
        // ...
        if ( .... ) {
            resolve(1)
        } else {
            reject(new Error('error'))
        }
    })

*/

/* 
    Promise构造函数接受一个函数作为参数，该函数的两个参数分别是resolve和reject。
    它们是两个函数，由 JavaScript 引擎提供，不用自己部署。

    resolve函数的参数除了正常的值以外，还可能是另一个 Promise 实例，比如像下面这样。
*/
const p1 = new Promise((resolve,reject) => {
    // ...
})

const p2 = new Promise((resolve,reject) => {
    resolve(p1)
})

/* 
    注意，这时p1的状态就会传递给p2，也就是说，p1的状态决定了p2的状态。如果
    p1的状态是pending，那么p2的回调函数就会等待p1的状态改变；如果p1的状态
    已经是resolved或者rejected，那么p2的回调函数将会立刻执行。
*/

/* 
    注意，调用resolve或reject并不会终结 Promise 的参数函数的执行。
    立即 resolved 的 Promise 是在本轮事件循环的末尾执行，总是晚于本轮循环的同步任务

    一般来说，调用resolve或reject以后，Promise 的使命就完成了，后继操作应该
    放到then方法里面，而不应该直接写在resolve或reject的后面。所以，最好在它们
    前面加上return语句，这样就不会有意外。
*/
new Promise((resolve, reject) => {
    resolve(1)
    console.log(2)
}).then(r => {
    console.log(r)
})
// 2
// 1

/* 
    --------------------------- Promise.prototype.then() / catch() ---------------------------
    then
        then方法返回的是一个新的Promise实例（注意，不是原来那个Promise实例）。
        因此可以采用链式写法，即then方法后面再调用另一个then方法。

    catch
        catch 用于指定发生错误时的回调函数

        !! 如果 Promise 状态已经变成resolved，再抛出错误是无效的。

        Promise 对象的错误具有“冒泡”性质，会一直向后传递，直到被捕获为止。
        也就是说，错误总是会被下一个catch语句捕获。

        一般总是建议，Promise 对象后面要跟catch方法，这样可以处理 Promise 内部发生的错误。catch方法返回的还是一个 Promise 对象，因此后面还可以接着调用then方法。
*/

/* 
    --------------------------- Promise.prototype.finally() ---------------------------

    finally方法用于指定不管 Promise 对象最后状态如何，都会执行的操作。该方法是 ES2018 引入标准的。

    finally方法的回调函数不接受任何参数，finally方法里面的操作，是与
     状态无关的，不依赖于 Promise 的执行结果。
*/