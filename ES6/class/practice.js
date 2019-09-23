+(() => {

  class Parent {
    constructor(name, gender, height) {
      this.name = name;
      this.gender = gender;
      this._height = height
    }
    // 不能只写getter, 不写setter
    // 可以只写setter
    get height() {
      return `${this.name} : ${this._height}cm`
    }
    set height(h) {
      if (h < 165) {
        alert('short')
      } else {
        this._height = h
      }
    }

    talk(words) {
      console.log(`${this.name} : ${words}`)
    }

    sing(song) {
      console.log(`${this.name} is singing ${song}`)
    }

    static checkClass() {
      // 静态方法里的 this 指向类，而不是类的实例
      console.log(this.name)
    }

  }

  const father = new Parent('Jack', 'male', 186);
  const mother = new Parent('Lucy', 'female', 168);

  console.log('father', father);
  console.log('mother', mother);
  console.log(father.height);
  father.talk('hi'); 
  mother.sing('my love')
  Parent.checkClass()     // Parent

  class Child extends Parent {
    constructor(name, gender, height, hobby) {
      super(name, gender, height);
      this.hobby = hobby;
    }

    sing(song) {
      // 普通方法中，super指向父类的原型对象
      super.sing(song);
      console.log('in child voice')
    }

    static checkClass() {
      // 静态方法中， super指向父类
      super.checkClass()
    }
  }

  const child1 = new Child('Curry', 'male', 192);
  const child2 = new Child('Lily', 'female', 176);

  child1.talk('how you doing');
  child2.sing('hero')
  Child.checkClass()    // Child

  // 继承
  console.log(Child.__proto__ === Parent);    // true
  console.log(Parent.__proto__ === Function.prototype)  // true
  console.log(Function.prototype.__proto__ === Object.prototype)  // true
  console.log(Object.prototype.__proto__)   // null

  // 原型链1：(构造函数的继承)
  // Child => Parent => Function.prototype => Object.prototype => null

  console.log(Child.prototype.__proto__ === Parent.prototype)   // true

  // 原型链2：(方法的继承)
  // Child.prototype => Parent.prototype => Object.prototype => null

})()