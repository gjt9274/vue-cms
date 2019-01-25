<template>
    <div>
        <div class="goods-list">
            <!-- <router-link class="goods-item" v-for="item in goodslist" :key='item.id' :to="'/home/goodsinfo/'+item.id" tag='div'>
                <img :src='item.imgUrl'>
                <h1 class="title">{{ item.name }}</h1>
                <div class="info">
                    <p class="price">
                        <span class="now">￥{{ item.price}}</span>
                        <span class="old">￥{{ item.privilegePrice}}</span>
                    </p>
                    <p class="sell">
                        <span>热卖中</span>
                        <span>剩{{ item.clickRate}}件</span>
                    </p>
                </div>
            </router-link> -->

            <!-- 在网页中有两种跳转方式
                1. 使用a标签，叫做标签跳转
                2. 使用 window.location.href 的形式，叫做编程式跳转 -->

             <div class="goods-item" v-for="item in goodslist" :key='item.id' @click="goDetail(item.id)" >
                <img :src='item.imgUrl'>
                <h1 class="title">{{ item.name }}</h1>
                <div class="info">
                    <p class="price">
                        <span class="now">￥{{ item.price}}</span>
                        <span class="old">￥{{ item.privilegePrice}}</span>
                    </p>
                    <p class="sell">
                        <span>热卖中</span>
                        <span>剩{{ item.clickRate}}件</span>
                    </p>
                </div>
            </div>

            <mt-button type='danger' size="large" @click="getMore">加载更多</mt-button>

        </div>
    </div>
</template>
<script>
import { Toast } from 'mint-ui'
export default {
    data() {
        return {
            page:1,
            size:10,
            key:'01fb3759508a4144a3f21d8cc87eb1b8',
            goodslist:[]
        }
    },
    created(){
        this.getGoodsList()
    },
    methods:{
        getGoodsList(){
            //获取商品列表
            this.$http.get(`https://100boot.cn/wxShop/goods/getHotGoodsList?key=${this.key}&page=${this.page}&size=${this.size}`)
            .then(result=>{
                // console.log(result)
                if(result.body.code==100){
                    if(result.body.result.isLastPage) return Toast('已到达最后一页')
                    this.goodslist =this.goodslist.concat( result.body.result.list)
                }
            })
        },
        //获取下一页
        getMore(){
            this.page++
            this.getGoodsList()
        },

        goDetail(id){
            //使用js形式进行路由导航
           this.$router.push("/home/goodsinfo/"+id)
        }
    }
}
</script>
<style lang="scss" scoped>
.goods-list{
    display: flex;
    flex-wrap: wrap;
    padding:7px;
    justify-content:space-between;
    .goods-item{
        width:49%;
        border:1px solid #ccc;
        box-shadow: 0 0 8px #ccc;
        margin:3px 0;
        padding:2px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        min-height: 293px;
        img{
            width:100%;
        }
        .title{
            font-size: 14px;
        }
        .info{
            background-color: #eee;
     

            p{
                margin: 0;
                padding:5px;
            }
            .price{
                .now{
                    color: red;
                    font-weight:bold;
                    font-size: 16px;
                }
                .old{
                    text-decoration: line-through;
                    font-size: 12px;
                    margin-left: 10px;
                }
            }
            .sell{
                display: flex;
                justify-content: space-between;
                font-size: 13px;
            }
        }
    }
}
</style>
