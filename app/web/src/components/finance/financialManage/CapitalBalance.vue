<template>
  <div class="capitalBalance">
    <a-row type="flex" justify="space-between">
      <a-col :span="7" class="around-col">
        <ActionBar :actionBarJson="actionBarJson" @doRefresh="doRefresh"></ActionBar>
      </a-col>
    </a-row>
    <a-row type="flex" ref="test1" justify="space-between" class="main-bottom" style="height: 100%;">
      <a-col :span="7" class="around-col" style="height: 100%;">
        <div class="around-bg" style="height: 100%;">
          <div class="income-area" style="height: 100%;">
            <span class="title">收入</span>
            <ve-bar :data="incomeData" height="100%" :settings="incomeChartSettings"
                    :extend="incomeChartExtend"></ve-bar>
          </div>
        </div>
      </a-col>
      <a-col :span="7" class="around-col" style="height: 100%;">
        <div class="around-bg" style="height: 100%;">
          <div class="income-area" style="height: 100%;">
            <span class="title">支出</span>
            <ve-bar :data="payData" height="100%" :settings="payChartSettings"
                    :extend="payChartExtend"></ve-bar>
          </div>
        </div>
      </a-col>
      <a-col :span="7" class="around-col" style="height: 100%;">
        <div class="balance-bg" style="height: 100%;">
          <div class="balance-area" style="height: 100%;">
            <span class="title">结余</span>
            <ve-bar :data="balanceData" height="100%" :settings="balanceChartSettings"
                    :extend="balanceChartExtend"></ve-bar>
          </div>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import ActionBar from '../../common/report/ActionBar'
import VeBar from 'v-charts/lib/bar.common'

