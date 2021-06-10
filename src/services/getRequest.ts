/**
 * @author ff
 * @date 2021/6/9
 * @Description:配置生成api接口
 * @update by:
 */
import server from './server'
import apiURLP from './apiURL'
import { getIsUseMasterApiKey } from '@/utils/auth'
interface IapiURL {
  [key: string]: any
}
const apiURL = (<IapiURL>apiURLP)

function Myserver(this: any) {
  this.server = server
}
Myserver.prototype.postData = function(name:string, urlObj:any) {
  // 配置不同模块api
  let accounts:any
  // 当测试环境时,可以切换为正式环境
  if (getIsUseMasterApiKey() === 'true' && process.env.NODE_ENV && process.env.NODE_ENV.indexOf('development') > -1) {
    accounts = apiURL['production'][name]
  } else {
    accounts = apiURL['production'][name]
  }
  this[name] = {}
  Object.keys(urlObj).forEach((apiName) => {
    // eslint-disable-next-line max-len
    this[name][apiName] = this.sendMes.bind(this, name, apiName, `${accounts}${urlObj[apiName].url}`, urlObj[apiName].type)
  })
}
Myserver.prototype.sendMes = function(modeleName:string, apiName:string, url:string, type:string, dataP:any, config:any) {
  config = config || {}
  type = type || 'get'
  let data = dataP || {}
  if (type === 'get' && typeof dataP === 'object') {
    data = { params: dataP }
  }
  if (type === 'delete' && typeof dataP !== 'object') {
    data = { params: { id: dataP }}
  }
  // 处理效果
  const before = function(res:unknown) {
    return res
  }
  // 处理数据
  const defaultFn = function(res:unknown) {
    return res
  }
  const error = function(err:unknown) {
    return err
  }
  const success = config.success || defaultFn

  if (type === 'get' && typeof data !== 'object') {
    return this.server[type](`${url}/${data}`).then(before).then(success).catch(error)
  } else if (type === 'put' && typeof data === 'object') {
    return this.server[type](`${url}/${data.id}`, data).then(before).then(success).catch(error)
  }
  return this.server[type](url, data).then(before).then(success).catch(error)
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export default new Myserver()
