<template>
    <div class="goodsdesc-container">
        <h3>{{ desc.title }}</h3>
         <div  v-html=" desc.body"></div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            id:this.$route.params.id,
            key:'01fb3759508a4144a3f21d8cc87eb1b8',
            desc:{}
        }
    },
    created(){
        this.getGoodsDesc()

    },
    methods:{
        getGoodsDesc(){
           this.$http.get(`api/4/news/9666719`).then(result=>{
                if(result.status == 200){
                    console.log(result.body)
                    this.desc = result.body
                   
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.goodsdesc-container{
    padding:4px;
    h3{
        font-size: 16px;
        color:#226aff;
        text-align: center;
        margin:15px 0;
    }
  
}

</style>
