/**
 * @file 200 岛屿数量
 */

/**
 * 广度优先搜索解法
 * @param {character[][]} grid
 * @return {number}
 */
function numIslands(grid) {
  if (!Array.isArray(grid) || grid.length === 0) return 0

  const nr = grid.length
  const nc = grid[0].length
  let num = 0

  for (let r = 0; r < nr; r++) {
    for (let c = 0; c < nc; c++) {
      if (grid[r][c] === '1') {
        ++num
        grid[r][c] = '0'

        // neighbors充当队列，先进先出
        // 把当前位置存入队列
        let neighbors = []
        neighbors.push(r * nc + c)

        // BFS
        while (neighbors.length > 0) {
          const id = neighbors.shift()
          const row = Math.floor(id / nc)
          const col = id % nc
          // 依次判断上下左右是否是陆地
          if (row - 1 >= 0 && grid[row - 1][col] === '1') {
            neighbors.push((row - 1) * nc + col)
            grid[row - 1][col] = '0'
          }
          if (row + 1 < nr && grid[row + 1][col] === '1') {
            neighbors.push((row + 1) * nc + col)
            grid[row + 1][col] = '0'
          }
          if (col - 1 >= 0 && grid[row][col - 1] === '1') {
            neighbors.push(row * nc + col - 1)
            grid[row][col - 1] = '0'
          }
          if (col + 1 < nc && grid[row][col + 1] === '1') {
            neighbors.push(row * nc + col + 1)
            grid[row][col + 1] = '0'
          }
        }
      }
    }
  }

  return num
};

// ==================== 深度优先解法 ===================
/**
 * 深度优先搜索解法
 * @param {character[][]} grid
 * @return {number}
 */
function numIslandsDfs(grid) {
  if (!Array.isArray(grid) || grid.length === 0) {
    return 0
  }

  let nr = grid.length,
      nc = grid[0].length,
      numIslands = 0
  for (let r = 0; r < nr; r++) {
    for (let c = 0; c < nc; c++) {
      if (grid[r][c] === '1') {
        numIslands++
        dfs(grid, r, c)
      }
    }
  }

  return numIslands
}

function dfs(grid, r, c) {
  let nr = grid.length,
      nc = grid[0].length

  if (r < 0 || c < 0 || r >= nr || c >= nc || grid[r][c] === '0') {
    return
  }

  grid[r][c] = '0'
  dfs(grid, r - 1, c)
  dfs(grid, r + 1, c)
  dfs(grid, r, c - 1)
  dfs(grid, r, c + 1)
}