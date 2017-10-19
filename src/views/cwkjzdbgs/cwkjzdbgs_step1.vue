<template>
  <div class="container" id="cwkjzd">
    <div class="fixedHead">
      <v-headerbar title='财务会计制度及核算软件备案报告书'></v-headerbar>
    </div>
    <div class="content mtHead">
      <group>
        <selector title='财务会计制度：' :options="cwkjzdList" @on-change="showCwbbxx" v-model="formData.cwkjzdDm"></selector>
        <x-textarea title="会计报表名称：" readonly v-model="formData.kjbb"></x-textarea>
        <selector title='低值易耗品摊销方法：' :options="txffList" v-model="formData.dzyhtxDm"></selector>
        <selector title='折旧方法(大类)：' :options="zjffBig" @on-change="zjffChange" v-model="formData.zjffDlDm"></selector>
        <selector title='折旧方法(小类)：' :options="zjffSmall" v-model="formData.zjffDm"></selector>
        <datetime title='会计制度执行期起：' v-model="formData.kjnd"></datetime>
        <selector title='会计报表报送期限：' :options="kjbbBsqxList" v-model="formData.kjbbBsqx"></selector>
        <selector title='成本核算方法：' :options="cbhsffDmList" v-model="formData.cbhsffDm"></selector>
        <x-input title="软件名称：" v-model="formData.rjmcDm"></x-input>
        <datetime title='会计制度执行期起：' v-model="formData.qyrq"></datetime>
        <selector title='数据库名称：' :options="dataBaseList" v-model="formData.sjkmcDm"></selector>
        <x-input title="版本号：" v-model="formData.rjbbDm"></x-input>
      </group>
      <div class='mt3 mb3'>
        <x-button type="primary" class='w80' action-type='button' @click.native='next()'>下一步</x-button>
      </div>
    </div>
  </div>
