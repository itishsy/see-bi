<template>
  <div style="height: 100%;">
    <action-bar :actionBarJson="actionBarJson2" ref="actionBar" @doRefresh="doRefresh"></action-bar>
    <div class="customerBalance-area">
      <div :style="{height:barHeight}">
        <ve-bar height="100%" :data="customerData" :settings="customerChartSettings"
                :extend="customerChartExtend"></ve-bar>
      </div>
    </div>
  </div>
</template>

<script>
import ActionBar from '../../common/report/ActionBar'
import VeBar from 'v-charts/lib/bar.common'

export default {
  name: 'CustomerBalance',
  components: {ActionBar, VeBar},
  data () {
    this.customerChartExtend = {
      'series.1.barGap': '-100%',
      'series.0.itemStyle.color': '#62ffff',
      'series.0.z': '10',
      'series.1.itemStyle.color': '#0B8BF9',
      series: {
        type: 'bar',
        barWidth: '50%',
        barCategoryGap: '70%',
        width: '100%',
        height: '100%',
        center: ['50%', '50%']
      },
      grid: {
        containLabel: {
          'containLabel': true
        }
      },
      'xAxis.0.axisLabel.color': '#4cb5f5', // x轴文本颜色
      'xAxis.0.axisLabel.fontSize': 16, // x轴文本字体大小
      'yAxis.0.axisLabel.color': '#4cb5f5', // y轴文本颜色
      'yAxis.0.axisLabel.fontSize': 16, // y轴文本字体大小
      xAxis: {
        'show': true,
        'type': 'value',
        'splitLine': false,
        'splitNumber': '4',
        axisLine: {
          'show': true,
          lineStyle: {
            color: '#62ffff'
          }
        }
      },
      yAxis: {
        'show': true,
        'splitLine': false,
        'axisLine': {
          'show': true,
          lineStyle: {
            color: '#62ffff'
          }
        }
      },
      legend: {
        'show': false
      }
    }
    this.customerChartSettings = {
      /* stack: {
          'balance': ['currentMonthBalance', 'accumulatedBalance']
        }, */
      dimension: ['custName'],
      metrics: ['currentMonthBalance', 'accumulatedBalance'],
      dataOrder: {
        label: 'accumulatedBalance',
        order: 'asc'
      },
      label: {
        'show': true,
        'position': 'right',
        'offset': [-25, -18],
        'color ': '#4cb5f5',
        'fontSize': '16'
      },
      scale: [true, true],
      labelMap: {
        'currentMonthBalance': '当月余额',
        'accumulatedBalance': '积累余额'
      }
    }
    return {
      barHeight: this.height - 42 + 'px',
      actionBarJson2: {
        'title': '2019客户欠款new',
        'type': ['fullscreen', 'filter', 'search', 'sync'],
        'fullscreenRef': 'test1'
      },
      customerData: {
        columns: ['custName', 'accumulatedBalance'],
        rows: []
      },
      countBalanceMonth: '2019-07'
    }
  },
  props: ['height'],
  created () {
    this.getData()
  },
  methods: {
    getData () {
      console.log(this.countBalanceMonth)
      this.$get('/api/finance/countBalanceByCust/201907', {}).then((r) => {
        this.customerData.rows = r.data.data.itemsData
        this.$refs.actionBar.spin = false
      }).catch(() => {

      })
    },
    doRefresh () {
      this.countBalanceMonth = '201908'
      this.getData()
    }
  }
}
</script>

<style lang="less" scoped>
  .customerBalance-area {
    margin-top: 5px;
    padding: 0 50px 0 70px;
    width: 100%;
    background: url(/static/img/customerBalance-bg.png);
    background-size: 100% 100%
  }
</style>
