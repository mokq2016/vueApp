<template>
  <div class="container">
    <v-headerbar title='添加办税人员'></v-headerbar>
    <div class="content">
      <group>
        <x-input title='证件号码' label-width='5rem' placeholder="请输入身份证号码" v-validate="'required|idCard'" name='身份证号码' v-model="formData.cardNo">
          <i slot="right" class="iconfont icon-search" @click='getRealName()'></i>
        </x-input>
        <span v-show="errors2.has('身份证号码') && submitted" style='margin-left: 6rem' class="errors-tip is-danger">{{ errors2.first('身份证号码') }}</span>
        <x-input title='姓名' label-width='5rem' readonly name='身份证号码' v-model="formData.realName">
        </x-input>
        <selector title="用户身份" placeholder='请选择用户身份' v-model="formData.type" :options='types'></selector>
      </group>
      <x-button type="primary" class='w80 mt6' action-type='button' @click.native='bindTaxer()'>确定</x-button>
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
      submitted: false,
      formData: {
        cardNo: '',
        realName: '',
        phone: '',
        type: ''
      },
      types: [{
        key: '1',
        value: '办税员'
      }, {
        key: '4',
        value: '税务代理人'
      }, {
        key: '6',
        value: '购票员'
      }]
    }
  },
  methods: {
    getRealName() {
      let self = this;
      return this.$http.get('/api/yhgl/get/taxOfficer/accountInfo', {
        params: {
          cardNo: this.formData.cardNo
        }
      }, {
        'Content-Type': 'application/x-www-form-urlencoded;'
      }).then(function(result) {
        if (result.success) {
          if(!result.data || !result.data.fullName){
            self.$alert("该用户未进行实名注册，不能绑定！");
            return result;
          }
          self.formData.realName = result.data.fullName;
          self.formData.mobile = result.data.mobile;
        } else {
          self.$alert(result.message);
        }
        return result;
      })
    },
    bindTaxer() {
      if (!this.formData.type) {
        this.$alert("请选择用户身份！");
        return;
      }
      let self = this;
      this.$validator.validateAll().then(function(isValidate) {
        if (isValidate) {
          self.$confirm({
            content: '您确定绑定该用户？',
            onConfirm() {
              self.getRealName().then((result) =>{
                if(result.success && result.data && result.data.fullName){
                  self.$http.post('/api/yhgl/add/taxOfficer',self.formData).then((result)=>{
                      if(result.success){
                        self.$toast({
                          type:'success',
                          text:'绑定成功！'
                        })
                        self.$router.go(-1);
                      }else{
                        self.$alert(result.message);
                      }
                  })
                }
              })
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
