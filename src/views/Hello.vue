<template>
    <div class="hello">
       <div class='menu-container'>
            <div class="menu-div"></div> 
            <div class="menu-div"></div> 
            <div class="menu-div"></div> 
            <div class="menu-div"></div> 
            <div class="menu-div"></div> 
            <div class="menu-div"></div>
            <div class="menu-div"></div>   
       </div>
    </div>
</template>
<script>
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less'>
    .menu-container{
        margin: auto;
        display: flex;
        flex-wrap:wrap;
        .menu-div{
            width: 31vw;
            border: 1px solid red;
            height: 31vw;
        }
    }
</style>
