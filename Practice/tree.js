+(() => {

  const arr = [
    {name: '2-2-2', id: 12, parent_id: 7},
    {name: '1', id: 1, parent_id:''},
    {name: '1-1', id: 3, parent_id: 1},
    {name: '2-1', id: 5, parent_id: 2},
    {name: '2', id: 2, parent_id: ''},
    {name: '1-1-1', id: 6, parent_id: 3},
    {name: '2-2', id: 7, parent_id: 2},
    {name: '2-2-1', id: 8, parent_id: 7},
    {name: '1-1-1-1', id: 9, parent_id: 6},
    {name: '2-2-2-1', id: 10, parent_id: 12},
    {name: '2-2-3', id: 11, parent_id: 7}
  ];

  /**
   * 把具有父子关系的数组转成树形结构
   * @param {Array} data  原数组 
   * @param {Number, String=} parentId 
   * @return {Array} 树形结构数组
   */
  function toTree(arr, pId = '') {
    let tree = []
    for (let item of arr) {
      if (item.parent_id === pId) {
        // 搜索当前项目的子项目
        let children = toTree(arr, item.id)
        if (children.length > 0) item.children = children
        tree.push(item)
      }
    }
    return tree
  }

  const myTree = toTree(arr);
  console.log('myTree', myTree)
})()