<template>
    <div class='cmt-container'>   
        <h3>发表评论</h3>
        <hr>
        <textarea placeholder="请输入要评论的内容（字数限制：200字）" maxlength="200" v-model="msg"></textarea>
        <mt-button type='primary' size="large" @click='postComments'>发表评论</mt-button>
        <div class="cmt-list">
            <div class="cmt-item"  v-for="(item,index) in comments" :key='item.id' >
                <div class="cmt-title">
                    第{{index}}楼&nbsp;&nbsp;用户:{{ item.author }}&nbsp;&nbsp;发表时间:{{ item.time | dateFormat}}
                </div>
                <div class="cmt-body">
                    {{ item.content }}
                </div>
            </div>
         </div>
  
        <mt-button type='danger' size="large" plain @click="getMore">加载更多</mt-button>
    </div>
</template>
<script>
import {Toast} from 'mint-ui'
export default {
    data(){
        return {
            comments:[],
            msg:[], //评论输入的内容
        }
    },
    created(){
        this.getComments()
    },
    methods: {
        getComments(){
            this.$http.get(`api/4/story/${this.id}/short-comments`).then(result=>{
                if(result.status == 200){
                    // console.log(result.body)
                    this.comments = result.body.comments
                   
                }else{
                    Toast('评论获取失败')
                }
            })
        },
        getMore(){
            this.$http.get(`api/4/story/${this.id}/long-comments`).then(result=>{
                 if(result.status == 200){
                     if(result.body.comments.length ==0 ) return Toast('没有更多评论')
                    this.comments = this.comments.concat(result.body.comments)                
                }else{
                    Toast('加载失败')
                }
            })

        },
        postComments(){
            //校验是否为空
            if(this.msg.trim().length===0 ){
                return Toast('评论内容是否为空！')
            }
            //发表评论
            // this.$http.post('url')
            // .then(result=>{
            //     console.log(result)
            //     if(result.ret==200){
            //         var cmt = {author:'匿名用户',time:Date.now(),content:this.msg.trim()}
            //         this.comments.unshift(cmt)
            //         this.msg=""
            //     }
            // })
            var cmt = {author:'匿名用户',time:Date.now(),content:this.msg.trim()}
            this.comments.unshift(cmt)
        }
    },
    props: ["id"]
}
</script>

<style lang="scss" scoped>
.cmt-container{
    h3{
        font-size: 18px;
    }
    textarea{
        font-size: 14px;
        height: 85px;
        margin:0;
    }
    .cmt-list{
        margin:5px 0;
        .cmt-item{
             font-size: 13px;
            .cmt-title{
                background-color: #ccc;
               line-height: 35px;
            }
            .cmt-body{
                line-height: 35px;
                text-indent: 2em
            }
        }
    }
}
</style>
