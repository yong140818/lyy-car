<template>
    <div class='cars-detail'>
        <div class='wrapper'>
            <div class='header'>
                <div class='banner' @click='openImgsFn(detailData.SerialID)'>
                    <img src="http://img1.imgtn.bdimg.com/it/u=2212583920,60635937&fm=26&gp=0.jpg" alt="">
                    <span>{{detailData?detailData.pic_group_count:''}}张照片</span>
                </div>
                <div class='banner_price'>
                    <dl>
                        <dt>
                            <span>{{detailData?detailData.market_attribute.official_refer_price:''}}</span>
                            <i>指导价 {{detailData?detailData.market_attribute.dealer_price:''}}</i>
                        </dt>
                        <dd>
                            <span @click='openQuotationFn()'>{{detailData?detailData.BottomEntranceTitle:''}}</span>
                        </dd>
                    </dl>
                </div>
            </div>
            <div class='list_tab_nav'>
                <span v-for='(item,index) in yearsData' :key='index' @click='tabFn(item,index)' :class="idx==index?'actives':''">{{item}}</span>
            </div>
            <div class='list-box'>
                <div v-for='(item,key,index) in allDatas' :key='index' class='list-item'>
                    <p class='list-title'>{{key}}</p>
                    <div v-for='(item,index) in allDatas[key]' id='text-box' :key='index' :class="index == 0 ? 'text-box-active' : 'text-box'">
                        <p>{{item.market_attribute.year}}款 {{item.car_name}}</p>
                        <p>{{item.horse_power}}马力{{item.gear_num}}档{{item.trans_type}}</p>
                        <div class='text'>
                            <span>指导价{{item.market_attribute.dealer_price_max}}</span>
                            <i>{{item.market_attribute.dealer_price_min}}起</i>
                        </div>
                        <div class='btn-xun' @click='openQuotationFn(item.car_id)'>询问底价</div>
                    </div>
                </div>
            </div>
        </div>
        <div class='footer' @click='openQuotationFn()'>
            <span>询问底价</span>
            <em>本地经销商为您报价</em>
        </div>
    </div>
</template>

<script>

import { mapState, mapActions } from "vuex";
import Loading from '../components/loading'
export default {
  data() {
    return {
      id: null,
      idx:0
    };
  },
  beforeMount() {},
  computed: {
    ...mapState({
      detailData: state => {
        return state.b.detailData;
      },
      yearsData: state => {
        return state.b.yearsData;
      },
      allDatas: state => {
        return state.b.allDatas;
      }
    })
  },
  methods: {
    ...mapActions({
      getCarDetail: "b/getCarDetail",
      getTypeData: "b/getTypeData",
      getQuetations: "c/getQuetations",
      getCarImgs: "imgs/getCarImgs"
    }),
    tabFn(val,idx) {
      this.idx = idx;
      this.getTypeData(val);
    },
    openQuotationFn(id){
        this.getQuetations({car_id:id,city_id:'201'});
        this.$router.push({path:'/quetation',query:{car_id:id}})
    },
    openImgsFn(id){
      this.getCarImgs(id);
      //  this.$router.push({path:'/quetation',query:{car_id:id}})
      this.$router.push({path:'/imgs',query:{SerialID:id}})
      // SerialID
    }
    
  },
  mounted() {
    this.id = this.$route.query.SerialID;
    this.getCarDetail(this.id);
    // this.
    // console.log(this.detailData);
  }
};
</script>

<style scoped>
.cars-detail {
  width: 100%;
  height: 100%;
  font-size: 0.32rem;
  display: flex;
  flex-direction: column;
  background: #eee;
}
.wrapper {
  flex: 1;
  overflow-y: scroll;
  margin-bottom: 1rem;
}
.header {
  height: 4.8rem;
  background: #fff;
}
.banner {
  height: 3.4rem;
  position: relative;
}
.actives {
  color: #3aacff;
}
.banner > img {
  height: 100%;
  width: 100%;
}
.banner > span {
  position: absolute;
  right: 0.3rem;
  bottom: 0.3rem;
  padding: 0.03rem 0.1rem;
  border-radius: 0.2rem;
  background: rgba(0, 0, 0, 0.6);
  color: #fff;
  font-size: 0.24rem;
}
.banner_price {
  height: 1.4rem;
}
.banner_price > dl {
  height: 100%;
  display: flex;
}
.banner_price > dl > dt {
  width: 50%;
  height: 100%;
  padding: 0.34rem 0.2rem;
  display: flex;
  flex-direction: column;
}
.banner_price > dl > dt > span {
  font-size: 0.3rem;
  color: #f00;
}
.banner_price > dl > dt > i {
  font-size: 0.24rem;
  color: #999;
}
.banner_price > dl > dd {
  width: 50%;
  height: 100%;
  padding-right: 0.1rem;
}
.banner_price > dl > dd > span {
  display: block;
  width: 100%;
  height: 0.7rem;
  background: #3aacff;
  color: #fff;
  font-size: 0.28rem;
  line-height: 0.7rem;
  border-radius: 0.1rem;
  margin-top: 0.36rem;
  text-align: center;
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
  height: 2.4rem;
  overflow: hidden;
  padding: 0.05rem 0;
  margin-top: 0rem;
  background: #fff;
}
.list-item {
  width: 100%;
  height: auto;
  overflow: hidden;
  /* background: #fff; */
  /* margin-top:.1rem; */
}
.list-item > .list-title {
  width: 100%;
  height: 0.5rem;
  line-height: 0.5rem;
  font-size: 0.24rem;
  color: #999;
  padding: 0 0.2rem;
}
.text-box {
  width: 100%;
  height: 2.4rem;
  background: #fff;
  /* overflow: hidden; */
  padding: 0.05rem 0;
  margin-top: 0.2rem;
}
#text-box > p {
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
}
.btn-xun {
  border-top: 1px solid #ccc;
  height: 0.8rem;
  width: 100%;
  text-align: center;
  line-height: 0.8rem;
  font-size: 0.28rem;
  color: #3aacff;
  /* margin-top:.1rem; */
}
.text {
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
}
.footer {
  width: 100%;
  height: 1rem;
  background: #3aacff;
  color: #fff;
  font-size: 0.28rem;
  display: flex;
  flex-direction: column;
  text-align: center;
  position: fixed;
  bottom: 0;
  left: 0;
  padding: 0.15rem 0;
}
.footer > em {
  font-size: 0.24rem;
}
</style>
