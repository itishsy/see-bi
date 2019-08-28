
<template>
  <div>
    <a-modal class="bi-modal" width="70%" :maskClosable="false"
             centered
             v-model="modalVisible" :footer="null"
    >
      <template slot="title">
        <div class="modal-header">
          <a-row>
            <a-col :span="15"><span class="header-title" v-text="modalData.title"></span></a-col>
            <a-col :span="9">
              <p class="header-operate">
                <span v-text="modalData.text"></span>
                <a-button type="primary" class="operate-btn" ghost @click="exportDetail()" v-if="modalData.operateBtn.indexOf('export')>-1">导出明细</a-button>
                <a-button type="primary" class="operate-btn" ghost @click="back()" v-if="modalData.operateBtn.indexOf('back')>-1">返回</a-button>
                <span class="bi-modal-close" @click="closeIcon()">
                <a-icon class="bi-modal-close-icon" type="close" />
              </span>
              </p>
            </a-col>
          </a-row>
        </div>
      </template>
      <a-table :columns="columns"
               :dataSource="data"
               :pagination="pagination"
               :loading="loading"
               :bordered="true"
               @change="handleTableChange"
      >
        <template slot="moneyFormat" slot-scope="moneyFormat">
          <span>{{ moneyFormat | moneyFormat }}</span>
        </template>
      </a-table>

    </a-modal>
  </div>
</template>
<script>
export default {
  name: 'Modal',
  data () {
    return {
      data: [],
      pagination: {
        defaultPageSize: 10,
        showSizeChanger: true,
        pageSizeOptions: ['10', '15', '20'],
        showTotal: total => `共 ${total} 条数据`,
        onShowSizeChange: (current, pageSize) => (this.defaultPageSize = pageSize)
      },
      loading: false,
      scroll: { 'x': 1000, 'y': 400 }
    }
  },
  props: ['columns', 'modalData', 'modalVisible'],
  components: {},
  created () {

  },
  methods: {
    handleTableChange (pagination, filters, sorter) {
      const pager = {...this.pagination}
      pager.current = pagination.current
      this.pagination = pager
      this.$emit('fetch', {
        results: pagination.pageSize,
        page: pagination.current,
        sortField: sorter.field,
        sortOrder: sorter.order,
        ...filters
      })
    },
    exportDetail () {
      this.$emit('exportDetail')
    },
    back () {
      this.$emit('back')
    },
    closeIcon () {
      this.$parent.modalVisible = false
    }
  }
}
</script>

<style lang='less'>
  @color-62ffff: #62ffff;
  @color-78A9E1: #78A9E1;
  .ant-modal-centered .bi-modal .ant-modal-content {
    padding: 40px 50px;
  }

  .bi-modal {
    .ant-table-wrapper {
      background-color: #041B3A;
    }
    .ant-table-body{
      height: 400px;
      border: 1px solid @color-78A9E1;
    }
    .ant-modal-header{
      padding: 0 20px 10px 0;
      position: relative;
    }
    .ant-modal-body{
      padding: 0!important;
    }
    .ant-table-content{
      position: relative;
    }
    .ant-table-placeholder{
      position: absolute;
      background: none!important;
      top: 50%;
      margin-top: -13px;
      width: 100%;
      border: none!important;
      color: @color-62ffff;
      font-size: 16px;
    }
    .ant-table-bordered .ant-table-thead > tr > th{
      text-align: center!important;
    }
    .ant-table-thead > tr > th, .ant-table-tbody > tr > td{
      padding: 8px;
      border: 1px solid @color-78A9E1!important;
      color: @color-62ffff;
      background: none !important;
    }
    .modal-header{
      color: @color-62ffff;
      font-size: 16px;
    }
    .header-operate{
      text-align: right;
    }
    .operate-btn{
      margin-left: 10px;
      color: @color-62ffff!important;
      border-color:  @color-62ffff!important;
    }
    .ant-table-pagination.ant-pagination{
      width: 100%;
      border: 1px solid @color-78A9E1;
      border-top: none;
      float: none;
      text-align: center;
      margin: 0;
      padding: 15px 0;
    }
    .ant-pagination-total-text {
      color: @color-62ffff;
    }
    .ant-modal-close{
      display: none;
    }
    .bi-modal-close {
      position: absolute;
      display: inline-block;
      width: 36px;
      height: 36px;
      line-height: 36px;
      right: -50px;
      text-align: center;
      .bi-modal-close-icon{
        font-size: 22px;
        font-weight: bold;
        color: @color-62ffff;
      }
    }
    /*分页*/
    .ant-pagination-item {
      background: none;
      border-color: @color-78A9E1 !important;
    }
    .ant-pagination-item a {
      color: @color-62ffff !important;
    }
    .ant-pagination-item:hover {
      border-color: @color-78A9E1 !important;
      a {
        color: @color-62ffff !important;
      }
    }
    .ant-pagination-item-active {
      border-color: @color-62ffff !important;
    }
    .ant-pagination-item-active a {
      color: @color-62ffff !important;
    }
    .ant-pagination-item-active:focus, .ant-pagination-item-active:hover {
      border-color: @color-62ffff !important;
      a {
        color: @color-62ffff !important;
      }
    }
    .ant-pagination-jump-prev .ant-pagination-item-container .ant-pagination-item-ellipsis, .ant-pagination-jump-next .ant-pagination-item-container .ant-pagination-item-ellipsis {
      color: @color-62ffff !important;
    }
    .ant-pagination-jump-prev .ant-pagination-item-container .ant-pagination-item-link-icon, .ant-pagination-jump-next .ant-pagination-item-container .ant-pagination-item-link-icon {
      color: @color-62ffff !important;
    }
    .ant-pagination-prev .ant-pagination-item-link, .ant-pagination-next .ant-pagination-item-link {
      border-color: @color-78A9E1 !important;
      background: none !important;
      color: @color-62ffff !important;
    }
  }
</style>
