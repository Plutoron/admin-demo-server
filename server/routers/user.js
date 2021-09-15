const Router = require('koa-router') // koa 路由中间件
const router = new Router() // 实例化路由

const { successReturn, errorReturn, getDataObjFromBody } = require('../util')
const { userQueryKeys } = require('../constant')

const mysql = require('../mysql')

// router.get('/', async (ctx, next) => {
//   ctx.response.body = { 
//     a: 1
//   }
// })

// router.post('/login', async (ctx, next) => {

// })

router.get('/user', async (ctx, next) => {
  try {
    const res = await mysql.selectKeysWithRules('user', userQueryKeys, { valid: 1 })

    successReturn(ctx, res)
  } catch (e) {
    errorReturn(ctx, e)
  }
})

router.get('/user/info', async (ctx, next) => {
  const { userInfo } = ctx.session
  const { id } = userInfo
  try {
    const res = await mysql.selectKeysWithRules('user', userQueryKeys, { valid: 1, id })

    successReturn(ctx, res[0])
  } catch (e) {
    errorReturn(ctx, e)
  }
})

router.post('/user', async (ctx, next) => {
  const { body } = ctx.request
  const updateObj = getDataObjFromBody(body)

  try {
    const res = await mysql.insertData('user', updateObj)

    successReturn(ctx, res)
  } catch (e) {
    errorReturn(ctx, e)
  }
})

router.post('/user/:id', async (ctx, next) => {
  const { body, params } = ctx.request
  const { id } = params
  const updateObj = getDataObjFromBody(body)

  try {
    const res = await mysql.updateDataById('user', 
      updateObj,
      id
    )

    const _res = await mysql.selectKeysWithRules('user', userQueryKeys, { id, valid: 1 })

    successReturn(ctx, _res[0])
  } catch (e) {
    errorReturn(ctx, e)
  }
})

router.delete('/user/:id', async (ctx, next) => {
  const { params } = ctx.request
  const { id } = params
  try {
    const res = await mysql.updateDataById('user', { valid: 0 }, id)

    successReturn(ctx, res)
  } catch (e) {
    errorReturn(ctx, e)
  }
})

module.exports = router
