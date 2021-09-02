const okResMaker = (data) => ({
  success: true,
  data
})

const errResMaker = (error) => ({
  success: false,
  error
})

const successReturn = (ctx, data) => {
  ctx.response.body = okResMaker(data)
} 

const errorReturn = (ctx, e) => {
  ctx.status = e.status || 500
  ctx.response.body = errResMaker(e.message)
} 

const getDataObjFromBody = (body) => {
  const updateKeys = Object.keys(body)

  const updateObj = updateKeys.reduce((pre, v) => {
    return {
      ...pre,
      [v]: body[v]
    }
  }, {})

  return updateObj
}

module.exports = {
  okResMaker,
  errResMaker,
  successReturn,
  errorReturn,
  getDataObjFromBody
}