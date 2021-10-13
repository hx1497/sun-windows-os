import Mock from 'mockjs'

Mock.mock(/login/,{
  code: 0,
  msg: 'success',
  data: {
    userId: '@integer',
    username: '你是谁',
    token: '@string(30)'
  }
})