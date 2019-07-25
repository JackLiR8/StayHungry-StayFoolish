console.group('------------- 使用注意 -------------')
/* 
        1、 await命令后面的Promise对象，运行结果可能是rejected，
            所以最好把await命令放在try...catch代码块中
*/
function returnPromise(val) {
    return new Promise((resolve,reject) => {
        if (val > 5) {
            resolve(val)
        } else {
            reject('too small')
        }
    })
}
async function demo1(val) {
    try {
      await returnPromise(val);
    } catch (err) {
      console.log(err);
    }
}
  
  // 另一种写法
async function demo2(val) {
    await returnPromise(val)
    .catch(function (err) {
        console.log(err);
    });
}

demo1(4)    // too small
demo2(3)    // too small

/* 
        2.  多个await命令后面的异步操作，如果不存在继发关系，最好让它们同时触发。
*/

// 写法一：
async function parallel() {
    let [foo, bar] = await Promise.all([getFoo(), getBar()]);
}

// 写法二：
async function parallel() {
    let fooPromise = getFoo();
    let barPromise = getBar();
    let foo = await fooPromise;
    let bar = await barPromise;
}

/* 
        3. await命令只能用在async函数之中，如果用在普通函数，就会报错。
            如果将forEach方法的参数改成async函数，也有问题。
        
        下面代码可能不会正常工作，原因是这时三个db.post操作将是并发执
        行，也就是同时执行，而不是继发执行。正确的写法是采用for循环。
*/
function dbFuc(db) { //这里不需要 async
    let docs = [{}, {}, {}];
  
    // 可能得到错误结果
    docs.forEach(async function (doc) {
      await db.post(doc);
    });
}

async function dbF(db) {
    let docs = [{},{},{}];

    for (const doc of docs) {
        await db.post(doc);
    }
}

// 如果确实希望多个请求并发执行，可以使用Promise.all方法。
async function DbParallel(db) {
    let docs = [{},{},{}];
    let promises = docs.map(e => db.post(e))

    await Promise.all(promises)
}

/* 
        4. async 函数可以保留运行堆栈。 
        const a = () => {
            b().then(() => c());
        };

        上面代码中，函数a内部运行了一个异步任务b()。当b()运行的时候，函数a()不会中断，
        而是继续执行。等到b()运行结束，可能a()早就运行结束了，b()所在的上下文环境已经
        消失了。如果b()或c()报错，错误堆栈将不包括a()。

        现在将这个例子改成async函数。
        const a = async() => {
            await b();
            c();
        }

        上面代码中，b()运行的时候，a()是暂停执行，上下文环境都保存着。
        一旦b()或c()报错，错误堆栈将包括a()。
*/

console.groupEnd()