<template>
    <div class="newsinfo-container">
        <!-- 大标题 -->
        <h3 class="title">{{newsinfo.title}}</h3>
        <!-- 子标题 -->
        <p class='subtitle'>
            <span>发表时间: {{ Date.now() | dateFormat}}</span>
            <span>点击次数: 0 次</span>
        </p>

        <hr>
        <!-- 内容去 -->
        <div class="content" v-html="newsinfo.body" >

        </div>

        <!-- 评论子组件 -->
        <comment-box :id="this.id"></comment-box>
    </div>
</template>

<script>
import comment from '../subcomponents/comment.vue'
export default {
    data(){
        return {
            id:this.$route.params.id,
            newsinfo:{}
        }
    },
    created(){
        this.getNesInfo()
    },
    methods:{
        getNesInfo(){//获取新闻详情

            this.$http.get(`api/4/news/${this.id}`).then(result=>{
                if(result.status == 200){
                    // console.log(result)
                    this.newsinfo = result.body
                }
            })
  
        }
    },
    components:{
        'comment-box':comment
    }
}
</script>

<style lang="scss" >
.newsinfo-container{
    padding:0 4px;
    .title{
        font-size: 16px;
        text-align: center;
        margin:15px 0;
        color:red;
    }
    .subtitle{
        font-size: 13px;
        color:#226aff;
        display:flex;
        justify-content:space-between
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
