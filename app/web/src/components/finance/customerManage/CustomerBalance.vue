<template>
  <div style="height: 100%;">
    <action-bar :actionBarJson="actionBarJson2" ref="actionBar" @doRefresh="doRefresh"></action-bar>
    <div class="mt-10">
      <square-border :squBorHeight="squBorHeight">
      <div style="height: 100%;">
        <ve-bar height="100%" :data="customerData" :settings="customerChartSettings"
                :extend="customerChartExtend"></ve-bar>
      </div>
      </square-border>
    </div>
  </div>
</template>

<script>
import ActionBar from '../../common/report/ActionBar'
import SquareBorder from '../../common/report/SquareBorder'
import VeBar from 'v-charts/lib/bar.common'

export default {
  name: 'CustomerBalance',
  components: {ActionBar, SquareBorder, VeBar},
  data () {
    this.customerChartExtend = {
      'series.1.barGap': '-100%',
      'series.0.itemStyle.color': '#62ffff',
      'series.0.z': '10',
      'series.1.itemStyle.color': '#0B8BF9',
      series: {
        type: 'bar',
        barWidth: '30%',
        barCategoryGap: '70%',
        width: '100%',
        height: '100%',
        center: ['50%', '50%']
      },
      grid: {
        containLabel: {
          'containLabel': true
        },
        left: 20,
        right: 40,
        bottom: 10,
        top: 30
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
        'show': true,
        'top': 0,
        'right': 10,
        'textStyle': {'color': '#4cb5f5', 'fontSize': '12'},
        'itemWidth': 10,
        'itemHeight': 10,
        'itemGap': 20
      }
    }
    this.customerChartSettings = {
      dimension: ['custName'],
      metrics: ['annualArrears', 'accumulatedArrears'],
      /* dataOrder: {
        label: 'accumulatedBalance',
        order: 'asc'
      }, */
      label: {
        'show': false
      },
      scale: [true, true],
      labelMap: {
        'annualArrears': '年度欠款',
        'accumulatedArrears': '累积欠款'
      }
    }
    return {
      barHeight: this.$global.bodyContainHeight - 47 + 'px',
      actionBarJson2: {
        'title': '2019客户欠款',
        'type': ['fullscreen', 'filter', 'search', 'sync'],
        'fullscreenRef': 'test1'
      },
      customerData: {
        columns: ['custName', 'accumulatedArrears'],
        rows: []
      },
      countBalanceMonth: '2019'
    }
  },
  computed: {
    squBorHeight: function () {
      return this.$global.bodyContainHeight - 47
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      this.$get('/api/cust/countCustArrearsByYear/2019', {}).then((r) => {
        this.customerData.rows = r.data.data.itemsData
        this.$refs.actionBar.spin = false
      }).catch(() => {

      })
    },
    doRefresh () {
      this.countBalanceMonth = '2019-08'
      this.getData()
    }
  }
}
</script>

<style lang="less" scoped>
</style>
