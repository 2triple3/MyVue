import axios from '../axios'

/* 
 * 系统登录模块
 */

// // 登录
// export const login = data => {
//     return axios({
//         url: 'login',
//         method: 'post',
//         data
//     })
// }

// // 登出
// export const logout = () => {
//     return axios({
//         url: 'logout',
//         method: 'get'
//     })
// }

export function loginByUsername(username, password) {
  const data = {
    username,
    password
  }
  return axios({
    url: '/login/login',
    method: 'post',
    data
  })
}

export function logout() {
  return axios({
    url: '/login/logout',
    method: 'post'
  })
}

export function getUserInfo(token) {
  return axios({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}