export default {
  name: 'CapitalBalance',
  data () {
    /* 收入 */
    this.incomeChartExtend = {
      series: {
        type: 'bar',
        barWidth: '50%',
        barCategoryGap: '50%',
        width: '100%',
        height: '100%',
        center: ['50%', '50%']
      },
      'series.0.itemStyle.color': {
        type: 'linear',
        x: 0,
        y: 0,
        x2: 1,
        y2: 0,
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
      xAxis: {
        'show': false
      },
      'yAxis.0.axisLabel.color': '#4cb5f5', // y轴文本颜色
      'yAxis.0.axisLabel.fontSize': 16, // y轴文本字体大小
      yAxis: {
        'show': true,
        'splitLine': false,
        'axisLine': {
          'show': false
        }
      },
      grid: {
        'top': '10',
        'width': '80%',
        'height': '85%',
        containLabel: {
          'containLabel': true
        }
      },
      legend: {
        'show': false
      }
    }
    this.incomeChartSettings = {
      label: {
        'show': false
      }
    }
    /* 支出 */
    this.payChartExtend = {
      series: {
        type: 'bar',
        barWidth: '50%',
        barCategoryGap: '50%',
        width: '100%',
        height: '100%',
        center: ['50%', '50%']
      },
      'series.0.itemStyle.color': {
        type: 'linear',
        x: 0,
        y: 0,
        x2: 1,
        y2: 0,
        colorStops: [
          {
            offset: 0,
            color: '#B53194' // 0% 处的颜色
          },
          {
            offset: 1,
            color: '#2C67E8' // 100% 处的颜色
          }
        ],
        global: false // 缺省为 false
      },
      xAxis: {
        'show': false,
        'splitLine': false
      },
      'yAxis.0.axisLabel.color': '#4cb5f5', // y轴文本颜色
      'yAxis.0.axisLabel.fontSize': 16, // y轴文本字体大小
      yAxis: {
        'show': true,
        'splitLine': false,
        'axisLine': {
          'show': false
        }
      },
      grid: {
        'top': '10',
        'width': '80%',
        'height': '85%',
        containLabel: {
          'containLabel': true
        }
      },
      legend: {
        'show': false
      }
    }
    this.payChartSettings = {
      label: {
        'show': false
      }
    }
    /* 结余 */
    this.balanceChartExtend = {
      series: {
        type: 'bar',
        barWidth: '50%',
        barCategoryGap: '50%',
        width: '100%',
        height: '100%',
        center: ['50%', '50%']
      },
      'series.0.itemStyle.color': {
        type: 'linear',
        x: 0,
        y: 0,
        x2: 1,
        y2: 0,
        colorStops: [
          {
            offset: 0,
            color: '#173375' // 0% 处的颜色
          },
          {
            offset: 1,
            color: '#1551B3' // 100% 处的颜色
          }
        ],
        global: false // 缺省为 false
      },
      xAxis: {
        'show': false,
        'splitLine': false
      },
      'yAxis.0.axisLabel.color': '#4cb5f5', // y轴文本颜色
      'yAxis.0.axisLabel.fontSize': 16, // y轴文本字体大小
      yAxis: {
        'show': true,
        'splitLine': false,
        'axisLine': {
          'show': false
        }
      },
      grid: {
        'top': '10',
        'width': '80%',
        'height': '85%',
        containLabel: {
          'containLabel': true
        }
      },
      legend: {
        'show': false
      }
    }
    this.balanceChartSettings = {
      label: {
        'show': false
      }
    }

    return {
      barHeight: this.height - 42 + 'px',
      actionBarJson: {
        'title': '201907资金收支结余',
        'type': ['fullscreen', 'filter', 'search', 'sync'],
        'fullscreenRef': 'test1'
      },
      dimensionType: 0, // 维度 0代表银行维度  1代表客户维度
      incomeData: {
        columns: [],
        rows: []
      },
      payData: {
        columns: [],
        rows: []
      },
      balanceData: {
        columns: [],
        rows: []
      }
    }
  },
  components: {ActionBar, VeBar},
  created () {
    this.getIncomeData()
  },
  methods: {
    /* 收入 */
    getIncomeData () {
      var url = ''
      var incomeColumns = []
      var payColumns = []
      var balanceColumns = []
      if (this.dimensionType === 0) {
        /* 银行维度 */
        url = '/api/finance/countBalanceOfPaymentsByBank/'
        incomeColumns = ['bankName', 'amount']
        payColumns = ['bankName', 'amount']
        balanceColumns = ['bankName', 'amount']
      } else {
        /* 客户维度 */
        url = '/api/finance/countBalanceOfPaymentsByCust/'
        incomeColumns = ['custName', 'incomeAmount']
        payColumns = ['custName', 'expenditureAmount']
        balanceColumns = ['custName', 'balance']
      }
      this.$get(url + '201907', {}).then((r) => {
        if (r.data.code === '00001') {
          /* 收入 */
          this.incomeData.columns = incomeColumns
          this.incomeData.rows = r.data.data.income.items
          /* 支出 */
          this.payData.columns = payColumns
          this.payData.rows = r.data.data.expenditure.items
          /* 结余 */
          this.balanceData.columns = balanceColumns
          this.balanceData.rows = r.data.data.balance.items
        } else {
          this.$message.error('网络错误，请检查')
        }
      }).catch(() => {
        this.$message.error('网络错误，请检查')
      })
    },
    // 刷新
    doRefresh () {

    }
  }
}
</script>

<style lang="less" scoped>
  .capitalBalance {
    height: 100%;
    display: flex;
    display: -webkit-flex;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-flex-flow: column;
    flex-flow: column;
    .main-bottom {
      -webkit-box-flex: 1;
      -webkit-flex: 1;
      flex: 1;
    }
  }

  .around-bg {
    margin-top: 5px;
    padding: 50px 30px 0px 30px;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    background: url(/static/img/income-bg.png);
    background-size: 100% 100%
  }

  .balance-bg {
    margin-top: 5px;
    padding: 50px 30px 0px 30px;
    width: 100%;
    height: 100%;
    background: url(/static/img/balance-bg.png);
    background-size: 100% 100%
  }

  .income-area {
    position: relative;
    .title {
      position: absolute;
      top: -35px;
      right: 17%;
      color: #62ffff;
      font-size: 18px;
      font-weight: bold;
    }
  }

  .balance-area {
    position: relative;
    .title {
      position: absolute;
      top: -35px;
      left: 17%;
      color: #62ffff;
      font-size: 18px;
      font-weight: bold;
    }
  }
</style>
