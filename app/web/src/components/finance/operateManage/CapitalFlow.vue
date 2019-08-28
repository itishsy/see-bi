<template>
  <div class="pt-10 capitalFlow" :style="{height: capitalHeight+'px'}">
    <action-bar :actionBarJson="actionBarJson" ref="actionBar" @doRefresh="doRefresh"></action-bar>
    <div class="main-bottom">
      <square-border :squBorHeight="squBorHeight">
        <p class="amount" :style="{height: rowHeight,lineHeight: rowHeight}">业务资金流入流出净额：<span class="text-red" v-text="capitalTotal"></span>万元</p>
        <table style="width: 100%;border: none">
          <thead>
          <tr :style="{height: rowHeight}">
            <th>业务类型</th>
            <th>资金总流入</th>
            <th>资金总流出</th>
          </tr>
          </thead>
          <tbody>
          <tr :style="{height: rowHeight}" :key="item.bussinessCode" v-for="item in capitalData">
            <td v-text="item.bussinessName"></td>
            <td v-text="item.inflowAmount"></td>
            <td v-text="item.outflowAmount"></td>
          </tr>
          </tbody>
        </table>
      </square-border>
    </div>
  </div>
</template>
<script>
import ActionBar from '../../common/report/ActionBar'
import SquareBorder from '../../common/report/SquareBorder'

export default {
  name: 'CapitalFlow',
  components: {ActionBar, SquareBorder},
  data () {
    return {
      actionBarJson: {
        'title': '201907业务资金流量',
        'type': ['fullscreen', 'filter', 'search', 'sync'],
        'fullscreenRef': 'actionBar',
        'position': 'right'
      },
      capitalData: [],
      capitalTotal: 0
    }
  },
  props: ['capitalHeight'],
  created () {
    this.getCapitalData()
  },
  computed: {
    squBorHeight: function () {
      return this.capitalHeight - 57
    },
    rowHeight: function () {
      let length = this.capitalData.length === 0 ? 10 : this.capitalData.length + 2
      return (this.capitalHeight - 57 - 20) / length + 'px'
    }
  },
  methods: {
    getCapitalData () {
      this.$get('/api/finance/capitalFlowByBussiness/201907', {}).then((r) => {
        if (r.data.code === '00001') {
          this.capitalData = r.data.data.itemsData
          for (let i = 0; i < this.capitalData.length; i++) {
            this.capitalTotal += this.capitalData[i].netAmount
          }
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
  .capitalFlow {
    font-size: 16px;
    letter-spacing: 2px;
    table {
      th {
        font-weight: normal;
        color: #62ffff;
      }
    }
  }
</style>
