/**
 * @file 内置的Symbol值
 * 1. Symbol.hasInstance
 * 2. Symbol.isConcatSpreadable
 * 3. Symbol.species
 */

+(() => {
/* ------------------------- Symbol.hasInstance -------------------------
对象的Symbol.hasInstance属性，指向一个内部方法。当其他对象使用instanceof运算符，
判断是否为该对象的实例时，会调用这个方法。比如，foo instanceof Foo在语言内部，实际
调用的是Foo[Symbol.hasInstance](foo)。 */

  // 例1
  class MyClass {
    [Symbol.hasInstance](foo) {
      return foo instanceof Array;
    }
  }

  $p([1, 2] instanceof new MyClass());  // true
  /* MyClass是一个类，new MyClass()会返回一个实例。该实例的Symbol.hasInstance方法，
  会在进行instanceof运算时自动调用，判断左侧的运算子是否为Array的实例。 */

  // 例2
  class Even {
    static [Symbol.hasInstance](obj) {
      return Number(obj) % 2 === 0;
    }
  }

  $p(1 instanceof Even);  // false
  $p(2 instanceof Even);  // true

// ------------------------- Symbol.isConcatSpreadable -------------------------
/* 对象的Symbol.isConcatSpreadable属性等于一个布尔值，表示该对象用于
Array.prototype.concat()时，是否可以展开。 */

  // 例1
  let arr1 = ['c', 'd'];
  $p(['a', 'b'].concat(arr1, 'e'));  // ['a', 'b', 'c', 'd', 'e']
  $p(arr1[Symbol.isConcatSpreadable]) // undefined

  let arr2 = ['c', 'd'];
  arr2[Symbol.isConcatSpreadable] = false;
  $p(['a', 'b'].concat(arr2, 'e'));   // ['a', 'b', ['c', 'd'], 'e']

  /* 数组的默认行为是可以展开，Symbol.isConcatSpreadable默认等于undefined。
  该属性等于true时，也有展开的效果。 
  
  类似数组的对象正好相反，默认不展开。它的Symbol.isConcatSpreadable属性设为true，才可以展开。*/

  // 例2
  let obj = {length: 2, 0: 'c', 1: 'd'};
  $p(['a', 'b'].concat(obj, 'e'));    // ['a', 'b', obj, 'e']
  
  obj[Symbol.isConcatSpreadable] = true;
  $p(['a', 'b'].concat(obj, 'e'));  // ['a', 'b', 'c', 'd', 'e']

// ------------------------- Symbol.species -------------------------
// 对象的Symbol.species属性，指向一个构造函数。创建衍生对象时，会使用该属性。
  // 例1
  class MyArray extends Array {}

  const a = new MyArray(1, 2, 3);
  const b = a.map(x => x);
  const c = a.filter(x => x > 1);

  $p(b instanceof MyArray); // true
  $p(c instanceof MyArray); // true
  $p(c instanceof Array); // true

  /* 上面代码中，子类MyArray继承了父类Array，a是MyArray的实例，b和c是a的衍生对象。
  你可能会认为，b和c都是调用数组方法生成的，所以应该是数组（Array的实例），但实际上它
  们也是MyArray的实例。 
  
  Symbol.species属性就是为了解决这个问题而提供的。现在，我们可以为MyArray设置Symbol.species属性。*/
  // 例2
  class MyArr extends Array {
    static get [Symbol.species]() { return Array; }
  }

  const d = new MyArr();
  const e = d.map(x => x);

  $p(e instanceof MyArr);   // false
  $p(e instanceof Array);   // true
  $p(d instanceof MyArr);   // true

  /* 总之，Symbol.species的作用在于，实例对象在运行过程中，需要再次调用自身的构造函数时，
  会调用该属性指定的构造函数。它主要的用途是，有些类库是在基类的基础上修改的，那么子类使用
  继承的方法时，作者可能希望返回基类的实例，而不是子类的实例。 */

// ------------------------- Symbol.match -------------------------
/* 对象的Symbol.match属性，指向一个函数。当执行str.match(myObject)时，如果该属性存在，
会调用它，返回该方法的返回值。

  String.prototype.match(regexp)
    // 等同于
  regexp[Symbol.match](this)  */
  
  // 例1
  class MyMatcher {
    [Symbol.match](string) {
      return 'hello world'.indexOf(string);
    }
  }

  'e'.match(new MyMatcher());   // 1

// ------------------------- Symbol.replace -------------------------
/* 对象的Symbol.replace属性，指向一个方法，当该对象被String.prototype.replace方法调用时，
会返回该方法的返回值。 
  
  String.prototype.replace(searchValue, replaceValue)
    // 等同于
  searchValue[Symbol.replace](this, replaceValue)   */

  // 例1
  const x = {
    [Symbol.replace](...s) {
      console.log(s);
    }
  };

  'Hello'.replace(x, 'World');    // ["Hello", "World"]
  
})()