</template>
<script>
import {
  Group,
  Selector,
  PopupPicker,
  XTextarea,
  Datetime,
  XInput,
  XButton
} from 'vux'
import {
  mapState
} from 'vuex'
export default {
  components: {
    Group,
    Selector,
    PopupPicker,
    XTextarea,
    Datetime,
    XInput,
    XButton
  },
  data() {
    return {
      cwkjzdList: [],
      txffList: [],
      zjffBig: [],
      zjffSmall: [],
      DM_KJBBMC: [],
      kjbbBsqxList: [],
      cbhsffDmList: [],
      dataBaseList: [],
      formData: {
        cwkjzdDm: '',
        dzyhtxDm: '',
        zjffDlDm: '',
        zjffDm: '',
        kjbb: '',
        cbhsffDm: '',
        kjbbBsqx: '',
        rjmcDm: '',
        sjkmcDm: '',
        rjbbDm: ''
      }
    }
  },
  methods: {
    preCheck(){
      if(this.nsrInfo.nsrztDm != '03'){
        this.$alert({
          content:'当前纳税人状态异常',
          onHide(){
            this.$router.replace('/index/ywbl');
          }
        })
        return;
      } 
    },
    init() {
      this.getCwkjzd();
      this.getTxff();
      this.getZjffBig();
      this.getKjbbBsqx();
      this.getCbhsffDmList();
      this.getDM_KJBBMC();
      this.getDatabase();
    },
    getKjbbBsqx() {
      this.$http.get('/common/BaseCodeAction_getBaseCode2CombSelect.do?codename=KJBB_BSQX').then((data) => {
        if (data) {
          this.kjbbBsqxList = JSON.parse(JSON.stringify(data).replace(/ID/g, 'key').replace(/MC/g, 'value'))
        }
      })
    },
    getDatabase() {
      this.$http.get('/common/BaseCodeAction_getBaseCode2CombSelect.do?codename=DM_SJKMC').then((data) => {
        if (data) {
          this.dataBaseList = JSON.parse(JSON.stringify(data).replace(/ID/g, 'key').replace(/MC/g, 'value'))
        }
      })
    },
    getCwkjzd() {
      this.$http.get('/common/BaseCodeAction_getBaseCode2CombSelect.do?codename=DM_SYKJZD').then((data) => {
        if (data) {
          this.cwkjzdList = JSON.parse(JSON.stringify(data).replace(/ID/g, 'key').replace(/MC/g, 'value'))
        }
      })
    },
    getTxff() {
      this.$http.get('/common/BaseCodeAction_getBaseCode2CombSelect.do?codename=DM_DZYHPTXFF').then((data) => {
        if (data) {
          this.txffList = JSON.parse(JSON.stringify(data).replace(/ID/g, 'key').replace(/MC/g, 'value'))
        }
      })
    },
    getCbhsffDmList() {
      this.$http.get('/common/BaseCodeAction_getBaseCode2CombSelect.do?codename=DM_CBHSFF').then((data) => {
        if (data) {
          this.cbhsffDmList = JSON.parse(JSON.stringify(data).replace(/ID/g, 'key').replace(/MC/g, 'value'))
        }
      })
    },
    getZjffBig() {
      this.$http.get('/common/BaseCodeAction_getBaseCode2CombSelect.do?codename=DM_ZJFF_DL').then((data) => {
        if (data) {
          this.zjffBig = JSON.parse(JSON.stringify(data).replace(/ID/g, 'key').replace(/MC/g, 'value'))
        }
      })
    },
    getDM_KJBBMC() {
      var url = "/common/BaseCodeAction_getBaseCodeData.do?codename=DM_KJBBMC";
      this.$http.get(url).then((data) => {
        this.DM_KJBBMC = data;
      })
    },
    zjffChange(val) {
      let url = "/common/BaseCodeAction_getBaseCode2CombSelect3.do?codename=DM_ZJFF&dlValue=" + val + "&dlName=ZJFF_DL_DM";
      this.$http.get(url).then((data) => {
        if (data) {
          this.zjffSmall = JSON.parse(JSON.stringify(data).replace(/ID/g, 'key').replace(/MC/g, 'value'))
        }
      })
    },
    showCwbbxx(val) {
      this.DM_KJBBMC.forEach((item) => {
        if (item.DM == val) {
          this.formData['kjbb'] = item.KJBB;
          this.formData['sbbDm'] = item.KJBB_DM;
          return false;
        }
      })
    },
    getSelectorTxt() { //生成下拉框显示值到提交数据表单
      [{
        list: this.cwkjzdList,
        key: 'cwkjzdDm'
      }, {
        list: this.txffList,
        key: 'dzyhtxDm'
      }, {
        list: this.zjffBig,
        key: 'zjffDlDm'
      }, {
        list: this.zjffSmall,
        key: 'zjffDm'
      }, {
        list: this.kjbbBsqxList,
        key: 'kjbbBsqx'
      }, {
        list: this.cbhsffDmList,
        key: 'cbhsffDm'
      }, {
        list: this.dataBaseList,
        key: 'sjkmcDm'
      }, ].forEach((item) => {
        item.list.forEach((obj) => {
          if (obj.key == this.formData[item.key]) {
            this.formData[item.key + 'Text'] = obj.value;
            return false;
          }
        })
      })
    },
    computed: {
      ...mapState({
        nsrInfo: state => state.user.nsrInfo
      })
    },
    next() {
      this.getSelectorTxt();
      this.$router.push({
        name: 'cwkjzdbgs_step2',
        query: {
          formData: JSON.stringify(this.formData)
        }
      })
    }
  },
  beforeRouteEnter(to, from, next) {
    to.meta['fromPath'] = from.path;
    if (from.path == '/index/ywbl' || from.path == '/index') {
      to.meta['needFresh'] = true;
    } else {
      to.meta['needFresh'] = false;
    }
    next();
  },
  activated() {
    if (this.$route.meta['needFresh']) {
      this.init();
    } 
  }
}
</script>
<style lang='less'>
#cwkjzd {
  .weui-label {
    width: 160px;
  }
}
</style>
