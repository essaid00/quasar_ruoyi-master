import request from 'src/utils/request'

// 登录方法
export function loadcategories() {
let data={}
  return request({
    url: 'api/pos/category/list',
    method: 'get',
    data: data
  })}
