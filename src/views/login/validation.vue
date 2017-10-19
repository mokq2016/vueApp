<template>
  <div class="container">
    <v-headerbar title='第2步 手机号码验证' class="header-background" ></v-headerbar>
    <div class="content">
      <group>
        <x-input title='手机号' class="input-label" placeholder='请输入手机号' v-model='mobile' name='手机号' v-validate="'required|mobile'"></x-input>
        <span v-show="errors2.has('手机号') && submitted" style='margin-left: 5.2rem' class="errors-tip is-danger">{{ errors2.first('手机号') }}</span>
        <x-input title='验证码'  class="input-label" v-model='code' v-validate="'required'" name='验证码'>
          <x-button type='primary' class="yzm" mini slot='right' :disabled='btnCanClick' @click.native='getCode()'>{{btnTxt}}</x-button>
        </x-input>
        <span v-show="errors2.has('验证码') && submitted" style='margin-left: 5.2rem' class="errors-tip is-danger">{{ errors2.first('验证码') }}</span>
      </group>
      <div class="footer">
        <x-button type='primary' class='btn mt6' @click.native='nextStep()'>进行实名认证</x-button>
      </div>
    </div>
  </div>
</template>
<script>
import {
  Group,
  XInput,
  XButton
} from 'vux'
export default {
  components: {
    Group,
    XInput,
    XButton
  },
  data() {
    return {
      btnCanClick: false,
      time: 60,
      btnTxt: '获取验证码',
      submitted: false,
      mobile: '',
      code: '',
      routeParams:{}
    }
  },
  methods: {
    init(){
      //接收第一步传过来的参数
      this.routeParams = JSON.parse(this.$route.query.routeParams);
    },
    nextStep() {
      let self = this;
      this.$validator.validateAll().then(function(isValidate) {
        if (isValidate) {
          self.$http.post('/api/smrz/checkCode', {
            telNum: self.mobile,
            code: self.code
          }).then(function(result) {
            if (result.success) {
              //进入支付宝实名认证 待支付宝的接口

              let param = {
                "sfzjhm":self.routeParams.idnum,
                "telNum": self.mobile,
                "name":self.routeParams.username
              }
              self.$router.push({
                name: 'registerPwd',
                query: {
                  routeParams: JSON.stringify(param)
                }
              })
            } else {
              self.$alert(result.message);
            }
          })
        } else {
          self.submitted = true;
        }
      })
    },
    getCode() {
      let self = this;
      this.$validator.validateAll({
        '手机号': self.mobile
      }).then(function(isValidate) {
        if (isValidate) {
          let param = {
            telNum: self.mobile,
            businessCode: 'SMS_VC_01'
          }
          self.$http.post('/api/smrz/checkTelNum', param).then(function(result) {
            if (result.success) {
              self.$toast('验证码已发送到您的手机');
              self.btnCanClick = true;
              self.btnStatusHandle();
            } else {
              self.$alert(result.message)
            }
          })
        } else {
          self.submitted = true;
        }
      })
    },
    btnStatusHandle() {
      let self = this;
      let timer = setInterval(function() {
        if (self.time === 0) {
          self.btnTxt = '重发验证码';
          self.time = 60;
          self.btnCanClick = false;
          clearInterval(timer);
        } else {
          self.time--;
          self.btnTxt = self.time + "秒后重发";
        }
      }, 1000);
    }
  },
  created: function() {
    this.init();
  }
}
</script>
<style lang='less' scoped>
  .container{
    .header-background{
      background: #242736;
      font-size: 20px;
      font-weight: normal;
    }
  }
  .content{
    .input-label{
      font-size: 16px;
    }
    .weui-btn_primary{
      background: #FFF;
    }
    .weui-btn:after{
      border:0;
    }
    .yzm{
      background: #FFF;
      border: 1px solid #4DC3FF;
      color: #4DC3FF;
    }
  }
  .footer{
    padding: 0 10px;
    .btn{
      background:#3EA3FE;
      color: #FFFFFF;
      font-size: 20px;
    }
  }
</style>
