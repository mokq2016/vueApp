<template>
  <div class='container'>
    <div style="width:100%">
      <swiper :list="imgList" :auto='true' :loop='true' :interval='3000'></swiper>
    </div>
    <!--  <view-box ref="viewBox"> -->
    <transition name='fade'>
      <div class='login-info' v-if='GET_NSRINFO()'>
        <span>{{GET_CURRENTROLE().nsrmc}}({{GET_CURRENTROLE().nsrsbh}})</span>
      </div>
    </transition>
    <div class="menu-container">
      <div class="menu-div" v-if='getMenuShow(item.id)' v-for='item in menuList'>
        <div class="menu-content" :style='item.color' @click='navto(item)'>
          <!-- <router-link :to="item.to"> -->
          <i class="iconfont" :class='item.iconName'></i>
          <span class="describe">{{item.name}}</span>
          <!--  </router-link> -->
        </div>
      </div>
    </div>
    <div class='foot-div'>
      <v-footbar></v-footbar>
    </div>
  </div>
</template>
<script>
import {
  ViewBox,
  Swiper,
  SwiperItem
} from 'vux'
import {
  mapGetters
} from 'vuex'
import server from '../config/hostConfig'
const baseList = [{
  url: 'javascript:',
  img: 'https://static.vux.li/demo/1.jpg',
  title: '送你一朵fua'
}, {
  url: 'javascript:',
  img: 'https://static.vux.li/demo/2.jpg',
  title: '送你一辆车'
}, {
  url: 'javascript:',
  img: 'https://static.vux.li/demo/3.jpg',
  title: '送你一次旅行'
}]
export default {
  components: {
    ViewBox,
    Swiper,
    SwiperItem
  },
  data() {
    return {
      showNsrInfo: false,
      imgList: baseList,
      personLogin: true,
      menuList: [{
        id: 1,
        name: '自然人代开发票',
        href:'/irs-shenz.git/www/index.html#/irs/dkfp',
        iconName: 'icon-fapiao1',
        color: {
          color: '#FF9900'
        }
      }, {
        id: 2,
        name: '小规模申报',
        link:'/xgmsbMenu',
        iconName: 'icon-shenbao',
        color: {
          color: '#00CC33'
        }
      }, {
        id: 3,
        name: '预约办税',
        href:'/irs-shenz.git/www/index.html#/irs/yybsHome',
        iconName: 'icon-fapiao1',
        color: {
          color: '#009FE7'
        }
      }]
    }
  },
  methods: {
    ...mapGetters(['GET_NSRINFO', 'GET_CURRENTROLE']),
    navto(menu) {
      if (menu.href) { //为ionic项目功能，采用localtion跳转
          window.location.href = server.current+menu.href;
      }else{//vue项目功能，路由跳转
        this.$router.push(menu.link);
      }
    },
    //根据登录状态处理菜单显示
    getMenuShow: function(id) {
      let personArr = [1];
      if(personArr.indexOf(id) != -1){
        return this.personLogin;
      }else{
        return !this.personLogin;
      }
    }
  },

  created() {
    /*  window.location.href = 'http://baidu.com'*/
    console.log(this.GET_NSRINFO())
    this.personLogin = this.GET_NSRINFO() ? false : true;
  }
}
</script>
<style lang="less" scoped>
.container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  .login-info {
    background: #FFFFC7;
    padding: 0.5rem 1rem;
    span {
      line-height: 1rem;
      display: inline-block;
    }
  }
  .menu-container {
    width: 100%;
    overflow: auto;
    flex: 1;
    margin: 0.5rem auto;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    align-content: flex-start;
    .menu-div {
      margin-top: 0.5rem;
      margin-left: 0.3rem;
      /*   justify-content:space-around; */
      width: 30vw;
      height: 30vw;
      border: 1px solid #ccc;
      border-radius: 1rem;
      .menu-content {
        text-align: center;
        .iconfont {
          font-size: 3rem;
        }
        .describe {
          width: 80%;
          line-height: 1rem;
          margin: -1.2rem auto auto auto;
          font-size: 0.8rem;
          display: block;
        }
      }
    }
  }
  .foot-div {
    width: 100%;
    height: 54px;
    align-self: flex-end;
  }
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 2s
  }
  .fade-enter,
  .fade-leave-to/* .fade-leave-active in <2.1.8 */
  {
    opacity: 0
  }
}
</style>
