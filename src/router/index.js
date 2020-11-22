import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: '首页',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: '首页' }
    }]
  },

  {
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    meta: { title: '列表模板', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'table',
        name: '表单结构',
        component: () => import('@/views/table/index'),
        meta: { title: '表单结构', icon: 'table' }
      },
      {
        path: 'tree',
        name: '树结构',
        component: () => import('@/views/tree/index'),
        meta: { title: '树结构', icon: 'tree' }
      }
    ]
  },

  {
    path: '/form',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/form/index'),
        meta: { title: '表单模板', icon: 'form' }
      }
    ]
  },

  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        meta: { title: 'External Link', icon: 'link' }
      }
    ]
  },
  /** **************** 宋凯翔新增页面 *********************/
  {
    path: '/property',
    component: Layout,
    redirect: '/property/list',
    name: 'Property',
    meta: { title: '物业管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'list',
        name: '物业查询',
        component: () => import('@/views/property/list'),
        meta: { title: '物业查询', icon: 'table' }
      },
      {
        path: 'edit',
        name: 'PropertyEdit',
        component: () => import('@/views/property/edit'),
        meta: { title: 'PropertyEdit', icon: 'tree' }
      }
    ]
  },
  {
    path: '/community',
    component: Layout,
    redirect: '/community/list',
    name: 'Community',
    meta: { title: '小区管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'list',
        name: '小区查询',
        component: () => import('@/views/community/list'),
        meta: { title: '小区查询', icon: 'table' }
      },
      {
        path: 'edit',
        name: 'CommunityEdit',
        component: () => import('@/views/community/edit'),
        meta: { title: 'CommunityEdit', icon: 'tree' }
      }
    ]
  }, {
    path: '/member',
    component: Layout,
    redirect: '/member/list',
    name: 'Member',
    meta: { title: '会员管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'list',
        name: '会员查询',
        component: () => import('@/views/member/list'),
        meta: { title: '会员查询', icon: 'table' }
      },
      {
        path: 'edit',
        name: 'MemberEdit',
        component: () => import('@/views/member/edit'),
        meta: { title: 'MemberEdit', icon: 'tree' }
      }
    ]
  },
  {
    path: '/space',
    component: Layout,
    redirect: '/space/list',
    name: '车位管理',
    meta: { title: '车位管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'list',
        name: '车位查询',
        component: () => import('@/views/space/list'),
        meta: { title: '车位查询', icon: 'table' }
      },
      {
        path: 'edit',
        name: 'SpaceEdit',
        component: () => import('@/views/space/edit'),
        meta: { title: 'SpaceEdit', icon: 'tree' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}
/**
 * 重写路由的push方法
 */
const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error)
}

export default router
