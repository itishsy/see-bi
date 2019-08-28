<template>
  <div class="container">
    <div class="content">
      <div class="top">
        <div class="header">
          <!-- <img alt="logo" class="logo" src="static/img/logo.png" /> -->
          <span class="title">{{systemName}}</span>
        </div>
        <div class="desc"></div>
      </div>
      <div class="main-content">
        <div class="login">
          <a-form @submit.prevent="doLogin" :form="form">
            <a-tabs size="large" :tabBarStyle="{textAlign: 'center'}" style="padding: 0 2px;" :activeKey="activeKey"
                    @change="handleTabsChange">
              <a-tab-pane tab="账户密码登录" key="1">
                <a-alert type="error" :closable="true" v-show="error" :message="error" showIcon
                         style="margin-bottom: 24px;"></a-alert>
                <a-form-item label="name">
                  <a-input size="large"  v-decorator="['name',{rules: [{ required: true, message: '请输入账户名' }]}]">
                    <a-icon slot="prefix" type="user"></a-icon>
                  </a-input>
                </a-form-item>
                <a-form-item label="password">
                  <a-input size="large" type="password" v-decorator="['password',{rules: [{ required: true, message: '请输入密码' }]}]">
                    <a-icon slot="prefix" type="lock"></a-icon>
                  </a-input>
                </a-form-item>
              </a-tab-pane>
              <a-tab-pane tab="手机号登录" key="2">
                <a-form-item>
                  <a-input size="large">
                    <a-icon slot="prefix" type="mobile"></a-icon>
                  </a-input>
                </a-form-item>
                <a-form-item>
                  <a-row :gutter="8" style="margin: 0 -4px">
                    <a-col :span="16">
                      <a-input size="large">
                        <a-icon slot="prefix" type="mail"></a-icon>
                      </a-input>
                    </a-col>
                    <a-col :span="8" style="padding-left: 4px">
                      <a-button style="width: 100%" class="captcha-button" size="large" @click="getCaptcha">获取验证码</a-button>
                    </a-col>
                  </a-row>
                </a-form-item>
              </a-tab-pane>
            </a-tabs>
            <a-form-item>
              <a-button :loading="loading" style="width: 100%; margin-top: 4px" size="large" htmlType="submit" type="primary">
                登录
              </a-button>
            </a-form-item>
            <div>
              <a style="float: right" @click="regist">注册账户</a>
            </div>
          </a-form>
        </div>
      </div>
    </div>
    <footer :copyright="copyright" />
  </div>
</template>

<script>
import {mapMutations} from 'vuex'
import Footer from './layouts/Footer'
import Register from './layouts/personal/Register'

export default {
  name: 'Login',
  components: {Footer, Register},
  data () {
    return {
      loading: false,
      error: '',
      activeKey: '1',
      form: this.$form.createForm(this)
    }
  },
  computed: {
    systemName () {
      return this.$store.state.setting.systemName
    },
    copyright () {
      return this.$store.state.setting.copyright
    }
  },
  created () {
    this.$db.clear()
    this.$router.options.routes = []
  },
  methods: {
    doLogin () {
      if (this.activeKey === '1') {
        // 用户名密码登录
        this.form.validateFields(['name', 'password'], (errors, values) => {
          if (!errors) {
            this.loading = true
            let name = this.form.getFieldValue('name')
            let password = this.form.getFieldValue('password')
            this.$post('login', {
              username: name,
              password: password
            }).then((r) => {
              let data = r.data.data
              this.saveLoginData(data)
              setTimeout(() => {
                this.loading = false
              }, 500)
              this.$router.push('/')
            }).catch(() => {
              setTimeout(() => {
                this.loading = false
              }, 500)
            })
          }
        })
      }
      if (this.activeKey === '2') {
        // 手机验证码登录
        this.$message.warning('暂未开发')
      }
    },
    regist () {
      this.$emit('regist', 'Regist')
    },
    getCaptcha () {
      this.$message.warning('暂未开发')
    },
    handleTabsChange (val) {
      this.activeKey = val
    },
    ...mapMutations({
      setToken: 'account/setToken',
      setExpireTime: 'account/setExpireTime',
      setPermissions: 'account/setPermissions',
      setRoles: 'account/setRoles',
      setUser: 'account/setUser',
      setTheme: 'setting/setTheme',
      setLayout: 'setting/setLayout',
      setMultipage: 'setting/setMultipage',
      fixSiderbar: 'setting/fixSiderbar',
      fixHeader: 'setting/fixHeader',
      setColor: 'setting/setColor'
    }),
    saveLoginData (data) {
      this.setToken(data.token)
      this.setExpireTime(data.exipreTime)
      this.setUser(data.user)
      this.setPermissions(data.permissions)
      this.setRoles(data.roles)
      this.setTheme(data.config.theme)
      this.setLayout(data.config.layout)
      this.setMultipage(data.config.multiPage === '1')
      this.fixSiderbar(data.config.fixSiderbar === '1')
      this.fixHeader(data.config.fixHeader === '1')
      this.setColor(data.config.color)
    }
  }
}
</script>

<style lang="less" scoped>
  .container {
    display: flex;
    flex-direction: column;
    height: 100vh;
    overflow: auto;
    background: #f0f2f5;
    background-size: 100%;
    .content {
      padding: 32px 0;
      flex: 1;
      @media (min-width: 768px){
        padding: 116px 0 10px;
      }
      .top {
        text-align: center;
        .header {
          height: 50px;
          line-height: 50px;
          a {
            text-decoration: none;
          }
          .logo {
            width: 40px;
            height: 19px;
            vertical-align: center;
            margin-right: 16px;
          }
          .title {
            font-size: 28px;
            color: rgba(0,0,0,.85);
            font-family: 'Myriad Pro', 'Helvetica Neue', Arial, Helvetica, sans-serif;
            font-weight: 600;
            position: relative;
            top: 6px;
          }
        }
        .desc {
          font-size: 14px;
          color: rgba(0,0,0,.45);
          margin-top: 12px;
          margin-bottom: 40px;
        }
      }
      .main-content {
        width: 368px;
        margin: 0 auto;
        @media screen and (max-width: 576px) {
          width: 95%;
        }
        @media screen and (max-width: 320px) {
          .captcha-button{
            font-size: 14px;
          }
        }
      }
    }
  }
  .login {
    .icon {
      font-size: 24px;
      color: rgba(0, 0, 0, 0.2);
      margin-left: 16px;
      vertical-align: middle;
      cursor: pointer;
      transition: color 0.3s;

      &:hover {
        color: #1890ff;
      }
    }
  }
</style>
