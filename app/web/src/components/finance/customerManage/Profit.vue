<template>
    <div style="height: 100%;">
      <ve-ring :data="data" height="100%" :settings="profitChartSettings"
               :extend="profitChartExtend"></ve-ring>
    </div>
</template>
<script>
import VeRing from 'v-charts/lib/ring.common'
export default {
  name: 'Profit.vue',
  data () {
    this.profitChartSettings = {
      radius: ['25%', '75%']
    }
    this.profitChartExtend = {
      series: {
        center: ['50%', '50%'],
        label: {
          position: 'outside',
          formatter: '{b}\n{c}\n{d}%',
          fontSize: '14',
          lineHeight: 20,
          color: '#62ffff'
        },
        labelLine: {
          length: 25,
          length2: 20,
          lineStyle: {
            color: '#ffffff'
          }
        }
      },
      grid: {
        containLabel: {
          'containLabel': true
        },
        top: 0
      },
      legend: {
        'show': false
      }
    }
    return {

    }
  },
  components: {VeRing},
  props: ['data'],
  created () {

  },
  methods: {

  }
}
</script>

<style lang='less' scoped>

</style>
