<template lang="html">
  <div :style="{height: this.$global.bodyContainHeight + 'px'}" v-cloak>
      <a-row type="flex" justify="center" align="top" style="height: 100%;">
        <a-col  :span="6" style="height: 100%;padding-right: 10px;">
          <div class="contain-l" style="height: 100%;">
            <!--新增客户-->
            <new-customers></new-customers>
            <!--服务人数-->
            <service-number></service-number>
            <!--业务资金流量-->
            <div class="capital-main-bottom" ref="capitalMainBottom">
              <capital-flow :capitalHeight="capitalHeight"></capital-flow>
            </div>
          </div>
        </a-col>
        <a-col :span="12" style="height: 100%;">
          <div style="height: 100%;">
            <!--趋势-->
            <insured-trend :height="insuredTopHeight"></insured-trend>
            <!--同比&&环比-->
            <insured-ratio :height="insuredBottomHeight"></insured-ratio>
          </div>
        </a-col>
        <a-col :span="6" style="height: 100%;padding-left: 10px;">
          <customer-balance :height="insuredTopHeight"></customer-balance>
        </a-col>
      </a-row>
  </div>
</template>

<script>
import NewCustomers from './NewCustomers'
import ServiceNumber from './ServiceNumber'
import CapitalFlow from './CapitalFlow'
import InsuredTrend from './InsuredTrend'
import InsuredRatio from './InsuredRatio'
import VeProfit from '../financialManage/Profit'
import CustomerBalance from '../financialManage/CustomerBalance'
import CapitalBalance from '../financialManage/CapitalBalance'
export default {
  components: {NewCustomers, ServiceNumber, CapitalFlow, InsuredTrend, InsuredRatio, VeProfit, CustomerBalance, CapitalBalance},
  data () {
    return {
      capitalHeight: 0 // 业务资金流量的高度
    }
  },
  computed: {
    insuredTopHeight: function () {
      // 年度参保人数走势的上半部分高度
      return (this.$global.bodyContainHeight) * 0.65
    },
    insuredBottomHeight: function () {
      // 年度参保人数走势的下半部分高度
      return (this.$global.bodyContainHeight) * 0.35
    }
  },
  created () {
    this.$nextTick(() => {
      this.capitalHeight = this.$refs.capitalMainBottom.offsetHeight
    })
  },
  methods: {
    // 刷新
    doRefresh () {
      this.$refs.actionBar.spin = false
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
  }
}

</script>

<style lang="less" scoped>
  [v-cloak]{
    display: none;
  }
  .around-col {
    min-width: 160px;
    .ant-divider-inner-text {
      padding: 0;
    }
  }
  .contain-l{
    display: flex;
    display: -webkit-flex;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-flex-flow: column;
    flex-flow: column;
    .capital-main-bottom {
      -webkit-box-flex: 1;
      -webkit-flex: 1;
      flex: 1;
    }
  }

</style>
