<template>
  <transition name='slide'>
    <div class="container" id='login'>
      <div id="particles-js" style='height:100vh'>
        <canvas class='particles-js-canvas-el' style='width:100%;height:100%'>
        </canvas>
      </div>
      <!-- <div class="bg-div"></div> -->
      <div class="content">
        <div class='logo-div'>
          <i class='iconfont icon-shuiwuguanli2'></i>
          <span class='title'>深圳国税</span>
        </div>
        <div class='login-div'>
          <div style="height:44px;">
            <!--           <sticky scroll-box="vux_view_box_body" :offset="46" :check-sticky-support="false">
             -->
            <tab :line-width="1">
              <tab-item @on-item-click='showTaxNumLogin = true' :selected="showTaxNumLogin">税号登录</tab-item>
              <tab-item @on-item-click='showTaxNumLogin = false' :selected="!showTaxNumLogin">手机号登录</tab-item>
            </tab>
            <!--  </sticky> -->
          </div>
          <group v-show='showTaxNumLogin'>
            <x-input label-width='4rem' placeholder="请输入税号" v-validate="'required'" name='税号' v-model.trim="userName">
              <i slot="label" class="iconfont icon-people"></i>
            </x-input>
            <span v-show="errors2.has('税号') && submitted" class="errors-tip is-danger">{{ errors2.first('税号') }}</span>
            <x-input label-width='4rem' :type='inpType' v-validate="'required'" data-vv-name='密码' placeholder="请输入密码" v-model.trim="passWord">
              <i slot="label" class="iconfont icon-lock"></i>
              <i slot="right" class="iconfont icon-browse" @click='changeInp()'></i>
            </x-input>
            <span v-show="errors2.has('密码') && submitted" class="errors-tip is-danger">{{ errors2.first('密码') }}</span>
          </group>
          <group v-show='!showTaxNumLogin'>
            <x-input label-width='4rem' placeholder="请输入手机号" v-validate="'required'" name='手机号' v-model.trim="mobile">
              <i slot="label" class="iconfont icon-people"></i>
            </x-input>
            <span v-show="errors2.has('手机号') && submitted" class="errors-tip is-danger">{{ errors2.first('手机号') }}</span>
            <x-input label-width='4rem' :type='inpType' v-validate="'required'" data-vv-name='密码' placeholder="请输入密码" v-model.trim="mobilePw">
              <i slot="label" class="iconfont icon-lock"></i>
              <i slot="right" class="iconfont icon-browse" @click='changeInp()'></i>
            </x-input>
            <span v-show="errors2.has('密码') && submitted" class="errors-tip is-danger">{{ errors2.first('密码') }}</span>
          </group>
        </div>
        <x-button type="primary" class='w80 reg-btn' action-type='button' @click.native='chooseLogin()'>登录</x-button>
        <table class='foot-table'>
          <tr>
            <td><span @click='register()'>注册</span></td>
            <td style='text-align:right'>
              <span @click="$router.push('forgetPwd')">忘记密码</span>
            </td>
          </tr>
        </table>
      </div>
    </div>
  </transition>
