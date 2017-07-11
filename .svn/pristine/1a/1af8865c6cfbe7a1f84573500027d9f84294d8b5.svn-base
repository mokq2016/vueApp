<template>
  <header class="header">
    <div class="left-div">
      <slot name='left'>
        <i class="iconfont icon-return" @click='$router.go(-1)'></i>
      </slot>
    </div>
    <div class="center-div">
      <h4 class="title">{{title}}</h4>
    </div>
    <div class="right-div">
      <slot name='right'>
    </slot>
    </div>
  </header>
</template>
<script>
export default {
  props:{
    title: {
        type: String,
        default: ''
      }
  }
}
</script>
<style lang='less' scoped>
  .header {
    font-size:1.2rem;
    color:white;
    height:3.1rem;
    /* background-color:#6998FF; */
    background: -webkit-linear-gradient(to right , rgba(69,131,255,1),rgba(69,208,255,1));
    background: linear-gradient(to right , rgba(69,131,255,1),rgba(69,208,255,1));
    padding: 0 10px;
    display:flex;
     display: -webkit-flex;
    align-items:center;
    /* flex:1; */
    justify-content:center;
  
    .iconfont {
      font-size:1.6rem;
    }
    .center-div {
      width:60%;
      text-align:center;
      .title {
        white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            width:100%;
    }
      
    }
    .left-div,.right-div {
      width:20%;
    }
    .right-div {
      text-align:right;
    }
  }
</style>