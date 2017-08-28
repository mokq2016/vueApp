<template>
  <div class="container">
    <div class="header">
      <v-headerbar title='选择办税身份'></v-headerbar>
    </div>
    <div class="content">
      <div style='margin-top:0.6rem' v-if="item.id || item.nsrmc == '个人身份'" v-for='(item, index) in items'>
        <div class='inner-div' :class="{'isSelected':selected === index}" @click='selected = index'>
          <div class='icon-div'>
            <i class="iconfont icon-gongsi1"></i>
          </div>
          <div class='right-descript'>
            <span :class="{'personal':item.nsrsbh == ''}">{{item.nsrmc}}</span>
            <p>{{getRoleName(item.type)}}</p>
          </div>
        </div>
      </div>
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
import {
  mapGetters,
  mapMutations
} from 'vuex'
import sbcommon from '../../common/sbcommon'
export default {
  components: {
    XButton
  },
  data() {
    return {
      isFromLogin: false,
      selected: -1,
      items: []
    }
  },
  methods: {
    ...mapGetters(['GET_NSRLIST']),
    ...mapMutations(['UPDATE_USERINFO', 'UPDATE_HDXX','CLEAR_HDXX']),
    getRoleName(roleType) {
      let bsType = '';
      switch (roleType) {
        case '1':
          bsType = '办税人员';
          break;
        case '2':
          bsType = '法定代表人';
          break;
        case '3':
          bsType = '财务负责人';
          break;
        case '4':
          bsType = '税务代理人';
          break;
        case '6':
          bsType = '购票员';
          break;
        default:
          bsType = ''
          break;
      }
      return bsType;
    },
    chooseIdentity() {
      /*console.log(this.items[this.selected])*/
      /*return;*/
      let self = this;
      if (self.selected === -1) {
        this.$alert("请选择办税身份！");
        return;
      }
      if (self.items[this.selected].nsrsbh == '') { //个人身份登录
        self.UPDATE_USERINFO({
          currentRole: {
            roleType: self.items[self.selected].type,
            nsrmc: self.items[self.selected].nsrmc,
            nsrsbh: self.items[self.selected].nsrsbh
          },
          nsrInfo: null
        });
        this.CLEAR_HDXX();
        if (self.isFromLogin) {
          self.$router.push('/index/ywbl');
        } else {
          self.$router.go(-1);
        }
        return;
      }
      /*if (!self.isFromLogin) { //非login路由而来为切换办税身份*/
      this.$http.post('/api/mobile/general/chooseCompany', {
          djxh: self.items[this.selected].djxh,
          nsrsbh: self.items[this.selected].nsrsbh
        }).then(function(result) {
          if (result.success) { //切换身份成功
            self.UPDATE_USERINFO({
              currentRole: {
                roleType: self.items[self.selected].type,
                nsrmc: self.items[self.selected].nsrmc,
                nsrsbh: self.items[self.selected].nsrsbh
              }
            });
            self.getLatestUserInfo(); //获取最新企业信息
            self.getHdxx();
            self.getWqHdxx();
            if (self.isFromLogin) {
              self.$router.push('/index/ywbl');
            } else {
              self.$router.go(-1);
            }
          } else {
            self.$alert(result.message);
          }
        })
        /*}else{

        }*/
    },
    getLatestUserInfo() { //获取信息用户信息
      let self = this;
      this.$http.get('/api/mobile/userinfo/latest').then(function(result) {
        if (result.success) {
          self.UPDATE_USERINFO({
            nsrInfo: result.data.nsrInfo,
            accountInfo: result.data.accountInfo
          });
        } else {
          self.$toast(result.message);
        }

      })
    },
    getLatestNsrList() {
      let self = this;
      this.$http.get('/api/yhgl/get/bindlist').then(function(result) {
        if (result.success) {
          self.items = self.items.concat(result.data.bindlist || [], [{
            nsrmc: '个人身份',
            type: '',
            nsrsbh: ''
          }]);
          self.UPDATE_USERINFO({
            nsrList: result.data.bindlist || []
          });
        } else {
          self.items = self.items.concat([{
            nsrmc: '个人身份',
            type: '',
            nsrsbh: ''
          }])
          self.$alert(result.message);
        }
      })
    },
    getHdxx() {
      var self = this;
      sbcommon.getHdxx().then(function(data) {
        self.UPDATE_HDXX({
          hdxxData: data
        })
      })
    },
    getWqHdxx() {
      var self = this;
      sbcommon.getWqHdxx().then(function(data) {
        self.UPDATE_HDXX({
          wqHdxxData: data
        })
      })
    }
  },
  created() {
    this.isFromLogin = this.$route.params.isFromLogin; //aboutMe页面传过来的参数
    this.items = [];
    this.getLatestNsrList();

  },
  mounted() {
    /* let self = this;
     this.items = [];
     this.GET_NSRLIST().forEach(function(item) {
       let roleList = item.roleList;
       if (roleList.length > 0) {
         for (let i = 0; i < roleList.length; i++) {
           self.items.push(Object.assign({}, item, {
             roleName: roleList[i].roleName
           }))
         }
       }
     })*/
  }

}
</script>
<style lang='less' scoped>
.container {
  height: 100vh;
  display: flex;
  display: -webkit-flex;
  flex-direction: column;
  -webkit-flex-direction: column;
  .content {
    flex: 1;
    -webkit-box-flex: 1;
    webkit-flex: 1;
    overflow-y: auto;
    .inner-div.isSelected {
      border: 1px solid #33CCFF;
    }
    .inner-div {
      padding: 0px 10px;
      width: 84%;
      margin: 0 auto;
      border: 1px solid #DBDBDB;
      display: flex;
      display: -webkit-flex;
      flex-direction: row;
      -webkit-flex-direction: row;
      .icon-div {
        /*  border: 1px solid #ccc;
                   border-radius: 50%;
                   height: 3rem;
                   width: 3rem; */
        flex-shrink: 0;
        -webkit-flex-shrink: 0;
        text-align: center;
        margin-right: 0.6rem;
        .icon-gongsi1 {
          position: relative;
          color: #ccc;
          /*  top: -0.6rem; */
          border: 1px solid #ccc;
          border-radius: 50%;
          /* margin-right: 0.6rem; */
          font-size: 2.4rem;
        }
      }
      .right-descript {
        position: relative;
        span.personal {
          margin-top: 1.2rem;
        }
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
    -webkit-align-self: flex-end;
  }
}
</style>
