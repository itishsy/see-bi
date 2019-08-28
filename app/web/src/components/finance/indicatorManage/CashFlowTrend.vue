<template>
  <div style="height: 100%;">
    <action-bar :actionBarJson="actionBarJson" ref="actionBar" @doRefresh="doRefresh"></action-bar>
    <div>
      <square-border :squBorHeight="squBorHeight">
        <div class="radioTab">
          <a-radio-group v-model="showTab" :style="{ marginTop: '10px' }">
            <a-radio-button value="0">按天现金流量趋势</a-radio-button>
            <a-radio-button value="1">按月现金流量趋势</a-radio-button>
          </a-radio-group>
        </div>
        <div :style="{height: squBorBottomHeight}">
          <div style="height: 100%;">
            <div style="height: 60%;">
              <ve-line :data="analysisByDayData" height="100%" :settings="chartSettings" :extend="chartExtend"></ve-line>
            </div>
            <div style="height: 40%;padding-bottom: 20px;">
              <table style="width: 100%;height: 100%;">
                <tr>
                  <td></td>
                  <td :key="index" v-for="(item,index) in dateArr" v-text="item"></td>
                </tr>
                <tr>
                  <td>预估资金净额</td>
                  <td :key="index" v-for="(estimateNet,index) in estimateNetAmountArr" v-text="estimateNet"></td>
                </tr>
                <tr>
                  <td>预估资金流出</td>
                  <td :key="index" v-for="(estimateOutflow,index) in estimateOutflowAmountArr" v-text="estimateOutflow"></td>
                </tr>
                <tr>
                  <td>预估资金流入</td>
                  <td :key="index" v-for="(estimateInflow,index) in estimateInflowAmountArr" v-text="estimateInflow"></td>
                </tr>
                <tr>
                  <td>当天资金净额</td>
                  <td :key="index" v-for="(net,index) in netAmountArr" v-text="net"></td>
                </tr>
                <tr>
                  <td>当天资金流出</td>
                  <td :key="index" v-for="(outflow,index) in outflowAmountArr" v-text="outflow"></td>
                </tr>
                <tr>
                  <td>当天资金流入</td>
                  <td :key="index" v-for="(inflow,index) in inflowAmountArr" v-text="inflow"></td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </square-border>
    </div>
  </div>
