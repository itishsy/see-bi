<template>
  <a-layout>
    <drawer v-if="isMobile" :openDrawer="collapsed" @change="onDrawerChange">
      <sider :theme="theme" :menuData="menuData" :collapsed="false" :collapsible="false" @menuSelect="onMenuSelect"/>
    </drawer>
    <sider :theme="theme" v-else-if="layout === 'side'" :menuData="menuData" :collapsed="collapsed" :collapsible="true" />
    <drawer :open-drawer="settingBar" placement="right">
      <setting />
    </drawer>
    <a-layout :style="{ paddingLeft: paddingLeft }">
      <layout-header :menuData="menuData" :collapsed="collapsed" @toggleCollapse="toggleCollapse" />
      <a-layout-content :style="{minHeight: minHeight, margin: '20px 14px 0'}" :class="fixHeader ? 'fixed-header-content' : null">
        <contextmenu :itemList="menuItemList" :visible.sync="menuVisible" @select="onContentMenuSelect"/>
        <a-tabs class="page-tabs" @contextmenu.native="e => onContextmenu(e)" v-if="multipage" :active-key="activePage" style="margin-top: -8px; margin-bottom: 8px" :hide-add="true" type="editable-card" @change="changePage" @edit="editPage">
          <a-tab-pane :id="page.fullPath" :key="page.fullPath" v-for="page in pageList" forceRender>
            <span slot="tab" :pagekey="page.fullPath">{{page.name}}</span>
          </a-tab-pane>
        </a-tabs>
        <keep-alive v-if="multipage">
          <router-view/>
        </keep-alive>
        <router-view v-else/>
      </a-layout-content>
      <a-layout-footer style="padding: .29rem 0" class="copyright">
        <layout-footer :copyright="copyright"/>
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<script>
import LayoutHeader from './Header'
import LayoutFooter from './Footer'
import Contextmenu from './menu/ContextMenu'
import Drawer from './drawer/Drawer'
import Setting from './personal/Setting'
import Sider from './Sider'
import { mapState, mapMutations } from 'vuex'
import { triggerWindowResizeEvent } from '@/utils/common'

const minHeight = window.innerHeight - 64 - 24 - 66

let menuData = []

