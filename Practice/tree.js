+(() => {

  const arr = [
    {name: '2-2-2', id: 9, parent_id: 7},
    {name: '1', id: 1, parent_id:''},
    {name: '1-1', id: 3, parent_id: 1},
    {name: '2-1', id: 5, parent_id: 2},
    {name: '2', id: 2, parent_id: ''},
    {name: '1-1-1', id: 6, parent_id: 3},
    {name: '2-2', id: 7, parent_id: 2},
    {name: '2-2-1', id: 8, parent_id: 7},
    {name: '1-1-1-1', id: 9, parent_id: 6},
    {name: '2-2-1', id: 10, parent_id: 7},
    {name: '2-2-3', id: 11, parent_id: 7}
  ];

  /**
   * 从一个数组里面把另一个数组里的元素全部剔除
   * @param {Array} targets 剔除元素组成的数组
   * @param {Array} from  原数组
   * 
   * @return {Array} 剔除指定元素后的数组
   */
  function extractEle(targets, from) {
    for (const v of targets) {
      const index = from.indexOf(v);
      from.splice(index, 1);
    }

    return from
  }

  /**
   * 把具有父子关系的数组转成树形结构
   * @param {Array} arr 原数组[将要变成树形结构的数组]
   * @param {Array} tree 节点数组[根节点、父节点数组]
   * @param {Number=} root 是否是根节点[1:根节点；0:非根节点]
   */
  function toTree( arr, tree = [], root = 1) {

    // 寻找根节点
    if (root) {
      for (const v of arr) {
        if (!v.parent_id) {
          tree.push(v);
        }
      }

      // 把归入树形结构的元素从原数组中剔除
      const rest = extractEle(tree, arr);

      toTree(rest, tree, 0)
    } else {

      // 由父节点寻找子节点
      for (const parent of tree) {
        const children = arr.filter(child => child.parent_id === parent.id);
        if (children.length) {
          Object.assign(parent, {children})
        }

        const rest = extractEle(children, arr);

        // rest.length > 0 说明还有元素没有归入树结构
        // children.length > 0 说明父节点下有子节点，可继续寻找 grandChildNode
        if (rest.length && children.length) {
          toTree(rest, children, 0)
        }
      }
    }
  }

  let tree = [];

  toTree(arr, tree, 1);
  console.log(tree)

  // ----------------------- 优化 --------------------
  function getTree(data, parentId = '') {
    let [tree, temp] = [[], []];

    for (const v of data) {
      if (v.parent_id === parentId) {
        tree.push(v)
      } else {
        temp = getTree(data, v.id)
      }
    }

  }

})()