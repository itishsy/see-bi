<template>
    <div class="insureTrend">
      <ActionBar :actionBarJson="actionBarJson" @doRefresh="doRefresh"></ActionBar>
      <square-border :squBorHeight="squBorHeight">
        <div style="height: 100%;">
          <a-row type="flex" justify="space-around">
            <a-col :span="6" class="around-col">
              <a-divider class="divider-text">增员人数</a-divider>
              <div class="divider-area">
                <p class="text-red text-center" v-text="increaseNumberTotal"></p>
                <div class="detail">
                  <a-row :key="item.increaseNumber" v-for="item in insuredNumData">
                    <a-col :span="16"><p class="text-right"><span v-text="item.bussinessName"></span>增员人数：</p></a-col>
                    <a-col :span="8">
                      <p v-if="item.bussinessName=='社保'" class="text-orange" v-text="item.increaseNumber"></p>
                      <p v-else class="text-red" v-text="item.increaseNumber"></p>
                    </a-col>
                  </a-row>
                </div>
              </div>
            </a-col>
            <a-col :span="6" class="around-col">
              <a-divider class="divider-text">在保人数</a-divider>
              <div class="divider-area">
                <p class="text-red text-center" v-text="insuranceNumberTotal"></p>
                <div class="detail">
                  <a-row :key="item.insuranceNumber" v-for="item in insuredNumData">
                    <a-col :span="16"><p class="text-right"><span v-text="item.bussinessName"></span>在保人数：</p></a-col>
                    <a-col :span="8">
                      <p v-if="item.bussinessName=='社保'" class="text-orange" v-text="item.insuranceNumber"></p>
                      <p v-else class="text-red" v-text="item.insuranceNumber"></p>
                    </a-col>
                  </a-row>
                </div>
              </div>
            </a-col>
            <a-col :span="6" class="around-col">
              <a-divider class="divider-text">减员人数</a-divider>
              <div class="divider-area">
                <p class="text-red text-center" v-text="attritionNumberTotal"></p>
                <div class="detail">
                  <a-row :key="item.attritionNumber" v-for="item in insuredNumData">
                    <a-col :span="16"><p class="text-right"><span v-text="item.bussinessName"></span>减员人数：</p></a-col>
                    <a-col :span="8">
                      <p v-if="item.bussinessName=='社保'" class="text-orange" v-text="item.attritionNumber"></p>
                      <p v-else class="text-red" v-text="item.attritionNumber"></p>
                    </a-col>
                  </a-row>
                </div>
              </div>
            </a-col>
          </a-row>

          <div class="mt-10" :style="{height: squBorHeight - 47 +'px'}">
            <ve-line :data="chartData" height="98%" :settings="chartSettings" :extend="chartExtend"></ve-line>
          </div>
        </div>
      </square-border>
    </div>
</template>
<script>
import ActionBar from '../../common/report/ActionBar'
import SquareBorder from '../../common/report/SquareBorder'
import VeLine from 'v-charts/lib/line.common'
export default {
  name: 'InsuredTrend',
  data () {
    this.chartSettings = {
      stack: { 'number': ['increaseNumber', 'insuranceNumber', 'attritionNumber'] },
      labelMap: {'increaseNumber': '增员人数', 'insuranceNumber': '在保人数', 'attritionNumber': '减员人数'}
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
        'right': 0,
        'textStyle': {'color': '#62ffff', 'fontSize': '14'}
      },
      grid: {
        containLabel: {
          'containLabel': true
        }
      },
      'xAxis.0.axisLabel.color': '#62ffff', // x轴文本颜色
      'xAxis.0.axisLabel.fontSize': 16, // x轴文本字体大小
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
        'title': '年度参保人数走势',
        'type': ['fullscreen', 'filter', 'search', 'sync'],
        'fullscreenRef': 'test1'
      },
      insuredNumData: [], // 参保人数
      increaseNumberTotal: 0,
      insuranceNumberTotal: 0,
      attritionNumberTotal: 0,

      chartData: {
        columns: ['month', 'increaseNumber', 'insuranceNumber', 'attritionNumber'],
        rows: []
      }
    }
  },
  props: ['height'],
  components: {ActionBar, SquareBorder, VeLine},
  computed: {
    squBorHeight: function () {
      return this.height - 47
    }
  },
  created () {
    this.GetInsuredNumData()
    this.GetTrendData()
  },
  methods: {
    GetInsuredNumData () {
      this.$get('/api/employee/countInInsuranceByMonth/201907', {}).then((r) => {
        if (r.data.code === '00001') {
          this.insuredNumData = r.data.data.itemsData
          for (let i = 0; i < this.insuredNumData.length; i++) {
            this.increaseNumberTotal += this.insuredNumData[i].increaseNumber
            this.insuranceNumberTotal += this.insuredNumData[i].insuranceNumber
            this.attritionNumberTotal += this.insuredNumData[i].attritionNumber
          }
        } else {
          this.$message.error('网络错误，请检查')
        }
      }).catch(() => {
        this.$message.error('网络错误，请检查')
      })
    },
    GetTrendData () {
      this.$get('/api/employee/countInInsuranceByYear/201907', {}).then((r) => {
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
</style>
