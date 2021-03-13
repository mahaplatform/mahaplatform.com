import '@core/services/environment'
import { buildDir, buildEntry } from './utils'
import next_build from 'next/dist/build'
import log from '@core/utils/log'
import babel from './babel.web'
import mkdirp from 'mkdirp'
import path from 'path'

const dist = path.resolve('dist')

const staged = `${dist}.staged`

const buildWeb = async (root, environment) => {
  log('info', 'web', 'Compiling...')
  const babelrc = babel(root)
  mkdirp.sync(path.join(staged,'web'))
  await buildDir(path.join('web','lib'), babelrc)
  await buildDir(path.join('web','public'), babelrc)
  await buildDir(path.join('web','src'), babelrc)
  await buildDir(path.join('web','utils'), babelrc)
  await buildEntry(path.join('web','babel.config.js'), babelrc)
  await buildEntry(path.join('web','next.config.js'), babelrc)
  await next_build(path.join(staged,'web'))
  log('info', 'web', 'Compiled successfully.')
}

export default buildWeb
