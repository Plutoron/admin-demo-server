const Router = require('koa-router') // koa 路由中间件
const router = new Router() // 实例化路由

const { successReturn, errorReturn, getDataObjFromBody } = require('../util')
const { aboutQueryKeys } = require('../constant')

const mysql = require('../mysql')

// // 表单
// router.get('/', async (ctx, next) => {
//   ctx.response.body = { 
//     a: 1
//   }
// })

// router.post('/login', async (ctx, next) => {

// })

router.get('/company/detail', async (ctx, next) => {
  try {
    const res = await mysql.selectKeysById('about', [aboutQueryKeys], 1)

    successReturn(ctx, res[0] || {})
  } catch (e) {
    errorReturn(ctx, e)
  }
})

router.post('/company/detail', async (ctx, next) => {
  const { body } = ctx.request
  const updateObj = getDataObjFromBody(body)

  try {
    const res = await mysql.updateDataById('about', 
      updateObj,
      1
    )

    const _res = await mysql.selectKeysById('about', aboutQueryKeys, 1)

    if (_res.length === 0) {
      const __res = await mysql.insertData('about', updateObj)
      console.log(__res)
      successReturn(ctx, __res)
    } else {
      successReturn(ctx, _res[0])
    }   
  } catch (e) {
    errorReturn(ctx, e)
  }
})

module.exports = router
