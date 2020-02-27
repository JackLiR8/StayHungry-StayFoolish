
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */

const twoSum = function(target, nums) {
  let _nums = [...nums]

  for (let i = 0; i < nums.length; i++) {
    const num = nums[i]
    const tem = target - num
    const j = _nums.slice(1).findIndex(v => v === tem)
    if (j > -1) {
      return [i, i + j + 1] 
    } else {
      _nums.shift()
    }
  }
}

const target = 6
const nums = [3, 2, 4]
const res = twoSum(target, nums)
console.log(res)
