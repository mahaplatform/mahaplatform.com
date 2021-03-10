import '@core/services/environment'
import subappConfig from './webpack.subapp.config'
import log from '@core/utils/log'
import webpack from 'webpack'
import path from 'path'
import fs from 'fs'

const srcDir = path.resolve('src')

const appsDir = path.join(srcDir,'apps')

const subapps = fs.readdirSync(appsDir).reduce((apps, app) => {
  const appDir = path.join(appsDir, app, 'web')
  return [
    ...apps,
    ...fs.existsSync(appDir) ? fs.readdirSync(appDir).reduce((apps, subapp, index) => {
      const dir = path.join(appsDir, app, 'web',subapp)
      return [
        ...apps,
        { app, subapp, dir }
      ]
    }, []) : []
  ]
}, [])

const compile = async (module, config) => {
  log('info', module, 'Compiling...')
  await new Promise((resolve, reject) => webpack(config).run((err, stats) => {
    if(err) reject(err)
    const info = stats.toJson()
    if(stats.hasErrors()) console.error(info.errors)
    resolve(stats)
  }))
  log('info', module, 'Compiled successfully.')
}

const buildApps = async (environment) => {
  await Promise.mapSeries(subapps, async (item) => {
    const { app, subapp, dir } = item
    const config = subappConfig(app, subapp, dir)
    await compile(`${app}:${subapp}`, config)
  })
}

export default buildApps
