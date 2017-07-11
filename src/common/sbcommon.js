import http from './http'
import user from '../store/modules/user'
export default {
  JbsbzlDmArray: ['10103', '10110', '10116', '10418', '10419', '26502',
    '29826', '29836', '17701', '29827', '29824', '29823', '29825', '29839',
    '29842', '10430', '10431', '10312', '10313', '10314', '10315', '10316',
    '10317', '10318', '29872', '29875', '10319'
  ],
  NbsbzlDmArray: ['29837', '29810', '29809', '29812', '29811', '29808', '29840',
    '29843', '10438', '29873', '29876', '10439'
  ],
  getSbzlHdxx(SBZLCODE) {
    let param = {
      djxh: user.state.nsrInfo.nsrxxVO.djxh,
      sbny: new Date().format('yyyyMM'),
      sbzlDm: SBZLCODE
    }
    let sbzlhdxxData = null;
    return http.post('/sb/sbcommon_getSbzlHdxx.do', param, { 'Content-Type': 'application/x-www-form-urlencoded;' }).then((result) => {
      if (null != result.data) {
        sbzlhdxxData = result.data;
      }
      return sbzlhdxxData;
    })
  },
  isExsitSbzlHdxx(sbzlArray, hdxxData) {
    if (null == hdxxData || "" == hdxxData) {
      return null;
    }
    var hdxxVo = hdxxData.HdxxResponseVo;
    var sbzlNode = null;
    for (var r = 0; r < hdxxVo.SBZL.length; r++) {
      var sbzl = hdxxVo.SBZL[r].SBZLCODE;
      if (sbzlArray.indexOf(sbzl) != -1) {
        var skssqz = null;
        var skssqq = null;
        sbzlNode = hdxxVo.SBZL[r];
        if (!!skssqz && !!skssqq) {
          if (sbzlNode.sksssqQ == skssqq && sbzlNode.sksssqZ == skssqz) {
            sbzlNode = hdxxVo.SBZL[r];
            break;
          }
        }
      }
    }
    return sbzlNode;
  },
  ifCwbbSb(sbzlArray) {
    let param = {
      sbzlcode: sbzlArray

    }
    return http.post('/sb/sbcommon_checkCwbbSbqkFromGt3.do', param, { 'Content-Type': 'application/x-www-form-urlencoded;' }).then((result) => {
      return true
    })
  },
  getSssq(sbny, sbzlDm) {
    let ssn = sbny.substr(0, 4); // 当前年
    let vMon = sbny.substr(4, 2); // 所属月
    let sssqq = "";
    let sssqz = "";
    if (this.JbsbzlDmArray.indexOf(sbzlDm) != -1) {
      if (vMon >= 1 && vMon < 4) {
        sssqq = ssn + "-01-01";
        sssqz = ssn + "-03-31";
      }
      if (vMon >= 4 && vMon < 7) {
        sssqq = ssn + "-04-01";
        sssqz = ssn + "-06-30";
      }
      if (vMon >= 7 && vMon < 10) {
        sssqq = ssn + "-07-01";
        sssqz = ssn + "-09-30";
      }
      if (vMon >= 10 && vMon < 13) {
        sssqq = ssn + "-10-01";
        sssqz = ssn + "-12-31";
      }
    } else if (this.NbsbzlDmArray.indexOf(sbzlDm) != -1) {
      if (window.location.href.indexOf('wqsb=true') !== -1) {
        sssqq = ssn + "-01-01";
        sssqz = ssn + "-12-31";
      } else {
        var d = new Date();
        var lastN = d.getFullYear() - 1;
        sssqq = lastN + "-01-01";
        sssqz = lastN + "-12-31";
      }
    } else {
      sssqq = ssn + "-" + vMon + "-01";
      var new_date = new Date(ssn, (vMon), 1);
      var sssqzdate = new Date(new_date.getTime() - 1000 * 60 * 60 * 24);
      sssqz = mini.formatDate(sssqzdate, "yyyy-MM-dd");
    }

    return new Array(sssqq, sssqz);
  },
  getWsxxValueByCode(sbzlNode, wsxxcode) {
    var wsxxs = sbzlNode.WSXXS.WSXX;
    var wsxxvalue = "";
    for (var i = 0; i < wsxxs.length; i++) {
      var wsxxnode = wsxxs[i];
      if (wsxxcode == wsxxnode.CODE) {
        wsxxvalue = wsxxnode.VALUE;
        break;
      }
    }
    return wsxxvalue;
  },
  submitSbSource(config) {
    let param = {};
    return http.post('/sb/sbcommon_sbcl.do', config, { 'Content-Type': 'application/x-www-form-urlencoded;' });
  },
  getSbny() {
    var d = new Date();
    var vYear = d.getFullYear();
    var vMon = d.getMonth();
    if (vMon == 0) {
      vYear = vYear - 1;
      vMon = 12;
    }
    if (vMon < 10) {
      vMon = "0" + vMon;
    }
    return vYear + "" + vMon;
  }
}
