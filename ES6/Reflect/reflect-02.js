/**
 * @file Reflect 静态方法
 * Reflect.construct()
 * Reflect.getPrototypeOf()
 * Reflect.setPrototypeOf()
 * Reflect.apply()
 * Reflect.defineProperty()
 * Reflect.getOwnPropertyDescriptor()
 * Reflect.isExtensible()
 */

+(() => {
/* ------------------------- Reflect.construct() -------------------------

  Reflect.construct(target, args)

  注意： 第一个参数是函数，第二个参数是数组，否则报错

  Reflect.construct方法等同于new target(...args)，这提供了一种不使用new，来调用构造函数的方法。*/

  function Person(name) {
    this.name = name;
  }

  const jack = Reflect.construct(Person, ['jack']);
  console.log(jack);

/* ------------------------- Reflect.getPrototypeOf() -------------------------

  Reflect.getPrototypeOf方法用于读取对象的__proto__属性，对应Object.getPrototypeOf(obj)。

  Reflect.getPrototypeOf和Object.getPrototypeOf的一个区别是，如果参数不是对象，Object.getPrototypeOf会将这个参数转为对象，然后再运行，而Reflect.getPrototypeOf会报错。*/

  Reflect.getPrototypeOf(jack) === Person.prototype;  // true
  
/* ------------------------- Reflect.setPrototypeOf() -------------------------

  Reflect.setPrototypeOf(obj, newProto)

  Reflect.setPrototypeOf方法用于设置目标对象的原型（prototype），对应Object.setPrototypeOf(obj, newProto)
  方法。它返回一个布尔值，表示是否设置成功。 
  
  Reflect.setPrototypeOf()和Object.setPrototypeOf():
    1. 如果第一个参数不是对象，Object.setPrototypeOf会返回第一个参数本身，而Reflect.setPrototypeOf会报错。
    2. 如果第一个参数是undefined或null，Object.setPrototypeOf和Reflect.setPrototypeOf都会报错。*/

  const myObj = {};
  const proto = {foo: 1};

  Reflect.setPrototypeOf(myObj, proto);
  console.log(Reflect.getPrototypeOf(myObj) === proto)  // true

/* ------------------------- Reflect.apply() -------------------------

  Reflect.apply(func, thisArg, args)

  Reflect.apply方法等同于Function.prototype.apply.call(func, thisArg, args)，
  用于绑定this对象后执行给定函数。 */

/* ------------------------- Reflect.defineProperty() -------------------------

  Reflect.defineProperty(target, porpKey, descriptor)

  Reflect.defineProperty方法基本等同于Object.defineProperty(未来会废除)，用来为对象定义属性。
  如果Reflect.defineProperty的第一个参数不是对象，就会抛出错误.  */

  const def = new Proxy({}, {
    defineProperty(target, prop, descriptor) {
      console.log(descriptor);
      return Reflect.defineProperty(target, prop, descriptor);
    }
  });

  def.foo = 1;
  // {value: 1, writable: true, enumerable: true, configurable: true}

/* ------------------------- Reflect.getOwnPropertyDescriptor() -------------------------

  Reflect.getOwnPropertyDescriptor(target, propertyKey)

  Reflect.getOwnPropertyDescriptor基本等同于Object.getOwnPropertyDescriptor，用于得到指定属性
  的描述对象，将来会替代掉后者。*/

  let ownObj = {};
  Reflect.defineProperty(ownObj, 'own', {
    value: 'myself',
  });

  console.log(Reflect.getOwnPropertyDescriptor(ownObj, 'own'));
  // {value: "myself", writable: false, enumerable: false, configurable: false}

/* ------------------------- Reflect.isExtensible() -------------------------

  Reflect.isExtensible(obj)

  Reflect.isExtensible方法对应Object.isExtensible，返回一个布尔值，表示当前对象是否可扩展。

  如果参数不是对象，Object.isExtensible会返回false，因为非对象本来就是不可扩展的，
  而Reflect.isExtensible会报错。*/

  console.log(Reflect.isExtensible(ownObj));  // true

  Reflect.preventExtensions(ownObj);
  console.log(Reflect.isExtensible(ownObj));  // false
})()