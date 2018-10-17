<template>
    <div :class="isShowScroll?'cityActive':'city'" id='city_wrap'>
        <div class='city_list_left'>
            <div class='city_list'>
                    <p>自动定位</p>
                    <div class='city_list_item_text' @click='backFn($event)' id='201' ref='cityLocation' data-name='北京'>北京</div>
                    <p>省份</p>
                    <div v-for='(item,index) in ProvinceData' :key='index' class='city_list_item' @click='openRightFn(item.CityID)'>
                        <div>
                            <span>{{item.CityName}}</span>
                            <i>></i>
                        </div>
                    </div>
            </div>
        </div>
        <div class='city_list_right' v-if='isShowRightCity' @click='backFn($event)'>
            <ul>
                <li v-for='(item,index) in cityData' :key='index' :data-name='item.CityName' :id='item.CityID'>{{item.CityName}}</li>
            </ul>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
    data(){
        return {
            isShowRightCity:false
        }
    },
    props:['isShowScroll','cityData','ProvinceData','getCarCityList','carId'],
    computed:{
        quetationData: state => {
        return state.c.quetationDatas;
      }
    },
    methods:{
        ...mapActions({
            getQuetations: "c/getQuetations", 
        }),
        openRightFn(idx){
            if(idx){
                this.getCarCityList(idx);
                this.isShowRightCity = true
            }else{
                this.isShowRightCity = false
            }
        },
        backFn(e){
            var city_id = e.srcElement.id;
            if(e.srcElement.tagName === 'LI' || e.srcElement.tagName === "DIV" && e.srcElement.dataset.name){
                if(city_id){
                    this.isShowRightCity = false;
                    this.getQuetations({car_id:this.carId,city_id:city_id})
                    eventBus.$emit('tapText',{name:e.srcElement.dataset.name,city_id:city_id})
                }
            }else{
                this.isShowRightCity = false
            }
        }
    },
    mounted(){
        console.log(this.cityData);
    },
}
</script>

<style scoped>
    *{
        font-size:.28rem;
    }
    #city_wrap{
        position: fixed;
        top:0;
        left:0;
        width:100%;
        height:100%;
        background: #f4f4f4;
        font-size:.28rem;
        z-index:999;
    }
    .city{
        transform: translate(0,100%);
    }
    .cityActive{
        transform: translate(0,0%);
    }
    .city_list_left{
        width:100%;
        height:100%;
        overflow-y: scroll;
    }
    .city_list{
        height:100%;
        height:auto;
        background: #fff;
    }
    .city_list p{
        padding:.05rem .15rem;
        background: #f4f4f4;
        font-size:.24rem;
    }
    .city_list_item_text{
        padding:0 .3rem;
        width:100%;
        display: flex;
        justify-content: space-between;
        border-bottom:1px solid #f4f4f4;
        line-height: .7rem;
    }
    .city_list_item{
        width:100%;
        height:.7rem;
        padding-left:.1rem;
        line-height: .7rem;
    }
    .city_list_item div{
        padding:0 .2rem;
        width:100%;
        display: flex;
        justify-content: space-between;
        border-bottom:1px solid #f4f4f4;
    }
    .city_list_right{
        width:100%;
        height:100%;
        position: fixed;
        left:0;
        top:0;
        background: rgba(0,0,0,.6);
    }
    .city_list_right ul{
        width:70%;
        height:100%;
        background: #fff;
        position: absolute;
        right:0;
        top:0;
        padding-left:.1rem;
    }
    .city_list_right ul li{
        padding:0 .3rem;
        width:100%;
        border-bottom:1px solid #f4f4f4;
        line-height: .7rem;
    }
</style>
