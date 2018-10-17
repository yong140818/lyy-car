import {getDetailQuotationList} from '../../api/port'
// import {merges,sortFns,filterFns} from '../../utils/index'
const state = {
   quetationDatas:[],
   quetationList:[]
}

const mutations = {
    upQuetations(state,payload){
        state.quetationDatas = payload;
        var arr = payload.list;
        var newArr = payload.nearbys;
        if(arr.length == 0){
            newArr.forEach((item,index)=>{
                index < 3 ? item.flag = true : item.flag = false;
            })
            state.quetationList = newArr;
        }else{
            arr.forEach((item,index)=>{
                index < 3 ? item.flag = true : item.flag = false;
            })
            state.quetationList = arr;
        }
    }
}

const actions = {
    getQuetations({commit},payload){
        getDetailQuotationList(payload).then(res=>{
            commit('upQuetations',res.data)
        }) 
    }
}


export default {
    namespaced: true,
    state,
    mutations,
    actions
}