const Router = require('koa-router') // koa 路由中间件
const router = new Router() // 实例化路由

const { successReturn, errorReturn, getDataObjFromBody } = require('../util')
const { newsQueryKeys } = require('../constant')

const mysql = require('../mysql')

router.get('/news', async (ctx, next) => {
  try {
    const res = await mysql.selectKeysWithRules('news', newsQueryKeys, { valid: 1 })

    successReturn(ctx, res)
  } catch (e) {
    errorReturn(ctx, e)
  }
})

router.get('/news/home', async (ctx, next) => {
  try {
    const res = await mysql.findValidDataByPage('news', newsQueryKeys, 0, 4)

    successReturn(ctx, res)
  } catch (e) {
    errorReturn(ctx, e)
  }
})

router.post('/news', async (ctx, next) => {
  const { body } = ctx.request
  const updateObj = getDataObjFromBody(body)

  try {
    const res = await mysql.insertData('news', updateObj)

    successReturn(ctx, res)
  } catch (e) {
    errorReturn(ctx, e)
  }
})

router.get('/news/:id', async (ctx, next) => {
  const { body, params } = ctx.request
  const { id } = params

  try {
    const res = await mysql.selectKeysWithRules('news', [...newsQueryKeys, 'html'], { id, valid: 1 })

    successReturn(ctx, res[0])
  } catch (e) {
    errorReturn(ctx, e)
  }
})

router.post('/news/:id', async (ctx, next) => {
  const { body, params } = ctx.request
  const { id } = params
  const updateObj = getDataObjFromBody(body)

  try {
    const res = await mysql.updateDataById('news', 
      updateObj,
      id
    )

    const _res = await mysql.selectKeysWithRules('news', [...newsQueryKeys, 'html'], { id, valid: 1 } )

    successReturn(ctx, _res[0])
  } catch (e) {
    errorReturn(ctx, e)
  }
})

router.delete('/news/:id', async (ctx, next) => {
  const { params } = ctx.request
  const { id } = params
  try {
    const res = await mysql.updateDataById('news', { valid: 0 }, id)

    successReturn(ctx, res)
  } catch (e) {
    errorReturn(ctx, e)
  }
})

module.exports = router
