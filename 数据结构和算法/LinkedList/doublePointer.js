/**
 * 链表-双指针技巧
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
console.log('cycle',n1)

function hasCycle(head) {
  let map = new Map()
  function judge(map, cur){
    if (cur && cur.next) {
      if (map.has(cur.next)) {
        return true
      }
      map.set(cur.next, Symbol())
      return judge(map, cur.next)
    }
    return false
  }
  return judge(map, head)
}

console.log('hascycle', hasCycle(n1))