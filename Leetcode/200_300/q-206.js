/**
 * @file 206 - 反转链表
 */

let list = new LinkedList()
list.addAtTail(1)
list.addAtTail(2)
list.addAtTail(3)
list.addAtTail(4)
list.addAtTail(5)

/**
 * 官方-迭代
 * @param {ListNode} head
 * @return {ListNode}
 */
function reverseList(head) {
  let prev = null
  let curr = head
  while (curr) {
    let nextTemp = curr.next
    curr.next = prev
    prev = curr
    curr = nextTemp
  }

  return prev
}

/**
 * 官方-递归
 * @param {ListNode} head
 * @return {ListNode}
 */
function reverseList1(head) {
  if (head === null || head.next === null) return head
  let p = reverseList1(head.next)
  head.next.next = head
  head.next = null
  return p
}

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
function reverseList2(head) {
  if (!head) return null

  let dummy = new ListNode(0)
  dummy.next = head
  let temp = null

  while(head.next) {
    temp = head.next
    head.next = temp.next
    temp.next = dummy.next
    dummy.next = temp
  }

  return dummy.next
}

function reverseList3(head) {
  if (!head) return null
  let dummy = new ListNode(0)
  dummy.next = head
  let temp = null

  function recurse(head) {
    if (head.next) {
      temp = head.next
      head.next = temp.next
      temp.next = dummy.next
      dummy.next = temp
      return recurse(head)
    }
    return dummy.next
  }

  return recurse(head)
}

const rl1 = reverseList1(list.head)
console.log('rl1', rl1)
