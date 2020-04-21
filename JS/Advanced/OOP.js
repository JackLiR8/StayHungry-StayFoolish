/**
 * @file Object Oriented Programming
 */

// ====================== 使用 mixin ===================
let bird = {
  name: 'Donald',
  numLegs: 2
}

let boat = {
  name: 'Warrior',
  type: 'race-boat'
}

/**
 * @mixin glideMixin
 * @param {Object} obj 
 */
function glideMixin(obj) {
  obj.glide = function() { console.log('gliding...') }
}

glideMixin(bird)
glideMixin(boat)

bird.glide()
boat.glide()

// ============== 使用闭包保护内部变量 ================
function Bird() {
  let weight = 15
  this.getWeight = function() {
    return weight
  }
}

let bird = new Bird()
bird.getWeight()

// ==================== 创建 Module ==================
/* IIFE: Immediately Invoked Function Expression
    使用立即执行函数创建一个module
*/

let isCuteMixin = function(obj) {
  obj.isCute = function() {
    return true
  }
}
let singMixin = function(obj) {
  obj.sing = function() {
    console.log("Singing to an awesome tune")
  }
}

let funModule = (function() {
  return {
    isCuteMixin,
    singMixin
  }
})()

let child = {}
funModule.isCuteMixin(child)
funModule.singMixin(child)
child.sing()
