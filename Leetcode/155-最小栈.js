/**
 * @file 155 最小栈
 */

/**
 * initialize your data structure here.
 */
const MinStack = function() {
  this.stack = []
  this.min = null
};

/** 
 * @param {number} x
 * @return {void}
 */
MinStack.prototype.push = function(x) {
  if (
    this.stack.length === 0 ||
    this.stack.every(item => item > x)
  ) {
    this.min = x
  }

  this.stack.push(x)
};

/**
 * @return {void}
 */
MinStack.prototype.pop = function() {
  const deleted = this.stack.pop()

  if (this.stack.length === 0) {
    this.min = null
    return
  }
  if (this.min === deleted) {
    this.min = [].concat(this.stack).sort((a, b) => a - b)[0]
  }
};

/**
 * @return {number}
 */
MinStack.prototype.top = function() {
  return this.stack[this.stack.length - 1]
};

/**
 * @return {number}
 */
MinStack.prototype.getMin = function() {
  return this.min
};