const dotenv = require('dotenv')
const events = require('events')
const path = require('path')
const fs = require('fs')

events.EventEmitter.defaultMaxListeners = 0

const root1 = path.resolve(__dirname,'..','..','..')
const root2 = path.resolve(__dirname,'..','..')

const paths = [
  path.join(root1,`.env.${process.env.NODE_ENV}`),
  path.join(root2,`.env.${process.env.NODE_ENV}`),
  path.join(root1,'.env'),
  path.join(root2,'.env')
]

const envPath = paths.find(path => fs.existsSync(path))

if(process.env.NODE_ENV !== 'test' && envPath) dotenv.load({ path: envPath })
