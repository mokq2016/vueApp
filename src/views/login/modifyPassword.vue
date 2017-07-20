<template>
  <div class="container">
    <v-headerbar title='设置密码'></v-headerbar>
    <group>
      <x-input title='账号' v-model='account' :readonly='true'></x-input>
      <x-input title='登录密码' v-validate="'required'" name='登录密码' v-model='password' type='password' placeholder='请输入当前登录密码'></x-input>
      <span v-show="errors2.has('登录密码') && submitted" style='margin-left: 6.4rem' class="errors-tip is-danger">{{ errors2.first('登录密码') }}</span>
    </group>
    <group title='请重新设置登录密码'>
      <x-input title='设置新密码' v-model='newPassword' name='新密码' v-validate="'required'" placeholder='请输入新密码' type='password'></x-input>
      <span v-show="errors2.has('新密码') && submitted" style='margin-left: 7.3rem' class="errors-tip is-danger">{{ errors2.first('新密码') }}</span>
      <x-input title='确认新密码' v-model='newPassword2' v-validate="'required|confirmed:新密码'" name='确认密码' placeholder='请确认新密码' type='password'></x-input>
      <span v-show="errors2.has('确认密码') && submitted" style='margin-left: 7.3rem' class="errors-tip is-danger">{{ errors2.first('确认密码') }}</span>
    </group>
    <x-button type="primary" class='w80' :style='btnStyle' action-type='button' @click.native='modifyPassword()'>确定</x-button>
  </div>
  </div>
</template>
<script>
import {
  Group,
  XInput,
  XButton
} from 'vux'
import {
  mapGetters
} from 'vuex'
export default {
  components: {
    Group,
    XInput,
    XButton
  },
  data() {
    return {
      submitted:false,
      btnStyle: {
        marginTop: '2rem'
      },
      account: this.GET_ACCOUNTINFO().mobile,
      password: '',
      newPassword: '',
      newPassword2: '',
      submitted: false
    }
  },
  methods: {
    ...mapGetters(['GET_ACCOUNTINFO']),
    modifyPassword() {
      let self = this;
      this.$validator.validateAll().then(function(isValidate) {
        if (isValidate) {
          let param = {
            password: self.password,
            newPassword: self.newPassword
          }
          self.$http.post('/api/yhgl/modifyPass', param).then(function(result) {
            if (result.success) {
              self.$toast("修改密码成功！");
              self.$router.push('aboutMe');
            } else {
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
