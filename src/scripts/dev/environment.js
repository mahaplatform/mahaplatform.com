const path = require('path')
const env = require(path.resolve('maha.js'))

Object.keys(env.config).map(key => {
  process.env[key.toUpperCase()] = env.config[key]
})
