<template>
    <div class="shopcar-container" >
        <!-- 商品列表区域 -->
       <div class="goods-list">
           <div class="mui-card"  v-for="(item , index) in goodslist" :key="item.result.id">
            <div class="mui-card-content" >
                <div class="mui-card-content-inner">
                    <mt-switch  v-model="$store.getters.getGoodsSelected[item.id]"
                    @change="selectedChanged(item.id,$store.getters.getGoodsSelected[item.id])"></mt-switch>
                    <img :src="item.result.imgUrl" alt="">
                   
                    <div class="info">
                        <h3>{{ item.result.name }}</h3>
                        <p>
                            <span class='price'>{{ "￥"+item.result.price }}</span>
                            
                            <numbox  :initCount="$store.getters.getGoodsCount[item.result.id]" :goodsid="item.result.id"></numbox>
                            <a href="#" @click.prevent="remove(item.result.id,index)">删除</a>
                        </p>
                    </div>
                </div>
            </div>
          </div>
       </div>

        <!-- 结算区域 -->

        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner jiesuan" >
                    <div class="left">
                        <p>总计:(不含运费)</p>
                        <p>
                            已勾选商品<span class="red">{{ $store.getters.getGoodsCountAndAmount.count }}</span>件，
                            总价<span class="red"> {{ "￥"+$store.getters.getGoodsCountAndAmount.amount }}</span>
                        </p>
                    </div>
                    <mt-button type="danger">去结算</mt-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import $ from 'jquery'
import numbox from '../subcomponents/shopcar_numbox.vue'
export default {
    data(){
        //购物车中商品列表
        return {
            goodslist:[],
            url: 'https://100boot.cn/wxShop/goods/getGoodsInfo?key=01fb3759508a4144a3f21d8cc87eb1b8&goodsId='
        }

    },
    created(){
        this.getGoodsList()
    },
    methods:{
        createPromise(url){
            return  new Promise(function(resolve,reject){
                $.ajax({
                url,
                dataType:'json',
                success(arr){
                    resolve(arr);
                },
                error(err){
                    reject(err);
               	 }
             })
       	  });
    	},
        
        //由 store 中的car中获取id，然后由id获取商品信息
        //可能需要 promise 来进行操作
        getGoodsList(){
 
            var proArr = []
            if(this.$store.state.car.length == 0) return 
              this.$store.state.car.forEach(item=>{
                proArr.push(this.createPromise(this.url+item.id))
            })

            Promise.all(proArr).then(arr=>{
                this.goodslist = arr
            })
        },

        //点击删除，把 商品从 store 中，根据传递的id删除
        //同时把当前组件中的goodslist 中根据 index删除
        remove(id,index){
            this.goodslist.splice(index,1)
             this.$store.commit('removeFromCar',id)
        },

        //每当点击开关，把最新的开关状态同步道strore中
        selectedChanged(id,selected){
            this.$store.commit('updateGoodsSelecte',{id,selected})
        }

    },
    components:{
        numbox
    }
}
</script>

<style lang="scss" scoped>
.shopcar-container{
    background-color: #eee;
    overflow: hidden;
    .goods-list{
        .mui-card-content-inner{
            display: flex;
            align-items: center;
        }
        img{
            width:60px;
            height:60px;
        }
        h3{
            font-size: 13px;
            margin-bottom: 5px;
        }
        .info{
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            p{
                margin-top: 5px;
            }
            .price{
                color:red;
                font-weight: bold;
            }
        }
    }
    .jiesuan{
        display: flex;
        justify-content: space-between;
        align-content: center;
        .red{
            color:red;
            font-weight: bold;
            font-size: 16px;
        }
    }
}
</style>
