+(() => {
/**
 * @file Proxy 实例方法
 * ownKeys()
 * preventExtensions()
 * setPrototypeOf()
 */

  /**
   * catch 执行某个函数时出现的错误
   * @param {Function} fn 
   * @param {*} arg 
   */
  function catchError(fn, arg) {
    try {
      fn(arg)
    } catch (error) {
      console.error(error)
    }
  }

/* ---------------------------- ownKeys() ----------------------------

  ownKeys方法用来拦截对象自身属性的读取操作。具体来说，拦截以下操作:

    + Object.getOwnPropertyNames()
    + Object.getOwnPropertySymbols()
    + Object.keys()
    + for...in循环
*/
  let ownTarget = {
    a: 1,
    b: 2,
    c: 3
  };

  let ownProxy = new Proxy(ownTarget, {
    ownKeys(target) {
      return ['a']
    }
  })

  console.log(ownProxy)   // Proxy {a: 1, b: 2, c: 3}
  console.log(Object.keys(ownProxy));   // ['a']
  console.log(Object.getOwnPropertyNames(ownProxy));  // ['a']

  /* 注意:
    1. 使用Object.keys方法时，有三类属性会被ownKeys方法自动过滤，不会返回。
      + 目标对象上不存在的属性
      + 属性名为 Symbol 值
      + 不可遍历（enumerable）的属性 

    2. for...in 同理， 也受到ownKeys方法的拦截。

    3. ownKeys方法返回的数组成员，只能是字符串或 Symbol 值。如果有其他类型的值，
      或者返回的根本不是数组，就会报错。

    4. 如果目标对象自身包含不可配置的属性，则该属性必须被ownKeys方法返回，否则报错。

    5. 另外，如果目标对象是不可扩展的（non-extensible），这时ownKeys方法返回的数组之中，
      必须包含原对象的所有属性，且不能包含多余的属性，否则报错。
*/
  // 例1
  let t = {
    a: 1,
    b: 2,
    c: 3,
    [Symbol.for('secret')]: '4',
  };

  Object.defineProperty(t, 'key', {
    enumerable: false,
    configurable: true,
    writable: true,
    value: 'static'
  })

  let tProxy = new Proxy(t, {
    ownKeys(target) {
      return ['a', 'e', Symbol.for('secret'), 'key'];
    }
  })

  console.log(Object.keys(tProxy));   // ['a']

  for (const key in tProxy) {
    console.log(key)
    // 'a'
  }

  console.log(Object.getOwnPropertyNames(tProxy))   // ['a', 'e', 'key']
  console.log(Object.getOwnPropertySymbols(tProxy)) // [Symbol(secret)]

  /* 上面代码中，ownKeys方法之中，显式返回不存在的属性（e）、Symbol 值（Symbol.for('secret')）、
  不可遍历的属性（key），结果都被自动过滤掉。 */

  // 例2
  let errProxy = new Proxy({}, {
    ownKeys(target) {
      return [1, null, true]
    }
  })

  catchError(Object.keys, errProxy) 
  // TypeError: 1 is not a valid property name

  // 例3
  let unConf = {a: 1};
  Object.defineProperty(unConf, 'b', {
    configurable: false,
    value: 2
  });

  let unConfProxy = new Proxy(unConf, {
    ownKeys(target) {
      return ['a']
    }
  })

  catchError(Object.getOwnPropertySymbols, unConfProxy);
  // TypeError: 'ownKeys' on proxy: trap result did not include 'b'
  // 上面例子中，属性 b 不可配置，ownKeys没将其返回，报错 

  // 例4
  let errObj = {
    a: 1,
    b: 2
  };

  Object.preventExtensions(errObj);

  let unExten = new Proxy(errObj, {
    ownKeys(target) {
      // return ['a']    
      //  'ownKeys' on proxy: trap result did not include 'b'

      return ['a', 'b', 'c']
      // TypeError: 'ownKeys' on proxy: trap returned extra keys but proxy target is non-extensible
    }
  });

  catchError(Object.getOwnPropertyNames, unExten);

/* ---------------------------- preventExtensions() ----------------------------

  preventExtensions方法拦截Object.preventExtensions()。该方法必须返回一个布尔值，否则会被自动
  转为布尔值。
  
  这个方法有一个限制，只有目标对象不可扩展时（即Object.isExtensible(proxy)为false），
  proxy.preventExtensions才能返回true，否则会报错。为了防止出现这个问题，通常要在
  proxy.preventExtensions方法里面，调用一次Object.preventExtensions。
*/
  let prevProxy = new Proxy({}, {
    preventExtensions(target) {
      console.log('called');
      Object.preventExtensions(target);
      return true;
    }
  });

  Object.preventExtensions(prevProxy);
  prevProxy.a = '123';
  console.log(prevProxy)  // Proxy {}

/* ---------------------------- setPrototypeOf() ----------------------------

  setPrototypeOf方法主要用来拦截Object.setPrototypeOf方法。

    setPrototypeOf(target, proto)

  注意：
    该方法只能返回布尔值，否则会被自动转为布尔值。另外，如果目标对象不可扩展（non-extensible），
    setPrototypeOf方法不得改变目标对象的原型。
*/

  let setTarget = function () {};

  let setProxy = new Proxy(setTarget, {
    setPrototypeOf(target, proto) {
      throw new Error('Changing the prototype is forbidden');
    }
  });

  Object.setPrototypeOf(setProxy, {})   // Error
  // 上面例子中，修改setProxy 的原型就会报错
})()