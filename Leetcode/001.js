
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */

const twoSum = function(target, nums) {
  let map = new Map()

  for (let i = 0; i < nums.length; i++) {
    const dif = target - nums[i]
    if (map.has(dif)) {
      return [map.get(dif), i]
    }
    map.set(nums[i], i)
  }
  return []
}
/* const twoSum = function(target, nums) {
  let _nums = [...nums]

  for (let i = 0; i < nums.length; i++) {
    _nums.shift()
    const num = nums[i]
    const tem = target - num
    const j = _nums.indexOf(tem)
    if (j > -1) {
      return [i, i + j + 1] 
    }
  }
  return []
} */

const target = 6
const nums = [3, 2, 4]
const res = twoSum(target, nums)
console.log(res)
