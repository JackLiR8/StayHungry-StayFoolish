/**
 * @file vue双向数据绑定原理 
 */ 

function Vue(options = {}) {

  // 将options挂载在实例上
  this.$options = options;
  
  // 数据拦截
  let data = this._data = options.data;
  observe(data);

  // 将data中的属性绑定到vue实例上
  for (let key in data) {
    Object.defineProperty(this, key, {
      enumerable: true,
      get() {
        return this._data[key];
      },
      set(newVal) {
        this._data[key] = newVal;
      }
    })
  }

  // 编译
  new Compile(options.el, this);
}

/**
 * 编译函数
 * @param {string} el 挂载节点选择器（#app）
 * @param {*} vm vue实例（this）
 */ 
function Compile(el, vm) {
  vm.$el = document.querySelector(el);

  // 创建文档碎片，将子节点移入
  let fragment = document.createDocumentFragment();

  // 将app中的内容移入到内存中
  while (child = vm.$el.firstChild) {
    fragment.appendChild(child);
  }

  replace(fragment);

  /**
   * 将{{}}里的变量替换
   */ 
  function replace(fragment) {
    Array.from(fragment.childNodes).forEach( node => {
      let text = node.textContent;
      let reg = /\{\{(.*)\}\}/;

      // 拿到所有 {{}} 里的变量
      if (node.nodeType === 3 && reg.test(text)) {
        let arr = RegExp.$1.split('.');
        let val = vm;

        // 取值 this.a.a
        arr.forEach((k) => {
          val = val[k];
        });

        node.textContent = text.replace(reg, val);
      }

      if (node.childNodes) {
        replace(node);
      }
    })
  }

  vm.$el.appendChild(fragment);
}

function observe(data) {
  if (typeof data !== 'object') return;
  return new Observe(data);
}

/**
 * 数据拦截
 * @param data 需要拦截的数据对象
 */ 
function Observe(data) {
  for (let key in data) {
    let val = data[key];
    observe(val);

    Object.defineProperty(data, key, {
      enumerable: true,
      get() {
        return val;
      },
      set(newVal) {
        if (newVal === val) {
          return;
        }
        val = newVal;

        // 对新数据进行拦截
        observe(newVal);
      }
    })
  }
}