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
            <label>税种</label> <span></span>
          </div>
          <div class="line">
            <label>申报日期</label> <span>{{ item.sbrq }}</span>
          </div>
          <div class="line">
            <label>申报状态</label> <span>{{ item.sbztms }}</span>
          </div>
          <div class="line">
            <label>应补退税额</label> <span></span>
          </div>
          <div class="line text-right">
            
            <x-button v-if="item.sbztDm != '0000'" :con="44" mini type="primary" class='btn' action-type='button' @click.native='showPlugin(index)'>失败原因</x-button>
            <x-button v-if="item.sbztDm == '0000'" mini action-type='button' @click.native='goJk()'>去缴款</x-button>
            
          </div>
        </div>
        
        <x-button mini action-type='button' @click.native='goJk()'>去缴款</x-button>
        
      </div>
      <!-- end -->
    
    </div>
  
  </div>
</template>

<script>
  import { Group , XButton , Alert } from 'vux'
  
  export default {
    components: {
      Group,
      XButton,
      Alert
    },
    data(){
      return {
        queryData: {},
        select: '01',
        noSearch: true,  //是否搜索
        sbrqq: '',
        sbrqz: '',
        sssqq: '',
        sssqz: '',
        selectArr: [{key: '01', value: '增值税'}, {key: '02', value: '减免税'}],
        searchResult: []
      }
    },
    methods: {
      showPlugin: function(index){  //弹窗提示失败信息
        this.$vux.alert.show({
          title: '',
          content: 'ssssssssssss'
        })
      },
  
      goJk: function(){
      	var $this = this;

        $this.$router.push({
          path:'/djklist',
          query: {
            sssqq: $this.queryData.sssqq.replace(/-/g, ""),
            sssqz: $this.queryData.sssqz.replace(/-/g, "")
          }
        });
      },
  
      queryFailure: function(){  //弹窗提示失败信息
        var $this = this;
        $this.$vux.alert.show({
          title: '',
          content: '查询失败，请检查查询条件',
          onHide () {
            $this.$router.push({
              path:'/sbcx'
            });
          }
        })
      }
    },
  
    mounted: function(){
    	var $this = this;
      $this.queryData = $this.$store.state.sbqueryData;
      var url = '/sb/sbcommon_querySbqkSbxxBySbztAndSbny.do';
      var data = {
        djxh: '',
        zsxmDm : $this.queryData.select,
        sbrqq : $this.queryData.sbrqq.replace(/-/g, ""),
        sbrqz : $this.queryData.sbrqz.replace(/-/g, ""),
        sssqq : $this.queryData.sssqq.replace(/-/g, ""),
        sssqz : $this.queryData.sssqz.replace(/-/g, ""),
        sbztDm: ''
      }
      console.log( $this.queryData , '$this.queryData');
      $this.$http.post( url , data ).then(function (data) {
      	if(data.success){
          $this.searchResult =  data.data ;
        }else{
          $this.queryFailure();
        }
      });
    }
  }
</script>


<style scoped="">
  .text-right{
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
