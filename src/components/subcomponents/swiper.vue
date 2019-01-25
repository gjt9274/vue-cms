<template>
    <div>
        <mt-swipe :auto="4000">
        <!-- //在组件中使用v-for循环要使用v-bind:key -->
        <!-- 谁使用此轮播图子组件，就传 LunbotuList -->
        <!-- 父组件向子组件传值 -->
        <mt-swipe-item v-for="item in LunbotuList" :key="item.id">
            <a :href="item.url"><img :src="item.img" alt="" :class="{'full':isfull}"></a>
        </mt-swipe-item>
        </mt-swipe>
    </div>
</template>
<script>
export default {
    props:['LunbotuList','isfull']
}
</script>
<style lang="scss" scoped>
.mint-swipe{
    height:200px;
    .mint-swipe-item{
       //交集选择器
       text-align: center;
       img{
           height:100%;
       }
    }
}
.full{
    width:100%;
}
</style>
