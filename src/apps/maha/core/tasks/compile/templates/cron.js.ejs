const path = require('path')
const events = require('events')

events.EventEmitter.defaultMaxListeners = 0

const env = require(path.resolve('maha.js'))

Object.keys(env.config).map(key => {
  process.env[key.toUpperCase()] = env.config[key]
})

process.env.APPS = Object.keys(env.apps)

const cron = require(path.resolve('dist','apps','maha','src','core','entities','cron')).default

cron()
