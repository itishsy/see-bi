<template>
  <div :style="{height: this.$global.bodyContainHeight + 'px'}" v-cloak>
    <a-row type="flex" justify="center" align="top" style="height: 100%;">
      <a-col  :span="6" style="height: 100%;padding-right: 10px;">
        <!--当天现金流量-->
        <cash-flow :height="this.$global.bodyContainHeight * 0.3"></cash-flow>
        <!--获现能力分析-->
        <count-acquired-ability :height="this.$global.bodyContainHeight * 0.35"></count-acquired-ability>
        <!--盈利能力分析-->
        <count-profit-ability :height="this.$global.bodyContainHeight * 0.35"></count-profit-ability>
      </a-col>
      <a-col :span="18" style="height: 100%;">
        <cash-flow-trend height="100%"></cash-flow-trend>
      </a-col>
    </a-row>
  </div>
</template>
<script>
import CashFlow from './CashFlow'
import CountAcquiredAbility from './CountAcquiredAbility'
import CountProfitAbility from './CountProfitAbility'
import CashFlowTrend from './CashFlowTrend'
export default {
  name: 'index',
  components: {CashFlow, CountAcquiredAbility, CountProfitAbility, CashFlowTrend},
  data () {
    return {}
  },
  created () {

  },
  methods: {}
}
</script>

<style lang='less' scoped>

</style>
