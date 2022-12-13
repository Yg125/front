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
    path: '/user_activate',
    component: () => import('@/views/user/activate'),
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
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'Dashboard', icon: 'dashboard' }
    }]
  },


  // {
  //   path: '/table2',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'Table2',
  //       component: () => import('@/views/table2/index'),
  //       meta: { title: 'Table2', icon: 'el-icon-document' }
  //     }
  //   ]
  // },
 
  
  // {
  //   path: '/form',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'Form',
  //       component: () => import('@/views/form/index'),
  //       meta: { title: 'Form', icon: 'form' }
  //     }
  //   ]
  // }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  {
    path: '/nested',
    component: Layout,
    redirect: '/nested/menu1',
    name: 'Nested',
    meta: {
      title: 'Nested',
      icon: 'nested',
      roles:['superuser']
    },
    children: [
      {
        path: 'menu1',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'Menu1',
        meta: { title: 'Menu1', roles:['superuser']},
        children: [
          {
            path: 'menu1-1',
            component: () => import('@/views/nested/menu1/menu1-1'),
            name: 'Menu1-1',
            meta: { title: 'Menu1-1' , roles:['superuser']}
          },
          {
            path: 'menu1-2',
            component: () => import('@/views/nested/menu1/menu1-2'),
            name: 'Menu1-2',
            meta: { title: 'Menu1-2' , roles:['superuser']},
            children: [
              {
                path: 'menu1-2-1',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
                name: 'Menu1-2-1',
                meta: { title: 'Menu1-2-1' , roles:['superuser']}
              },
              {
                path: 'menu1-2-2',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
                name: 'Menu1-2-2',
                meta: { title: 'Menu1-2-2' , roles:['superuser']}
              }
            ]
          },
          {
            path: 'menu1-3',
            component: () => import('@/views/nested/menu1/menu1-3'),
            name: 'Menu1-3',
            meta: { title: 'Menu1-3' , roles:['superuser']}
          }
        ]
      },
      {
        path: 'menu2',
        component: () => import('@/views/nested/menu2/index'),
        meta: { title: 'menu2' , roles:['superuser']}
      }
    ]
  },
  {
    path: '/manage',
    component: Layout,
    // redirect: '/manage/users',
    name: 'Manage',
    meta: { title: '管理', icon: 'el-icon-s-help' ,roles:['superuser'] },
    children: [
      {
        path: 'users',
        name: 'Users',
        component: () => import('@/views/users/index'),
        meta: { title: '用户管理', icon: 'el-icon-user-solid', roles:['superuser']}
      },
      {
        path: 'courses',
        name: 'Courses',
        component: () => import('@/views/courses/index'),
        meta: { title: '课程管理', icon: 'table' ,roles:['superuser']}
      },
      {
        path: 'images',
        name: 'Images',
        component: () => import('@/views/images/index'),
        meta: { title: '镜像管理', icon: 'el-icon-s-platform' }
      },
      {
        path: 'containers',
        name: 'Containers',
        component: () => import('@/views/containers/index'),
        meta: { title: '容器管理', icon: 'el-icon-s-help' }
      },
      {
        path: 'http://127.0.0.1:9090/login',
        name: 'files',
        meta: { title: '文件管理', icon: 'el-icon-s-platform' }
      },
      {
        path: 'myfiles',
        name: 'Myfiles',
        component: () => import('@/views/files/index'), 
        meta: { title: '我的文件', icon: 'el-icon-s-platform' }
      },
      {
        path: 'build',
        name: 'Build',
        component: () => import('@/views/build/index'),
        meta: { title:'构建镜像', icon: 'el-icon-s-platform'}
      },
      // {
      //   path: 'tree',
      //   name: 'Tree',
      //   component: () => import('@/views/tree/index'),
      //   meta: { title: 'Tree', icon: 'tree' }
      // }
    ]
  },
  {
    path: '/mine',
    component: Layout,
    name: 'Mine',
    meta: { title:'我的', icon: 'el-icon-s-platform' ,roles:['student','teacher']},
    children: [
      {
        path: 'mycourses',
        name: 'Mycourses',
        component: () => import('@/views/mycourses/index'),
        meta: {title: '已选课程', icon: 'table'}
      },
      {
        path: 'selcourses',
        name: 'Selcourses',
        component: () => import('@/views/selcourses/index'),
        meta: { title: '可选课程', icon: 'el-icon-s-platform' }
      },
      {
        path: 'mycontainer',
        name: 'Mycontainer',
        component: () => import('@/views/mycontainer/index'),
        meta: { title: '我的容器', icon: 'el-icon-s-platform' }
      }, 
      {
        path: 'myfiles',
        name: 'Myfiles',
        component: () => import('@/views/files/index'), 
        meta: { title: '我的文件', icon: 'el-icon-s-platform' }
      },
      {
        path: 'http://127.0.0.1:9090/login',
        name: 'files',
        meta: { title: '文件管理', icon: 'el-icon-s-platform' }
      },
    ]
  },
  {
    path: '/teacher',
    component: Layout,
    name: '老师',
    meta: { title:'管理', icon: 'el-icon-s-platform', roles:['teacher']},
    children: [
      {
        path: 'courses',
        name: 'Courses',
        component: () => import('@/views/teachercourse/index'),
        meta: { title:'课程管理', icon: 'el-icon-s-platform'}
      }, 
      {
        path: 'images',
        name: 'Images',
        component: () => import('@/views/showimages/index'),
        meta: { title: '查看镜像', icon: 'el-icon-s-platform' }
      },
      {
        path: 'build',
        name: 'Build',
        component: () => import('@/views/build/index'),
        meta: { title:'构建镜像', icon: 'el-icon-s-platform'}
      },
    ]
  },

  // {
  //   path: 'external-link',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
  //       meta: { title: 'External Link', icon: 'link' }
  //     }
  //   ]
  // },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
