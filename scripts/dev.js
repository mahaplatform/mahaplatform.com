const register = require('babel-register')
const minimist = require('minimist')
const Promise = require('bluebird')
const events = require('events')
const path = require('path')
const _ = require('lodash')

events.EventEmitter.defaultMaxListeners = 0

const env = require(path.resolve('maha.js'))

Object.keys(env.config).map(key => {
  process.env[key.toUpperCase()] = env.config[key]
})

process.env.APPS = Object.keys(env.apps)

register({
  presets: [
    'babel-preset-es2015',
    'babel-preset-react',
    'babel-preset-stage-0'
  ],
  plugins: [
    'transform-promise-to-bluebird',
    ['transform-runtime', { polyfill: false }],
    ['module-resolver', {
      'alias': Object.keys(env.apps).reduce((aliases, app) => {
        aliases[app] = path.resolve('apps',app,'src','server.js')
        return aliases
      }, {})
    }]
  ],
  sourceMaps: 'inline'
})

const argv = minimist(process.argv.slice(2))

const args = argv._.slice(1)

const target = args.length > 0 ? args[0] : 'all'

const entities = ['server','socket','cron','worker']

Promise.mapSeries(entities, async (entity) => {

  if(!_.includes(['all', entity], target)) return

  const runner = require('../apps/maha/src/core/entities/'+entity).default

  await runner()

})
