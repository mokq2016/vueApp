<template>
  <div>
    <v-imgArea></v-imgArea>
    <!-- grid  @on-item-click=""  link=""  -->
    <grid :rows="4" v-for="(item, index) in subTabData">
      <grid-item v-for="subI in item">
      <span class='badge tip' v-if="subI.id === 5 && wqHdxxData && wqHdxxData.HdxxResponseVo">{{wqHdxxData.HdxxResponseVo.SBZL.length}}</span>
        <div @click='go(subI)'>
          <i v-bind:class="'ionic '+subI.ionic"></i>
          <span class="tab_text" v-html="subI.text">{{ subI.text }}  </span>
        </div>
      </grid-item>
    </grid>
    <!-- 底部-->
    <v-footermenu></v-footermenu>
  </div>
</template>
<script>
import {
  Grid,
  GridItem,
  Badge
} from 'vux';
import {
  mapState
} from 'vuex'
import vImgArea from './imgArea.vue';
import vFootermenu from './footerMenu.vue';
export default {
  components: {
    Grid,
    GridItem,
    Badge,
    'v-footermenu': vFootermenu,
    'v-imgArea': vImgArea
  },
  data() {
    return {
      subTabData: [
        [{
          id: 1,
          text: '网上办理文书<br/>进度查询',
          ionic: 'jdcx',
          link: ''
        }, {
          id: 2,
          text: '税务事项<br/>通知书查询',
          ionic: 'tzscx',
          link: ''
        }, {
          id: 3,
          text: '本期应申报查询',
          ionic: 'ysbcx',
          link: ''
        }, {
          id: 4,
          text: '已申报<br/>结果查询',
          ionic: 'jgcx',
          link: '/sbcx'
        }, {
          id: 5,
          text: '逾期未<br/>申报查询',
          ionic: 'wsbcx',
          link: '/wqsbcx'
        }, {
          id: 6,
          text: '发票验旧<br/>信息查询',
          ionic: 'yjcx',
          link: ''
        }, {
          id: 7,
          text: '信用等级查询',
          ionic: 'djcx',
          link: ''
        }, {
          id: 8,
          text: '缴税信息查询',
          ionic: 'xxcx',
          link: '/yjkSearch'
        }]
      ]
    }
  },

  mounted: function() {
    //console.log(this.wqHdxxData)
  },

  methods: {
    changeItem: function(index) {
      this.defaultMunu = index;
    },
    go(menu) {
      if (!(this.token)) {
        this.$toast("请登录后再操作！");
        this.$router.replace('/login');
        return;
      }
      if(this.accountInfo && !this.nsrInfo){
        this.$alert('该业务只支持企业身份用户办理,如需办理请切换至企业身份！');
        return;
      }
      let openArr = [4, 5, 8];
      if (openArr.indexOf(menu.id) === -1) {
        this.$alert('暂未开放，敬请期待！');
        return;
      } else {
        this.$router.push(menu.link);
      }
    }
  },
  computed: {
    ...mapState({
      wqHdxxData: state => {
        if (state.hdxx.wqHdxxData) {
          return JSON.parse(state.hdxx.wqHdxxData);
        } else {
          return {};
        }
      },
      token: state => state.user.token,
      nsrInfo: state => state.user.nsrInfo,
      accountInfo: state => state.user.accountInfo
    })
  }

}
</script>
<style scoped>
.tab_text {
  font-size: 13px;
}

.weui-grid {
  padding: 15px 0px 10px 0px;
  text-align: center;
}

.weui-grid span {
  line-height: 15px;
  display: block;
  height: 30px;
  padding-top: 6px;
  color: #666;
}

.jdcx {
  background: url(../../../static/index/sscx/jdcx.png) 0 0 no-repeat;
}

.tzscx {
  background: url(../../../static/index/sscx/tzscx.png) 0 0 no-repeat;
}

.ysbcx {
  background: url(../../../static/index/sscx/ysbcx.png) 0 0 no-repeat;
}

.jgcx {
  background: url(../../../static/index/sscx/jgcx.png) 0 0 no-repeat;
}

.wsbcx {
  background: url(../../../static/index/sscx/wsbcx.png) 0 0 no-repeat;
}

.yjcx {
  background: url(../../../static/index/sscx/yjcx.png) 0 0 no-repeat;
}

.djcx {
  background: url(../../../static/index/sscx/djcx.png) 0 0 no-repeat;
}

.xxcx {
  background: url(../../../static/index/sscx/xxcx.png) 0 0 no-repeat;
}

i.ionic {
  display: block;
  width: 30px;
  height: 30px;
  margin: 0 auto;
  background-size: 30px;
}

.tip {
  top: 0.5rem;
  left: 2.8rem;
}
</style>
