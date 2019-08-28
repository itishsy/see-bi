<template>
  <div class="profit" style="height: 100%;">
    <div class="pt-20">
      <a-row type="flex" justify="space-around">
        <a-col :span="6" class="around-col">
          <a-divider class="divider-text">收入(万元)</a-divider>
          <div class="divider-area">
            <p class="text-red text-center" v-text="countIncomeCost.incomeTotalAmount">1500</p>
            <div class="detail">
              <a-row>
                <a-col :span="12"><p class="text-right">主营收入：</p></a-col>
                <a-col :span="12"><p><span class="text-orange" v-text="countIncomeCost.incomeMainAmount"></span>万元</p></a-col>
              </a-row>
              <a-row>
                <a-col :span="12"><p class="text-right">BCA收入：</p></a-col>
                <a-col :span="12"><p><span class="text-red" v-text="countIncomeCost.incomeBCAAmount"></span>万元</p></a-col>
              </a-row>
              <a-row>
                <a-col :span="12"><p class="text-right">其他收入：</p></a-col>
                <a-col :span="12"><p><span class="text-white" v-text="countIncomeCost.incomeOtherAmount"></span>万元</p></a-col>
              </a-row>
            </div>
          </div>
        </a-col>
        <a-col :span="6" class="around-col">
          <a-divider class="divider-text">净利润(万元)</a-divider>
          <div class="divider-area">
            <p class="text-red text-center" v-text="countIncomeCost.profitTotalAmount"></p>
            <div class="detail">
              <a-row>
                <a-col :span="12"><p class="text-right">主营成本：</p></a-col>
                <a-col :span="12"><p><span class="text-orange" v-text="countIncomeCost.profitMainAmount"></span>万元</p></a-col>
              </a-row>
              <a-row>
                <a-col :span="12"><p class="text-right">BCA成本：</p></a-col>
                <a-col :span="12"><p><span class="text-red" v-text="countIncomeCost.profitBCAAmount"></span>万元</p></a-col>
              </a-row>
              <a-row>
                <a-col :span="12"><p class="text-right">其他成本：</p></a-col>
                <a-col :span="12"><p><span class="text-white" v-text="countIncomeCost.profitOtherAmount"></span>万元</p></a-col>
              </a-row>
            </div>
          </div>
        </a-col>
        <a-col :span="6" class="around-col">
          <a-divider class="divider-text">毛利润(万元)</a-divider>
          <div class="divider-area">
            <p class="text-red text-center" v-text="countIncomeCost.grossProfitTotalAmount"></p>
            <div class="detail">
              <a-row>
                <a-col :span="12"><p class="text-right">主营毛利：</p></a-col>
                <a-col :span="12"><p><span class="text-orange" v-text="countIncomeCost.grossProfitMainAmount"></span>万元</p></a-col>
              </a-row>
              <a-row>
                <a-col :span="12"><p class="text-right">BCA毛利：</p></a-col>
                <a-col :span="12"><p><span class="text-red" v-text="countIncomeCost.grossProfitBCAAmount"></span>万元</p></a-col>
              </a-row>
              <a-row>
                <a-col :span="12"><p class="text-right">其他毛利：</p></a-col>
                <a-col :span="12"><p><span class="text-white" v-text="countIncomeCost.grossProfitOtherAmount"></span>万元</p></a-col>
              </a-row>
            </div>
          </div>
        </a-col>
      </a-row>
    </div>
    <div class="ring-area" :style="{height: ringHeight}">
      <ve-ring :data="profitData" height="100%" :settings="profitChartSettings"
               :extend="profitChartExtend"></ve-ring>
    </div>
  </div>
</template>

<script>
import VeRing from 'v-charts/lib/ring.common'

export default {
  name: 'profit',
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
      /* 'series.0.itemStyle.color': '#0B8BF9', */
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
    return {
      profitData: {
        columns: ['bussinessName', 'profitAmount'],
        rows: []
      },
      countIncomeCost: {},
      ringHeight: this.height - 125 + 'px'
    }
  },
  props: ['height'],
  components: {VeRing},
  created () {
    this.getProfitData() // 饼图数据
    this.getCountIncomeCost() // 收入成本利润
  },
  methods: {
    getProfitData () {
      this.$get('/api/finance/countProfitByBussiness/201907', {}).then((r) => {
        this.profitData.rows = r.data.data.itemsData
      }).catch(() => {
        this.$message.error('网络错误')
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

<style lang="less" scoped>
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
    color: #62ffff;
    margin: 0;
    padding: 0;
    font-size: 14px;
    letter-spacing: 2px;
  }

  .ant-divider-horizontal.ant-divider-with-text:before, .ant-divider-horizontal.ant-divider-with-text-left:before, .ant-divider-horizontal.ant-divider-with-text-right:before, .ant-divider-horizontal.ant-divider-with-text:after, .ant-divider-horizontal.ant-divider-with-text-left:after, .ant-divider-horizontal.ant-divider-with-text-right:after {
    border-top: 2px solid #206D8B;
  }

  .ring-area {
    position: relative;
  }

  .ring-area:before {
    content: '';
    display: table-cell;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 0;
    width: 50px;
    height: 245px;
    max-height: 80%;
    background: url(/static/img/icons/ic-ring-l.png) no-repeat;
    -webkit-background-size: 50px 100%;
    background-size: 50px 100%;
  }

  .ring-area:after {
    content: '';
    display: table-cell;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 0;
    width: 50px;
    height: 245px;
    max-height: 80%;
    background: url(/static/img/icons/ic-ring-r.png) no-repeat;
    -webkit-background-size: 50px 100%;
    background-size: 50px 100%;
  }
</style>
