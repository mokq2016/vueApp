<template>
  <div class="container">
    <v-headerbar title='添加办税人员'></v-headerbar>
    <div class="content">
      <group>
        <x-input title='证件号码' label-width='5rem' placeholder="请输入身份证号码" v-validate="'required'" name='身份证号码' v-model="formData.cardNo">
         <i slot="right" class="iconfont icon-search" @click='getRealName()'></i>
        </x-input>
        <x-input title='姓名' label-width='5rem' readonly name='身份证号码' v-model="formData.realName">
        </x-input>
        <selector title="用户身份" placeholder='请选择用户身份' v-model="formData.type" :options='types'></selector>
      </group>
      <x-button type="primary" class='w80 mt6' action-type='button' @click.native='bindTaxer()'>授权</x-button>
    </div>
  </div>
</template>
<script>
import {
  XInput,
  Group,
  XButton,
  Selector
} from 'vux'
export default {
  components: {
    XInput,
    Group,
    XButton,
    Selector
  },
  data() {
    return {
      formData: {
        cardNo: '',
        realName: '',
        phone: '',
        type: ''
      },
      types: [{
        key: '1',
        value: '办税人员'
      }, {
        key: '4',
        value: '代理人员'
      }, {
        key: '6',
        value: '购票员'
      }]
    }
  },
  methods: {
    getRealName() {
      let self = this;
      this.$http.get('/api/yhgl/get/taxOfficer/accountInfo', {
        cardNo: this.formData.cardNo
      }).then(function(result) {
        if (result.success) {

        } else {
          self.$alert(result.message);
        }
      })
    },
    bindTaxer(){
        if(!this.formData.type){
            this.$alert("请选择办税身份！");
            return;
        }
        
    }
  }
}
</script>
