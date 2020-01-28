# Vue3 + IntersectionObserver API 实现一个无限滚动组件

首先，在你的Vue2.x项目里安装[@vue/composition-api](https://github.com/vuejs/composition-api)插件，就可以使用 Vue3 中的 Composition ApI 了。这里不在对Vue Composition API做详细介绍，可直接参考[官方文档](https://vue-composition-api-rfc.netlify.com/api.html#setup), 本文用到的API有 *setup*, *ref*, *onMounted*, *onBeforeUnmount*  

*IntersectionObserver API*
>Intersection Observer API提供了一种异步观察目标元素与祖先元素或顶级文档viewport的交集中的变化的方法。

在IntersectionObserver API出现之前，无限滚动的解决方案都依赖于监听scroll事件，为了避免频繁触发scroll事件造成的性能问题，需要手动节流。而通过 *IntersectionObserver*，我们可以更优雅地实现无限滚动。在阅读本文之前可先了解[IntersectionObserver](https://developer.mozilla.org/zh-CN/docs/Web/API/IntersectionObserver) 和 [IntersectionObserverEntry](https://developer.mozilla.org/zh-CN/docs/Web/API/IntersectionObserverEntry), 将有助于理解本文内容

## 创建一个观察器组件

首先，创建一个观察器，当它与根元素 *(root)* 相交的时候，触发回调  

1. 创建一个div作为target元素， 并把它设为透明
```html
<!-- Observer.vue -->
<template>
  <div class="target" ref="target"></div>
</template>
```
```css
.target {
  width: 100%;
  height: 50px;
  background: transparent;
}
```

2. 组件挂载之后使用IntersectionObserver对目标元素进行观察

```js
// Observer.vue
import { ref, onMounted, onBeforeUnmount } from '@vue/composition-api'
export default {
  props: {
    handleIntersect: Function,
    rootSelector: String
  },

  setup(props) {
    const { handleIntersect, rootSelector } = props;
    let observer = null
    const target = ref(null)

    onMounted(() => {
      const options = {
        root: document.querySelector(rootSelector),
        rootMargin: "200px 0px"
      }

      // 构建观察器
      observer = new IntersectionObserver(([entry]) => {

        // 目标元素与根元素相交
        if (entry && entry.isIntersecting) {
          handleIntersect()
        }
      }, options)

      // 观察目标元素
      observer.observe(target.value)
    })

    // 组件销毁前停止监听
    onBeforeUnmount(() => {
      observer.disconnect()
    })

    return {
      target
    }
  }
}
```
**注意：**  
1. setup中不能访问组件实例 this, 2.x中使用 `this.$emit` 向父组件发起事件通知的方式不适用了。所以我们将事件处理函数通过 *props* 传递给子组件 

2. Vue3 在模板中使用 ref 的方式与 2.x 有些不同。   
首先，在 *setup* 中使用 *ref* 创建一个响应式（*reactive*）变量：  
`const target = ref(null)` ;   
并且 *setup* 返回这个变量：  
`return { target }`  
然后，在 *template* 中，可以直接通过 *ref="target"* 绑定某个元素为 *ref target* :   
`<div ref="target"></div>`  
 但是在 *setup* 内部， 我们需要通过 `target.value` 访问ref, 所以在观察目标元素的时候访问的是 *target.value* 而不是 *target* ：  
 `observer.observe(target.value)`

3. 组件销毁前，需要停止监听，所以在生命周期 *onBeforeUnmount* （相当于2.x中的 beforeDestroy）里调用观察器的 *disconnect* 方法

4. 为了优化用户体验，在创建观察器的时候配置rootMargin: `rootMargin: "200px 0px"`, 即向下滚动时，目标元素还有200px与根元素相交的时候就执行回调

## 创建无限滚动组件
1. 将观察器组件引入，并把它放在列表尾部。将事件处理函数，根元素选择器传给子组件
```html
<!-- InfiniteScroll.vue -->
<template>
  <div>
      <h2>infinite scroll</h2>
      <ol class="infinite-scroll-box">
        <li v-for="item in items" :key="item.id">
          {{item.name}}
        </li>
        <Observer 
          :handle-intersect="getData"
          root-selector=".infinite-scroll-box" />
      </ol>
  </div>
</template>
```
2. 给ol设一个样式，溢出滚动
```css
ol {
  height: 300px;
  width: 600px;
  margin: auto;
  border: 4px solid lightsteelblue;
  overflow-y: scroll;
}
li {
  height: 20px;
  border-bottom: 1px solid lightcoral;
}
```
3. 使用 *ref* 创建响应式变量items (列表数据)；鉴于page只在setup内部使用，所以并不需要通过ref创建。 
```js
// InfiniteScroll.vue
import { ref } from '@vue/composition-api'
import Observer from '@/components/base/Observer'
export default {
  components: {
    Observer
  },

  setup() {
    let items = ref([])
    let page = 1
    async function getData() {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/comments?_page=${page}&_limit=40`
      )
      page++
      const newItems = await res.json()
      if (newItems) {
        items.value = [...items.value, ...newItems]
      }
    }

    return {
      items,
      getData
    }
  }
}
```
至此，无限滚动的效果就已经实现了， 看下最终效果:  

***
**参考文献**  
1. [MDN Intersection Observer API](https://developer.mozilla.org/zh-CN/docs/Web/API/Intersection_Observer_API)  
2. [Build an Infinite Scroll component using Intersection Observer API](https://vueschool.io/articles/vuejs-tutorials/build-an-infinite-scroll-component-using-intersection-observer-api/)
