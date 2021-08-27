const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const app = new Koa()
const router = require('./router')

app.use(bodyParser())

const { NODE_ENV = 'development', PORT = 3000 } = process.env

app.use(router.routes());

app.listen(PORT, () => {
  console.log('This server is running at http://localhost:' + PORT)
})