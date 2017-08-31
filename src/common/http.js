import Vue from 'vue';
import Axios from 'axios';
import { Promise } from 'es6-promise';
import user from '../store/modules/user'
import server from '../config/hostConfig'

Axios.defaults.timeout = 45000; // 45s
Axios.defaults.baseURL = server.target;

Axios.interceptors.request.use(function(config) {
  // Do something before request is sent 
  //change method for get
  /*if(process.env.NODE_ENV == 'development'){
      config['method'] = 'GET';
      console.log(config)
  }*/
  if (config['MSG']) {
    Vue.prototype.$showLoading(config['MSG']);
  } else {
    if (!config['NoLoading']) {
      Vue.prototype.$showLoading();
    }
  }
  if (user.state.token) { //用户登录时每次请求将token放入请求头中
    config.headers["token"] = user.state.token;
  }

  if (config['Content-Type'] === 'application/x-www-form-urlencoded;') { //默认发application/json请求，如果application/x-www-form-urlencoded;需要使用transformRequest对参数进行处理
    /*config['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';*/
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
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
    if (response.config['Content-Type'] != 'multipart/form-data;') { //图片上传不关闭遮罩，由业务处理
      Vue.$vux.loading.hide();
    }
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
