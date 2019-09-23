+(() => {

  function valueFilter(value) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (value.length > 5) {
          resolve(value)
        } else {
          reject(new Error('too short'))
        }
      }, 1000);
    })
  }

  valueFilter('hello world')
    .then(res => {
      console.log(res)
    })
    .catch(err => {
      console.error(err)
    })
    .finally(() => {

      // finally 不接受任何参数， 始终执行，不依赖执行结果
      console.log('finally, done!')
    })

  const trigger = 6
  const promise1 = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('promise1')
    }, 1100);
  });
  const promise2 = new Promise((resolve, reject) => {
    if (trigger > 5) {
      resolve('promise2')
    } else {
      reject('promise2')
    }
  })

  // -------------- Promise.all() --------------
  // Promise.all() 接受数组作为参数
  const p = () => Promise.all([promise1, promise2])

  /*  p 的状态依赖于 promise1, promise2 的状态
        +  promise1, promise2 都处于fulfilled 时，p 才处于fulfilled
        +  参数里有一个被rejected, p就变成rejected  
  */
  p()
    .then(res => {

      // 返回值是一个由各promise实例返回值组成数组
      console.log('res',res)
      // ['promise1', 'promise2']
    })
    .catch(err => {
      console.error(err)
    })
  
  // -------------- Promise.race() --------------
  const promiseRace =  Promise.race([
    new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('race-1')
        // reject('race-1')
      }, 1500);
    }),
    new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('race-2')
      }, 1600);
    })
  ])

  const pr = () => promiseRace;

  pr()
    .then(res => {
      console.log(res)
      // 'race-1'
    })
    .catch(err => {
      console.error(err)
    })

  // -------------- Promise.resolve() --------------
  const thenable = {
    then() {
      console.log('haha')
    }
  }
  Promise.resolve(thenable)

})()