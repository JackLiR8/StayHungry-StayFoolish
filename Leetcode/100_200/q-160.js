/**
 * @file LeetCode 160
 */

/**
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
function getIntersectionNode(headA, headB) {
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