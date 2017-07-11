<template>
  <div class="container">
    <v-headerbar title='设置密码'></v-headerbar>
    <group>
      <x-input title='账号' v-model='account' :readonly='true'></x-input>
      <x-input title='登录密码' v-validate="'required'" name='登录密码' v-model='password' type='password' placeholder='请输入当前登录密码'></x-input>
      <span v-show="errors2.has('登录密码') && submitted" style='margin-left: 6.4rem' class="errors-tip is-danger">{{ errors2.first('登录密码') }}</span>
    </group>
    <group title='请重新设置登录密码'>
      <x-input title='设置新密码' v-model='newPassword' placeholder='请输入新密码' type='password'></x-input>
      <x-input title='确认新密码' v-model='newPassword2' placeholder='请确认新密码' type='password'></x-input>
    </group>
    <x-button type="primary" class='w80' :style='btnStyle' action-type='button' @click.native='modifyPassword()'>登录</x-button>
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
      btnStyle: {
        marginTop: '2rem'
      },
      account: '',
      password: '',
      newPassword: '',
      newPassword2: '',
      submitted: false
    }
  },
  methods: {
    modifyPassword() {
      this.submitted = true;
    }
  }
}
</script>
