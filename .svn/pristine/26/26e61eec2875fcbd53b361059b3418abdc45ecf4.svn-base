<template>
  <div class="container">
    <div class="header-div">
      <v-headerbar title='企业列表信息'></v-headerbar>
    </div>
    <div class="content">
      <tab :line-width="1">
        <tab-item @on-item-click='showTaxNumLogin = true' selected>授权待确认</tab-item>
        <tab-item @on-item-click='showTaxNumLogin = false'>已绑定</tab-item>
      </tab>
    </div>
  </div>
</template>
<script>
import {
  Tab,
  TabItem
} from 'vux'
export default {
  components: {
    Tab,
    TabItem
  },
  data() {
    return {
        
    }
  },
  created() {
    let self = this;
    this.$http.get('/api/yhgl/get/bindlist').then(function(result) {
      if (result.success) {

      } else {
        self.$alert(result.message);
      }

    })
  }
}
</script>
