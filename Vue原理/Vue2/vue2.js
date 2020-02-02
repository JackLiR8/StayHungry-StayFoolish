function Vue(options = {}) {
  this.$options = options;
  let data = this._data = this.$options.data;
  observe(data);

  // this 代理 this._data
  for (const key in data) {
    Object.defineProperty(this, key, {
      enumerable: true,
      get() {
        return this._data[key];
      },
      set(newVal) {
        this._data[key] = newVal
      }
    })
  }

  new Compile(options.el, this);
}

function Compile(el, vm) {
  // el 表示编译范围
  vm.$el = document.querySelector(el);

  // 创建文档碎片，把app中的内容转移到内存中
  let fragment = document.createDocumentFragment();
  while(child = vm.$el.firstChild) {
    fragment.appendChild(child);
  }
  replace(fragment)

  function replace(fragment) {
    Array.from(fragment.childNodes).forEach(node => {
      let text = node.textContent;
      let reg = /\{\{(.*)\}\}/;
      // 文本节点
      if (node.nodeType === 3 && reg.test(text)) {
        let arr = RegExp.$1.split('.');
        let val = vm;
        arr.forEach(k => {
          val = val[k.trim()];
        })

        new Watcher(vm, RegExp.$1, function(newVal) {
          // 函数接受新值newVal
          node.textContent = text.replace(/\{\{(.*)\}\}/, newVal);
        })
        // 替换逻辑
        node.textContent = text.replace(/\{\{(.*)\}\}/, val);
      }
      // 元素节点
      if (node.nodeType === 1) {
        let nodeAttrs = node.attributes;    // 当前dom节点属性
        Array.from(nodeAttrs).forEach(attr => {
          let name = attr.name;
          let exp = attr.value;

          // 简单实现 input[type="text"] 的v-model
          if (name.indexOf('v-model') == 0) {
            node.value = getValue(vm, exp);
          }
          new Watcher(vm, exp, function(newVal) {
            node.value = newVal;
          })
          node.addEventListener('input', function(e) {
            let newVal = e.target.value;
            let pathArr = exp.split('.');
            let length = pathArr.length;
            let target = vm;
            for (let i = 0; i < length - 1; i++) {
              target = target[pathArr[i]]
            }
            target[pathArr[length - 1]] = newVal;
          })
        })
      }
      
      if (node.childNodes) {
        replace(node);
      }
    })
  }

  vm.$el.appendChild(fragment);
}

// 观察对象
function observe(data) {
  if (typeof data !== 'object') {
    return
  }
  return new Observe(data);
}

function Observe(data) {
  let dep = new Dep()
  for (const key in data) {
    let val = data[key];
    if (typeof val === 'object') {
      observe(val);
    }
    Object.defineProperty(data, key, {
      enumerable: true,
      get() {
        Dep.target && dep.addSub(Dep.target);
        return val;
      },
      set(newVal) {
        if (newVal === val) {
          return
        }
        val = newVal;

        // 拦截新值
        observe(newVal);
        dep.notify();
      }
    })
  }
}

// 发布订阅
function Dep() {
  this.subs = [];
}
Dep.prototype.addSub = function (sub) {
  this.subs.push(sub);
}
Dep.prototype.notify = function () {
  this.subs.forEach(sub => sub.update());
}

// watcher
function Watcher(vm, exp, fn) {
  Object.assign(this, { fn, vm, exp });
  Dep.target = this;
  getValue(vm, exp);
  Dep.target = null;
}
Watcher.prototype.update = function () {
  let val = getValue(this.vm, this.exp);
  this.fn(val);
}

function getValue(vm, exp) {
  let val = vm;
  let arr = exp.split('.');
  arr.forEach(k => {
    val = val[k.trim()];
  })
  return val;
}
