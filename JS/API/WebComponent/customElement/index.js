
class Foo extends HTMLElement {
  constructor() {
    super()
    console.log('x-foo')
  }

  connectedCallback() {
    console.log('connected')
    // called each time this instance of the custom 
    // element is added into the DOM.
  }

  disconnectedCallback() {
    console.log('disconnected')
    // called each time this instance of the 
    // custom element is removed from the DOM
  }

  static get 
  attributeChangeCallback() {
    // called each time the value of an observed attribute is changed
  }

  adoptedCallback() {
    // called each time this instance is moved to a new document object 
    // with document.adoptNode().
  }
}

const customed = customElements.define('x-foo', Foo)