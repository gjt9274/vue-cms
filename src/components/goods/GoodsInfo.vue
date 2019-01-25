<template>
    <div class='goodsinfo-container'>
         <!-- 小球 -->
        <transition
        @before-enter="beforeEnter"
        @enter="enter"
        @after-enter="afterEnter">
             <div class="ball" v-show="ballFlag" ref='ball'></div>
        </transition>

        <!-- 商品轮播图区域 -->
        <div class="mui-card">
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<swiper :LunbotuList='lunbotu' :isfull="false"></swiper>
					</div>
				</div>
		</div>

       

        <!-- 商品购买区域 -->
        <div class="mui-card">
				<div class="mui-card-header">{{ goodsinfo.name}}</div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<p class="price">
                            市场价:<del>{{ goodsinfo.privilegePrice}}</del>&nbsp;&nbsp;销售价:<span class='now_price'>{{ goodsinfo.price }}</span>
                        </p>
                        <p>购买数量:  <numbox class="numbox" @getCount="getSelectedCount" :maxCount="goodsinfo.clickRate"></numbox></p>
                        <p>
                            <mt-button type='primary' size='small'>立即购买</mt-button>
                             <mt-button type='danger' size='small' @click="addToShopcar">加入购物车</mt-button>
                        </p>
                            
					</div>
				</div>
		</div>

        <!-- 商品参数区域 -->
        <div class="mui-card">
				<div class="mui-card-header">商品参数</div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<p>商品货号:{{ goodsinfo.id}}</p>
                        <p>库存情况:{{ goodsinfo.clickRate}}件</p>
                        <p>上架时间:{{ goodsinfo.createDate|dateFormat}}</p>
					</div>
				</div>
				<div class="mui-card-footer">
                    <mt-button type='primary' size='large' plain @click='goDesc(id)'>图文介绍</mt-button>
                    <mt-button type='danger' size='large' plain @click="goComment(id)">商品评论</mt-button>
                </div>
		</div>

    </div>
</template>

<script>
import swiper from '../subcomponents/swiper.vue'
// 导入数字选择框组件
import numbox from '../subcomponents/goodsinfo_numbox.vue'

export default {
    data() {
        return {
            id:this.$route.params.id,
            key:'01fb3759508a4144a3f21d8cc87eb1b8',
            lunbotu:[],
            goodsinfo:{},//获取到的商品的信息
            ballFlag:false,
            selectedCount: 1
        }
    },

    created(){
        this.getLunbotu()
        this.getGoodsInfo()
    },
    methods:{
        getLunbotu(){
            this.$http.get(`https://100boot.cn/wxShop/goods/getGoodsInfo?key=${this.key}&goodsId=${this.id}`)
            .then(result=>{
                if(result.body.code ==100){
                    result.body.result.shopGoodsImageList.forEach(item=>{
                        item.img = item.imgUrl
                    })
                    this.lunbotu = result.body.result.shopGoodsImageList
                }
            })
        },
        //获取商品的信息
        getGoodsInfo(){
            this.$http.get(`https://100boot.cn/wxShop/goods/getGoodsInfo?key=${this.key}&goodsId=${this.id}`)
            .then(result=>{
                // console.log(result)
                if(result.body.code==100){
                    this.goodsinfo = result.body.result
                }
            })
        },
        //点击到图文介绍
        goDesc(id){
             this.$router.push("/home/goodsdesc/"+id)
        },
        goComment(id){
            this.$router.push("/home/goodscomment/"+id)
        },
        addToShopcar(){
            this.ballFlag = !this.ballFlag
            var goodsInfo = {
                id: this.id, 
                count: this.selectedCount, 
                price: this.goodsinfo.price,
                selected:true
                }
            
            this.$store.commit('addToCar',goodsInfo)
         },
        beforeEnter(el){
            el.style.transform="translate(0,0)"
        },
        enter(el,done){
            el.offsetWidth;
            //获取小球在页面中的位置
            const ballPosition = this.$refs.ball.getBoundingClientRect();
            //获取徽标在页面中的位置
            const badgePosition = document
            .getElementById('badge')
            .getBoundingClientRect()

            const xDist = badgePosition.left - ballPosition.left;
            const yDist = badgePosition.top - ballPosition.top;
            el.style.transform=`translate(${xDist}px, ${yDist}px)`
            el.style.transition = 'all 0.5s cubic-bezier(.41,-0.26,.65,.31) '
            done()
        },
        afterEnter(el){
            this.ballFlag = !this.ballFlag
        },
        //得到选择的数量
        getSelectedCount(count){
            //当子组件选中的值传递给父组件时，把选中的值保存到 data的selectedCount上
            this.selectedCount = count;

        }
    },
    components:{
        swiper,
        numbox
    }
}
</script>
<style lang="scss" scoped>
.goodsinfo-container{
    background-color: #ccc;
    overflow: hidden;
    .now_price{
        font-size: 16px;
        color:red;
        font-weight: bold
    }
    .ball{
        height: 15px;
        width:15px;
        border-radius: 50%;
        background-color:red;
        position:absolute;
        left:143px;
        top:407px;
        z-index:99;
   
    }
    .mui-card-footer{
        display: block;
        button{
            margin:15px 0;
        }
    }
    
}

</style>
