<template>
  <el-menu-item
    :index="resolvePath(item.url)"
    class="submenu-title-noDropdown"
    @click="toView(resolvePath(item.url))"
  >
    <item
      icon="el-icon-s-home"
      :title="item.menuName"
      :name="item.menuName"
    />
  </el-menu-item>
</template>

<script>
import path from 'path'
import { isExternal } from '@/utils/validate'
import Item from './Item'
import AppLink from './Link'
import FixiOSBug from './FixiOSBug'

export default {
  name: 'SidebarItem',
  components: { Item, AppLink },
  mixins: [FixiOSBug],
  props: {
    // route object
    item: {
      type: Object,
      required: true
    },
    isNest: {
      type: Boolean,
      default: false
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  data() {
    // To fix https://github.com/PanJiaChen/vue-admin-template/issues/237
    // TODO: refactor with render function
    this.onlyOneChild = null
    return {}
  },
  methods: {
    hasOneShowingChild(children = [], parent) {
      const showingChildren = children.filter(item => {
        if (item.hidden) {
          return false
        } else {
          // Temp set(will be used if only has one showing child)
          this.onlyOneChild = item
          return true
        }
      })

      // When there is only one child router, the child router is displayed by default
      if (showingChildren.length === 1) {
        return true
      }

      // Show parent if there are no child router to display
      if (showingChildren.length === 0) {
        this.onlyOneChild = { ... parent, path: '', noShowingChildren: true }
        return true
      }

      return false
    },
    // resolvePath(routePath) {
    //   if (isExternal(routePath)) {
    //     return routePath
    //   }
    //   if (isExternal(this.basePath)) {
    //     return this.basePath
    //   }
    //   return path.resolve(this.basePath, routePath)
    // }

    /**
     * 跳转页面
     */
    toView(path) {
      // 在路由追加时间戳参数，每次打开，都能刷新页面
      this.$router.push({ path, query: { t: new Date().getTime() }})
    },


    resolvePath(routePath) {
      if (isExternal(routePath)) {
        return routePath + '?' + new Date().getTime()
      }
      if (isExternal(this.basePath)) {
        return this.basePath
      }

      return path.resolve(this.basePath, routePath.replace(/:[A-Za-z]+\?/, ''))
    }
  }
}
</script>
