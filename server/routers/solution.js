const Router = require('koa-router') // koa 路由中间件
const router = new Router() // 实例化路由

const { successReturn, errorReturn, getDataObjFromBody } = require('../util')
const { solutionQueryKeys } = require('../constant')

const mysql = require('../mysql')

// router.get('/', async (ctx, next) => {
//   ctx.response.body = { 
//     a: 1
//   }
// })

// router.post('/login', async (ctx, next) => {

// })

router.get('/solution/home', async (ctx, next) => {
  try {
    const res = await mysql.findValidDataByPage('solution', solutionQueryKeys, 0, 4)

    successReturn(ctx, res)
  } catch (e) {
    errorReturn(ctx, e)
  }
})

router.get('/solution/:type', async (ctx, next) => {
  const { params } = ctx.request
  const { type } = params

  try {
    const res = await mysql.selectKeysWithRules('solution', solutionQueryKeys, { type, valid: 1 })

    console.log(res)

    successReturn(ctx, res)
  } catch (e) {
    errorReturn(ctx, e)
  }
})

router.post('/solution/:id', async (ctx, next) => {
  const { body, params } = ctx.request
  const { id } = params
  const updateObj = getDataObjFromBody(body)

  try {
    const res = await mysql.updateDataById('solution', 
      updateObj,
      id
    )

    const _res = await mysql.selectKeysWithRules('solution', solutionQueryKeys, { id, valid: 1 })

    successReturn(ctx, _res[0])
  } catch (e) {
    errorReturn(ctx, e)
  }
})

router.post('/solution', async (ctx, next) => {
  const { body } = ctx.request
  const updateObj = getDataObjFromBody(body)

  try {
    const res = await mysql.insertData('solution', updateObj)

    successReturn(ctx, res)
  } catch (e) {
    errorReturn(ctx, e)
  }
})

router.delete('/solution/:id', async (ctx, next) => {
  const { params } = ctx.request
  const { id } = params
  try {
    const res = await mysql.updateDataById('solution', { valid: 0 }, id)

    successReturn(ctx, res)
  } catch (e) {
    errorReturn(ctx, e)
  }
})

module.exports = router
