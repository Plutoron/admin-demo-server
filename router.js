const Router = require('koa-router') // koa 路由中间件
const router = new Router() // 实例化路由

const { test } = require('./util')

// // 表单
// router.get('/', async (ctx, next) => {

// })

// router.post('/login', async (ctx, next) => {

// })

router.post('/test', async (ctx, next) => {
  console.log(ctx.request.body);

  const { username, webhook_url, text, keyword} = ctx.request.body

  try {
    const res = await robot.exchange(question)

    console.log(res)
  } catch (e) {

  }
})

module.exports = router
