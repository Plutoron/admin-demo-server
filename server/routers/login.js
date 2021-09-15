const Router = require('koa-router') // koa 路由中间件
const router = new Router() // 实例化路由

const { successReturn, errorReturn, getDataObjFromBody } = require('../util')
const { userQueryKeys } = require('../constant')

const mysql = require('../mysql')

router.post('/login', async (ctx) => {
  const { body } = ctx.request
  const { username, password } = body

  try {
    const res = await mysql.selectKeysWithRules('user', 
      userQueryKeys,
      {
        username,
        password
      }
    )

    if (res[0]) {
    // 保存登录状态，这句代码会在浏览器中生成一个以 "koa:sess" 为 Name 的 cookie
      ctx.session.userInfo = {username, id: res[0].id}
      successReturn(ctx, 1)
    } else {
      successReturn(ctx, 0)
    }
  } catch(e) {
    errorReturn(ctx, e)
  }
})

module.exports = router
