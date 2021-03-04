import desktopConfig from './webpack.desktop.config'
import mobileConfig from './webpack.mobile.config'
import log from '@core/utils/log'
import chokidar from 'chokidar'
import webpack from 'webpack'
import path from 'path'
import _ from 'lodash'

const watch = async (module, watchDir, config) => {
  let compiling = false
  chokidar.watch(watchDir).on('all', (event, path) => {
    if(compiling) return
    if(!_.includes(['add','change'], event)) return
    compiling = true
    log('info', module, 'Compiling...')
    webpack(config).run((err, stats) => {
      compiling = false
      if(err) return log('error', module, err)
      const info = stats.toJson()
      if(stats.hasErrors()) return log('error', module, info.errors)
      log('info', module, 'Compiled successfully.')
    })
  })
}

const watchDesktop = async () => {
  const watchDir = path.resolve('src','desktop','app')
  await watch('desktop', watchDir, desktopConfig)
}

const watchMobile = async () => {
  const watchDir = path.resolve('src','mobile','app')
  await watch('mobile', watchDir, mobileConfig)
}

const watchPlatforms = async (platform) => {
  if(platform === 'desktop') await watchDesktop()
  if(platform === 'mobile') await watchMobile()
}

export default watchPlatforms
