<template>
  <div>
    <tabbar>
      <tabbar-item link="/index/ywbl" :class="{'weui-bar__item_on':$route.path == '/index/ywbl'||$route.path == '/index'}">
        <i slot="icon" class="ywbl footer-ionic"></i>
        <span slot="label">业务办理</span>
      </tabbar-item>
      <tabbar-item link="/index/fpgl" :class="{'weui-bar__item_on':$route.path == '/index/fpgl'}">
        <i slot="icon" class="fpgl footer-ionic"></i>
        <span slot="label">发票管理</span>
      </tabbar-item>
      <tabbar-item link="/index/sscx" :class="{'weui-bar__item_on':$route.path == '/index/sscx'}">
        <i slot="icon" class="sscx footer-ionic"></i>
        <span slot="label">涉税查询</span>
      </tabbar-item>
      <tabbar-item link="/index/aboutMe" :class="{'weui-bar__item_on':$route.path == '/index/aboutMe'}">
        <i slot="icon" class="smgl footer-ionic"></i>
        <span slot="label">我</span>
      </tabbar-item>
    </tabbar>
  </div>
</template>
<script>
import {
  Tabbar,
  TabbarItem,
  Group,
  Cell
} from 'vux';

export default {
  components: {
    Tabbar,
    TabbarItem,
    Group,
    Cell
  },
  data() {
    return {

    }
  },

  props: {},

  methods: {
    changeTab: function(a, b, c) {
      alert(0)
      console.log(a, b, c)
    }
  }
}
</script>
<style scoped="">
.ywbl {
  background: url(../../../static/index/ywbl.png) 0 0 no-repeat;
}

.fpgl {
  background: url(../../../static/index/fpgl.png) 0 0 no-repeat;
}

.sscx {
  background: url(../../../static/index/sscx.png) 0 0 no-repeat;
}

.smgl {
  background: url(../../../static/index/smgl.png) 0 0 no-repeat;
}

.weui-bar__item_on .ywbl {
  background: url(../../../static/index/ywbl_on.png) 0 0 no-repeat;
}

.weui-bar__item_on .fpgl {
  background: url(../../../static/index/fpgl_on.png) 0 0 no-repeat;
}

.weui-bar__item_on .sscx {
  background: url(../../../static/index/sscx_on.png) 0 0 no-repeat;
}

.weui-bar__item_on .smgl {
  background: url(../../../static/index/smgl_on.png) 0 0 no-repeat;
}

.footer-ionic,
.weui-bar__item_on .footer-ionic {
  display: block;
  width: 24px;
  height: 24px;
  background-size: 24px;
}

.weui-bar__item_on .weui-tabbar__label span {
  color: #1286fe;
}
</style>
