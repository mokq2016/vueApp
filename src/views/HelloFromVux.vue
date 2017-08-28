<template>
  <div>
    <!-- <v-header></v-header>
    <div>
        <div class="vux-demo">
            <img class="logo" src="../assets/vux_logo.png">
            <h1> </h1>
        </div>
        <group title="cell demo">
            <cell title="Vux" value="Cool" is-link></cell>
        </group>
        <x-button type="primary">Top</x-button>
    </div> -->
    <scroller lock-x :use-pullup='true' ref="scroller">
    <div class="weui-cells weui-cells_form" id="uploaderCustom">
      <div class="weui-cell">
        <div class="weui-cell__bd">
          <div class="weui-uploader">
            <div class="weui-uploader__hd">
              <p class="weui-uploader__title">图片上传</p>
              <div class="weui-uploader__info">
              <span id='uploadCount'>0</span>/5
            </div>
            </div>
            <div class="weui-uploader__bd">
              <ul class="weui-uploader__files" id="uploaderCustomFiles"></ul>
              <div class="weui-uploader__input-box">
                <input id="uploaderCustomInput" accept="image/**" cap  class="weui-uploader__input js_file" type="file">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <x-button type="primary" class='w80 mt3' action-type='button' @click.native='upload()'>上传</x-button>
    </scroller>
  </div>

</template>
<script>
import {
  Toast,
  XButton,
  Group,
  Cell,
  Scroller
} from 'vux'
export default {
  components: {
    XButton,
    Group,
    Cell,
    Scroller
  },
  data() {
    return {
      // note: changing this line won't causes changes
      // with hot-reload because the reloaded component
      // preserves its current state and we are modifying
      // its initial state.
      msg: 'Hello World!',
      maxSize: 10240000,
      maxCount: 5,
      filesArr: []
    }
  },
  methods: {
    bindEvent() {
      let self = this;
      $("#uploaderCustomInput").on('change', function(event) {
        let files = event.target.files;
        // 如果没有选中文件，直接返回  
        if (files.length === 0) {
          return;
        }
        for (var i = 0; i < files.length; i++) {
          let file = files[i];
          self.filesArr.push(file)
          let reader = new FileReader();
          if (file.size > self.maxSize) {
            self.$alert('图片太大，不允许上传！');
            continue;
          }

          if ($('.weui_uploader_file').length >= self.maxCount) {
            self.$alert(`最多只能上传 ${maxCount} 张图片！`);
            return;
          }
          reader.onload = function(e) {
            var img = new Image();
            img.onload = function() {
              var canvas = document.createElement('canvas');
              var ctx = canvas.getContext('2d');
              var w = img.width;
              var h = img.height;
              // 设置 canvas 的宽度和高度  
              canvas.width = w;
              canvas.height = h;
              ctx.drawImage(img, 0, 0, w, h);
              var base64 = canvas.toDataURL('image/png');

              // 插入到预览区  
              var $preview = $('<li class="weui_uploader_file weui_uploader_status" style="background-image:url(' + base64 + ')"><i class="iconfont icon-delete"></i><span class="successFlag"></span></li>');
              $('#uploaderCustomFiles').append($preview);

            }
            img.src = e.target.result;
          }
          reader.readAsDataURL(file);
        }
      })
      $("#uploaderCustomFiles").on('click',function(event){
        let target = event.target;
        if($(target).hasClass('icon-delete')){
          self.filesArr.splice($(target).parent().index(),1);
          $(target).parent().remove();
          console.log(self.filesArr)
        }
      })
    },
    upload() {
      let self = this;
      this.filesArr.map((file) => {
        let param = new FormData();
        param.append('file2', file);
        self.$http.post('/upload/uploadFile', param, {
          'Content-Type': 'multipart/form-data;'
        }).then(function(result) {
          console.log(result)
        })
      })
    },
    removeImg(event){
      console.log(event.target)
    }
  },
  mounted() {
    this.bindEvent();
  }
}
</script>
<style>
.vux-demo {
  text-align: center;
}

.logo {
  width: 100px;
  height: 100px
}
.weui-uploader__hd{
  display: flex;
}
.weui-uploader__title{
  flex: 1;
}
.weui-uploader__info{
  color:#b2b2b2;
}
.weui-uploader__bd {
  margin-bottom: -4px;
  margin-right: -9px;
  overflow: hidden;
  margin-top: 0.4rem;
}

.weui-uploader__input-box {
  float: left;
  position: relative;
  margin-right: 9px;
  margin-bottom: 9px;
  width: 77px;
  height: 77px;
  border: 1px solid #d9d9d9;
}

.weui_uploader_file {
  float: left;
  margin-right: 9px;
  margin-bottom: 9px;
  width: 79px;
  height: 79px;
  background: no-repeat center center;
  background-size: cover;
  list-style: none;
}

.weui-uploader__input {
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}
.weui_uploader_file{
  position: relative;
  box-sizing: border-box;
  border: 1px solid #ccc;
}
.weui_uploader_file .iconfont{
    position: absolute;
    top: -4px;
    font-size: 1.4rem;
    right: -1px;
    color: red;
}
.weui_uploader_file .successFlag{
    display: inline-block;
    position: absolute;
    width: 0;
    height: 0;
    border-top: 1rem solid green;
    border-right: 1rem solid transparent;
}

.weui-uploader__input-box:before {
  width: 2px;
  height: 39.5px;
}

.weui-uploader__input-box:after {
  width: 39.5px;
  height: 2px;
}

.weui-uploader__input-box:after,
.weui-uploader__input-box:before {
  content: " ";
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  background-color: #d9d9d9;
}
</style>
