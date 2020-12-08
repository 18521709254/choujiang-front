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
      meta: {
        roles: ['管理员'],
        title: '首页', icon: '首页'
      }
    }]
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
        path: 'propertyList',
        name: '物业管理',
        component: () => import('@/views/property/list'),
        meta: {
          roles: ['管理员'],
          title: '物业管理', icon: 'table' }
      },
      {
        path: 'propertyEdit',
        name: 'PropertyEdit',
        hidden: true,
        component: () => import('@/views/property/edit'),
        meta: { title: 'PropertyEdit', icon: 'tree' }
      },
      {
        path: 'communityList',
        name: '小区管理',
        component: () => import('@/views/community/list'),
        meta: { title: '小区管理', icon: 'table' }
      },
      {
        path: 'communityEdit',
        name: 'CommunityEdit',
        hidden: true,
        component: () => import('@/views/community/edit'),
        meta: { title: 'CommunityEdit', icon: 'tree' }
      },
      {
        path: 'userList',
        name: '用户管理',
        component: () => import('@/views/user/list'),
        meta: { title: '用户管理', icon: 'table' }
      },
      {
        path: 'userEdit',
        name: 'UserEdit',
        hidden: true,
        component: () => import('@/views/user/edit'),
        meta: { title: 'UserEdit', icon: 'tree' }
      },
      {
        path: 'roleList',
        name: '角色管理',
        component: () => import('@/views/role/list'),
        meta: { title: '角色管理', icon: 'table' }
      },
      {
        path: 'roleEdit',
        name: 'RoleEdit',
        hidden: true,
        component: () => import('@/views/role/edit'),
        meta: { title: 'RoleEdit', icon: 'tree' }
      }, {
        path: 'billList',
        name: '订单管理',
        component: () => import('@/views/bill/list'),
        meta: { title: '订单管理', icon: 'table' }
      },
      {
        path: 'tariffList',
        name: '资费管理',
        component: () => import('@/views/bill/tariff-list'),
        meta: { title: '资费管理', icon: 'table' }
      },
      {
        path: 'billEdit',
        name: 'BillEdit',
        hidden: true,
        component: () => import('@/views/bill/edit'),
        meta: { title: 'RoleEdit', icon: 'tree' }
      },
      {
        path: 'memberList',
        name: '会员管理',
        component: () => import('@/views/member/list'),
        meta: { title: '会员管理', icon: 'table' }
      },
      {
        path: 'memberEdit',
        name: 'MemberEdit',
        hidden: true,
        component: () => import('@/views/member/edit'),
        meta: { title: 'MemberEdit', icon: 'tree' }
      },
      {
        path: 'propertySpaceList',
        name: '物业车位管理',
        component: () => import('@/views/space/property/property-list'),
        meta: { title: '物业车位管理', icon: 'table' }
      },
      {
        path: 'propertySpaceEdit',
        name: 'PropertySpaceEdit',
        hidden: true,
        component: () => import('@/views/space/property/property-edit'),
        meta: { title: 'PropertySpaceEdit', icon: 'tree' }
      },
      {
        path: 'memberSpaceList',
        name: '私家车位管理',
        component: () => import('@/views/space/member/member-list'),
        meta: { title: '物业车位管理', icon: 'table' }
      },
      {
        path: 'memberSpaceEdit',
        name: 'MemberSpaceEdit',
        hidden: true,
        component: () => import('@/views/space/member/member-edit'),
        meta: { title: 'MemberSpaceEdit', icon: 'tree' }
      },
      {
        path: 'placardList',
        name: '公告管理',
        component: () => import('@/views/placard/list'),
        meta: { title: '公告管理', icon: 'table' }
      },
      {
        path: 'PlacardEdit',
        name: 'PlacardEdit',
        hidden: true,
        component: () => import('@/views/placard/edit'),
        meta: { title: 'placardEdit', icon: 'tree' }
      },
      {
        path: 'ComplaintList',
        name: '投诉管理',
        component: () => import('@/views/complaint/list'),
        meta: { title: '投诉管理', icon: 'table' }
      },
      {
        path: 'ComplaintEdit',
        name: 'ComplaintEdit',
        hidden: true,
        component: () => import('@/views/complaint/edit'),
        meta: { title: 'complainEdit', icon: 'tree' }
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
