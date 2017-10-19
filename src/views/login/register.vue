<template>
  <div class="container">
    <v-headerbar title='第一步 注册信息' class="header-background"></v-headerbar>
    <div class="content">
      <group>
        <x-input title='真实姓名' v-model='realname' class="input-label"  label-width='6rem' placeholder='请输入' name='真实姓名' v-validate="'required'">
        </x-input>
        <span v-show="errors2.has('真实姓名') && submitted" style='margin-left: 5.2rem;font-size: 13px;' class="errors-tip is-danger">{{ errors2.first('真实姓名') }}</span>
        <x-input title='身份证号'  class="input-label" label-width='6rem' placeholder='请输入' v-model='idnum' name='身份证号' v-validate="'required|idCard'"></x-input>
        <span v-show="errors2.has('身份证号') && submitted" style='margin-left: 5.2rem;font-size: 13px;' class="errors-tip is-danger">{{ errors2.first('身份证号') }}</span>
      </group>
      <div class="agree">
        <check-icon :value.sync="isAgree"></check-icon>
        <!--<div><a href="{{mzsbUrl}}">我已阅读并同意征信业务授权书</a></div>-->
      </div>

      <div class="footer">
        <x-button type='primary' class='mt6 btn' @click.native='nextStep()'>下一步</x-button>
      </div>
    </div>
  </div>
</template>
<script>
  import {
    Alert,
    CheckIcon,
    Group,
    XInput,
    XButton
  } from 'vux'
  export default {
    components: {
      Alert,
      CheckIcon,
      Group,
      XInput,
      XButton
    },
    data() {
      return {
        submitted: false,
        realname: '',
        idnum: '',
        submitted: false,
        isAgree:false,
        mzsbUrl:''
      }
    },
    methods: {
      nextStep() {
        let self = this;
        let reqParam = {
          "sfzjhm":this.idnum
        }
        let params = {
          "username":this.realname,
          "idnum":this.idnum,
          "isSmrzFlag":"N"
        }
        self.$validator.validateAll().then(function(isValidate) {
          if (isValidate) {
            self.$http.post('/api/smrz/checkSfmh', reqParam, {
              'Content-Type': 'application/json;charset=UTF-8'}).then(function(result) {
              if (result.success) {
                self.$router.push({
                  name: 'validation',
                  query: {
                    routeParams: JSON.stringify(params)
                  }
                })
              }else{
                self.$alert(result.message);
              }
            })
          } else {
            self.submitted = true;
          }
      })
    }
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
    .center-div{
      .title{
        font-weight: normal;
      }
    }
  }
  .content{
    .vux-check-icon > .weui-icon-success:before, .vux-check-icon > .weui-icon-success-circle:before {
      color: #03AAFF;
    }
    .agree{
      padding: 0.5rem 1rem;
      margin: 0 auto;
      width: 90%;
    }
    .weui-label{
      font-size: 16px;
    }
    .input-label{
      font-size: 16px;
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
