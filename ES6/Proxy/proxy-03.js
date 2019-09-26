+(() => {
/**
 * @file proxy 实例方法
 * construct()
 */

/* ------------------------- construct() -------------------------
  construct方法用于拦截new命令，construct方法可以接受两个参数。

  construct(target, args, newTarget)
    target：目标对象
    args：构造函数的参数对象
    newTarget：创造实例对象时，new命令作用的构造函数（下面例子的p）

  注：construct方法返回的必须是一个对象，否则会报错。
*/
  function constructor() {}
  const consHandler = {
    construct(target, args) {
      console.log(`called: ${args.join(', ')}`);
      return {value: args[0] * 10}
    }
  };

  let p = new Proxy(constructor, consHandler);

  const p1 = new p(1, 2);    // called: 1, 2
  console.log(p1.value)   // 10

/* ------------------------- deleteProperty() ------------------------- 
  deleteProperty方法用于拦截delete操作，如果这个方法抛出错误或者返回false，
  当前属性就无法被delete命令删除。

    deleteProperty(target, key)

    注意，目标对象自身的不可配置（configurable）的属性，不能被deleteProperty
    方法删除，否则报错。
*/

  let delHandler = {
    deleteProperty(target, key) {
      invariant(key, 'delete');
      delete target[key];
      return true;
    }
  }

  function invariant(key, action) {
    if (key[0] === '_') {
      throw new Error(`Invalid attempt to ${action} private "${key}" property`)
    }
  }

  let delTarget = {_prop: 'foo', prop: 'foo'};
  let delProxy = new Proxy(delTarget, delHandler);

  try {
    delete delProxy._prop   
  } catch (err) {
    console.error(err)
    // Invalid attempt to delete private "_prop" property
  }

/* ------------------------- defineProperty() -------------------------
  defineProperty方法拦截了Object.defineProperty操作。

  注意:
    如果目标对象不可扩展（non-extensible），则defineProperty不能增加目标对象上不存在的属性，
    否则会报错。另外，如果目标对象的某个属性不可写（writable）或不可配置（configurable），
    则defineProperty方法不得改变这两个设置。
*/
  let defineHandler = {
    defineProperty(target, key, descriptor) {
      Object.defineProperty(target, key, {
        value: descriptor.value,
      })
    }
  };

  let defineTarget = {bar: 'bar'};
  let defineProxy = new Proxy(defineTarget, defineHandler);

  defineProxy.foo = '123'
  
  for (const key in defineProxy) {
    console.log(key)
    // bar
  }

  // 拦截器的descriptor.writable 默认为false, 不可进行写操作
  defineProxy.foo = '2'
  console.log(defineProxy.foo)  // '123'
})()