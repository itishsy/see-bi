<!-- 层叠柱状图 -->
<style lang="stylus" scoped>
.line
  height 1000px
  background url('../../assets/bg.jpg') no-repeat
  background-size 100% 100%
  .main
    width 100%
    height calc(100% - 100px)
    margin-top -15px
</style>

<template>
<div class="line">
  <v-header :name="name" :legendArr="legendArr" :myChart="myChart"></v-header>
  <v-filter :myChart="myChart" v-if="myChart._dom"></v-filter>
  <div class="main"></div>
</div>

</template>

<script>
import echarts from 'echarts'
import header from './common/header'
import filter from './common/filter'

export default {
  data () {
    return {
      legendArr: [],
      myChart: {},
      name: '折线图'
    }
  },
  methods: {
    init () {
      this.legendArr = this.myChart.getOption().series
      this.legendArr.forEach((data) => {
        data.selected = true
      })
      this.$root.charts.push(this.myChart)
      window.addEventListener('resize', function () {
        this.myChart.resize()
      }.bind(this))
    }
  },
  components: {
    'v-header': header,
    'v-filter': filter
  },
  mounted () {
    // 基于准备好的dom，初始化echarts实例
    this.myChart = echarts.init(document.querySelector('.line .main'))
    this.$get('charts.data.week').then((res) => {
      let data = res.data
      this.myChart.setOption({
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: [data.Mon, data.Tue, data.Wed, data.Thu, data.Fri, data.Sat, data.Sun],
          type: 'line'
        }]
      })
      this.init()
    })
  }
}

</script>
