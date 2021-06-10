
import { ActionTree, MutationTree } from 'vuex'
import { getToken, removeToken, setToken } from '@/utils/auth'
import api from '@/services/api'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    gamelist: []
  }
}
export interface userStore {
    token: string | null,
    name: string,
    avatar: string,
    gamelist: []
}
const state:userStore = {
  token: getToken(),
  name: '',
  avatar: '',
  gamelist: []
}

const mutations:MutationTree<userStore> = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },

  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_Gamelist: (state, data) => {
    state.gamelist = data
  }
}

const actions:ActionTree<userStore, any> = {
  // user login
  login({ commit }, userInfo) {
    const { login } = api.user
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then((response:any) => {
        const { data } = response
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        resolve(response)
      }).catch((error:unknown) => {
        reject(error)
      })
    })
  },
  // // get user info
  getInfo({ commit }) {
    const { getInfo } = api.user
    return new Promise((resolve, reject) => {
      getInfo({ token: getToken() }).then((response:any) => {
        const { data } = response
        if (!data) {
          return reject('Verification failed, please Login again.')
        }
        const { name } = data
        commit('SET_NAME', name)
        resolve(data)
      }).catch((error:unknown) => {
        reject(error)
      })
    })
  },
  Gamelist({ commit }) {
    const { gamelist } = api.user
    return new Promise((resolve, reject) => {
      gamelist().then((response:any) => {
        const { data } = response
        commit('SET_Gamelist', data)
        resolve(data)
      }).catch((error:unknown) => {
        reject(error)
      })
    })
  },
  // // user logout
  logout({ commit }) {
    return new Promise((resolve) => {
      removeToken() // must remove  token  first
      // resetRouter()
      commit('RESET_STATE')
      resolve('1')
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve('1')
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
