<template>
    <div>
      <tabbar class='tabbar'>
            <tabbar-item :class="{'weui-bar__item_on':$route.path == '/home'}" link="/home">
                <i slot="icon" class="icon-homepage iconfont"></i>
                <span slot="label">首页</span>
            </tabbar-item>
          <!--   <tabbar-item :class="{'weui-bar__item_on':$route.path == '/contacts'}" link="/contacts" badge="13">
              <i slot="icon" class="icon-remind iconfont"></i>
              <span slot="label">消息</span>
          </tabbar-item> -->
            <!-- <tabbar-item :class="{'weui-bar__item_on':$route.path == '/hello'}" link="/hello">
                <i slot="icon" class="icon-tax iconfont"></i>
                <span slot="label">办税</span>
            </tabbar-item> -->
            <tabbar-item :class="{'weui-bar__item_on':$route.path == '/aboutMe'}" link="/aboutMe">
                <i slot="icon" class="icon-people iconfont"></i>
                <span slot="label">我</span>
            </tabbar-item>
        </tabbar>
    </div>
</template>
<script>
import { Tabbar, TabbarItem} from 'vux'
export default {
    components:{
        Tabbar,
        TabbarItem
    }
}
</script>