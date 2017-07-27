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
    },
    {
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
        auth: true
      }
    }, {
      name: 'bindCompany',
      path: '/bindCompany',
      component: resolve => require(['../views/aboutMe/bindCompany/bindCompany.vue'], resolve)
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
      component: resolve => require(['../views/login/modifyPassword.vue'], resolve)
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
      component: resolve => require(['../views/authorize/authorize.vue'], resolve)
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
    }
  ]
})
