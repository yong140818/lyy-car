import {getDetailCityList} from '../../api/port'

const state = {
    ProvinceData:[],
    cityData:[]
}

const mutations = {
    upCarProvinceList(state,payload){
        state.ProvinceData = payload;
    },
    upCarCityList(state,payload){
        state.cityData = payload;
    },
}

const actions = {
    getCarProvinceList({commit}){
        getDetailCityList().then(res=>{
            commit('upCarProvinceList',res.data)
        })
    },
    getCarCityList({commit},payload){
        getDetailCityList(payload).then(res=>{
            commit('upCarCityList',res.data)
        })
    }
}

export default {
    namespaced: true,
    mutations,
    state,
    actions
}