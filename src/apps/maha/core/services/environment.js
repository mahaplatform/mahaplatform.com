import events from 'events'
import env from 'maha.js'

events.EventEmitter.defaultMaxListeners = 0

Object.keys(env.config).map(key => {
  process.env[key.toUpperCase()] = env.config[key]
})
