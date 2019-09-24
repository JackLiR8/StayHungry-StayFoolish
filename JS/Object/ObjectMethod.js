+(() => {
  // ----------------- Object.create() -----------------
  
  /*  Object.create() 方法创建一个新对象， 新对象的__proto__ 指向现有对象 
  
      Object.create(proto[, propertiesObject])
  */

  const obj = {
    a: 1,
  }

  let createDemo = Object.create(obj, {

    // b 会成为所创建对象的数据属性
    b: {
      value: 2,
      writable: true,
      configurable: true
    },

    // foo 会成为所创建对象的访问器属性
    foo: {
      configurable: false,
      get() {
        return 10
      },
      set(val) {
        console.log(`setting createDemo.foo to ${val}`)
      }
    }
  })

  console.log(createDemo)
  console.log(createDemo.a)
  console.log(createDemo.foo)
  createDemo.foo = 16

  // -------------------- Object.defineProperty -------------------

  /* 
    Object.defineProperty() 方法直接在一个对象上定义新的属性或修改现有属性，并返回该对象。

    语法:  Object.defineProperty(obj, prop, descriptor)

          + obj 要在其上定义属性的对象
          + prop 要定义或修改的属性
          + descriptor 将被定义或修改的属性描述符

          + 返回值： 被传递给函数的对象

    描述:
        该方法允许精确添加或修改对象的属性。通过赋值操作添加的普通属性是可枚举的，
        能够在属性枚举期间呈现出来（for...in 或 Object.keys 方法）， 这些属性的
        值可以被改变，也可以被删除。这个方法允许修改默认的额外选项（或配置）。默认
        情况下，使用 Object.defineProperty() 添加的属性值是不可修改的。

    属性描述符:
        对象里目前存在的属性描述符有两种主要形式：数据描述符 和 存取描述符。
        数据描述符是一个具有值的属性，该值可能是可写的，也可能不是可写的。
        存取描述符是由getter-setter函数对描述的属性。
        描述符必须是这两种形式之一；不能同时是两者。

        数据描述符可选键：configurable, enumerable, value, writable
        存取描述符可选键：configurable, enumerable, get, set

        数据描述符和存取描述符均具有的可选键值：
        (默认值是在使用Object.defineProperty定义属性的情况下)

          + configurable
            当且仅当该属性的 configurable 为 true 时，该属性描述符才能够被改变，
            同时该属性也能从对应的对象上被删除。默认为 false。

          + enumerable
            当且仅当该属性的enumerable为true时，该属性才能够出现在对象的枚举属性
            中。默认为 false

        只有数据描述符具有的键值：

          + value 
            该属性对应的值。可以是任何有效的 JavaScript 值（数值，对象，函数等）。
            默认为 undefined。

          + writable
            当且仅当该属性的writable为true时，value才能被赋值运算符改变。
            默认为 false。

        只有存取描述符具有的可选键值：
          
          + get
            一个给属性提供 getter 的方法，如果没有 getter 则为 undefined。
            当访问该属性时，该方法会被执行，方法执行时没有参数传入，但是会传入this对象
            （由于继承关系，这里的this并不一定是定义该属性的对象）。

          + set
            一个给属性提供 setter 的方法，如果没有 setter 则为 undefined。
            当属性值修改时，触发执行该方法。该方法将接受唯一参数，即该属性新的参数值。
  */
    let defineObj = {
      a: 1
    }

    Object.defineProperty(defineObj, 'b', {
      enumerable: true,
      writable: true,
      value: 2
    })
    
    Object.defineProperty(defineObj, 'c', {
      configurable: true,
      value: 3
    })

    Object.defineProperty(defineObj, 'd', {
      enumerable: true,
      get() {
        return 4
      },
      set(val) {
        console.log(`setting defineObj.d to ${val}`)
      }
    })

    console.log(Object.keys(defineObj));  // ['a', 'b', 'd']
    console.log(defineObj)  // {a: 1, b: 2, c: 3}   只显示数据属性
    console.log(defineObj.d)  // 4
    defineObj.d = 44;         // setting defineObj.d to 44

    // defineObj.b 的 configurable 为false， delete 不能将其删除
    delete defineObj.b;
    console.log(defineObj)  // {a: 1, b: 2, c: 3}

    delete defineObj.c;
    console.log(defineObj)  // {a: 1, b: 2}

  // -------------------- Object.defineProperties() --------------------
  /* 
      Object.defineProperties(obj, props)
  */
    let propsObj = {};
    Object.defineProperties(propsObj, {
      'foo': {
        enumerable: true,
        writable: true,
        value: 'hello'
      },
      'bar': {
        enumerable: true,
        get() {
          return 'world'
        }
      }
    })

    console.log(propsObj)   // {foo: 'hello'}
    console.log(Object.keys(propsObj))  // ['foo', 'bar']
    console.log(propsObj.bar) // 'world'
})()