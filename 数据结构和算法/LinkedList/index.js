/**
 * @file 数据结构-单链表
 */

function ListNode(val) {
  this.val = val
  this.next = null
}

let LinkedList = function() {
  this.head = null
  this.length = 0
}

/**
 * 获取链表中第 index 个节点的值。如果索引无效，则返回-1
 * @param {Number} - 索引
 * @return {any}
 */
LinkedList.prototype.get = function(index) {
  const vm = this
  // 拦截无效索引
  if (index < 0 || index >= vm.length) {
    return -1
  }

  if (!vm.head) {
    return null
  }

  let node = vm.head
  for (let i = 0; i < index; i++) {
    node = node.next
  }
  return node.val
}

/**
 * 在链表的第一个元素之前添加一个值为 val 的节点。
 * 插入后，新节点将成为链表的第一个节点
 */
LinkedList.prototype.addAtHead = function(val) {
  const vm = this;
  let node = new ListNode(val)

  // LinkedList length为0时，直接把新增node设为head
  // 无需给新增节点设置next
  if (vm.length > 0) {
    node.next = getNode(vm, 0)
  }
  vm.head = node
  vm.length++
}

/**
 * 将值为 val 的节点追加到链表的最后一个元素
 */
LinkedList.prototype.addAtTail = function(val) {
  const vm = this
  let node = new ListNode(val)

  if (vm.length === 0) {
    vm.head = node
  } else {
    let prev = getNode(vm, vm.length - 1)
    prev.next = node
  }
  vm.length++
}

/**
 * 在链表中的第 index 个节点之前添加值为 val  的节点。
 * 如果 index 等于链表的长度，则该节点将附加到链表的末尾。
 * 如果 index 大于链表长度，则不会插入节点。
 * 如果index小于0，则在头部插入节点。
 */
LinkedList.prototype.addAtIndex = function(index, val) {
  const vm = this
  if (index > vm.length) {
    return
  } else if (index <= 0) {
    vm.addAtHead(val)
  } else if (index === vm.length) {
    vm.addAtTail(val)
  } else {
    let _prev = getNode(vm, index - 1)
    let _next = _prev.next
    let node = new ListNode(val)

    _prev.next = node
    node.next = _next
    vm.length++
  }
}

/**
 * 如果索引 index 有效，则删除链表中的第 index 个节点
 */
LinkedList.prototype.deleteAtIndex = function(index) {
  const vm = this
  if (index < 0 || index >= vm.length) {
    return
  } else if (index === 0) {
    // 删除第一个
    vm.head = vm.length === 1 ? null : getNode(vm, 1)
  } else if (index === vm.length - 1) {
    // 删除最后一个
    if (vm.length === 1) {
      vm.head = null
    } else {
      const _prev = getNode(vm, index - 1)
      _prev.next = null
    }
  } else {
    const _prev = getNode(vm, index - 1)
    const cur = _prev.next
    _prev.next = cur.next
  }
  vm.length--
}

function getNode(vm, index) {
  if (!vm.head) {
    return null
  }
  let node = vm.head
  for (let i = 0; i < index; i++) {
    node = node.next
  }
  return node
}

const l1 = new LinkedList()
console.log('list', l1)
l1.addAtIndex(0, 10)
l1.addAtIndex(0, 20)
l1.addAtIndex(1, 30)
l1.get(0)
// l1.addAtHead(4)
// l1.addAtIndex(5,0)
// l1.addAtHead(6)
console.log(l1.get(4))