import { route } from 'quasar/wrappers'
import { createRouter, createMemoryHistory, createWebHistory, createWebHashHistory } from 'vue-router'
import routes from './routes'
import {getToken} from 'src/utils/auth'
import useUserStore from 'src/stores/modules/user'

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */
const whiteList=["/login"]

const createHistory = process.env.SERVER
  ? createMemoryHistory
  : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory)

const router = createRouter({
  scrollBehavior: () => ({ left: 0, top: 0 }),
  routes,

  // Leave this as is and make changes in quasar.conf.js instead!
  // quasar.conf.js -> build -> vueRouterMode
  // quasar.conf.js -> build -> publicPath
  history: createHistory(process.env.VUE_ROUTER_BASE)
})

router.beforeEach( (to,from,next)=>{
  if (getToken()) {
    to.meta.title && useSettingsStore().setTitle(to.meta.title)
    /* has token*/
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      if (useUserStore().roles.length === 0) {
        console.log('index')
        // Determine whether the current user has finished pulling user_info information
        useUserStore().getInfo().then(() => {
       
          next({ ...to, replace: true }) // hack method to ensure addRoutes is completed
        }).catch(err => {
          console.log('errrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr')
          useUserStore().logOut().then(() => {
            next({ path: '/' })
          })
        })
      } else {
        next()
      }
    }
  } else {
    // No token
    if (whiteList.indexOf(to.path) !== -1) {
      // In the whitelist without login, enter directly
      next()
    } else {
      next(`/login?redirect=${to.fullPath}`) // Otherwise all redirect to login page
      NProgress.done()
    }
  }
})
export default router;

// export default route(function (/* { store, ssrContext } */) {
//   return Router
// })
//
//
// export r
