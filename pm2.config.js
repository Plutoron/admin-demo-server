module.exports = {
  apps : [{
    name   : "app",
    script : "./server/app.js",
    watch: [
      "server",
      'pm2.config.js',
      'package.json'
    ],
    ignore_watch : ["node_modules", "public"],
    env_production: {
      PORT: 3030,
      NODE_ENV: "production"
    },
    env_development: {
      PORT: 3031,
      NODE_ENV: "development"
    },
    error_file : "./logs/app-err.log",  // 错误日志路径
    out_file   : "./logs/app-out.log",  // 普通日志路径
  }]
}