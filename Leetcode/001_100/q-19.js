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
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
function removeNthFromEnd(head, n) {
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

/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
function removeNthFromEnd1(head, n) {
  let [pool, curr] = [[], head]
  while(curr) {
    pool.push(curr)
    curr = curr.next
  }

  if (n === pool.length) {
    pool[0].next = null
    return pool[1] || null
  }

  let prev = pool[pool.length - n - 1]
  prev.next = prev.next.next
  return pool[0]
}

console.log('q-19', removeNthFromEnd(list.head, 2))