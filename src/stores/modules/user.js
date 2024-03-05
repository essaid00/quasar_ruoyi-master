import {login, logout, getInfo} from '../../api/login'
import {getToken, setToken, removeToken} from '../../utils/auth'
import defAva from 'src/assets/logo/logo.png'
import {defineStore} from 'pinia';
import config from 'src/config/index';
export const useUserStore = defineStore(
  'user',
  {
    state: () => ({
      token: '',
      id: '',
      name: '',
      avatar: '',
      roles: [],
      nickName: '',
      deptId: null,
      deptName: '',
      permissions: []
    }),
    getters: {
      doubleCount: (state) => state.id,
    },
    actions: {
      // 登录
      login(userInfo) {
        const username = userInfo.username
        const password = userInfo.password
        const code = userInfo.code
        const uuid = userInfo.uuid
        return new Promise((resolve, reject) => {
          login(username, password, code, uuid).then(res => {
            console.log('setToken')
            setToken(res.token)
            console.log(res.token)
            this.token = res.token
            resolve()
          }).catch(error => {
            reject(error)
          })
        })
      },
      // 获取用户信息
      getInfo() {
        return new Promise((resolve, reject) => {
          getInfo().then(res => {
            const user = res.user
            const avatar = (user.avatar == "" || user.avatar == null) ? defAva : config.baseUrl + user.avatar;

            if (res.roles && res.roles.length > 0) { // 验证返回的roles是否是一个非空数组
              this.roles = res.roles
              this.permissions = res.permissions
            } else {
              this.roles = ['ROLE_DEFAULT']
            }
            this.id = user.userId
            this.nickName = user.nickName
            this.deptId = user.deptId
            this.deptName = user.dept?.deptName;
            this.name = user.userName
            this.avatar = avatar
            resolve(res)
          }).catch(error => {
            reject(error)
          })
        })
      },
      // 退出系统
      logOut() {
        console.log('logOut f')
        removeToken()
        return new Promise((resolve, reject) => {
          logout(this.token).then(() => {
            console.log('inside logOut f')
            this.token = ''
            this.roles = []
            this.permissions = []
            removeToken()
            resolve()
          }).catch(error => {
            reject(error)
          })
        })
      }
    }
  })

export default useUserStore
