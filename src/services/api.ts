/**
 * @author ff
 * @date 2021/6/9
 * @Description:api接口管理
 * @update by:
 */

import myserver from '@/services/getRequest'

const user = {
  login: {
    url: 'user/login',
    type: 'post'
  },
  getInfo: {
    url: 'user/info',
    type: 'post'
  },
  gamelist: {
    url: 'user/gamelist',
    type: 'get'
  },
  getPageMenu: {
    url: 'user/menu',
    type: 'post'
  }
}

myserver.postData('user', user)
export default myserver
