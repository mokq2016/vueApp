<template>
  
  <div>
     <v-imgArea></v-imgArea>
    <!-- grid  @on-item-click=""  link=""  -->
    <grid :rows="4" v-for="(item, index) in subTabData">
      <grid-item v-for="subI in item">
        <i v-bind:class="'ionic '+subI.ionic" ></i>
        <span class="tab_text" v-html="subI.text">{{ subI.text }}  </span>
      </grid-item>
    </grid>
    <!-- 底部-->
      <v-footermenu></v-footermenu>
  </div>

</template>

<script>
  import {Grid , GridItem} from 'vux';
  import vImgArea from './imgArea.vue';
  import vFootermenu from './footerMenu.vue';
  export default{
    components: {
      Grid,
      GridItem,
      'v-footermenu': vFootermenu,
      'v-imgArea':vImgArea
    },
    data(){
      return {
        subTabData: [
          [
            {text: '自然人代开<br/>发票申请', ionic: 'fpsq'},
            {text: '自然人代开<br/>提交订单', ionic: 'tjdd'},
            {text: '自然人代开作废', ionic: 'dkzf'},
            {text: '自然人代开<br/>申请信息查询', ionic: 'xxcx'},
            {text: '自然人代开<br/>订单查询', ionic: 'ddcx'},
            {text: '发票真伪查验', ionic: 'zwcy'}
          ]
        ]
      }
    },
    
    props: {},
    
    mounted: function () {
    },
    
    methods: {
      changeItem: function(index){
        this.defaultMunu = index;
        console.log('333')
      }
    }
    
  }

</script>

<style scoped="">
  .tab_text{
    font-size: 13px;
  }
  .weui-grid{
    padding: 15px 0px 10px 0px;
    text-align: center;
    
  }
  .weui-grid span{
    line-height: 15px;
    display: block;
    height: 30px;
    padding-top: 6px;
    color: #666;
  }
  .ddcx{
    background: url(../../../static/index/fpgl/ddcx.png) 0 0 no-repeat;
  }
  .dkzf{
    background: url(../../../static/index/fpgl/dkzf.png) 0 0 no-repeat;
  }
  .fpsq{
    background: url(../../../static/index/fpgl/fpsq.png) 0 0 no-repeat;
  }
  .tjdd{
    background: url(../../../static/index/fpgl/tjdd.png) 0 0 no-repeat;
  }
  .xxcx{
    background: url(../../../static/index/fpgl/xxcx.png) 0 0 no-repeat;
  }
  .zwcy{
    background: url(../../../static/index/fpgl/zwcy.png) 0 0 no-repeat;
  }
  i.ionic{
    display: block;
    width: 30px;
    height: 30px;
    margin: 0 auto;
    background-size: 30px;
  }
</style>
