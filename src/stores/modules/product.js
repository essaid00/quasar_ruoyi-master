import {loadProducts} from '../../api/pos/products.js'
import {defineStore} from 'pinia';

export const useProductstore = defineStore(
  'product',
  {
    state: () => ({
      products: []
    }),
    getters: {
      Count: (state) => products.length,
    },
    actions: {
      getProducts() {
        const username = "userInfo.username"
        const password = "userInfo.password"
        const code = "userInfo.code"
        const uuid = "userInfo.uuid"

        return new Promise((resolve, reject) => {
          loadProducts().then(res => {
            console.log('vvvvvvvvvvvvvvvvvvv')
            console.log(res)
            resolve(res)
          }).catch(error => {
            console.log('vvvvvvvvvvvvvvvvvvv')
            reject(error)
          })
        })
      },

    }
  })

export default useProductstore
