const Router = require('koa-router') // koa 路由中间件
const router = new Router() // 实例化路由

const { successReturn, errorReturn, getDataObjFromBody } = require('../util')
const { honorQueryKeys } = require('../constant')

const mysql = require('../mysql')

// router.get('/', async (ctx, next) => {
//   ctx.response.body = { 
//     a: 1
//   }
// })

// router.post('/login', async (ctx, next) => {

// })

router.get('/honor', async (ctx, next) => {
  try {
    const res = await mysql.selectKeysWithRules('honor', honorQueryKeys, { valid: 1 })

    successReturn(ctx, res)
  } catch (e) {
    errorReturn(ctx, e)
  }
})

router.post('/honor', async (ctx, next) => {
  const { body } = ctx.request
  const updateObj = getDataObjFromBody(body)

  try {
    const res = await mysql.insertData('honor', updateObj)

    successReturn(ctx, res)
  } catch (e) {
    errorReturn(ctx, e)
  }
})

router.post('/honor/:id', async (ctx, next) => {
  const { body, params } = ctx.request
  const { id } = params
  const updateObj = getDataObjFromBody(body)

  try {
    const res = await mysql.updateDataById('honor', 
      updateObj,
      id
    )

    const _res = await mysql.selectKeysWithRules('honor', honorQueryKeys, { id, valid: 1 })

    successReturn(ctx, _res[0])
  } catch (e) {
    errorReturn(ctx, e)
  }
})

router.delete('/honor/:id', async (ctx, next) => {
  const { params } = ctx.request
  const { id } = params
  try {
    const res = await mysql.updateDataById('honor', { valid: 0 }, id)

    successReturn(ctx, res)
  } catch (e) {
    errorReturn(ctx, e)
  }
})

module.exports = router
