/**
 * q-141 环形链表
 */

function ListNode(val) {
  this.val = val
  this.next = null
}

let n1= new ListNode(3)
let n2 = new ListNode(2)
let n3 = new ListNode(0)
let n4 = new ListNode(4)
n1.next = n2
n2.next = n3
n3.next = n4
n4.next = n2

function hasCycle(head) {
  let map = new Map()
  function judge(map, cur){
    if (cur) {
      if (map.has(cur)) {
        return true
      }
      map.set(cur, Symbol())
      return judge(map, cur.next)
    }
    return false
  }
  return judge(map, head)
}

function hasCycle1(head) {
  let fast = head
  let slow = head
  while (slow !== null && fast !== null && fast.next !== null) {
    fast = fast.next.next
    slow = slow.next
    if (fast === slow) {
      return true
    }
  }
  return false
}
