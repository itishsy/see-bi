<template>
  <div class="mt-10">
    <action-bar :actionBarJson="actionBarJson" ref="actionBar" @doRefresh="doRefresh"></action-bar>
    <div class="server">
      <square-border :squBorHeight="squBorHeight">
        <ul style="height: 100%;">
          <li :style="{height: liHeight, lineHeight: liHeight}" :key="item.bussinessCode" v-for="item in serverList">
            <p class="text-l" v-text="item.bussinessName"></p>
            <p class="text-r" v-text="item.count"></p>
          </li>
        </ul>
      </square-border>
    </div>
  </div>
</template>

<script>
import ActionBar from '../../common/report/ActionBar'
import SquareBorder from '../../common/report/SquareBorder'
export default {
  name: 'NewCustomers',
  components: {ActionBar, SquareBorder},
  data () {
    return {
      squBorHeight: this.$global.bodyContainHeight * 0.24,
      actionBarJson: {
        'title': '201907服务人数',
        'type': ['fullscreen', 'filter', 'search', 'sync'],
        'fullscreenRef': 'actionBar',
        'position': 'right'
      },
      serverList: []
    }
  },
  computed: {
    // 计算属性的 getter
    liHeight: function () {
      // `this` 指向 vm 实例
      return (this.squBorHeight - 20) / 5 + 'px'
    }
  },
  created () {
    this.getServerData()
  },
  methods: {
    getServerData () {
      this.$get('/api/employee/countEmployeeServiceNumber/201907', {}).then((r) => {
        if (r.data.code === '00001') {
          this.serverList = r.data.data.itemsData
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

<style lang="less" scoped>
  .server {
    font-size: 16px;
    li {
      display: flex;
      letter-spacing: 2px;
      .text-l {
        text-align: left;
      }
      .text-r {
        text-align: right;
        flex: 1;
      }
    }
  }
</style>
