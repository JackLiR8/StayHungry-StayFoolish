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
      // this.$pond = this.$pond.filter(item => item !== func)
      let _pond = this.$pond
      for (let i = 0; i < _pond.length; i++) {
        const item = _pond[i];
        if (item === func) {
          _pond[i] = null
          break
        }
      }
    }

    // 通知事件依次执行
    trigger(...args) {
      let _pond = this.$pond
      for (let i = 0; i < _pond.length; i++) {
        const item = _pond[i]
        if (typeof item !== 'function') {
          _pond.splice(i, 1)
          i--
          continue
        }
        item.call(this, ...args)
      }
    }
  }

  return function subscribe() {
    return new Sub()
  }
}()
