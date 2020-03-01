/**
 * @file q-142 环形链表2
 */

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