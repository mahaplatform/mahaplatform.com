import '@core/services/environment'
import sdkConfig from './webpack.sdk.config'
import log from '@core/utils/log'
import webpack from 'webpack'

const buildSdk = async () => {
  log('info', 'sdk', 'Compiling...')
  await new Promise((resolve, reject) => webpack(sdkConfig).run((err, stats) => {
    if(err) reject(err)
    const info = stats.toJson()
    if(stats.hasErrors()) console.error(info.errors)
    resolve(stats)
  }))
  log('info', 'sdk', 'Compiled successfully.')
}

export default buildSdk
