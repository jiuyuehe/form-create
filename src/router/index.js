// 路由配置
import { createRouter, createWebHistory } from 'vue-router'
import FormList from '../views/FormList.vue'

const routes = [
  {
    path: '/',
    name: 'FormList',
    component: FormList,
    meta: { title: '表单管理' }
  },
  {
    path: '/form/new',
    name: 'FormNew',
    component: FormList,
    meta: { title: '创建表单' }
  },
  {
    path: '/form/:id',
    name: 'FormDetail',
    component: FormList,
    children: [
      {
        path: 'designer',
        name: 'FormDesigner',
        component: FormList,
        meta: { title: '编辑表单' }
      },
      {
        path: 'data',
        name: 'FormData',
        component: FormList,
        meta: { title: '表单数据' }
      },
      {
        path: 'data/:resultId',
        name: 'FormDataDetail',
        component: FormList,
        meta: { title: '数据详情' }
      }
    ]
  },
  {
    path: '/settings',
    name: 'Settings',
    component: FormList,
    meta: { title: '设置' }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// 路由守卫 - 设置页面标题
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = `${to.meta.title} - 表单管理系统`
  }
  next()
})

export default router
