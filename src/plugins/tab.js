import router from "src/router/index"
export default {

  pushRouter(route) {
    router.push(route)
  },
  replaceRouter(route) {
    router.replace(route)
  },
  goRouter(val) {
    router.go(val)
  }
}
