import request from 'src/utils/request'

// 登录方法
export function loadProducts() {
let data={}
  return request({
    url: 'api/pos/product/list',
    method: 'get',
    data: data
  })}
