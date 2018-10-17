<template>
<div class='wrap'>
    <div class='header'>
        <div class='haader_left' @click='openColorFn'><span>{{colorTypeName}}</span></div>
        <div class='haader_right' @click='openCarModelFn'><span>{{carModelTypeName}}</span></div>
    </div>
    <div class='content_imgs'>
        <div class='imgs_list' v-for='(item,index) in imgsData' :key='index'>
            <div class='img_box' v-for='(v,i) in item.List' :key='i'>
                <img :src="v.Url.replace('{0}','3')" alt="" ref='img'>
                <div class='imgMark' v-if='i==0' @click='openImgs(item.Id)'>
                    <span>{{item.Name}}</span>
                    <i>{{item.Count}}></i>
                </div>
            </div>
        </div>
    </div>
    <div class='mark-imgs' v-if='flag' @scroll='scrollFn'>
        <div class='mark_img_list' ref='img_box'>
            <div class='img_box' v-for='(item,index) in imgsList' :key='index' @click='fn(index)'>
                <img :src="item.Url.replace('{0}','3')" alt="" data-src='imgList'>
            </div>
        </div>
    </div>
    <Loading />
    <Swiper v-if='isShowSwiper' :appointIdx='idx' :id='id' :ImageID='ImageID'/>
</div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import {lazyLoad} from '../utils/lazy';
import Loading from '../components/loading'
// import {swiper} from 'swiper'
import Swiper from '../components/swiper'
export default {
    data(){
        return {
            text:'name',
            flag:false,
            id:null,
            page:0,
            ImageID:null,
            isShowSwiper:false,
            idx:0,
        }
    },
    components: {
        Loading: Loading,
        Swiper: Swiper
    },
    computed:{
        ...mapState({
            imgsData:state=>{
                return state.imgs.imgs
            },
            imgsList:state=>{
                return state.imgs.imgsList
            },
            colorTypeName:state=>{
                return state.imgs.colorTypeName
            },
            carModelTypeName: state=>{
                return state.imgs.carModelTypeName
            }
        })
    },
    methods:{
        ...mapActions({
            getCarImgs: "imgs/getCarImgs",
            getImgsList: "imgs/getImgsList",
            getColorYearCarsList: "imgs/getColorYearCarsList"
        }),
        openColorFn(){
            this.getColorYearCarsList(this.id)
            this.$router.push({path:'/color',query:{SerialID:this.id}})
        },
        openCarModelFn(){
            this.$router.push({path:'/carModel',query:{SerialID:this.id}});
        },
        openImgs(id){
            this.flag = true;
            this.ImageID = id;
            this.getImgsList({img_id:this.id,page:this.page,ImageID:id});
        },
        scrollFn(e){
            var imgBoxHeight = this.$refs.img_box.getBoundingClientRect().height;
            if(e.target.scrollTop > (imgBoxHeight - window.innerHeight - 20)){
                this.getImgsList({img_id:this.id,page:this.page++,ImageID:this.ImageID});
            }   
        },
        fn(index){
            this.isShowSwiper = true;
            this.idx = index;
        }
    },
    updated(){
        //动态设置图片宽度
        var nodes = [...document.querySelectorAll('img')];
        var nodeList = [...document.querySelectorAll('img[data-src]')];
        var L = nodes[1].getBoundingClientRect().left;
        if(nodeList.length > 0){
            var Left = nodeList[1].getBoundingClientRect().left;
            nodeList.forEach((item,index)=>{
                let rect = item.getBoundingClientRect();
                if(rect.left == Left){
                    item.style.width='94%';
                }
            })
        }
        nodes.forEach((item,index)=>{
            let rect = item.getBoundingClientRect();
            if(rect.left == L){
                item.style.width='94%';
            }
        })
    },
    mounted(){
        this.id = this.$route.query.SerialID;
        var imgIds = JSON.parse(window.localStorage.getItem('imgIds'));
        console.log(imgIds);
        if(imgIds && imgIds.ColorID){
            this.getCarImgs({SerialID: this.id,ColorID: imgIds.ColorID});
        }else if(imgIds && imgIds.car_id){
            this.getCarImgs({SerialID: this.id,CarID: imgIds.car_id});
        }else{
            this.getCarImgs(this.id);
        } 
    }
}
</script>

<style scoped>
*{
    font-size:.28rem;
}
.wrap{
    width:100%;
    height:100%;
    display: flex;
    flex-direction: column;
}
.content{
    width:100%;
    height:100%;
    
}
.content_imgs{
    flex:1;
    display: flex;
    flex-wrap: wrap;
    overflow-y: scroll;
}
.header{
    -webkit-box-align: center;
    align-items: center;
    z-index: 3;
    height:.8rem;
    width:100%;
    border-bottom:1px solid #ccc;
    line-height: 100%;
    text-align: center;
    display: flex;
}
.header>div{
    -webkit-box-flex: 1;
    flex: 1;
    text-align: center;
    box-sizing: border-box;
    color: #454545;
    display: inline-block;
}
.header>div:after{
    content: "";
    display: inline-block;
    padding-top: .16rem;
    padding-right: .16rem;
    border-top: 2px solid #ccc;
    border-right: 2px solid #ccc;
    -webkit-transform: rotate(135deg);
    transform: rotate(135deg);
    margin-left: .2rem;
    vertical-align: 5%;
}
.header>div>span{
    max-width: 2.6rem;
    display: inline-block;
    vertical-align: middle;
    line-height: 1.25;
    font-size: .26rem;
}
.haader_left{
    border-right:1px solid #ccc;
}
.imgs_list{
    width:100%;
    height:auto;
    margin-bottom:.08rem;
}
.img_box{
    width:calc(100% / 3);
    height:2.2rem;
    position: relative;
    overflow: hidden;
    margin-bottom:.07rem;
    float: left;
}
.img_box img{
    width:100%;
    height:100%;
    display: block;
    margin:0 auto;
}

.imgMark{
    background: rgba(0,0,0,.6);
    color:#fff;
    text-align: center;
    width:100%;
    height:100%;
    position: absolute;
    left:0;
    top:0;
    display: flex;
    flex-direction: column;
    padding:.7rem 0;
    z-index:6;
}
.imgMark>span{
    font-size:.24rem;
}
.imgMark>i{
    font-size:.28rem;
    margin-top:.05rem;
}
.mark-imgs{
    width:100%;
    height:100%;
    background: #fff;
    z-index:99;
    position: fixed;
    left:0;
    top:0;
    overflow-y: scroll;
}
.mark_img_list{
    height:auto;
    width:100%;
    display: flex;
    flex-wrap: wrap;
}

</style>
