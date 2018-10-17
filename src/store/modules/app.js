import {getCarsData,getMakeList,getDetailList} from '../../api/port'

//初始化数据仓库
const state = {
    carDatas:[],
    carList:[],
    letters:[],
    detailData:[]
}

//同步改变
const mutations = {
    getCars(state,payload){
        state.carDatas = payload;
        var arr = payload;
        //车首字母集合
        var letters =arr.map((item,index)=>{
                return item.Spelling.slice(0,1)
        })
        var newArr = letters.filter((item,index)=>{
            return letters.indexOf(item) == index;
        })
        state.letters = newArr;
    },
    getCarlist(state,payload){
        state.carList = payload;
    }
}

//异步改变数据
const actions = {
    getData({commit}){
        getCarsData().then(res=>{
            console.log(res.data)
            commit('getCars',res.data)
        })
    },
    getCarContent({commit},id){
        getMakeList(id).then(res=>{
            console.log(res.data);
            commit('getCarlist',res.data)
        })
    }
}

export default {
    namespaced:true,
    state,
    mutations,
    actions
}