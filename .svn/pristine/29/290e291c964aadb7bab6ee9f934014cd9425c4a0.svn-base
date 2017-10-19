<template>
  <div class="container" id="xgmsb">
    <div class='fixedHead'>
      <v-headerbar title='增值税小规模纳税人零申报'>
      </v-headerbar>
    </div>
    <div class="content">
      <group>
        <x-input title='所属时期起：' disabled v-model="ssqq"></x-input>
        <x-input title='所属时期止：' disabled v-model="ssqz"></x-input>
      </group>
      <x-button type="primary" class='btn' action-type='button' @click.native='submit()'>提交</x-button>
      <div class="tips">
          {{tip}}
      </div>
    </div>
  </div>
</template>
<script>
import {
  Group,
  XInput,
  XButton
} from 'vux'
import {
  mapState,//此两项是为引用缓存
  mapActions
} from 'vuex'
import sbcommon from '../../../common/sbcommon'
export default {
  components: {
    Group,
    XInput,
    XButton
  },
  data() {
    return {
      isActive:false,
      oneClass:false,
      fourClass:false,
      sevenClass:false,
      tenClass:false,
      showCalendar:false,
      ssqq:'',
      ssqz:'',
      tip:'注意：一键零申报将由系统为您生成本期全部项目为零的申报表，务必确认后再操作。',
      hdSbzlData: null,
      sbzlArray:['10103'],
      isWqsb: false,
      SBZLCODE:'',
      sssqArray:[],
      lsxxArr:[],
      sbnr: {}
  }
  },
  methods: {
    goBack(){
      this.$router.replace('/index/ywbl');
    },
    //增值税应认定未认定纳税人限制网上申报
    initZzswrd(){
      let self = this;
      this.$http.post('/zlrd/zlrdAction_queryZlrdxx.do').then((result) => {
        if (result.success) {
          this.init();
        } else {
          this.$alert({
            content: result.message,
            onHide() {
              self.$router.go(-1);
            }
          })
        }
      })
    },
    //初始化
    init(){
      let that = this;
      //当期申报
      sbcommon.getSbzlHdxx('10103').then(function(data) {
        that.hdxxHandle(data); //data是hdxxData
      })
    },
    hdxxHandle(data){//data是hdxxData
      let that = this;
      sbcommon.ifCwbbSb('[10103]').then(function(result) {
        if (!result) {
          that.$alert({
            content: '根据国家税务总局的规定，纳税人财务报表按季报送。为了避免影响您的纳税信用，请按时报送。报送本期增值税前再检查是否完成上一属期的财务报表报送。例如您在申报所属期2017年第一季度的增值税前检查是否完成2016年第4季度的财务报表报送。以此类推。',
            onHide() {
              that.$router.replace('/index/ywbl');
            }
          })
          return;
        }
      })

      //判断核定中的sbzlcode是否存在于数组中
      this.hdSbzlData = sbcommon.isExsitSbzlHdxx(['10103'], data);

      //判断是否有核定
      if (this.hdSbzlData == null) {
        that.$alert({
          content: '当前税种信息没有小规模增值税申报种类，不能进行小规模申报，如需申报，需联系主管税务机关，进行税费种认定。',
          onHide() {
            that.$router.replace('/index/ywbl');
          }
        })
        return;
      }

      if(this.hdSbzlData.QCCGBZ != 'Y'){
        that.$alert({
          content: '期初信息获取失败，异常原因：' +this.hdSbzlData.QCCGBZMS,
          onHide() {
            that.$router.replace('/index/ywbl');
          }
        })
        return;
      }

      /*let sbjz = this.hdSbzlData.SBQX;//申报截至日期
      let sbjz2 = new Date(sbjz);
      let sbqq = sbjz.substring(0, 8) + '01';//申报起始时间 提示用
      let sbqq2 = new Date(sbqq);//申报起始时间
      let nowDay = new Date();//当天日期
      if(nowDay.getTime()  < sbqq2.getTime()  && nowDay.getTime()  > sbjz2.getTime() ){
        that.$alert({
          content: '征期外不能申报，请在征期['+ sbqq +']至['+sbjz+']内申报！',
          onHide() {
            that.$router.replace('/index/ywbl');
          }
        })
        return;
      }*/
      let sbjz = this.hdSbzlData.SBQX;//申报截至日期
      let sbqq = sbjz.substring(0, 8) + '01';//申报起始时间 提示用
      let nowDay = new Date();//当天日期
      let nowDay2 = nowDay.format('yyyy-MM-dd');
      if(nowDay2 < sbqq || nowDay2 > sbjz){
        that.$alert({
          content: '目前不支持逾期申报的一键零申报，请通过其他方式申报！',
          /*content: '征期外不能申报，请在征期['+ sbqq +']至['+sbjz+']内申报！',*/
          onHide() {
            that.$router.replace('/index/ywbl');
          }
        })
        return;
      }


      //判断是否已经申报
      if (this.hdSbzlData.ysbbbz == 'Y') {
        that.$alert({
          content: '您在当前属期内已申报成功，不允许重复申报',
          onHide() {
            that.$router.replace('/index/ywbl');
          }
        })
        return;
      }


      this.SBZLCODE = this.hdSbzlData.SBZLCODE;
      //正常申报
      this.sssqArray = sbcommon.getSssq(sbcommon.getSbny(), '10103');
      this.ssqq = that.sssqArray[0];
      this.ssqz = that.sssqArray[1];

      //从核定中取值DKFPJE
      let DKFPJE = sbcommon.getWsxxValueByCode(this.hdSbzlData, 'DKFPJE');// 代开发票金额
      if(!(DKFPJE === '' || DKFPJE === null || DKFPJE === 0 || DKFPJE === '0.00')){
        that.$alert({
          content: '您的代开发票金额为'+DKFPJE+',发生过销售业务，不能进行零申报，请确认！如需申报，请点击增值税小规模申报，进行普通申报。',
          onHide() {
            that.$router.replace('/index/ywbl');
          }
        })
        return;
      }

      //获取历史信息，判断是否有大于0的值
      let allowSB = true;
      if(this.hdSbzlData.LSXXS && this.hdSbzlData.LSXXS.LSXX)
        this.lsxxArr = this.hdSbzlData.LSXXS.LSXX;
      for(let i=0; i < this.lsxxArr.length; i++){
        if(parseFloat(this.lsxxArr[i].VALUE) > 0){
          allowSB = false;
          break;
        }
      }
      if(allowSB == false){
        that.$alert({
          content: '您暂无法使用一键零申报功能，请通过"增值税小规模纳税人申报"申报增值税！',
          onHide() {
            that.$router.replace('/index/ywbl');
          }
        })
        return;
      }
    },
    submit() {//提交申报
      let that = this;
      this.$confirm({
        content: '您确定要提交？',
        onConfirm() {
          let tbrq = new Date().format('yyyyMMdd');
          var ywcontentStr = '{"lc":[{"id":1,"hw":"0.00","fw":0,"hwlj":0,"fwlj":"0.00"},{"id":2,"hw":"0.00","fw":0,"hwlj":0,"fwlj":"0.00"},{"id":3,"hw":0,"fw":0,"hwlj":0,"fwlj":"0.00"},{"id":4,"hw":0,"fw":0,"hwlj":0,"fwlj":"0.00"},{"id":5,"hw":0,"fw":0,"hwlj":0,"fwlj":"0.00"},{"id":6,"hw":0,"fw":0,"hwlj":0,"fwlj":"0.00"},{"id":7,"hw":0,"fw":0,"hwlj":0,"fwlj":"0.00"},{"id":8,"hw":0,"fw":0,"hwlj":0,"fwlj":"0.00"},{"id":9,"hw":"","fw":0,"hwlj":0,"fwlj":"0.00"},{"id":10,"hw":"","fw":0,"hwlj":0,"fwlj":"0.00"},{"id":11,"hw":0,"fw":0,"hwlj":0,"fwlj":"0.00"},{"id":12,"hw":0,"fw":0,"hwlj":0,"fwlj":"0.00"},{"id":13,"hw":"","fw":0,"hwlj":0,"fwlj":"0.00"},{"id":14,"hw":0,"fw":0,"hwlj":0,"fwlj":"0.00"},{"id":15,"hw":0,"fw":0,"hwlj":0,"fwlj":"0.00"},{"id":16,"hw":0,"fw":0,"hwlj":0,"fwlj":"0.00"},{"id":17,"hw":0,"fw":0,"hwlj":0,"fwlj":"0.00"},{"id":18,"hw":"0.00","fw":0,"hwlj":0,"fwlj":"0.00"},{"id":19,"hw":0,"fw":0,"hwlj":0,"fwlj":"0.00"},{"id":20,"hw":0,"fw":0,"hwlj":0,"fwlj":"0.00"},{"id":21,"hw":0,"fw":0,"hwlj":0,"fwlj":"0.00"},{"id":22,"hw":0,"fw":0,"hwlj":0,"fwlj":"0.00"}],"YNSE":0,"JSJE":0,"bqcye":0,"bqfse":0,"bqkce":0,"qbhssr":0,"bqcye5":0,"bqfse5":0,"bqkce5":0,"qbhssr5":0,"YSHWHDXSE":"0.00","YSFWHDXSE":"0.00","YSHWHDYNSE":"0.00","YSFWHDYNSE":"0.00","sssqq":"'+that.ssqq+'","sssqz":"'+that.ssqz+'"}';
          var zzsjmssbmxStr = '{"C1":"0.00","D1":"0.00","E1":"0.00","F1":"0.00","G1":"0.00","jm2":"0.00","C2":"0.00","D2":"0.00","E2":"0.00","F2":"0.00","G2":"0.00","jm3":"0.00","C3":"0.00","D3":"0.00","E3":"0.00","F3":"0.00","G3":"0.00","jm4":"0.00","C4":"0.00","D4":"0.00","E4":"0.00","F4":"0.00","G4":"0.00","jm5":"0.00","C5":"0.00","D5":"0.00","E5":"0.00","F5":"0.00","G5":"0.00","jm6":"0.00","C6":"0.00","D6":"0.00","E6":"0.00","F6":"0.00","G6":"0.00","C7":"0.00","D7":"0.00","E7":"0.00","F7":"0.00","G7":"0.00","C8":"0.00","jm9":"0.00","C9":"0.00","D9":"0.00","E9":"0.00","F9":"0.00","G9":"0.00","jm10":"0.00","C10":"0.00","D10":"0.00","E10":"0.00","F10":"0.00","G10":"0.00","jm11":"0.00","C11":"0.00","D11":"0.00","E11":"0.00","F11":"0.00","G11":"0.00","jm12":"0.00","C12":"0.00","D12":"0.00","E12":"0.00","F12":"0.00","G12":"0.00","jm13":"0.00","C13":"0.00","D13":"0.00","E13":"0.00","F13":"0.00","G13":"0.00","jmmxbBwzzBz":false}';
          this.sbnr = {
            SBZLCODE: that.SBZLCODE,
            nsrmc: that.nsrInfo.nsrmc,
            nsrsbh: that.nsrInfo.nsrsbh,
            sssqq: that.ssqq,
            sssqz: that.ssqz,
            tbrq:  tbrq,
            ywcontent: ywcontentStr,
            zzsjmssbmx: zzsjmssbmxStr
          };
          let sealSj = "";
          let sbwjs = [
            {
              bbwjm : that.getBbFilename('001',this.sbnr['SBZLCODE']),
              bbxml : that.buildZzssyyxgmnsr(this.sbnr)
            },{
              bbwjm : that.getBbFilename('006',this.sbnr['SBZLCODE']),
              bbxml : that.buildZzsxgmflzl()
            },{
              bbwjm : "CAQZSJ.xml",//ca签章数据
              bbxml : sealSj
            }
          ];
          let jmmxbBwzzBz = false;
          if (jmmxbBwzzBz) {
            sbwjs.push({
              bbwjm: that.getBbFilename('008', this.sbnr['SBZLCODE']),
              bbxml: that.buildZzsjmssbmxb()
            });
          } else {
            sbwjs.push({
              bbwjm: that.getBbFilename('008', this.sbnr['SBZLCODE']),
              bbxml : "<zzsjmssbmxb><zzsjmssbmxbjsxmGrid><zzsjmssbmxbjsxmGridlbVO><ewbhxh>1</ewbhxh><hmc>合计</hmc><qcye>0</qcye><bqfse>0</bqfse><bqydjse>0</bqydjse><bqsjdjse>0</bqsjdjse><qmye>0</qmye></zzsjmssbmxbjsxmGridlbVO></zzsjmssbmxbjsxmGrid><zzsjmssbmxbmsxmGrid><zzsjmssbmxbmsxmGridlbVO><ewbhxh>1</ewbhxh><hmc>合计</hmc><mzzzsxmxse>0</mzzzsxmxse><bqsjkcje>0</bqsjkcje><kchmsxse>0</kchmsxse><msxsedyjxse>0</msxsedyjxse><mse>0</mse></zzsjmssbmxbmsxmGridlbVO><zzsjmssbmxbmsxmGridlbVO><ewbhxh>2</ewbhxh><hmc>出口免税</hmc><mzzzsxmxse>0</mzzzsxmxse></zzsjmssbmxbmsxmGridlbVO><zzsjmssbmxbmsxmGridlbVO><ewbhxh>3</ewbhxh><hmc>跨境服务</hmc><mzzzsxmxse>0</mzzzsxmxse></zzsjmssbmxbmsxmGridlbVO></zzsjmssbmxbmsxmGrid></zzsjmssbmxb>"
            });
          }
          let param = {
            sssqq:this.sbnr.sssqq,
            sssqz:this.sbnr.sssqz,
            sbzlDm: '10103',
            sbwjs: JSON.stringify(sbwjs),
            sbformdata: JSON.stringify(this.sbnr)

          }
          sbcommon.submitSbSource(param).then(function(result) {
            if (result.success) {
              /*that.$alert({
                content: '申报成功！',
                onHide() {
                  that.$router.push('/index/ywbl');
                }
              });*/
              that.$router.push({
                path: '/sbSuccess',
                query: {
                  sssqq: param.sssqq,
                  sssqz: param.sssqz
                }
              });
            } else {
              that.$alert(result.message);
            }
          })
        }
      })
    },
    getBbFilename(bbid,SBZLCODE) {
      return SBZLCODE+"_" +bbid+".xml";
    },

    //《增值税纳税申报表(适用小规模纳税人)》
    buildZzssyyxgmnsr(content) {
      var xml = "";
      xml += '<zzssyyxgmnsr>';
      xml += '<sbbhead>';
      xml += '<nsrsbh>'+ content.nsrsbh +'</nsrsbh>';
      xml += '<nsrmc>'+ content.nsrmc +'</nsrmc>';
      xml += '<skssqq>'+ content.sssqq +'</skssqq>';
      xml += '<skssqz>'+ content.sssqz +'</skssqz>';
      xml += '<sbsxDm1></sbsxDm1>';
      xml += '<sbrq1></sbrq1>';
      xml += '</sbbhead>';
      //zzsxgmGrid
      xml += '<zzsxgmGrid>';
      var lmcArray = new Array( "货物及劳务本期数", "服务、不动产和无形资产本期数", "货物及劳务本年累计", "服务、不动产和无形资产本年累计" );
      var zbNameArray = new Array( "yzzzsbhsxse", "swjgdkdzzszyfpbhsxse", "skqjkjdptfpbhsxse","xsczbdcbhsxse",
        "swjgdkdzzszyfpbhsxse1","skqjkjdptfpbhsxse2", "xssygdysgdzcbhsxse",
        "skqjkjdptfpbhsxse1", "msxse", "xwqymsxse", "wdqzdxse", "qtmsxse", "ckmsxse", "skqjkjdptfpxse1",
        "hdxse", "bqynse", "hdynse", "bqynsejze", "bqmse", "xwqymse", "wdqzdmse", "ynsehj", "bqyjse1",
        "bqybtse" );
      var ywcontent = JSON.parse(content.ywcontent);
      var zbList = ywcontent.lc;
      for(var j=0; j<4 ;j++){
        xml += '<zzsxgmGridlb>';
        xml += '<ewblxh>'+ (j+1) +'</ewblxh>';
        xml += '<lmc>' + lmcArray[j] + '</lmc>';
        for (var i = 0,k = 0; i < 24; i++) {
          xml += "<" + zbNameArray[i] +">";
          if((j==1&&i==6)||(j==1&&i==7)||(j==2&&i==3)||(j==2&&i==4)||(j==2&&i==5)
            ||(j==2&&i==22)||(j==2&&i==23) ||(j==3&&i==6)||(j==3&&i==7)||(j==3&&i==22)||(j==3&&i==23)){
            xml += 0;
            k++;
          } else {
            var val = 0;
            if(zbNameArray[i]=="hdxse"){
              val = j==0||j==2?Number(ywcontent.YSHWHDXSE).toFixed("2"):Number(ywcontent.YSFWHDXSE).toFixed("2");
            }else if(zbNameArray[i]=="hdynse"){
              val = j==0||j==2?Number(ywcontent.YSHWHDYNSE).toFixed("2"):Number(ywcontent.YSFWHDYNSE).toFixed("2");
            } else{
              val = j==0?zbList[k].hw:(j==1?zbList[k].fw:(j==2?zbList[k].hwlj:zbList[k].fwlj));
              k++;
            }
            xml += val==""||val==null ? 0 : val;
          }
          xml += "</" + zbNameArray[i] +">";
        }
        xml += '</zzsxgmGridlb>';
      }
      xml += '</zzsxgmGrid>';
      //<slxxForm>
      xml += '<slxxForm>';
      xml += '<sfzxsb></sfzxsb>';
      xml += '<bsrxm></bsrxm>';
      xml += '<cwfzrxm></cwfzrxm>';
      xml += '<fddbrxm></fddbrxm>';
      xml += '<bsrlxdh></bsrlxdh>';
      xml += '<dlrmc></dlrmc>';
      xml += '<jbrxm></jbrxm>';
      xml += '<slswjgDm></slswjgDm>';
      xml += '<slswjgMc></slswjgMc>';
      xml += '<jbrlxdh></jbrlxdh>';
      xml += '<slrDm></slrDm>';
      xml += '<slrxm></slrxm>';
      xml += '<slrq></slrq>';
      xml += '</slxxForm>';
      xml += '</zzssyyxgmnsr>';
      return xml;
    },
    //增值税纳税申报表（小规模纳税人适用）附列资料
    buildZzsxgmflzl() {
      var xml = "";
      xml += '<zzsxgmflzl>';
      xml += '<flzlForm>';
      xml += '<qcye>0.00</qcye>';
      xml += '<bqfse>0.00</bqfse>';
      xml += '<bqkce>0.00</bqkce>';
      xml += '<qmye>0.00</qmye>';
      xml += '<ysfwxsqbhssr>0.00</ysfwxsqbhssr>';
      xml += '<ysfwxshsxse>0.00</ysfwxshsxse>';
      xml += '<ysfwxsbhsxse>0.00</ysfwxsbhsxse>';

      xml += '<qcye5>0.00</qcye5>';
      xml += '<bqfse5>0.00</bqfse5>';
      xml += '<bqkce5>0.00</bqkce5>';
      xml += '<qmye5>0.00</qmye5>';
      xml += '<ysfwxsqbhssr5>0.00</ysfwxsqbhssr5>';
      xml += '<ysfwxshsxse5>0.00</ysfwxshsxse5>';
      xml += '<ysfwxsbhsxse5>0.00</ysfwxsbhsxse5>';

      xml += '</flzlForm>';
      xml += '</zzsxgmflzl>';
      return xml;
    },
    //增值税减免税申报明细表
    buildZzsjmssbmxb(content) {
      var xml = "";
      xml += '<zzsjmssbmxb>';
      xml += '<zzsjmssbmxbjsxmGrid>';
      for(var i=1;i<=6;i++){
        if(i==1){
          xml += '<zzsjmssbmxbjsxmGridlbVO>';
          xml += '<ewbhxh>'+ i +'</ewbhxh>';
          xml += '<hmc>合计</hmc>';
          xml += '<qcye>'+ content["C"+i] +'</qcye>';
          xml += '<bqfse>' + content["D"+i] +'</bqfse>';
          xml += '<bqydjse>' + content["E"+i] + '</bqydjse>';
          xml += '<bqsjdjse>' + content["F"+i] + '</bqsjdjse>';
          xml += '<qmye>' + content["G"+i] + '</qmye>';
          xml += '</zzsjmssbmxbjsxmGridlbVO>';
        } else {
          if(content["jm"+i] == "" || content["jm"+i] == "0"){
            continue;
          }
          xml += '<zzsjmssbmxbjsxmGridlbVO>';
          xml += '<ewbhxh>'+ i +'</ewbhxh>';
          xml += '<hmc>' + content["jm"+i] + '</hmc>';
          xml += '<qcye>'+ content["C"+i] +'</qcye>';
          xml += '<bqfse>' + content["D"+i] +'</bqfse>';
          xml += '<bqydjse>' + content["E"+i] + '</bqydjse>';
          xml += '<bqsjdjse>' + content["F"+i] + '</bqsjdjse>';
          xml += '<qmye>' + content["G"+i] + '</qmye>';
          xml += '</zzsjmssbmxbjsxmGridlbVO>';
        }
      }
      xml += '</zzsjmssbmxbjsxmGrid>';
      xml += '<zzsjmssbmxbmsxmGrid>';
      for(var i=7;i<=13;i++){
        if(i<=9){
          xml += '<zzsjmssbmxbmsxmGridlbVO>';
          xml += '<ewbhxh>'+ (i-6) +'</ewbhxh>';
          if(i==8){
            xml += '<hmc>出口免税</hmc>';
            xml += '<mzzzsxmxse>'+ content["C"+i] +'</mzzzsxmxse>';
            xml += '</zzsjmssbmxbmsxmGridlbVO>';
          }else if(i==9){
            xml += '<hmc>跨境服务</hmc>';
            xml += '<mzzzsxmxse>'+ content["C"+i] +'</mzzzsxmxse>';
            xml += '</zzsjmssbmxbmsxmGridlbVO>';
          }
          else {
            xml += '<hmc>合计</hmc>';
            xml += '<mzzzsxmxse>'+ content["C"+i] +'</mzzzsxmxse>';
            xml += '<bqsjkcje>'+ content["D"+i] +'</bqsjkcje>';
            xml += '<kchmsxse>'+ content["E"+i] +'</kchmsxse>';
            xml += '<msxsedyjxse>'+ content["F"+i] +'</msxsedyjxse>';
            xml += '<mse>'+ content["G"+i] +'</mse>';
            xml += '</zzsjmssbmxbmsxmGridlbVO>';
          }

        } else {
          if(content["jm"+i] == "" || content["jm"+i] == "0"){
            continue;
          }
          xml += '<zzsjmssbmxbmsxmGridlbVO>';
          xml += '<ewbhxh>'+ (i-6) +'</ewbhxh>';
          xml += '<hmc>'+ content["jm"+i] +'</hmc>';
          xml += '<mzzzsxmxse>'+ content["C"+i] +'</mzzzsxmxse>';
          xml += '<bqsjkcje>'+ content["D"+i] +'</bqsjkcje>';
          xml += '<kchmsxse>'+ content["E"+i] +'</kchmsxse>';
          xml += '<msxsedyjxse>'+ content["F"+i] +'</msxsedyjxse>';
          xml += '<mse>'+ content["G"+i] +'</mse>';
          xml += '</zzsjmssbmxbmsxmGridlbVO>';
        }
      }
      xml += '</zzsjmssbmxbmsxmGrid>';
      xml += '</zzsjmssbmxb>';
      return xml;
    }

},
  computed: {
    ...mapState({
      nsrInfo: state => state.user.nsrInfo
    })
  },
  created: function() {
      this.initZzswrd();
    }
}
</script>
<style lang='less'>
#xgmsb {
  .fixedHead {
    position: fixed;
    width: 100%;
    height: 3.1rem;
    z-index: 500;
    top: 0;
  }
  .content {
    width: 100%;
    margin-top:4rem;
    .vux-cell-box.weui-cell {
      div {
        padding-right: 0;
        width: 100%;
      }
    }
    .weui-cell:before{
      left:0;
    }
    .btn{
      margin-top:40px;
      width:40%;
    }
    .tips{
      margin:1rem;
      background:#eee;
      padding: 5px 8px;
      color: red;
    }
    label {
      width: 68%;
      display: inline-block;
      font-size: 1.1rem;
    }
    input {
      align-self: flex-start;
      font-size: 18px;
    }
    table{
      font-size: 0.94rem;
    }
  }
}
</style>
