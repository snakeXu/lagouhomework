一、简答题
1、当我们点击按钮的时候动态给 data 增加的成员是否是响应式数据，如果不是的话，如何把新增成员设置成响应式数据，它的内部原理是什么。
let vm = new Vue({
 el: '#el'
 data: {
  o: 'object',
  dog: {}
 },
 method: {
  clickHandler () {
   // 该 name 属性是否是响应式的
   this.dog.name = 'Trump'
  }
 }
})

答:当我们点击按钮的时候动态给 data 增加的成员不是响应式数据
设置成响应式数据:this.$set(this.dog,'name','Trump')
当你把一个普通的 JavaScript 对象传入 Vue 实例作为 data 选项，Vue 将遍历此对象所有的 property，并使用 Object.defineProperty 把这些 property 全部转为 getter/setter。Object.defineProperty 是 ES5 中一个无法 shim 的特性，这也就是 Vue 不支持 IE8 以及更低版本浏览器的原因。

2、请简述 Diff 算法的执行过程
在元素创建的时候，给每个元素添加了监听属性，当元素发生变化的时候，监听属性收集依赖并通知触发prepatch和update钩子函数，对比完成之后会触发postpatch
钩子函数。首先判断节点中是否有text属性，如果有text属性并且不等于旧节点中的text属性，要更新节点，此时如果老节点有childre，移除节点childre对应的DOM元素，设置新节点对应的DOM元素的textContent。如果新老节点都有children且不相等，调用updateChildren()，对比子节点，并且更新子节点的差异。如果只有新节点有childre，那么就要判断老节点有没有text属性，清空对应DOM元素的textContent，添加所有的子节点。如果只有老节点有children属性，移除所有的老节点。如果只有老节点有text属性，清空对应DOM元素的textContent。
先比较旧的开始节点和新的开始节点，调用sameVode函数比较两个节点的key和sel是否相同，如果相同调用patchVnode比较两个节点的差异更新到DOM。然后比较下一个元素同样是先调用sameVnode和patchVnode，但是如果这两个节点不相同，就比较旧的结束节点和新的结束节点，比较完旧的结束节点和新的结束节点，然后比较结束节点的上一个节点。另外一种是比较旧的开始节点和新的结束节点比较两个节点是否相同，然后移动旧的开始节点对应的DOM元素移动到最后面（因为旧的开始节点与新的结束索引相同），更新索引，旧的开始节点的索引相当于++，新的结束节点的索引相当于--。最后一种情况是比较旧的结束节点和新的开始节点，然后更新DOM，把旧的开始节点移动到最前面。如果上面情况都不满足，那么会用新的开始节点在旧的节点中找到具有相同key的节点，如果没有找到，那么说明这是一个全新的节点，那么我们要创建对应的DOM元素并且插入到节点数组中最前面；如果找到具有相同key的节点，要比较sel是否相同，如果不同说明节点被修改过，也是一个全新的节点，同样要创建对应的DOM元素并且插入到节点数组中最前面；如果找到了key也相同的节点，我们起名叫elmToMove，并且移动到数组最前面。如果上面的比较完毕，新节点数组还有节点，那么这些就是新节点，插入到老节点数组的末尾；如果老节点数组个数超过新节点的数组个数，就是我们要删除的元素。比较的时候，先从开始节点比较，直到遇到不同节点，再从结束节点比较，直到遇到不同节点。

二、编程题
1、模拟 VueRouter 的 hash 模式的实现，实现思路和 History 模式类似，把 URL 中的 # 后面的内容作为路由的地址，可以通过 hashchange 事件监听路由地址的变化。
[代码](https://github.com/snakeXu/vrHash)
2.在模拟 Vue.js 响应式源码的基础上实现 v-html 指令，以及 v-on 指令。
[代码](https://github.com/snakeXu/minVueHtmlOn)
3、参考 Snabbdom 提供的电影列表的示例，利用Snabbdom 实现类似的效果
[代码](https://github.com/snakeXu/snabbdom-homework)