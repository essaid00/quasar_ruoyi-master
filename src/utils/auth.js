//import {Cookies } from 'quasar'
import { LocalStorage, SessionStorage } from 'quasar'
const TokenKey = 'Admin-Token'

export function getToken() {
  console.log('getToken f')
  return LocalStorage.getItem(TokenKey)
}

export function setToken(token) {
  console.log('setToken f')
  return LocalStorage.set(TokenKey, token)
  //return Cookies.set(TokenKey, token)
}

export function removeToken() {
  console.log('removeToken f')
  return LocalStorage.clear(TokenKey)
  //return Cookies.remove(TokenKey)
}
