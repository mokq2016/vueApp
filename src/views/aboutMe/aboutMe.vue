<template>
  <div class="" id='about'>
    <div style='background:#66AFFF' v-if="!token">
      <div style="padding:2rem" @click='$router.replace("/login")'>
        <i slot='icon' class="iconfont icon-geren"></i></br>
        <span>点击登录</span>
      </div>
    </div>
    <div v-if="$store.state.user.accountInfo || !token">
      <group v-if="$store.state.user.accountInfo">
        <cell :title='accountInfo.fullName' :inline-desc='accountInfo.mobile' is-link>
          <i slot='icon' class="iconfont icon-geren"></i>
        </cell>
      </group>
      <group>
        <cell-box is-link :link="{name:'chooseIdentity',params:{isFromLogin:false}}" v-if="$store.state.user.accountInfo">
          <div slot='default'>
            <i class='iconfont icon-qiehuan' style='color:#E65212'></i> 切换身份
            <span class='companyName' v-if='currentRole'>{{currentRole.nsrmc}}</span>
          </div>
        </cell-box>
        <cell-box is-link link='/bindCompany'>
          <div slot='default'>
            <i class='iconfont icon-guanliyuan' style='color:#FF9900'></i> &nbsp;管理员列表
            <!-- <span class='companyName'>{{GET_CURRENTROLE.nsrmc}}</span> -->
          </div>
        </cell-box>
        <cell-box v-if='isShowManageTaxer()' is-link link='/taxList'>
          <div slot='default'>
            <i slot='icon' class='iconfont icon-management' style='color:#33CCFF'></i> &nbsp;办税员管理
          </div>
        </cell-box>
        <cell-box is-link link='/authorize'>
          <div slot='default'>
            <i slot='icon' class='iconfont icon-bangding' style='color:#FFFF33'></i> &nbsp;纳税人绑定信息
          </div>
        </cell-box>
      </group>
      <group>
        <cell-box is-link link='/modifyPassword'>
          <div slot='default'>
            <i slot='icon' class='iconfont icon-xiugai' style='color:#ccc'></i> &nbsp;修改密码
          </div>
        </cell-box>
      </group>
    </div>
    <div v-if='!$store.state.user.accountInfo && $store.state.user.nsrInfo'>
      <group>
        <cell :title='nsrInfo.nsrsbh' :inline-desc='nsrInfo.nsrmc' is-link>
          <i slot='icon' class="iconfont icon-geren"></i>
        </cell>
      </group>
    </div>
    
    <div @click='loginOut()' class='loginout-div' v-if="token">
      退出
    </div>
    <!-- 底部-->
    <v-footermenu></v-footermenu>
  </div>
</template>
<script>
import {
  Group,
  CellBox,
  Cell
} from 'vux'
import {
  mapState,
  mapActions
} from 'vuex'
import vFootermenu from '../index/footerMenu.vue';
export default {
  components: {
    Group,
    CellBox,
    'v-footermenu': vFootermenu,
    Cell
  },
  methods: {
    ...mapActions(['USER_SIGNOUT']),
    getCurrentRoleName() {
      if (this.currentRole) {
        return this.currentRole.roleName.split('-')[0];
      } else {
        return '';
      }
    },
    isShowManageTaxer() {
      let roleType = this.currentRole.roleType;
      if (roleType == '2' || roleType == '3') { //财务负责人和法人才显示办税人员管理
        return true;
      } else {
        return false;
      }
    },
    loginOut() {
      let self = this;
      this.$confirm({
        content: '您确定要退出登录？',
        onConfirm() {
          self.USER_SIGNOUT(); //退出登录
          self.$router.push('/index');
        }
      })
    }
  },
  computed: {
    ...mapState({
      currentRole: state => (state.user.currentRole || {roleName:'',roleType:''}),
      accountInfo: state => (state.user.accountInfo || {fullName:'',mobile:''}),
      nsrInfo: state => state.user.nsrInfo,
      token: state => state.user.token
    })
  },
  mounted() {
    // console.log(this.currentRole)
  }
}
</script>
<style lang='less'>
#about {
  .iconfont.icon-geren {
    font-size: 2.6rem;
    border-radius: 50%;
    margin-right: 0.5rem;
    border: 1px solid #ccc;
    color: #fff;
    background: #ccc;
  }
  .vux-cell-bd {
    text-align: left;
  }
  .iconfont {
    font-size: 1.2rem;
  }
  .companyName {
    font-size: 0.8rem;
    margin-left: 0.5rem;
    color: #7A7A7A
  }
  .loginout-div {
    border-top: 1px solid #EEEEEE;
    border-bottom: 1px solid #EEEEEE;
    margin-top: 1rem;
    background: #fff;
    padding: 0.5rem;
    box-sizing: border-box;
    text-align: center;
  }
}
</style>
