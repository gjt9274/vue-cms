//入口文件
import Vue from 'vue'

//导入vuex
import Vuex from 'vuex'
//注册vuex
Vue.use(Vuex)


//每次刚进入网站，肯定会调用 main.js 在刚调用的时候，先从本地存储中
// 把购物车的数据读取出来放到state.car中
var car = JSON.parse(localStorage.getItem('car')||'[]')
var store = new Vuex.Store({
    state:{
        car:car // 件购物车中商品的总数居，用数组存储起来，在 car 数组中存储一些商品
        // 的对象，暂时将商品的对象，设计成这样 {id:商品id，count:要购买的数量，price：商品的单价，selected：false，是否被选中}
    },
    mutations:{
        //点击加入购物车，件商品保存到state.car 中
        addToCar(state,goodsInfo){
            //1.如果购物车中已有这中商品，只需更新数量，
            //2.如果没有，则直接件商品数据，push到car中

            //假设购物车中没有找到对因的商品
            var flag = false;
            state.car.some(item=>{
                if(item.id == goodsInfo.id){
                    item.count += parseInt(goodsInfo.count)
                    flag = true;
                    return true;
                }
            })

            //没有找到，则直接push到购物车中
            if(!flag){
                state.car.push(goodsInfo)
            }
            //当更新 car 之后，把car数组存储到本地的localStorage中
            localStorage.setItem('car',JSON.stringify(state.car))
        },
        updateGoodsInfo(state,goodsInfo){    
            //修改购物车中商品的信息
            state.car.some(item => {
                if(item.id == goodsInfo.id){
                    item.count = parseInt(goodsInfo.count)
                    return true;
                }     
            })
            //当修改完商品的数量，把最新的购物车数量，保存到 本地存储中去
            localStorage.setItem('car',JSON.stringify(state.car))
        },
        removeFromCar(state,id){
            //根据id从store中的car删除商品
            state.car.some((item,i)=>{
                if(item.id == id){
                    state.car.splice(i,1)
                    return true
                 }
            })

            //将删除完毕后的car数组存储到本地的localStorage中
            localStorage.setItem('car',JSON.stringify(state.car))
        },
        updateGoodsSelecte(state,info){
            state.car.some(item=>{
                if(item.id == info.id){
                    item.selected = info.selected
                }
            })
                //把最新的 stroe 中的 car状态保存道本地存储中去
            localStorage.setItem('car',JSON.stringify(state.car))
        }
    },
    getters:{
        getAllCount(state){
            var c = 0;
            state.car.forEach(item=>{
                c += item.count
            })
            return c
        },
        getGoodsCount(state){
            var gc = {}
            state.car.forEach(item => {
                gc[item.id] = item.count
            })
            return gc
        },
        getGoodsSelected(state){
            var gs ={}
            state.car.forEach(item => {
                gs[item.id] = item.selected
            })

            return gs
        },
        getGoodsCountAndAmount(state){
            //获取购物车中商品的数量和总价
            var gca ={
                count:0,//商品总数量
                amount:0//商品总价
            }

            state.car.forEach(item=>{
                if(item.selected){
                    gca.count+=item.count
                    gca.amount += item.price*item.count
                }
            })

            return gca
        }
    }
})

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
//设置请求的根路径
 Vue.http.options.root = 'https://bird.ioliu.cn/v1?url=http://news-at.zhihu.com/'
//  Vue.http.options.root = 'http://api.dagoogle.cn/'
//全局设置post时候表单数据格式组织形式
Vue.http.options.emulateJSON = true;


//按需导入Mint-UI中的组件
// import { Header,Swipe, SwipeItem, Button, Lazyload} from 'mint-ui'
// Vue.use(Lazyload);
// Vue.component(Header.name,Header)
// Vue.component(Swipe.name, Swipe)
// Vue.component(SwipeItem.name, SwipeItem)
// Vue.component(Button.name,Button)
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)


//安装图片预览插件
import VuePreview from 'vue2-preview'

Vue.use(VuePreview)

//导入mui的样式
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'

//导入 App 根组件
import app from  './App.vue'

//导入时间插件
import moment from 'moment'

//定义全局的过滤器
Vue.filter('dateFormat',function(dataStr,pattern = "YYYY-MM-DD HH:mm:ss"){
    return moment(dataStr).format(pattern)
})

var vm = new Vue({
    el:'#app',
    render: c=>c(app),
    router,//1.4挂载路由对象到vm实例上
    store,//挂载store状态管理对象
})