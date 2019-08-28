<template>
  <div class="pl-10 pt-15" :style="{ height: height+'px'}">
    <div class="radioTab">
      <a-tabs type="card" defaultActiveKey="1">
        <a-tab-pane tab="收入利润同比" key="1">
          <a-row :gutter="14">
            <a-col class="gutter-row" :span="8">
              <div class="gutter-box">
                <div class="profit-bg" :style="{ height: profitBgHeight+'px'}">
                  <p class="type"><span>收入</span></p>
                  <div :style="{ height: profitHeight+'px'}">
                    <profit :data="incomeData " height="100%"></profit>
                  </div>
                </div>
              </div>
            </a-col>
            <a-col class="gutter-row" :span="8">
              <div class="gutter-box">
                <div class="profit-bg" :style="{ height: profitBgHeight+'px'}">
                  <p class="type"><span>毛利润</span></p>
                  <div :style="{ height: profitHeight+'px'}">
                    <profit :data="grossProfitData" height="100%"></profit>
                  </div>
                </div>
              </div>
            </a-col>
            <a-col class="gutter-row" :span="8">
              <div class="gutter-box">
                <div class="profit-bg" :style="{ height: profitBgHeight+'px'}">
                  <div :style="{ height: profitHeight+'px'}">
                    <p class="type"><span>净利润</span></p>
                    <profit :data="profitData" height="100%"></profit>
                  </div>
                </div>
              </div>
            </a-col>
          </a-row>
        </a-tab-pane>
        <a-tab-pane tab="收入利润环比" key="2">
          <a-row :gutter="14">
            <a-col class="gutter-row" :span="8">
              <div class="gutter-box">
                <div class="profit-bg" :style="{ height: profitBgHeight+'px'}">
                  <div :style="{ height: profitHeight+'px'}">
                    <p class="type"><span>收入</span></p>
                    <profit :data="ringIncomeData" height="100%"></profit>
                  </div>
                </div>
              </div>
            </a-col>
            <a-col class="gutter-row" :span="8">
              <div class="gutter-box">
                <div class="profit-bg" :style="{ height: profitBgHeight+'px'}">
                  <div :style="{ height: profitHeight+'px'}">
                    <p class="type"><span>净利润</span></p>
                    <profit :data="ringGrossProfitData" height="100%"></profit>
                  </div>
                </div>
              </div>
            </a-col>
            <a-col class="gutter-row" :span="8">
              <div class="gutter-box">
                <div class="profit-bg" :style="{ height: profitBgHeight+'px'}">
                  <div :style="{ height: profitHeight+'px'}">
                    <p class="type"><span>净利润</span></p>
                    <profit :data="ringProfitData" height="100%"></profit>
                  </div>
                </div>
              </div>
            </a-col>
          </a-row>
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>
<script>
import profit from './Profit.vue'

export default {
  name: 'IncomeRatio',
  data () {
    return {
      yearOnYearData: [],
      ringRatioData: []
    }
  },
  props: ['height'],
  components: {profit},
  computed: {
    profitBgHeight: function () {
      return this.height - 60
    },
    profitHeight: function () {
      return this.height - 60 - 55
    },
    incomeData: function () {
      var incomeData = {
        columns: ['year', 'incomeAmount'],
        rows: this.yearOnYearData
      }
      return incomeData
    },
    profitData: function () {
      var profitData = {
        columns: ['year', 'profitAmount'],
        rows: this.yearOnYearData
      }
      return profitData
    },
    grossProfitData: function () {
      var grossProfitData = {
        columns: ['year', 'grossProfitAmount'],
        rows: this.yearOnYearData
      }
      return grossProfitData
    },
    ringIncomeData: function () {
      var incomeData = {
        columns: ['month', 'incomeAmount'],
        rows: this.ringRatioData
      }
      return incomeData
    },
    ringProfitData: function () {
      var profitData = {
        columns: ['month', 'profitAmount'],
        rows: this.ringRatioData
      }
      return profitData
    },
    ringGrossProfitData: function () {
      var grossProfitData = {
        columns: ['month', 'grossProfitAmount'],
        rows: this.ringRatioData
      }
      return grossProfitData
    }
  },
  created () {
    this.getYearOnYearData() // 收入利润同比
    this.getRingRatioData() // 收入利润环比
  },
  methods: {
    getYearOnYearData () {
      this.$get('/api/finance/countIncomeCostProfitYearOnYear', {}).then((r) => {
        this.yearOnYearData = r.data.data
      }).catch(() => {
        this.$message.error('网络错误')
      })
    },
    getRingRatioData () {
      this.$get('/api/finance/countIncomeCostProfitRingRatio', {}).then((r) => {
        this.ringRatioData = r.data.data
      }).catch(() => {
        this.$message.error('网络错误')
      })
    }
  }
}
</script>

<style lang='less' scoped>
  .profit-bg {
    position: relative;
    margin-top: 5px;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    background: url(/static/img/incomRatio-bg.png);
    background-size: 100% 100%;
    padding-top: 15px;
    .type {
      width: 95px;
      height: 25px;
      background: url(/static/img/icons/ic-incomeRatio-type.png);
      background-size: 95px 25px;
      text-align: center;
      margin-left: 15px;
      color: #62ffff;
      font-size: 16px;
    }
  }
</style>
