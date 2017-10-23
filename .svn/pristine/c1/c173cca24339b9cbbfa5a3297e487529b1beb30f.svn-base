<template>
  <div class="container">
    <div class='fixedHead'>
      <v-headerbar title='发票票种核定调整明细'>
      </v-headerbar>
    </div>
    <div class="content mtHead">
      <group>
        <div>
          <x-input title='操作类型：' readonly v-model="formData.czlx"></x-input>
          <selector title='代开标志：' :options="dkData" @on-change="" readonly v-model="formData.wtdkbz"></selector>
          <x-input title='发票种类：' readonly v-model="formData.fpzlmc"></x-input>
          <!--<selector title='单张发票最高开票限额：' :options="" @on-change="zgkpxeChange"  v-model="formData.dffpzgkpxeDm"></selector>-->
          <selector title='单位：' :options="jldwData" @on-change="jldwChange" readonly v-model="formData.jldwDm"></selector>
          <!--<selector title='单张发票最高开票限额：' :options="" @on-change="zgkpxeChange([index,item.dffpzgkpxeDm])"  v-model="formData.dffpzgkpxeDm"></selector>&ndash;&gt;
          <selector title='单份发票最高开票限额特殊值：' :options="" @on-change="" readonly v-model="formData.fpme"></selector>
          <selector title='单位：' :options="" @on-change="" readonly v-model="formData.jldwDm"></selector>-->
          <x-input title='每月最高购票数量：' @on-change="myzggpslChange" v-model="formData.myzggpsl"></x-input>
          <x-input title='每次最高购票数量：' v-model="formData.mczggpsl"></x-input>
          <x-input title='持票最高数量：' v-model="formData.cpzgsl"></x-input>
          <selector title='购票方式：' :options="fpgmfsData" @on-change="fpgmfsData" readonly v-model="formData.fpgpfsDm"></selector>
        </div>
      </group>
      <div class='mt3 mb3'>
        <x-button type="primary" class='w80' action-type='button' @click.native='next()'>下一步</x-button>
      </div>
    </div>
  </div>
</template>
<script>
import {
  XButton,
  Group,
  XInput,
  Selector
} from 'vux'
import {
  mapState, //此两项是为引用缓存
  mapActions
} from 'vuex'
import wsService from '../../common/wsService'
import constant from '../../common/constant'
export default {
  components: {
    XButton,
    Group,
    XInput,
    Selector
  },
  data() {
    return {
      opType: '',
      fpzlData: [],//发票种类
      zyfpData: [],//专用发票
      fpgmfsData: [], //发票购买方式
      jldwData: [], //计量单位
      jebData:[],//金额版
      dzfpzgkpxeData:[],//单张发票最高开票限额 有
      yhxxData:[],
      dkData: [{
        'key': 'Y',
        'value': '是'
      }, {
        'key': 'N',
        'value': '否'
      }],
      formData: {
        "czlx": "调整",
        "wtdkbz": "",
        "fpzlDm": "",
        "fpzlMc":"",
        "dffpzgkpxeDm": "",
        "dffpzgkpxeMc":"",
        "fpme": "",
        "jldwDm": "",
        "jldwMc":"",
        "myzggpsl": "",
        "mczggpsl": "",
        "cpzgsl": "",
        "fpgpfsDm": ""
      }
    }
  },
  methods: {
    ...mapActions(['UPDATE_CACHE']),
    init() {
      if (this.opType == 'modify') {
        this.formData = this.ckzhbgData.filter((item, index) => {
          return index == this.$route.query.index;
        })[0];
      }
    },
    zgkpxeChange(val) {
      this.dzfpzgkpxeData.forEach((item) => {
        if (item.key == val) {
          this.formData['dffpzgkpxeMc'] = item.value;
          return false;
        }
      });
    },
    jldwChange(val) {
      this.jldwData.forEach((item) => {
        if (item.key == val) {
          this.formData['jldwMc'] = item.value;
          return false;
        }
      });
    },
    fpgmfsData(val) {
      this.fpgmfsData.forEach((item) => {
        if (item.key == val) {
          this.formData['fpgmfsMc'] = item.value;
          return false;
        }
      });
    },
    myzggpslChange(val) {
      let self = this;
      let cpzgsl = self.formData.cpzgsl;
      let mczggpsl = self.formData.mczggpsl;
      if(val != "" && val != undefined){
        let n = Number(val);
        if (isNaN(n)){
          self.$alert("每月最高购票数量必须为数字！");
          self.myzggpsl = "";
          return ;
        }


      }
    },
    getYhxx(){
      let self = this;
      self.$http.post('/fp/ptfpsyAction_queryFphdxx.do', {}, {
        'Content-Type': 'application/x-www-form-urlencoded;'
      }).then(function(result) {
        if (result.success) {
          let initxx = result.data;
          let gprGrid = initxx.gprxx; //购票人信息
          let hdxxGrid = initxx.pzhdxx.pzhdxxGridlb; //核定信息
          let zje = initxx.defplqje;
          let isXefp = result.data.nsrzgrd.isXefp;
          if(isXefp=="Y"){//过滤出专用发票
            let nsrzgdm = result.data.nsrzgrd.nsrzgdm;
            for(let i=0; i<self.fpzlData.length; i++){
              if(self.fpzlData[i].ZPPZ_DM=="1" || self.fpzlData[i].ZPPZ_DM=="2" ){
                self.zyfpData.push(fpzlData[i]);//专用发票
              }
            }
          }
          //外出经营有效期暂时不需要展示
          for(let i=0; i<hdxxGrid.length;i++){
            if(hdxxGrid[i].cpzgsl!=""){
              hdxxGrid[i].cpzgsl = parseFloat(hdxxGrid[i].cpzgsl).toFixed(0);
            }
            if(hdxxGrid[i].mczggpsl!=""){
              hdxxGrid[i].mczggpsl = parseFloat(hdxxGrid[i].mczggpsl).toFixed(0);
            }
            if(hdxxGrid[i].myzggpsl!=""){
              hdxxGrid[i].myzggpsl = parseFloat(hdxxGrid[i].myzggpsl).toFixed(0);
            }
          }
          self.yhxxData = hdxxGrid;
         /* //写入缓存
          self.UPDATE_CACHE({
            'fppzhdtzData': JSON.stringify(self.yhxxData)
          })*/
        }else{
          self.$alert({
            content: result.message,
            onHide() {
              self.$router.replace('/index/ywbl');
            }
          })
        }
      })
    }
    // 初始化全局常量
  },
  created: function() {
    this.opType = this.$route.query.opType;
    let dzfpzgkpxeData = this.$route.query.dzfpzgkpxeData;
    this.dzfpzgkpxeData = JSON.parse(dzfpzgkpxeData);
    let jldwData = this.$route.query.jldwData;
    this.jldwData = JSON.parse(jldwData);
    let fpgmfsData = this.$route.query.fpgmfsData;
    this.fpgmfsData = JSON.parse(fpgmfsData);
    this.init();
  },
  computed: {
    ...mapState({
      ckzhbgData: state => JSON.parse(state.cache.fppzhdtzData) || []
    })
  }
}
</script>
<style>
  .weui-select{
    width: 100px;
    position: absolute;
    right: 0;
    top: 0;
  }
</style>
