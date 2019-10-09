/**
 * @file Reflect 静态方法
 * Reflect.construct()
 * Reflect.getPrototypeOf()
 * Reflect.setPrototypeOf()
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


})()