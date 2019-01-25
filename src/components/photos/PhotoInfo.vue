<template>
    <div class="photoinfo-container">
        <h3>{{ photoinfo.title }}</h3>
        <p class='subtitle'>
            <span>发表时间:{{ photoinfo.published_at | dateFormat}}</span>
            <span>点击:0次</span>
        </p>

        <hr>

        <!-- 缩略图区域 -->
        <vue-preview
        :list="list"
        :thumbImageStyle="{width: '90px', height: '90px', margin: '10px'}"
        :previewBoxStyle="{border: '1px solid #eee'}"
        :tapToClose="true"
        @close="closeHandler"
        @destroy="destroyHandler"
        />
        <!-- 图片内容区域 -->

        <div  v-html=" photoinfo.body"></div>


        <!-- 放置评论子组件 -->
        <cmt-box :id='this.id'></cmt-box>
    </div>
</template>

<script>
import comment from '../subcomponents/comment.vue'
export default {
    data(){
        return {
            id:this.$route.params.id, //从路由中获取到的图片id
            photoinfo:{},
            list:[]
        }
    },
    created(){
        this.getPhotoInfo()
        this.getThumbs()
    },
    methods:{
        getPhotoInfo(){
            this.$http.get(`api/4/news/${this.id}`).then(result=>{
                if(result.status == 200){
                    this.photoinfo = result.body
                   
                }
            })
        },
        getThumbs(){
            //获取缩略图
            this.$http.get(`https://100boot.cn/wxShop/goods/getGoodsInfo?key=01fb3759508a4144a3f21d8cc87eb1b8&goodsId=`+ Math.ceil(Math.random()*20))
            .then(result=>{
                if(result.status == 200){
                    //循环每个图片数据，然后补齐图片的宽和高
                    result.body.result.shopGoodsImageList.forEach(item => {
                        item.w = 600
                        item.h = 400
                        item.src = item.imgUrl
                    })
                    //把完整的数据保存到list中
                    this.list =  result.body.result.shopGoodsImageList
                }
             })
        },
        // 即将关闭的时候，调用这个处理函数
        closeHandler() {
        console.log('closeHandler')
        },
        // 完全关闭之后，调用这个函数清理资源
        destroyHandler() {
        console.log('destroyHandler')
        }
    },
    components:{
        'cmt-box':comment
    }
}
</script>

<style lang="scss" scoped>
.photoinfo-container{
    padding:3px;
    h3{
        color:#26a2ff;
        font-size: 15px;
        text-align:center;
        margin:15px 0;
    }
    .subtitle{
        display: flex;
        justify-content: space-between;
        font-size: 13px;
    }
    .content{
        .avatar{
            border-radius: 50%;
        }
        .content-image{
            width:100%
        }
    }

}
</style>