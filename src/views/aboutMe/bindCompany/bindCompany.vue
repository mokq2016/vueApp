<template>
  <div class="container" id='bingCompany'>
    <div style='position: fixed;width: 100%;height: 3.1rem'>
      <v-headerbar title='绑定企业'>
        <span slot='right' @click='addCompany()'>添加</span>
      </v-headerbar>
    </div>
    <div class="content" style="position:absolute;margin-top: 3.1rem;width: 100%">
    <div v-html='getHtml()'>
      
    </div>
      <swipeout>
        <div class='item-div clearFix'>
          <swipeout-item>
            <div slot="right-menu">
              <swipeout-button @click.native='cancelBind()'>解绑</swipeout-button>
            </div>
            <div slot="content">
              <div style='padding-left: 0.7rem'>
                <table style="width:100%">
                  <tr>
                    <td>
                      <span>深圳市雅堂控股股份有限公司</span>
                      <p style='color:#8C8C8C;font-size: 0.9rem'>404050450405405040</p>
                    </td>
                    <td style="width: 20%;color:#8C8C8C">已绑定</td>
                  </tr>
                </table>
              </div>
            </div>
          </swipeout-item>
        </div>
      </swipeout>
    </div>
  </div>
</template>
<script>
import {
  Swipeout,
  SwipeoutItem,
  SwipeoutButton
} from 'vux'
export default {
  components: {
    Swipeout,
    SwipeoutItem,
    SwipeoutButton
  },
  methods: {
    addCompany() {
      this.$router.push('addCompany');
    },
    initBindInfo() {
      let self = this;
      this.$http.get('/api/yhgl/get/bindlist').then((result) => {
        if (result.success) {

        } else {
          self.$alert(result.message);
        }
      })
    },
    cancelBind(){
      this.$confirm({
        content:'您确定要解除绑定？',
        onConfirm(){
          console.log('confirm')
        }
      })
    },
    getHtml() {
      return "<div><span style='color:red'>123</span></div>"
    }
  },
  created() {
    this.initBindInfo();
  }
}
</script>
<style lang='less'>
#bingCompany.container {
  .item-div {
    border-bottom: 1px solid #ccc;
    .vux-swipeout-item,
    .vux-swipeout-content {
      /*  height: 2.8rem; */
    }
  }
}
</style>
