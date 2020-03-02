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

console.log('hascycle', hasCycle(n1))

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
function detectCycle(head) {
  let map = new Map()
  function judge(map, cur){
    if (cur) {
      // 如果map里存在cur
      // 则返回cur，即返回链表开始入环的第一个节点
      if (map.has(cur)) {
        return map.get(cur)
      }

      // 如果不存在，把当前节点存入map
      // 递归向下查找
      map.set(cur, cur)
      return judge(map, cur.next)
    }
    return null
  }
  return judge(map, head)
}
console.log('detectCycle', detectCycle(n1))