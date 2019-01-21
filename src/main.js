//入口文件
import Vue from 'vue'

//1.1导入路由的包
import VueRouter from 'vue-router'
//1.2 全局注册路由组件
Vue.use(VueRouter)
//1.3 导入自己的 router.js 模块
import router from  './router.js'


//2.1 导入 vue-resource
import VueResource from 'vue-resource'
//全局使用vue-resource
Vue.use(VueResource)

//按需导入Mint-UI中的组件
import { Header,Swipe, SwipeItem } from 'mint-ui'
Vue.component(Header.name,Header)
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);

//导入mui的样式
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'

//导入 App 根组件
import app from  './App.vue'

var vm = new Vue({
    el:'#app',
    render: c=>c(app),
    router,//1.4挂载路由对象到vm实例上
})