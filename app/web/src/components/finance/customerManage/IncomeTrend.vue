<template>
  <div class="profit" style="height: 100%;padding: 0 10px;">
    <square-border :squBorHeight="squBorHeight">
      <div class="pt-10">
        <a-row type="flex" justify="space-around">
          <a-col :span="6" class="around-col">
            <a-divider class="divider-text">收入</a-divider>
            <div class="divider-area">
              <p class="text-center" v-text="countIncomeCost.incomeTotalAmount"></p>
              <div class="detail">
                <a-row>
                  <a-col :span="12"><p class="text-right">主营收入：</p></a-col>
                  <a-col :span="12"><p><span class="text-orange" v-text="countIncomeCost.incomeMainAmount"></span>万元</p>
                  </a-col>
                </a-row>
                <a-row>
                  <a-col :span="12"><p class="text-right">BCA收入：</p></a-col>
                  <a-col :span="12"><p><span class="text-red" v-text="countIncomeCost.incomeBCAAmount"></span>万元</p>
                  </a-col>
                </a-row>
              </div>
            </div>
          </a-col>
          <a-col :span="6" class="around-col">
            <a-divider class="divider-text">毛利润</a-divider>
            <div class="divider-area">
              <p class="text-center" v-text="countIncomeCost.grossProfitTotalAmount"></p>
              <div class="detail">
                <a-row>
                  <a-col :span="12"><p class="text-right">主营毛利：</p></a-col>
                  <a-col :span="12"><p><span class="text-orange" v-text="countIncomeCost.grossProfitMainAmount"></span>万元
                  </p></a-col>
                </a-row>
                <a-row>
                  <a-col :span="12"><p class="text-right">BCA毛利：</p></a-col>
                  <a-col :span="12"><p><span class="text-red" v-text="countIncomeCost.grossProfitBCAAmount"></span>万元
                  </p></a-col>
                </a-row>
              </div>
            </div>
          </a-col>
          <a-col :span="6" class="around-col">
            <a-divider class="divider-text">净利润</a-divider>
            <div class="divider-area">
              <p class="text-center" v-text="countIncomeCost.profitTotalAmount"></p>
              <div class="detail">
                <a-row>
                  <a-col :span="12"><p class="text-right">主营净利润：</p></a-col>
                  <a-col :span="12"><p><span class="text-orange" v-text="countIncomeCost.profitMainAmount"></span>万元</p>
                  </a-col>
                </a-row>
                <a-row>
                  <a-col :span="12"><p class="text-right">BCA净利润：</p></a-col>
                  <a-col :span="12"><p><span class="text-red" v-text="countIncomeCost.profitBCAAmount"></span>万元</p>
                  </a-col>
                </a-row>
              </div>
            </div>
          </a-col>
        </a-row>
      </div>
      <div class="radioTab mt-10">
        <a-tabs type="card" defaultActiveKey="1">
          <a-tab-pane tab="全年收入走势图" key="1">
            <div :style="{height: trendHeight + 'px'}">
              <ve-line :height="trendHeight + 'px'" :data="fullYearIncomeData"
                       :settings="fullYearIncomeSettings" :extend="fullYearIncomeExtend"></ve-line>
            </div>
          </a-tab-pane>
          <a-tab-pane tab="收入达成比" key="2">
            <div :style="{height: trendHeight + 'px'}">
              <ve-histogram :height="trendHeight + 'px'" :data="teamIncomeRatioData"
                            :settings="teamIncomeRatioSettings" :extend="teamIncomeRatioExtend"></ve-histogram>
            </div>
          </a-tab-pane>
        </a-tabs>
        <div class="radioTab-action">
          <action-bar :actionBarJson="actionBarJson" ref="actionBar" @doRefresh="doRefresh"></action-bar>
        </div>
      </div>
    </square-border>
  </div>
</template>

<script>
import '../../../../static/less/TabStyle.css'
import ActionBar from '../../common/report/ActionBar'
import VeLine from 'v-charts/lib/line.common'
import VeHistogram from 'v-charts/lib/histogram.common'
import SquareBorder from '../../common/report/SquareBorder'

