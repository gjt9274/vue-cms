<template>
    <div class='cmt-container'>   
        <h3>发表评论</h3>
        <hr>
        <textarea placeholder="请输入要评论的内容（字数限制：200字）" maxlength="200"></textarea>
        <mt-button type='primary' size="large">发表评论</mt-button>
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
            comments:[]
        }
    },
    created(){
        this.getComments()
    },
    methods: {
        getComments(){
            this.$http.get('api/4/story/'+this.id+'/short-comments').then(result=>{
                if(result.status == 200){
                    // console.log(result.body)
                    this.comments = result.body.comments
                   
                }else{
                    Toast('评论获取失败')
                }
            })
        },
        getMore(){
            this.$http.get('api/4/story/'+this.id+'/long-comments').then(result=>{
                 if(result.status == 200){
                     if(result.body.comments.length == 0) return Toast('没有更多评论')
                    this.comments = this.comments.concat(result.body.comments)
                   
                }else{
                    Toast('加载失败')
                }
            })
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
