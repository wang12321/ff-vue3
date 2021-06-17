import { MutationTree, ActionTree } from 'vuex'
import { getSidebarStatus, setSidebarStatus } from '@/utils/auth'

export enum DeviceType {
  // eslint-disable-next-line no-unused-vars
  Mobile,
  // eslint-disable-next-line no-unused-vars
  Desktop,
}
declare interface appStore {
  sidebar: {
    opened: boolean,
    withoutAnimation: boolean
  },
  device: DeviceType
}
const state:appStore = {
  sidebar: {
    opened: !!((getSidebarStatus() && getSidebarStatus() !== 'closed')),
    withoutAnimation: false
  },
  device: DeviceType.Desktop
}

const mutations:MutationTree<appStore> = {
  UPDATE_Sidebar_opened: (state) => {
    state.sidebar.opened = !state.sidebar.opened
    if (state.sidebar.opened) {
      setSidebarStatus('opened')
    } else {
      setSidebarStatus('closed')
    }
  },
  CLOSE_SIDEBAR: (state, withoutAnimation) => {
    setSidebarStatus('closed')
    state.sidebar.opened = false
    state.sidebar.withoutAnimation = withoutAnimation
  },
  TOGGLE_DEVICE: (state, device:DeviceType) => {
    state.device = device
  }
}

const actions:ActionTree<appStore, any> = {
  ToggleSideBar({ commit }) {
    commit('UPDATE_Sidebar_opened')
  },
  CloseSideBar({ commit }, withoutAnimation) {
    commit('CLOSE_SIDEBAR', withoutAnimation)
  },
  ToggleDevice({ commit }, device:DeviceType) {
    commit('TOGGLE_DEVICE', device)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
