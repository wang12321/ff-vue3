export default {
  /**
     * key 文件名
     * name 左侧菜单中文名
     * icon 左侧菜单图标
     * index 左侧菜单排序
     * permission 左侧菜单权限
     * newTime 左侧菜单New!展示到期时间
     * isID: 动态id 可以配置任意参数
     */
  system: {
    name: '系统管理',
    icon: 'form',
    index: 99,
    permission: [1, 2, 3],
    newTime: '2021-07-20',
    children: {
      user: {
        name: '用户管理',
        icon: 'form',
        index: 1,
        permission: [1, 2, 3],
        newTime: '2021-07-20'
      },
      role: {
        name: '角色管理',
        icon: 'form',
        index: 2,
        permission: [1, 2, 3],
        newTime: '2021-07-20'
      }
    }
  }
}
