<template>
  <div class="container">
    <div class='fixedHead'>
      <v-headerbar title='网上办理文书结果查询'></v-headerbar>
    </div>
    <div class="content mt_head">
      <div class='item-div' v-for='(item,index) in items'>
        <table>
          <tr>
            <td rowspan="4" style='width: 10%;color:#2F30D5'>{{index+1}}</td>
            <td style='width: 30%;color:#2F30D5'>事项名称</td>
            <td style='width: 60%;color:#67A4FD'>{{item.dbsxmc}}</td>
          </tr>
          <tr>
            <td style='color:#2F30D5'>事项类型</td>
            <td style='color:#67A4FD'>{{ item.zlsfqq == 'N'?'全流程无纸化':'预申请'}}</td>
          </tr>
          <tr>
            <td style='color:#2F30D5'>申请日期</td>
            <td style='color:#67A4FD'>{{item.dbsxrq}}</td>
          </tr>
          <tr>
            <td style='color:#2F30D5'>办理状态</td>
            <td style='color:#67A4FD'>{{getBlzt(item.dbsxzt)}}</td>
          </tr>
        </table>
      </div>
      <v-nodata v-if='isNodata'></v-nodata>
    </div>
  </div>
</template>
<script>
export default {
  data() {
      return {
        isNodata:false,
        items: [],
        queryConditon: {}
      }
    },
    methods: {
      getWsResult() {
        let self = this;
        this.$http.post('/wycx/wycxAction_queryWsxx.do', this.queryConditon, {
          'Content-Type': 'application/x-www-form-urlencoded;'
        }).then((result) => {
          if (result.success) {
            self.items = result.data;
            if(self.items.length === 0){
                self.isNodata = true;
            }
          } else {
            self.$alert(result.message)
          }
        })
      },
      getBlzt(dbsxzt) {
        let zt = '';
        switch (dbsxzt) {
          case '10':
            zt = '正在受理，已发审核部门审批，请耐心等待审批结果';
            break;
          case '05':
            zt = '已办结待签收';
            break;
          case '04':
            zt = '已办结待签收';
            break;
          case '00':
            zt = '待审查资料';
            break;
          case '01':
            zt = '已办结待签收';
            break;
          case '02':
            zt = '不予受理';
            break;
          case '06':
            zt = '待补正资料';
            break;
          case '03':
            zt = '正在受理，已发审核部门审批，请耐心等待审批结果';
            break;
          case '11':
            zt = '结束';
            break;
          default:
            zt = '未知状态';
            break;
        }
        return zt;
      }
    },
    created() {
      this.queryConditon = JSON.parse(this.$route.params.param);
      this.getWsResult();
    }
}
</script>
<style lang='less' scoped>
.container {
  .content {
    .item-div {
      border-bottom: 1px solid #ccc;
      border-top: 1px solid #ccc;
      margin-top: 10px
    }
  }
}
</style>
