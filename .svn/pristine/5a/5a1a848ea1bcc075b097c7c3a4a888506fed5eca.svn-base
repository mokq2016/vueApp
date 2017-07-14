<template>
  <div class="container" id='companyInfo'>
    <v-headerbar title='企业详情'></v-headerbar>
    <group>
      <cell title='纳税人名称'>
        <span slot='value' class='companyName'>{{companyDetail.nsrmc}}</span>
      </cell>
      <cell title='纳税人识别号'>
        <span slot='value' class='companyName'>{{companyDetail.nsrsbh}}</span>
      </cell>
      <cell title='注册地址'>
        <span slot='value' class='companyName'>{{companyDetail.zcdz}}</span>
      </cell>
      <cell title='经营地址'>
        <span slot='value' class='companyName'>{{companyDetail.scjydz}}</span>
      </cell>
      <cell title='法定代表人'>
        <span slot='value' class='companyName'>{{companyDetail.fddbrxm}}</span>
      </cell>
      <cell title='财务负责人'>
        <span slot='value' class='companyName'></span>
      </cell>
    </group>
    <x-button type="primary" class='w80 mt6' action-type='button' @click.native='clickHandle(companyDetail)'>{{getBtnStatus(companyDetail.id)}}</x-button>
  </div>
</template>
<script>
import {
  Group,
  Cell,
  XButton
} from 'vux'
export default {
  components: {
    Group,
    Cell,
    XButton
  },
  data() {
    return {
      companyDetail: {}
    }
  },
  methods: {
    getBtnStatus(id) {
      if (!id) {
        return '绑定'
      } else {
        return '解绑'
      }
    },
    clickHandle(companyDetail) {
      let msg = '';
      let reqUrl = '';
      let param = {};
      let self = this;
      let tip = '';
      if (companyDetail.id) {
        msg = '确定解除绑定该企业？';
        tip = '解绑成功';
        reqUrl = '/api/yhgl/company/unbind';
        param = {
          relationId: companyDetail.id
        }
      } else {
        msg = '确定绑定该企业？';
        tip = '绑定成功';
        reqUrl = '/api/yhgl/company/bind';
        param = {
          nsrsbh: companyDetail.nsrsbh,
          nsrmc: companyDetail.nsrmc,
          ryxxId: companyDetail.ryxxId,
          type: companyDetail.type
        }
      }
      this.$confirm({
        content: msg,
        onConfirm() {
          self.$http.post(reqUrl, param).then(function(result) {
            if (result.success) {
              self.$toast(tip);
              self.$router.go(-1)
            } else {
              self.$alert(result.message);
            }
          })
        }
      })

    }
  },
  created() {
    this.companyDetail = JSON.parse(this.$route.params.companyDetail)
    console.log(this.$route.params)
  }
}
</script>
<style lang='less'>
#companyInfo.container {
  .companyName {
    font-size: 0.8rem;
    margin-left: 0.5rem;
    color: #7A7A7A
  }
  .vux-label {
    width: 6.6rem;
  }
}
</style>
