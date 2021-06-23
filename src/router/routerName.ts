
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
  ...tmp,
  pagination: {
    name: '分页组件',
    icon: 'component',
    index: 1,
    permission: [1, 2, 3],
    newTime: '2021-07-20'
  },
  searchForm: {
    name: '搜索组件',
    icon: 'component',
    index: 1,
    permission: [1, 2, 3],
    newTime: '2021-07-20'
  }
}
