<template>
  <div class="container" id='accountInfo'>
    <v-headerbar title='账户信息'></v-headerbar>
    <group>
      <div class='picture'>
        <cell title='头像'>
          <i slot='value' class='iconfont icon-geren'></i>
        </cell>
      </div>
      <cell title='昵称' :value="GET_ACCOUNTINFO().fullName"></cell>
    </group>
    <group>
        <cell title='密码设置' is-link link='modifyPassword'></cell>
    </group>
     <x-button type="primary" class='w80 mt6' action-type='button' @click.native='loginOut()'>退出登录</x-button>
  </div>
</template>
<script>
import {
  Group,
  Cell,
  XButton
} from 'vux'
import {
  mapGetters,
  mapActions
} from 'vuex'
export default {
  components: {
    Group,
    Cell,
    XButton
  },
  methods: {
    ...mapGetters(['GET_ACCOUNTINFO']),
    ...mapActions(['USER_SIGNOUT']),
    loginOut(){
        let self = this;
        this.$confirm({
            content:'您确定要退出登录？',
            onConfirm(){
                self.USER_SIGNOUT();//退出登录
               self.$router.push('home');     
            }
        })  
    }
  },
  created() {
    console.log(this.GET_ACCOUNTINFO())
  }
}
</script>
<style lang='less'>
    #accountInfo{
        .picture{
            .weui-cell{
                padding: 0 15px;
            }
            .icon-geren{
                font-size: 2rem;
            }
        }
    }
</style>
