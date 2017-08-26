<template>
  <div class='container'>
    <div class='fixedHead'>
      <v-headerbar title='往期申报查询'></v-headerbar>
    </div>
    <div class="content mt_head">
      <section class="item" v-for='item in items'>
        <h4><label>申报表：</label>{{getName(item.SBZLCODE)}}</h4>
        <p>
          <label>税款所属期：</label>{{item.sksssqQ +'至'+ item.sksssqZ}}</p>
        <div class='bottom-div'>
          <span>状态：</span>
          <label>{{item.ysbbbz === 'Y'?'已申报':'未申报'}}</label>
          <x-button type='primary' class='btn' mini @click.native='goSb(item)'>去申报</x-button>
        </div>
      </section>
    </div>
    <v-nodata v-if='items.length===0'></v-nodata>
  </div>
</template>
<script>
import {
  XButton
} from 'vux'
import {mapState} from 'vuex'
import sbcommon from '../../common/sbcommon'
export default {
  components: {
    XButton
  },
  data() {
    return {
      items: [],
      sbzlArr:[]
    }
  },
  methods:{
    goSb(item){
        let self = this;
        if(item.ysbbbz === 'N' && item.SBZLCODE === '10101'){
            this.$alert('请到增值税一般纳税人网上申报系统进行申报，注意在申报期内及时报送当月的财务报表，避免逾期处罚！');
            return;
        }else{
            self.$confirm({
                content:'您本属期税（费）种申报已经逾期，按照《中华人民共和国税收征收管理法》的相关规定，请您完成申报后前往办税服务厅办理税务行政处罚的相关事宜。',
                onConfirm(){
                    self.wqSbhandle(item.SBZLCODE,item.sksssqZ);
                }
            })
        }
    },
    getName(sbzldm){
      return sbcommon.getSzText(sbzldm,this.sbzlArr);
    },
    wqSbhandle(sbzldm,sksssqZ){
      switch (sbzldm) {
        case '10103':
        let param = '?isWqsb=true&sbny='+new Date(new Date(sksssqZ).setDate(new Date(sksssqZ).getDate()+1)).format('yyyy-MM');
          this.$router.push('/xgmsb_step1'+param);
          break;
        default:
          this.$alert('微信暂不支持该税种逾期申报，请通过其他渠道进行申报！');
          break;
      }
    }
  },
  computed:{
    ...mapState({
       wqHdxxData: state => {
        return state.hdxx.wqHdxxData ? JSON.parse(state.hdxx.wqHdxxData) : null
      }
    })
  },
  created(){
    var self = this;
    sbcommon.getSbzlmc().then(function(result){
      self.sbzlArr = result;
      if(self.wqHdxxData){
      self.items = self.wqHdxxData.HdxxResponseVo.SBZL;
    }
    })
  }
}
</script>
<style lang='less' scoped>
.container {
  .content {
    .item {
      &:not(:first-child){
         margin-top: 1rem;
      }
      background: #DFE4EB;
      padding: 0.5rem;
      .bottom-div {
        margin-top: 0.3rem;
        padding: 0.3rem 0.5rem 0.3rem 0;
       /*  border-top: 1px solid #ccc; */
        .btn {
          float: right;
        }
      }
    }
  }
}
</style>
