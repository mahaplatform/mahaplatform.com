const path = require('path')
const events = require('events')

events.EventEmitter.defaultMaxListeners = 0

const env = require(path.resolve('maha.js'))

Object.keys(env.config).map(key => {
  process.env[key.toUpperCase()] = env.config[key]
})

process.env.APPS = Object.keys(env.apps)

const server = require(path.resolve('dist','apps','maha','src','core','entities','server')).default

server()
