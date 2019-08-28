<template>
    <div class="mt-10">
      <action-bar :actionBarJson="actionBarJson" ref="actionBar" @doRefresh="doRefresh"></action-bar>
      <div class="mt-5" :style="{ height: histogramHeight+'px'}">
        <ve-histogram height="100%" :data="chartData" :settings="chartSettings" :extend="chartExtend"></ve-histogram>
      </div>
    </div>
</template>
<script>
import ActionBar from '../../common/report/ActionBar'
import VeHistogram from 'v-charts/lib/histogram.common'
export default {
  name: 'CustomerPay',
  data () {
    this.chartSettings = {
      metrics: ['paymentAmount'],
      dimension: ['paymentType']
    }
    this.chartExtend = {
      series: {
        type: 'bar',
        barWidth: '30%',
        barCategoryGap: '70%',
        width: '100%',
        height: '100%',
        center: ['50%', '50%']
      },
      'series.0.itemStyle.color': {
        type: 'linear',
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [
          {
            offset: 0,
            color: '#01D6DC' // 0% 处的颜色
          },
          {
            offset: 1,
            color: '#0B8EFA' // 100% 处的颜色
          }
        ],
        global: false // 缺省为 false
      },
      title: {
        show: true,
        textStyle: {
          color: '#62ffff',
          fontSize: '16px'
        },
        left: 'center',
        top: '10px'
      },
      legend: {
        'show': false
      },
      grid: {
        containLabel: {
          'containLabel': true
        },
        bottom: 0
      },
      'xAxis.0.axisLabel.color': '#62ffff', // x轴文本颜色
      'xAxis.0.axisLabel.fontSize': 12, // x轴文本字体大小
      'yAxis.0.axisLabel.color': '#62ffff', // x轴文本颜色
      'yAxis.0.axisLabel.fontSize': 12, // x轴文本字体大小
      yAxis: {
        'show': true,
        'type': 'value',
        'splitLine': true,
        'splitNumber': '4',
        axisLine: {
          'show': true,
          lineStyle: {
            color: '#62ffff'
          }
        }
      },
      xAxis: {
        'show': true,
        'splitLine': false,
        'axisLine': {
          'show': true,
          lineStyle: {
            color: '#62ffff'
          }
        }
      }
    }
    return {
      actionBarJson: {
        'title': '201903客户回款',
        'type': ['fullscreen', 'filter', 'search', 'sync'],
        'fullscreenRef': 'actionBar',
        'position': 'right'
      },
      chartData: {
        columns: ['paymentType', 'paymentAmount'],
        rows: []
      }
    }
  },
  props: ['height'],
  components: {ActionBar, VeHistogram},
  computed: {
    histogramHeight: function () {
      return this.height - 47
    }
  },
  created () {
    this.getCountAcquiredAbility()
  },
  methods: {
    getCountAcquiredAbility () {
      this.$get('/api/finance/countCustPaybackByType/201907', {}).then((r) => {
        if (r.data.code === '00001') {
          console.log(r.data.data.itemsData)
          this.chartData.rows = r.data.data.itemsData
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
  .histogram-bg {
    position: relative;
    margin-top: 5px;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    background: url(/static/img/incomRatio-bg.png);
    background-size: 100% 100%;
    padding-top: 15px;
  }
</style>
