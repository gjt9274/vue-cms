<template>
    <div class='app-container'>
        <!-- 顶部 Header 区域 -->
       <mt-header fixed title="Vue项目">
		   <span  slot="left">
			  <mt-button icon="back" v-show="flag" @click="goBack">返回</mt-button>
			</span>
	   </mt-header>
	   
 
        <!-- 中间的路由部分 -->
		<transition mode="out-in">
			<router-view></router-view>
		</transition>

        <!-- 底部的 Tabbar 部分 -->
        <nav class="mui-bar mui-bar-tab">
			<router-link class="mui-tab-item " to="/home">
				<span class="mui-icon mui-icon-home"></span>
				<span class="mui-tab-label">首页</span>
			</router-link>
			<router-link class="mui-tab-item" to="/member">
				<span class="mui-icon mui-icon-contact"></span>
				<span class="mui-tab-label">会员</span>
			</router-link>
			<router-link class="mui-tab-item" to="/cart">
				<span class="mui-icon mui-icon-extra  mui-icon-extra-cart"> <span id="badge" class="mui-badge">{{ $store.getters.getAllCount}}</span> </span>
				<span class="mui-tab-label">购物车</span>
			</router-link>
			<router-link class="mui-tab-item" to="/search">
				<span class="mui-icon mui-icon-search"></span>
				<span class="mui-tab-label">搜索</span>
			</router-link>
		</nav>
    </div>
</template>

<script>
export default{
	date(){
		return {
			flag:false
		}
	},
	created(){
		this.flag = this.$route.path === "/home" ? false : true
	},
	methods:{
		goBack(){
			this.$router.go(-1)
		}
	},
	watch:{
		'$route.path':function(newVal){
			if(newVal == "/home"){
				this.flag =false
			}else{
				this.flag = true
			}
		}
	}
}
</script>

<style lang="scss" scoped>
	.mint-header{
		z-index: 99;
	}
    .app-container{
        padding-top:40px;
		padding-bottom: 50px;
		overflow-x: hidden;
    }

	.v-enter{
		opacity: 0;
		transform:translateX(100%);//设备宽度
	}
	.v-leave-to{
		opacity:0;
		transform:translateX(-100%);
		position:absulote;
	}

	.v-enter-active,
	.v-leave-active{
		transition:all 0.5s ease;
	}
</style>
