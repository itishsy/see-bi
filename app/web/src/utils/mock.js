import axios from 'axios'
// import Qs from 'qs'
const Mock = require('mockjs')
// const Random = Mock.Random

// const low = require('lowdb')
// const FileSync = require('lowdb/adapters/FileSync')

// 统一配置
let api = axios.create({
  baseURL: 'http://127.0.0.1:9527/',
  responseType: 'json',
  validateStatus (status) {
    // 200 外的状态码都认定为失败
    return status === 200
  }
})

export const flag = true

async function login (params) {
  const username = params['username']
  const password = params['password']
  var resData = {'data': {}, 'message': '认证成功'}
  let user = await get('user?username=' + username + '&password=' + password).then((res) => {
    return res.data
  })
  if (user.length === 0) {
    resData.message = '认证失败'
  } else {
    resData.data.user = user[0]
    let config = await get('userconfig?userId=' + user[0].userId).then((res) => { return res.data })
    resData.data.config = config[0]
    resData.data.permissions = []
    await get('user.roles?userId=' + user[0].userId).then((res) => {
      let _roles = res.data
      let roles = []
      for (let index = 0; index < _roles.length; index++) {
        roles.push(_roles[index].role)
      }
      resData.data.roles = roles
    })
    resData.data.exipreTime = '20190826152636'
    let token = Mock.mock({random: '@string("lower", 100)'})
    resData.data.token = token.random
  }
  return get('index').then((res) => {
    res.data = resData
    return res
  })
}

export function post (url, params) {
  if (url === 'login') {
    return login(params)
  } else {
    return api.post(url, params)
  }
}

export function get (url, params) {
  if ((url + '').indexOf('logout/') > -1) {
    return get('index')
  }

  let _params
  if (Object.is(params, undefined)) {
    _params = ''
  } else {
    _params = '?'
    for (let key in params) {
      if (params.hasOwnProperty(key) && params[key] !== null) {
        _params += `${key}=${params[key]}&`
      }
    }
    _params = _params.substr(0, _params.length - 1)
  }
  return api.get(`${url}${_params}`).then()
}

export function put (url, params) {
  let _params
  if (Object.is(params, undefined)) {
    _params = ''
  } else {
    _params = '?'
    for (let key in params) {
      if (params.hasOwnProperty(key) && params[key] !== null) {
        _params += `${key}=${params[key]}&`
      }
    }
    _params = _params.substr(0, _params.length - 1)
  }
  return api.put(`${url}${_params}`, params)
  // return api.put(url, params)
}
