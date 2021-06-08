
const TokenKey = 'vue_admin_zonst_token'

export function getToken() {
  return localStorage.getItem(TokenKey)
}

export function setToken(token:string) {
  return localStorage.setItem(TokenKey, token)
}

export function removeToken() {
  return localStorage.setItem(TokenKey, '')
}
const SidebarStatus = 'SidebarStatus'
export function getSidebarStatus() {
  return localStorage.getItem(SidebarStatus)
}

export function setSidebarStatus(sidebarStatus:string) {
  return localStorage.setItem(SidebarStatus, sidebarStatus)
}

export function removeSidebarStatus() {
  return localStorage.setItem(SidebarStatus, '')
}
const PermissionKey = 'PermissionKey'

export function getPermission() {
  return localStorage.getItem(PermissionKey)
}

export function setPermission(Permission:string) {
  return localStorage.setItem(PermissionKey, Permission)
}

export function removePermission() {
  return localStorage.setItem(PermissionKey, '')
}

const preSetLocalStorageKey = 'preSetLocalStorage'
export function setPreSetLocalStorage(data:string) {
  return localStorage.setItem(preSetLocalStorageKey, data)
}
export function getPreSetLocalStorage() {
  return localStorage.getItem(preSetLocalStorageKey)
}

// 切换环境
const isUseMasterApiKey = 'isUseMasterApiKey'
export function setIsUseMasterApiKey(data:string) {
  return localStorage.setItem(isUseMasterApiKey, data)
}
export function getIsUseMasterApiKey() {
  return localStorage.getItem(isUseMasterApiKey)
}

const isGameIdKey = 'isGameIdKey'
export function setIsGameIdKey(data:string) {
  return localStorage.setItem(isGameIdKey, data)
}
export function getIsGameIdKey() {
  return localStorage.getItem(isGameIdKey)
}
