<template>
  <div class="container" id='about'>
    <group>
      <cell :title='GET_ACCOUNTINFO().fullName' :inline-desc='GET_ACCOUNTINFO().mobile' is-link>
        <i slot='icon' class="iconfont icon-geren"></i>
      </cell>
    </group>
    <group>
<!--     <cell title='当前办税身份' is-link :link="{name:'chooseIdentity',params:{isFromLogin:false}}">
    <span slot='value'>{{getCurrentRoleName()}}</span>
    <span slot='default' class='companyName'>{{GET_CURRENTROLE().nsrmc}}</span>
  </cell> -->
      <cell-box is-link :link="{name:'chooseIdentity',params:{isFromLogin:false}}">
        <div slot='default'>
          当前办税身份<span class='companyName'>{{GET_CURRENTROLE().nsrmc}}</span>
        </div>
      </cell-box>
      <cell-box is-link link='/bindCompany'>
        <div slot='default'>
          我的全部身份<!-- <span class='companyName'>{{GET_CURRENTROLE().nsrmc}}</span> -->
        </div>
      </cell-box>
      <cell title='管理办税人员' is-link link='/taxList'> 
        
      </cell>
      <cell title='授权确认' is-link>
        
      </cell>
    </group>
    <group>
      <cell title='修改密码' is-link link='modifyPassword'></cell>
    </group>
    <group>
      <cell-box is-link>
        关于
      </cell-box>
    </group>
    <v-footbar></v-footbar>
  </div>
</template>
<script>
import {
  Group,
  CellBox,
  Cell
} from 'vux'
import {mapGetters} from 'vuex'
export default {
  components: {
    Group,
    CellBox,
    Cell
  },
  methods:{
     ...mapGetters(['GET_NSRINFO','GET_CURRENTROLE','GET_ACCOUNTINFO']),
     getCurrentRoleName(){
      if(this.GET_CURRENTROLE()){
        return this.GET_CURRENTROLE().roleName.split('-')[0];
      }else {
        return '';
      }
     }
  },
  created(){
    console.log(this.GET_CURRENTROLE())
  }
}
</script>
<style lang='less'>
#about.container {
  .icon-geren {
    font-size: 3rem;
    border-radius: 50%;
    margin-right: 0.5rem;
    border: 1px solid #ccc;
    color: #fff;
    background: #ccc;
  }
  .companyName {
    font-size: 0.8rem;
    margin-left: 0.5rem;
    color: #7A7A7A
  }
}
</style>
