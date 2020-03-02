/**
 * @file leetcode-2 两数相加
 */

function ListNode(val) {
  this.val = val
  this.next = null
}

let n1 = new ListNode(2)
let n2 = new ListNode(4)
let n3 = new ListNode(3)
n1.next = n2
n2.next = n3

let m1 = new ListNode(5)
let m2 = new ListNode(6)
let m3 = new ListNode(4)
m1.next = m2
m2.next = m3

l1 = n1
l2 = m1

/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
function addTwoNumbers(l1, l2) {
  let dummyHead = new ListNode(0)
  let [p, q, carry] = [l1, l2, 0]

  // curr 记录当前结点
  let curr = dummyHead
  while (p || q ) {
    let num1 = p && p.val || 0
    let num2 = q && q.val || 0
    let sum = num1 + num2 + carry

    let newNode = new ListNode(sum % 10)
    curr.next = newNode
    curr = newNode
    p = p ? p.next : null
    q = q ? q.next : null
    
    carry = Math.floor(sum / 10)
  }

  // 若carry大于0，追加一位
  if (carry > 0) {
    curr.next = new ListNode(1)
  }

  return dummyHead.next
}

const res = addTwoNumbers(l1, l2)
console.log('res', res)

/**
 * 此中方法适用于两个链表长度相差较大时的情况
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
function addTwoNumbers1(l1, l2) {
  let dummyHead = new ListNode(0)
  let [p, q, carry] = [l1, l2, 0]

  // curr 记录当前结点
  let curr = dummyHead
  while (p || q || carry) {
    if (p !== null && q === null) {
      if (carry) {
        if (p.val < 9) {
          let _node = new ListNode(p.val + carry)
          _node.next = p.next
          curr.next = _node
        }
      } else {
        curr.next = p
        break
      }
    } else if (p === null && q !== null) {
      if (carry) {
        if (q.val < 9) {
          let _node = new ListNode(q.val + carry)
          _node.next = q.next
          curr.next = _node
        }
      } else {
        curr.next = q
        break
      }
    }

    let num1 = p && p.val || 0
    let num2 = q && q.val || 0
    let sum = num1 + num2 + carry

    let newNode = new ListNode(sum % 10)
    curr.next = newNode
    curr = newNode
    p = p ? p.next : null
    q = q ? q.next : null
    
    carry = Math.floor(sum / 10)
  }

  return dummyHead.next
}

const res1 = addTwoNumbers1(l1, l2)
console.log('res1', res1)
