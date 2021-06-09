
// import NProgress from 'nprogress'
// import 'nprogress/nprogress.css'
import router from '@/router'
import { RouteLocationNormalized } from 'vue-router'
// import { useStore } from 'vuex'
// import { UserActionTypes } from './store/modules/user/action-types'
// import { PermissionActionType } from './store/modules/permission/action-types'
// import { UserMutationTypes } from './store/modules/user/mutation-types'
// import { ElMessage } from 'element-plus'
// import { whiteList } from './config/white-list'
// import rolesSettings from './config/roles'
// const whiteList = ['/login'] // no redirect whitelist

// NProgress.configure({ showSpinner: false })

router.beforeEach(async(to: RouteLocationNormalized, _: RouteLocationNormalized, next: any) => {
  console.log(111, to, _, next)
  // next({ path: '/' })

  next()
})

router.afterEach(() => {
  // NProgress.done()
})
