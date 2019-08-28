  需要传入一个actionBarJson对象
  里面包含：
  title: "",---标题
  type: "",---需要显示的图标类型,有四种可选，["fullscreen","filter","search","sync"]
  fullscreenRef: "",需要全屏的元素ref,
  position: (设置float的值，默认none靠左显示)
  align: (设置内容集体居中，默认靠左显示，不能与position同时设置，否则无效)

  过滤条件：
  filters: {
    datePickerShow: boo
    datePicker: [{name: ""}],
    monthPicker: [{name: ""}],
    selectPicker: [{name: "",options: [{text:"",value:""}]}]
<template>
  <div>
    <div class="ic-actionBar-title clearfix" :class="{setAlign: actionBarJson.align?actionBarJson.align:false}" :style="{textAlign: actionBarJson.align?actionBarJson.align:false}">
      <span class="fl title-span"><i class="ic-actionBar-title-arr"></i><span class="title" v-text="actionBarJson.title"></span></span>
      <div class="action-icon" :style="{float: actionBarJson.position?actionBarJson.position:'none'}">
        <a-icon type="fullscreen" class="icon" title="" @click="toggle(actionBarJson.fullscreenRef)" v-if="actionBarJson.type.indexOf('fullscreen')>-1" />
        <a-icon type="filter" class="icon" title="" @click="toggleFilter" v-if="actionBarJson.type.indexOf('filter')>-1" />
        <a-icon type="search" class="icon" title="" @click="search" v-if="actionBarJson.type.indexOf('search')>-1" />
        <a-icon type="sync" class="icon" title="" :spin="spin" @click="doRefresh()" v-if="actionBarJson.type.indexOf('sync')>-1" />
        <div class="filters" style="width: 350px;" v-if="showFilters&&actionBarJson.filters">
          <a-date-picker :key="'date'+index" v-model="dateArr[item.name]" v-for="(item, index) in actionBarJson.filters.datePicker" placeholder="请选择" style="width: 120px;text-align: center" :defaultValue="$moment(defaultDate, dateFormat)" :format="dateFormat"/>

          <a-month-picker :key="'month'+i" v-model="monthArr[it.name]" v-for="(it, i) in actionBarJson.filters.monthPicker" placeholder="请选择" style="width: 120px;text-align: center" :defaultValue="$moment(defaultDate, monthFormat)" :format="monthFormat"/>

          <a-select :key="'select'+ind" v-model="selectArr[list.name]" v-for="(list, ind) in actionBarJson.filters.selectPicker" :defaultValue="list.defaultValue?list.defaultValue:''" style="width: 120px">
            <a-select-option :value="li.value" :key="'option'+ind" v-for="(li, ind) in list.options">{{li.text}}</a-select-option>
          </a-select>
          <a-button type="primary" :loading="btnLoading" @click="doFilters">确 定</a-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import fullscreen from 'vue-fullscreen'
import Vue from 'vue'
Vue.use(fullscreen)
export default {
  name: 'ActionBar',
  data () {
    return {
      fullscreen: false,
      spin: false,
      showFilters: false,
      btnLoading: false,
      dateFormat: 'YYYYMMDD',
      defaultDate: new Date().toLocaleDateString(),
      monthFormat: 'YYYYMM',
      dateArr: {},
      monthArr: {},
      selectArr: {}
    }
  },
  props: ['actionBarJson'],
  created () {
  },
  methods: {
    // 刷新
    doRefresh () {
      this.spin = true
      let that = this
      setTimeout(function () {
        that.$emit('doRefresh')
      }, 800)
    },
    // 全屏
    toggle (fullscreenRef) {
      this.$fullscreen.toggle(this.$parent.$refs[fullscreenRef], {
        wrap: true,
        callback: this.fullscreenChange,
        background: 'url(/static/img/report-bg.png) 100% 100%'
      })
    },
    fullscreenChange (fullscreen) {
      this.fullscreen = fullscreen
    },
    /* 过滤 */
    toggleFilter () {
      this.showFilters = !this.showFilters
    },
    search () {
      this.$emit('search')
    },
    doFilters (obj) {
      this.btnLoading = true
      let that = this
      setTimeout(function () {
        that.$emit('doFilters', that.dateArr, that.monthArr, that.selectArr)
      }, 800)
    }
  }
}
</script>

<style lang="less" scoped>
  .ic-actionBar-title{
    width: 100%;
    height: 37px;
    background: -webkit-linear-gradient(left, #0F598A , transparent); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(right, #0F598A, transparent); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(right, #0F598A, transparent); /* Firefox 3.6 - 15 */
    background: linear-gradient(to right, #0F598A , transparent); /* 标准的语法 */
    background-size: 100% 100%;
    padding-left: 5px;
    font-size: 16px;
    letter-spacing:2px;
    .action-icon{
      position: relative;
      display: inline-block;
      padding-top: 8px;
      margin-left: 30px;
      .icon{
        color: #86C8ED;
        margin-right: 5px;
        font-size: 18px;
        vertical-align: middle;
        margin-top: -3px;
        font-weight: bold;
      }
      .filters{
        position: absolute;
        top: 37px;
        left: 0;
        z-index: 5;
      }
    }
  }
  .ic-actionBar-title-arr{
    display: inline-block;
    width: 21px;
    height: 19px;
    background: url('/static/img/icons/ic-actionBar-title-arr.png');
    background-size: 100% 100%;
    vertical-align: middle;
    margin-right: 5px;
    margin-top: -2px;
  }
  .title{
    color: #4cb5f5;
    letter-spacing: 3px;
    line-height: 37px;
  }
  .setAlign{
    background: none!important;
    .title-span{
      float: none!important;
    }
    .action-icon{
      float: none!important;
    }
    .ic-actionBar-title-arr{
      display: none!important;
    }
  }
</style>
