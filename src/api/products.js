import request from 'src/utils/request'

// 登录方法
export function loadProducts() {
  const data = {  }
  console.log('B')
  return request({
    url: '/products',
    method: 'get',
    data: data
  })}