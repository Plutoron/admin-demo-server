const Koa = require('koa')
const path = require('path')
const koaBody = require('koa-body')
const staticResource = require('koa-static')

const app = new Koa()

const upload = require('./routers/upload')

const company = require('./routers/company')
const honor = require('./routers/honor')
const solution = require('./routers/solution')
const hire = require('./routers/hire')
const culture = require('./routers/culture')
const news = require('./routers/news')
const banner = require('./routers/banner')

const { NODE_ENV = 'development', PORT = 3000 } = process.env

app.use(koaBody({
  // 支持文件格式
  multipart: true,
  formidable: {
    // 上传目录
    uploadDir: path.join(__dirname, '../public/uploads'),
    // 保留文件扩展名
    keepExtensions: true,
  }
}));

app.use(staticResource(path.join(__dirname, '../public')))

app.use(upload.routes())

app.use(company.routes())
app.use(honor.routes())
app.use(solution.routes())
app.use(hire.routes())
app.use(culture.routes())
app.use(news.routes())
app.use(banner.routes())

app.listen(PORT, () => {
  console.log('This server is running at http://localhost:' + PORT)
})
