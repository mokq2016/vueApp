<template>
  <div class="container">
    <div class='fixedHead'>
      <v-headerbar title='存款账户帐号报告信息'>
      </v-headerbar>
    </div>
    <div class="content mtHead">
      <group >
        <div>
           <cell title='账户名称' :value='item.zhmc'></cell>
           <cell title='银行种类' :value='changeMc(item.yhhbDm)'></cell>
           <cell title='开户银行' :value='khyhMc'></cell>
           <cell title='银行账户' :value='item.yhzh'></cell>
           <cell title='银行开户登记证号' :value='item.yhkhdjzh'></cell>
           <cell title='登记证书发证日期' :value='item.ffrq'></cell>
           <cell title='开户时间' :value='item.khrq'></cell>
           <cell title='纳税账户' :value='sxjszhbz'></cell>
        </div>
      </group>
      <div class='mt3'>
      <x-button type="primary" class="w80" action-type='button' @click.native='goBack()'>返回</x-button>
      </div>
    </div>
  </div>
</template>
<script>
  import {
    Group,
    Cell,
    XButton
  } from 'vux'
  import sbcommon from '../../common/sbcommon'
  export default {
    components: {
      Group,
      Cell,
      XButton
    },
    data() {
      return {
        item:{},
        yhzhxzData:[],//银行账户信息
        yhhbData:[],//银行行别
        hbszData:[],//币种
        khyhData:[],//开户银行列表
        khyhMc:'',//开户银行名称
        sxjszhbz:''//缴税账号
      }
    },
    methods: {
      goBack(){
        this.$router.replace('/ckzhzhbg');
      },
      init(){
        //JSON.parse
          /*let item = this.$route.fullPath.split('?routeParams=')[1];*/
        this.item = JSON.parse(this.$route.query.routeParams);
        this.initGlobalConstants();// 初始化全局常量
      },
      // 初始化全局常量
      initGlobalConstants(){
        let self = this;
        let yhhbDm = this.item.yhhbDm;
        let xzqhszDm = this.item.xzqhszDm;

        //获取银行账户性质
        self.$http.post('/common/BaseCodeAction_getBaseCode2CombSelect.do?codename=DM_GY_YHZHXZ', {},{
          'Content-Type': 'application/x-www-form-urlencoded;'
        }).then(function(result) {
          if (result.length > 0) {
            self.yhzhxzData = result;
          }
        })

        //获取银行行别
        self.$http.post('/common/BaseCodeAction_getBaseCode2CombSelect2.do?codename=DM_GY_YHHB', {},{
          'Content-Type': 'application/x-www-form-urlencoded;'
        }).then(function(result) {
          if (result.length > 0) {
            self.yhhbData = result;
          }
        })

        //获取币种
        self.$http.post('/common/BaseCodeAction_getBaseCode2CombSelect.do?codename=DM_GY_HB', {},{
          'Content-Type': 'application/x-www-form-urlencoded;'
        }).then(function(result) {
          if (result.length > 0) {
            self.hbszData = result;
          }
        })

        //获取银行名称
        self.$http.get('/common/BaseCodeAction_getBaseCode2CombSelect4.do?codename=DM_GY_YHYYWD&dlName=yhhb_dm&dlValue='
          + yhhbDm + '&dlName2=XZQHSZ_DM&dlValue2=' + xzqhszDm, {},{
          'Content-Type': 'application/x-www-form-urlencoded;'
        }).then(function(result) {
          if (result.length > 0) {
            self.khyhData = result;
          }
        })

        if(this.item.sxjszhbz == 'N'){
          this.sxjszhbz = '否';
        }else if(this.item.sxjszhbz == 'Y'){
          this.sxjszhbz = '是';
        }
      },
      //获取银行种类名称
      changeMc(yhhbDm){
        for (var i = 0; i < this.khyhData.length; i++) {
          if (this.khyhData[i].ID == this.item.yhyywdDm) {
            this.khyhMc = this.khyhData[i].MC;
            break;
          }
        }

        let yhhbMc = "";
        for (var i = 0; i < this.yhhbData.length; i++) {
          if (this.yhhbData[i].ID == yhhbDm) {
            yhhbMc = this.yhhbData[i].MC;
            break;
          }
        }
        return yhhbMc;
      }

       /*getKhyhmc(){
        let that = this;
        let yhhbDm = this.item.yhhbDm;
        let xzqhszDm = this.item.xzqhszDm;
        let yhyywdDm = this.item.yhyywdDm; //用该字段找到value值开户银行名称
        let khyhMc = "";//开户银行名称
        //获取银行名称
         this.$http.get('/common/BaseCodeAction_getBaseCode2CombSelect4.do?codename=DM_GY_YHYYWD&dlName=yhhb_dm&dlValue='
          + yhhbDm + '&dlName2=XZQHSZ_DM&dlValue2=' + xzqhszDm, {},{
          'Content-Type': 'application/x-www-form-urlencoded;'
        }).then(function(result) {
          that.khyhData = result;
        })
        for (var i = 0; i < this.khyhData.length; i++) {
          if (this.khyhData[i].ID == yhyywdDm) {
            khyhMc = this.khyhData[i].MC;
            break;
          }
        }
        return khyhMc;
      }*/
    },
    created: function() {
      this.init();
    }
  }
</script>
