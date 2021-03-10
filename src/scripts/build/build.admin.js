import '@core/services/environment'
import adminConfig from './webpack.admin.config'
import log from '@core/utils/log'
import webpack from 'webpack'

const buildAdmin = async (environment) => {
  log('info', 'admin', 'Compiling...')
  await new Promise((resolve, reject) => webpack(adminConfig).run((err, stats) => {
    if(err) reject(err)
    const info = stats.toJson()
    if(stats.hasErrors()) console.error(info.errors)
    resolve(stats)
  }))
  log('info', 'admin', 'Compiled successfully.')
}

export default buildAdmin
