import '../web/maha/core/services/environment'
import inspector from 'inspector'
import register from 'babel-register'
import path from 'path'

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
      'alias': {
        ...process.env.APPS.split(',').reduce((aliases, app) => ({
          ...aliases,
          [app]: path.resolve('src','web',app,'server.js')
        }), {})
      }
    }]
  ],
  sourceMaps: 'inline'
})

inspector.open()

require(path.join('..','web','socket'))

require(path.join('..','web','server'))

require(path.join('..','web','worker'))

require(path.join('..','web','cron'))
