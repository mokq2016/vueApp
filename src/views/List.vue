<template>
  <div style="height:100%">
   <!--  <div style="height:100%"> -->
    <x-header :left-options="{showBack:false}">
    <span>啦啦</span>
    <span name='right'>
        <i class="iconfont icon-setup"></i>
    </span>
    </x-header>
    <view-box>

        <group :title="'use is-link to show arrow'">
      <cell is-link>
        <span slot="title" style="color:green;"><span style="vertical-align:middle;">{{ 'Important News' }}</span></span>
      </cell>
      <cell :title="'Notifications'" is-link></cell>
      <cell :title="'Privacy'" is-link></cell>
    </group>
    </view-box>
    <v-footbar></v-footbar>
    <!-- </div> -->
  </div>
</template>
<script>
  import { ViewBox, XHeader ,Group, Cell ,Badge}from 'vux'
  
  export default {
    components:{
      ViewBox,
      XHeader,
      Cell,
      Group,
      Badge

    },
    data (){
        return {
           items:[
           {name:'123'},
           {name:'123'},
           {name:'123'},
           {name:'123'},
           {name:'123'+Math.random(2)},
           {name:'123'},
           {name:'123'},
           {name:'123'},
           {name:'123'},
           {name:'123'},
           {name:'123'},
           {name:'123'},
           {name:'123'},
           {name:'123'}
           ] 
        }
    }
  }
</script>
<style lang="less">
   li{
    height: 40px
   } 
</style>
