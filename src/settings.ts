export default {
  logo: 'component', // 配置logo 只处理了svg的
  title: 'Vue3-Admin-FF', // 配置title
  breadcrumb: true, // 配置面包屑
  IsSearch: true, // 配置菜单搜索
  tagsView: true, // 配置导航标签
  Layout: false, // 配置布局 true 左右结果 false 上下结构
  fixedHeader: true, // 是否固定头部导航栏 如果Layout为false 那么强行设置了true
  sidebarLogo: true, // 是否显示Logo和title
  navbarBackground: '#324151', // 头部导航栏背景颜色
  navbarColor: '#fff', // 头部导航栏字体和图标颜色
  logoBackground: '#324151', // logo字体和图标颜色
  logoColor: '#fff', // logo字体和图标颜色
  isUnifiedLogin: true, // 是否统一登入
  isGameShow: true, // 是否展示游戏平台
  isSwitchEnvironment: process.env.NODE_ENV && process.env.NODE_ENV.indexOf('development') > -1 // 是否切换环境
}
