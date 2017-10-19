<template>
  <div class="container">
    <v-headerbar title='第3步 设置密码' class="header-background"></v-headerbar>
    <div class="content">
      <group>
        <x-input title='密码' class="input-label" v-model='password' :type='inpType' label-width='5.3rem' placeholder='8-16位字母数字组合' name='密码' v-validate="'required|passWord'">
          <i slot="right" class="iconfont icon-browse fs16" @click='changeInp()'></i>
        </x-input>
        <span v-show="errors2.has('密码') && submitted" style='margin-left: 6.2rem' class="errors-tip is-danger">{{ errors2.first('密码') }}</span>
        <x-input title='确认密码' class="input-label" v-model='confirmPwd' :type='inpType' label-width='5.3rem'  name='确认密码' placeholder='8-16位字母数字组合' v-validate="'required|confirmed:密码'">
          <i slot="right" class="iconfont icon-browse fs16" @click='changeInp()'></i>
        </x-input>
        <span v-show="errors2.has('确认密码') && submitted" style='margin-left: 6.2rem' class="errors-tip is-danger">{{ errors2.first('确认密码') }}</span>
      </group>
      <div class="footer">
        <x-button type='primary' class='btn mt6' @click.native='regisetrPwd()'>确定</x-button>
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
        inpType: 'password',
        submitted: false,
        confirmPwd: '',
        password:'',
        routeParams:{} //接收传过来的参数
      }
    },
    methods: {
      init(){
        //接收第二步传过来的参数
        this.routeParams = JSON.parse(this.$route.query.routeParams);
      },
      regisetrPwd() {
        let self = this;
        this.$validator.validateAll().then(function(isValidate) {
          if (isValidate) {
            //支付宝绑定的接口及需要的参数待定
            let data = {
              "sfzjhm": self.routeParams.sfzjhm,
              "qd": "weixin",// 微信用的是"qd":"weixin"  支付宝待定
              "telNum": self.routeParams.telNum,
              "name": self.routeParams.name,
              "password":btoa(self.password.trim()),
              "serverId": '',  //支付宝serverId待定
              "email" : '',
              "filepath": "/"
            }
            self.$http.post('/api/smrz/smrzRegister', JSON.stringify(data)).then(function(result) {
              if (result.success) {
                self.$router.push({
                  //跳转到注册成功页面 可选择绑定企业
                  name: 'registerSuccess',
                  query: {
                    routeParams: JSON.stringify(data)
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
      changeInp() {
        if (this.inpType == 'password') {
          this.inpType = 'text';
        } else {
          this.inpType = 'password'
        }
      },
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

