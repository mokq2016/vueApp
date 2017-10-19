<template>
  <div class="container" id='fbzlupload'>
    <div class='fixedHead'>
      <v-headerbar title='附报资料上传'>
      </v-headerbar>
    </div>
    <div class="content mtHead">
      <div v-for="item in items">
        <span class='title'>{{item.fbzl_mc}}</span><span style="margin-left:1rem" class='red'>{{item.bbbz=='Y'?'必报':'非必报'}}</span>
        <v-fileupload :params='item' @completeUploadEvt='saveFbzlxxWithoutImageData' @deleteFileEvt='deleteFile' :useDefaultTitle='false' :uploadAddr="'/api/dzzl/upload?filepath=/'" :ref='item.fbzl_dm'></v-fileupload>
      </div>
    </div>
    <div class='mt3'>
      <x-button type="primary" class='w80' action-type='button' @click.native='uploadFile()'>下一步</x-button>
    </div>
  </div>
</template>
<script>
import {
  mapState
} from 'vuex';
import {
  XButton
} from 'vux'
import wsService from '../../common/wsService'
import constant from '../../common/constant'
export default {
  components: {
    XButton
  },
  data() {
    return {
      sqxh: '',
      items: [],
      uploadCount: 0,
      formData: {},
      saveFileArr: []
    }
  },
  methods: {
    init() {
      let self = this;
      let param = this.$route.query;
      this.formData = param.formData;
      this.items = [];
      this.saveFileArr = [];
      wsService.getSqxh().then(function(result) { //获取申请序号
        if (result.success) {
          self.sqxh = result.data;
          //获取附报资料列表
          wsService.getFbzlList(self.sqxh, constant.swsxConstants.SWSX_DM_CKZHZHBG).then(
            function(result) {
              if (result.success) {
                self.items = result.data;
              } else {
                self.$alert(result.message);
              }
            })
        } else {
          self.$alert(result.message)
        }
      })
    },
    deleteFile(fileKey) {
      let self = this;
      this.saveFileArr.map((index, item) => {
        if (item == fileKey) {
          self.saveFileArr.splice(index, 1);
          return false;
        }
      })
    },
    uploadFile() {
      let self = this;
      let validate = true;
      Object.values(self.$refs).forEach(function(child) {
        if (child[0].params.bbbz == 'Y' && child[0].filesArr.length === 0) {
          self.$alert('必报资料必须上传！');
          validate = false;
          return false;
        }
      })
      if (!validate) {
        return;
      }
      this.uploadCount = 0;
      this.$showLoading('图片上传中...');
      Object.values(this.$refs).map((child) => {
        child[0].upload();
      })
    },
    saveFbzlxxWithoutImageData(fileArr, params) {
      let self = this;
      let info = [];
      fileArr.forEach(function(item) {
        if (item.completeUpload && self.saveFileArr.indexOf(item.fileKey) === -1) {
          info.push(item.fileKey + ',' + (item.fileSize / 1024).toFixed(2) + ',' + item.fileType)
        }
      })
      if (info.length === 0) {
        self.uploadCount++;
        if (self.uploadCount === self.items.length) {
          self.$vux.loading.hide();
          let param = {
            sqxh: self.sqxh,
            step1Data: self.formData
          }
          self.$router.push({
            name: 'ckzhbg_step3',
            query: {
              formData: JSON.stringify(param)
            }
          })
        }
        return;
      }
      console.log(info)
      let param = {
        info: JSON.stringify(info),
        sqxh: this.sqxh,
        fbzldm: params.fbzl_dm,
        swsxdm: constant.swsxConstants.SWSX_DM_CKZHZHBG,
        fbzlmc: params.fbzl_mc,
        fbzlxh: params.fbzl_xh
      }
      wsService.saveFbzlxxWithoutImageData(param).then(function(result){ //
        if (result.success) {
          self.uploadCount++;
          info.map((item) => {
            self.saveFileArr.push(item.split(',')[0]);
          })
          if (self.uploadCount === self.items.length) {
            self.$vux.loading.hide();
            let param = {
              sqxh: self.sqxh,
              step1Data: self.formData
            }
            self.$router.push({
              name: 'ckzhbg_step3',
              query: {
                formData: JSON.stringify(param)
              }
            })
          }
        } else {
          self.$alert(result.message)
        }
      })
    }
  },
  computed: {
    ...mapState({
      nsrInfo: state => state.user.nsrInfo
    })
  },
  beforeRouteEnter(to, from, next) {
    if (from.path == '/ckzhzhbg') {
      to.meta['needClear'] = true;
    } else {
      to.meta['needClear'] = false;
    }
    next();
  },
  activated() {
    if (this.$route.meta['needClear']) {
      this.init()
    }
  },
  created() {
    this.init();
  }
}
</script>
<style lang='less'>
#fbzlupload {
  .content {
    .title {
      margin-left: 0.8rem;
      margin-right: 0.8rem;
      font-size: 1.3rem;
      display: inline-block;
    }
    .weui-cells {
      margin-top: 0.1rem;
    }
  }
}
</style>
