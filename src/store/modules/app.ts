
// import Cookies from 'js-cookie'

const state = {
  sidebar: {
    opened: true,
    withoutAnimation: false
  },
  device: 'desktop'
}

const mutations = {
  UPDATE_Sidebar_opened: (state: { sidebar: { opened: boolean } }) => {
    state.sidebar.opened = !state.sidebar.opened
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
