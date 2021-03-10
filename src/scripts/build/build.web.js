import '@core/services/environment'
import next_build from 'next/dist/build'
import log from '@core/utils/log'
import mkdirp from 'mkdirp'
import path from 'path'
import ncp from 'ncp'

const srcDir = path.resolve('src')

const dist = path.resolve('dist')

const staged = `${dist}.staged`

const copy = Promise.promisify(ncp)

const items = ['src','babel.config.js','next.config.js']

const buildWeb = async (environment) => {
  log('info', 'web', 'Compiling...')
  mkdirp.sync(path.join(staged,'platform','web'))
  await Promise.mapSeries(items, async(item) => {
    console.log(path.join(srcDir,'web',item), path.join(staged,'platform','web',item))
    await copy(path.join(srcDir,'web',item), path.join(staged,'platform','web',item))
  })
  // await next_build(path.join(staged,'platform','web'))
  log('info', 'web', 'Compiled successfully.')
}

export default buildWeb
