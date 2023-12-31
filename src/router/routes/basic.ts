import type { RouteRecordRaw } from 'vue-router'
const layoutPage = () => import(`@/layouts/default/view.vue`)
const error404Page = () => import(`@/layouts/error/404.vue`)
const login: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      icon: 'ion:grid-outline',
      title: 'login'
    }
  }
]
const redirect = {
  path: '/redirect',
  name: 'redirectPath',
  component: layoutPage,
  meta: {
    icon: 'ion:grid-outline',
    title: 'redirect'
  },
  children: [
    {
      path: '/redirect/:path(.*)',
      name: 'redirect',
      component: () => import('@/layouts/refresh/index.vue'),
      meta: {
        title: '刷新中'
      }
    }
  ]
}
const error = [
  {
    path: '/error',
    name: 'error',
    redirect: '/404',
    component: layoutPage,
    meta: {
      icon: 'ion:grid-outline',
      title: 'error'
    },
    children: [
      {
        path: '/404',
        name: '404',
        component: error404Page,
        meta: {
          icon: 'ion:grid-outline',
          title: '404'
        }
      }
    ]
  },
  // 404页面
  {
    path: '/:pathMatch(.*)*',
    component: error404Page,
    redirect: '/error',
    name: 'Match'
  }
]

export const staticRoutes = [...login, redirect, ...error]
