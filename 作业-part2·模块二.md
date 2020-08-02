一、简答题
1、Webpack 的构建流程主要有哪些环节？如果可以请尽可能详尽的描述 Webpack 打包的整个过程。
首先通过配置文件等读取配置参数，初始化各种参数。
用上一步得到的参数初始化 Compiler 对象,加载所有配置的插件,执行对象的 run 方法开始执行编译。
entry:根据配置中的 entry 找出所有的入口文件，从入口文件开始，对每个Module(包括模块的依赖关系module)进行处理，在这里由于webpack本身只能处理js文件，所以其他诸如css文件、html文件都需要专门的loader进行加载处理
loader:(几乎所有 loader 都需要安装，但不需 在 webpack 配置文件中通过 require 引入。)在配置文件中指定处理文件的loader的时候，可以对同种类型的文件配置多个loader，这些loader的执行顺序是由后往前，所以得到的是最后一个loader处理文件的到的结果)
(webpack已经提供了大部分日常开发中需要的loader，但是如果有需要自己写一个loader，我们在自己的loader文件中直接module.exports一个函数，这个函数接收一个参数，这个参数就是我们要处理的资源相关信息，函数体对资源进行处理，需要返回也就是return一段js代码)
loader负责将各种类型的文件转换成能被webpack处理的模块，plugin 可以监听 webpack 处理过程中的关键事件，在需要的时机对资源进行处理(比如打包优化和压缩代码)一直到重新定义环境中的变量。
plugin:相比loader，plugin拥有更宽的能力范围，webpack插件非常丰富。如果需要自己定义一个插件，那么要了解一下webpack的钩子，因为plugin通过webpack的钩子机制实现，webpack要求插件必须是函数或者包含apply方法的对象。
output:经过上面一系列处理，项目中的Mudule被组装成一个个包含多个模块的 Chunk,再把每个 Chunk 转换成一个单独的文件加入到输出列表,在确定好输出内容后,根据配置确定输出的路径和文件名,把文件内容写入到文件系统也就是配置文件中的output出口指定文件夹。
2、Loader 和 Plugin 有哪些不同？请描述一下开发 Loader 和 Plugin 的思路。
不同:
由于webpack本身只能处理js文件，所以其他诸如css文件、html文件都需要专门的loader进行加载处理.loader负责将各种类型的文件转换成能被webpack处理的模块。
plugin 可以监听 webpack 处理过程中的关键事件，在需要的时机对资源进行处理(比如打包优化和压缩代码)一直到重新定义环境中的变量。
几乎所有 loader 都需要安装，但不需在 webpack 配置文件中通过 require 引入
思路:
loader
们在自己的loader文件中直接module.exports一个函数，这个函数接收一个参数，这个参数就是我们要处理的资源相关信息，函数体对资源进行处理，需要返回也就是return一段js代码。示例代码
```
const marked = require('marked')
module.exports = source => {
	const html = marked(source)
	return `export default ${JSON.stringify(html)}`
}
```
plugin
如果需要自己定义一个插件，那么要了解一下webpack的钩子，因为plugin通过webpack的钩子机制实现，webpack要求插件必须是函数或者包含apply方法的对象。示例代码
```
class MyPlugin{
	apply(compiler){ //会在webpack启动时自动被调用
		console.log('MyPlugin')
		// compiler就是webpack工作中最核心的一个对象，包含了此次构建对象的所有配置信息
		// 我们也是通过这个对象去注册钩子函数
		// 我们的需求是用这个插件清除webpack打包中生成的注释信息
		// API官网找到emit钩子，在webpack往输出目录输出文件时执行
		compiler.hooks.emit.tap('MyPlugin', compilation => {
			for(const name in compilation.assets){
				if (name.endsWith('.js')) {
					const content = compilation.assets[name].source()
					const widthoutComments = content.replace(/\/\*\*+\*\//g,'')
					compilation.assets[name] = {
						source: () => widthoutComments,
						size: () => widthoutComments.length // webpack内部要求的必须的方法
					}
				}
			}
		})
	}
}
```
二、编程题
1、使用 Webpack 实现 Vue 项目打包任务
https://github.com/snakeXu/02-02-vue-app-base