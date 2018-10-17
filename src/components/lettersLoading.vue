<template>
    <div class='lettersLoader'>
        <span>{{letters}}</span>
    </div>
</template>

<script>
export default {
    props:['letters']
}
</script>

<style>
.lettersLoader{
    width:100%;
    height:100%;
    position: fixed;
    left:0;
    top:0;
}
.lettersLoader>span{
    position: absolute;
    left:0;
    right:0;
    top:0;
    bottom:0;
    margin:auto;
    background: rgba(0,0,0,.6);
    color:#fff;
    border-radius: .1rem;
    height:1rem;
    width:1rem;
    line-height: 1rem;
    text-align: center;
}
</style>
