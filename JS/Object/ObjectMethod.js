+(() => {
  // ----------------- Object.create() -----------------
  
  /*  Object.create() 方法创建一个新对象， 新对象的__proto__ 指向现有对象 
  
      Object.create(proto[, propertiesObject])
  */

  const obj = {
    a: '1',
  }

  let demo = Object.create(obj, {
    b: '2'
  })

  console.log(demo)
})()