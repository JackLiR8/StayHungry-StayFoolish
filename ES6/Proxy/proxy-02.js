+(() => {
/**
 * @file Proxy 实例方法
 * set()
 * apply()
 * has()
 */

/* ---------------------- set() ----------------------

set() 用来拦截某个属性的赋值操作，可以接受四个参数，依次为目标对象、属性名、属性
值和 Proxy 实例本身，其中最后一个参数可选。 
      set(target, propKey, value[, receiver])

    注意:
      如果目标对象自身的某个属性，不可写且不可配置，那么set方法将不起作用;
      严格模式下，set代理如果没有返回true，就会报错。
*/
  const validator = {
    set(obj, prop, value) {
      if (prop === 'age') {
        if (!Number.isInteger(value)) {
          throw new TypeError('The age is not an integer')
        }
        if (value < 0 || value > 150) {
          throw new RangeError('The age seems invalid')
        }

        obj[prop] = value
      }
    }
  }

  let person = new Proxy({}, validator);

  // person.age = 'yong' // TypeError
  // person.age = '200'  // RangeError
  person.age = 18;
  console.log(person)

  /* 由于设置了存值函数set，任何不符合要求的age属性赋值，都会抛出一个错误，这是数据
  验证的一种实现方法。利用set方法，还可以数据绑定，即每当对象发生变化时，会自动更新 
  DOM。 
  
    有时，我们会在对象上面设置内部属性，属性名的第一个字符使用下划线开头，表示这些属
  性不应该被外部使用。结合get和set方法，就可以做到防止这些内部属性被外部读写。*/

  const dataFilter = {
    get(target, prop) {
      invariant(prop, 'get')
      return target[prop]
    },
    set(target, prop, value) {
      invariant(prop, 'set')
      target[prop] = value;

      // 注意，严格模式下，set代理如果没有返回true，就会报错。
      return true
    }
  }

  // 注意此处函数式编程思想, 把验证提取成 invariant 函数
  function invariant(key, action) {
    if (key[0] === '_') {
      throw new Error(`Invalid attempt to ${action} private "${key}" property`)
    }
  }

  let myBank = {
    count: 100000000000000,
    _name: 'Jack',
  }

  let bankProxy = new Proxy(myBank, dataFilter);

  // console.log(bankProxy._name)   // Error
  // bankProxy._name = 'kevin'      // Error

/* ---------------------- apply() ----------------------

apply方法拦截函数的调用、call和apply操作。  apply方法可以接受三个参数，分别是目标对象、
目标对象的上下文对象（this）和目标对象的参数数组

  apply(target, context, args)
*/
  // 例1
  let funTarget = () => 'I am the target';

  let funHandler = {
    apply() {
      return 'I am the proxy'
    }
  }

  let p = new Proxy(funTarget, funHandler);
  console.log(p());   // I am the proxy

  // 例2
  let twice = {
    apply(target, ctx, agrs) {
      return Reflect.apply(...arguments) * 2;
    }
  };

  function sum(a, b) {
    return a + b
  }

  let proxyTwice = new Proxy(sum, twice);
  console.log(proxyTwice(1,2))   // 6
  console.log(proxyTwice.call(null, 5, 6))   // 22
  console.log(proxyTwice.apply(null, [7, 8]))   // 30

  // 上面代码中，每当执行 proxyTwice函数（直接调用或call和apply调用），就会被apply方法拦截。
  // 另外，直接调用Reflect.apply方法，也会被拦截。

  Reflect.apply(proxyTwice, null, [9, 10]) // 38

/* ---------------------- has() ----------------------
has方法用来拦截HasProperty操作，即判断对象是否具有某个属性时，这个方法会生效。
典型的操作就是in运算符。

has方法可以接受两个参数，分别是目标对象、需查询的属性名。
    has(target, propKey)

  注意：
    1. 如果原对象不可配置或者禁止扩展，这时has拦截会报错。
    2. has方法拦截的是HasProperty操作，而不是HasOwnProperty操作，即has方法不判断
      一个属性是对象自身的属性，还是继承的属性。
    3. 虽然for...in循环也用到了in运算符，但是has拦截对for...in循环不生效。
*/

  let hasHandler = {
    has(target, key) {
      if (key[0] === '_') {
        return false
      }
      return key in target;
    }
  };

  let hasTarget = {
    prop: 'foo',
    _prop: 'foo'
  }

  let hasProxy = new Proxy(hasTarget, hasHandler);

  console.log('_prop' in hasProxy);   // false

  // 如果原对象不可配置或者禁止扩展，这时has拦截会报错。

})()