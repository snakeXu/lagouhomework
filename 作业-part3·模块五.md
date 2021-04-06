1、Vue 3.0 性能提升主要是通过哪几方面体现的？
· 响应式系统升级
  · Vue.js 2.X 中响应式系统的核心defineProperty
  · Vue.js 3.0 中使用Proxy对象重写响应式系统
    · 可以监听动态新增的属性
    · 可以监听删除的属性
    · 可以监听数组的索引和length属性
· 编译优化
  · Vue.js 2.X 中通过标记静态根节点，优化diff过程
  · Vue.js 3.0 中标记和提升所有的静态根节点，diff的时候只需要对比动态节点内容
    · Fragments (升级 vetur 插件)
    · 静态提升
    · Patch flag
    · 缓存时间处理函数
· 源码体积的优化
  · Vue.js 3.0 中移除了一些不常用的API
    · 例如：inline-template、filter 等
  · Tree-shaking


2、Vue 3.0 所采用的 Composition Api 与 Vue 2.x使用的Options Api 有什么区别？
Options API
vue2中如何组织代码的：我们会在一个vue文件中data，methods，computed，watch中定义属性和方法，共同处理页面逻辑
缺点： 一个功能往往需要在不同的vue配置项中定义属性和方法，比较分散，项目小还好，清晰明了，但是项目大了后，一个methods中可能包含很多个方法，往往分不清哪个方法对应着哪个功能
优点：新手入门会比较简单
Composition API
在vue3 Composition API 中，代码是根据逻辑功能来组织的，一个功能的所有api会放在一起（高内聚，低耦合），这样做，即时项目很大，功能很多，我们都能快速的定位到这个功能所用到的所有API，而不像vue2 Options API 中一个功能所用到的API都是分散的，需要改动，到处找API的过程是很费时间的
缺点：学习成本可能会增加，以前的思维方式也要转变
优点：Composition API 是根据逻辑相关性组织代码的，提高可读性和可维护性，基于函数组合的 API 更好的重用逻辑代码（在vue2 Options API中通过Mixins重用逻辑代码，容易发生命名冲突且关系不清）



3、Proxy 相对于 Object.defineProperty 有哪些优点？
Proxy可以直接监听整个对象而非属性。Object.defineProperty 只能劫持对象的属性,因此我们需要对每个对象的每个属性进行遍历。
Proxy可以直接监听数组的变化。Object.defineProperty不能监听数组。是通过重写数据的几个可以改变数据的方法来对数组进行监听的。
Proxy返回的是一个新对象，我们可以只操作新的对象达到目的，而Object.defineProperty只能遍历对象属性直接修改
Proxy有多达13种拦截方法,不限于apply、ownKeys、deleteProperty、has等等是Object.defineProperty不具备


4、Vue 3.0 在编译方面有哪些优化？
静态Node不再作更新处理（hoistStatic -> SSR 优化）
静态绑定的class、id不再作更新处理
结合打包Hint，进行更新分析（动态绑定）
事件监听器Cache缓存处理（cacheHandles）
针对静态节点的优化：
Virtual DOM机制调整
内存优化，更少的占用
按需加载，更灵活的组件化


5、Vue.js 3.0 响应式系统的实现原理？
(1)、reactive:
接收一个参数，判断这参数是否是对象。不是对象则直接返回这个参数，不做响应式处理
创建拦截器对象 handler, 设置 get/set/deleteProperty
get
收集依赖（track）
返回当前 key 的值。
如果当前 key 的值是对象，则为当前 key 的对象创建拦截器 handler, 设置 get/set/deleteProperty
如果当前的 key 的值不是对象，则返回当前 key 的值
set
设置的新值和老值不相等时，更新为新值，并触发更新（trigger）
deleteProperty
当前对象有这个 key 的时候，删除这个 key 并触发更新（trigger）
返回 Proxy 对象
(2)、effect: 接收一个函数作为参数。作用是：访问响应式对象属性时去收集依赖
(3)、track:
接收两个参数：target 和 key
如果没有 activeEffect，则说明没有创建 effect 依赖
如果有 activeEffect，则去判断 WeakMap 集合中是否有 target 属性，
WeakMap 集合中没有 target 属性，则 set(target, (depsMap = new Map()))
WeakMap 集合中有 target 属性，则判断 target 属性的 map 值的 depsMap 中是否有 key 属性
depsMap 中没有 key 属性，则 set(key, (dep = new Set()))
depsMap 中有 key 属性，则添加这个 activeEffect
(4)、trigger:
判断 WeakMap 中是否有 target 属性
WeakMap 中没有 target 属性，则没有 target 相应的依赖
WeakMap 中有 target 属性，则判断 target 属性的 map 值中是否有 key 属性，有的话循环触发收集的 effect()