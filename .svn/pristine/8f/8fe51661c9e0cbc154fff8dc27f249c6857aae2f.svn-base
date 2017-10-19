<template>
  <div class="container">
    <div class='fixedHead'>
      <v-headerbar title='存款账户账号报告'>
      </v-headerbar>
    </div>
    <div class="content mtHead">
      <group v-for="item in formData">
        <cell title="缴税账号：" :value="item.sxjszhbz == 'Y'?'是':'否'" primary='title'></cell>
        <cell title="账户名称：" :value="item.zhmc"></cell>
        <cell title="银行种类：" :value="item.yhhbMc"></cell>
        <cell title="银行账号：" :value="item.yhzh"></cell>
      </group>
      <div class='mt3 mb3'>
        <x-button type="primary" class='w80' action-type='button' @click.native='submit()'>提交</x-button>
      </div>
    </div>
  </div>
</template>
<script>
import {
  Group,
  XInput,
  XButton,
  Cell,
  CellBox
} from 'vux'
import {
  mapState
} from 'vuex'
export default {
  components: {
    Group,
    XInput,
    XButton,
    Cell,
    CellBox
  },
  data() {
    return {
      formData: [],
      sqxh: ''
    }
  },
  methods: {
    submit() {
      let self = this;
      this.$confirm({
        content: '您确定要提交？',
        onConfirm() {
          let requestDate = {
            nsrxx: JSON.stringify(self.nsrInfo),
            yhxxData: JSON.stringify(self.formData)
          }
          let signData = {
            data: JSON.stringify(requestDate),
            sqxh: self.sqxh,
            zlsfqq: 'N',
            sjhm: '',
            sjYzm: '',
            yzmJybz: "Y"
          }
          let url = "/swdj/djYhxx_saveYhxx.do?rn=" + Math.random();
          self.$http.post(url, signData, {
            'Content-Type': 'application/x-www-form-urlencoded;'
          }).then(function(result) {
            if (result.success) {
              self.$alert({
                content: '尊敬的纳税人：您好！您的申请已经提交成功，您可以通过电子税务局查看文书结果!',
                onHide() {
                  self.$router.push('/index/ywbl')
                }
              })
            } else {
              self.$alert('您的申请提交失败，请稍后再试！');
              console.log(result.message);
            }
          })
        }
      })
    }
  },
  computed: {
    ...mapState({
      nsrInfo: state => state.user.nsrInfo
    })
  },
  created() {
    let param = JSON.parse(this.$route.query.formData);
    this.sqxh = param.sqxh
    this.formData = JSON.parse(param.step1Data);
  }
}
</script>
