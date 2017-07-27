<template>
  <div class="container">
    <div class="app_head">
      <v-headerbar title='查询结果'></v-headerbar>
    </div>
    <div class="content content-body">
      <div class="result-list">
        <div class="result-part" v-for="item in searchResult">
          <div class="line">
            <label>所属属期</label> <span>{{ item.skssqq }} 至 {{ item.skssqz }}</span>
          </div>
          <div class="line">
            <label>申报表种类</label> <span>{{item.sbzlMc}}</span>
          </div>
          <div class="line">
            <label>申报日期</label> <span>{{ item.sbrq }}</span>
          </div>
          <div class="line">
            <label>申报状态</label> <span>{{getSbStatus(item.sbztDm,item.sbztms)}}</span>
          </div>
          <div class="line">
            <label>应补退税额</label> <span>{{item.sbse}}</span>
          </div>
          <div class="line text-right">
            <x-button v-if="item.sbztDm != '0000'" :con="44" mini type="primary" class='btn' action-type='button' @click.native='showError(item.sbztms)'>失败原因</x-button>
            <x-button v-if="item.sbztDm == '0000'" mini action-type='button' @click.native='goJk()'>去缴款</x-button>
          </div>
        </div>
        <!--  <x-button mini action-type='button' @click.native='goJk()'>去缴款</x-button> -->
      </div>
      <!-- end -->
      <v-nodata v-if='searchResult.length===0'></v-nodata>
    </div>
  </div>
</template>
<script>
import {
  Group,
  XButton,
  Alert
} from 'vux'

export default {
  components: {
    Group,
    XButton,
    Alert
  },
  data() {
    return {
      queryData: {},
      select: '01',
      noSearch: true, //是否搜索
      sbrqq: '',
      sbrqz: '',
      sssqq: '',
      sssqz: '',
      selectArr: [{
        key: '01',
        value: '增值税'
      }, {
        key: '02',
        value: '减免税'
      }],
      searchResult: []
    }
  },
  methods: {
    showError(error) { //弹窗提示失败信息
      let sbztms = error;
      if (sbztms != null && sbztms.split("异常原因：")[1] != null && sbztms.split("异常原因：")[1] != "") {
        sbztms = "异常原因：" + sbztms.split("异常原因：")[1];
      }
      this.$alert(sbztms);
    },
    getSbStatus(sbztDm, sbztms) {
      if (sbztms && sbztms.indexOf('逾期申报') !== -1) {
        return '申报成功，但您逾期申报，请联系主管税务机关确认是否需要处罚。';
      } else if ("0000" == sbztDm) {
        return "申报成功";
      } else if (sbztDm && "2" == sbztDm.substr(0, 1)) {
        return "申报中";
      } else {
        return "申报失败";
      }
    },
    goJk: function() {
      var $this = this;
      $this.$router.push({
          path: '/wjkList'
        })
        /* $this.$router.push({
           path: '/djklist',
           query: {
             sssqq: $this.queryData.sssqq.replace(/-/g, ""),
             sssqz: $this.queryData.sssqz.replace(/-/g, "")
           }
         });*/
    }
  },

  mounted: function() {
    var $this = this;
    $this.queryData = $this.$store.state.sbqueryData;
    let zsxmDm = $this.queryData.select == '-1' ? '' : $this.queryData.select;
    var url = '/sb/sbcommon_querySbqkSbxxBySbztAndSbny.do';
    var data = {
      djxh: '',
      zsxmDm: zsxmDm,
      sbrqq: $this.queryData.sbrqq.replace(/-/g, ""),
      sbrqz: $this.queryData.sbrqz.replace(/-/g, ""),
      sssqq: $this.queryData.sssqq.replace(/-/g, ""),
      sssqz: $this.queryData.sssqz.replace(/-/g, ""),
      sbztDm: ''
    }
    $this.$http.post(url, data, {
      'Content-Type': 'application/x-www-form-urlencoded;'
    }).then(function(data) {
      if (data.success) {
        $this.searchResult = data.data;
      } else {
        $this.$alert(data.message);
      }
    });
  }
}
</script>
<style scoped="">
.text-right {
  text-align: right;
}

.result-part {
  background: #fff;
  margin: 8px 0;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
  padding: 7px 0px;
}

.result-part .line {
  padding: 3px 15px;
}

.result-part label {
  display: inline-block;
  width: 90px;
}
</style>
