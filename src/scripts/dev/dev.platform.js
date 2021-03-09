import desktopConfig from './webpack.desktop.config'
import mobileConfig from './webpack.mobile.config'
import { spawn } from 'child_process'
import log from '@core/utils/log'
import chokidar from 'chokidar'
import webpack from 'webpack'
import path from 'path'
import _ from 'lodash'

let platform = null

const watch = async (name, watchDir, config) => {
  let compiling = false
  chokidar.watch(watchDir).on('all', (event, path) => {
    if(compiling) return
    if(!_.includes(['add','change'], event)) return
    compiling = true
    log('info', name, 'Compiling...')
    webpack(config).run((err, stats) => {
      compiling = false
      if(err) return log('error', name, err)
      const info = stats.toJson()
      if(stats.hasErrors()) return log('error', name, info.errors)
      log('info', name, 'Compiled successfully.')
      restartPlatform(name)
    })
  })
}

const restartPlatform = _.debounce((name) => {
  log('info', name, `Restarting ${name}`)
  if(platform) platform.kill('sighup')
  platform = start()
}, 500)


const start = () => {
  const proc = spawn('npx', ['electron','./src/platforms/desktop/www'], {
    stdio: ['pipe', 'pipe', 'pipe', 'ipc'],
    env: {
      ...process.env,
      NODE_ENV: 'development'
    }
  })
  proc.stdout.on('data', (data) => {
    process.stdout.write(data)
  })
  proc.stderr.on('data', (data) => {
    process.stdout.write(data)
  })
  return proc
}

export const watchDesktop = async () => {
  const watchDir = path.resolve('src','platforms','desktop','app')
  await watch('desktop', watchDir, desktopConfig)
}

export const watchMobile = async () => {
  const watchDir = path.resolve('src','platforms','mobile','app')
  await watch('mobile', watchDir, mobileConfig)
}