</template>
<script>
import '../../../../static/less/TabStyle.css'
import ActionBar from '../../common/report/ActionBar'
import SquareBorder from '../../common/report/SquareBorder'
import VeLine from 'v-charts/lib/line.common'
export default {
  name: 'CashFlowTrend',
  components: {ActionBar, SquareBorder, VeLine},
  data () {
    this.chartSettings = {
      metrics: ['inflowAmount', 'outflowAmount', 'netAmount', 'estimateInflowAmount', 'estimateOutflowAmount', 'estimateNetAmount'],
      dimension: ['date'],
      stack: { 'number': ['increaseNumber', 'insuranceNumber', 'attritionNumber'] },
      labelMap: {
        'inflowAmount': '当天资金流入',
        'outflowAmount': '当天资金流出',
        'netAmount': '当天资金净额',
        'estimateInflowAmount': '预估资金流入',
        'estimateOutflowAmount': '预估资金流出',
        'estimateNetAmount': '预估资金净额'
      }
    }
    this.chartExtend = {
      series: {
        type: 'line',
        width: '100%',
        height: '100%',
        center: ['50%', '50%']
      },
      legend: {
        'show': true,
        'right': 20,
        'textStyle': {'color': '#62ffff', 'fontSize': '14'}
      },
      grid: {
        containLabel: {
          'containLabel': true
        },
        left: 20,
        right: 20,
        bottom: 20
      },
      'xAxis.0.axisLabel.color': '#62ffff', // x轴文本颜色
      'xAxis.0.axisLabel.fontSize': 12, // x轴文本字体大小
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
        'splitLine': true,
        'splitNumber': '12',
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
        'title': '现金流量趋势分析',
        'type': ['fullscreen', 'filter', 'search', 'sync'],
        'fullscreenRef': 'actionBar',
        'position': 'right'
      },
      chartSetObj: {startColor: '#D02EB5', endColor: '#F9E641', chartTitle: '盈利现金比率变化情况'},
      analysisByDayData: {
        columns: ['date', 'inflowAmount'],
        rows: []
      },
      dateArr: [],
      inflowAmountArr: [],
      outflowAmountArr: [],
      netAmountArr: [],
      estimateInflowAmountArr: [],
      estimateOutflowAmountArr: [],
      estimateNetAmountArr: [],

      analysisByMonthData: {
        columns: ['month', 'inflowAmount'],
        rows: []
      },
      showTab: '0' // 0是按天，1是按月
    }
  },
  props: [],
  computed: {
    squBorHeight: function () {
      return this.$global.bodyContainHeight - 47
    },
    squBorBottomHeight: function () {
      return this.$global.bodyContainHeight - 57 - 42 + 'px'
    }
  },
  watch: {
    showTab: function (newVal, oldVal) {
      if (newVal === '0') {
        this.getAnalysisByDayData()
      } else if (newVal === '1') {
        this.getAnalysisByMonthData()
      }
    }
  },
  created () {
    this.getAnalysisByDayData()
  },
  methods: {
    getAnalysisByDayData () {
      this.$get('/api/finance/countCashFlowAnalysisByDay/20190701', {}).then((r) => {
        if (r.data.code === '00001') {
          this.analysisByDayData.rows = r.data.data.itemsData
          this.analysisByDayData.columns = ['date', 'inflowAmount']
          this.chartSettings.dimension = ['date']
          this.getTableData()
        } else {
          this.$message.error('网络错误，请检查')
        }
      }).catch(() => {
        this.$message.error('网络错误，请检查')
      })
    },
    getAnalysisByMonthData () {
      this.$get('/api/finance/countCashFlowAnalysisByMonth/201907', {}).then((r) => {
        if (r.data.code === '00001') {
          this.analysisByDayData.rows = r.data.data.itemsData
          this.analysisByDayData.columns = ['month', 'inflowAmount']
          this.chartSettings.dimension = ['month']
          this.getTableData()
        } else {
          this.$message.error('网络错误，请检查')
        }
      }).catch(() => {
        this.$message.error('网络错误，请检查')
      })
    },
    getTableData () {
      var item
      this.dateArr = []
      this.inflowAmountArr = []
      this.outflowAmountArr = []
      this.netAmountArr = []
      this.estimateInflowAmountArr = []
      this.estimateOutflowAmountArr = []
      this.estimateNetAmountArr = []
      for (var i = 0; i < this.analysisByDayData.rows.length; i++) {
        item = this.analysisByDayData.rows[i]
        if (this.showTab === '0') {
          this.dateArr.push(item.date)
        } else {
          this.dateArr.push(item.month)
        }
        this.inflowAmountArr.push(item.inflowAmount)
        this.outflowAmountArr.push(item.outflowAmount)
        this.netAmountArr.push(item.netAmount)
        this.estimateInflowAmountArr.push(item.estimateInflowAmount)
        this.estimateOutflowAmountArr.push(item.estimateOutflowAmount)
        this.estimateNetAmountArr.push(item.estimateNetAmount)
      }
    },
    doRefresh () {
    }
  },
  filters: {
    format: function (val, arg) {
      if (!val) return
      val = val.replace(/-/g, '')
      return val
    }
  }
}
</script>

<style lang='less' scoped>
  table td{
    border: 1px solid #0E8EBD;
    font-size: 12px;
    background-color: #073F64;
    color: #62ffff;
    padding: 3px;
    height: 30px;
  }
  table td:first-of-type{
    width: 100px;
  }
</style>
