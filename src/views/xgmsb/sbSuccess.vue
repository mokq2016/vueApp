<template>
  <div class="container" id="">
    <div style='position: fixed;width: 100%;height: 3.1rem'>
      <v-headerbar title='发送报表'> </v-headerbar>
    </div>
  
    <div class="content content-body">
      <div class="pad-con">
      您的申报表正在发送中，请在 <span class="red">{{ seconds }}</span>秒后
      <router-link :to="'/sbcx'">查看申报结果。</router-link>
      <span class="red">申报明细可登陆电子税务局查看</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
	data(){
		return {
      seconds: 10,
      sssqq:this.$route.query.sssqq,
      sssqz:this.$route.query.sssqz
    }
  },
  
  mounted: function(){
		var $this = this;
    var timer = setInterval(function(){
      $this.seconds--;
      if( $this.seconds < 0){
        $this.$router.push({path:'/sbcx',query:{sssqq:$this.sssqq,sssqz:$this.sssqz}});
        clearInterval(timer);
      }
    }, 1000);
  }
}
</script>

<style scoped>
  a{
    color: #3cc51f;
  }
</style>
