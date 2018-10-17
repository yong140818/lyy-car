export function lazyLoad(el){
    console.log(111);
    //判断元素是否在数组中
    function inView(ele){
        let rect = ele.getBoundingClientRect();
        // console.log(ele.offsetTop);
        if(rect.left > 0 && rect.left < window.innerWidth && rect.top > 0 && rect.top < window.innerHeight){
            return true
        }else {
            return false;
        }
    }
    //判断图片是否加载
    function isDeal(ele){
        return ele.src == ele.dataset.src;
    }
    function deal(){
        let nodes = [...document.querySelectorAll('img[data-src]')];
        nodes.forEach((item)=>{
            if(inView(item) && !isDeal(item)){
                item.src = item.dataset.src;
            }
        })
    }
    deal();
    if(el){
        document.querySelector(el).addEventListener("scroll",deal)
    }else{
        window.onscroll = deal;
    }
}


    

