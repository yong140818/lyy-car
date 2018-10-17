import {getDetailList} from '../../api/port'
import {merges,sortFns,filterFns} from '../../utils/index'
const state = {
    detailData:null,
    yearsData:[],
    allDatas:[],
    typeList:[],
    sortData:[]
}

const mutations = {
    upCarDetail(state,payload){
        var arr = payload.list;
        state.detailData = payload;
        var years = ['全部'];
        payload.list.forEach((item,index)=>{
            if(years.indexOf(item['market_attribute'].year) == -1){
                years.push(item['market_attribute'].year)
            }
        })
        state.yearsData = years; //年
        state.sortData = sortFns(arr); //全部数据
        state.typeList = filterFns("全部",state.sortData);
        state.allDatas = merges(state.typeList);
    },
    upTypeData(state,payload){
        state.typeList = filterFns(payload,state.sortData);
        state.allDatas = merges(state.typeList);
    }
}

const actions = {
    getCarDetail({commit},payload){
        getDetailList(payload).then(res=>{
            commit('upCarDetail',res.data);
        })
    },
    getTypeData({commit},payload){
            commit('upTypeData',payload);
    }
}


export default {
    namespaced: true,
    state,
    mutations,
    actions
}