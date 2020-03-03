/**
 * @file 19 删除链表的倒数第N个节点
 */

let list = new LinkedList()
list.addAtTail(1)
list.addAtTail(2)
list.addAtTail(3)
list.addAtTail(4)
list.addAtTail(5)

console.log('list',list)
/**
 * 简化问题：删除从列表开头数起的第 (L - n + 1) 个结点
 * dummyHead用于处理极端情况：链表只有一个结点或删除第一个结点
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
function removeNthFromEnd(head, n) {
  let dummyHead = new ListNode(0)
  dummyHead.next = head

  // 第一次遍历，计算链表长度
  let length = 0
  let curr = head
  while (curr) {
    length++
    curr = curr.next
  }

  length -= n
  curr = dummyHead
  while (length > 0) {
    curr = curr.next
    length--
  }
  curr.next = curr.next.next
  return dummyHead.next
}

/**
 * 双指针法
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
function removeNthFromEnd1(head, n) {
  let dummy = new ListNode(0)
  dummy.next = head
  let first = dummy
  let second = dummy

  // 先移动1指针到n+1位置
  for (let i = 1; i <= n + 1; i++) {
    first = first.next
  }

  // 然后俩个指针都移动
  // 1指针为null时，2指针的位置的next即为目标结点
  while (first) {
    first = first.next
    second = second.next
  }
  second.next = second.next.next
  return dummy.next
}

/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
function removeNthFromEnd2(head, n) {
  let map = new Map()
  let curr = head
  while(curr) {
    map.set(map.size, curr)
    curr = curr.next
  }

  if (n === map.size) {
    map.get(0).next = null
    // 如若链表长度为1，删除后map.get(1)为undefined
    return map.get(1) || null
  }

  let prev = map.get(map.size - n - 1)
  prev.next = prev.next.next
  return map.get(0)
}

console.log('q-19', removeNthFromEnd(list.head, 2))