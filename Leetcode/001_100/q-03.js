/**
 * @file  无重复字符的最长字串
 */

/**
 * 滑动窗口
 * @param {string} s
 * @return {number}
 */
const lengthOfLongestSubstring = function(s) {
  let n = s.length
  let set = new Set()
  let ans = 0, i = 0, j = 0

  while (i < n && j < n) {
    if (!set.has(s.charAt(j))) {
      set.add(s.charAt(j++))
      ans = Math.max(ans, j - i)
    } else {
      set.delete(s.charAt(i++))
    }
  }

  return ans
}

/**
 * 滑动窗口-优化
 * @param {string} s
 * @return {number}
 */
const lengthOfLongestSubstring2 = function(s) {
  let n = s.length, ans = 0
  let map= new Map()

  for (let i = 0, j = 0; j < n; j++) {
    if (map.has(s.charAt(j))) {
      i = Math.max(map.get(s.charAt(j)), i)
    }
    ans = Math.max(ans, j - i + 1)
    map.set(s.charAt(j), j + 1)
  }

  return ans
}

/**
 * @param {string} s
 * @return {number}
 */
const lengthOfLongestSubstring1 = function(s) {
  let length = 0

  for (let i = 0; i < s.length; i++) {
    let temp = s[i];

    for (let j = i + 1; j < s.length; j++) {
      const curr = s[j]
      if (temp.indexOf(curr) > -1) {
        length = temp.length > length ? temp.length : length
        break
      }
      temp = `${temp}${curr}`

      if (j === s.length - 1) {
        return temp.length > length ? temp.length : length
      }
    }

    length = temp.length > length ? temp.length : length
  }

  return length
};

const s = "abva"

const res = lengthOfLongestSubstring(s)
console.log('longest', res)
