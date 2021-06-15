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
  const allVueComponentItems = allVueComponentItem.match(/\w+\.vue$/) || []
  const completeName = allVueComponentItems[0]
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
  const routerAttribute = function(name:string, attribute:string, isChildrenName?:string) {
    const init = {
      index: 1,
      icon: 'component',
      name: isChildrenName || name,
      permission: [1, 2, 3],
      newTime: new Date()
    }
    interface Iinit {
      [key: string]: any
    }
    if (!isChildrenName) {
      if (attribute === 'newTime') {
        return (routerName[name] && routerName[name] !== '' && routerName[name][attribute]) ? new Date(routerName[name][attribute]) : (<Iinit>init)[attribute]
      }
      return (routerName[name] && routerName[name] !== '' && routerName[name][attribute]) ? routerName[name][attribute] : (<Iinit>init)[attribute]
    } else if (isChildrenName && isChildrenName === name) {
      if (attribute === 'newTime') {
        return (routerName[isChildrenName] && routerName[isChildrenName] !== '' && routerName[isChildrenName][attribute]) ? new Date(routerName[isChildrenName][attribute]) : (<Iinit>init)[attribute]
      }
      return (routerName[isChildrenName] && routerName[isChildrenName] !== '' && routerName[isChildrenName][attribute]) ? routerName[isChildrenName][attribute] : (<Iinit>init)[attribute]
    } else {
      if (attribute === 'newTime') {
        return (routerName[name] && routerName[name] !== '' && routerName[name]['children'] && routerName[name]['children'][isChildrenName] && routerName[name]['children'][isChildrenName] !== '' && routerName[name]['children'][isChildrenName][attribute]) ? new Date(routerName[name]['children'][isChildrenName][attribute]) : (<Iinit>init)[attribute]
      }
      return (routerName[name] && routerName[name] !== '' && routerName[name]['children'] && routerName[name]['children'][isChildrenName] && routerName[name]['children'][isChildrenName] !== '' && routerName[name]['children'][isChildrenName][attribute]) ? routerName[name]['children'][isChildrenName][attribute] : (<Iinit>init)[attribute]
    }
  }
  // 设置父属性值
  const parentAttribute = (parentName:string, childrenName:string) => {
    router.index = routerAttribute(parentName, 'index')
    router.meta.icon = routerAttribute(parentName, 'icon')
    router.meta.title = routerAttribute(parentName, 'name')
    router.meta.permissionArray = routerAttribute(parentName, 'permission')
    router.meta.newTime = routerAttribute(parentName, 'newTime')
    childrenAttribute(parentName, childrenName)
  }
  // 设置子属性值
  const childrenAttribute = (parentName:string, childrenName:string) => {
    routerChildren.index = routerAttribute(parentName, 'index', childrenName)
    routerChildren.meta.icon = routerAttribute(parentName, 'icon', childrenName)
    routerChildren.meta.title = routerAttribute(parentName, 'name', childrenName)
    routerChildren.meta.newTime = routerAttribute(parentName, 'newTime', childrenName)
    routerChildren.meta.permissionArray = routerAttribute(parentName, 'permission', childrenName)
  }
  switch (routerArr.length) {
    case 3:
      // 处理接口请求放回router情况
      // routerMap[routerObj.name] = routerObj.component

      // 当路由不是嵌套路径时 直接push到routerList中
      parentAttribute(routerObj.name, routerObj.name)
      router.children = router.children || []
      router.children.push(routerChildren)
      routerChildren.path = routerObj.path + ((routerName[routerObj.name] && routerName[routerObj.name] !== '' && routerName[routerObj.name]['isID']) ? routerName[routerObj.name]['isID'] : '')
      routerList.push(router)
      break
    case 4:
      // 处理接口请求放回router情况
      // routerMap[routerObj.name] = routerObj.component

      // 当路由是嵌套路径时，如果routerList中包含改路径，则在children中加入子路径，否则在routerList中push。
      router.path = routerArr[2] === routerArr[3] ? '/' + routerArr[2] + 'p' : '/' + routerArr[1] + '/' + routerArr[2]
      router.name = routerArr[2] + 'p'
      router.meta.breadcrumb = routerArr[2] !== routerArr[3]
      parentAttribute(routerArr[2], routerObj.name)
      if (routerArr[2] === routerArr[3]) {
        routerChildren.path = routerArr[3] + ((routerName[routerArr[2]] && routerName[routerArr[2]] !== '' && routerName[routerArr[2]]['isID']) ? routerName[routerArr[2]]['isID'] : '')
      } else {
        routerChildren.path = routerArr[3] + ((routerName[routerArr[2]] && routerName[routerArr[2]] !== '' && routerName[routerArr[2]]['children'] && routerName[routerArr[2]]['children'] !== '' && routerName[routerArr[2]]['children'][routerObj.name] && routerName[routerArr[2]]['children'][routerObj.name] !== '' && routerName[routerArr[2]]['children'][routerObj.name]['isID']) ? routerName[routerArr[2]]['children'][routerObj.name]['isID'] : '')
      }
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
    path: '/redirect',
    component: Layout,
    meta: { hidden: true },
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import(/* webpackChunkName: "redirect" */ '@/views/redirect/index.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "about" */ '@/views/login/index.vue')
  },
  {
    path: '/noPermission',
    component: () => import('@/views/noPermission.vue'),
    meta: { hidden: true }
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
