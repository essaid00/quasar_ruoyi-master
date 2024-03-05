import {loadProducts} from '../../api/products.js'
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
        console.log('a')
        return new Promise((resolve, reject) => {
          loadProducts().then(res => {
            console.log('resolve')
           
            resolve()
          }).catch(error => {
            reject(error)
          })
        })
      },
   
    }
  })

export default useProductstore
