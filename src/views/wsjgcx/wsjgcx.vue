<template>
  <div class="container">
    <div class='fixedHead'>
      <v-headerbar title='网上办理文书结果查询'></v-headerbar>
    </div>
    <div class="content mt_head">
      <group>
        <popup-picker title="事项名称：" v-model='sxMc' @on-change='getSxdm' :data='items' :columns="2" :column-width='[1/3]' ref="picker1" :display-format='getSxMc'></popup-picker>
        <selector title="事项类型：" v-model='formData.sxlxDm' :options='sxlxArr'></selector>
        <selector title="办理状态：" v-model='formData.blztDm' :options='blztArr'></selector>
        <datetime v-model="formData.sqrqq" title="申请日期起："></datetime>
        <datetime v-model="formData.sqrqz" title="申请日期止："></datetime>
      </group>
      <div class='mt3'>
        <x-button class='w80' type='primary' @click.native='query()'>查询</x-button>
      </div>
    </div>
  </div>
</template>
<script>
import {
  Group,
  PopupPicker,
  Selector,
  XButton,
  Datetime
} from 'vux';
import {mapState} from 'vuex'
export default {
  components: {
    Group,
    PopupPicker,
    Selector,
    XButton,
    Datetime
  },
  data() {
    return {
      items: [],
      sxMc:[],
      formData: {
        sxDm:'',
        sxlxDm: '',
        blztDm: '',
        sqrqq: '',
        sqrqz: ''
      },
      sxlxArr: [{
        key: "N",
        value: "全流程无纸化"
      }, {
        key: "Y",
        value: "预申请"
      }],
      blztArr: [{
        value: '待审查资料',
        key: '00'
      }, {
        value: '已办结待签收',
        key: '01'
      }, {
        value: '不予受理',
        key: '02'
      }, {
        value: '待补正资料',
        key: '06'
      }, {
        value: '正在受理，已发审核部门审批，请耐心等待审批结果',
        key: '03'
      }, {
        value: '结束',
        key: '11'
      }]
    }
  },
  methods: {
    init() {
      let self = this;
      this.$http.get('/common/BaseCodeAction_getWssxTree.do').then((result) => {
        result.forEach((item) => {
          self.items.push({
            name: item.MC,
            value: item.ID,
            parent: 0
          });
          if (item.children.length > 0) {
            item.children.forEach((child) => {
              self.items.push({
                name: child.MC,
                value: child.ID,
                parent: item.ID
              });
            })
          } else {
            self.items.push({
              name: '',
              value: '',
              parent: item.ID
            });
          }
        })
      })
    },
    getSxdm(value) {
      if(value[1]){
        this.formData['sxDm'] = value[1];
      }else{
        this.formData['sxDm'] = value[0];
      }
    },
    getSxMc(value,name){
      if(name){
        let nameArr = name.split(' ');
        console.log(nameArr)
        return nameArr.length>1 && nameArr[1]?nameArr[1]:nameArr[0];
      }else{
        return '';
      }
    },
    query() {
      let param = this.formData;
      param.djxh = this.nsrInfo.djxh;
      this.$router.push({
        name:'wscxResult',
        params: {
          param: JSON.stringify(param)
        }
      })
    }
  },
  computed:{
    ...mapState({
      nsrInfo: state => state.user.nsrInfo
    })
  },
  created() {
    this.formData.sqrqq = new Date(new Date().setMonth(new Date().getMonth()-3)).format('yyyy/MM/dd');
    this.formData.sqrqz = new Date().format('yyyy/MM/dd');
    this.init();
  }
}
</script>
