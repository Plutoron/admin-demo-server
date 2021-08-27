const Router = require('koa-router') // koa 路由中间件
const router = new Router() // 实例化路由

const { generatorAnswerMarkdownStr } = require('./util')

// // 表单
// router.get('/', async (ctx, next) => {

// })

// router.post('/login', async (ctx, next) => {

// })

router.post('/test', async (ctx, next) => {
  console.log(ctx.request.body);

  const { username, webhook_url, text, keyword} = ctx.request.body

  const question = text.slice(keyword.length)

  const { robot } = ctx.app

  robot.webhook = webhook_url
  robot.username = username

  console.log('question', question)

  if (!robot.sessionKey) {
    ctx.response.body = {
      "text": `@${username} 请稍后再试`
    }
    robot.init()
    return
  }

  if (!question) {
    ctx.response.body = {
      "text": `@${username} 您是否想问以下问题`,
      attachments: [{
        text: robot.defaultAsk
      }]
    }
    return
  }

  try {
    const res = await robot.exchange(question)

    const { answerRespList } = res

    if (!answerRespList || !answerRespList.length) {
      robot.send({
        "text": `@${username} 未找到相关文档`
      })
      return
    }

    const attachments = answerRespList.map(v => {
      return {
        text: generatorAnswerMarkdownStr(v)
      }
    })
  
    robot.send({
      "text": `@${username} 找到以下答案`,
      "attachments": attachments
    })
  } catch (e) {
    robot.send({
      "text": `@${username} 系统错误`,
      "attachments": [{
        text: JSON.stringify(e)
      }]
    })
  }
})

module.exports = router
