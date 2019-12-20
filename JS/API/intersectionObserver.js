/**
 * @file Intersection Observer API
 * 
 *  let observer = new IntersectionObserver(callback, options)
 * 
 * 注意： 
 * 回调函数将会在主线程中被执行。所以该函数执行速度要尽可能的快。如果有一些耗时的操作需要执行，
 * 建议使用 Window.requestIdleCallback() 方法
 * 
 * IntersectionObserver Options
 * 1. root
 *  指定根元素，用于检查目标的可见性。必须是目标元素的祖先元素。默认浏览器视口
 * 
 * 2. rootMargin
 *  根元素外边距。该属性值是用作root元素和target发生交集时候的计算交集的区域范围，
 *  使用该属性可以控制root元素每一边的收缩或者扩张。默认值为0。
 * 
 * 3. threshold (默认0)
 *  number | number[]。 目标元素和根元素相交程度达到该值的时候，执行回调函数 
 * 
 *  threshold: 0.5 => target元素的在root元素中的可见性超过50%的时候执行回调
 * 
 *  threshold: [0, 0.25, 0.75, 1] => target元素在root元素的可见程度每多25%就执行一次回调
 */

const options = {
  root: document.getElementById('container'),
  threshold: 0.5
}

const callback = ([entry]) => {
  if (entry.isIntersecting) {
    console.log(`li3 entered`)
  }
}

const observer = new IntersectionObserver(callback, options)

const target = document.querySelector('.li3')

observer.observe(target)