<template>
  <div class="container">
    <v-headerbar title='添加绑定企业'></v-headerbar>
    <group title='添加新增加绑定企业'>
      <x-input title='税号' label-width='5rem' placeholder='请输入纳税人识别号' :debounce='2000'
      @on-change='getCompanyName()' v-model='nsrsbh'></x-input>
      <x-input title='企业名称' label-width='5rem' readonly placeholder='输入正确税号后显示名称'></x-input>
    </group>
    <div class='btn-div'>
      <x-button type="primary" class='w80 bind-btn' :disabled='canClick' action-type='button' @click.native='bind()'>绑定</x-button>
    </div>
  </div>
</template>
<script>
import {
  XInput,
  Group,
  XButton
} from 'vux'
export default {
  components: {
    XInput,
    Group,
    XButton
  },
  data() {
    return {
      canClick: true,
      nsrsbh: ''
    }
  },
  methods: {
    bind() {

    },
    getCompanyName() {
      console.log(this.nsrsbh)
    }
  }
}
</script>
<style lang='less' scoped="">
.container {
  .btn-div {
    margin-top: 2rem;
  }
}
</style>
