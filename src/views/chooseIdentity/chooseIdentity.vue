<template>
  <div class="container">
    <div class="header">
      <v-headerbar title='选择办税身份'></v-headerbar>
    </div>
    <div class="content">
      <ul>
        <li v-for='(item, index) in items'>
          <div class='inner-div' :class="{'isSelected':selected === index}" @click='selected = index'>
            <div class='icon-div'>
              <i class="iconfont icon-people"></i>
            </div>
            <div class='right-descript'>
              <span>深圳市雅堂投资有限公司深圳市雅堂投资有限公司</span>
              <p>法定代表人</p>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class='footer'>
      <x-button type="primary" class='w80' action-type='button' @click.native='chooseIdentity()'>确定</x-button>
    </div>
  </div>
</template>
<script>
import {
  XButton
} from 'vux'
export default {
  components: {
    XButton
  },
  data() {
    return {
        selected:-1,
      items: [{
        djxh: '10114403000026196177',
        nsrmc: '深圳市宏泰包装材料有限公司'
      }, {
        djxh: '10114403000026196177',
        nsrmc: '深圳市宏泰包装材料有限公司'
      }, {
        djxh: '10114403000026196177',
        nsrmc: '深圳市宏泰包装材料有限公司'
      }]
    }
  }
}
</script>
<style lang='less' scoped>
.container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  .content {
    flex: 1;
    overflow-y: auto;
    ul li {
      margin-top: -1rem;
    }
    .inner-div.isSelected{
        border: 1px solid #33CCFF;
    }
    .inner-div {
      padding: 0px 10px;
      width: 84%;
      margin: auto;
      border: 1px solid #DBDBDB;
      display: flex;
      flex-direction: row;
      .icon-div {
        /*  border: 1px solid #ccc;
                   border-radius: 50%;
                   height: 3rem;
                   width: 3rem; */
        flex-shrink: 0;
        text-align: center;
        margin-right: 0.6rem;
        .icon-people {
          position: relative;
          /*  top: -0.6rem; */
          border: 1px solid #ccc;
          border-radius: 50%;
          /* margin-right: 0.6rem; */
          font-size: 2.4rem;
        }
      }
      .right-descript {
        position: relative;
        span {
          display: inline-block;
          margin-top: 5px;
          line-height: 1.4rem;
        }
        p {
          position: relative;
          bottom: 3px;
          font-size: 0.9rem;
          color: #858585;
        }
      }
    }
  }
  .footer {
    height: 5rem;
    margin-top: 1rem;
    width: 100%;
    align-self: flex-end;
  }
}
</style>
