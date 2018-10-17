import {getCityImgs,getCarImgsList,getColorYearCars} from '../../api/port'

const state = {
    imgs:[],
    imgsList:[],
    colorList:[],
    keys:[],
    colorTypeName:'全部颜色',
    carModelTypeName:'全部车款'
}

const mutations = {
    upCarImgs(state,payload){
        var arr = payload;
        if(arr.length>0){
            state.imgs = arr;
        }
        state.imgsList = [];
        
    },
    upCarImgsList(state,payload){
        var arr = payload.List;
        if(state.imgsList.length == 0){
            state.imgsList = arr;
        }else{
            arr.forEach((item,index)=>{
                state.imgsList.push(item);
            })
        }
        
        console.log(state.imgsList.length);
    },
    //获取对应颜色和年份的车型数据
    upColorYearCars(state,payload){
        state.colorList = payload;
        state.keys = Object.keys(state.colorList).sort((a,b)=>{
            return b-a
        })
    },
    getCarColorTypeName(state,payload){
        state.colorTypeName = payload;
    },
    getCarModelTypeName(state,payload){
        state.carModelTypeName = payload;
    }     
}

const actions = {
    getCarImgs({commit},payload){
        getCityImgs(payload).then(res=>{
            commit('upCarImgs',res.data)
        })
    },
    getImgsList({commit},payload){
        getCarImgsList(payload).then(res=>{
            commit('upCarImgsList',res.data)
        })
    },
    getColorYearCarsList({commit},payload){
        getColorYearCars(payload).then(res=>{
            commit('upColorYearCars',res.data);
        })
    }
    
}

export default {
    namespaced: true,
    mutations,
    state,
    actions
}