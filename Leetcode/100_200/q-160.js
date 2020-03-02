/**
 * @file LeetCode 160 相交链表
 */

/**
 * 哈希表法 
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
function getIntersectionNode(headA, headB) {
  let map = new Map()
  let curr = headA

  // 遍历headA把节点地址存在map里
  while(curr) {
    map.set(curr, curr)
    curr = curr.next
  }

  curr = headB
  while(curr) {
    if (map.has(curr)) {
      return map.get(curr)
    }
    curr = curr.next
  }

  return null
}

/**
 * 双指针法
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
function getIntersectionNode2(headA, headB) {
  if (headA == null || headB == null) return null

  let [pA, pB] = [headA, headB]
  while(pA !== pB) {
    pA = pA == null ? headB : pA.next
    pB = pB == null ? headA : pB.next
  }
  return pA
}

/**
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
function getIntersectionNode1(headA, headB) {
  let map = new Map()
  function iterator(c1, c2) {
    if (c1 || c2) {
      if (c1 === c2) return c1
      else if (map.has(c1)) return c1
      else if (map.has(c2)) return c2

      c1 ? map.set(c1, c1) : ''
      c2 ? map.set(c2, c2) : ''
      return iterator(
        c1 && c1.next || null,
        c2 && c2.next || null
      )
    }
    return null
  }

  const node = iterator(headA, headB)
  map = null
  return node
}