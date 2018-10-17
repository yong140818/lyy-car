<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  computed:{
    num(){
      return this.$store.state.App.num
    }
  },
  methods:{
    //同步
    // changeNum(type){
    //   console.log(type);
    //   if(type==='add'){
    //     this.$store.commit('changeNum',this.num+1)
    //   }else if(type === "del"){
    //     this.$store.commit('changeNum',this.num-1)
    //   }
    // },


    //异步
    // changeNum(type){
    //   if(type==='add'){
    //     this.$store.dispatch('changeNumAsync',this.num+1)
        
    //   }
    // }
  },
  mounted(){
    // console.log('store...',this.$store);
  }
}
</script>

<style>
html,body{
  width:100%;
  height:100%;
}
#app {
  width:100%;
  height:100%;
  overflow: hidden;
}
*{
  margin:0;
  padding:0;
  list-style:none;
  text-decoration: none;
  font-style:normal;
  box-sizing: border-box;
  font-size:.32rem;
}
</style>
