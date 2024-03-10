import {loadcategories} from '../../api/pos/categories.js'
import {defineStore} from 'pinia';

export const usecategoriestore = defineStore(
  'category',
  {
    state: () => ({
      categories: []
    }),
    getters: {
      Count: (state) => categories.length,
    },
    actions: {
      getcategories() {
        console.log("essaid bonjour ")
        const username = "userInfo.username"
        const password = "userInfo.password"
        const code = "userInfo.code"
        const uuid = "userInfo.uuid"

        return new Promise((resolve, reject) => {
          loadcategories().then(res => {
            console.log('gagagagag')
            console.log(res)
            resolve(res)
          }).catch(error => {

            reject(error)
          })
        })
      },

    }
  })

export default usecategoriestore
