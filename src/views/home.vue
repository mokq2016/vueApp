<template>
  <div class='container'>
    <div style="width:100%">
      <swiper :list="imgList"></swiper>
    </div>
    <!--  <view-box ref="viewBox"> -->
    <div class="menu-container">
      <div class="menu-div" v-for='item in menuList'>
        <div class="menu-content">
          <i class="iconfont" :class='item.iconName'></i>
          <span class="describe">{{item.name}}</span>
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
const baseList = [{
  url: 'javascript:',
  img: '',
  title: '送你一朵fua'
}, {
  url: 'javascript:',
  img: '',
  title: '送你一辆车'
}, {
  url: 'javascript:',
  img: '',
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
      imgList: baseList,
      menuList: [{
        name: '自然人代开发票',
        iconName: 'icon-businesscard'
      }, {
        name: '自然人代开发票',
        iconName: 'icon-businesscard'
      }, {
        name: '自然人代开发票',
        iconName: 'icon-businesscard'
      }, {
        name: '自然人代开发票',
        iconName: 'icon-businesscard'
      }]
    }
  }

}
</script>
<style lang="less" scoped>
.container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  .menu-container {
    width: 100%;
    overflow: auto;
    flex: 1;
    margin: 1rem auto;
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
      border: 1px solid green;
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
}
</style>
