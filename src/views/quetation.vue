<template>
    <div class='quetation' @scroll='Onscroll'>
        <header class='header'>
            <p>可向多个商家咨询最低价，商家及时回复</p>
            <img src="img/icon-help.png" alt="">
        </header>
        <section>
             <div class="sectionbox">
                <img src="http://img1.bitautoimg.com/autoalbum/files/20180314/683/0540216831_3.jpg" alt="">
                <div class='sectionbox_text'>
                    <div>
                        <span>奔奔EV</span>
                        <span>2017款 210公里豪华版</span>
                    </div>
                </div>
            </div>
            
            <p class="hoot">个人信息</p>
            <ul class="quetation_list">
                <li>
                    <span>姓名</span>
                    <input type="text" placeholder="输入你的真实中文姓名" maxlength="4" v-model="username">
                </li>
                <li>
                    <span>手机</span>
                    <input type="tel" placeholder="输入你的真实手机号码" maxlength="11" v-model="telephone">
                </li>
                <li>
                    <span>城市</span>
                    <span @click='showCityFn'>{{cityLocationText.name}}</span>
                </li>
            </ul>
            <div class="button"><span @click='submitFn'>询最低价</span></div>
            <p class="hoot" ref='hoot'>选择报价经销商</p>
            <div class="dealer-info">
              <ul>
                <li v-for='(item,index) in quetationList' :key='index'>
                  <i :class="item.flag ? 'actived' : ''" @click='checkedFn(index)'></i>
                    <p class='top'>
                        <span>{{item.dealerShortName}}</span> 
                        <span>{{item.promotePrice}}万</span>
                    </p> 
                    <p class='bot'>
                        <span>{{item.address}}</span> 
                        <span>售{{item.saleRange}}</span>
                    </p>
                </li>
              </ul>
            </div>
        </section>
        <footer v-if='isShow'>
            <button>询最低价</button>
        </footer>
        <City :isShowScroll='isShowScroll' :ProvinceData='ProvinceData' :getCarCityList='getCarCityList' :cityData='cityData' :carId='carId'/>
    </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import City from '../components/city'
export default {
  data() {
    return {
      isShow: false,
      arr:[1,2,3,4,5],
      isShowScroll:false,
      cityLocationText:{name:'北京'},
      carId:null,
      telephone:'',
      username:''
    };
  },
  components:{
    City:City
  },
  computed: {
    ...mapState({
      quetationData: state => {
        return state.c.quetationDatas;
      },
      quetationList: state => {
        return state.c.quetationList;
      },
      ProvinceData: state => {
        return state.city.ProvinceData;
      },
      cityData: state => {
        return state.city.cityData;
      },
    })
  },
  methods: {
    ...mapActions({
      getQuetations: "c/getQuetations",
      getCarProvinceList: "city/getCarProvinceList",
      getCarCityList:'city/getCarCityList'
    }),
    Onscroll(e) {
      let ract = this.$refs.hoot.offsetTop - this.$refs.hoot.offsetHeight;
      if (e.target.scrollTop >= ract) {
        this.isShow = true;
      }else{
         this.isShow = false;
      }
    },
    checkedFn(idx){
      var obj = this.quetationList[idx]
      this.$set(this.quetationList,idx,{...obj,flag:!obj.flag})
    },
    showCityFn(){
      this.isShowScroll = true;
      this.getCarProvinceList()
    },
    submitFn(){
      if(/[\u4e00-\u9fa5]/.test(this.username)){
          if(/^1[3,5,8,7][0-9]{9}$/.test(this.telephone)){

          }else{
            alert('请输入正确的手机号')
          }
      }else{
        alert('请输入中文真实的名字')
      }
    }
  },
  mounted() {
    console.log(666666666666666666);
    this.carId = this.$route.query.car_id;
    this.getQuetations({car_id:this.$route.query.car_id,city_id:'201'});
    eventBus.$on('tapText',(val)=>{
      this.isShowScroll = false;
      this.cityLocationText = val;
    })
  }
};
</script>

<style scoped>

