<template>
  <div :class="[multipage === true ? 'multi-page':'single-page', 'not-menu-page', 'home-page']">
    <a-row :gutter="8" class="head-info">
      <a-card class="head-info-card">
        <a-col :span="12">
          <div class="head-info-avatar">
            <img alt="头像" :src="avatar">
          </div>
          <div class="head-info-count">
            <div class="head-info-welcome">
              {{welcomeMessage}}
            </div>
            <div class="head-info-desc">
              <p>{{user.deptName ? user.deptName : '暂无部门'}} | {{user.roleName ? user.roleName : '暂无角色'}}</p>
            </div>
            <div class="head-info-time">上次登录时间：{{user.lastLoginTime ? user.lastLoginTime : '第一次访问系统'}}</div>
          </div>
        </a-col>
      </a-card>
    </a-row>
  </div>
</template>
<script>
import {mapState} from 'vuex'
import moment from 'moment'
moment.locale('zh-cn')

export default {
  name: 'Home',
  data () {
    return {
      series: [],
      chartOptions: {
        chart: {
          toolbar: {
            show: false
          }
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '35%'
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          show: true,
          width: 2,
          colors: ['transparent']
        },
        xaxis: {
          categories: []
        },
        fill: {
          opacity: 1

        }
      },
      projects: [
        {
          name: 'FEBS-Shiro',
          des: 'Spring Boot 2.0.4 & Shiro1.4.0 权限管理系统。',
          avatar: 'F'
        },
        {
          name: 'FEBS-Security',
          des: 'Spring Boot 2.0.4 & Spring Security 5.0.7 权限管理系统。',
          avatar: 'F'
        },
        {
          name: 'SpringAll',
          des: '循序渐进学习Spring Boot、Spring Cloud与Spring Security。',
          avatar: 'S'
        },
        {
          name: 'FEBS-Shiro-Vue',
          des: 'FEBS-Shiro前后端分离版本，前端架构采用Vue全家桶。',
          avatar: 'F'
        },
        {
          name: 'FEBS-Actuator',
          des: '使用Spring Boot Admin 2.0.2构建，用于监控FEBS。',
          avatar: 'F'
        }
      ],
      todayIp: '',
      todayVisitCount: '',
      totalVisitCount: '',
      userRole: '',
      userDept: '',
      lastLoginTime: '',
      welcomeMessage: ''
    }
  },
  props: {
    title: {
      default: ''
    },
    content: {
      default: ''
    },
    bordered: {
      default: false
    },
    center: {
      default: true
    }
  },
  computed: {
    ...mapState({
      multipage: state => state.setting.multipage,
      user: state => state.account.user
    }),
    avatar () {
      return `static/avatar/${this.user.avatar}`
    }
  },
  methods: {
    welcome () {
      const date = new Date()
      const hour = date.getHours()
      let time = hour < 6 ? '早上好' : (hour <= 11 ? '上午好' : (hour <= 13 ? '中午好' : (hour <= 18 ? '下午好' : '晚上好')))
      let welcomeArr = [
        '喝杯咖啡休息下吧☕',
        '要不要和朋友打局LOL',
        '要不要和朋友打局王者荣耀',
        '几天没见又更好看了呢😍',
        '今天又写了几个Bug🐞呢',
        '今天在群里吹水了吗',
        '今天吃了什么好吃的呢',
        '今天您微笑了吗😊',
        '今天帮助别人解决问题了吗',
        '准备吃些什么呢',
        '周末要不要去看电影？'
      ]
      let index = Math.floor((Math.random() * welcomeArr.length))
      return `${time}，${this.user.username}，${welcomeArr[index]}`
    }
  },
  mounted () {
    this.welcomeMessage = this.welcome()
  }
}
</script>
<style lang="less">
  .home-page {
    .head-info {
      margin-bottom: .5rem;
      .head-info-card {
        padding: .5rem;
        border-color: #f1f1f1;
        .head-info-avatar {
          display: inline-block;
          float: left;
          margin-right: 1rem;
          img {
            width: 5rem;
            border-radius: 2px;
          }
        }
        .head-info-count {
          display: inline-block;
          float: left;
          .head-info-welcome {
            font-size: 1.05rem;
            margin-bottom: .1rem;
          }
          .head-info-desc {
            color: rgba(0, 0, 0, 0.45);
            font-size: .8rem;
            padding: .2rem 0;
            p {
              margin-bottom: 0;
            }
          }
          .head-info-time {
            color: rgba(0, 0, 0, 0.45);
            font-size: .8rem;
            padding: .2rem 0;
          }
        }
      }
    }
    .count-info {
      .visit-count-wrapper {
        padding-left: 0 !important;
        .visit-count {
          padding: .5rem;
          border-color: #f1f1f1;
          .ant-card-body {
            padding: .5rem 1rem !important;
          }
        }
      }
      .project-wrapper {
        padding-right: 0 !important;
        .project-card {
          border: none !important;
          .ant-card-head {
            border-left: 1px solid #f1f1f1 !important;
            border-top: 1px solid #f1f1f1 !important;
            border-right: 1px solid #f1f1f1 !important;
          }
          .ant-card-body {
            padding: 0 !important;
            table {
              width: 100%;
              td {
                width: 50%;
                border: 1px solid #f1f1f1;
                padding: .6rem;
                .project-avatar-wrapper {
                  display:inline-block;
                  float:left;
                  margin-right:.7rem;
                  .project-avatar {
                    color: #42b983;
                    background-color: #d6f8b8;
                  }
                }
              }
            }
          }
          .project-detail {
            display:inline-block;
            float:left;
            text-align:left;
            width: 78%;
            .project-name {
              font-size:.9rem;
              margin-top:-2px;
              font-weight:600;
            }
            .project-desc {
              color:rgba(0, 0, 0, 0.45);
              p {
                margin-bottom:0;
                font-size:.6rem;
                white-space:normal;
              }
            }
          }
        }
      }
    }
  }
  .head-info {
    position: relative;
    text-align: left;
    padding: 0 32px 0 0;
    min-width: 125px;

    &.center {
      text-align: center;
      padding: 0 32px;
    }

    span {
      color: rgba(0, 0, 0, .45);
      display: inline-block;
      font-size: .95rem;
      line-height: 32px;
      margin-bottom: 4px;
    }
    p {
      line-height: 32px;
      margin: 0;
      a {
        font-weight: 600;
        font-size: 1rem;
      }
    }
  }
</style>
