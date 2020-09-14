
const template = document.querySelector('#counter-temp')

class CounterEle extends HTMLElement {
  constructor() {
    super()

    // 绑定this
    this.handleIncrement = this.handleIncrement.bind(this)
    this.handleDecrement = this.handleDecrement.bind(this)
    
    // this指向当前node
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))

    this.incrementBtn = this.shadowRoot.querySelector('[increment]')
    this.decrementBtn = this.shadowRoot.querySelector('[decrement]')
    this.displayVal =  this.shadowRoot.querySelector('span')
  }

  get value() {
    return this.getAttribute('value')
  }
  set value(newValue) {
    this.setAttribute('value', newValue)
  }

  get step() {
    return this.getAttribute('step')
  }
  set step(newValue) {
    this.setAttribute('step', newValue)
  }

  handleIncrement() {
    const step = Number(this.step) || 1
    this.value = Number(this.value) + step
  }

  handleDecrement() {
    const step = Number(this.step) || 1
    this.value = Number(this.value) - step
  }
  
  connectedCallback() {
    this.incrementBtn.addEventListener('click', this.handleIncrement)
    this.decrementBtn.addEventListener('click', this.handleDecrement)

    if (!this.hasAttribute('value')) {
      this.setAttribute('value', 1)
    }
  }

  disconnectedCallback() {
    this.incrementBtn.removeEventListener('click', this.handleIncrement)
    this.decrementBtn.removeEventListener('click', this.handleDecrement)
  }

  /* --------------- DOM -> object ----------- */
  static get observedAttributes() {
    return ['value']
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.displayVal.innerText = this.value
    }
  }
}

/*  Elements connected to the DOM will be automatically upgraded when 
    the custom element is defined. If you wish to forcibly upgrade an 
    element before it is connected to the DOM, this can be accomplished 
    with CustomElementRegistry.upgrade()
 */
const customCounter = document.createElement('custom-counter')
customElements.define('custom-counter', CounterEle)

console.log(customCounter instanceof CounterEle)  // false
//  forcibly upgrade an element before it is connected to the DOM
customElements.upgrade(customCounter)
console.log(customCounter instanceof CounterEle)  // true
