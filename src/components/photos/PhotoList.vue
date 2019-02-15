<template>
    <div>
       <!-- 顶部滑动条区域 -->
        <div id="slider" class="mui-slider">
				<div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
					<div class="mui-scroll">
						<li :class="['mui-control-item', item.id==0?'mui-active':'']" v-for="item in cates" :key="item.id" @tap='getPhotoListByCateName(item.id==0?1:item.id)'>
							{{ item.name }}
						</li>
					</div>
				</div>
			</div>


		 <!-- 图片列表区域 -->
		 <ul class="photoList">
			<router-link v-for="item in list" :key='item.id' :to="'/home/photoinfo/' +item.id " tag="li">
				<img v-lazy="item.images[0]">
				<div class="info">
					<h1 class="info-title">标题:{{ item.title }}</h1>
					<h3 class="info-time">创建时间:{{ item.date | dateFormat}}</h3>
				</div>
			</router-link>
		</ul>
    </div>
</template>
<script>
// 导入mui的js文件
import mui from '../../lib/mui/js/mui.min.js'


export default {
    data(){
        return {
			cates:[],
			list:[], //图片列表数组
		}
	},
	created(){
		  this.getAllCategory()
		  this.getPhotoListByCateName('19')
	  },
	 mounted() {//当组件中的dom结构被渲染号并放到页面中后，会执行这个钩子函数/
	 	//如果要操作元素了，最好是在mounted里面，因为这里面的元素是最新的
		mui(".mui-scroll-wrapper").scroll({
		deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
		});
	  },
	  
   methods:{
	   getAllCategory(){
			this.$http.get('api/3/sections').then(result=>{
				if(result.status == 200){
					// console.log(result.body)
					result.body.data.unshift({name:'全部',id:0})
					 this.cates = result.body.data
				}
			})
	   },
	   getPhotoListByCateName(id){
		   //根据分类名称获取图片
		   this.$http.get(`api/3/section/${id}`).then(result=>{
			   if(result.status == 200){
				// console.log(result.body)
				this.list = result.body.stories
			   }
		   })
	   }
	}
}
</script>
<style lang="scss" scoped>
*{
	 touch-action:pan-y
}

.photoList{
	list-style-type: none;
	margin:0;
	padding:10px;
	padding-bottom: 0;
	li{
		text-align: center;
		background-color: #ccc;
		margin-bottom: 10px;
		box-shadow: 0 0 5px #999;
		position: relative;
		img{
			width:100%;
			vertical-align: middle;
		}
		img[lazy=loading] {
			width: 40px;
			height: 300px;
			margin: auto;
		}
		.info{
			position:absolute;
			bottom:0;
			background-color: rgba(0,0,0,0.4);
			width:100%;
			max-height: 84px;
			color:#fff;
			text-align:left;
			.info-title{
				font-size: 14px;
			}
			.info-time{
				font-size: 13px;
			}
		}
	}
}
</style>
