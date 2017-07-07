<template>
  <div id="app">
    <!--  <view-box ref="viewBox"> -->
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
    <!--  <loading v-model="isLoading"></loading>
        <toast v-model="true" type="text" :time="800" is-show-mask text="Hello World">23232</toast>
       </view-box> -->
  </div>
</template>
<script>
export default {
  /* components: {
     ViewBox,
     Loading,
     Tabbar,
     TabbarItem
   },
     computed: {
         ...mapState({
             isLoading: state => state.vux.isLoading
         })
     } */
  name: 'app'
}
</script>
<style lang="less">
@import '~vux/src/styles/reset.less';
body {
  background-color: #fbf9fe;
}

html,
body {
  height: 100%;
  width: 100%;
  overflow-x: hidden;
}

.tabbar .weui-tabbar__icon > sup {
  top: 0.1rem;
}
</style>
