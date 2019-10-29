/**
 * @file Symbol
 * 1. Symbol()
 * 2. Symbol.prototype.description
 * 3. Symbol作属性名
 * 4. 消除魔术字符串
 */

+(() => {
// ---------------------- 1. Symbol ----------------------
  let s = Symbol();

  /* 注意，Symbol函数前不能使用new命令，否则会报错。这是因为生成的 Symbol 是一个原始类型的
  值，不是对象。也就是说，由于 Symbol 值不是对象，所以不能添加属性。基本上，它是一种类似于字符
  串的数据类型。 */

  let s1 = Symbol('foo');
  $p(s1);   // Symbol(foo)

  /* Symbol函数可以接受一个字符串作为参数，表示对 Symbol 实例的描述，主要是为了在控制台显示，
  或者转为字符串时，比较容易区分.
  
    如果 Symbol 的参数是一个对象，就会调用该对象的toString方法，将其转为字符串，然后才生成一
  个 Symbol 值*/
  const obj = {
    toString() {
      return 'abc';
    }
  };
  const sym = Symbol(obj);
  $p(sym);   // Symbol(abc)

  /* 注意，Symbol函数的参数只是表示对当前 Symbol 值的描述，因此相同参数的Symbol函数的
  返回值是不相等的。 */

  const s2 = Symbol('foo');
  $p(s1 === s2);   // false

  /* 
    1. Symbol 值不能与其他类型的值进行运算，会报错。
    2. Symbol 值可以显式转为字符串
    3. Symbol 值也可以转为布尔值，但是不能转为数值
  */
  
  const myS = Symbol('myS');
  $p(myS.toString());
  $p(String(myS));   // 'Symbol(myS)'
  $p(Boolean(myS));  // true
  // $p(Number(myS));    // TypeError

// 2. ---------------------- Symbol.prototype.description ----------------------

  // 实例属性description，直接返回 Symbol 的描述。
  $p(myS.description);  // 'myS'

// 3. ---------------------- Symbol 作属性名 ----------------------

  // Symbol 值可以作为标识符，用于对象的属性名，就能保证不会出现同名的属性。
  const mySymbol = Symbol();
  let a = {
    [mySymbol]: 'hello'
  };

  $p(a);  // {Symbol(): 'hello'}

  $p(a[mySymbol]);  // 'hello'
  $p(a.mySymbol);   // undefined
  // 注意，Symbol 值作为对象属性名时，不能用点运算符。

// 4. ---------------------- 消除魔术字符串 ----------------------
  /* 魔术字符串指的是，在代码之中多次出现、与代码形成强耦合的某一个具体的字符串或者数值。
  风格良好的代码，应该尽量消除魔术字符串，改由含义清晰的变量代替。*/

  function getArea(shape, options) {
    let area = 0;

    switch (shape) {
      case 'Triangle':
        area = .5 * options.width * options.height;
        break;

      case 'Square':
        area = options.width * options.height;
        break;

      default:
    }

    return area;
  }

  getArea('Triangle', {width: 100, height: 100});

  // 上面代码中，字符串Triangle就是一个魔术字符串。它多次出现，与代码形成“强耦合”，
  // 不利于将来的修改和维护。

  const shapeType = {
    triangle: Symbol(),
    square: Symbol()
  }

  function getArea1(shape, options) {
    let area = 0;

    switch (shape) {
      case shapeType.triangle:
        area = .5 * options.width * options.height;
        break;

      case shapeType.square:
        area = options.width * options.height;
        break;
    
      default:
    }

    return area;
  }

  $p(getArea1(shapeType.square, {width: 100, height: 100})) // 10000
})()