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
import server from './config/hostConfig'
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
  name: 'app',
  created() {
    this.$http.post(server.wxReq).then(function(data) {
      if (data.success == 'false') {
        alert(data.errmsg);
        return;
      }
      wx.config({
        beta: true,
        debug: false,
        appId: data.appid,
        timestamp: data.timestamp,
        nonceStr: data.nonceStr,
        signature: data.signature,
        jsApiList: [
          'chooseImage',
          'getLocalImgData',
          'uploadImage',
          'checkIsSupportFaceDetect',
          'requestWxFacePictureVerify',
          'getLocation'
        ]
      })
    })
  }
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

.content-body {
  position: absolute;
  margin-top: 3.1rem;
  width: 100%
}

.pad-con {
  padding: 20px;
}

.red {
  color: red;
}

.app_head {
  position: fixed;
  width: 100%;
  height: 3.1rem;
  z-index: 99;
}
</style>
