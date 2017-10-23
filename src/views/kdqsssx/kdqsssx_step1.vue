<template>
  <div class="container" id="kdqsssx">
    <div class="fixedHead">
      <v-headerbar title='跨区域涉税事项报告'></v-headerbar>
    </div>
    <div class="content mtHead">
      <group>
        <cell title="纳税人识别号：" :value="formData.nsrsbh"></cell>
        <cell title="纳税人名称：" :value="formData.nsrmc"></cell>
        <cell title="登记注册类型：" :value="formData.djzclxMc"></cell>
        <cell title="税务登记地：" :value="formData.swdjd"></cell>
        <x-input title="跨区域涉税事项联系人：" v-model="formData.lxr"></x-input>
        <x-input title="联系人座机：" v-model="formData.lxdh"></x-input>
        <x-input title="联系人手机：" v-model="formData.lxrsj"></x-input>
        <x-input title="经办人：" v-model="formData.jbr"></x-input>
        <x-input title="经办人座机：" v-model="formData.jbrzj"></x-input>
        <x-input title="经办人手机：" v-model="formData.jbrsj"></x-input>
        <popup-picker title="跨区域经营地行政区划：" @on-change="changeXzqh" :data="addressData" v-model="wcjydxzqh" :columns="3" :display-format='formatXzqh'></popup-picker>
        <x-input title="跨区域经营地乡镇街道：" v-model="formData.wcjydxxdz"></x-input>
        <cell title="经营方式：" :value="formData.jyfs" @click.native="showPopup = true" is-link></cell>
        <x-input title="申请人：" v-model="formData.sqr"></x-input>
      </group>
      <div class='mt3 mb3'>
        <x-button type="primary" class='w80' action-type='button' @click.native='next()'>下一步</x-button>
      </div>
    </div>
    <div>
      <popup v-model="showPopup" height='40%'>
        
        <checklist :options="jyfsList" v-model="formData.jyfs"></checklist>
      </popup>
    </div>
  </div>
</template>
<script>
import {
  PopupPicker,
  Group,
  Cell,
  XInput,
  XButton,
  XAddress,
  ChinaAddressV2Data,
  Popup,
  Checklist
} from 'vux';
import {
  mapState
} from 'vuex'
export default {
  components: {
    PopupPicker,
    Group,
    Cell,
    XInput,
    XButton,
    XAddress,
    ChinaAddressV2Data,
    Popup,
    Checklist
  },
  data() {
    return {
      xzqhList: [{
        name: '',
        value: '-1'
      }, {
        name: '',
        value: '-2',
        parent: '-1'
      }, {
        name: '',
        value: '-3',
        parent: '-2'
      }],
      wcjydxzqh: [],
      jyfsList: [{
        "key": "05",
        "value": "加工"
      }, {
        "key": "07",
        "value": "批发"
      }, {
        "key": "08",
        "value": "零售"
      }, {
        "key": "09",
        "value": "批零兼营"
      }, {
        "key": "10",
        "value": "零批兼营"
      }, {
        "key": "17",
        "value": "修理修配"
      }, {
        "key": "18",
        "value": "劳务"
      }, {
        "key": "19",
        "value": "建筑安装"
      }, {
        "key": "20",
        "value": "装饰修饰"
      }, {
        "key": "33",
        "value": "转让无形资产"
      }, {
        "key": "34",
        "value": "销售不动产"
      }, {
        "key": "99",
        "value": "其他"
      }],
      showPopup: true,
      addressData: ChinaAddressV2Data,
      formData: {
        nsrsbh: '',
        nsrmc: '',
        swdjd: '',
        djzclxDm: '',
        djzclxMc: '',
        swdjd: '',
        lxr: '',
        lxdh: '',
        lxrsj: '',
        jbr: '',
        jbrzj: '',
        jbrsj: '',
        wcjydxzqh: '',
        wcjydxxdz: '',
        jyfs: '',
        sqr: ''
      }
    }
  },
  methods: {
    init() {
      this.formData.nsrsbh = this.nsrInfo.nsrsbh;
      this.formData.nsrmc = this.nsrInfo.nsrmc;
      this.formData.djzclxMc = this.nsrInfo.djzclxMc;
      this.formData.djzclxDm = this.nsrInfo.djzclxDm;
      this.formData.swdjd = this.nsrInfo.scjydz;
      this.getXzqh();
      for (let i = 0; i < this.addressData.length; i++) {
        if (this.addressData[i].parent == '710000' || this.addressData[i].parent == '810000' || this.addressData[i].parent == '820000') {
          console.log(this.addressData[i])
          this.addressData.splice(i, 1);
          i--;
        }
      }
      this.addressData.push({
        "parent": "",
        "value": "710000",
        "name": "台湾省"
      });
      this.addressData.push({
        "parent": "",
        "value": "810000",
        "name": "香港特别行政区"
      });
      this.addressData.push({
        "parent": "",
        "value": "820000",
        "name": "澳门特别行政区"
      });
      this.addressData.push({
        "parent": "710000",
        "value": "-1",
        "name": "-"
      });
      this.addressData.push({
        "parent": "810000",
        "value": "-2",
        "name": "-"
      });
      this.addressData.push({
        "parent": "820000",
        "value": "-3",
        "name": "-"
      });
      this.addressData.push({
        "parent": "-1",
        "value": "-1",
        "name": "-"
      });
      this.addressData.push({
        "parent": "-2",
        "value": "-2",
        "name": "-"
      });
      this.addressData.push({
        "parent": "-3",
        "value": "-3",
        "name": "-"
      });
    },
    getXzqh() {
      /*this.$http.get('/common/BaseCodeAction_getBaseCodeTree.do?codename=DM_GY_QGXZQH').then((result) => {
        /* this.xzqhList = this.xzqhList.concat(JSON.parse(JSON.stringify(result).replace(/PID/g, 'parent').replace(/ID/g, 'value').replace(/MC/g, 'name').replace(/"parent":"",/g,'')))*/
      /* let arr = ['110000', '120000']
        result.forEach((item) => {
          this.xzqhList.push({
            name: item.MC,
            value: item.ID,
            parent: item.PID
          })
          if (arr.indexOf(item.PID) != -1) {
            this.xzqhList.push({
              name: '',
              value: '',
              parent: item.ID
            })
          }
        })
      })*/
    },
    formatXzqh(val, name) {
      if (name) {
        let nameArr = name.split(' ');
        if (nameArr[2] == '-') {
          return nameArr[0]
        }
        return nameArr.length > 2 && nameArr[2] ? nameArr[2] : nameArr.length > 1 && nameArr[1] ? nameArr[1] : nameArr[0];
      } else {
        return '';
      }
    },
    changeXzqh(val) {
      this.formData['wcjydxzqh'] = val[2] ? val[2] : val[1] ? val[1] : val[0];
      let valArr = ['-1', '-2', '-3']
      if (valArr.indexOf(this.formData['wcjydxzqh']) != -1) {
        this.formData['wcjydxzqh'] = val[0];
      }
    },
    next() {
      console.log(this.formData)
    }
  },
  computed: {
    ...mapState({
      nsrInfo: state => state.user.nsrInfo
    })
  },
  created() {
    this.init();
  }
}
</script>
<style lang="less">
#kdqsssx {
  label.vux-label {
    width: 140px;
  }
}
</style>
