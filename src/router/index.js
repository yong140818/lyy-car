import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Home from '../views/home'
import Detail from '../views/detail'
import Imgs from '../views/imgs'
import Quetation from '../views/quetation'
import store from '../store/index'
import colorCar from '../views/colorCar'
import carModel from '../views/carModel'
Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },{
      path: '/detail',
      name: 'detail',
      component: Detail
    },{
      path: '/quetation',
      name: 'quetation',
      component: Quetation
    },{
      path: '/imgs',
      name: 'imgs',
      component: Imgs
    },{
      path: '/color',
      name: 'color',
      component: colorCar
    },{
      path: '/carModel',
      name: 'carModel',
      component: carModel
    }]
})

//
router.beforeEach((to,from,next)=>{
  store.commit('loading/upLoading',true);
  next();
})

router.afterEach((to,from,next)=>{
  setTimeout(() => {
    store.commit('loading/upLoading',false);
  }, 500);
})

export default router;
