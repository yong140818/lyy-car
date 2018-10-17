function merge(list){
    var keys = [];
    var obj = {};
    list.forEach((item)=>{
        var key = item.exhaust_str+'/'+item.max_power_str+' '+item.inhale_type;
        if(keys.indexOf(key) != -1){
            obj[key].push(item);
        }else{
            keys.push(key);
            obj[key] = [item];
        }
    })
    return obj;
}

function sortFn(list){
    return list.sort((a,b)=>{
        if(a.exhaust != b.exhaust){
            return a.exhaust - b.exhaust;
        }else {
            if(a.max_power_str != b.max_power_str){
                return a.max_power_str - b.max_power_str
            }else {
                if(a.inhale_type != b.inhale_type){
                    return a.inhale_type - b.inhale_type
                }else{
                    return a.market_attribute.year < b.market_attribute.year; 
                }
            }
        }
    })
}

function filterFn(year,list){
    if(year === "全部"){
        return list.filter((item)=>item)
    }else{
        return list.filter((item)=>item.market_attribute.year == year)
    }
    
}


export let merges = (list)=>{
    return merge(list)
}
export let sortFns = (list)=>{
    return sortFn(list)
}
export let filterFns = (year,list)=>{
    return filterFn(year,list)
}






