import Vue from 'vue';
import Axios from 'axios';
import { Promise } from 'es6-promise';
import user from '../store/user'

Axios.defaults.timeout = 30000; // 1分钟
Axios.defaults.baseURL = 'http://app.xiaochina.net'; 
//hosturl: 'http://dzswj.szgs.gov.cn',
//hosturl: 'http://app.xiaochina.net',

Axios.interceptors.request.use(function(config) {
  // Do something before request is sent 
  //change method for get
  /*if(process.env.NODE_ENV == 'development'){
      config['method'] = 'GET';
      console.log(config)
  }*/
  
  if(user.state.nsrInfo){
    config.headers["token"] = user.state.nsrInfo.wxToken;
  }
  Vue.prototype.$showLoading();
  if (config['Content-Type'] === 'application/x-www-form-urlencoded;') {
    config['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
    config['transformRequest'] = function(obj) {
      var str = [];
      for (var p in obj)
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
      return str.join("&")
    };
  }
  //config.header['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';

  return config;
}, function(error) {
  // Do something with request error 
  Vue.$vux.loading.hide()
  return Promise.reject(error);
});

Axios.interceptors.response.use(
  response => {
    Vue.$vux.loading.hide();
    return response.data;
  },
  error => {
    Vue.$vux.loading.hide();
    if (error.response) {
      switch (error.response.status) {
        case 404:
          Vue.prototype.$alert("404未找到请求的资源");
          break;
        default:
          Vue.prototype.$alert('网络错误');
      }
    } else if (error instanceof Error) {
      console.error(error.message);
    } else {
      Vue.prototype.$alert(error.returnMsg);
    }

    return Promise.reject(error.response.data);
  });

export default Vue.prototype.$http = Axios;
