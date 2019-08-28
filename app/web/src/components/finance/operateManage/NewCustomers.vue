<template>
  <div>
    <action-bar :actionBarJson="actionBarJson" ref="actionBar" @doRefresh="doRefresh"></action-bar>
    <div class="cust-contain mt-10">
     <div class="square-border" style="height: 100px;"></div>
      <div class="square-contain">
        <ve-bar :data="custData" width="90%" height="100%" :settings="custChartSettings"
                :extend="custChartExtend"></ve-bar>
      </div>
    </div>
  </div>
</template>

<script>
import ActionBar from '../../common/report/ActionBar'
import VeBar from 'v-charts/lib/bar.common'
export default {
  name: 'NewCustomers',
  data () {
    this.custChartExtend = {
      series: {
        type: 'bar',
        barWidth: '65%',
        barCategoryGap: '30%',
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
    this.custChartSettings = {
      label: {
        show: true,
        position: 'right',
        color: '#62ffff',
        fontSize: '16'
      },
      dataOrder: {
        label: 'amount',
        order: 'asc'
      }
    }
    return {
      actionBarJson: {
        'title': '2019新增客户',
        'type': ['fullscreen', 'filter', 'search', 'sync'],
        'fullscreenRef': 'actionBar',
        'position': 'right'
      },
      custData: {
        columns: ['custTypeName', 'amount'],
        rows: []
      }
    }
  },
  components: {ActionBar, VeBar},
  created () {
    this.getCustData()
  },
  methods: {
    getCustData () {
      this.$get('/api/cust/countCustByType/2019', {}).then((r) => {
        if (r.data.code === '00001') {
          this.custData.rows = r.data.data.itemsData
        } else {
          this.$message.error('网络错误，请检查')
        }
      }).catch(() => {
        this.$message.error('网络错误，请检查')
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .cust-contain{
    position: relative;
    .square-contain{
      position: absolute;
      width: 100%;
      height: 100%;
      left: 3%;
      top: 7px;
    }
  }
</style>
