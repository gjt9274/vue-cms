<template>
    <div>
        <ul class="mui-table-view" >
				<li class="mui-table-view-cell mui-media" v-for="item in newslist" :key="item.id">
					<router-link :to ="'/home/newsinfo/'+item.id">
						<img class="mui-media-object mui-pull-left" :src=" item.images[0] ">
						<div class="mui-media-body">
							<h1>{{item.title}}</h1>
							<p class='mui-ellipsis'>
                                <span>发表时间:{{ Date.now() | dateFormat }}</span>
                                <span>点击:0次</span>
                            </p>
						</div>
					</router-link>
				</li>
			</ul>
    </div>
</template>

<script>
import { Toast } from 'mint-ui'
export default {
    data(){
        return {
            newslist:[]
        }
    },
    created(){
        this.getNewsList()
       
    },
    methods:{
        getNewsList(){//获取新闻列表数据
            this.$http.get('api/4/news/latest').then(result=>{
                console.log(result.body)
                if(result.status == 200 ){
                    this.newslist = result.body.stories
                }else{
                   Toast('新闻资讯获取失败')
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.mui-table-view{
    li{
        h1{
            font-size: 14px;
        }
        .mui-ellipsis{
            font-size: 12px;
            color: #226aff;
            display: flex;
            justify-content: space-between
        }
    }
}

</style>
