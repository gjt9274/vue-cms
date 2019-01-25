<template>
    <div class="mui-numbox" data-numbox-min='1' style="height:24px">
        <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
        <input id="test" class="mui-input-numbox" type="number" :value='initCount' readonly @change="countChanged"  ref="numbox" />
        <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
    </div>
</template>
<script>
import mui from '../../lib/mui/js/mui.min.js'
export default {
        props:["initCount","goodsid"],
        mounted(){
        //初始化数字选择框组件
            mui('.mui-numbox').numbox()
        },
        methods:{
            countChanged(){
 
                //当商品数量改变,则立即把最新的数量更新到 store中，覆盖 之前的数量
                this.$store.commit("updateGoodsInfo",{
                    id:this.goodsid,
                    count:this.$refs.numbox.value
                })
            }
        },
        
}
</script>
<style lang="scss" scoped>

</style>
