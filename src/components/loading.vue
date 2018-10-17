<template>
    <div class='loading' v-if='isShowLoading'>
        <div class='loading_mark'>
            <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1539613657429&di=2877587eafd66a177bbd58a0cf602301&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01e44156d13ee532f875520f14e2a4.gif" alt="">
        </div>
    </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
    computed:{
        ...mapState({
            isShowLoading:(state)=>{
                return state.loading.isShowLoading
            }
        }) 
    }
}
</script>

<style>
.loading{
    width:100%;
    height:100%;
    background: #fff;
    z-index:999;
    position: fixed;
    left:0;
    top:0;
}
.loading_mark{
    width:3rem;
    height:3rem;
    position: absolute;
    left:0;
    bottom:0;
    top:0;
    right:0;
    margin:auto;
    background: rgba(0,0,0,.6);
    text-align: center;
    line-height: 1rem;
    border-radius: .3rem;
}
.loading_mark img{
    width:80%;
    height:80%;
    display: block;
    position: absolute;
    left:0;
    bottom:0;
    top:0;
    right:0;
    margin:auto;
}
</style>
