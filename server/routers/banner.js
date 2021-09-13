const Router = require('koa-router') // koa 路由中间件
const router = new Router() // 实例化路由

const { successReturn, errorReturn, getDataObjFromBody } = require('../util')
const { bannerQueryKeys } = require('../constant')

const mysql = require('../mysql')

router.get('/banner', async (ctx, next) => {
  try {
    const res = await mysql.selectKeysWithRules('banner', bannerQueryKeys, { valid: 1 })

    successReturn(ctx, res)
  } catch (e) {
    errorReturn(ctx, e)
  }
})

router.post('/banner', async (ctx, next) => {
  const { body } = ctx.request
  const updateObj = getDataObjFromBody(body)

  try {
    const res = await mysql.insertData('banner', updateObj)

    successReturn(ctx, res)
  } catch (e) {
    errorReturn(ctx, e)
  }
})

router.get('/banner/:id', async (ctx, next) => {
  const { body, params } = ctx.request
  const { id } = params

  try {
    const res = await mysql.selectKeysWithRules('banner', bannerQueryKeys, { id, valid: 1 })

    successReturn(ctx, res[0])
  } catch (e) {
    errorReturn(ctx, e)
  }
})

router.post('/banner/:id', async (ctx, next) => {
  const { body, params } = ctx.request
  const { id } = params
  const updateObj = getDataObjFromBody(body)

  try {
    const res = await mysql.updateDataById('banner', 
      updateObj,
      id
    )

    const _res = await mysql.selectKeysWithRules('banner', bannerQueryKeys, { id, valid: 1 } )

    successReturn(ctx, _res[0])
  } catch (e) {
    errorReturn(ctx, e)
  }
})

router.delete('/banner/:id', async (ctx, next) => {
  const { params } = ctx.request
  const { id } = params
  try {
    const res = await mysql.updateDataById('banner', { valid: 0 }, id)

    successReturn(ctx, res)
  } catch (e) {
    errorReturn(ctx, e)
  }
})

module.exports = router
