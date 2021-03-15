import '@core/services/environment'
import buildBackend from './build.backend'
import buildSubapps from './build.subapps'
import buildAdmin from './build.admin'
import move from 'move-concurrently'
import buildSdk from './build.sdk'
import buildEnv from './build.env'
import buildWeb from './build.web'
import log from '@core/utils/log'
import rimraf from 'rimraf'
import mkdirp from 'mkdirp'
import path from 'path'

const dist = path.resolve('dist')

const staged = `${dist}.staged`

const getDuration = (start) => {
  const diff = process.hrtime(start)
  const ms = diff[0] * 1e3 + diff[1] * 1e-6
  const duration =  (ms / 1000).toFixed(3)
  return `${duration}s`
}

const build = async () => {
  const args = process.argv.slice(2)
  const environment = args[0] || 'production'
  const root = args[1] || path.join(dist)
  const start = process.hrtime()
  rimraf.sync(staged)
  mkdirp.sync(path.join(staged,'public'))
  await Promise.all([
    buildBackend(root, environment),
    buildSdk(),
    buildEnv(environment),
    buildAdmin(environment),
    buildWeb(root, environment)
  ])
  await buildSubapps(environment)
  rimraf.sync(dist)
  await move(staged, dist)
  log('info', 'build', `Finished in ${getDuration(start)}`)
}

build().then(process.exit)
