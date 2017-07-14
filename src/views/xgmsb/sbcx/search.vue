<template>
  <div class="container" id="">
    <div style='position: fixed;width: 100%;height: 3.1rem'>
      <v-headerbar title='查询结果'></v-headerbar>
    </div>
    
    <div class="content content-body">
      <!-- 条件 -->
     
        <group title=''>
          
          <selector title="税种" v-model="queryData.select" :options="selectArr"></selector>
          
          <div class="vux-x-input weui-cell">
            <div class="weui-cell__hd"><!---->
              <label class="weui-label" style="width: 7em;">申报日期起</label> <!----></div>
            <div class="weui-cell__bd weui-cell__primary">
              <input autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" type="date"
                     class="weui-input" v-model="queryData.sbrqq"> <!----> <!----> <!----> <!----></div>
          </div>
          
          <div class="vux-x-input weui-cell">
            <div class="weui-cell__hd"><!---->
              <label class="weui-label" style="width: 7em;">申报日期止</label> <!----></div>
            <div class="weui-cell__bd weui-cell__primary">
              <input autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" type="date" class="weui-input"
                     v-model="queryData.sbrqz"></div>
          </div>
          
          
          <div class="vux-x-input weui-cell">
            <div class="weui-cell__hd"><!---->
              <label class="weui-label" style="width: 7em;">所属属期起</label> <!----></div>
            <div class="weui-cell__bd weui-cell__primary">
              <input autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" type="date"
                     class="weui-input" v-model="queryData.sssqq"> <!----> <!----> <!----> <!----></div>
          </div>
          
          <div class="vux-x-input weui-cell">
            <div class="weui-cell__hd"><!---->
              <label class="weui-label" style="width: 7em;">所属属期止</label> <!----></div>
            <div class="weui-cell__bd weui-cell__primary">
              <input autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" type="date"
                     class="weui-input" v-model="queryData.sssqz"> <!----> <!----> <!----> <!----></div>
          </div>
        
        </group>
     
      <x-button type="primary" class='w80 btn' action-type='button' @click.native='search()'>查询</x-button>
    
    
    </div>
  
  </div>
</template>

<script>
  import {Group, XButton, Selector} from 'vux'
  
  export default {
    components: {
      Group,
      XButton,
      Selector
    },
    data(){
      return {
        selectArr: [{key: '01', value: '增值税'}, {key: '02', value: '减免税'}],
  
        queryData: {
          select: '01',
          sbrqq: '',
          sbrqz: '',
          sssqq: '',
          sssqz: '',
        }
      }
    },
    methods: {
      search: function(){
        var $this = this;
        if(!$this.queryData.sbrqq || !$this.queryData.sbrqz || !$this.queryData.sssqq || !$this.queryData.sssqz){
          this.$vux.alert.show({
            title: '',
            content: '查询日期不能为空'
          });
          return;
        }
        
        if( +new Date( $this.queryData.sbrqq ) > +new Date( $this.queryData.sbrqz ) ){
          this.$vux.alert.show({
            title: '',
            content: '申报起始日期不能大于结束日期'
          });
          return;
        }
  
        if( +new Date( $this.queryData.sssqq ) > +new Date( $this.queryData.sssqz ) ){
          this.$vux.alert.show({
            title: '',
            content: '所属起始日期不能大于结束日期'
          });
          return;
        }
        
        $this.$store.state.sbqueryData = this.queryData;
        $this.$router.push({
          path:'/sbResult'
        });
        
      }
    }
  }
</script>


<style scoped="">
  .btn {
    margin-top: 20px;
  }
</style>