</template>
<script>
import {
  XInput,
  Group,
  XButton,
  Tab,
  TabItem
} from 'vux'
import {
  mapActions
} from 'vuex'
import particles from '../../config/particles'
import server from '../../config/hostConfig'
import sbcommon from '../../common/sbcommon'
export default {
  components: {
    XInput,
    Group,
    XButton,
    Tab,
    TabItem
  },
  data() {
    return {
      showTaxNumLogin: true,
      inpType: 'password',
      userName: '',
      passWord: '',
      email: '',
      submitted: false,
      mobile: '',
      mobilePw: '',
      redirect: ''
    }
  },
  methods: {
    ...mapActions(['USER_SIGNIN', 'UPDATE_HDXX', 'USER_SIGNOUT']),
    register() {
      window.location.href = server.current + server.proAddr + '#/irs/register/%7B%22Flag%22:%22Y%22%7D';
    },
    changeInp() {
      if (this.inpType == 'password') {
        this.inpType = 'text';
      } else {
        this.inpType = 'password'
      }
    },
    chooseLogin() {
      if (this.showTaxNumLogin) {
        this.login();
      } else {
        this.mobileLogin();
      }
    },
    login() {
      let that = this;
      this.$validator.validateAll({
        '税号': that.userName,
        '密码': that.passWord
      }).then(function(isValidate) {
        if (isValidate) {
          let param = {
            nsrsbh: that.userName,
            nsrpwd: sha1.hex(that.passWord),
            verifyCode: '',
            redirectURL: "",
            time: new Date().format('yyyy-MM-dd hh:mm:ss')
          }
          that.$http.post('/api/weixin/yybslogin', param, {
            MSG: '登录中...'
          }).then((result) => {
            if (result.success) {
              that.$toast('登录成功！');
              that.USER_SIGNIN({
                token: result.data.wxToken,
                nsrInfo: result.data.nsrxxVO
              });
              /*that.$router.push('xgmsbMenu');*/
              if (that.redirect) {
                that.$router.push(that.redirect); //快速跳转
              } else {
                sbcommon.getHdxx().then(function(result) {
                  if (result != 'null') {
                    that.UPDATE_HDXX({
                      hdxxData: result
                    })
                  }
                })
                sbcommon.getWqHdxx().then(function(result) {
                  if (result != 'null') {
                    that.UPDATE_HDXX({
                      wqHdxxData: result
                    })
                  }
                })
                that.$router.push('/index/ywbl');
              }
            } else {
              that.$alert(result.message);
            }
          })
        } else {
          that.submitted = true;
        }
      })
    },
    mobileLogin() {
      let self = this;
      let param = {
        mobile: this.mobile,
        password: this.mobilePw
      }
      self.$http.post('/api/mobile/general/login', param).then((result) => {
        if (result.success) {
          let accountInfo = result.data.accountInfo;
          self.USER_SIGNIN({
            token: result.data.token,
            accountInfo: accountInfo,
            nsrInfo: result.data.nsrInfo
          });
          localStorage.setItem('loginNsrsbh', result.data.nsrjbxx.nsrsbh); //自然人代开发票需要的
          self.chooseIdentity();
          /*if (accountInfo.smrzTxCjZt == 'N') {
            self.$confirm({
              content: '系统未录入您的实名采集照片，是否重新录入？',
              onConfirm() {
                self.smrz(accountInfo.fullName, accountInfo.identityCardNo);
              }
            })
          } else {
            self.chooseIdentity();
          }*/
        } else {
          self.$alert(result.message);
        }
        /* return result*/
      })
    },
    chooseIdentity() {
      this.$router.push({
        name: 'chooseIdentity',
        params: {
          isFromLogin: true
        }
      }); //isFromLogin  1代表从login路由
    },
    smrz(name, sfzjhm) {
      let self = this;
      let request_verify_pre_info = {
        name: name,
        id_card_number: sfzjhm
      }
      wx.invoke("checkIsSupportFaceDetect", {}, function(res) { //检测设备是否支持活体采集
        if (res.err_code == 0) {
          wx.invoke('requestWxFacePictureVerify', {
            "request_verify_pre_info": JSON.stringify(request_verify_pre_info)
          }, function(res) { //实名认证
            if (res.err_code == 0) {
              let param = {
                name: name,
                sfzjhm: sfzjhm,
                qd: 'weixin',
                identifyId: res.verify_result
              }
              self.$http.post('/api/smrz/smrzSavePhoto', param, {
                'Content-Type': 'application/x-www-form-urlencoded;'
              }).then(function(result) {
                if (result.success) {
                  self.$toast({
                    type: 'success',
                    text: '恭喜您资料补录成功！'
                  })
                  self.chooseIdentity();
                } else {
                  self.$alert(result.message);
                }
              })
            }
          })
        } else {
          self.$alert(res.err_msg + ' errCode: ' + res.err_code);
        }
      })
    },
    chooseLoginMethod(fullPath) {
      let pathArr = fullPath.split('?from=');
      let smrzLoginArr = ['/dkfp', '/bindCompany', '/authorize', '/modifyPassword']; //选择实名认证方式登录
      if (pathArr.length > 1 && smrzLoginArr.indexOf(pathArr[1].replace('%2F', '/').replace('%2f', '/')) !== -1) {
        this.showTaxNumLogin = false;
      }
    }
  },
  mounted() {
    var urlArr = this.$route.fullPath.split('?redirect=');
    if (urlArr.length > 1) {
      this.redirect = urlArr[1].replace('%2F', '/').replace('%2f', '/');
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.path == '/login') { //登录页面强制清空登录信息
        vm.USER_SIGNOUT();
      }
      vm.chooseLoginMethod(to.fullPath);
    });
  }
}
</script>
<style lang="less">
#login {
  .bg-div {
    /* background-color:#000; */
    position: absolute;
    z-index: -3;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    /*  opacity:0.3;  */
    /* background: url('../../img/login_bg.jpg'); */
    background-size: 100% 100%;
  }
  .content {
    position: absolute;
    z-index: 2;
    top: 0;
    left: 0;
    width: 100%;
    /*  color: white; */
    height: 100vh;
    /* background: rgba(56, 51, 255, 0.7); */
    .logo-div {
      text-align: center;
      /* margin-top: 3rem; */
      color: #009FE7;
      .icon-shuiwuguanli2 {
        font-size: 4rem;
      }
      .title {
        display: block;
        letter-spacing: 1rem;
        margin-top: -1rem;
      }
    }
    .login-div {
      width: 96%;
      margin: 2rem auto 0;
      /* border-radius: 4rem; */
      box-shadow: 0 4px 8px 6px rgba(0, 0, 0, 0.2);
      .iconfont {
        font-size: 1.6rem;
        /* color: white; */
      }
      /* .weui-icon {
        color: #fff
      } */
      .icon-people,
      .icon-lock {
        margin-right: 1rem;
      }
      .weui-cells.vux-no-group-title {
        background-color: rgba(255, 255, 255, 0.4);
      }
      /*  input::-webkit-input-placeholder {
       color: #fff;
       opacity: 1;
     } */
    }
    .foot-table {
      width: 80%;
      margin: 2% auto auto auto;
      td {
        color: #009FE7;
      }
    }
  }
  .reg-btn {
    margin-top: 1rem;
  }
}
</style>
