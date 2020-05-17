/**
 * @file
 */

// ================= 题1 ==================
var a = 0,
    b = 0
function A(a) {
  A = function(b) {
    alert(a + b++)
  }
  alert(a++)
}

A(1)  // '1'
A(2)  // '4'

// alert会把内容转成字符串

// ====================== 深克隆 ========================
// 1. JSON.parse(JSON.stringfy())
//   问题：
//    函数（丢失），Date（转成字符串日期），正则（转成空对象）会有问题

function deepClone(obj) {
  // 过滤特殊情况
  if (obj === null) return null
  if (typeof obj !== 'object') return obj
  if (obj instanceof RefExp) {
    return new RegExp(obj)
  }
  if (obj instanceof Date) {
    return new Date(obj)
  }

  // obj.constructor, 如果传入的是某个构造函数的实例，
  // newObj依然是此构造函数的实例
  let newObj = new obj.constructor;

  for (const key in object) {
    if (object.hasOwnProperty(key)) {
      // 递归克隆
      newObj[key] = deepClone(obj[key])
    }
  }

  return newObj
}