export default {
  name: 'Layout',
  components: {LayoutHeader, LayoutFooter, Setting, Sider, Drawer, Contextmenu},
  data () {
    return {
      minHeight: minHeight + 'px',
      collapsed: false,
      menuData: menuData,
      pageList: [],
      linkList: [],
      activePage: '',
      menuVisible: false,
      menuItemList: [
        {key: '1', icon: 'arrow-left', text: '关闭左侧'},
        {key: '2', icon: 'arrow-right', text: '关闭右侧'},
        {key: '3', icon: 'close', text: '关闭其它'}
      ]
    }
  },
  computed: {
    paddingLeft () {
      return this.fixSiderbar && this.layout === 'side' && !this.isMobile ? `${this.sidebarOpened ? 256 : 80}px` : '0'
    },
    multipage () {
      return this.$store.state.setting.multipage
    },
    ...mapState({
      sidebarOpened: state => state.setting.sidebar.opened,
      isMobile: state => state.setting.isMobile,
      theme: state => state.setting.theme,
      layout: state => state.setting.layout,
      copyright: state => state.setting.copyright,
      fixSiderbar: state => state.setting.fixSiderbar,
      fixHeader: state => state.setting.fixHeader,
      settingBar: state => state.setting.settingBar.opened
    })
  },
  created () {
    this.pageList.push(this.$route)
    this.linkList.push(this.$route.fullPath)
    this.activePage = this.$route.fullPath
  },
  watch: {
    '$route': function (newRoute, oldRoute) {
      this.activePage = newRoute.fullPath
      if (!this.multipage) {
        this.linkList = [newRoute.fullPath]
        this.pageList = [newRoute]
      } else if (this.linkList.indexOf(newRoute.fullPath) < 0) {
        this.linkList.push(newRoute.fullPath)
        this.pageList.push(newRoute)
      }
    },
    'activePage': function (key) {
      this.$router.push(key)
    },
    'multipage': function (newVal, oldVal) {
      if (!newVal) {
        this.linkList = [this.$route.fullPath]
        this.pageList = [this.$route]
      }
    }
  },
  methods: {
    ...mapMutations({setSidebar: 'setting/setSidebar'}),
    toggleCollapse () {
      this.collapsed = !this.collapsed
      this.setSidebar(!this.collapsed)
      triggerWindowResizeEvent()
    },
    onDrawerChange (show) {
      this.collapsed = show
    },
    onMenuSelect () {
      this.toggleCollapse()
    },
    changePage (key) {
      this.activePage = key
    },
    editPage (key, action) {
      this[action](key)
    },
    remove (key) {
      if (this.pageList.length === 1) {
        this.$router.push('/')
        if (!this.pageList[0].meta.closeable) {
          return
        }
      }
      this.pageList = this.pageList.filter(item => item.fullPath !== key)
      let index = this.linkList.indexOf(key)
      this.linkList = this.linkList.filter(item => item !== key)
      index = index >= this.linkList.length ? this.linkList.length - 1 : index
      this.activePage = this.linkList[index]
    },
    onContextmenu (e) {
      const pagekey = this.getPageKey(e.target)
      if (pagekey !== null) {
        e.preventDefault()
        this.menuVisible = true
      }
    },
    getPageKey (target, depth) {
      depth = depth || 0
      if (depth > 2) {
        return null
      }
      let pageKey = target.getAttribute('pagekey')
      pageKey = pageKey || (target.previousElementSibling ? target.previousElementSibling.getAttribute('pagekey') : null)
      return pageKey || (target.firstElementChild ? this.getPageKey(target.firstElementChild, ++depth) : null)
    },
    onContentMenuSelect (key, target) {
      let pageKey = this.getPageKey(target)
      switch (key) {
        case '1':
          this.closeLeft(pageKey)
          break
        case '2':
          this.closeRight(pageKey)
          break
        case '3':
          this.closeOthers(pageKey)
          break
        case '4':
          this.closeAll(pageKey)
          break
        default:
          break
      }
    },
    closeOthers (pageKey) {
      let index = this.linkList.indexOf(pageKey)
      this.linkList = this.linkList.slice(index, index + 1)
      this.pageList = this.pageList.slice(index, index + 1)
      this.activePage = this.linkList[0]
    },
    closeLeft (pageKey) {
      let index = this.linkList.indexOf(pageKey)
      this.linkList = this.linkList.slice(index)
      this.pageList = this.pageList.slice(index)
      if (this.linkList.indexOf(this.activePage) < 0) {
        this.activePage = this.linkList[0]
      }
    },
    closeRight (pageKey) {
      let index = this.linkList.indexOf(pageKey)
      this.linkList = this.linkList.slice(0, index + 1)
      this.pageList = this.pageList.slice(0, index + 1)
      if (this.linkList.indexOf(this.activePage < 0)) {
        this.activePage = this.linkList[this.linkList.length - 1]
      }
    }
  },
  beforeCreate () {
    let routers = this.$db.get('USER_ROUTER')
    menuData = routers.find((item) => item.path === '/').children.filter((menu) => {
      let meta = menu.meta
      if (typeof meta.isShow === 'undefined') {
        return true
      } else return meta.isShow
    })
  }
}
</script>

<style lang="less" scoped>
  /*>>>.ant-tabs-tab{*/
    /*margin-right: 1px !important;*/
  /*}*/
  .setting{
    background-color: #1890ff;
    color: #fff;
    border-radius: 5px 0 0 5px;
    line-height: 40px;
    font-size: 22px;
    width: 40px;
    height: 40px;
    box-shadow: -2px 0 8px rgba(0, 0, 0, 0.15);
  }
  .fixed-header-content {
    margin: 76px 12px 0 !important;
  }
</style>
