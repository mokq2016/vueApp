<template>
  <div class="container">
    <!-- <div class='menu-container'>
            <div class="menu-div"></div> 
            <div class="menu-div"></div> 
            <div class="menu-div"></div> 
            <div class="menu-div"></div> 
            <div class="menu-div"></div> 
            <div class="menu-div"></div>
            <div class="menu-div"></div>   
       </div> -->
    <div class='fixedHead'>
      <v-headerbar title='开票信息'>
      </v-headerbar>
    </div>
    <div class="content">
      <v-loadMore ref='loadMore' :marginTop="'3.1rem'" @load-more='loadMore()' :loadingmore="isLoading" @refresh='refresh()'>
        <div v-for='item in items' class='item-div'>
          <span>{{item.name}}</span>
        </div>
      </v-loadMore>
    </div>
  </div>
</template>
<script>
/* import { ViewBox
}from 'vux'*/
export default {
  /* components:{
       ViewBox
       XHeader,
       Cell,
       Group
     },*/
  name: 'hello',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
      isLoading: false,
      items: [{
        name: Math.random()
      }, {
        name: Math.random()
      }, {
        name: Math.random()
      }, {
        name: Math.random()
      }, {
        name: Math.random()
      }, {
        name: Math.random()
      }, {
        name: Math.random()
      }, {
        name: Math.random()
      }, {
        name: Math.random()
      }, {
        name: Math.random()
      }, {
        name: Math.random()
      }, {
        name: Math.random()
      }, {
        name: Math.random()
      }, {
        name: Math.random()
      }, {
        name: Math.random()
      }, {
        name: Math.random()
      }, {
        name: Math.random()
      }]
    }
  },
  methods: {
    refresh() {
      this.items = this.items.filter(function(item,index) {
        console.log(index)
        return index % 2 === 0;
      })
    },
    loadMore() {
      let self = this;
      this.isLoading = true;
      setTimeout(function() {
        self.$refs['loadMore'].endLoadMore();
        for (var i = 4; i >= 0; i--) {
          self.items.push({
            name: Math.random()
          })
        }
      }, 2000)
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less'>
.container {
  margin: auto;
  display: flex;
  flex-wrap: wrap;
  .menu-div {
    width: 31vw;
    border: 1px solid red;
    height: 31vw;
  }
  .item-div {
    height: 4rem
  }
}
</style>
