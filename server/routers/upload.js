const path = require('path')
const fs = require('fs')
const Router = require('koa-router') // koa 路由中间件
const router = new Router() // 实例化路由
const { SERVER_URL } = require('../config')
const { successReturn, errorReturn } = require('../util')

router.post('/upload', async (ctx, next) => {
  try {
    const { file } = ctx.request.files; // 获取上传文件

    const { path: _path, name } = file

    const destPath = path.join(__dirname, "../../public/static", name);

    const res = await fs.renameSync(_path, destPath)

    successReturn(ctx, SERVER_URL + name)
  } catch (e) {
    errorReturn(ctx, e)
  }
})

module.exports = router
