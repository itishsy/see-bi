<template>
 <!-- <a-layout-header :class="[fixHeader && 'ant-header-fixedHeader', layout === 'side' ? (sidebarOpened ? 'ant-header-side-opened' : 'ant-header-side-closed') : null, theme, 'header' ]">
    <div :class="['header-wide', layout]">
      <router-link v-if="isMobile || layout === 'head'" to="/" :class="['logo', isMobile ? null : 'pc', theme]">
        &lt;!&ndash;<img width="32" src="static/img/logo.png"  alt=""/>&ndash;&gt;
        <h1 v-if="!isMobile">{{systemName}}</h1>
      </router-link>
      <a-divider v-if="isMobile" type="vertical" />
      <a-icon v-if="layout === 'side'" class="trigger" :type="collapsed ? 'menu-unfold' : 'menu-fold'" @click="toggleCollapse"/>
      <div v-if="layout === 'head'" class="header-menu">
        <i-menu style="height: 64px; line-height: 64px;" class="system-top-menu" :theme="theme" mode="horizontal" :menuData="menuData" @select="onSelect"/>
      </div>
      <div :class="['header-right', theme]">
          <avatar class="header-item"/>
      </div>
    </div>
     </a-layout-header>-->
    <a-layout-header :class="[fixHeader && 'ant-header-fixedHeader', layout === 'side' ? (sidebarOpened ? 'ant-header-side-opened' : 'ant-header-side-closed') : null, theme, 'header' ]">
  <div class="header-title">
    <div class="bg">
      <div class="title-bg"></div>
      <p class="fl"><span class="text little-title">财务指标管理驾驶舱</span></p>
      <span class="text title">test</span>
      <div class="fr">
        <div :class="['header-right', theme]">
          <avatar class="header-item"/>
        </div>
      </div>
    </div>
  </div>
    </a-layout-header>
</template>

<script>
import Avatar from './personal/Avatar'
import IMenu from './menu/menu'
import { mapState } from 'vuex'

export default {
  name: 'Header',
  components: {IMenu, Avatar},
  props: ['collapsed', 'menuData'],
  computed: {
    ...mapState({
      isMobile: state => state.setting.isMobile,
      layout: state => state.setting.layout,
      systemName: state => state.setting.systemName,
      sidebarOpened: state => state.setting.sidebar.opened,
      fixHeader: state => state.setting.fixHeader
    }),
    theme () {
      return this.layout === 'side' ? 'light' : this.$store.state.setting.theme
    }
  },
  methods: {
    toggleCollapse () {
      this.$emit('toggleCollapse')
    },
    onSelect (obj) {
      this.$emit('menuSelect', obj)
    }
  }
}
</script>

<style lang="less" scoped>
  .trigger {
    font-size: 20px;
    line-height: 64px;
    padding: 0 24px;
    cursor: pointer;
    transition: color .3s;
  }
  .header-item{
    padding: 0 19px;
    display: inline-block;
    height: 100%;
    cursor: pointer;
    vertical-align: middle;
    i{
      font-size: 16px;
      color: rgba(0,0,0,.65);
    }
  }
  .header{
    padding: 0;
    -webkit-box-shadow: 0 1px 4px rgba(0,21,41,.08);
    box-shadow: 0 1px 4px rgba(0,21,41,.08);
    position: relative;
    &.dark{
      background: #393e46;
    }
    .header-wide{
      &.head{
        padding: 0 24px;
      }
      &.side{
      }
      .logo {
        height: 64px;
        line-height: 58px;
        vertical-align: top;
        display: inline-block;
        padding: 0 12px 0 24px;
        cursor: pointer;
        font-size: 20px;
        &.pc{
          padding: 0 12px 0 0;
        }
        img {
          display: inline-block;
          vertical-align: middle;
        }
        h1{
          display: inline-block;
          font-size: 16px;
        }
        &.dark h1{
          color: #fff;
        }
      }
      .header-menu{
        display: inline-block;
      }
      .header-right{
        float: right;
        &.dark{
          color: #fff;
          i{
            color: #fff;
          }
        }
      }
    }
  }
  .ant-header-fixedHeader {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 15;
    width: 100%;
    transition: width .2s;

    &.ant-header-side-opened {
      width: 100%;
      padding-left: 254px;
    }

    &.ant-header-side-closed {
      width: 100%;
      padding-left: 80px;
    }
  }

  .ant-layout-header{
    background: none;
    height: auto;
  }
  .header-title{
    padding-top: 20px;
    background-color: #1A294A;
  }
  .bg{
    position: relative;
    width: 100%;
    height: 66px;
    border-top: 2px solid #2E579E;
    padding-left: 20px;
    .title-bg{
      position: absolute;
      top: -18px;
      left: 50%;
      margin-left: -270px;
      width: 541px;
      height: 85px;
      background: url('/static/img/icons/ic-header-title.png');
    }
    .text{
      background-image:-webkit-linear-gradient(right,#0a8ef7,#62ffff);
      -webkit-background-clip:text;
      -webkit-text-fill-color:transparent;
      letter-spacing:5px;
    }
    .title{
      position: absolute;
      top: -10px;
      left: 50%;
      -moz-transform: translateX(-50%);
      -webkit-transform: translateX(-50%);
      -o-transform: translateX(-50%);
      transform: translateX(-50%);
      font-size: 30px;
    }
    .little-title{
      text-align: left;
      font-size: 26px;
    }
  }
</style>
