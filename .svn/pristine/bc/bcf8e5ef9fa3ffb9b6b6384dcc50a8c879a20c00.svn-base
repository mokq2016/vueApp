<template>
  <div class="container">
    <div>
      <v-headerbar title='管理办税人员'>
          <i slot='right' class='iconfont icon-add' @click="$router.push('addTaxer')"></i>
      </v-headerbar>
    </div>
    <div class='content' v-for='item in taxerList'>
      <table>
        <tbody>
          <tr>
            <td style='padding-left: 1rem'>
              <h4>{{item.realName}}</h4>
              <!-- <p>手机号码：{{item.}}</p> -->
              <p>证件号码：{{item.cardNo}}</p>
              <p>用户身份：{{getUserIdentity(item.type)}}</p>
            </td>
            <td style='width:22%'>
              <x-button type="warn" mini action-type='button' @click.native='deleteTaxer(item.ryxxId)'>删除</x-button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import {
  XButton
} from 'vux'
export default {
  components: {
    XButton
  },
  data(){
    return {
        taxerList:[]
    }
  },
  methods: {
    getTaxerList() {
      let self = this;
      this.$http.get('/api/yhgl/get/taxOfficerList').then(function(result) {
        if (result.success) {
            self.taxerList = result.data;
        } else {
          self.$alert(result.message);
        }
      })
    },
    getUserIdentity(type){
        let identity = '未知身份';
        switch (type) {
            case '1':
                identity = '办税人员';
                break;
                case '2':
                identity = '法定代表人';
                break;
                case '3':
                identity = '财务负责人';
                break;
                case '4':
                identity = '税务代理人';
                break;
                case '6':
                identity = '购票员';
                break;
            default:
                break;
        }
        return identity;
    },
    deleteTaxer(ryxxId){
        let self = this;
       this.$confirm({
        content:'您确定要删除该办税人员？',
        onConfirm(){
            self.$http.post('/api/yhgl/delete/taxOfficer',{ryxxId:ryxxId}).then(function(result){
                if(result.success){
                    self.$toast({
                        type:'success',
                        text:'删除成功！'
                    });
                    self.getTaxerList();
                }else{
                    self.$alert(result.message);
                }
            })
        }
       })     
    }
  },
  created() {
    this.getTaxerList();
  }
}
</script>
<style lang='less' scoped>
.container {
  .content {
    background: #ccc;
    margin-top: 0.3rem;
    table {
      width: 100%;
      td p {
        font-size: 0.9rem;
      }
    }
  }
}
</style>
