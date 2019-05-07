const dotenv = require('dotenv')
const events = require('events')
const path = require('path')
const fs = require('fs')

events.EventEmitter.defaultMaxListeners = 0

const paths = [
  path.resolve(`.env.${process.env.NODE_ENV}`),
  path.resolve('.env')
]

const envPath = paths.find(path => fs.existsSync(path))

if(envPath) dotenv.load({ path: envPath })
