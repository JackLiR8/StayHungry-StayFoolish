/**
 * @file 排序数组
 * 
 * 相关概念
 * 稳定：如果a原本在b前面，而a=b，排序之后a仍然在b的前面。
 * 不稳定：如果a原本在b的前面，而a=b，排序之后 a 可能会出现在 b 的后面
 */

/**
 * 快速排序
 * 不稳定
 * 时间复杂度：平均O(n*log2(n))， 最坏O(n^2)， 最好O(n*log2(n))
 * @param {number[]} nums
 * @return {number[]}
 */
function sortArray(nums) {
  if (nums.length <= 1) return nums;

  let flag = nums.shift()
  let left = [],
      right = []
  for (const num of nums) {
    if (num > flag) {
      right.push(num)
    } else {
      left.push(num)
    }
  }
  
  return [...sortArray(left), flag, ...sortArray(right)]
};

/**
 * 冒泡排序
 * 稳定
 * 时间复杂度： 平均O(n^2)， 最坏O(n^2)， 最好O(n)
 * @param {number[]} nums
 * @return {number[]}
 */
function bubbleSort(nums) {
  const len = nums.length
  for (let i = 0; i < len - 1; i++) {
    for (let j = 0; j < len - 1 - i; j++) {
      if (nums[j] > nums[j + 1]) {
        [nums[j], nums[j + 1]] = [nums[j + 1], nums[j]]
      } 
    }
  }
  return nums
}

console.log(bubbleSort([4,3,2, 1, 6]))