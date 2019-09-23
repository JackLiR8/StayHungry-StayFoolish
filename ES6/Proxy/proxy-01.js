+(() => {
/**
 * @file Proxy
 */

  /*  Proxy 用于修改某些操作的默认行为，等同于在语言层面做出修改，所以属于
      一种“元编程”（meta programming），即对编程语言进行编程。

      let proxy = new Proxy(target, handler)
  */

  const target = {
    title: 'target',
    content: 'haha'
  }
  
  let proxy = new Proxy(target, {
    get(target, property) {
      return 35
    }
  })

  console.log(proxy.title)    
  // 35
  console.log(proxy.content)  
  // 35

  /* 要使得Proxy起作用，必须针对Proxy实例（上例是proxy对象）进行操作，
   而不是针对目标对象进行操作。*/

  // Proxy 实例也可以作为其他对象的原型对象。

  let obj = Object.create(proxy);
  console.log(obj.title)      
  // 35

  // ------------------- Proxy 实例的方法 -------------------

  /* 1. get() 
      用于拦截某个属性的读取操作，可以接受三个参数，依次为目标对象、属性名和 
      proxy 实例本身（严格地说，是操作行为所针对的对象），其中最后一个参数可选。
  */

  const person = {
    name: '张三'
  }

  let proxyPerson = new Proxy(person, {
    get(target, property) {
      if (property in target) {
        return target[property]
      } else {
        throw new ReferenceError(`Property/${property} does not exist`)
      }
    }
  })

  console.log(person.height)  // undefined
  // console.log(proxyPerson.height) // ReferenceError: Property/height does not exist

  /* get方法可以继承。*/

  let proto = new Proxy({}, {
    get(target, property) {
      console.log(`GET ${property}`)
      return target[property]
    }
  })

  let getInheritance = Object.create(proto)
  getInheritance.foo
  // GET foo
})()