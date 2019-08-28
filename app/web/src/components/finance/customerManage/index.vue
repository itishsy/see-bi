<template>
  <div style="height: 100%;">
      <a-row type="flex" justify="center" align="top" style="height: 100%;">
        <a-col :span="5" style="height: 100%;">
          <div style="height: 100%;">
            <customer-balance height="100%"></customer-balance>
          </div>
        </a-col>
        <a-col :span="19" style="height: 100%;">
          <div style="height: 100%;">
          <div>
            <a-row type="flex" justify="center" align="top" style="height: 100%;">
              <a-col :span="17" style="height: 60%;">
                <IncomeTrend :height="heightTop"></IncomeTrend>
              </a-col>
              <a-col :span="7">
                <invoice-info :height="heightTop*0.4"></invoice-info>
                <customer-pay :height="heightTop*0.6"></customer-pay>
              </a-col>
            </a-row>
          </div>
          <div>
            <income-ratio :height="heightBottom"></income-ratio>
          </div>
          </div>
        </a-col>
      </a-row>
  </div>
</template>
<script>
import CustomerBalance from './CustomerBalance'
import IncomeTrend from './IncomeTrend'
import InvoiceInfo from './InvoiceInfo'
import CustomerPay from './CustomerPay'
import IncomeRatio from './IncomeRatio'
export default {
  name: 'index',
  data () {
    return {}
  },
  components: {CustomerBalance, IncomeTrend, InvoiceInfo, CustomerPay, IncomeRatio},
  computed: {
    heightTop: function () {
      return (this.$global.bodyContainHeight) * 0.6
    },
    heightBottom: function () {
      return (this.$global.bodyContainHeight) * 0.4
    }
  },
  created () {

  },
  methods: {}
}
</script>

<style lang='less' scoped>

</style>
