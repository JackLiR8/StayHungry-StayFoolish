class Wait {
    async delay(num) {
        return Promise.resolve(num)
    }
}

const w = new Wait()
w.delay(2)
.then(res => {
    console.log(res)
})

/* 
    注意： async 函数 return 的值，才会成为then方法回调函数的参数
*/

function sleep(interval) {
    return new Promise(resolve => {
        setTimeout(resolve,interval)
    })
}

async function print(){
    for (let i = 1; i < 6; i++) {
        await sleep(1000)
        console.log(i)
    }
}

print()

// 上面的代码会打印 1 到 5,每隔一秒打印一个数字
