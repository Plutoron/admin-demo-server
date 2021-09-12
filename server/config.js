
const SERVER_URL = {
  development: 'http://localhost:3031/static/',
  production: 'http://47.104.11.142/server/static/'
}

const database = {
  development: {
    DATABASE: 'test',
    USERNAME: 'root',
    PASSWORD: '123456',
    PORT: '3306',
    HOST: '127.0.0.1'
  },
  production: {
    DATABASE: 'company',
    USERNAME: 'root',
    PASSWORD: '123456',
    PORT: '3306',
    HOST: '127.0.0.1'
  }
}

module.exports = {
  SERVER_URL,
  database
}