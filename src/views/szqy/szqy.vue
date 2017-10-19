<template>
  <div class="container">
    <div>
      <v-headerbar title='税种启用'>
      </v-headerbar>
    </div>
    <div class="content">
      <div class="result-list">
        <div class='loginout-div'>
          <div><label>纳税人识别号：</label><span>{{nsrInfo.nsrsbh}}</span></div>
          <div><label>纳税人名称：</label> <span>{{nsrInfo.nsrmc}}</span></div>
        </div>
        <v-nodata v-if='Result.length===0'></v-nodata>
        <div class="result-part" v-for="item in Result">
          <div class="line">
            <label>征收项目：</label> <span>{{ item.zsxmmc }}</span>
          </div>
          <div class="line">
            <label>征收品目：</label> <span>{{item.zspmmc}}</span>
          </div>
          <div class="line">
            <label>纳税期限：</label> <span>{{ item.nsqxmc }}</span>
          </div>
          <div class="line">
            <label style="width: 120px;">认定有效期起：</label> <span>{{item.rdyxqq}}</span>
          </div>
          <div class="line">
            <label style="width: 120px;">认定有效期止：</label> <span>{{item.rdyxqz}}</span>
          </div>
        </div>
      </div>
      <div style="width:100%;text-align: center;padding: 0 8%" v-if='Result.length != 0'>
        <x-button  type="primary" class='btn' action-type='button' style="width: 43%;float: left" @click.native='szqyrq()'>设置启用日期</x-button>
        <x-button type="primary" action-type='button' style="width: 34%;float: left;margin-top: 0;margin-left: 5%;" @click.native='qy()' v-show="showqy">启用</x-button>
      </div>
      <!--<v-nodata v-if='searchResult.length===0'></v-nodata>-->
      <div class="jk-pop" v-show="showpop">
        <div class="inner">
          <div class="head">请选择启用日期</div>
          <div class="box">
            <group class="back-are">
              <selector v-model="selected" title="启用日期：" :options="selectRq"></selector>
            </group>
          </div>
          <div class="footer">
            <div class="left btn" @click="hidePop()">取消</div>
            <div class="right btn" @click="confirm()">确定</div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
  import {
    Selector,
    Group,
    XButton,
    Alert,
    Confirm
  } from 'vux'
  import {
    mapState,//此两项是为引用缓存
    mapActions
  } from 'vuex'
  export default {
    components: {
      Selector,
      Group,
      XButton,
      Alert,
      Confirm
    },
    data() {
      return {
        Result:[],
        zsxmAndText:[],
        zspmAndText:[],
        selectRq:[],
        selected:'',
        showpop:false,
        showqy:false
      }
    },
    methods: {
      getZsxm(){
        var that = this;
        that.$http.post('/common/BaseCodeAction_getBaseCodeData.do?codename=HB_DM_GY_ZSXM',{},{
          'Content-Type': 'application/x-www-form-urlencoded;'
        }).then((result) => {
          if (result.length > 0) {
            this.zsxmAndText = result;
          }
        })
      },
      getZspm(){
        var that = this;
        that.$http.post('/common/BaseCodeAction_getBaseCodeData.do?codename=HB_DM_GY_ZSPM', {},{
          'Content-Type': 'application/x-www-form-urlencoded;'
        }).then((result) => {
            if (result.length > 0) {
              this.zspmAndText = result;
            }
          })
      },
      getResult(){
        var that = this;
        that.$http.post('/szqy/SzqyAction_queryDqyszxx.do', {djxh:this.nsrInfo.djxh},{
          'Content-Type': 'application/x-www-form-urlencoded;'
        }).then((result) => {
          if (result.success) {
            this.Result = result.data;
          }else{
            this.$vux.alert.show({
              title: '',
              content: '您没有待启用的税费种信息！'
            });
          }
        })
      },
      szqyrq() {
        //增值税的启用日期为当期初或者上季初，纳税人可以自由选择，默认为当季初。
        //获得本季度开始月份
        this.showpop = true;
        if(this.selectRq.length != 2){
           this.setTime();
        }
      },
      setTime(){
        var date = new Date();
        var Month = date.getMonth();
        var sMonth = this.getSeasonStartMonth(Month);
        var sYear = date.getFullYear();
        var d1 = new Date(sYear, sMonth, 1);
        var d2 = new Date(sYear, sMonth, 1);
        d2.setMonth(d2.getMonth() - 3);
        d1 = d1.format('yyyy-MM-dd');//当季季初
        d2 = d2.format('yyyy-MM-dd');//上季季初
        this.selectRq.push(d1);
        this.selectRq.push(d2);
        this.selected =  this.selectRq[0];
      },
      confirm(){
        var that =this;
        var d3 = this.Result[0].djrqjc;//纳税人登记日期所在季初
        if(this.selected < d3){
          this.$vux.alert.show({
            title: '',
            content: '认定有效期起不能小于纳税人登记日期所在季初【'+ d3 +'】!'
          });
          return;
        }
        //把选中税种启用日期赋值Result中
        this.Result.forEach(function (obj) {
          obj.rdyxqq = that.selected;
        });
        this.showpop = false;
        this.showqy = true;
      },
      qy(){
        let self = this;
        var param = {
          qyData: JSON.stringify(this.Result)
        }
        this.$confirm({
          content: '您确定启用全部税种？',
          onConfirm() {
            self.$http.post('/szqy/SzqyAction_qy.do', param,{
              'Content-Type': 'application/x-www-form-urlencoded;'
            }).then(function(result) {
              if (result.success) {
                self.$alert({
                  content: '税种启用成功！',
                  onHide() {//点击确定后跳转到业务办理页面
                    self.$router.replace('/index/ywbl');
                  }
                });
              }else{
                self.$alert(result.message);
              }
            })
          }
        })
      },
      getSeasonStartMonth(month){
        //月份从0-11
        //1-3月
        if (month < 3) {
          return 0;
        }
        if (month < 6) {
          return 3;
        }
        if (month < 9) {
          return 6;
        }
        return 9;
      },
      hidePop: function() { //取消-关闭弹窗
        this.selected =  this.selectRq[0];
        this.showpop = false;
      },
    },
    computed: {
      ...mapState({
        nsrInfo: state => state.user.nsrInfo
      })
    },
    created: function() {
      this.getZsxm();
      this.getZspm();
      this.getResult();
    }
  }
