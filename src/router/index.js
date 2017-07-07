import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

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
    /* {
        path: '/hello',
        component: resolve => require(['../views/Hello.vue'], resolve),
        meta: {
          auth: false
        }
      }, {
        path: '/',
        component: resolve => require(['../views/HelloFromVux.vue'], resolve),
        meta: {
          auth: false
        }
      }, {
        path: '/hello2',
        component: resolve => require(['../views/HelloFromVux.vue'], resolve),
        meta: {
          auth: false
        }
      }, {
        path: '/list',
        component: resolve => require(['../views/List.vue'], resolve),
        replace: true
      },*/
    {
      path: '/login',
      component: resolve => require(['../views/login/login.vue'], resolve),
      meta: {
        auth: false
      }
    }, {
      path: '/xgmsb_step1',
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
    }
  ]
})
