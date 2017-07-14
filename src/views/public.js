/**
 * Created by hqh on 2017/7/14.
 */
import Vue from 'vue';
Vue.prototype.getSz = function ( skzldm ) {
  var skzldm = skzldm + "";
  var skzlmc;
  switch (skzldm) {
    case "10":
      skzlmc = "正税";
      break;
    case "20":
      skzlmc = "滞纳金";
      break;
    case "30":
      skzlmc = "罚款";
      break;
    case "31":
      skzlmc = "涉税罚款";
      break;
    case "32":
      skzlmc = "行为罚款";
      break;
    case "40":
      skzlmc = "没收违法所得";
      break;
    case "50":
      skzlmc = "利息";
      break;
    case "90":
      skzlmc = "其他";
      break;
    default :
      skzlmc = "未知种类";
      break;
  }
  return skzlmc;
}

