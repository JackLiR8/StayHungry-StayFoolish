/**
 * @file call、 apply实现
 */

// ======================== call ====================
Function.prototype.myCall = function(ctx) {
  ctx = ctx || window
  ctx._fn = this

  var args = []
  for (let i = 1; i < arguments.length; i++) {
    args.push('arguments[' + i + ']')
  }
  let res = eval('ctx._fn(' + args + ')')
  delete ctx._fn
  return res
}

function print(b) {
  return `a:${this.a}, b:${b}`
}

let a = 'global'
let obj = {
  a: 'obj.a'
}

let res = print.myCall(obj, 'bb')
console.log('res:', res)
