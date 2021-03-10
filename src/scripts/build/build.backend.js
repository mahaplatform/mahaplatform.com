import '@core/services/environment'
import { buildDir, buildEntry } from './utils'
import babel from './babel.backend'
import apps from '@core/utils/apps'
import log from '@core/utils/log'
import path from 'path'
import ncp from 'ncp'
import ejs from 'ejs'
import fs from 'fs'

const srcDir = path.resolve('src')

const dist = path.resolve('dist')

const staged = `${dist}.staged`

const copy = Promise.promisify(ncp)

const buildBackend = async (root, environment) => {
  log('info', 'server', 'Compiling...')
  const babelrc = babel(root)
  const appDirs = apps.map(app => `apps/${app}`)
  const entries = fs.readdirSync(srcDir).filter(item => {
    return !fs.lstatSync(path.join(srcDir,item)).isDirectory()
  })
  await Promise.map(['core','analytics',...appDirs], async(dir) => {
    buildDir(dir, babelrc)
  })
  await Promise.map(entries, async (entry) => {
    buildEntry(entry, babelrc)
  })
  const template = fs.readFileSync(path.join(__dirname, 'ecosystem.config.js.ejs'), 'utf8')
  const data = ejs.render(template, { environment })
  fs.writeFileSync(path.join(staged,'platform','ecosystem.config.js'), data, 'utf8')
  await copy(path.join('package.json'), path.join(staged,'platform','package.json'))
  await copy(path.join('package-lock.json'), path.join(staged,'platform','package-lock.json'))
  log('info', 'server', 'Compiled successfully.')
}

export default buildBackend
