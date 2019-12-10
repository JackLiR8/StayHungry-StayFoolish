/**
 * @file 给domString 中的img添加样式/去除样式
 */

const domString = `1324234<figure class="image"><img src="https://123.jpg"><img src="https://456.jpg"></figure>`

let c = imgTagAddStyle(domString)
let d = tagRidStyle(c)
console.log('cccc:', c)
console.log('dd-dd:', d)

/**
 * 给string中的img添加style
 * @param {String} htmlstr dom-string
 * @return {String} 
 */
function imgTagAddStyle(htmlstr) {

  // 正则匹配不含style="" 或 style='' 的img标签
  const regex1 = new RegExp("(i?)(\<img)(?!(.*?style=['\"](.*)['\"])[^\>]+\>)", 'gmi')
  htmlstr = htmlstr.replace(regex1, '$2 style="max-width:100vw;height:auto;"$3')

  return htmlstr
}

/**
 * 去除string中标签的style
 * @param {String} htmlstr - dom-string
 * @return {String}
 */
function tagRidStyle(htmlstr) {
  htmlstr = htmlstr.replace(/\s?style\s*?=\s*?(['"])[\s\S]*?\1/g, '')
  return htmlstr
}
