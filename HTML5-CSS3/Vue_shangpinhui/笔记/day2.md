犯的错误:
1:项目阶段，左侧菜单目录，只能有项目文件夹
2:联想电脑安装node_modules依赖包的时候，经常丢包。npm install --save axios --force
3：单词错误
4：路由理解
KV：K--->URL  V---->相应的组件
配置路由：
     ------路由组件
     -----router--->index.js
                  import Vue  from 'vue';
                  import VueRouter from 'vue-router';
                  //使用插件
                  Vue.use(VueRouter);
                  //对外暴露VueRouter类的实例
                  export default new VueRouter({
                       routes:[
                            {
                                 path:'/home',
                                 component:Home
                            }
                       ]
                  })
    ------main.js   配置项不能瞎写


$router:进行编程式导航的路由跳转
this.$router.push|this.$router.replace
$route:可以获取路由的信息|参数
this.$route.path
this.$route.params|query
this.$route.meta


1)编程式导航路由跳转到当前路由(参数不变), 多次执行会抛出NavigationDuplicated的警告错误?
注意:编程式导航（push|replace）才会有这种情况的异常，声明式导航是没有这种问题，因为声明式导航内部已经解决这种问题。
这种异常，对于程序没有任何影响的。
为什么会出现这种现象:
由于vue-router最新版本3.5.2，引入了promise，当传递参数多次且重复，会抛出异常，因此出现上面现象,
第一种解决方案：是给push函数，传入相应的成功的回调与失败的回调
      this.$router.push(
        {
          name: 'search',
          params: { keywords: this.keywords },
          query: { k: this.keywords.toUpperCase() },
        },
        () => {},
        () => {} 
      )
第一种解决方案可以暂时解决当前问题，但是以后再用push|replace还是会出现类似现象，因此我们需要从‘根’治病；

第二种：修改原型上的push和replace方法  D:\前端\学习资料\尚品会项目资料\尚硅谷大型Vue项目实战-尚品汇\尚品汇：前台项目（上） 第10课

this:当前组件实例
this.$router属性:当前的这个属性,是VueRouter类的一个实例，当在入口文件注册路由的时候，给组件实例添加了$router和$router属性
push:VueRouter类的实例对象的原型上的方法

// 备份一个源push
let originPush = VueRouter.prototype.push
let originReplace = VueRouter.prototype.replace
// 原理就是捕获异常。因为该报错不影响程序运行，所以捕获之后不做操作，不让其显示就行了
VueRouter.prototype.push = function(location) {
    return originPush.call(this, location).catch(err => err)
}
VueRouter.prototype.replace = function(location) {
    return originReplace.call(this, location).catch(err => err)
}




2)将Home组件的静态组件拆分
2.1静态页面（样式）
2.2拆分静态组件
2.3发请求获取服务器数据进行展示
2.4开发动态业务
拆分组件：结构+样式+图片资源
一共要拆分为七个组件

拆分的时候要切记 HTML+CSS+图片资源+JS 要完整的一套
拆分过程：拆出html,css,静态资源。
哪个组件使用到就建立在哪个组件文件下(单独新建一个文件夹)
复用的组件注册为全局组件，只用到一次的就注册为局部组件






3)axios二次封装
AJAX:客户端可以'敲敲的'向服务器端发请求，在页面没有刷新的情况下，实现页面的局部更新。
XMLHttpRequest、$、fetch、axios
跨域:如果多次请求协议、域名、端口号有不同的地方，称之为跨域
JSONP、CROS、
代理服务器:
     devServer: {
        proxy: {
            '/api': {
                target: 'http://39.98.123.211',
                // pathRewrite: { '^/api': '' }
            }
        }
    }

2.1:工作的时候src目录下的API文件夹(src/api/request.js)，一般关于axios二次封装的文件
    src/api/index.js 是关于接口管理的文件夹
          // 对项目的API进行统一的管理
          import requst from "./request.js"
          export const reqCategoryList = () => {
               return requst({ url: "/api/product/getBaseCategoryList", method: "get" })
          }

2.2进度条：nprogress模块实现进度条功能
工作的时候，修改进度条的颜色，修改源码样式.bar类名的






4)vuex:今晚务必vuex复习一下
vuex:Vue官方提供的一个插件，插件可以管理项目共用数据。
vuex：书写任何项目都需要vuex？
项目大的时候，需要有一个地方‘统一管理数据’即为仓库store
Vuex拆分成多个小仓库：
     // 组件小仓库编写
     const state = {}
     const mutations = {}
     const actions = {}
     const getters = {}
     export default {
          state,
          mutations,
          actions,
          getters
     }


     // 导入home组件的小仓库
     import Home from "./Home"
     // 导入search组件的小仓库
     import Search from "./Search"
     export default new Vuex.Store({
          modules: {
               Home,
               Search
          }
     })

注意点：将大仓库拆分成多个小仓库时，state的调用如下：
          import {mapState} from "vuex"
          compoted:{
               ...mapState({
                    // 右侧需要一个函数，当计算属性使用一次，就会调用该函数
                    // 参数state是大仓库的数据，state.home里面存放了小仓库里的state数据
                    简写：categoryList: (state) => state.home.categoryList,
                    复杂：categoryList: (state) => {
                         return state.home.categoryList
                    },
               })
          }

     
   


















