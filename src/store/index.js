import Vue from 'vue'
import Vuex from 'vuex'
import App from './modules/app'
import Detail from './modules/carsDetail'
import Quetation from './modules/quetation'
import City from './modules/city'
import Imgs from './modules/imgs'
import Loading from './modules/loading'
Vue.use(Vuex);

//生成vuex
export default new Vuex.Store({
    modules:{
        a:App,
        b:Detail,
        c:Quetation,
        city:City,
        imgs:Imgs,
        loading:Loading
    }
})