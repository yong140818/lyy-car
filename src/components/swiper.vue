<template>
<div class='swiper_mark'>
    <div class="swiper-container">
        <div class="swiper-wrapper">
            <div class="swiper-slide" v-for='(item,index) in imgsList' :key='index'>
                <img :src="item.Url.replace('{0}','8')" alt="">
            </div>
        </div>
    </div>
    <div class='swiper_bottom'>
        <i>{{`${activeId}/${imgsList.length}`}}</i>
        <span>询最低价</span>
    </div>
</div>
</template>

<script>
import {mapState,mapActions} from 'vuex'
import Swiper from 'swiper'
export default {
    data(){
        return {
            idx:0,
            activeId:1,
            page:0
        }
    },
    props:['id','ImageID','appointIdx'],
    computed:{
        ...mapState({
            imgsList:state=>{
                return state.imgs.imgsList
            }
        })
    },
    methods:{
        ...mapActions({
            getCarImgs: "imgs/getCarImgs",
            getImgsList: "imgs/getImgsList"
        }),
        getIdx(idx){
            this.activeId = idx + 1;
            if(this.activeId >= this.imgsList.length-2 ){
                this.getImgsList({img_id:this.id,page:this.page++,ImageID:this.ImageID})
            }
        }
    },
    mounted(){
        var that = this;
        var mySwiper = new Swiper('.swiper-container',{
            on: {
                slideChange: function () {
                    that.getIdx(this.activeIndex);
                    console.log(this.activeIndex);
                },
            },
        })
        mySwiper.slideTo(this.appointIdx)
    }
}
</script>

<style scoped>
.swiper_mark{
    width:100%;
    height:100%;
    position: fixed;
    left:0;
    top:0;
    z-index:99;
    background: rgba(0,0,0);
    color:#fff;
}
.swiper-container{
    width:100%;
    height:100%;
}
.swiper-wrapper{
    width:100%;
    height:100%;
    display: flex;
    margin-top:50%;
}
.swiper-slide{
    width:100%;
    height:auto;
    flex-shrink: 0;
}
img{
   width:100%;
   height:auto;
}
.swiper_bottom{
    width:100%;
    height:.8rem;
    text-align: center;
    position: absolute;
    bottom:0;
    left:0;
    line-height: .8rem;
    
}
.swiper_bottom>i{
    font-size:.24rem;
}
.swiper_bottom>span{
    display: inline-block;
    width:1.2rem;
    height:.5rem;
    background: #3aacff;
    line-height: .5rem;
    text-align: center;
    position: absolute;
    right:.1rem;
    top:.2rem;
    font-size:.24rem;
}
</style>
