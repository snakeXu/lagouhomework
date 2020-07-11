*简答题*
1.谈谈你对工程化的初步认识，结合你之前遇到过的问题说出三个以上工程化能够解决问题或者带来的价值。
前端工程化是一个标准化规范化的过程，其主要目的为了提高效率和降低成本，即提高开发过程中的开发效率，减少不必要的重复工作时间。
解决的问题:
   ·最简单的理解比如vue-cli，创建了一个标准的项目结构，减少初始开发过程中配置开发环境的时间
   ·规范开发过程中的编码规范。一个团队中大家的编码习惯各异，造成代码阅读不便，用eslint规范进行强约束，使团队协作更加方便
   ·引入各种工具降低开发难度，比如引入插件自动生成雪碧图
   ·开发过程中模块化组件化直线降低了开发难度
----

2.你认为脚手架除了为我们创建项目结构，还有什么更深的意义？
个人以为最主要的意义是简化、规范开发过程。
比较浅显的，比如在创建项目过程中会询问我们的需求，
帮我们安装一些基本的开发依赖，比如安装babel核心模块和预设模块。
在项目开发过程中编译项目，启动webserver。
在上线前构建项目，在上线过程中部署项目等等都是脚手架可以做的。
----

*编程题*
1.概述脚手架实现的过程，并使用 NodeJS 完成一个自定义的小型脚手架工具
在我们的课程里用gulp搭建了一个比较完整功能的脚手架工具，这里实现了一个根据模版创建项目的程序
·commander：组织和处理命令行的输入
·co：写异步代码
·co-prompt：自动提供提示信息，分步接收用户的输入
·chalk：终端输出文字颜色处理
主要实现功能：添加模版(可以添加远程git模版clone到本地)，根据模版创建项目。模版可以添加/删除/查看模版列表
项目目录结构:
·package.json
·bin/ 
  · scion.js 入口文件，接收命令行输入
·command/ 处理执行过程
  · add.js 添加模版
  · delete.js 删除模版
  · list.js 展示现有模版列表
  · init.js 初始化项目
· template.json 存放模版路径等相关信息
代码完成后在package.json文件中写入
```
"bin": {
 
	"scion": "bin/scion"
 
},
```
然后在项目根目录npm link ，就可以在命令行使用scion命令创建项目了
https://github.com/snakeXu/small-cli
-------
2、尝试使用 Gulp 完成项目的自动化构建
这里我只是按照课程里老师的讲述跟着做的
分别处理js/css/html文件；图片和字体等文件因为不用每次都构建，另行处理
安装browser-async浏览器同步测试工具就要监听文件变化，用useref处理文件中路径问题。
根据项目构建过程，style, script, page可以parallel执行，
而处理文件路径要等到文件处理完成才能执行，所以要series执行。
每次执行都要clean上次任务生成的文件
https://github.com/snakeXu/lagouhomework/blob/master/gulpfile.js
因为整个过程都是跟着课程内容做下来的，这里只提交了gulpfile.js文件
------
3、使用 Grunt 完成项目的自动化构建
本来是想在课程内容的基础上多加两个插件的，但是都遇见问题了…… 
imagemin 这个总是提示
Warning: Couldn't load default plugin "gifsicle" Use --force to continue.
gifsicle在做gulp的时候就遇到，单独安装也是失败，查到的原因是说imagemin和node版本不匹配，
在gulp里重新各种版本重新安装一番总算成功了，但是在这里还没有解决
试图压缩生成的css，用了cssmin，但是可能是我对grunt和任务的理解还是有问题，
Running "cssmin:target" (cssmin) task
>> No files created.
待解决……
https://github.com/snakeXu/lagouhomework/blob/master/gruntfile.js
同样只是提交了gruntfile.js文件，因为觉得做的实在是太差劲了