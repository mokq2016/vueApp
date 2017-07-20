<template>
  <div class="container">
    <div class="fixedHead">
      <v-headerbar title='企业列表信息'></v-headerbar>
    </div>
    <div class="content">
      <tab :line-width="1" v-if='showTab'>
        <tab-item @on-item-click='showTaxNumLogin = true' selected>绑定确认</tab-item>
        <tab-item @on-item-click='showTaxNumLogin = false'>已绑定</tab-item>
      </tab>
      <div class='list-div' v-show='(!item.id && showTaxNumLogin) || (item.id && !showTaxNumLogin)' v-for='item in bindList'>
        <table>
          <tbody>
            <tr>
              <td>
                <h4>{{item.nsrmc}}</h4>
                <p>{{item.nsrsbh}}</p>
                <p>{{getBsType(item.type)}}</p>
              </td>
              <td style="width: 22%">
                <x-button :type="item.id?'warn':'primary'" mini action-type='button' @click.native='btnHandle(item)'>{{item.id?'解绑':'确定'}}</x-button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
import {
  Tab,
  TabItem,
  XButton
} from 'vux'
import {mapGetters} from 'vuex'
export default {
  components: {
    Tab,
    TabItem,
    XButton
  },
  data() {
    return {
      showTab:true,
      showTaxNumLogin: true,
      bindList: []
    }
  },
  methods: {
    ...mapGetters(['GET_CURRENTROLE']),
    getBsType(type) {
      let bsType = '';
      switch (type) {
        case '1':
          bsType = '办税人员';
          break;
        case '2':
          bsType = '法定代表人';
          break;
        case '3':
          bsType = '财务负责人';
          break;
        case '4':
          bsType = '税务代理人';
          break;
        case '6':
          bsType = '购票员';
          break;
        default:
          bsType = '未知身份'
          break;
      }
      return bsType;
    },
    initBindList() {
      let self = this;
      this.$http.get('/api/yhgl/get/bindlist').then(function(result) {
        if (result.success) {
          self.bindList = result.data.bindlist;
        } else {
          self.$alert(result.message);
        }

      })
    },
    btnHandle(bindInfo) {
      let bsType = this.getBsType(bindInfo.type);
      let self = this;
      if (!bindInfo.id) {
        this.$confirm({
          content: '您确定要绑定为该企业的“' + bsType + '”?',
          onConfirm() {
            let param = {
              nsrsbh: bindInfo.nsrsbh,
              nsrmc: bindInfo.nsrmc,
              ryxxId: bindInfo.ryxxId,
              type: bindInfo.type
            }
            self.$http.post('/api/yhgl/company/bind', param).then(function(result) {
              if (result.success) {
                self.initBindList();
              } else {
                self.$alert(result.message);
              }
            })
          }
        })
      } else {
        this.$confirm({
          content: '您确定解除该企业的绑定？',
          onConfirm() {
            let param = {
              relationId: bindInfo.id
            }
            self.$http.post('/api/yhgl/company/unbind', param).then(function(result) {
              if (result.success) {
                self.initBindList();
              } else {
                self.$alert(result.message);
              }
            })
          }
        })
      }
    }
  },
  created() {
    console.log(this.GET_CURRENTROLE().roleType)
    if(this.GET_CURRENTROLE().roleType){
      this.showTab = false;
      this.showTaxNumLogin = false;
    }
    this.initBindList();
  }
}
</script>
<style lang='less' scoped>
.container {
  .content {
    margin-top: 3.1rem;
    .list-div {
      padding: 0.4rem;
      margin-top: 0.3rem;
      background: #ccc;
    }
  }
}
</style>
