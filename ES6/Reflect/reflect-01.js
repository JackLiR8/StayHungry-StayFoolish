/**
 * @file Reflect对象
 * Reflect.get()
 * Reflect.set()
 * Reflect.has()
 * Reflect.deleteProperty()
 */

+(() => {
/* 
  Reflect对象的设计目的:
    1. 将Object对象的一些明显属于语言内部的方法（比如Object.defineProperty），放到Reflect对象上。

    2. 修改某些Object方法的返回结果，让其变得更合理。
      比如，Object.defineProperty(obj, name, desc)在无法定义属性时，会抛出一个错误，而
      Reflect.defineProperty(obj, name, desc)则会返回false。

    3. 让Object操作都变成函数行为。
      某些Object操作是命令式，比如 name in obj 和 delete obj[name]，而Reflect.has(obj, name) 和
      Reflect.deleteProperty(obj, name)让它们变成了函数行为。
      
    4. Reflect对象的方法与Proxy对象的方法一一对应，只要是Proxy对象的方法，就能在Reflect对象上找到
      对应的方法。这就让Proxy对象可以方便地调用对应的Reflect方法，完成默认行为，作为修改行为的基础。
*/

/* ----------------------- Reflect.get() -----------------------

  Reflect.get方法查找并返回target对象的某个属性，如果没有该属性，则返回undefined。

      Reflect.get(target, name, receiver)
    
    注意：
      如果第一个参数不是对象，Reflect.get方法会报错。 */
  let obj = {
    foo: 1,
    bar: 2,
    get baz() {
      return this.foo + this.bar;
    },
  };

  console.log(Reflect.get(obj, 'foo'));   // 1
  console.log(Reflect.get(obj, 'bar'));   // 2
  console.log(Reflect.get(obj, 'baz'));   // 3

  // 如果读取的属性部署了getter, 则读取函数的this 绑定receiver
  let receiverObj = {
    foo: 4,
    bar: 4,
  };

  console.log(Reflect.get(obj, 'baz', receiverObj))   // 8

/* ----------------------- Reflect.set() -----------------------

  Reflect.set方法设置target对象的name属性等于value。 

      Reflect.set(target, key, value, receiver)

    注意：
      1. 如果 Proxy对象和 Reflect对象联合使用，前者拦截赋值操作，后者完成赋值的默认行为，
         而且传入了receiver，那么Reflect.set会触发Proxy.defineProperty拦截。

      2. 如果第一个参数不是对象，Reflect.set会报错。
*/

  // 例1
  let setObj = {
    foo: 1,
    set bar(value) {
      return this.foo = value;
    },
  };

  console.log(setObj.foo);  // 1

  Reflect.set(setObj, 'foo', 2);  
  console.log(setObj.foo);  // 2

  Reflect.set(setObj, 'bar', 3);
  console.log(setObj.foo);  // 3

  // 例2
  // 如果name属性设置了赋值函数，则赋值函数的this绑定receiver。
  let setReceiver = {
    foo: 0,
  };

  Reflect.set(setObj, 'bar', 1, setReceiver);
  console.log(setObj.foo);      // 3
  console.log(setReceiver.foo); // 1

  // 例3
  let p = {
    a: 'a',
  };

  let handler = {
    set(target, key, value, receiver) {
      console.log('set');
      Reflect.set(target, key, value, receiver);
    },
    defineProperty(target, key, attribute) {
      console.log('defineProperty');
      Reflect.defineProperty(target, key, attribute);
    }
  };

  let proxy = new Proxy(p, handler);
  proxy.a = 'A';
  // set
  // defineProperty

  /* 上面代码中，Proxy.set拦截里面使用了Reflect.set，而且传入了receiver，导致触发Proxy.defineProperty
  拦截。这是因为Proxy.set的receiver参数总是指向当前的 Proxy实例（即上例的obj），而Reflect.set一旦传入
  receiver，就会将属性赋值到receiver上面（即obj），导致触发defineProperty拦截。如果Reflect.set没有传入
  receiver，那么就不会触发defineProperty拦截。 */

/* ----------------------- Reflect.has() -----------------------

  Reflect.has方法对应name in obj里面的in运算符。
  如果Reflect.has()方法的第一个参数不是对象，会报错。 */
  let hasObj = {
    foo: 1,
  };

  // 旧写法
  'foo' in hasObj;

  // 新写法
  Reflect.has(hasObj, 'foo')

/* ----------------------- Reflect.deleteProperty() -----------------------

  Reflect.deleteProperty方法等同于delete obj[name]，用于删除对象的属性。

  该方法返回一个布尔值。如果删除成功，或者被删除的属性不存在，返回true；
  删除失败，被删除的属性依然存在，返回false。

  如果Reflect.deleteProperty()方法的第一个参数不是对象，会报错。 */

  const delObj = {foo: 1, bar: 2};

  Reflect.deleteProperty(delObj, 'foo');
  console.log(delObj)
  // {bar: 2}
})()