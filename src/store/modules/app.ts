
import { MutationTree } from 'vuex'
import { getSidebarStatus, setSidebarStatus } from '@/utils/auth'

declare interface appStore {
  sidebar: {
    opened: boolean,
    withoutAnimation: boolean
  },
  device: string
}
const state:appStore = {
  sidebar: {
    opened: getSidebarStatus() ? getSidebarStatus() !== 'closed' : true,
    withoutAnimation: false
  },
  device: 'desktop'
}

const mutations:MutationTree<appStore> = {
  UPDATE_Sidebar_opened: (state) => {
    state.sidebar.opened = !state.sidebar.opened
    if (state.sidebar.opened) {
      setSidebarStatus('opened')
    } else {
      setSidebarStatus('closed')
    }
  }
}

const actions = {

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
