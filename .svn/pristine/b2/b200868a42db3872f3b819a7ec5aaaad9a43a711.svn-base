<template>
  <div class="container">
    <div class='fixedHead'>
      <v-headerbar title='财务会计制度及核算软件备案报告书'>
      </v-headerbar>
      <div class="content">
        <form-preview :header-label="'申请表'" header-value="财务会计制度及核算软件备案报告书" :body-items="list" :footer-buttons="buttons"></form-preview>
      </div>
    </div>
  </div>
</template>
<script>
import {
  FormPreview
} from 'vux'
export default {
  components: {
    FormPreview
  },
  data() {
    return {
      formData: {

      },
      list: [{
        label: '财务会计制度：',
        value: ''
      }, {
        label: '低值易耗品摊销方法：',
        value: ''
      }, {
        label: '折旧方法：',
        value: ''
      }, {
        label: '成品核算方法：',
        value: ''
      }, {
        label: '会计报表名称：',
        value: ''
      }, {
        label: '会计年度：',
        value: ''
      }, {
        label: '软件名称：',
        value: ''
      }, {
        label: '数据库名称：',
        value: ''
      }, {
        label: '软件启用时间：',
        value: ''
      }, {
        label: '版本号：',
        value: ''
      }],
      buttons: [{
        style: 'default',
        text: '返回',
        onButtonClick: (name) => {
          this.$router.go(-1);
        }
      },
      {
        style: 'primary',
        text: '点击事件',
        onButtonClick: (name) => {
          console.log(this)
        }
      }]
    }
  },
  methods: {
    init() {
      let keyArr = ['cwkjzdDmText',
        'dzyhtxDmText',
        'zjffDlDmText',
        'cbhsffDmText',
        'kjbb',
        'kjnd',
        'rjmcDm',
        'sjkmcDmText',
        'qyrq',
        'rjbbDm'
      ]
      this.list.forEach((item, index) => {
        item.value = this.formData[keyArr[index]]
      })
    }
  },
  created() {
    let param = JSON.parse(this.$route.query.formData);
    this.sqxh = param.sqxh
    this.formData = JSON.parse(param.step1Data);
    console.log(this.formData)
    this.init();
  }
}
</script>
