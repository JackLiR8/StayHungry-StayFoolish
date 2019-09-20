+(() => {
  const arr = [5,3,4,1,6,9,8,0,2,7];

  /**
   * 冒泡排序
   * @param {Array} arr 
   * @return {Array} 排序后的数组
   */
  function bubbleSort(arr) {
    let a = [...arr]

    for (let i = 0; i < a.length - 1; i++) {

      for (let j = 0; j < a.length - i - 1; j++){
        if (a[j] > a[j + 1]) {
          [a[j], a[j +　1]] = [a[j + 1], a[j]];
        }  
      }
    }

    return a
  }

  console.log('bubbleSort', bubbleSort(arr))
  
  /**
   * 快速排序
   * @param {Array} arr 
   * @return {Array} 排序后的数组
   */
  function quickSort(arr) {
    
    // arr.length <= 1, 无需排序
    if (arr.length <= 1) {
      return arr
    }

    let a = [...arr];

    let [less, more, flag] = [[], [], a[0]];
    for (let i = 1; i < a.length; i++) {
      if (a[i] > flag) {
        more.push(a[i])
      } else {
        less.push(a[i])
      }
    }

    return [...quickSort(less), flag, ...quickSort(more)]

  }

  console.log('quickSort', quickSort(arr))

})()