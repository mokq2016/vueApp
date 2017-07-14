<template>
  <div class="container">
    <div class="app_head">
      <v-headerbar title='查询结果'></v-headerbar>
    </div>
    
    <div class="content content-body">
      
      <!-- 这里是结果 v-if="!noSearch" -->
      <div class="result-list">
        
        <div class="result-part"  v-for="( item, index ) in searchResult">
          <a class="href-btn" v-on:click="jk()">〉</a>
          <div class="line">
            <label>{{index}}：{{ item.zsxmmc }}</label>
          </div>
          <div class="line">
            <label>正税金额</label> <span>{{ item.kkse }}</span>
          </div>
          <div class="line">
            <label>滞纳金额</label> <span>{{ item.znjfklx }}</span>
          </div>
          <div class="line">
            <label>税(费)金额合计</label> <span> {{ parseFloat(item.znjfklx) + parseFloat(item.kkse) }} </span>
          </div>
          <div class="line">
            <label>缴款期限</label> <span>{{ item.jkqx }}</span>
          </div>
          <div class="line">
            <label>应征发生日期</label> <span>{{ item.yzfsrq }}</span>
          </div>
          <div class="line">
            <label>所属时期起</label> <span>{{ item.sssqq }}</span>
          </div>
          <div class="line">
            <label>所属时期止</label> <span>{{ item.sssqz }}</span>
          </div>
          <div class="line">
            <label>税款种类</label> <span> {{ item.skzl }} </span>
          </div>
        </div>
      </div>
      <!-- end -->
    
      <!-- 缴款弹窗 -->
      <div class="jk-pop" v-show="showpop">
        <div class="inner">
          <div class="head">请选择缴税方式</div>
          <div class="box">
            <div v-bind:class="{'active': fkfs == 0}" class="part" @click="chooseFk(0)">预储账户<br />（三方协议）</div>
            <div v-bind:class="{'active': fkfs == 1}" class="part" @click="chooseFk(1)">手机微信<br />二维码支付</div>
          </div>
          <div class="footer">
            <div class="left btn"  @click="hidePop()">取消</div>
            <div class="right btn" @click="jkSubmit()">缴款</div>
          </div>
        </div>
      </div>
      
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
        showpop: false,
        fkfs: '0',
        searchResult: []
      }
    },
    methods: {
      jkSubmit: function(){  //缴款提交
        alert('提交缴款')
      },
  
      hidePop: function(){  //关闭弹窗
        this.showpop = false;
      },
  
      jk: function(){ //缴款页面
        this.showpop = true;
      },
  
      chooseFk: function( index ){
      	this.fkfs = index;
      }
    },
    
    mounted: function(){
      var $this = this;

      var data = {
        sssqq: this.$route.query.sssqq || '',
        sssqz: this.$route.query.sssqz || ''
      }
      console.log(data)
      $this.$http.post('/wyjk/wyjsAction_searchWjsJl.do', data).then(function (data) {
        if(!data.success){
          $this.$vux.alert.show({
            title: '',
            content: '获取数据失败，请稍后再试',
            onHide () {
              $this.$router.push({
                path:'/sbResult'
              });
            }
          });
          return;
        }
        //skzl
        var data = data.data.ZSXX || [];
        data.map(function(obj, index){
          obj['skzl'] = $this.getSz( obj.skzldm );
        });
        $this.searchResult = data;
        
      }, function(){
        $this.$vux.alert.show({
          title: '',
          content: '获取数据失败，请稍后再试',
          onHide () {
            $this.$router.push({
              path:'/sbResult'
            });
          }
        })
      });
    }
  }
</script>

<style scoped>
  .result-part {
    background: #fff;
    margin: 8px 0;
    border-top: 1px solid #eee;
    border-bottom: 1px solid #eee;
    padding: 7px 0px;
    position: relative;
  }
  .result-part .line {
    padding: 3px 15px;
  }
  .result-part label {
    display: inline-block;
    width: 120px;
  }
  .href-btn{
    position: absolute;
    font-size: 40px;
    width: 100%;
    text-align: right;
    line-height: 278px;
    color: #ccc;
    z-index: 10;
    right: -10px;
  }

  .jk-pop .part{
    width: 50%;
    float: left;
    box-sizing: border-box;
    border: 1px solid #fff;
  }
  .jk-pop .part.active{
    border: 1px solid #6998FF;
    box-shadow: 0px 0px 5px #D8E4FF inset;
  }
  .jk-pop{
    text-align: center;
    position: fixed;
    width: 80%;
    left: 10%;
    top: 100px;
    z-index: 1000;
  }
  .jk-pop:after{
    content: '';
    top: 0px;
    bottom: 0px;
    right: 0px;
    left: 0px;
    position: fixed;
    background: rgba(0,0,0,.4);
    z-index: 999;
  }
  .jk-pop .inner{
    position: relative;
    z-index: 9999;
    background: #fff;
    padding-top: 10px;
    border-radius: 4px;
  }
  .box{
    overflow: hidden;
    padding: 20px 12px;
  }
  .footer{
    border-top: 1px solid #ddd;
    overflow: hidden;
  }
  .footer .btn{
    float: left;
    width: 50%;
    padding: 8px 0px;
    box-sizing: border-box;
    
  }
  .footer .left{
    border-right: 1px solid #ccc;
  }
</style>
