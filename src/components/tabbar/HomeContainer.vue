<template>
    <div>
        <!-- 这是轮播图区域 -->
        <swiper :LunbotuList='LunbotuList' :isfull='true'></swiper>

        <!-- 九宫格到六宫格改造 -->
        <ul class="mui-table-view mui-grid-view mui-grid-9">
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/newslist">
                   <img src="../../images/menu1.png" alt="">
                    <div class="mui-media-body">新闻资讯</div></router-link></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/photolist">
                     <img src="../../images/menu2.png" alt="">
                    <div class="mui-media-body">图片分享</div></router-link></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/goodslist">
                     <img src="../../images/menu3.png" alt="">
                    <div class="mui-media-body">商品购买</div></router-link></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="#">
                     <img src="../../images/menu4.png" alt="">
                    <div class="mui-media-body">留言反馈</div></router-link></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="#">
                     <img src="../../images/menu5.png" alt="">
                    <div class="mui-media-body">视频专区</div></router-link></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="#">
                     <img src="../../images/menu6.png" alt="">
                    <div class="mui-media-body">联系我们</div></router-link></li>
        </ul> 


    </div>
</template>

<script>
import swiper from '../subcomponents/swiper.vue'
import { Toast } from 'mint-ui'
export default {
    data(){
        return {
            LunbotuList:[], //轮播图数据
        }
    },
    created(){
        this.getLunbotu();
    },
    methods:{
        getLunbotu(){//获取轮播图数据
            this.$http.get('http://www.liulongbin.top:3005/api/getlunbo').then(result=>{
                if(result.body.status == 0){
                    //获取成功
                    // console.log(result.body)
                    this.LunbotuList = result.body.message 
                }else{
                    Toast('加载轮播图失败')
                }
            })
        }
    },
    components:{
        swiper
    }
}
</script>

<style lang="scss" scoped>

.mui-grid-view.mui-grid-9{
    background-color: #fff;
    border:none;
    img{
        height:60px;
        width:60px;
    }
    

}
.mui-grid-view.mui-grid-9 .mui-table-view-cell{
    border:none;

.mui-media-body{
    font-size: 13px;
    }
}
</style>
