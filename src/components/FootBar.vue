<template>
    <div>
      <tabbar class='tabbar'>
            <tabbar-item link="/home">
                <i slot="icon" class="icon-homepage iconfont"></i>
                <span slot="label">首页</span>
            </tabbar-item>
            <tabbar-item link="/hello" badge="13">
                <i slot="icon" class="icon-remind iconfont"></i>
                <span slot="label">消息</span>
            </tabbar-item>
            <tabbar-item link="/list">
                <i slot="icon" class="icon-praise iconfont"></i>
                <span slot="label">办税</span>
            </tabbar-item>
            <tabbar-item link="/hello2">
                <i slot="icon" class="icon-group iconfont"></i>
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