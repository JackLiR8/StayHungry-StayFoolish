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
 * 
 * 方法
 * 1. observe() 使IntersectionObserver开始监听一个目标元素。
 * 
 * 2. disconnect() 使IntersectionObserver对象停止监听工作
 * 
 * 3. takeRecords() 返回所有观察目标的IntersectionObserverEntry对象数组
 * 
 * 4. unobserve() 使IntersectionObserver停止监听特定目标元素。
 */

const options = {
  root: document.getElementById('container'),
}

const callback = ([entry]) => {
  if (entry.isIntersecting) {
    console.log(`li3 entered`, entry)
  }
}

const observer = new IntersectionObserver(callback, options)

const target = document.querySelector('.li3')

observer.observe(target)

/**
 * @document IntersectionObserverEntry
 * 
 * IntersectionObserverEntry接口描述了目标元素与其根元素容器在某一特定过渡时刻的交叉状态
 * IntersectionObserverEntry 的实例作为 entries 参数被传递到一个 IntersectionObserver 的回调函数中; 
 * 此外, 这些对象只能通过调用IntersectionObserver.takeRecords() 来获取.
 * 
 * 属性
 * 1.boundingClientRect
 *  返回包含目标元素的边界信息的DOMRectReadOnly. 边界的计算方式与  Element.getBoundingClientRect() 相同.
 * 
 * 2.intersectionRect
 *  返回一个 DOMRectReadOnly 用来描述根和目标元素的相交区域.
 * 
 * 3.intersectionRatio
 *  目标元素的可见比例，即intersectionRect占boundingClientRect的比例，完全可见时为1，完全不可见时小于等于0
 * 
 * 4. isIntersecting
 *  返回一个布尔值, 如果目标元素与交叉区域观察者对象(intersection observer) 的根相交，则返回 true .
 *  如果返回 true, 则 IntersectionObserverEntry 描述了变换到交叉时的状态; 如果返回 false, 那么可以
 *  由此判断,变换是从交叉状态到非交叉状态.
 * 
 * 5. rootBounds
 *  返回一个 DOMRectReadOnly 用来描述交叉区域观察者(intersection observer)中的根.
 *  根元素的矩形区域的信息，getBoundingClientRect()方法的返回值，如果没有根元素（即直接相对于视口滚动），则返回null
 * 
 * 6. target
 *  与根出现相交区域改变的元素 (Element).
 * 
 * 7. time
 *  返回一个记录从 IntersectionObserver 的时间原点(time origin)到交叉被触发的时间的时间戳(DOMHighResTimeStamp).
 */

function query(selector) {
  return Array.from(document.querySelectorAll(selector))
}

function getImgObserver() {
  const options = {
    root: document.querySelector('img-box'),
  }
  const imgObserver =  new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        console.log('--- img ---',entry)
        const { target } = entry
        target.src = target.getAttribute('datasrc')
        imgObserver.unobserve(target)
      }
    }
  }, options)

  return imgObserver
}

function produceLazyImg() {
  const imgObserver = getImgObserver()
  const imgs = query('img')
  for (const img of imgs) {
    imgObserver.observe(img)
  }
}
produceLazyImg()
