/**
 * @file 给domString 中的img添加样式/去除样式
 */

const domString = `1324234<figure class="image"><img src="https://yc-test-1257265770.cos.ap-guangzhou.myqcloud.com/PC/img/2019/12/14/1576288647483DSC_0490.JPG"></figure>`

/**
 * DomString 包裹在html里并给图片添加样式，返回Blob
 * @param {String} domString
 * @return {Blob}  
 */
function wrapDom(domString) {
  let arr = [
    `<html><head><style>img {max-width: 100%; height: auto;}</style></head><body>`, 
    domString,
    `</body></html>`
  ];

  return new Blob(arr, { type: 'text/html;charset=utf-8' })
}

/**
 * 提取DomString中body的innerHTML
 * @param {String} domStr
 * @return {String} body的innerHTML 
 */
function extractContent(domStr) {
  let html = document.createElement('html');
  html.innerHTML = domStr;
  return html.querySelector('body').innerHTML;
}
