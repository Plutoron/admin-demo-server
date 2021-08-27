const request = require('request')

class Robot {
  constructor (options) {
    this.defaultConfig = {
      env: 'dev',
      username: "suyunlong",
      ...options
    }

    this.service = {
      development: {
        host: '10.86.45.14',
        port: 8048,
        prefix: '/bot',
        path: 'http://10.86.45.14:8048/bot/',
        token: 'UNSyPUyOMeF380AJYSygfA=='
      },
      production: {
        host: '100.69.239.97',
        port: 30167,
        prefix: '/bot',
        path: 'http://100.69.239.97:30167/bot/',
        token: 'fdvQVbliZgJxEXIaDOu2Gw=='
      },
      botKey: 'a321b1ebec954e93ae60d79123b45b96'
    }
    
    const { env, username } = this.defaultConfig

    this.env = env
    this.webhook = ''
    this.username = username

    this.sessionKey = '' // 会话
    this.defaultAsk = ''

    const _options = this.service[env]

    this.defaultHeaders = {
      'Content-Type': 'application/json',
      '__real_user_id': this.username,
      '__platform_token': _options.token,
    }

    this.init()
  }

  init () {
    const _options = this.service[this.env]

    const path = `init/${this.service.botKey}`

    request({
      url: `${_options.path}${path}`, 
      method: 'GET',
      json: true,
      headers: {
        ...this.defaultHeaders
      },
    }, (err, response, body) => {
      console.log(err, body)
      if (!err && response.statusCode == 200) { 
        const { data: { sessionKey, botFaqRespMap: { head } } } = body
        this.sessionKey = sessionKey
        console.log('seesionKey', sessionKey)
        this.defaultAsk = this.generateMarkdownStr(head.map(v => v.question))
      }
    })
  }

  exchange (content) {
    const _options = this.service[this.env]

    const path = `/dialogue/exchange`

    const body = JSON.stringify({
      botKey: this.service.botKey,
      sessionKey: this.sessionKey,
      contentType: 'TEXT',
      content
    })

    return new Promise((resolve, reject) => {
      request({
        url: `${_options.path}${path}`,
        method: "POST",
        json: {
          botKey: this.service.botKey,
          sessionKey: this.sessionKey,
          contentType: 'TEXT',
          content
        },
        headers: {
          ...this.defaultHeaders
        },
        body
      }, function(error, response, body) {
        if (error) {
          reject(error)
        }

        if (!error && response.statusCode == 200) { 
          const { success, data, metaInfo } = body 
          if (!success) {
            reject(metaInfo)
          }

          resolve(data)
        } else {
          reject(response.statusCode)
        }
      })
    })
  }

  send (params) {
    request({
      url: this.webhook,
      method: "POST",
      json: {
        ...params
      },
      headers: {
        ...this.defaultHeaders
      },
    }, function(error, response, body) {
      console.log('exchange', body)
    })
  }

  generatorAnswerMarkdownStr (v) {
    let { resourceTitle, resourceUrl, resourceShowType, sonAnswerRespList } = v 
  
    let result = `[${resourceTitle}](${resourceUrl})`
    let childStr = ''
  
    if (sonAnswerRespList && sonAnswerRespList.length) {
      childStr = sonAnswerRespList.reduce((pre, v) => {
        let { resourceTitle, resourceUrl, resourceShowType, sonAnswerRespList } = v 
        pre = `${pre}
    [${resourceTitle}](${resourceUrl})`
  
        return pre
      }, ``)
    }
  
    return `${result}${childStr}`.trim()
  }
  
  generateMarkdownStr (list) {
    return list.reduce((pre, v) => {
      pre = `${pre}
  ${v}`
  
      return pre
    }, ``).trim()
  }
}

module.exports = Robot