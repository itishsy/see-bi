<template>
  <div class="pt-10">
    <action-bar :actionBarJson="actionBarJson" ref="actionBar" @doRefresh="doRefresh"></action-bar>
    <div>
      <square-border :squBorHeight="squBorHeight">
        <ability-analysis :chartData="chartData" :chartSetObj="chartSetObj"></ability-analysis>
      </square-border>
    </div>
  </div>
</template>
<script>
import ActionBar from '../../common/report/ActionBar'
import SquareBorder from '../../common/report/SquareBorder'
import AbilityAnalysis from './AbilityAnalysis'
export default {
  name: 'CountAcquiredAbility',
  components: {ActionBar, SquareBorder, AbilityAnalysis},
  data () {
    return {
      actionBarJson: {
        'title': '2019年盈利能力分析',
        'type': ['fullscreen', 'filter', 'search', 'sync'],
        'fullscreenRef': 'actionBar',
        'position': 'right'
      },
      chartSetObj: {startColor: '#D02EB5', endColor: '#F9E641', chartTitle: '盈利现金比率变化情况'},
      chartData: {
        columns: ['month', 'ratio'],
        rows: []
      }
    }
  },
  props: ['height'],
  computed: {
    squBorHeight: function () {
      return this.height - 57
    }
  },
  created () {
    this.getCountAcquiredAbility()
  },
  methods: {
    getCountAcquiredAbility () {
      this.$get('/api/finance/countProfitability/201907', {}).then((r) => {
        if (r.data.code === '00001') {
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
</style>
