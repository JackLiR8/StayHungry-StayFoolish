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
      if (node.nodeType === 3 && reg.test(text)) {
        console.log(RegExp.$1)
        let arr = RegExp.$1.split('.');
        let val = vm;
        arr.forEach(k => {
          val = val[k.trim()];
        })
        node.textContent = text.replace(/\{\{(.*)\}\}/, val);
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
    return new Observe(data);
  }
}

function Observe(data) {
  for (const key in data) {
    let val = data[key];
    Object.defineProperty(data, key, {
      // configurable: true,
      enumerable: true,
      get() {
        return val;
      },
      set(newVal) {
        if (newVal === val) {
          return
        }
        val = newVal;

        // 拦截新值
        observe(newVal);
      }
    })
  }
}
