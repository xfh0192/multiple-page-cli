<template>
  <footer class="pay__footer">
    <div class="pay__footer__layout">
      <div class="black-333 bold">
        总计<em>￥{{totalPrice}}</em>
      </div>
      <a class="btn_primary" 
          @click="clickFn">去结算</a>
    </div>
  </footer>
</template>

<script>
export default {
  props: {
    // payUrl: String,
    payFn: Function,
    totalPrice: [String, Number],
  },
  data() {
    return {
      btnDisabled: false
    }
  },
  methods: {
    clickFn() {
      this.$emit('clickPay')
    }
  }
}
</script>

<style lang="scss" scoped>
// @import '../css/variable';
// @import '../css/mixin';
@import '~@/mobile/css/mobile-component-output';


.pay__footer {
  @include page-footer();
  @include fixedPC();
}

.pay__footer__layout {
  @include flex-box(row, space-between);
  font-size: 40px;
  padding-left: suit-size(3);
  div em {
      font-size: 40px;
  }
  a {
    @include line-height-center(auto, unset);
    font-weight: 500;
    width: 226px;
    border-radius: 0;
  }
}
</style>
