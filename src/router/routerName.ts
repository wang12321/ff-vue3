
type routerNameType = {
  name: string,
  icon: string,
  index: number,
  permission: number[],
  newTime: string,
  children?:routerNameType
}
// 自动获取ConfigurationModule配置
const files = require.context('./ConfigurationModule', false, /\.ts$/)
let tmp:routerNameType = {} as routerNameType
files.keys().forEach(key => {
  tmp = files(key).default
})
export const routerNameP = {
  ...tmp
}
