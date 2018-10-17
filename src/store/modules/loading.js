// import {getCarsData,getMakeList,getDetailList} from '../../api/port'

//初始化数据仓库
const state = {
    isShowLoading:false
}

//同步改变
const mutations = {
    upLoading(state,flag){
        state.isShowLoading = flag;
    }
}


export default {
    namespaced:true,
    state,
    mutations
}