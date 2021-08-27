module.exports = {
  apps : [{
    name   : "app",
    script : "./app.js",
    watch: true,
    env_production: {
      PORT: 3030,
      NODE_ENV: "production"
    },
    env_development: {
      PORT: 3031,
      NODE_ENV: "development"
    },
  }]
}