/**
 * @file 发布订阅模式
 */ 

  function Dep() {
    this.subs = [];
  }

  Dep.prototype.addSub = function () {
    this.subs.push(sub);
  }

  Dep.prototype.notify = function () {
    this.subs.forEach( sub => sub.update());
  }

  function Watcher(fn) {
    
  }