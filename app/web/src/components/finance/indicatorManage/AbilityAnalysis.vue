<!--
  chartSetObj:{}  包含：startColor -- 渐变开始颜色，endColor -- 渐变结束颜色，chartTitle -- 图形标题
  chartData: []   图形数据：包含columns和rows
-->
<template>
  <div style="height: 100%;">
    <ve-histogram height="100%" :data="chartData" :settings="chartSettings" :extend="chartExtend"></ve-histogram>
  </div>
</template>
<script>
import VeHistogram from 'v-charts/lib/histogram.common'
export default {
  name: 'AbilityAnalysis',
  components: {VeHistogram},
  data () {
    this.chartSettings = {
      metrics: ['ratio'],
      dimension: ['month'],
      labelMap: {'ratio': '比率'}
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
            color: this.chartSetObj.startColor // 0% 处的颜色
          },
          {
            offset: 1,
            color: this.chartSetObj.endColor // 100% 处的颜色
          }
        ],
        global: false // 缺省为 false
      },
      title: {
        show: true,
        text: this.chartSetObj.chartTitle,
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
    }
  },
  props: ['chartSetObj', 'chartData'],
  created () {
  },
  methods: {
  }
}
</script>

<style lang='less' scoped>
</style>
