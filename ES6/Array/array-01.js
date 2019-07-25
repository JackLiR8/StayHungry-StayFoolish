console.group('---------------------- Array.prototype.flat()/flatMap() ----------------------')
/* 
    flat()
        默认拉平一层
        不改变原数组，返回新数组
*/
const arr1 = [1,2,[3]]
console.log(arr1.flat())    // [1,2,3]

const arr2 = [1,2,[3,[4,[5,6]]]]

// flat()的参数为2，表示要“拉平”两层的嵌套数组。
console.log(arr2.flat(2))   // [1,2,3,4,[5,6]]  

// flat() 的参数 Infinity, 表示全部层都拉成一维
console.log(arr2.flat(Infinity))    // [1,2,3,4,5,6]

// 如果原数组有空位，flat()方法会跳过空位。
console.log([1,,3].flat())      // [1,3]