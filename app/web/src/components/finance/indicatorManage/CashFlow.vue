<template>
    <div>
      <action-bar :actionBarJson="actionBarJson" ref="actionBar" @doRefresh="doRefresh"></action-bar>
      <div class="cashFlow">
        <square-border :squBorHeight="squBorHeight">
          <ul style="height: 100%;">
            <li :style="{height: liHeight, lineHeight: liHeight}">
              <p class="text-l">当天资金余额:</p>
              <p class="text-r"><span v-text="cashData.balance"></span>(万元)</p>
            </li>
            <li :style="{height: liHeight, lineHeight: liHeight}">
              <p class="text-l">当天资金流入:</p>
              <p class="text-r"><span v-text="cashData.inflowAmount"></span>(万元)</p>
            </li>
            <li :style="{height: liHeight, lineHeight: liHeight}">
              <p class="text-l">当天资金流出:</p>
              <p class="text-r"><span v-text="cashData.outflowAmount"></span>(万元)</p>
            </li>
            <li :style="{height: liHeight, lineHeight: liHeight}">
              <p class="text-l">当天资金流入流出净额:</p>
              <p class="text-r"><span v-text="cashData.netAmount"></span>(万元)</p>
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
  name: 'CashFlow',
  components: {ActionBar, SquareBorder},
  data () {
    return {
      actionBarJson: {
        'title': '当天现金流量',
        'type': ['fullscreen', 'filter', 'search', 'sync'],
        'fullscreenRef': 'actionBar',
        'position': 'right'
      },
      cashData: {}
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
      this.$get('/api/finance/capitalFlowByDate/20190701', {}).then((r) => {
        if (r.data.code === '00001') {
          this.cashData = r.data.data
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
