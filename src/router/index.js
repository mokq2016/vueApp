import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import sbcx from '../views/xgmsb/sbcx/search.vue'
import sbResult from '../views/xgmsb/sbcx/sbresult.vue'
import sbSuccess from '../views/xgmsb/sbSuccess.vue'

import wjkList from '../views/xgmsb/wjkcx/list.vue' //未交款

import yjkResult from '../views/xgmsb/yjkcx/list.vue' //已交款
import yjkSearch from '../views/xgmsb/yjkcx/search.vue'

export default new VueRouter({
  routes: [{
      path: '*', // 其他页面
      redirect: '/login'
    }, {
      path: '/home',
      component: resolve => require(['../views/Home.vue'], resolve),
      meta: {
        auth: false
      }
    }, {
      path: '/accountInfo',
      component: resolve => require(['../views/login/accountInfo.vue'], resolve)

    }, {
      name: 'login',
      path: '/login',
      component: resolve => require(['../views/login/login.vue'], resolve),
      meta: {
        auth: false
      }
    }, {
      path: '/xgmsb_step1',
      name: 'xgmsb_step1',
      component: resolve => require(['../views/xgmsb/step1.vue'], resolve),
      meta: {
        keepAlive: true,
        auth: true
      }
    }, {
      name: 'xgmsb_step2',
      path: '/xgmsb_step2/:params',
      component: resolve => require(['../views/xgmsb/step2.vue'], resolve),
      meta: {
        auth: true
      }
    }, {
      name: 'aboutMe',
      path: '/aboutMe',
      component: resolve => require(['../views/aboutMe/aboutMe.vue'], resolve),
      meta: {
        auth: false
      }
    }, {
      name: 'bindCompany',
      path: '/bindCompany',
      component: resolve => require(['../views/aboutMe/bindCompany/bindCompany.vue'], resolve),
      meta: {
        auth: true
      }
    }, {
      name: 'addCompany',
      path: '/addCompany',
      component: resolve => require(['../views/aboutMe/bindCompany/addCompany.vue'], resolve)
    }, {
      name: 'chooseIdentity',
      path: '/chooseIdentity/:isFromLogin', //isFromLogin标记是否从login路由过来 true代表为从login其他非login路由
      component: resolve => require(['../views/chooseIdentity/chooseIdentity.vue'], resolve)

    }, {
      name: 'modifyPassword',
      path: '/modifyPassword',
      component: resolve => require(['../views/login/modifyPassword.vue'], resolve),
      meta: {
        auth: true
      }
    }, {
      name: 'companyInfo',
      path: '/companyInfo/:companyDetail',
      component: resolve => require(['../views/aboutMe/bindCompany/companyInfo.vue'], resolve)
    }, {
      name: 'taxList',
      path: '/taxList',
      component: resolve => require(['../views/manageTaxer/TaxerList.vue'], resolve)
    }, {
      name: 'addTaxer',
      path: '/addTaxer',
      component: resolve => require(['../views/manageTaxer/addTaxer.vue'], resolve)
    }, {
      name: 'sbcx', //申报查询页面
      path: '/sbcx',
      component: sbcx
    }, {
      name: 'sbResult', //申报查询结果
      path: '/sbResult',
      component: sbResult
    }, {
      name: 'sbSuccess', //发送报表成功
      path: '/sbSuccess',
      component: sbSuccess
    }, {
      name: 'wjkList', //待缴款  未交款
      path: '/wjkList',
      component: wjkList
    }, {
      name: 'yjkResult', //缴款查询结果页面  已交款
      path: '/yjkResult',
      component: yjkResult
    }, {
      name: 'yjkSearch', //已交款 查询条件页
      path: '/yjkSearch',
      component: yjkSearch
    }, {
      name: 'authorize',
      path: '/authorize',
      component: resolve => require(['../views/authorize/authorize.vue'], resolve),
      meta: {
        auth: true
      }
    }, {
      name: 'xgmsbMenu',
      path: '/xgmsbMenu',
      component: resolve => require(['../views/xgmsb/xgmsbMenu.vue'], resolve)
    }, {
      name: 'forgetPwd',
      path: '/forgetPwd',
      component: resolve => require(['../views/login/forgetPwd.vue'], resolve)
    }, {
      name: 'findPwd',
      path: '/findPwd/:params',
      component: resolve => require(['../views/login/findPwd.vue'], resolve)
    }, { //首页模块
      name: 'index',
      path: '/index',
      component: resolve => require(['../views/index/index.vue'], resolve),
      children: [{
        path: '/index/',
        name: 'ywbl',
        component: resolve => require(['../views/index/ywbl.vue'], resolve),
        meta: {
        auth: false
      }
      }, {
        path: '/index/ywbl',
        name: 'ywbl',
        component: resolve => require(['../views/index/ywbl.vue'], resolve),
        meta: {
        auth: false
      }
      }, {
        path: '/index/fpgl',
        name: 'fpgl',
        component: resolve => require(['../views/index/fpgl.vue'], resolve),
        meta: {
          auth: false
        }
      }, {
        path: '/index/sscx',
        name: 'sscx',
        component: resolve => require(['../views/index/sscx.vue'], resolve),
        meta: {
          auth: false
        }
      }, {
        path: '/index/smgl',
        name: 'smgl',
        component: resolve => require(['../views/index/smgl.vue'], resolve),
        meta: {
        auth: false
      }
      }, {
        path: '/index/aboutMe',
        name: 'aboutMe',
        component: resolve => require(['../views/aboutMe/aboutMe.vue'], resolve),
        meta: {
          auth: false
        }
      }]
    }, //首页模块 end
    {
      name: 'wqsbcx',//往期申报查询
      path: '/wqsbcx',
      component: resolve => require(['../views/wqsbcx/wqsbcx.vue'], resolve)
    },
    {
      name: 'nsrzgdj_step1',//增值税一般纳税人资格登记
      path: '/nsrzgdj_step1',
      component: resolve => require(['../views/zzsybnsrzgdj/nsrzgdj_step1.vue'], resolve),
      meta: {
        keepAlive: true,
        auth: true
      }
    },
    {
      name: 'nsrzgdj_step2',//增值税一般纳税人资格登记
      path: '/nsrzgdj_step2/:param',
      component: resolve => require(['../views/zzsybnsrzgdj/nsrzgdj_step2.vue'], resolve),
      meta: {
        keepAlive: true,
        auth: true
      }
    },
    {
      name: 'nsrzgdj_step3',//增值税一般纳税人资格登记
      path: '/nsrzgdj_step3/:param',
      component: resolve => require(['../views/zzsybnsrzgdj/nsrzgdj_step3.vue'], resolve)
    }
  ]
})
