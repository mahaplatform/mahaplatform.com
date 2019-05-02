import '../web/maha/core/services/environment'
import { migrateUp, migrateDown, reset } from '../web/maha/core/tasks/db/db'
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

const processor = async () => {

  const args = process.argv.slice(2)

  if(args[0] === 'migrate:rollback') return await migrateDown()

  if(args[0] === 'migrate:latest') return await migrateUp()

  if(args[0] === 'reset') return await reset()

  throw new Error('invalid command')

}

processor().then(process.exit)
