/* ================================================================ */
/*                      USING DOCUMENTFRAGMENT                      */
/* ================================================================ */

const container = document.getElementById('frag-container')
const documentFragment = new DocumentFragment()

documentFragment.appendChild(document.createElement('p'))
documentFragment.appendChild(document.createElement('p'))
documentFragment.appendChild(document.createElement('p'))


console.log(documentFragment.children.length)   // 3
container.appendChild(documentFragment)         
console.log(documentFragment.children.length)   // 0

console.log(container)


/* ================================================================ */
/*                          USING TEMPLATE                          */
/* ================================================================ */

const fooEle = document.querySelector('#foo')
const template = document.querySelector('#template')
const templateFragment = template.content

fooEle.appendChild(templateFragment)
// If you wish to instead copy the template, a simple importNode() 
// can be used to clone the DocumentFragment:
// fooEle.appendChild(document.importNode(templateFragment, true))

console.log(document.body.innerHTML)



