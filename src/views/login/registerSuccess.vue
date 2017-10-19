<template>
  <div class="container">
    <div class="header">
      <v-headerbar title='注册成功'></v-headerbar>
    </div>
    <div class="content">
      <div class="register-success">实名账户注册成功!</div>
      <div class="userinfo">
        <div class="iconfont icon-geren image"></div>
        <div class="doc"><label>真实姓名</label><span>{{user_realName}}</span></div>
        <div class="doc"><label>身份证号</label><span>{{user_sfzhm}}</span></div>
      </div>
      <div v-if="fddbrs.length>0">
      <p class="tips">您是以下单位的法定代表人</p>
      <div style='margin-top:0.6rem'  v-for='(item, index) in fddbrs' >
        <div class='inner-div' :class="item.className"  @click="getSelected(index,'fdFlag')">
          <div class='icon-div'>
            <i class="iconfont icon-gongsi1"></i>
          </div>
          <div class='right-descript'>
            <span>{{item.nsrmc}}</span>
            <p>{{item.nsrsbh}}</p>
          </div>
        </div>
      </div>
      </div>
      <div v-if="cwfzrs.length>0">
        <p class="tips">您是以下单位的财务负责人</p>
        <div style='margin-top:0.6rem' v-for='(item, index) in cwfzrs'>
          <div class='inner-div' :class="item.className" @click="getSelected(index,'cwFlag')">
            <div class='icon-div'>
              <i class="iconfont icon-gongsi1"></i>
            </div>
            <div class='right-descript'>
              <span>{{item.nsrmc}}</span>
              <p>{{item.nsrsbh}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class='footer'>
      <x-button type="primary" class='btn' action-type='button' @click.native='goLogin()'>暂不绑定</x-button>
      <x-button type="primary" class='btn' style="float: right;" action-type='button' @click.native='bindQy()'>绑定</x-button>
    </div>
  </div>
</template>
<script>
import {
  Alert,
  XButton
} from 'vux'
import {
  mapGetters,
  mapMutations
} from 'vuex'
import sbcommon from '../../common/sbcommon'
export default {
  components: {
    Alert,
    XButton
  },
  data() {
    return {
      user_realName:'',
      user_sfzhm:'',
      isFromLogin: false,
      selected: -1,
      routeParams: {},
      fddbrs:[{"nsrmc":"税由分公司","nsrsbh":"1234567890"},{"nsrmc":"税睡睡分公司","nsrsbh":"1234567890123"}],
      cwfzrs:[{"nsrmc":"税由分公司","nsrsbh":"1234567890"},{"nsrmc":"税睡睡分公司","nsrsbh":"1234567890123"}],
      bindArray:[],
      tempArray:[]
    }
  },
  methods: {
    init(){
      let self = this;
      let tmp ='';
      //接收第二步传过来的参数
      self.routeParams = JSON.parse(this.$route.query.routeParams);
      self.user_realName = (self.routeParams.name).replace(self.routeParams.name[0],"*");
      tmp = self.routeParams.sfzjhm;
      self.user_sfzhm = tmp.charAt(0)+"****************"+tmp.charAt(tmp.length-1);
      let qyParam ={
        "name": self.routeParams.name,//姓名
        "sfzjhm": self.routeParams.sfzjhm  //身份证号码
      };
      self.$http.post('/api/smrz/mobile/getQybdxx', qyParam,{
        'Content-Type': 'application/json;charset=UTF-8'
      }).then(function(result) {
        if (result.success) {
          if(result.data.fddbr.length>0){
            self.fddbrs = result.data.fddbr;
          }
          if(result.data.cwfzr.length>0){
            self.cwfzrs = result.data.cwfzr;
          }
        }else{
          self.$alert(result.message);
        }
      })
    },
    //选择需要绑定的企业
    getSelected(index,param){
      let self = this;
      if(param=="fdFlag"){
        if(self.fddbrs[index].className == "selected"){
          self.$set(self.fddbrs[index], "className", "");
        }else{
          self.$set(self.fddbrs[index], "className", "selected");//给对象添加新的属性 vue需要这样才能赋上值
        }
      }else if(param=="cwFlag"){
        if(self.cwfzrs[index].className == "selected"){
          self.$set(self.cwfzrs[index], "className", "");
        }else{
          self.$set(self.cwfzrs[index], "className", "selected");
        }
      }
    },
    bindQy(){
      let self = this;
      //遍历法定代表人
      self.fddbrs.forEach(function(item){
        if(item.className=="selected"){
          self.bindArray.push(
            {
              nsrsbh:item.nsrsbh,
              nsrmc:item.nsrmc,
              bdlx:item.type
            });
        }
      });
      //遍历财务负责人
      self.cwfzrs.forEach(function(item){
        if(item.className=="selected"){
          self.bindArray.push(
            {
              nsrsbh:item.nsrsbh,
              nsrmc:item.nsrmc,
              bdlx:item.type
            });
        }
      });
      //未选择绑定企业
      if(self.bindArray.length == 0){
        self.$alert("请至少选择一条绑定数据！");
        return;
      }
      //组装请求数据
      var obj = {
        name: this.routeParams.name,
        zjhm: this.routeParams.sfzjhm,
        telphone: this.routeParams.telNum,
        bdqyGrid: encodeURI(JSON.stringify(self.bindArray),"utf-8")
      };

      self.$http.post('/api/smrz/mobile/smrzBindQy', obj,{
        'Content-Type': 'application/x-www-form-urlencoded;'
      }).then((result) => {
        if(result.success){
          //绑定成功
          self.$router.push('bindSuccess');
        }else{
          self.$alert(result.message);
        }
      })
    }
  },
  created: function() {
    this.init();
  }

}
</script>
<style lang='less' scoped>
.container {
  height: 100vh;
  display: flex;
  display: -webkit-flex;
  flex-direction: column;
  -webkit-flex-direction: column;
  .content {
    flex: 1;
    -webkit-box-flex: 1;
    webkit-flex: 1;
    overflow-y: auto;
    .inner-div.isSelected {
      border: 1px solid #33CCFF;
    }
    .register-success{
      line-height: 2rem;
      text-align: center;
      font-size: 1.4rem;
      margin: 1rem;
    }
    .userinfo{
      position: relative;
      margin: 1rem;
      border: 1px solid #ddd;
      padding: 1rem;
      background: #FFF;
      border-radius: 4px;
      label{
        margin-right:0.8rem;
      }
      .image{
        position: absolute;
        font-size: 2.4rem;
        left: 0.6rem;
        top: 0.9rem;
      }
      .doc{
        margin-left: 2.4rem;
      }
    }
    .tips{
      line-height: 2.6rem;
      text-align: center;
      font-size: 1.1rem;
    }
    .inner-div {
      padding: 0px 10px;
      width: 84%;
      margin: 0 auto;
      border: 1px solid #DBDBDB;
      display: flex;
      display: -webkit-flex;
      flex-direction: row;
      -webkit-flex-direction: row;
      .icon-div {
        flex-shrink: 0;
        -webkit-flex-shrink: 0;
        text-align: center;
        margin-right: 0.6rem;
        .icon-gongsi1 {
          position: relative;
          color: #ccc;
          /*  top: -0.6rem; */
          border: 1px solid #ccc;
          border-radius: 50%;
          /* margin-right: 0.6rem; */
          font-size: 2rem;
        }
      }
      .right-descript {
        position: relative;
        span.personal {
          margin-top: 1.2rem;
        }
        span {
          display: inline-block;
          margin-top: 5px;
          line-height: 1.4rem;
        }
        p {
          position: relative;
          bottom: 3px;
          font-size: 0.9rem;
          color: #858585;
        }
      }
    }
    .selected{
      border: 1px solid #33CCFF;
    }
  }
  .footer {
    width: 90%;
    margin: 10px auto 10px auto;
    .btn{
      width: 40%;
      float: left;
      margin-top: 0;
    }
  }
}
</style>
