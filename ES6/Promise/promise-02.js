/* 
    --------------------------- Promise.all() ---------------------------

    Promise.all方法用于将多个 Promise 实例，包装成一个新的 Promise 实例。

    Promise.all方法接受一个数组作为参数，p1、p2、p3都是 Promise 实例，
    如果不是，就会先调用 Promise.resolve方法，将参数转为 Promise 实例，
    再进一步处理。（Promise.all方法的参数可以不是数组，但必须具有 Iterator 接口，
    且返回的每个成员都是 Promise 实例。）

*/

const p = Promise.all([p1,p2])

/* 
    p的状态由p1、p2决定：
        1.  p1,p2 都为fulfilled , p 的状态才变成fulfilled。此时p1,p2 的返回值组成
            一个数组，传递给p的回调函数
        2.  p1,p2 有一个被 rejected, p 就变成 rejected, 此时第一个被reject的实例的
            返回值，会传递给p的回调函数
*/

const promise1 = new Promise((resolve,reject) => {
    resolve('promise1')
})
const promise2 = new Promise((resolve,reject) => {
    resolve('promise2')
})

Promise.all([promise1,promise2])
    .then(r => {
        console.log(r)      // ['promise1', 'promise2']
    })
    .catch(err => {
        console.error(err)
    })

/* 
    注意，如果作为参数的 Promise 实例，自己定义了catch方法，那么它一旦
    被rejected，并不会触发Promise.all()的catch方法。
*/

/* 
    --------------------------- Promise.race() ---------------------------
    Promise.race方法同样是将多个 Promise 实例，包装成一个新的 Promise 实例。与Promise.all
    方法不同的是， race 参数中只要有一个实例率先改变状态，p的状态就跟着改变。那个率先改变的 
    Promise 实例的返回值，就传递给p的回调函数。

    下面代码中，3s 之内fetch无法返回结构，limitedRequest 就会变为rejected
*/

/* const limitedRequest = Promise.race([
    fetch('api/...'),
    new Promise((resolve,reject) => {
        setTimeout(() => {
            reject(new Error('time out'))
        }, 3000);
    })
]) */