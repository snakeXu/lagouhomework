1.说说 application/json 和 application/x-www-form-urlencoded 二者之间的区别。

enctype 属性规定在发送到服务器之前应该如何对表单数据进行编码。
application/json和application/x-www-form-urlencoded都是表单数据发送时的编码类型。
默认地，表单数据会编码为 "application/x-www-form-urlencoded"。就是说，在发送到服务器之前，所有字符都会进行编码。
application/x-www-form-urlencoded：窗体数据被编码为名称/值对格式
例如 发送 test=I'm Egret
Form Data -> test:I'm Egret
application/json：序列化后的 JSON 字符串
例如 发送 test=I'm Egret
Request Payload -> {test:"I'm Egret"}

2.说一说在前端这块，角色管理你是如何设计的。

对系统操作的各种权限不是直接授予具体的用户，而是在用户集合与权限集合之间建立一个角色集合。每一种角色对应一组相应的权限。
一旦用户被分配了适当的角色后，该用户就拥有此角色的所有操作权限。不同角色，设置不同级别权限，在用户登陆的时候生成cookie含有用户信息，
后台根据cookie返回不同权限以及路由信息。页面中可以获取权限信息，用v-if显示隐藏相关内容。

3.@vue/cli 跟 vue-cli 相比，@vue/cli 的优势在哪？

创建项目 由vue init变为 vue create
启动项目 由npm run dev 改成 npm run serve
移除了配置文件目录 config 和 build 文件夹，如果需要自定义配置，需要自己新建vue.config.js文件
移除了 static 静态资源文件夹，新增 public 文件夹，静态资源转移到public目录中，通过/xx.xx可以直接访问，并且 index.html 移动到 public 中
在 src 文件夹中新增了 views 文件夹，用于分类 视图组件 和 公共组件
安装项目时会自动下载node-module文件夹

@vue/cli 构建的项目开发依赖少了很多，因为vue3.0讲究的是 0 配置，因为不显示的这些文件不需要我们去改

4.详细讲一讲生产环境下前端项目的自动化部署的流程。

下载 Gitea，选择一个喜欢的版本，例如 1.13，选择 gitea-1.13-windows-4.0-amd64.exe 下载。
下载完后，新建一个目录（例如 gitea），将下载的 Gitea 软件放到该目录下，双击运行。
打开 localhost:3000 就能看到 Gitea 已经运行在你的电脑上了。
点击注册，第一次会弹出一个初始配置页面，数据库选择 SQLite3。另外把 localhost 改成你电脑的局域网地址，例如我的电脑 IP 为 192.168.0.118。
填完信息后，点击立即安装，等待一会，即可完成配置。
继续点击注册用户，第一个注册的用户将会成会管理员。
打开 Gitea 的安装目录，找到 custom\conf\app.ini，在里面加上一行代码 START_SSH_SERVER = true。这时就可以使用 ssh 进行 push 操作了。
如果使用 http 的方式无法克隆项目，请取消 git 代理。
git config --global --unset http.proxy
git config --global --unset https.proxy
配置 Jenkins
需要提前安装 JDK。
打开 Jenkins 下载页面。
安装过程中遇到 Logon Type 时，选择第一个。
端口默认为 8080。安装完会自动打开 http://localhost:8080 网站，这时需要等待一会，进行初始化。
按照提示找到对应的文件（直接复制路径在我的电脑中打开），其中有管理员密码。
安装插件，选择第一个。
创建管理员用户，点击完成并保存，然后一路下一步。
配置完成后自动进入首页，这时点击 Manage Jenkins -> Manage plugins 安装插件。
点击 可选插件，输入 nodejs，搜索插件，然后安装。
安装完成后回到首页，点击 Manage Jenkins -> Global Tool Configuration 配置 nodejs。如果你的电脑是 win7 的话，nodejs 版本最好不要太高，选择 v12 左右的就行。
创建静态服务器
建立一个空目录，在里面执行 npm init -y，初始化项目。
执行 npm i express 下载 express。
然后建立一个 server.js 文件
它将当前目录下的 dist 文件夹设为静态服务器资源目录，然后执行 node server.js 启动服务器。
由于现在没有 dist 文件夹，所以访问网站是空页面。
自动构建 + 部署到服务器
下载 Jenkins 提供的 demo 项目 building-a-multibranch-pipeline-project，然后在你的 Gitea 新建一个仓库，把内容克隆进去，并提交到 Gitea 服务器。
打开 Jenkins 首页，点击 新建 Item 创建项目。
选择源码管理，输入你的 Gitea 上的仓库地址。
选择你的构建环境，这里选择刚才配置的 nodejs。
点击增加构建步骤，windows 要选 execute windows batch command，linux 要选 execute shell。
输入 npm i && npm run build && xcopy .\build\* G:\node-server\dist\ /s/e/y，这行命令的作用是安装依赖，构建项目，并将构建后的静态资源复制到指定目录 G:\node-server\dist\。这个目录是静态服务器资源目录。
保存后，返回首页。点击项目旁边的小三角，选择 build now。
开始构建项目，我们可以点击项目查看构建过程。
构建成功，打开 http://localhost:8080/ 看一下结果。

5.你在开发过程中，遇到过哪些问题，又是怎样解决的？请讲出两点。

一、从jq时代过渡到vue，从一开始不习惯vue的虚拟DOM，到后来通过项目快速学习vue，到后来通过拉勾的课程了解vue的原理
二、这个问题不是我自己解决的，但是学到了很多。工作中项目过大，每次启动项目都需要很多时间，同事通过每次启动引入不同的路由目录，实现分模块启动。
分模块启动主要是通过nodejs读入文件实现的，通过这个学到了很多

6.针对新技术，你是如何过渡到项目中？

首先看新技术对现有项目的兼容性，如果对现有项目兼容性较好，直接在项目中应用。
如果现有项目对新技术兼容性不太好，看一下项目要求，或者有没有可降级方案。
如果项目中兼容了新技术，看项目局部中是否可以应用，局部应用踩坑&解决，然后慢慢替代项目中现有代码

