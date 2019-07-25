<template>
  <a-card :bordered="false" class="card-area">
    <a-form layout="inline">
      <a-form-item>
        <a-input
          v-model="queryParams.username"
          placeholder="用户名"
        >
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" @click="search">查询</a-button>
      </a-form-item>
    </a-form>
    <a-table :columns="columns" :dataSource="dataSource" :pagination="pagination">
      <template slot="email" slot-scope="text">
        <a-popover placement="topLeft">
          <template slot="content">
            <div>{{text}}</div>
          </template>
          <p style="width: 150px; margin-bottom: 0">{{text}}</p>
        </a-popover>
      </template>
      <template slot="operation" slot-scope="text, record">
        <a-icon type="setting" theme="twoTone" title="修改用户" @click="edit(record)" ></a-icon>
      </template>
    </a-table>
    <!-- 修改用户 -->
    <user-edit
      ref="userEdit"
      @close="handleEditClose"
      @success="handleEditSuccess"
      :userEditVisiable="userEdit.visiable">
    </user-edit>
  </a-card>
</template>

<script>
import UserEdit from './UserEdit'

export default {
  name: 'User',
  components: {UserEdit},
  data () {
    return {
      sortedInfo: [],
      filteredInfo: [],
      queryParams: {},
      dataSource: [],
      pagination: {
        pageSizeOptions: ['10', '20', '30', '50', '100'],
        defaultCurrent: 1,
        defaultPageSize: 10,
        showQuickJumper: true,
        showSizeChanger: true,
        showTotal: (total, range) => `显示 ${range[0]} ~ ${range[1]} 条记录，共 ${total} 条记录`
      },
      userEdit: {
        visiable: false
      }
    }
  },
  computed: {
    columns () {
      return [
        {
          title: '用户名',
          dataIndex: 'username',
          sorter: true
        },
        {
          title: '邮箱',
          dataIndex: 'email',
          scopedSlots: { customRender: 'email' }
        },
        {
          title: '电话',
          dataIndex: 'mobile'
        },
        {
          title: '操作',
          dataIndex: 'operation',
          scopedSlots: { customRender: 'operation' }
        }
      ]
    }
  },
  mounted () {
    this.fetch()
  },
  methods: {
    search () {
      let {sortedInfo, filteredInfo} = this
      let sortField, sortOrder
      if (sortedInfo) {
        sortField = sortedInfo.field
        sortOrder = sortedInfo.order
      }
      this.fetch({
        sortField: sortField,
        sortOrder: sortOrder,
        ...this.queryParams,
        ...filteredInfo
      })
    },
    fetch (params = {}) {
      this.$get('system/user', { ...params }).then(r => {
        let data = r.data
        const pagination = { ...this.pagination }
        pagination.total = data.total
        this.dataSource = data.rows
        this.pagination = pagination
      })
    },
    edit (record) {
      this.$refs.userEdit.setFormValues(record)
      this.userEdit.visiable = true
    },
    handleEditClose () {
      this.userEdit.visiable = false
    },
    handleEditSuccess () {
      this.userEdit.visiable = false
      this.$message.success('修改用户成功')
      this.search()
    }
  }
}
</script>
