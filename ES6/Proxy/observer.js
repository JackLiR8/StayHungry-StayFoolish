/**
 * @file Proxy 实现观察者模式
 */
+(() => {
  const person = observable({
    name: 'Jake',
    age: 10
  });

  function print() {
    console.log(`资料变更：name: ${person.name}, age: ${person.age}`)
  }

  observe(print);
  person.name = 'Kobe';
  // 资料变更：name: kobe, age: 10
})