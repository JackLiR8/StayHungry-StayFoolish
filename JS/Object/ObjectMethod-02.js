/**
 * @file Object的方法： 
 * Object.assign()
 * Object.getPrototypeOf()
 * Object.is() 
 * Object.isExtensible()
 * Object.seal()
 * Object.freeze()
 * Object.getOwnPropertyNames()
 */

+(() => {
  // --------------------- Object.assign() ---------------------
  var obj = {
    a:1,
    b:2,
    c:3
  }  
  var new_obj = Object.assign({c:4,d:5},obj)
  console.log('new_obj:', new_obj)    // {a:1,b:2,c:3,d:5}

  /* 
      Object.assign() 方法用于将所有可枚举属性的值从一个或多个源对象复制到目标对象。
      返回值是目标对象 

      语法：Object.assign(target, ...sources)

          如果目标对象和源对象具有相同的键，那么源对象中的值将会覆盖目标对象中的值，
          并且后来的源对象会覆盖先前的源对象

      深拷贝问题：
          Object.assign() 拷贝的是属性值，如果一个源对象属性值是指向一个对象的引用，那么拷贝的是该引用值（即指向引用对象的地址）

  */
  var p1 = {a:{name:'kobe'}}
  var p2 = Object.assign({},p1)
  p2.a.name = 'curry'
  console.log('p1', p1)       
  // {a:{name:'curry'}}  由此可见属性值是引用数据类型时，此方法只是浅拷贝

  /* 注意是看属性值是不是引用数据类型！！，若属性值是基本数据类型，则进行的是深拷贝。如下： */
  var p3 = {name:'kobe'}
  var p4 = Object.assign({},p3)
  p4.name = 'curry'
  console.log(p3)     // {name:'kobe'}
  console.log(p4)     // {name:'curry'}

  // --------------------- Object.getPrototypeOf() ---------------------
  /* 
      Object.getPrototypeOf() 方法返回指定对象的原型（内部[[Prototype]]属性的值）。
  */

  const proto = {
    foo: 'hello'
  }

  const newProto = Object.create(proto);

  console.log(Object.getPrototypeOf(proto) === Object.prototype);   // true
  console.log(Object.getPrototypeOf(newProto) === proto);     // true

  // --------------------- Object.is() ------------------------
  /*  Object.is() 判断两个值是否相同。如果下列任何一项成立，则两个值相同：

        两个值都是 undefined
        两个值都是 null
        两个值都是 true 或者都是 false
        两个值是由相同个数的字符按照相同的顺序组成的字符串
        两个值指向同一个对象
        两个值都是数字并且
          都是正零 +0
          都是负零 -0
          都是 NaN
          都是除零和 NaN 外的其它同一个数字

      '===' 认为 NaN 不等于 NaN, +0 等于 -0
  */
  console.log('NaN === NaN',NaN === NaN)    // false
  console.log('+0 === -0',+0 === -0)      // true

  console.log(Object.is(NaN, NaN));   // true
  console.log(Object.is(+0, -0));     // false

/* --------------------- Object.isExtensible() ---------------------

    Object.isExtensible() 方法判断一个对象是否是可扩展的（是否可以在它上面添加新的属性）。
 */
    // 新对象默认是可扩展的.
    var empty = {};
    Object.isExtensible(empty); // === true

    // ...可以变的不可扩展.
    Object.preventExtensions(empty);
    Object.isExtensible(empty); // === false

    // 密封对象是不可扩展的.
    var sealed = Object.seal({});
    Object.isExtensible(sealed); // === false

    // 冻结对象也是不可扩展.
    var frozen = Object.freeze({});
    Object.isExtensible(frozen); // === false

/* --------------------- Object.seal() ---------------------
  Object.seal()方法封闭一个对象，阻止添加新属性并将所有现有属性标记为不可配置。
  当前属性的值只要可写就可以改变。

    Object.seal(obj)

  通常，一个对象是可扩展的（可以添加新的属性）。密封一个对象会让这个对象变的不能
  添加新属性，且所有已有属性会变的不可配置。属性不可配置的效果就是属性变的不可删除，
  以及一个数据属性不能被重新定义成为访问器属性，或者反之。但属性的值仍然可以修改。
  尝试删除一个密封对象的属性或者将某个密封对象的属性从数据属性转换成访问器属性，
  结果会静默失败或抛出TypeError（在严格模式 中最常见的，但不唯一）。
*/
  const sealObj = {
    prop1: 42
  }

  Object.seal(sealObj);

  sealObj.prop1 = 30;
  console.log(sealObj.prop1); // 30

  delete sealObj.prop1
  console.log(sealObj.prop1)  // 30 删除无效

  sealObj.prop2 = 40;
  console.log(sealObj)    // {prop1: 30}  密封对象添加无效

/* --------------------- Object.freeze() ---------------------

  Object.freeze() 方法可以冻结一个对象。一个被冻结的对象再也不能被修改；冻结了一个对象则不能
  向这个对象添加新的属性，不能删除已有属性，不能修改该对象已有属性的可枚举性、可配置性、可写性，
  以及不能修改已有属性的值。此外，冻结一个对象后该对象的原型也不能被修改。freeze() 返回和传入
  的参数相同的对象。

    Object.freeze(obj)
*/

  // 浅冻结 
  // 被冻结的对象是不可变的。但也不总是这样。下例展示了冻结对象不是常量对象（浅冻结）。
  let obj1 = {
    internal: {}
  };
  
  Object.freeze(obj1);
  obj1.internal.a = 'aValue';
  
  console.log(obj1.internal.a) // 'aValue'

  // 深冻结函数
  function deepFreeze(obj) {
    const propsNames = Object.getOwnPropertyNames(obj);

    for (const v of propsNames) {
      let prop = obj[v];

      if (typeof prop === 'object' && prop !== null) {
        deepFreeze(prop)
      }
    }

    return Object.freeze(obj)
  }

  let deep = {
    a: {
      b: '123',
    }
  }

  deepFreeze(deep);

  deep.a.e = '123';
  console.log(deep.a.e)   // undefined

  deep.a.b = '456';
  console.log(deep.a.b)   // '123'

/* --------------------- Object.getOwnPropertyNames() ---------------------
  Object.getOwnPropertyNames()方法返回一个由指定对象的所有自身属性的属性名（包括不可枚举
  属性但不包括Symbol值作为名称的属性）组成的数组。

    Object.getOwnPropertyNames(obj)
*/

  let demo = {
    a: 1
  }

  let demo1 = Object.defineProperties(demo, {
    b: {
      value: 2
    },
    _c: {
      value: 3,
      enumerable: true
    }
  })

  console.log(Object.getOwnPropertyNames(demo1)); // ["a", "b", "_c"]
  console.log(Object.keys(demo1));  // ["a", "_c"]

})()