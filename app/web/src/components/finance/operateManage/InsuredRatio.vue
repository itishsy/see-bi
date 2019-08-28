<template>
  <div :style="{height:height+'px'}" style="padding-top: 10px;">
    <a-row>
      <a-col :span="12">
        <action-bar :actionBarJson="yearOnYearActBarJson" ref="actionBar" @doRefresh="doRefresh"></action-bar>
        <div :style="{height:height-47+'px'}">
          <ve-ring :data="yearOnYearData" height="100%" :settings="chartSettings"
                   :extend="yearOnYearChartExtend"></ve-ring>
        </div>
      </a-col>
      <a-col :span="12">
        <action-bar :actionBarJson="ringRatioActBarJson" ref="actionBar" @doRefresh="doRefresh"></action-bar>
        <div :style="{height:height-47+'px'}">
          <ve-ring :data="ringRatioData" height="100%" :settings="chartSettings"
                   :extend="ringRatioChartExtend"></ve-ring>
        </div>
      </a-col>
    </a-row>
  </div>
</template>
<script>
import ActionBar from '../../common/report/ActionBar'
import VeRing from 'v-charts/lib/ring.common'

export default {
  name: 'InsuredRatio',
  components: {ActionBar, VeRing},
  data () {
    this.chartSettings = {
      radius: '88%',
      offsetY: 50,
      label: {
        'show': true,
        'position': 'inside',
        'seriesLayoutBy': 'row'
      }
    }
    this.yearOnYearChartExtend = {
      series: {
        center: ['50%', '50%'],
        label: {
          position: 'inside',
          formatter: '{b}年\n{c}\n{d}%',
          fontSize: '14'
        }
      },
      grid: {
        containLabel: {
          'containLabel': true
        }
      },
      legend: {
        'show': false
      }
    }
    this.ringRatioChartExtend = {
      series: {
        center: ['50%', '50%'],
        label: {
          position: 'inside',
          formatter: '{b}\n{c}\n{d}%',
          fontSize: '14'
        }
      },
      grid: {
        containLabel: {
          'containLabel': true
        }
      },
      legend: {
        'show': false
      }
    }
    return {
      yearOnYearActBarJson: {
        'title': '在保人数同比',
        'type': ['fullscreen', 'search'],
        'fullscreenRef': 'actionBar',
        'align': 'center'
      },
      yearOnYearData: {
        columns: ['year', 'inInsuranceNumber'],
        rows: []
      },
      ringRatioActBarJson: {
        'title': '在保人数环比',
        'type': ['fullscreen', 'search'],
        'fullscreenRef': 'actionBar',
        'align': 'center'
      },
      ringRatioData: {
        columns: ['month', 'inInsuranceNumber'],
        rows: []
      }
    }
  },
  props: ['height'],
  created () {
    this.getYearOnYearData() // 同比
    this.getRingRatioData() // 同比
  },
  methods: {
    getYearOnYearData () {
      this.$get('/api/employee/countInInsuranceYearOnYear', {}).then((r) => {
        if (r.data.code === '00001') {
          this.yearOnYearData.rows = r.data.data
        } else {
          this.$message.error('网络错误，请检查')
        }
      }).catch(() => {
        this.$message.error('网络错误')
      })
    },
    getRingRatioData () {
      this.$get('/api/employee/countInInsuranceRingRatio', {}).then((r) => {
        if (r.data.code === '00001') {
          this.ringRatioData.rows = r.data.data
        } else {
          this.$message.error('网络错误，请检查')
        }
      }).catch(() => {
        this.$message.error('网络错误')
      })
    },
    doRefresh () {
    }
  }
}
</script>

<style lang='less' scoped>

</style>
