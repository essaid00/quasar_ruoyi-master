import {defineStore} from 'pinia';
export const usePageStore = defineStore(
  'page',
  {
    state: () => ({
      bottomVal: '',
      workVal: '',
    }),
    getters: {

    },
    actions: {
      // 登录
      setBootomVal(val) {
           this.bottomVal=val;
      },
      // 获取用户信息
      setworkVal(val) {
        this.workVal=val;
      },

    }
  })

export default usePageStore
