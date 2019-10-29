/**
 * @file Symbol
 * 1. 属性名遍历
 * 2. Symbol.for(), Symbol.keyFor()
 */
+(() => {
// 1. ----------------------- 属性名遍历 -----------------------

/* Symbol 作为属性名，该属性不会出现在for...in、for...of循环中，也不会被
Object.keys()、Object.getOwnPropertyNames()、JSON.stringify()返回。
但是，它也不是私有属性，有一个Object.getOwnPropertySymbols方法，可以获取
指定对象的所有 Symbol 属性名。 */

  const obj = {c: 'cc', d: 'dd'};
  let a = Symbol('a');
  let b = Symbol('b');

  Object.defineProperties(obj, {
    [a]: {
      enumerable: true,
      writable: true,
      value: 'Hello'
    },
    [b]: {
      enumerable: true,
      writable: true,
      value: 'World'
    }
  });

  const objSymbols = Object.getOwnPropertySymbols(obj);
  $p(objSymbols); // [Symbol(a), Symbol(b)]

  for (const key in obj) {
    $p(key)
  }
  // c d

// Reflect.ownKeys() 可以遍历所有属性
  const allKeys = Reflect.ownKeys(obj);
  $p(allKeys);
  // ["c", "d", Symbol(a), Symbol(b)]

// ----------------------- Symbol.for(), Symbol.keyFor() -----------------------

/* Symbol.for方法接受一个字符串作为参数，然后搜索有没有以该参数作为名称的 Symbol 值。
如果有，就返回这个 Symbol 值，否则就新建并返回一个以该字符串为名称的 Symbol 值。 */

  let c = Symbol.for('foo');
  let d = Symbol.for('foo');
  let e = Symbol('foo');
  $p(c === d);  // true
  $p(c === e);  // false

/* Symbol.for()与Symbol()这两种写法，都会生成新的 Symbol。
  它们的区别是，前者会被登记在全局环境中供搜索，后者不会。Symbol.for()不会每次调用就返回一个新的 
Symbol 类型的值，而是会先检查给定的key是否已经存在，如果不存在才会新建一个值。比如，如果你调用
Symbol.for("cat")30 次，每次都会返回同一个 Symbol 值，但是调用Symbol("cat")30 次，会返回
30 个不同的 Symbol 值。 

  Symbol.keyFor方法返回一个已登记的 Symbol 类型值的key */

  let s1 = Symbol.for('foo');
  $p(Symbol.keyFor(s1));  // 'foo'

  let s2 = Symbol('foo');
  $p(Symbol.keyFor(s2));  // undefined
  // 变量s2属于未登记的 Symbol 值，所以返回undefined。

/*Symbol.for为 Symbol 值登记的名字，是全局环境的，可以在不同的 iframe 或
service worker 中取到同一个值。 */
})()