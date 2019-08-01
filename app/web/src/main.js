// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import db from './utils/localstorage'
import api from './utils/api'
import antd from 'ant-design-vue'
import echarts from 'echarts'
import 'ant-design-vue/dist/antd.css'
import './utils/install'

Vue.config.productionTip = false

Vue.use(antd)
Vue.use(db)
// Vue.use(VueHighCharts)
// Vue.component('apexchart', VueApexCharts)

Vue.use({
  install (Vue) {
    Vue.prototype.$db = db
  }
})

Vue.prototype.$post = api.post
Vue.prototype.$get = api.get
Vue.prototype.$put = api.put
Vue.prototype.$delete = api.delete
Vue.prototype.$echarts = echarts

/* eslint-disable no-new */
new Vue({
  router,
  store,
  components: { App },
  template: '<App/>',
  data: {
    charts: []
  }
}).$mount('#app')
