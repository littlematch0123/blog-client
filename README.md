# 项目说明

&emsp;&emsp;该项目是使用vue、vue-router、vuex、vue SSR开发的一套博客前台页面

【域名】

&emsp;&emsp;xiaohuochai.cc

【功能模块】

&emsp;&emsp;功能包括首页显示、文章管理、类别管理和用户管理

&emsp;&emsp;1、首页功能(components/Home)包括：可拖拽轮播图、显示推荐专题、显示推荐文章、显示推荐类别

&emsp;&emsp;2、文章管理(components/Post)：按类别筛选文章、按标题搜索文章、喜欢文章、取消喜欢、查看评论、评论文章、修改评论、删除评论


&emsp;&emsp;3、类别管理(components/Category)：专题列表、类别列表


&emsp;&emsp;4、用户管理(components/User): 用户注册、用户登录、短信验证、查看点赞文章、查看评论文章

【项目亮点】

&emsp;&emsp;1、该项目的内容以自学前端的过程中写的600多篇博客为基础，对于同样学习前端的同学可能会有所帮助。许多博客都有直接可以操作的DEMO，对知识的理解可能会更直观

&emsp;&emsp;2、全站采用服务器端渲染SSR的方式，有利于SEO，减少了首屏渲染时间

&emsp;&emsp;3、采用移动优先的响应式布局，移动端、桌面端均适配；字体大小使用em单位，桌面端的文字相应变大，可提升阅读体验

&emsp;&emsp;4、CSS主要使用了CSS module和postCSS，并使用styleLint进行校验。使得代码结构清晰，嵌套层级合理，构建后的CSS类名不会重复

&emsp;&emsp;5、在common目录下，封装了多个基础组件，如全屏组件、返回组件、面包屑组件、滑动组件等，方便开发。功能组件按照功能而不是类别分类，使得结构清晰，易于查找

&emsp;&emsp;6、设置了全局的弹出框、加载框，封装了axios获取后端数据的async方法，使到异步操作较为方便

&emsp;&emsp;7、JS代码风格参照airbnb规范，规范了变量命名，采用小驼峰写法，异步操作增加async后缀，函数基本以get或set为前缀，布尔值基本以do或is为前缀

&emsp;&emsp;8、使用了阿里云的短信模块，实现了短信验证功能

&emsp;&emsp;9、增加了摇一摇功能，可以直接摇到后台页面

&emsp;&emsp;10、使用了陀螺仪功能，上下晃动手机时，头像会进行旋转