footer button {
  width: 100%;
  height: 1rem;
  line-height: 1rem;
  background: #3aacff;
  text-align: center;
  font-size: 0.34rem;
  color: #fff;
  border: 0;
  position: fixed;
  bottom: 0;
  left: 0;
}
.quetation {
  width: 100%;
  height: 100%;
  overflow-y: scroll;
}
section {
  margin-top: 0.7rem;
}
.header {
  height: 0.6rem;
  line-height: 0.6rem;
  width: 100%;
  background: #79cd92;
  text-align: center;
  z-index: 99;
  font-size: 0.28rem;
  position: fixed;
  top: 0;
  left: 0;
  color: #fff;
}
.header.p {
  color: #fff;
  font-size: 0.3rem;
  display: inline-block;
}
.header.img {
  border: none;
}
.sectionbox {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 1.6rem;
  margin-top: 10px;
  padding:0 .2rem;
  position: relative;
  padding-bottom:.1rem;
}
.sectionbox:before {
  content: "";
  display: inline-block;
  padding-top: 0.16rem;
  padding-right: 0.16rem;
  border-top: 2px solid #ccc;
  border-right: 2px solid #ccc;
  -webkit-transform: rotate(45deg);
  transform: rotate(45deg);
  position: absolute;
  right: 0.26rem;
  top: 0.5rem;
  z-index: 99;
}
.sectionbox img {
  width: 2.1rem;
  height:80%;
  padding: .05rem .1rem;
  border: 1px solid #ccc;
  border-radius: .1rem;
}
.sectionbox_text {
  padding:.1rem .2rem;
  flex: 1;
  background: #fff;
  font-size: 0.28rem;
  position: relative;
}
.sectionbox_text > div {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.sectionbox_text > div > span:nth-child(1) {
  font-size: 0.32rem;
}
.sectionbox_text > div > span:nth-child(2) {
  font-size: 0.28rem;
  margin-top: 0.1rem;
  font-weight:lighter;

}
.sectionbox_text > div > i {
  position: absolute;
  right: 0;
  top: 0.1rem;
}
.hoot {
  /* padding: 0 .2rem; */
  height: 0.6rem;
  line-height: 0.6rem;
  font-size: 0.24rem;
  color: #666;
  background: #eee;
}
/* .sectionbox p b {
  font-size: .36rem;
  font-weight:lighter;
}
.sectionbox p span {
  font-size: .32rem;
  font-weight:lighter;
}
.sectionbox #end {
  width: 100%;
  display: flex;
  color: #ccc;
  font-size: 0.3rem;
  font-weight: 900;
  justify-content: flex-end;
  padding-right: 10%;
} */
.quetation_list li {
  font-size: 0.32rem;
  height: 0.88rem;
  line-height: 0.88rem;
  border-bottom: 1px solid #eee;
  box-sizing: border-box;
  color: #000;
  display: flex;
  justify-content: space-between;
  padding-left: 10px;
}
.quetation_list input {
  font-size: 0.32rem;
  padding-right: 0.2rem;
  width: 88%;
  text-align: right;
  box-sizing: border-box;
  color: #555;
  border: 0;
  outline: none;
}

.quetation_list li span:nth-child(2) {
  padding-right: 10px;
}
.quetation_list li span:nth-child(2):after {
  content: "";
  display: inline-block;
  padding-top: 0.16rem;
  padding-right: 0.16rem;
  border-top: 1px solid silver;
  border-right: 1px solid silver;
  -webkit-transform: rotate(45deg);
  transform: rotate(45deg);
}
.button {
  text-align: center;
  height:1rem;
  padding-top:.15rem;
}

.button>span {
  display: block;
  margin:0 auto;
  font-size: 0.32rem;
  color: #fff;
  width: 80%;
  background: #3aacff;
  height: 0.7rem;
  border-radius: 0.1rem;
  border: 0;
  line-height: .7rem;
}
.dealer-info li>i:before {
  position: absolute;
  content: "";
  display: inline-block;
  width: 0.32rem;
  height: 0.32rem;
  border-radius: 50%;
  border: 2px solid #ccc;
  box-sizing: border-box;
  position: absolute;
  left: 0.05rem;
  top: 50%;
  text-align: center;
  line-height: 0.32rem;
  -webkit-transform: translate3d(0, -50%, 0);
  /* padding-left: 10px; */
  transform: translate3d(0, -50%, 0);
}

.dealer-info {
  padding-left: 10px;
  font-size: 0.28rem;
  padding-bottom:1rem;
}
.dealer-info>ul{
  width:100%;
  height:auto;
  background: orange;
}
.dealer-info>ul>li {
  position: relative;
  padding: 0.26rem 0 0.26rem 0.54rem;
  width:100%;
  border-bottom: 1px solid #eee;
  box-sizing: border-box;
  height: 1.65rem;
  background: #fff;
}

.dealer-info li>i.actived:before {
  content: "√";
  background: #3aacff;
  border: none;
  color: #fff;
  
}

.dealer-info li p.top,
.dealer-info li p.bot {
  display: flex;
  justify-content: space-between;
  width:100%;
}

.dealer-info li p.top span:nth-of-type(2) {
  margin-right: 10px;
  font-size:.26rem;
  color: red;
}

.dealer-info li p.bot span:nth-of-type(1) {
  flex:1;
  padding-right:.1rem;
  font-size:.24rem;
}
.dealer-info li p.bot span:nth-of-type(2) {
  width:1rem;
  margin-right: 10px;
  font-size:.24rem;
  text-align: center;
} 

.dealer-info li p.bot {
  margin-top: 0.1rem;
  font-size: 0.24rem;
  color: #a2a2a2;
}
</style>
