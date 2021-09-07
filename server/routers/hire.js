const Router = require('koa-router') // koa 路由中间件
const router = new Router() // 实例化路由

const { successReturn, errorReturn, getDataObjFromBody } = require('../util')

const mysql = require('../mysql')

router.get('/hire', async (ctx, next) => {
  try {
    const res = await mysql.selectKeysById('hire', ['html'], 1)

    successReturn(ctx, res[0])
  } catch (e) {
    errorReturn(ctx, e)
  }
})

router.post('/hire', async (ctx, next) => {
  const { body } = ctx.request
  const updateObj = getDataObjFromBody(body)

  try {
    const res = await mysql.updateDataById('hire', 
      updateObj,
      1
    )

    const _res = await mysql.selectKeysById('hire', ['html'], 1)

    console.log(_res)

    if (_res.length === 0) {
      const __res = await mysql.insertData('hire', updateObj)
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
