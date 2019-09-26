+(() => {
/**
 * @file Proxy
 * get()
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

  // ------------------- 例：利用get拦截，实现一个生成各种 DOM 节点的通用函数dom -------------------
    const dom = new Proxy({}, {
      get(target, property) {
        return function (attrs = {}, ...children) {
          const el = document.createElement(property);

          for (const prop of Object.keys(attrs)) {
            el.setAttribute(prop, attrs[prop])
          }

          for (let child of children) {
            if (typeof child === 'string') {
              child = document.createTextNode(child);
            }
            el.appendChild(child)
          }

          return el;
        }
      }
    });

    const el = dom.div({},
      'Hello, my name is ',
      dom.a({href: '123'}, 'Jack'),
      '. I like:',
      dom.ul({},
        dom.li({}, 'Basketball'),
        dom.li({}, 'Football'),
        dom.li({}, 'Guitar')
      )
    )

    document.body.appendChild(el);
  
  // 若一个属性不可配置且不可写， 则Proxy不能修改该属性，通过Proxy对象访问该属性会报错
    const targetUnconf = Object.defineProperty({}, 'foo', {
      value: 123,
      writable: false,
      configurable: false
    })

    const proxyUnconf = new Proxy(targetUnconf, {
      get(target, propertyKey) {
        return 'hello'
      }
    }) 

    try {
      console.log(proxyUnconf.foo)
    } catch (err) {
      console.log(err)
      /*  'get' on proxy: property 'foo' is a read-only and non-configurable data
       property on the proxy target but the proxy did not return its actual value 
       (expected '123' but got 'hello') */
    }

    // ------- 下面的例子通过proxy, 把地址由 http 转为 https
    let infoData = [
      {
        address: 'http://123.com',
        name: 'haha'
      }, {
        address: 'http://456.com',
        name: 'dudu'
      }, {
        address: 'http://789.com',
        name: 'lele'
      }
    ]

    const handler = {
      get(target, propKey) {
        if (propKey === 'address') {
          let a = target[propKey].split('//')[1]
          return `https://${a}`
        } 
        return target[propKey]
      }
    }

    const infoProxy = infoData.map(v => new Proxy(v, handler))

    for (const v of infoProxy) {
      console.log(v.address)
    }

})()