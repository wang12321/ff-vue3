/**
 * @author ff
 * @date 2021/6/9
 * @Description: 路由文件
 * @update by:
 */

import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/index.vue'
import { routerNameP } from './routerName'
interface IrouterName {
  [key: string]: any
}
const routerName = (<IrouterName>routerNameP)

type routerType = {
  index: number,
  path: string,
  name: string,
  component: any,
  meta: {
    title: string,
    icon: string,
    permissionArray: string[],
    newTime: string,
    breadcrumb: boolean
  },
  children?: Array<routerType>
}

// 实现自动生成路由配置文件======================================
// 懒加载
const requireAllVueComponents = require.context('../views/autoRouter', true, /\.vue$/, 'lazy')
const routerList:Array<RouteRecordRaw> = []
// const routerMap = {}

requireAllVueComponents.keys().forEach((allVueComponentItem:string) => {
  const completeName = allVueComponentItem && allVueComponentItem.match(/\w+\.vue$/)![0]
  const routerObj:RouteRecordRaw = {} as RouteRecordRaw
  routerObj.path = '/' + allVueComponentItem.replace(/\./, 'autoRouter').replace(/.vue$/, '')
  routerObj.name = completeName.replace(/.vue$/, '')
  routerObj.component = () => requireAllVueComponents(allVueComponentItem).default || requireAllVueComponents(allVueComponentItem)

  // router 子路径
  const routerChildren:routerType = {
    index: 1,
    path: '',
    component: routerObj.component,
    name: routerObj.name,
    meta: {
      title: '',
      icon: '',
      permissionArray: [],
      newTime: '',
      breadcrumb: false
    }
  }
  // router 路径
  const router:routerType = {
    index: 1,
    path: '',
    name: '',
    component: Layout,
    meta: {
      title: '',
      icon: '',
      permissionArray: [],
      newTime: '',
      breadcrumb: false
    },
    children: []
  }
  const routerArr = routerObj.path.split('/')
  let isSame = true
  // 过滤所有components下的子组件，无需生成路由
  if (routerArr.includes('common')) {
    return
  }
  // 初始化属性值
  const routerAttribute = function(name:string, attribute:string) {
    const init = {
      index: 1,
      icon: 'component',
      name: name,
      permission: [1, 2, 3],
      newTime: new Date()
    }
    interface Iinit {
      [key: string]: any
    }
    if (attribute === 'newTime') {
      return (routerName[name] && routerName[name] !== '' && routerName[name][attribute]) ? new Date(routerName[name][attribute]) : (<Iinit>init)[attribute]
    }
    return (routerName[name] && routerName[name] !== '' && routerName[name][attribute]) ? routerName[name][attribute] : (<Iinit>init)[attribute]
  }
  // 设置父属性值
  const parentAttribute = (name:string) => {
    router.index = routerAttribute(name, 'index')
    router.meta.icon = routerAttribute(name, 'icon')
    router.meta.title = routerAttribute(name, 'name')
    router.meta.permissionArray = routerAttribute(name, 'permission')
    router.meta.newTime = routerAttribute(name, 'newTime')
  }
  // 设置子属性值
  const childrenAttribute = (name:string) => {
    routerChildren.index = routerAttribute(name, 'index')
    routerChildren.meta.icon = routerAttribute(name, 'icon')
    routerChildren.meta.title = routerAttribute(name, 'name')
    routerChildren.meta.newTime = routerAttribute(name, 'newTime')
    routerChildren.meta.permissionArray = routerAttribute(name, 'permission')
  }
  switch (routerArr.length) {
    case 3:
      // 处理接口请求放回router情况
      // routerMap[routerObj.name] = routerObj.component

      // 当路由不是嵌套路径时 直接push到routerList中
      parentAttribute(routerObj.name)
      router.children = router.children || []
      router.children.push(routerChildren)
      routerChildren.path = routerObj.path + ((routerName[routerObj.name] && routerName[routerObj.name] !== '' && routerName[routerObj.name]['isID']) ? routerName[routerObj.name]['isID'] : '')
      childrenAttribute(routerObj.name)
      routerList.push(router)
      break
    case 4:
      // 处理接口请求放回router情况
      // routerMap[routerObj.name] = routerObj.component

      // 当路由是嵌套路径时，如果routerList中包含改路径，则在children中加入子路径，否则在routerList中push。
      router.path = routerArr[2] === routerArr[3] ? '/' + routerArr[2] + 'p' : '/' + routerArr[1] + '/' + routerArr[2]
      router.name = routerArr[2] + 'p'
      router.meta.breadcrumb = routerArr[2] !== routerArr[3]
      parentAttribute(routerArr[2])
      routerChildren.path = routerArr[3] + ((routerName[routerObj.name] && routerName[routerObj.name] !== '' && routerName[routerObj.name]['isID']) ? routerName[routerObj.name]['isID'] : '')
      childrenAttribute(routerObj.name)
      routerList.forEach(item => {
        if (routerArr[2] + 'p' === item.name) {
          item.children = item.children || []
          item.children.push(routerChildren)
          isSame = false
        }
      })
      if (isSame) {
        router.children = router.children || []
        router.children.push(routerChildren)
        routerList.push(router)
      }
      break
  }
})

export const constantRoutes:Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "about" */ '../views/login/index.vue')
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import(/* webpackChunkName: "dashboard" */ '@/views/dashboard/index.vue'),
        name: 'Dashboard',
        meta: {
          title: 'dashboard',
          icon: 'dashboard',
          affix: true
        }
      }
    ]
  }
]

// 自动获取modules配置
const files = require.context('./modules', false, /\.ts$/)
let tmp:Array<RouteRecordRaw> = []
files.keys().forEach(key => {
  tmp = tmp.concat(files(key).default)
})

export const asyncRouterMap:Array<RouteRecordRaw> = [
  ...routerList,
  ...tmp,
  // 404 page must be placed at the end !!!
  {
    // 匹配所有路径  vue2使用*   vue3使用/:pathMatch(.*)*或/:pathMatch(.*)或/:catchAll(.*)
    path: '/:pathMatch(.*)*',
    name: '404',
    component: () => import('@/views/404.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: constantRoutes.concat(asyncRouterMap)
})

export default router
