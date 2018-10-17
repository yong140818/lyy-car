<template>
    <div class='wrap'>
        <div class='content' @scroll='scrollFn()'>
            <!-- 首页列表 -->
            <div class='carsList-left' ref='carsList' @scroll='scrollFn()'>
                <div class='item-list' v-for='(item,index) in letters' :key='index'>
                    <p ref='span' :id='item'>{{item}}</p>
                    <ul class='cars-contents'>
                        <li v-for='(v,i) in carDatas' :key='i' v-if='v.Spelling.slice(0,1) == item' @click.stop='showFn(v.MasterID)'>
                            <img :src='v.CoverPhoto' alt="">
                            <span>{{v.Name}}</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <!-- 首字母列表 -->
        <div class='letters-right' @touchstart='startFn' @touchmove='moveFn' @touchend='endFn'>
            <div class='letter-item' ref='letters'>
                <span>#</span>
                <span v-for='(item,index) in letters' :key='index' @click='clickTop(index)'>{{item}}</span>
            </div>
        </div>
        <!-- 右侧对应车系列表 -->
        <section :class="flag?'carList-right-box carList-right':'carList-right-box active'" id='carList-right' @click='clickFn($event)'>
            <div class='carList-right-item'>
                <div v-for='(item,index) in carList' :key='index'>
                    <p>{{item.GroupName}}</p>
                    <ul>
                        <li v-for='(v,i) in item.GroupList' :key='i' @click='openFn(v.SerialID)'>
                                <img :src="v.Picture" alt="">
                            <dl class='text'>
                                <dt>{{v.AliasName}}</dt>
                                <dd>{{v.DealerPrice}}</dd>
                            </dl>
                        </li>
                    </ul>
                </div>
           </div>
        </section>
        <!-- 侧边栏滑动显示车系首字母loading -->
        <lettersLoading v-if='isShow' :letters='loadLetters'/>
        <Loading />
    </div>
</template>

<script>
import Bscroll from "better-scroll";
import { mapState, mapActions } from "vuex";
import {lazyLoad} from '../utils/lazyLoad';
import LettersLoading from "../components/lettersLoading";
import Loading from '../components/loading'
export default {
  data() {
    return {
      flag: true,
      scroll,
      isShow: false,
      loadLetters: null
    };
  },
  components: {
    lettersLoading: LettersLoading,
    Loading: Loading
  },
  computed: {
    ...mapState({
      carDatas: state => {
        return state.a.carDatas;
      },
      letters: state => {
        return state.a.letters;
      },
      carList: state => {
        console.log(state);
        return state.a.carList;
      },
      yearsData: state => {
        console.log(state);
        return state.b.yearsData;
      }
    })
  },
  methods: {
    ...mapActions({
      getCarsData: "a/getData",
      getCarContent: "a/getCarContent",
      getCarDetail: "b/getCarDetail"
    }),
    scrollFn(){
      console.log(222222222222);
    },
    openFn(id){
        this.getCarDetail(id);
        window.localStorage.setItem("typeList",JSON.stringify({"SerialID":id,city_id:'201'}));
        this.$router.push({path:'/detail',query:{"SerialID":id,city_id:'201'}})
    },
    showFn(id) {
      this.getCarContent(id);
      this.flag = false;
    },
    clickFn(e) {
      //事件代理
      if (
        e.srcElement.nodeName === "SECTION" ||
        e.srcElement.nodeName === "P" 
      ) {
        this.flag = true;
        // setTimeout(() => {
        //   this.$router.push({ name: "detail" });
        // }, 1000);
      }
    },
    clickTop(idx) {
      var top = this.$refs.span[idx].offsetTop; //元素节点距离顶部的位置
      this.scroll.scrollTo(0, -top);
    },
    startFn() {},
    moveFn(e) {
      var index = Math.floor(
        (e.touches[0].pageY - this.top) / this.clineHeight
      );
      if (index < 0) {
        index = 0;
      } else if (index > this.letters.length - 1) {
        index = this.letters.length - 1;
      }
      var item = this.letters[index];
      var offsetTop = document.getElementById(item).offsetTop;
      if (offsetTop < 1) {
        offsetTop = 0;
      }
      this.loadLetters = item;
      this.isShow = true;
      this.scroll.scrollTo(0, -offsetTop);
      lazyLoad(".content")
    },
    endFn() {
      this.isShow = false;
    }
  },
  updated() {
    this.top = this.$refs.letters.getBoundingClientRect().top;
    this.clineHeight = this.$refs.letters.children[0].getBoundingClientRect().height;
  },
  mounted() {
    this.getCarsData();
    this.scroll = new Bscroll(".content", {
      scrollY: true,
      click: true
    });
    new Bscroll('.carList-right-box',{
        scrollY:true,
        click:true
    })
  }
};
</script>

<style>
.wrap {
  width: 100%;
  height: 100%;
  font-size: 0.32rem;
  overflow: hidden;
}
.content {
  width: 100%;
  height: 100%;
}
.item-list {
  width: 100%;
/* background: #fff; */
}
.item-list > p {
  width: 100%;
  height: 0.4rem;
  line-height: 0.4rem;
  padding: 0 0.3rem;
  font-size: 0.28rem;
  color: #999;
  background: #eee;
}
.cars-contents {
  width: 100%;
  padding: 0 0.3rem;
  background: #fff;
  height: auto;
}
.cars-contents > li {
  width: 100%;
  height: 1rem;
  border-bottom: 1px solid #eee;
  display: flex;
  z-index:9;
}
.cars-contents > li > img {
  width: auto;
  height: 0.6rem;
  margin-top: 0.2rem;
}
.cars-contents > li > span {
  line-height: 1rem;
  margin-left: 0.2rem;
  font-size: 0.26rem;
}
.letters-right {
  width: 0.35rem;
  height: 100%;
  position: fixed;
  top: 0;
  right: 0;
  z-index: 999;
}
.letter-item {
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  font-size: 0.26rem;
  font-weight: lighter;
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  z-index: 999;
  /* background: #fff; */
}
.letters-right span {
  padding-top: 0.06rem;
  padding-left: 0.03rem;
}
.carList-right {
  width: 100%;
  height: 100%;
  position: fixed;
  right: 0;
  top: 0;
  transform: translateX(100%);
  transition: all .9s;
}
.active {
  width: 100%;
  height: 100%;
  background: #fff;
  transform: translateX(20%);
  transition: all 1s;
  position: fixed;
  right: 0;
  top: 0;
  padding-left: 0.04rem;
}
.carList-right-item{
    width:100%;
    height:auto;
}
#carList-right p {
  font-size: 0.26rem;
  width: 100%;
  height: 0.4rem;
  line-height: 0.4rem;
  background: #eee;
  padding: 0 0.2rem;
  color: #999;
}
#carList-right li {
  width: 100%;
  height: 1rem;
  border-bottom: 1px solid #eee;
  display: flex;
}
#carList-right li img {
  height: 0.8rem;
  margin: 0.1rem 0.1rem 0.1rem 0.3rem;
  /* padding:.15rem .1rem .15rem .2rem; */
}
#carList-right li .text {
  display: flex;
  flex-direction: column;
  font-size: 0.26rem;
  padding-top: 0.12rem;
}
#carList-right li .text > dd {
  margin-top: 0.06rem;
  font-size: 0.24rem;
  color: red;
}
</style>