export default {
  name: 'IncomeTrend',
  data () {
    this.profitChartSettings = {
      radius: ['20%', '80%'],
      label: {
        'show': true,
        'position': 'inside',
        'seriesLayoutBy': 'row'
      },
      legendLimit: '6'
    }
    this.profitChartExtend = {
      series: {
        center: ['50%', '50%'],
        label: {
          position: 'inside',
          formatter: '{c}\n{d}%',
          fontSize: '14'
        }
      },
      grid: {
        containLabel: {
          'containLabel': true
        }
      },
      legend: {
        'show': true,
        'bottom': 30,
        'right': 100,
        'orient': 'vertical',
        'textStyle': {'color': '#62ffff', 'fontSize': '14'},
        'itemWidth': 13,
        'itemHeight': 13
      }
    }

    this.fullYearIncomeSettings = {
      metrics: ['incomeAmount', 'profitAmount', 'grossProfitAmount'],
      dimension: ['month'],
      stack: {'number': ['increaseNumber', 'insuranceNumber', 'attritionNumber']},
      labelMap: {
        'incomeAmount': '收入',
        'profitAmount': '纯利润',
        'grossProfitAmount': '毛利润'
      }
    }
    this.fullYearIncomeExtend = {
      series: {
        type: 'line',
        width: '100%',
        height: '100%',
        center: ['50%', '50%']
      },
      legend: {
        'show': true,
        'right': 20,
        'textStyle': {'color': '#62ffff', 'fontSize': '12'}
      },
      grid: {
        containLabel: {
          'containLabel': true
        },
        top: 20,
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

    this.teamIncomeRatioSettings = {
      dimension: ['teamName'],
      axisSite: {right: ['incomeRatio']},
      stack: {'number': ['increaseNumber', 'insuranceNumber', 'attritionNumber']},
      labelMap: {
        'actualIncome': '实际收入',
        'targetIncome': '目标收入',
        'incomeRatio': '收入达成比'
      }
    }
    this.teamIncomeRatioExtend = {
      'series.0.type': 'bar',
      'series.0.barWidth': '10%',
      'series.0.itemStyle.color': {
        type: 'linear',
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [
          {
            offset: 0,
            color: '#0B8EFA' // 0% 处的颜色
          },
          {
            offset: 1,
            color: '#01D6DC' // 100% 处的颜色
          }
        ],
        global: false // 缺省为 false
      },

      'series.1.type': 'bar',
      'series.1.barWidth': '10%',
      'series.1.itemStyle.color': '#F53D01',

      'series.2.type': 'line',
      'series.2.itemStyle.color': '#E29407',
      legend: {
        'show': true,
        'right': 20,
        'textStyle': {'color': '#62ffff', 'fontSize': '12'}
      },
      grid: {
        containLabel: {
          'containLabel': true
        },
        top: 35,
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
      profitData: {
        columns: ['bussinessName', 'profitAmount'],
        rows: []
      },
      actionBarJson: {
        'title': '',
        'type': ['fullscreen', 'filter', 'search', 'sync'],
        'fullscreenRef': 'actionBar',
        'align': 'right'
      },
      countIncomeCost: {},
      fullYearIncomeData: {
        columns: ['month', 'incomeAmount'],
        rows: []
      },
      teamIncomeRatioData: {
        columns: ['teamName', 'actualIncome', 'targetIncome', 'incomeRatio'],
        rows: []
      }
    }
  },
  props: ['height'],
  components: {ActionBar, SquareBorder, VeLine, VeHistogram},
  computed: {
    squBorHeight: function () {
      return this.height
    },
    trendHeight: function () {
      return this.height - 150
    }
  },
  created () {
    this.getCountIncomeCost() // 收入成本利润
    this.getFullYearIncomeData() // 全年收入走势图
    this.getTeamIncomeRatioData() // 收入达成比
  },
  methods: {
    getFullYearIncomeData () {
      this.$get('/api/finance/countFullYearIncome/201907', {}).then((r) => {
        if (r.data.code === '00001') {
          this.fullYearIncomeData.rows = r.data.data.itemsData
        } else {
          this.$message.error('网络错误，请检查')
        }
      }).catch(() => {
        this.$message.error('网络错误，请检查')
      })
    },
    getTeamIncomeRatioData () {
      this.$get('/api/finance/countTeamIncomeRatio/201907', {}).then((r) => {
        if (r.data.code === '00001') {
          this.teamIncomeRatioData.rows = r.data.data.itemsData
        } else {
          this.$message.error('网络错误，请检查')
        }
      }).catch(() => {
        this.$message.error('网络错误，请检查')
      })
    },
    getCountIncomeCost () {
      this.$get('/api/finance/countIncomeCostProfit/201907', {}).then((r) => {
        this.countIncomeCost = r.data.data
      }).catch(() => {
        this.$message.error('网络错误')
      })
    },
    doRefresh () {

    }
  }
}
</script>

<style lang="less">
  .divider-area {
    border-left: 2px solid #206D8B;
    border-right: 2px solid #206D8B;
    border-bottom: 2px solid #3E9AD5;
    width: 100%;
    text-align: left;
    margin-top: -10px;
    padding: 12px 0px 5px 0px;
    letter-spacing: 2px;
    position: relative;
    color: #62ffff;
    p {
      overflow: initial;
    }
    .detail {
      color: #62ffff;
    }
  }

  .divider-area:before {
    content: '';
    display: table-cell;
    position: absolute;
    top: -6px;
    left: 50%;
    margin-left: -75px;
    width: 27px;
    height: 13px;
    background: url(/static/img/icons/ic-bright-spot.png) no-repeat;
  }

  .divider-area:after {
    content: '';
    display: table-cell;
    position: absolute;
    top: -6px;
    left: 50%;
    margin-left: 47px;
    width: 27px;
    height: 13px;
    background: url(/static/img/icons/ic-bright-spot.png) no-repeat;
  }

  .ant-divider-horizontal.ant-divider-with-text {
    color: #62ffff!important;
    margin: 0;
    padding: 0;
    font-size: 14px;
    letter-spacing: 2px;
  }

  .ant-divider-horizontal.ant-divider-with-text:before, .ant-divider-horizontal.ant-divider-with-text-left:before, .ant-divider-horizontal.ant-divider-with-text-right:before, .ant-divider-horizontal.ant-divider-with-text:after, .ant-divider-horizontal.ant-divider-with-text-left:after, .ant-divider-horizontal.ant-divider-with-text-right:after {
    border-top: 2px solid #206D8B;
  }

  .square-border-contain {
    margin-top: 0;
  }

  .radioTab .ant-tabs.ant-tabs-card > .ant-tabs-bar .ant-tabs-tab {
    width: 125px !important;
  }

  .radioTab {
    .radioTab-action{
      right: 20px;
      top: -5px;
    }
  }
</style>
