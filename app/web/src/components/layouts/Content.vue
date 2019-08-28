<template>
  <div>
    <keep-alive v-if="multipage">
      <router-view ref="page"/>
    </keep-alive>
    <router-view ref="page" v-else/>
  </div>
</template>

<script>
export default {
  name: 'Content',
  data () {
    return {
      breadcrumb: [],
      title: {
        type: String,
        required: false
      },
      logo: {
        type: String,
        required: false
      }
    }
  },
  computed: {
    multipage () {
      return this.$store.state.setting.multipage
    },
    layout () {
      return this.$store.state.setting.layout
    }
  },
  mounted () {
    this.getBreadcrumb()
    this.getPageHeaderInfo()
  },
  updated () {
    this.getBreadcrumb()
    this.getPageHeaderInfo()
  },
  methods: {
    getBreadcrumb () {
      this.breadcrumb = this.$route.matched
    },
    getPageHeaderInfo () {
      this.title = this.$route.name
    }
  }
}
</script>

<style lang="less" scoped>
  .extraImg{
    margin-top: -60px;
    text-align: center;
    width: 195px;
    img{
      width: 100%;
    }
  }
  .link{
    margin-top: 16px;
    line-height: 24px;
    a{
      font-size: 14px;
      margin-right: 32px;
      i{
        font-size: 22px;
        margin-right: 8px;
      }
    }
  }
  .page-content{
    &.side{
      margin: 24px 24px 0;
    }
    &.head{
      margin: 24px auto 0;
      max-width: 1400px;
    }
    background: #fff;
    padding: 14px 22px;
    border-left: 1px solid #e8e8e8;
    border-right: 1px solid #e8e8e8;
    border-bottom: 1px solid #e8e8e8;
    .page-header-wide{
      .breadcrumb{
        margin-bottom: .6rem;
      }
      .detail{
        display: flex;
        padding: 0 0 1rem 0;
        .row {
          display: flex;
          width: 100%;
        }
        .avatar {
          flex: 0 1 72px;
          margin:0 24px 8px 0;
          & > span {
            border-radius: 72px;
            display: block;
            width: 72px;
            height: 72px;
          }
        }
        .main{
          width: 100%;
          flex: 0 1 auto;
          .title{
            flex: auto;
            font-size: 20px;
            font-weight: 500;
            color: rgba(0,0,0,.85);
            margin-bottom: 16px;
          }
          .logo{
            width: 28px;
            height: 28px;
            border-radius: 4px;
            margin-right: 16px;
          }
          .content{
            margin-bottom: 16px;
            flex: auto;
          }
          .extra{
            flex: 0 1 auto;
            margin-left: 88px;
            min-width: 242px;
            text-align: right;
          }
          .action{
            margin-left: 56px;
            min-width: 266px;
            flex: 0 1 auto;
            text-align: right;
          }
        }
      }
    }
  }
</style>
