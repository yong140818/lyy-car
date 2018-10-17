<template>
    <div class='carModel_box'>
        <p @click='allCarModelFn'>全部车款</p>
        <div class='carModel_list'>
            <div class='list_tab_nav'>
                    <span v-for='(item,index) in yearsData' :key='index' @click='tabFn(item,index)' :class="idx==index?'actived':''">{{item}}</span>
                </div>
            <div class='list-box'>
                <div v-for='(item,key,index) in allDatas' :key='index' class='list-item'>
                    <p class='list-title'>{{key}}</p>
                    <div class='text-list'>
                        <div v-for='(item,index) in allDatas[key]' id='text-box' :key='index' :class="index == 0 ? 'text-box-active' : 'text-box'" @click='textFn(item.market_attribute.year+item.car_name,item.car_id
)'>
                            <div class='text_left'>
                                <p :data-index='index'>{{item.market_attribute.year}}款 {{item.car_name}}</p>
                                <p>{{item.horse_power}}马力{{item.gear_num}}档{{item.trans_type}}</p>
                            </div>
                            <div class='text_right'>
                                <span>指导价{{item.market_attribute.dealer_price_max}}</span>
                                <i>{{item.market_attribute.dealer_price_min}}起</i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
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
            yearsData: state => {
                return state.b.yearsData;
            },
            allDatas: state => {
                return state.b.allDatas;
            }
        })
    },
    methods:{
        ...mapActions({
            getColorYearCarsList: "imgs/getColorYearCarsList",
            getCarImgs: "imgs/getCarImgs",
            getCarDetail: "b/getCarDetail",
            getTypeData: "b/getTypeData"
        }),
        ...mapMutations({
            getCarModelTypeName:'imgs/getCarModelTypeName'
        }),
        allCarModelFn(){
            this.$router.history.go(-1);
        },
        tabFn(item,idx){
            this.idx = idx;
            this.getTypeData(item);
        },
        textFn(val,car_id){
            this.getCarModelTypeName(val);
            this.getCarImgs({SerialID: this.$route.query.SerialID,car_id: car_id});
            window.localStorage.setItem("imgIds",JSON.stringify({SerialID: this.$route.query.SerialID,car_id: car_id}));
            this.$router.history.go(-1);
        }
    },
    updated(){
    },
    mounted(){
        var detailId = JSON.parse(window.localStorage.getItem('typeList'));
        this.getCarDetail(detailId.SerialID);
    }
    
}
</script>

<style scoped>
*{
    box-sizing: border-box;
}
.carModel_box{
    width:100%;
    height:100%;
    overflow-y: scroll;
    background: #f4f4f4;
}
.carModel_box>p{
    height:.8rem;
    background: #fff;
    text-align: center;
    line-height: .8rem;
    color:#00afff;
    margin-top:.15rem;
}
.carModel_list{
    width:100%;
    height:auto;
}
.text-list{
    width:100%;
    height:auto;
    background: #fff;
    padding:0 .2rem;
    overflow: hidden;
}
.list_tab_nav {
  margin-top: 0.1rem;
  width: 100%;
  height: 0.8rem;
  line-height: 0.8rem;
  display: flex;
  background: #fff;
  padding: 0 0.1rem;
}
.list_tab_nav > span {
  padding: 0 0.15rem;
  font-size: 0.28rem;
}
.list_tab_nav > span.active {
  color: #3aacff;
}

.list-item .text-box-active {
  width: 100%;
  height: 2rem;
  overflow: hidden;
  padding: 0.05rem 0;
  margin-top: 0rem;
  background: #fff;
}
.list-item {
  width: 100%;
  height: auto;
  overflow: hidden;
  background: #fff;
}
.list-item > .list-title {
  width: 100%;
  height: 0.5rem;
  line-height: 0.5rem;
  font-size: 0.24rem;
  color: #999;
  padding: 0 0.2rem;
  background: #f4f4f4;
}
.text-box {
  width: 100%;
  background: #fff;
  /* margin-top: 0.2rem; */
}
#text-box{
    width:100%;
    height:1.2rem;
    /* padding:.1rem 0; */
    display: flex;
    border-bottom:1px solid #f4f4f4;
}
#text-box>.text_left{
    margin-top:.2rem;
    width:70%;
    height:100%;
    display: flex;
    flex-direction: column;
}
#text-box>.text_left>p:first-child{
    font-size:.29rem;
    width:100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
#text-box>.text_left>p:last-child{
    font-size:.24rem;
    color:#b3b3b3;
    margin-top:.03rem;
}
#text-box>.text_right{
    width:100%;
    text-align: right;
    flex:1;
    display: flex;
    flex-direction: column;
    margin-top:.2rem;
}
#text-box>.text_right>span{
    color:#f00;
    font-size:.24rem;
}
#text-box>.text_right>i{
    color:#b3b3b3;;
    font-size:.24rem;
    margin-top:.05rem;
}
.actived{
    color:#00afff;
}
/* #text-box > p {
  width: 100%;
  margin-top: 0.12rem;
  padding: 0 0.2rem;
}
#text-box > p:first-child {
  font-size: 0.28rem;
}
#text-box > p:nth-child(2) {
  font-size: 0.24rem;
  color: #bdbdbd;
} */

/* .text {
  text-align: right;
  padding: 0.1rem 0.2rem 0.1rem 0.25rem;
}
.text > span {
  text-align: right;
  font-size: 0.24rem;
  color: #999;
}
.text > i {
  text-align: right;
  color: red;
  font-size: 0.28rem;
} */
</style>
