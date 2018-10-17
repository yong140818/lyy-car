const host = !/localhost/.test(window.location.host) ? 'http://baojia-test.chelun.com' : 'https://baojia.chelun.com';

//动态判断域名
function sendRequest(url, method = 'get', data = {}) {
    let params = {
        method
    };
    //判断如果是一个post请求，戴上请求体信息
    if (method == 'post') {
        params.body = JSON.stringify(data);
    }
    //判断请求体url是否携带query
    if (url.indexOf('?') == -1) {
        url += `?_=${+new Date()}`
    } else {
        url += `&_=${+new Date()}`
    }
    return fetch(host + url, params).then(res => res.json()).then(body => body);
}

/*
* 获取车辆数据
* @return promise
*/

export let getCarsData = () => {
    return sendRequest(`/v2-car-getMasterBrandList.html`);
}

/*
* 获取车系数据
* @params id 车辆品牌id
* @return promise
*/
export let getMakeList = (id) => {
    return sendRequest(`/v2-car-getMakeListByMasterBrandId.html?MasterID=${id}`);
}

/*
* 获取详情车系数据    
* @params id 车辆品牌id
* @return promise
*/
export let getDetailList = (id) => {
    return sendRequest(`/v2-car-getInfoAndListById.html?SerialID=${id}&cityId=201`);
}

/*
* 获取车系数据    
* @params id 车辆品牌id
* @return promise
*/
export let getDetailQuotationList = (obj) => {
    return sendRequest(`/v2-dealer-alllist.html?carId=${obj.car_id}&cityId=${obj.city_id}&_1539316633737`);
}


/*
* 获取车系数据    
* @params id 城市地址
* @return promise
*/
export let getDetailCityList = (id) => {
    if(id){
        return sendRequest(`/v1-city-alllist.html?provinceid=${id}&_1539431945037`);
    }else{
        return sendRequest(`/v1-city-alllist.html?_153939956368`);
    }
}


/*
* 获取车系数据    
* @params id 获取图片
* @return promise
*/
export let getCityImgs = (payload) => {
    if(typeof payload == 'string'){
        return sendRequest(`/v2-car-getImageList.html?SerialID=${payload}&_1539516762071`);
    }else if(payload.car_id){
        return sendRequest(`/v2-car-getImageList.html?SerialID=${payload.SerialID}&CarID=${payload.car_id}&_1539516762071`);
    }else if(payload.SerialID){
        return sendRequest(`/v2-car-getImageList.html?SerialID=${payload.SerialID}&ColorID=${payload.ColorID}&_1539516762071`);
    }
}

/*
* 获取车系数据    
* @params id 获取图片list
* @return promise
*/
export let getCarImgsList = (payload) => {
    return sendRequest(`/v2-car-getCategoryImageList.html?SerialID=${payload.img_id}&ImageID=${payload.ImageID}&Page=${payload.page}&PageSize=30&_1539586601919`);
}

/*
* 获取车系数据    
* @params id 获取与颜色对应的车型
* @return promise
*/
export let getColorYearCars = (payload) => {
    return sendRequest(`/v2-car-getModelImageYearColor.html?SerialID=${payload}&_1539656719036`);
}



