!(() => {
  function showContent(e) {
    console.log(e.target.value)
  }

  /**
   * 防抖函数
   * @param {Function} fn 
   * @param {Number} delay 
   */
  function debounce(fn, delay) {
    let timer = '';
    return function(args) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        fn.call(this, args)
      }, delay);
    }
  }

  /**
   * 节流函数
   * @param {Function} fn 
   * @param {Number} gap 
   */
  function  throttle(fn, gap) {
    let timer = ''
    return function () {
      let _args = arguments;
      if (timer) {
        return
      }

      timer = setTimeout(() => {
        fn.apply(this, _args);
        timer = null;
      }, gap);
    }
  }

  document.querySelector('#normal_input').addEventListener('keyup', showContent)
  document.querySelector('#debounce_input').addEventListener('keyup', debounce(showContent, 500))
  document.querySelector('#throttle_input').addEventListener('keyup', throttle(showContent, 2000))
})()