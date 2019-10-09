/**
 * @file 
 * Proxy.revocable()
 * this问题
 */ 
+(() => {

/*  ------------------ Proxy.revocable() ------------------- 
  Proxy.revocable方法返回一个对象，该对象的proxy属性是Proxy实例，revoke属性是一个函数，
  可以取消Proxy实例。

*/

  let {proxy, revoke} = Proxy.revocable({}, {});

  proxy.foo = 123;
  console.log(proxy.foo);   // 123

  revoke();
  try {
    console.log(proxy.foo);
  } catch (error) {
    console.error(error)
    // TypeError: Cannot perform 'get' on a proxy that has been revoked
  }

/* ----------------- this问题 ------------------
虽然 Proxy 可以代理针对目标对象的访问，但它不是目标对象的透明代理，即不做任何拦截的情况下，
也无法保证与目标对象的行为一致。主要原因就是在 Proxy 代理的情况下，目标对象内部的this关键
字会指向 Proxy 代理。
*/

})()