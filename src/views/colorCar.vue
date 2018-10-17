<template>
    <div class='color_box'>
        <p @click='allColorFn'>全部颜色</p>
        <div>
            <p>
                <span @click='tapColorFn(item,index)' v-for='(item,index) in keys' :key='index' :class="index==idx?'actived':''">{{item}}</span>
            </p>
        </div>
        <ul>
            <li v-for='(item,index) in colorList[year]' :key='index' @click='tapImgsList(item.ColorId,item.Name)'><div><span :style='`background-color:${item.Value};`'></span>{{item.Name}}</div></li>
        </ul>
    </div>
    
</template>

<script>
import {mapState,mapActions,mapMutations} from 'vuex'
export default {
    data(){
        return {
            year:'',
            idx: 0
        }
    },
    computed:{
        ...mapState({
            colorList:state=>{
                return state.imgs.colorList
            },
            keys:state=>{
                return state.imgs.keys
            } 
        })
    },
    methods:{
        ...mapActions({
            getColorYearCarsList: "imgs/getColorYearCarsList",
            getCarImgs: "imgs/getCarImgs"
        }),
        ...mapMutations({
            getCarColorTypeName:'imgs/getCarColorTypeName'
        }),
        tapColorFn(year,idx){
            this.year = year;
            this.idx = idx;
        },
        tapImgsList(id,name){
            this.getCarImgs({SerialID: this.$route.query.SerialID,ColorID: id});
            this.getCarColorTypeName(name);
            window.localStorage.setItem("imgIds",JSON.stringify({SerialID: this.$route.query.SerialID,ColorID: id}));
            this.$router.history.go(-1);
        },
        allColorFn(){
            this.$router.history.go(-1);
        }
    },
    updated(){
        if(this.year==""){
            this.year = this.keys[0];
        } 
    },
    
    mounted(){
        this.getColorYearCarsList(this.$route.query.SerialID);
    }
    
}
</script>

<style scoped>
.color_box{
    width:100%;
    height:100%;
    background: #f4f4f4;
    overflow: hidden;
}
.color_box>p{
    height:.8rem;
    background: #fff;
    text-align: center;
    line-height: .8rem;
    color:#00afff;
    margin-top:.15rem;
}
.color_box>div>p{
    height:.7rem;
    background: #fff;
    text-align: center;
    line-height: .7rem;
    margin-top:.15rem;
    display: flex;
    overflow-x:scroll;
}
.color_box>div>p>span{
    padding:0 .2rem;
}
.color_box>ul{
   width:100%;
   height:auto;
   display: flex;
   flex-wrap:wrap;
   margin-top:.15rem;
}
.color_box>ul>li{
   width:50%;
   height:1.1rem;
   background: #fff;
   padding:.2rem;
   
}
.color_box>ul>li>div{
   width:100%;
   height:.7rem;
   border:1px solid #00afff;
   font-size:.28rem;
   line-height: .7rem;
   border-radius: .1rem;
}
.color_box>ul>li span{
    display: inline-block;
    width: .4rem;
    height: .4rem;
    margin-left: .2rem;
    vertical-align: -12%;
    background: #fe9210;
    box-sizing: border-box;
    border: 1px solid #818181;
    margin-right:.15rem;
}
.actived{
    color:#00afff;
}
</style>
