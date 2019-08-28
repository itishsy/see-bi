<template>
    <div>
      <action-bar :actionBarJson="actionBarJson" ref="actionBar" @doRefresh="doRefresh"></action-bar>
      <div class="cashFlow mt-10">
        <square-border :squBorHeight="squBorHeight">
          <ul style="height: 100%;">
            <li :style="{height: liHeight, lineHeight: liHeight}">
              <p class="text-l">应税收入（不含税）:</p>
              <p class="text-r"><span v-text="invoiceData.taxableIncome"></span></p>
            </li>
            <li :style="{height: liHeight, lineHeight: liHeight}">
              <p class="text-l">增值税:</p>
              <p class="text-r"><span v-text="invoiceData.valueAddedTax"></span></p>
            </li>
            <li :style="{height: liHeight, lineHeight: liHeight}">
              <p class="text-l">差额金额:</p>
              <p class="text-r"><span v-text="invoiceData.balanceAmount"></span></p>
            </li>
            <li :style="{height: liHeight, lineHeight: liHeight}">
              <p class="text-l">开票总金额:</p>
              <p class="text-r"><span v-text="invoiceData.totalInvoicingAmount"></span></p>
            </li>
          </ul>
        </square-border>
      </div>
    </div>
</template>
<script>
import ActionBar from '../../common/report/ActionBar'
import SquareBorder from '../../common/report/SquareBorder'
export default {
  name: 'InvoiceInfo',
  components: {ActionBar, SquareBorder},
  data () {
    return {
      actionBarJson: {
        'title': '客户发票信息',
        'type': ['fullscreen', 'filter', 'search', 'sync'],
        'fullscreenRef': 'actionBar',
        'position': 'right'
      },
      invoiceData: {}
    }
  },
  props: ['height'],
  computed: {
    squBorHeight: function () {
      return this.height - 47
    },
    liHeight: function () {
      return (this.height - 47 - 20) / 4 + 'px'
    }
  },
  created () {
    this.getServerData()
  },
  methods: {
    getServerData () {
      this.$get('/api/invoice/countInvoiceAmountByMonth/201907', {}).then((r) => {
        if (r.data.code === '00001') {
          this.invoiceData = r.data.data
        } else {
          this.$message.error('网络错误，请检查')
        }
      }).catch(() => {
        this.$message.error('网络错误，请检查')
      })
    },
    doRefresh () {
    }
  }
}
</script>

<style lang='less' scoped>
  .cashFlow {
    font-size: 16px;
    li {
      display: flex;
      letter-spacing: 2px;
      .text-l {
        text-align: left;
      }
      .text-r {
        text-align: right;
        flex: 1;
      }
    }
  }
</style>
