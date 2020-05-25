/**
 * @file 20 有效的括号
 */

/**
 * @param {string} s
 * @return {boolean}
 */
const isValid = function(s) {
  if (typeof s !== 'string') throw TypeError('传入的值必须是字符串')
  if (s === '') return true

  let stack = [],
      map = {
        '(': ')',
        '[': ']',
        '{': '}'
      }
  for (const curr of s) {
    // 左括号入栈
    if (Reflect.has(map ,curr)) {
      stack.push(curr)
      continue
    }
    // 碰到右括号：
    // 1. 判断栈是否为空
    // 2. 退栈
    // 3. 比较此括号是否和刚退栈的括号相匹配
    if (stack.length === 0) return false
    const top = stack.pop()
    if (map[top] !== curr) return false
  }
  
  // 拦截都是左括号或者左右长度不对称的情况
  if (stack.length > 0) return false

  return true
};

console.log(isValid('()'))