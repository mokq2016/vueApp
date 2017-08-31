<template>
  <div class="minirefresh-wrap minirefresh-theme-default">
    <div  class="minirefresh-downwrap minirefresh-hardware-speedup">
      <div class="downwrap-content">
        <p class="downwrap-progress"></p>
        <p class="downwrap-tips">{{refreshTxt}}</p>
      </div>
    </div>
    <slot></slot>
  </div>
</template>
<script>
export default {
  props: {
    contentdown: {
      type: String,
      default: '下拉刷新'
    },
    contentover: {
      type: String,
      default: '释放刷新'
    },
    contentrefresh: {
      type: String,
      default: '加载中...'
    },
    contentsuccess: {
      type: String,
      default: '刷新成功'
    },
    contenterror: {
      type: String,
      default: '刷新失败'
    },
    contentUp: {
      type: String,
      default: '上拉显示更多'
    },
    contentnomore: {
      type: String,
      default: '没有更多数据了'
    },
  },
  data() {
    return {
      showRefresh: true,
      startTop: 0,
      startY: 0,
      startX: 0,
      downOffset: 30,
      downHight: 0,
      bounceTime: 300,
      refreshTxt: '',
    }
  },
  methods: {
    init() {
      this.bindEvent();
    },
    bindEvent() {
      this.$el.addEventListener('touchstart', this.handleTouchStart);
      this.$el.addEventListener('touchmove', this.handleTouchMove);
      this.$el.addEventListener('touchend', this.handleTouchEnd);
    },
    handleTouchStart(e) {
      if (this.cantRefresh) {
        e.preventDefault();
      }
      // 记录startTop, 并且只有startTop存在值时才允许move
      this.startTop = this.$el.scrollTop;

      // startY用来计算距离
      this.startY = e.touches ? e.touches[0].pageY : e.clientY;
      // X的作用是用来计算方向，如果是横向，则不进行动画处理，避免误操作
      this.startX = e.touches ? e.touches[0].pageX : e.clientX;
      console.log(this.startY)
    },
    handleTouchMove(e) {
      // 当前第一个手指距离列表顶部的距离
      var curY = e.touches ? e.touches[0].pageY : e.clientY;
      var curX = e.touches ? e.touches[0].pageX : e.clientX;

      // 和起点比,移动的距离,大于0向下拉
      var moveY = curY - this.startY;
      var moveX = curX - this.startX;

      if (moveY > 0) {
        this.showRefresh = true;
        this.refreshTxt = this.contentdown;
        this.downHight = Math.min(this.downOffset, moveY);

        this.translate(this.downHight);
      }
    },
    handleTouchEnd(e) {
      this.startY = 0;
      this.startX = 0;
      this.startTop = 0;
      this.translate(0, this.bounceTime);
      this.showRefresh = false;
    },
    translate(distance, duration) {
      distance = distance || 0;
      duration = duration || 0;
      if (this.downHight == this.downOffset) {
        this.refreshTxt = this.contentover;
      }
      this.$el.style.webkitTransitionDuration = duration + 'ms';
      this.$el.style.transitionDuration = duration + 'ms';
      this.$el.style.webkitTransform = 'translate(0px, ' + distance + 'px) translateZ(0px)';
      this.$el.style.transform = 'translate(0px, ' + distance + 'px) translateZ(0px)';
    }
  },
  mounted() {
    this.init();
  }
}
</script>
<style lang='less' scoped>
.minirefresh-wrap {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  overflow-x: hidden;
  overflow-y: hidden;
  z-index: 1;
  .minirefresh-hardware-speedup{
    transform: translateZ(0);
  }
  .minirefresh-downwrap,
 .minirefresh-hardware-speedup{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 75px;
    .downwrap-content {
    position: absolute;
    width: 100%;
    padding: 10px 0;
    text-align: center;
    .downwrap-progress {
      display: inline-block;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      border: 1px solid gray;
      margin-right: 8px;
      border-bottom-color: transparent;
      vertical-align: middle;
    }
    .downwrap-tips {
      display: inline-block;
      font-size: 12px;
      color: gray;
      vertical-align: middle;
    }
  }
  }
  
}
</style>