</script>
<style scoped="">
  .text-right {
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
    width: 100px;
  }

  .loginout-div {
    border-top: 1px solid #EEEEEE;
    border-bottom: 1px solid #EEEEEE;
    margin-top: 1rem;
    background: #fff;
    padding: 0.5rem;
    box-sizing: border-box;
    text-align: left;
  }
  .select-date {
    text-align: center;
    position: fixed;
    width: 80%;
    left: 10%;
    top: 10rem;
    z-index: 1000;
    border:1px solid #DDD;
  }
  .select-date .head{
    background: #A7A2A2;
    height: 2.6rem;
    line-height: 2.6rem;
  }
  .select-date{
    background: #eee;
  }
  .jk-pop .part {
    width: 50%;
    float: left;
    box-sizing: border-box;
    border: 1px solid #fff;
    position: relative;
    padding-left: 1.1rem;
  }

  .jk-pop .part .icon-position{
    position: absolute;
    top: 0.2rem;
    left: 0.1rem;
    font-size: 1.8rem;
  }

  .jk-pop .part.active {
    border: 1px solid #6998FF;
    box-shadow: 0px 0px 5px #D8E4FF inset;
  }

  .jk-pop {
    text-align: center;
    position: fixed;
    width: 80%;
    left: 10%;
    top: 10rem;
    z-index: 1000;
  }

  .jk-pop:after {
    content: '';
    top: 0px;
    bottom: 0px;
    right: 0px;
    left: 0px;
    position: fixed;
    background: rgba(0, 0, 0, .4);
    z-index: 999;
  }

  .jk-pop .inner {
    position: relative;
    z-index: 9999;
    background: #fff;
    padding-top: 10px;
    border-radius: 4px;
  }

  .box {
    overflow: hidden;
    padding: 0px 10px 10px;
  }

  .footer {
    border-top: 1px solid #ddd;
    overflow: hidden;
  }

  .footer .btn {
    float: left;
    width: 50%;
    padding: 8px 0px;
    box-sizing: border-box;
  }

  .footer .left {
    border-right: 1px solid #ccc;
  }
</style>
