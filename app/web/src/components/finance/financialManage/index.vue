<template lang="html">
  <div>
      <div :style="{height: heightTop + 'px'}">
        <a-row type="flex" justify="center" align="top" style="height: 100%;">
          <a-col  :span="7" style="height: 100%;">
            <div>
              <business-flow :height="heightTop"></business-flow>
            </div>
          </a-col>
          <a-col :span="10" style="height: 100%;">
            <ve-profit :height="heightTop"></ve-profit>
          </a-col>
          <a-col :span="7" style="height: 100%;">
            <customer-balance :height="heightTop"></customer-balance>
          </a-col>
        </a-row>
      </div>
    <div :style="{height: heightBottom+ 'px'}">
      <capital-balance></capital-balance>
    </div>
    </div>
</template>

<script>
import BusinessFlow from './BusinessFlow'
import VeProfit from './Profit'
import CustomerBalance from './CustomerBalance'
import CapitalBalance from './CapitalBalance'
export default {
  data () {
    return {
      heightTop: (this.$global.bodyContainHeight) * 0.6,
      heightBottom: (this.$global.bodyContainHeight) * 0.36
    }
  },
  methods: {
    // 刷新
    doRefresh () {
      this.$refs.actionBar1.spin = false
    },
    doRefresh1 () {
      /* this.$refs.actionBar1.spin = false */
    },
    onSelect (obj) {
      this.$emit('menuSelect', obj)
    },
    // 全屏
    toggle (fullscreenRef) {
      this.$fullscreen.toggle(this.$parent.$refs[fullscreenRef], {
        wrap: false,
        callback: this.fullscreenChange
      })
    },
    fullscreenChange (fullscreen) {
      this.fullscreen = fullscreen
    }
  },
  components: {BusinessFlow, VeProfit, CustomerBalance, CapitalBalance}
}

</script>

<style lang="less" scoped>
  .around-col {
    min-width: 160px;
    .ant-divider-inner-text {
      padding: 0;
    }
  }

</style>
