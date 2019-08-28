<template>
  <div style="height: 100%;" ref="fullscreen">
    <div>
      <div class="fullscreen-contain">
        <action-bar :actionBarJson="actionBarJson" ref="actionBar" @doRefresh="getCashBalance" @doFilters="doFilters" @search="search"></action-bar>
        <p class="amount">业务流入流出净额：<span class="text-red" v-text="balanceTotalAmount"></span>万元</p>
        <div>
          <ul :style="{height:typeHeight}" class="typeList">
            <li>
              <a-row type="flex" justify="center" align="top">
                <a-col :span="12"><p>业务类型</p></a-col>
                <a-col :span="12"><p>余额（万元）</p></a-col>
              </a-row>
            </li>
            <li :style="{height:typeLiHeight,lineHeight:typeLiHeight}" :key="item.bussinessCode" v-for="item in cashBalanceList">
              <a-row type="flex" justify="center" align="top">
                <a-col :span="12"><p v-text="item.bussinessName"></p></a-col>
                <a-col :span="12"><p v-text="item.balance"></p></a-col>
              </a-row>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <modal ref="modal" :columns="columns" :modalData="modalData" :modalVisible="modalVisible" @fetch="fetch" @exportDetail="exportDetail" @back="back"></modal>
  </div>
</template>

<script>
import ActionBar from '../../common/report/ActionBar'
import Modal from '../../common/report/Modal'
const columns = [
  {title: '集团名称', dataIndex: 'groupName', width: 160},
  {title: '客户名称', dataIndex: 'custName', width: 160},
  {title: '业务类别', dataIndex: 'businessName', width: 120},
  {title: '本月流入', dataIndex: 'inflowAmount', align: 'right', width: 130, scopedSlots: { customRender: 'moneyFormat' }},
  {title: '本月流出', dataIndex: 'outflowAmount', align: 'right', width: 130, scopedSlots: { customRender: 'moneyFormat' }},
  {title: '流入流出净额', dataIndex: 'netBalance', align: 'right', width: 130, scopedSlots: { customRender: 'moneyFormat' }}
]
export default {
  name: 'BusinessFlow',
  data () {
    return {
      curMonth: this.$global.curMonth,
      cashBalanceList: {},
      balanceTotalAmount: 0,
      columns,
      modalVisible: false
    }
  },
  props: ['height'],
  components: {ActionBar, Modal},
  computed: {
    actionBarJson: function () {
      var obj = {
        'title': this.curMonth + '业务现金余额',
        'type': ['fullscreen', 'filter', 'search', 'sync'],
        'fullscreenRef': 'fullscreen',
        'filters': {
          'monthPicker': [{'name': 'businessMonth'}]
        }
      }
      return obj
    },
    modalData: function () {
      var obj = {
        'title': '查看【' + this.curMonth + '业务现金流】明细',
        'text': '金额单位：万元',
        'operateBtn': ['export']
      }
      return obj
    },
    typeHeight: function () {
      return this.height - 90 + 'px'
    },
    typeLiHeight: function () {
      return (this.height - 168) / 5 + 'px'
    }
  },
  mounted () {
    this.fetch(this.$refs.modal.pagination)
  },
  created () {
    this.getCashBalance()
  },
  methods: {
    statusControl () {
      this.$refs.actionBar.spin = false
      this.$refs.actionBar.btnLoading = false
    },
    getCashBalance () {
      this.$get('/api/finance/cashBalanceByBussiness/' + this.curMonth, {}).then((r) => {
        if (r.data.code === '00001') {
          this.cashBalanceList = r.data.data.itemsData
          this.balanceTotalAmount = r.data.data.total_balance
          this.$refs.actionBar.showFilters = false
        } else {
          this.$message.error('网络错误，请检查')
        }
        this.statusControl()
      }).catch(() => {
        this.$message.error('网络错误，请检查')
        this.statusControl()
      })
    },

    doFilters (dateArr, monthArr, selectArr) {
      this.curMonth = this.$moment(monthArr.businessMonth).format('YYYYMM')
      this.getCashBalance()
    },

    fetch (params = {}) {
      this.$get('/api/finance/findBussinessBalanceDetail/' + this.curMonth, {
        results: 10,
        page: 1,
        ...params
      }).then((r) => {
        if (r.data.code === '00001') {
          let $modal = this.$refs.modal
          const pagination = {...$modal.pagination}
          // Read total count from server
          // pagination.total = data.totalCount;
          pagination.total = r.data.data.total
          $modal.loading = false
          $modal.data = r.data.data.results
          $modal.pagination = pagination
        } else {
          this.$message.error('网络错误，请检查')
        }
      }).catch(() => {
        this.$message.error('网络错误，请检查')
      })
    },

    search () {
      this.fetch()
      this.modalVisible = true
    },

    exportDetail () {
      alert('导出')
    },
    back () {
      this.modalVisible = false
    }
  }
}

</script>

<style lang="less" scoped>
  .fullscreen .fullscreen-contain{
    padding-left: 5%;
    width: 50%;
    .typeList{
      li{
        height: 79px !important;
        line-height: 79px !important;
      }
      li:first-of-type{
        height: auto!important;
        line-height: normal!important;
      }
    }
  }
  .amount {
    font-size: 16px;
    margin-left: 5px;
    margin-top: 10px;
    letter-spacing: 2px;
  }

  .typeList {
    letter-spacing: 3px;

    li {
      width: 100%;
      height: 60px;
      line-height: 60px;
      font-size: 14px;
      margin-top: 10px;

      div {

        div:nth-of-type(odd) {
          padding-left: 30px;
        }

        div:nth-of-type(event) {
          padding-left: 15px;
        }

      }
    }
    li:nth-of-type(1) {
      height: auto;
      line-height: normal;
      font-size: 16px;
    }

    li:nth-of-type(2) {
      background: url(/static/img/icons/ic-type-1.png) no-repeat;
      /*background-size: 464px 79px;*/
      background-size: 90% 100%;
    }

    li:nth-of-type(3) {
      background: url(/static/img/icons/ic-type-2.png) no-repeat;
      /*background-size: 422px 79px;*/
      background-size: 82% 100%;
    }

    li:nth-of-type(4) {
      background: url(/static/img/icons/ic-type-3.png) no-repeat;
      /*background-size: 396px 79px;*/
      background-size: 77% 100%;
    }

    li:nth-of-type(5) {
      background: url(/static/img/icons/ic-type-4.png) no-repeat;
      /*background-size: 421px 79px;*/
      background-size: 82% 100%;
    }

    li:nth-of-type(6) {
      background: url(/static/img/icons/ic-type-5.png) no-repeat;
      /*background-size: 467px 79px;*/
      background-size: 89% 100%;
    }

  }
</style>
