/**
 * @file 二分查找
 */

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number} 
 */
function search(nums, target) {
  let low = 0,
      high = nums.length - 1

  while(high >= low) {
    // 确定中间索引
    let i = Math.floor((low + high) / 2)
    
    if (nums[i] === target) return i
    else if (nums[i] > target) high = i - 1
    else low = i + 1
  }

  return -1
}

console.log(search([-1,0,3,5,9,12], 16))