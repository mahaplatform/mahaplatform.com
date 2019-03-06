const dotenv = require('dotenv')
const events = require('events')
const path = require('path')

events.EventEmitter.defaultMaxListeners = 0

dotenv.load({ path: path.resolve('.env') })

process.env.ROOT = path.resolve()
