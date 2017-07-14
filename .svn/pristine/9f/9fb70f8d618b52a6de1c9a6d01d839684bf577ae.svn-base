<template>
  <div class="container">
    
    <div class="app_head">
      <v-headerbar title='查询条件'></v-headerbar>
    </div>
    
    <div class="content content-body">
      <!-- 条件 -->
     
        <group title=''>
          
          
          <div class="vux-x-input weui-cell">
            <div class="weui-cell__hd"><!---->
              <label class="weui-label" style="width: 7em;">税款所属期起</label> <!----></div>
            <div class="weui-cell__bd weui-cell__primary">
              <input autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" type="date"
                     class="weui-input" v-model="queryData.skssqq"> <!----> <!----> <!----> <!----></div>
          </div>
          
          <div class="vux-x-input weui-cell">
            <div class="weui-cell__hd"><!---->
              <label class="weui-label" style="width: 7em;">税款所属期止</label> <!----></div>
            <div class="weui-cell__bd weui-cell__primary">
              <input autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" type="date" class="weui-input"
                     v-model="queryData.skssqz"></div>
          </div>
          
        </group>
     
      <x-button type="primary" class='w80 btn' action-type='button' @click.native='search()'>查询</x-button>
    
    
    </div>
  
  </div>
</template>

<script>
  import {Group, XButton } from 'vux'
  
  export default {
    components: {
      Group,
      XButton
    },
    data(){
      return {
        queryData: {
        	skssqq: '',
          skssqz: '',
        }
      }
    },
    methods: {
      search: function(){
        var $this = this;
        if(!$this.queryData.skssqq || !$this.queryData.skssqz){
          this.$vux.alert.show({
            title: '',
            content: '查询日期不能为空'
          });
          return;
        }
        if( +new Date( $this.queryData.skssqq ) > +new Date( $this.queryData.skssqz ) ){
          this.$vux.alert.show({
            title: '',
            content: '起始日期不能大于结束日期'
          });
          return;
        }
        $this.$store.state.skqueryData = $this.queryData;
        $this.$router.push({
          path:'/yjkResult'
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
