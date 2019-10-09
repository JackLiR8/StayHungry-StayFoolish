/**
 * @file Proxy 实现观察者模式
 */
+(() => {
  // 观察者队列
  const queuedObservers = new Set();

  /**
   * 
   * @param  {...Function} fn 
   */
  const observe = (...fn) => {
    fn.forEach(v => {
      queuedObservers.add(v)
    })
  };
  const observable = obj => new Proxy(obj, {set});

  function set(target, key, value, receiver) {
    const result = Reflect.set(target, key, value, receiver);
    queuedObservers.forEach(observe => observe());
    return result;
  }

  const person = observable({
    name: 'Jake',
    age: 10
  });

  function print() {
    console.log(`name: ${person.name}, age: ${person.age}`)
  }

  function alertChange() {
    console.log('data is changing')
  }

  observe(alertChange, print);
  person.name = 'Kobe';
  // data is changing
  // name: Kobe, age: 10

})()