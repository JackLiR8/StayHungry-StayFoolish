/* ------------------------------ Promise.resolve() ------------------------------ */
+(() => {
console.group('---------- Promise.resolve() ----------')
/* 
    Promise.resolve 将现有对象转为 Promise 对象
*/

    Promise.resolve('foo')
    // 等价于
    new Promise(resolve => resolve('foo'))


//  Promise.resolve方法的参数分成四种情况:
/* 
    1.参数是一个 Promise 实例

        如果参数是 Promise 实例，那么Promise.resolve将不做任何修改、原封不动
        地返回这个实例。


    2.参数是一个thenable对象
        Promise.resolve方法会将这个对象转为 Promise 对象，然后就立即
        执行thenable对象的then方法。
*/

    const thenable = {
        then(resolve,reject) {
            resolve(11)
        }
    }

    const p1 = Promise.resolve(thenable)
    
    p1.then(r => {
        console.log(r)      // 11
    })

/* 
    3.参数不是具有then方法的对象，或根本就不是对象 
        如果参数是一个原始值，或者是一个不具有then方法的对象，则Promise.resolve
        方法返回一个新的 Promise 对象，状态为resolved。
*/
    const p2 = Promise.resolve('hello')

    p2.then(r => {
        console.log(r)  // hello 先于上面的 11 打印
    })

    /* 
        由于字符串Hello不属于异步操作（判断方法是字符串对象不具有 then 方法），
        返回 Promise 实例的状态从一生成就是resolved，所以回调函数会立即执行。
        Promise.resolve方法的参数，会同时传给回调函数。
    */

/* 
    4.不带有任何参数
        Promise.resolve()方法允许调用时不带参数，直接返回一个resolved状态的 Promise 对象。

        注意：
            立即resolve()的 Promise 对象，是在本轮“事件循环”（event loop）的结束时执行，
            而不是在下一轮“事件循环”的开始时。
*/
setTimeout(() => {
    console.log('four')
}, 0);

Promise.resolve()
    .then(() => {
        console.log('two')
    })

Promise.resolve(new Promise((resolve) => {
    resolve('three')
})).then(r => {
    console.log(r)
})

console.log('one')

/* 
    ------------------------------ Promise.reject() ------------------------------

    Promise.reject(reason)方法也会返回一个新的 Promise 实例，该实例的状态为rejected。

    Promise.reject()方法的参数，会原封不动地作为reject的理由，变成后续方法的参数。
    这一点与Promise.resolve方法不一致。
*/

const thenable1 = {
    then(resolve, reject) {
      reject('出错了');
    }
  };
  
  Promise.reject(thenable1)
  .catch(e => {
    console.log(e === thenable1)
  })
  // true
console.groupEnd()
})()