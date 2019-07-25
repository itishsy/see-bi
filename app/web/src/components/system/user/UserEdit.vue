<template>
  <a-drawer
    title="修改用户"
    :maskClosable="false"
    width=650
    placement="right"
    :closable="false"
    @close="onClose"
    :visible="userEditVisiable"
    style="height: calc(100% - 55px);overflow: auto;padding-bottom: 53px;">
    <a-form :form="form">
      <a-form-item label='用户名' v-bind="formItemLayout">
        <a-input readOnly v-decorator="['username']"/>
      </a-form-item>
      <a-form-item label='邮箱' v-bind="formItemLayout">
        <a-input
          v-decorator="[
          'email',
          {rules: [
            { type: 'email', message: '请输入正确的邮箱' },
            { max: 50, message: '长度不能超过50个字符'}
          ]}
        ]"/>
      </a-form-item>
      <a-form-item label="手机" v-bind="formItemLayout">
        <a-input
          v-decorator="['mobile', {rules: [
            { pattern: '^0?(13[0-9]|15[012356789]|17[013678]|18[0-9]|14[57])[0-9]{8}$', message: '请输入正确的手机号'}
          ]}]"/>
      </a-form-item>
    </a-form>
    <div class="drawer-bootom-button">
      <!-- <a-popconfirm title="确定放弃编辑？" @confirm="onClose" okText="确定" cancelText="取消"> -->
        <a-button style="margin-right: .8rem" @click="onClose">取消</a-button>
      <!-- </a-popconfirm> -->
      <a-button @click="handleSubmit" type="primary">提交</a-button>
    </div>
  </a-drawer>
</template>
<script>
import {mapState, mapMutations} from 'vuex'

const formItemLayout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 18 }
}
export default {
  name: 'UserEdit',
  props: {
    userEditVisiable: {
      default: false
    }
  },
  data () {
    return {
      formItemLayout,
      form: this.$form.createForm(this),
      userId: ''
    }
  },
  computed: {
    ...mapState({
      currentUser: state => state.account.user
    })
  },
  methods: {
    ...mapMutations({
      setUser: 'account/setUser'
    }),
    onClose () {
      this.form.resetFields()
      this.$emit('close')
    },
    setFormValues ({...user}) {
      this.userId = user.userId
      let fields = ['username', 'email', 'mobile']
      Object.keys(user).forEach((key) => {
        if (fields.indexOf(key) !== -1) {
          this.form.getFieldDecorator(key)
          let obj = {}
          obj[key] = user[key]
          this.form.setFieldsValue(obj)
        }
      })
    },
    handleSubmit () {
      this.form.validateFields((err, values) => {
        if (!err) {
          let user = this.form.getFieldsValue()
          user.userId = this.userId
          this.$put('user', {
            ...user
          }).then((r) => {
            this.$emit('success')
            // 如果修改用户就是当前登录用户的话，更新其state
            if (user.username === this.currentUser.username) {
              this.$get(`user/${user.username}`).then((r) => {
                this.setUser(r.data)
              })
            }
          })
        }
      })
    }
  }
}
</script>
