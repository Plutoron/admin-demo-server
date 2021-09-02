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

router.get('/solution/:type', async (ctx, next) => {
  const { params } = ctx.request
  const { type } = params

  try {
    const res = await mysql.selectKeysWithRule('solution', solutionQueryKeys, 'type', type)

    console.log(res)

    successReturn(ctx, res)
  } catch (e) {
    errorReturn(ctx, e)
  }
})

router.post('/solution/add', async (ctx, next) => {
  const { body } = ctx.request
  const updateObj = getDataObjFromBody(body)

  try {
    const res = await mysql.insertData('solution', updateObj)

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

    const _res = await mysql.selectKeysById('solution', solutionQueryKeys, id)

    successReturn(ctx, _res[0])
  } catch (e) {
    errorReturn(ctx, e)
  }
})

router.delete('/solution/:id', async (ctx, next) => {
  const { params } = ctx.request
  const { id } = params
  try {
    const res = await mysql.deleteDataById('solution', id)

    successReturn(ctx, res)
  } catch (e) {
    errorReturn(ctx, e)
  }
})

module.exports = router
