/**
 *@file 设计循环队列 
 */

/**
 * Initialize your data structure here. Set the size of the queue to be k.
 * @param {number} k
 */
let MyCircularQueue = function(k) {
  this.length = k
  this.head = -1
  this.tail = -1
  // 使用Array(k) 创建数组后必须使用fill填充，否则会导致every等方法错误
  this.queue = Array(k).fill(null)
};

/**
 * Insert an element into the circular queue. Return true if the operation is successful. 
 * @param {number} value
 * @return {boolean}
 */
MyCircularQueue.prototype.enQueue = function(value) {
  const cq = this
  if (cq.isFull()) return false
  else if (cq.isEmpty()) {
    cq.head ++
    cq.tail ++
  } 
  else {
    // tail可以继续累加的条件是 cq.tail < cq.length - 1
    cq.tail < cq.length - 1 ? cq.tail++ : cq.tail = 0 
  }

  cq.queue.splice(cq.tail, 1, value)
  return true
};

/**
 * Delete an element from the circular queue. Return true if the operation is successful.
 * @return {boolean}
 */
MyCircularQueue.prototype.deQueue = function() {
  const cq = this
  if (cq.isEmpty()) return false

  // 先删除head，再处理指针
  cq.queue.splice(cq.head, 1, null)
  // 队列刚移除最后一个元素
  if (cq.head === cq.tail) {
    cq.head = cq.tail = -1
  }
  else {
    // head 可以继续累加的条件是 cq.head < cq.length - 1
    cq.head < cq.length - 1 ? cq.head++ : cq.head = 0
  }
  return true
};

/**
 * Get the front item from the queue.
 * @return {number}
 */
MyCircularQueue.prototype.Front = function() {
  return this.isEmpty() ? -1 : this.queue[this.head]
};

/**
 * Get the last item from the queue.
 * @return {number}
 */
MyCircularQueue.prototype.Rear = function() {
  return this.isEmpty() ? -1 : this.queue[this.tail]
};

/**
 * Checks whether the circular queue is empty or not.
 * @return {boolean}
 */
MyCircularQueue.prototype.isEmpty = function() {
  return this.queue.every(item => item === null)
};

/**
 * Checks whether the circular queue is full or not.
 * @return {boolean}
 */
MyCircularQueue.prototype.isFull = function() {
  return this.queue.every(item => item !== null)
};
