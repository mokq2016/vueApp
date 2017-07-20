<template>
  <div class="container">
    <v-headerbar title='找回密码'></v-headerbar>
    <div class="content">
      <group>
        <x-input title='手机号' placeholder='请输入手机号' v-model='mobile' name='手机号' v-validate="'required|mobile'"></x-input>
        <span v-show="errors2.has('手机号') && submitted" style='margin-left: 5.2rem' class="errors-tip is-danger">{{ errors2.first('手机号') }}</span>
        <x-input title='验证码' v-model='code' v-validate="'required'" name='验证码'>
          <x-button type='primary' mini slot='right' :disabled='btnCanClick' @click.native='getCode()'>{{btnTxt}}</x-button>
        </x-input>
        <span v-show="errors2.has('验证码') && submitted" style='margin-left: 5.2rem' class="errors-tip is-danger">{{ errors2.first('验证码') }}</span>
      </group>
      <x-button type='primary' class='w80 mt6' @click.native='next()'>下一步</x-button>
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
      code: ''
    }
  },
  methods: {
    next() {
      let self = this;
      this.$validator.validateAll().then(function(isValidate) {
        if (isValidate) {
          self.$http.post('/api/smrz/checkCode', {
            telNum: self.mobile,
            code: self.code
          }).then(function(result) {
            if (result.success) {
              let param = {
                telNum: self.mobile,
                code: self.code
              }
              self.$router.push({
                name: 'findPwd',
                params: {
                  params: JSON.stringify(param)
                }
              });
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
            businessCode: 'SMS_VC_05'
          }
          self.$http.post('/api/smrz/sendVerification', param).then(function(result) {
            if (result.success) {
              self.$toast('验证码已发送到您的手机');
              self.btnCanClick = true;
              self.btnStatusHandle();
            } else {
              self.$alert('验证码发送失败，请稍后再试')
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
          self.btnTxt = '获取验证码';
          self.time = 60;
          self.btnCanClick = false;
          clearInterval(timer);
        } else {
          self.time--;
          self.btnTxt = self.time;
        }
      }, 1000);
    }
  }
}
</script>
