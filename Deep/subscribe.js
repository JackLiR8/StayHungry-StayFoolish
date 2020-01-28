let _subscribe = function() {
  // 发布订阅类
  class Sub {
    constructor() {
      // 事件池
      this.$pond = [];
    }

    add(func) {
      let included = this.$pond.includes(func)
      included ? null : this.$pond.push(func)
    }

    remove(func) {
      this.$pond = this.$pond.filter(item => item !== func)
    }

    // 通知事件依次执行
    trigger(...args) {
      let pond = [...this.$pond]
      for (let i = 0; i < pond.length; i++) {
        const item = pond[i];
        item.call(this, ...args)
      }
    }
  }

  return function subscribe() {
    return new Sub()
  }
}()

let s1 = _subscribe()
console.log(s1)