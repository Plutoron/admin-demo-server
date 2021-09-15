const Koa = require('koa')
const path = require('path')
const koaBody = require('koa-body')
const staticResource = require('koa-static')
const Koa_Session = require('koa-session');

const session_signed_key = ["shanghaichengshi"];  // 这个是配合signed属性的签名key
const session_config = {
  key: 'shcxly', /**  cookie的key。 (默认是 koa:sess) */
  maxAge: 30 * 60 * 1000,   /**  session 过期时间，以毫秒ms为单位计算 。*/
  autoCommit: true, /** 自动提交到响应头。(默认是 true) */
  overwrite: true, /** 是否允许重写 。(默认是 true) */
  httpOnly: false, /** 是否设置HttpOnly，如果在Cookie中设置了"HttpOnly"属性，那么通过程序(JS脚本、Applet等)将无法读取到Cookie信息，这样能有效的防止XSS攻击。  (默认 true) */
  signed: true, /** 是否签名。(默认是 true) */
  rolling: true, /** 是否每次响应时刷新Session的有效期。(默认是 false) */
  renew: false, /** 是否在Session快过期时刷新Session的有效期。(默认是 false) */
};

const app = new Koa()
const session = Koa_Session(session_config, app)
app.keys = session_signed_key;

const upload = require('./routers/upload')

const login = require('./routers/login')

const company = require('./routers/company')
const honor = require('./routers/honor')
const solution = require('./routers/solution')
const hire = require('./routers/hire')
const culture = require('./routers/culture')
const news = require('./routers/news')
const banner = require('./routers/banner')
const user = require('./routers/user')

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

app.use(session);

app.use(login.routes())

app.use(async (ctx, next) => {
  // 对/favicon.ico网站图标请求忽略
  if (ctx.path === '/favicon.ico') return;

  if (!ctx.path.startsWith('/admin') && !ctx.session.userInfo) {  // 如果登录属性为undefined或者false，对应未登录和登录失败
    ctx.body = {
      code: 0,
      message: '请登录',
      success: false
    }
    return;
  }

  await next()
})

app.use(company.routes())
app.use(honor.routes())
app.use(solution.routes())
app.use(hire.routes())
app.use(culture.routes())
app.use(news.routes())
app.use(banner.routes())
app.use(user.routes())

app.listen(PORT, () => {
  console.log('This server is running at http://localhost:' + PORT)
})
