import defaultSettings from '@/settings'
import { ActionTree, MutationTree } from 'vuex'

declare interface settingStore {
  fixedHeader: boolean,
  sidebarLogo: boolean,
  logo: string,
  title: string,
  tagsView: boolean,
  breadcrumb: boolean,
  IsSearch: boolean,
  Layout: boolean,
  navbarBackground: string,
  navbarColor: string,
  NODE_ENV: string | undefined,
  isUnifiedLogin: boolean,
  isGameShow: boolean,
  isSwitchEnvironment: boolean|string|undefined
  logoBackground: string,
  logoColor: string,
}
const state:settingStore = {
  fixedHeader: defaultSettings.fixedHeader,
  sidebarLogo: defaultSettings.sidebarLogo,
  logo: defaultSettings.logo,
  title: defaultSettings.title,
  tagsView: defaultSettings.tagsView,
  breadcrumb: defaultSettings.breadcrumb,
  IsSearch: defaultSettings.IsSearch,
  Layout: defaultSettings.Layout,
  logoBackground: defaultSettings.logoBackground, // logo字体和图标颜色
  logoColor: defaultSettings.logoColor, // logo字体和图标颜色
  navbarBackground: defaultSettings.navbarBackground,
  navbarColor: defaultSettings.navbarColor,
  NODE_ENV: process.env.NODE_ENV,
  isUnifiedLogin: defaultSettings.isUnifiedLogin, // 是否统一登入
  isGameShow: defaultSettings.isGameShow, // 是否展示游戏平台
  isSwitchEnvironment: defaultSettings.isSwitchEnvironment
}

const mutations:MutationTree<settingStore> = {
  CHANGE_SETTING: (state, payload: { key: string, value: any }) => {
    const { key, value } = payload
    if (Object.prototype.hasOwnProperty.call(state, key)) {
      interface setting {
        [key: string]: any
      }
      (<setting>state)[key] = value
    }
  }
}

const actions:ActionTree<settingStore, any> = {
  changeSetting({ commit }, data) {
    commit('CHANGE_SETTING', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

