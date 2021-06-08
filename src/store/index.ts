import { createStore } from 'vuex'
const modulesFiles = require.context('./modules', true, /\.ts$/)
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  // set './app.ts' => 'app'
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath)
  interface Imodules {
    [key: string]: any
  }
  (<Imodules>modules)[moduleName] = value.default
  return modules
}, {})

export default createStore({
  modules
})

// import { InjectionKey } from 'vue'
// import { ActionTree, createStore, GetterTree, MutationTree, Store, StoreOptions } from 'vuex'
//
// // Declare state struct
// declare interface globalStore {
//   fakeName: string;
//   sidebar: {
//     opened: boolean,
//     withoutAnimation: boolean
//   }
// }
//
// // Define All params of StoreOptions
// const globalStoreState: globalStore = {
//   fakeName: 'Fake Name',
//   sidebar: {
//     opened: true,
//     withoutAnimation: false
//   }
// }
//
// const globalStoreGetters: GetterTree<globalStore, any> = {
//   fakeName: (state) => state.fakeName
// }
//
// const globalStoreMutations: MutationTree<globalStore> = {
//   UPDATE_FAKE_NAME(state, payload) {
//     state.fakeName = payload
//   }
// }
//
// const globalStoreActions: ActionTree<globalStore, any> = {
//   updateFakeName({ commit }, payload) {
//     commit('UPDATE_FAKE_NAME', payload)
//   }
// }
//
// // Define StoreOptions
// const globalStoreOption: StoreOptions<globalStore> = {
//   state: globalStoreState,
//   getters: globalStoreGetters,
//   mutations: globalStoreMutations,
//   actions: globalStoreActions
// }
//
// // Defind current store key
// export const globalStoreKey: InjectionKey<Store<globalStore>> = Symbol()
//
// export default createStore<globalStore>(globalStoreOption)
