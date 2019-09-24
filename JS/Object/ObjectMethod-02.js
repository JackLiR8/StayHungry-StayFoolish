/**
 * @file
 * Object的方法： 
 *    Object.assign()
 *    Object.getPrototypeOf()
 *    Object.is() 
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

})()